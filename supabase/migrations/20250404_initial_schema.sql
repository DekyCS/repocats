-- Create schema for RepoCats application
-- This schema will store repository analysis data including diagrams and features

-- Repository table to store basic repository information
CREATE TABLE repositories (
  id SERIAL PRIMARY KEY,
  owner TEXT NOT NULL,
  repo TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Ensure we don't have duplicate repositories
  UNIQUE(owner, repo)
);

-- Repository diagrams table
CREATE TABLE diagrams (
  id SERIAL PRIMARY KEY,
  repository_id INTEGER REFERENCES repositories(id) ON DELETE CASCADE,
  diagram_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Index for faster lookups
  UNIQUE(repository_id)
);

-- Repository features table
CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  repository_id INTEGER REFERENCES repositories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  matches INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Feature walkthroughs table
CREATE TABLE walkthroughs (
  id SERIAL PRIMARY KEY,
  feature_id INTEGER REFERENCES features(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Index for faster lookups
  UNIQUE(feature_id)
);

-- Walkthrough steps table
CREATE TABLE walkthrough_steps (
  id SERIAL PRIMARY KEY,
  walkthrough_id INTEGER REFERENCES walkthroughs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  files JSONB NOT NULL,
  code TEXT NOT NULL,
  explanation TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Ensure steps are ordered correctly
  UNIQUE(walkthrough_id, step_order)
);

-- Disable Row Level Security (since we're having issues with it)
ALTER TABLE repositories DISABLE ROW LEVEL SECURITY;
ALTER TABLE diagrams DISABLE ROW LEVEL SECURITY;
ALTER TABLE features DISABLE ROW LEVEL SECURITY;
ALTER TABLE walkthroughs DISABLE ROW LEVEL SECURITY;
ALTER TABLE walkthrough_steps DISABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_repositories_owner_repo ON repositories(owner, repo);
CREATE INDEX idx_features_repository_id ON features(repository_id);
CREATE INDEX idx_walkthroughs_feature_id ON walkthroughs(feature_id);
CREATE INDEX idx_walkthrough_steps_walkthrough_id ON walkthrough_steps(walkthrough_id);
