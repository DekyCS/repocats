import { NextRequest, NextResponse } from 'next/server';
import { generateRepomixOutput } from '@/lib/repomix';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const { owner, repo } = await request.json();
    
    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Owner and repo parameters are required' },
        { status: 400 }
      );
    }
    
    // Create directory for cached outputs if it doesn't exist
    const cacheDir = path.join(process.cwd(), 'cache', 'repomix');
    await fs.mkdir(cacheDir, { recursive: true });
    
    // Define output path
    const outputPath = path.join(cacheDir, `${owner}-${repo}.md`);
    
    // Check if we already have a cached version
    try {
      const stats = await fs.stat(outputPath);
      const fileAge = Date.now() - stats.mtimeMs;
      
      // If file exists and is less than 24 hours old, use cached version
      if (fileAge < 24 * 60 * 60 * 1000) {
        const cachedOutput = await fs.readFile(outputPath, 'utf-8');
        return NextResponse.json({ 
          success: true, 
          message: 'Using cached repository analysis',
          data: cachedOutput
        });
      }
    } catch (error) {
      // File doesn't exist or can't be accessed, will generate new one
    }
    
    // Generate new Repomix output
    const repomixOutput = await generateRepomixOutput(owner, repo, outputPath);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Repository analysis generated successfully',
      data: repomixOutput
    });
  } catch (error) {
    console.error('Error in Repomix API route:', error);
    return NextResponse.json(
      { error: 'Failed to process repository' },
      { status: 500 }
    );
  }
}
