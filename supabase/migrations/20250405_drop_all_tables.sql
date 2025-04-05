-- WARNING: This script will drop all tables in the public schema
-- This is a destructive operation that will delete all your data
-- Only run this if you're sure you want to reset your database

DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Disable triggers
    EXECUTE 'SET session_replication_role = replica';
    
    -- Drop all tables in the public schema
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
    
    -- Re-enable triggers
    EXECUTE 'SET session_replication_role = DEFAULT';
END $$;
