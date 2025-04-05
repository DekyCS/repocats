# Supabase Integration for RepoCats

This document explains how the Supabase integration works in RepoCats and how to set it up.

## Overview

RepoCats now uses Supabase to cache repository analysis data, including:
- Repository diagrams
- Repository features and walkthroughs

This allows the application to instantly load previously analyzed repositories without having to regenerate the data, saving time and API costs.

## Database Schema

The Supabase database uses the following tables:

1. **repositories** - Stores basic repository information
   - `id` - Primary key
   - `owner` - Repository owner (e.g., "DekyCS")
   - `repo` - Repository name (e.g., "bagelhacks")
   - `last_updated` - Timestamp of last update

2. **diagrams** - Stores Mermaid.js diagrams for repositories
   - `id` - Primary key
   - `repository_id` - Foreign key to repositories table
   - `diagram_content` - The Mermaid.js diagram content
   - `created_at` - Creation timestamp

3. **features** - Stores repository features
   - `id` - Primary key
   - `repository_id` - Foreign key to repositories table
   - `title` - Feature title
   - `description` - Feature description
   - `matches` - Number of files involved
   - `created_at` - Creation timestamp

4. **walkthroughs** - Stores feature walkthroughs
   - `id` - Primary key
   - `feature_id` - Foreign key to features table
   - `title` - Walkthrough title
   - `description` - Walkthrough description
   - `created_at` - Creation timestamp

5. **walkthrough_steps** - Stores steps for each walkthrough
   - `id` - Primary key
   - `walkthrough_id` - Foreign key to walkthroughs table
   - `title` - Step title
   - `description` - Step description
   - `files` - JSON array of files involved
   - `code` - Code snippet for the step
   - `explanation` - Step explanation
   - `step_order` - Order of the step in the walkthrough
   - `created_at` - Creation timestamp

## Setup Instructions

1. Create a Supabase project at [https://supabase.com](https://supabase.com)

2. Run the SQL migration script in `supabase/migrations/20250404_initial_schema.sql` in the Supabase SQL Editor

3. Set the following environment variables in your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Restart your application

## How It Works

### Diagram Caching

When a user visits a repository page:
1. The application first checks Supabase for a cached diagram
2. If found, it displays the cached diagram instantly
3. If not found, it generates a new diagram and stores it in Supabase for future use

### Features and Walkthroughs Caching

When a user visits a repository page:
1. The application first checks Supabase for cached features and walkthroughs
2. If found, it displays the cached data instantly
3. If not found, it generates new features and walkthroughs and stores them in Supabase for future use

## Fallback Mechanism

The application maintains localStorage caching as a fallback mechanism in case the Supabase connection fails. This ensures that the application continues to work even if there are issues with the Supabase service.

## Benefits

- **Faster Loading Times**: Previously analyzed repositories load instantly
- **Reduced API Costs**: Fewer calls to OpenAI API for generating diagrams and features
- **Improved User Experience**: Users can quickly access previously viewed repositories
- **Persistent Storage**: Data persists across sessions and devices

## Future Improvements

- Add user authentication to associate repositories with specific users
- Implement versioning to handle repository updates
- Add admin interface for managing cached data
- Implement data expiration and refresh mechanisms
