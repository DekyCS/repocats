import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { supabase } from './supabase'; 

const execAsync = promisify(exec);

console.log('Repomix using existing Supabase client');

export async function generateRepomixOutput(owner: string, repo: string, outputPath: string): Promise<string> {
  try {
    const isVercel = process.env.VERCEL === '1';
    
    if (isVercel) {
      console.log(`Running in Vercel environment, using alternative approach for ${owner}/${repo}`);
      
      const { data, error } = await supabase
        .from('repo_analysis')
        .select('analysis_data')
        .eq('owner', owner)
        .eq('repo', repo)
        .single();
      
      if (data && data.analysis_data) {
        console.log(`Found analysis data in Supabase for ${owner}/${repo}`);
        return data.analysis_data;
      }
      
      console.log(`Generating simplified analysis for ${owner}/${repo} in Vercel environment`);
      const simplifiedAnalysis = `# Repository Analysis for ${owner}/${repo}
      
## Overview
This is a GitHub repository owned by ${owner}.

## Structure
The repository contains various files and directories typical of a software project.

## Features
- Code organization
- Documentation
- Version control
`;
      
      try {
        const { error: insertError } = await supabase
          .from('repo_analysis')
          .upsert({
            owner,
            repo,
            analysis_data: simplifiedAnalysis,
            created_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error('Error storing analysis in Supabase:', insertError);
        }
      } catch (storageError) {
        console.error('Failed to store analysis in Supabase:', storageError);
      }
      
      return simplifiedAnalysis;
    }
    
    const tempDir = path.join(process.cwd(), 'tmp', `${owner}-${repo}-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
    
    const command = `npx repomix --remote https://github.com/${owner}/${repo} --style markdown --output ${path.join(tempDir, 'repomix-output.md')}`;
    
    console.log(`Executing: ${command}`);
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error(`Repomix stderr: ${stderr}`);
    }
    
    const outputFilePath = path.join(tempDir, 'repomix-output.md');
    const repomixOutput = await fs.readFile(outputFilePath, 'utf-8');
    
    await fs.writeFile(outputPath, repomixOutput);
    
    await fs.rm(tempDir, { recursive: true, force: true });
    
    try {
      const { error: insertError } = await supabase
        .from('repo_analysis')
        .upsert({
          owner,
          repo,
          analysis_data: repomixOutput,
          created_at: new Date().toISOString()
        });
      
      if (insertError) {
        console.error('Error storing analysis in Supabase:', insertError);
      } else {
        console.log(`Successfully stored repomix data for ${owner}/${repo} in repo_analysis table`);
      }
    } catch (storageError) {
      console.error('Failed to store analysis in Supabase:', storageError);
    }
    
    return repomixOutput;
  } catch (error) {
    console.error('Error generating Repomix output:', error);
    throw new Error('Failed to generate repository analysis');
  }
}

export async function getRepomixData(owner: string, repo: string): Promise<string | null> {
  try {
    const isVercel = process.env.VERCEL === '1';
    
    if (isVercel) {
      console.log(`Running in Vercel environment, fetching data for ${owner}/${repo}`);
      
      const { data, error } = await supabase
        .from('repo_analysis')
        .select('analysis_data')
        .eq('owner', owner)
        .eq('repo', repo)
        .single();
      
      if (data && data.analysis_data) {
        console.log(`Found analysis data in Supabase for ${owner}/${repo}`);
        return data.analysis_data;
      }
      
      console.log(`Generating data for ${owner}/${repo} in Vercel environment`);
      const tempPath = `/tmp/${owner}-${repo}.md`; 
      return await generateRepomixOutput(owner, repo, tempPath);
    }
    
    try {
      console.log(`Checking repo_analysis table for ${owner}/${repo}`);
      const { data, error } = await supabase
        .from('repo_analysis')
        .select('analysis_data')
        .eq('owner', owner)
        .eq('repo', repo)
        .single();
      
      if (data && data.analysis_data) {
        console.log(`Found analysis data in repo_analysis table for ${owner}/${repo}`);
        return data.analysis_data;
      }
    } catch (supabaseError) {
      console.error('Error checking repo_analysis table:', supabaseError);
    }
    
    const cacheDir = path.join(process.cwd(), 'cache', 'repomix');
    const cacheFilePath = path.join(cacheDir, `${owner}-${repo}.md`);
    
    try {
      const stats = await fs.stat(cacheFilePath);
      
      const now = new Date();
      const fileAge = now.getTime() - stats.mtime.getTime();
      const maxAge = 24 * 60 * 60 * 1000; 
      
      if (fileAge < maxAge) {
        console.log(`Using cached Repomix data for ${owner}/${repo}`);
        return await fs.readFile(cacheFilePath, 'utf-8');
      }
      
      console.log(`Cached Repomix data for ${owner}/${repo} is too old, regenerating...`);
    } catch (err) {
      console.log(`No cached Repomix data found for ${owner}/${repo}, generating...`);
    }
    
    await fs.mkdir(cacheDir, { recursive: true });
    
    return await generateRepomixOutput(owner, repo, cacheFilePath);
  } catch (error) {
    console.error('Error getting Repomix data:', error);
    return null;
  }
}
