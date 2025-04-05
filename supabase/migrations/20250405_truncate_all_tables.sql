-- This script will empty all tables in the public schema
-- This will delete all data but keep the table structures intact

DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Disable triggers temporarily
    EXECUTE 'SET session_replication_role = replica';
    
    -- Truncate all tables in the public schema
    FOR r IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        AND tablename NOT IN ('spatial_ref_sys') -- Skip PostGIS system tables
    ) LOOP
        EXECUTE 'TRUNCATE TABLE public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
    
    -- Re-enable triggers
    EXECUTE 'SET session_replication_role = DEFAULT';
    
    RAISE NOTICE 'All tables have been emptied.';
END $$;
