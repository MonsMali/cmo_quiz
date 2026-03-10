/**
 * Shared email validation used by both client (UserForm) and server (submit route).
 * Returns true if the email is valid and not suspicious.
 */
export function isValidEmail(email: string): boolean {
    const trimmed = email.trim().toLowerCase();

    // RFC 5322 compliant regex
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!emailRegex.test(trimmed)) return false;

    // Check for common domain typos
    const domainTypos = [
        '@gmailcom', '@gmai.com', '@gmial.com', '@gmaill.com',
        '@yahooo.com', '@yaho.com', '@hotmailcom', '@hotmai.com',
        '@outlookcom', '@outlok.com',
        '@test.test', '@example.com',
        '@asdf.com', '@qwerty.com', '@temp.com',
    ];
    if (domainTypos.some(typo => trimmed.includes(typo))) return false;

    // Block test@ and @test.com EXCEPT test[number]@test.com (for testing)
    if ((/@test\.com$/.test(trimmed) || /^test@/.test(trimmed)) &&
        !/^test\d+@test\.com$/.test(trimmed)) {
        return false;
    }

    // TLD must be at least 2 characters
    const parts = trimmed.split('@');
    if (parts.length !== 2) return false;
    const domainParts = parts[1].split('.');
    if (domainParts[domainParts.length - 1].length < 2) return false;

    // Suspicious patterns
    const suspicious = [
        /^fake@/, /^asdf@/, /@localhost/,
        /^admin@/, /^noreply@/,
    ];
    if (suspicious.some(p => p.test(trimmed))) return false;

    return true;
}
