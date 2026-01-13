/**
 * Google Apps Script for Quiz Olhão - FITUR 2026
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Rename the first sheet to "Submissions"
 * 3. Add these headers in row 1:
 *    A: timestamp, B: name, C: email, D: quiz_id, E: correct_answers,
 *    F: prize_tier, G: prize_id, H: prize_awarded, I: language,
 *    J: nationality_inferred, K: ip_address, L: marketing_consent, M: questions_answered
 *
 * 4. Go to Extensions > Apps Script
 * 5. Delete any code in Code.gs and paste this entire file
 * 6. Click Deploy > New deployment
 * 7. Select "Web app"
 * 8. Set "Execute as" to "Me"
 * 9. Set "Who has access" to "Anyone"
 * 10. Click Deploy and copy the Web App URL
 * 11. Add the URL to your .env.local as GOOGLE_SHEETS_URL
 */

// Configuration
const SHEET_NAME = 'Submissions';

/**
 * Handle GET requests - fetch submissions
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'getAll';
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return createJsonResponse({ error: 'Sheet not found' }, 404);
    }

    if (action === 'checkEmail') {
      // Check if email already exists
      const email = e.parameter.email;
      if (!email) {
        return createJsonResponse({ error: 'Email required' }, 400);
      }

      const exists = emailExists(sheet, email.toLowerCase().trim());
      return createJsonResponse({ exists });
    }

    if (action === 'getAll') {
      // Get all submissions with optional filters
      const language = e.parameter.language;
      const quizId = e.parameter.quizId;
      const prizeTier = e.parameter.prizeTier;

      const submissions = getAllSubmissions(sheet, { language, quizId, prizeTier });
      const stats = calculateStats(submissions);

      return createJsonResponse({ submissions, stats });
    }

    return createJsonResponse({ error: 'Invalid action' }, 400);

  } catch (error) {
    console.error('GET Error:', error);
    return createJsonResponse({ error: error.message }, 500);
  }
}

/**
 * Handle POST requests - add new submission
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return createJsonResponse({ error: 'Sheet not found' }, 404);
    }

    // Validate required fields
    if (!data.name || !data.email) {
      return createJsonResponse({ error: 'Name and email are required' }, 400);
    }

    const email = data.email.toLowerCase().trim();

    // Check for duplicate email
    if (emailExists(sheet, email)) {
      return createJsonResponse({ error: 'Email already participated', code: 'DUPLICATE_EMAIL' }, 409);
    }

    // Add new row
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      data.name.trim(),
      email,
      data.quiz_id || 0,
      data.correct_answers || 0,
      data.prize_tier || 0,
      data.prize_id || 0,
      data.prize_awarded || '',
      data.language || 'en',
      data.nationality_inferred || '',
      data.ip_address || '',
      data.marketing_consent || false,
      JSON.stringify(data.questions_answered || [])
    ];

    sheet.appendRow(row);

    return createJsonResponse({
      success: true,
      timestamp: timestamp
    });

  } catch (error) {
    console.error('POST Error:', error);
    return createJsonResponse({ error: error.message }, 500);
  }
}

/**
 * Check if an email already exists in the sheet
 */
function emailExists(sheet, email) {
  const data = sheet.getDataRange().getValues();
  const emailColumn = 2; // Column C (0-indexed)

  for (let i = 1; i < data.length; i++) { // Skip header row
    if (data[i][emailColumn] && data[i][emailColumn].toString().toLowerCase() === email) {
      return true;
    }
  }
  return false;
}

/**
 * Get all submissions with optional filters
 */
function getAllSubmissions(sheet, filters) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const submissions = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const submission = {
      id: i.toString(),
      timestamp: row[0],
      name: row[1],
      email: row[2],
      quiz_id: row[3],
      correct_answers: row[4],
      prize_tier: row[5],
      prize_id: row[6],
      prize_awarded: row[7],
      language: row[8],
      nationality_inferred: row[9],
      ip_address: row[10],
      marketing_consent: row[11],
      questions_answered: row[12] ? JSON.parse(row[12]) : []
    };

    // Apply filters
    if (filters.language && filters.language !== 'all' && submission.language !== filters.language) {
      continue;
    }
    if (filters.quizId && filters.quizId !== 'all' && submission.quiz_id != filters.quizId) {
      continue;
    }
    if (filters.prizeTier && filters.prizeTier !== 'all' && submission.prize_tier != filters.prizeTier) {
      continue;
    }

    submissions.push(submission);
  }

  // Sort by timestamp descending (newest first)
  submissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return submissions;
}

/**
 * Calculate statistics from submissions
 */
function calculateStats(submissions) {
  const stats = {
    totalSubmissions: submissions.length,
    submissionsByLanguage: { pt: 0, es: 0, fr: 0, de: 0, en: 0 },
    submissionsByPrizeTier: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    averageCorrectAnswers: 0
  };

  if (submissions.length === 0) {
    return stats;
  }

  let totalCorrect = 0;

  submissions.forEach(s => {
    // Count by language
    if (s.language in stats.submissionsByLanguage) {
      stats.submissionsByLanguage[s.language]++;
    }
    // Count by prize tier
    if (s.prize_tier in stats.submissionsByPrizeTier) {
      stats.submissionsByPrizeTier[s.prize_tier]++;
    }
    // Sum correct answers
    totalCorrect += s.correct_answers || 0;
  });

  stats.averageCorrectAnswers = totalCorrect / submissions.length;

  return stats;
}

/**
 * Create a JSON response with CORS headers
 */
function createJsonResponse(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Test function - run this to verify setup
 */
function testSetup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    console.log('ERROR: Sheet "Submissions" not found. Please create it.');
    return;
  }

  const headers = sheet.getRange(1, 1, 1, 13).getValues()[0];
  const expectedHeaders = [
    'timestamp', 'name', 'email', 'quiz_id', 'correct_answers',
    'prize_tier', 'prize_id', 'prize_awarded', 'language',
    'nationality_inferred', 'ip_address', 'marketing_consent', 'questions_answered'
  ];

  console.log('Current headers:', headers);
  console.log('Expected headers:', expectedHeaders);
  console.log('Setup looks good!');
}
