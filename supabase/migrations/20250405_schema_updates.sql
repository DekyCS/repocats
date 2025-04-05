-- Add error column to features table
ALTER TABLE features ADD COLUMN IF NOT EXISTS error TEXT;

-- Update walkthrough_steps table to use JSONB for files
ALTER TABLE walkthrough_steps ALTER COLUMN files TYPE JSONB USING files::JSONB;

-- Make step_order optional in walkthrough_steps
ALTER TABLE walkthrough_steps ALTER COLUMN step_order DROP NOT NULL;

-- Drop the unique constraint on walkthrough_id and step_order
ALTER TABLE walkthrough_steps DROP CONSTRAINT IF EXISTS walkthrough_steps_walkthrough_id_step_order_key;

-- Fix diagrams table
-- First, drop the unique constraint on repository_id
ALTER TABLE diagrams DROP CONSTRAINT IF EXISTS diagrams_repository_id_key;

-- Create repo_analysis table if it doesn't exist
CREATE TABLE IF NOT EXISTS repo_analysis (
  id SERIAL PRIMARY KEY,
  owner TEXT NOT NULL,
  repo TEXT NOT NULL,
  analysis_data TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Create a unique constraint on owner and repo
  UNIQUE(owner, repo)
);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS repo_analysis_owner_repo_idx ON repo_analysis(owner, repo);

-- Disable Row Level Security for the new table
ALTER TABLE repo_analysis DISABLE ROW LEVEL SECURITY;
