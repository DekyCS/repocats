-- Create the repo_analysis table if it doesn't exist
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
