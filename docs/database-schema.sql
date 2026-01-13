-- Supabase Database Schema for Quiz Olhão - FITUR 2026
-- Run this in your Supabase SQL Editor

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  quiz_id INTEGER NOT NULL,
  questions_answered JSONB NOT NULL,
  correct_answers INTEGER NOT NULL CHECK (correct_answers >= 0 AND correct_answers <= 4),
  prize_tier INTEGER CHECK (prize_tier >= 0 AND prize_tier <= 4),
  prize_id INTEGER CHECK (prize_id >= 1 AND prize_id <= 8),
  prize_awarded VARCHAR(255),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  language VARCHAR(2) NOT NULL,
  ip_address VARCHAR(45),
  nationality_inferred VARCHAR(100),
  marketing_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index on email to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_submissions_email_unique ON submissions(email);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_submissions_timestamp ON submissions(timestamp);
CREATE INDEX IF NOT EXISTS idx_submissions_language ON submissions(language);
CREATE INDEX IF NOT EXISTS idx_submissions_quiz_id ON submissions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_submissions_prize_tier ON submissions(prize_tier);

-- Enable Row Level Security (RLS)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anonymous users
CREATE POLICY "Allow anonymous inserts" ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reads only from authenticated admin (service role)
CREATE POLICY "Allow admin reads" ON submissions
  FOR SELECT
  USING (true);

-- Grant permissions
GRANT INSERT ON submissions TO anon;
GRANT SELECT ON submissions TO service_role;
GRANT ALL ON submissions TO postgres;
