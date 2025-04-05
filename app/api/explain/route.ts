import { NextRequest, NextResponse } from 'next/server';
import { generateCodeExplanation } from '@/lib/openai';
import { getRepomixData } from '@/lib/repomix';

export async function POST(request: NextRequest) {
  try {
    const { owner, repo, code, filePath, isSnippet } = await request.json();

    if (!owner || !repo || !code) {
      return NextResponse.json(
        { error: 'Missing required parameters: owner, repo, and code are required' },
        { status: 400 }
      );
    }

    console.log('Code explanation API route called');
    console.log(`Processing request for ${owner}/${repo}, code length: ${code.length}`);
    console.log(`File path: ${filePath}, isSnippet: ${isSnippet}`);

    // Get Repomix data for context
    const repomixData = await getRepomixData(owner, repo);
    
    if (!repomixData) {
      return NextResponse.json(
        { error: 'Failed to retrieve repository analysis data' },
        { status: 500 }
      );
    }

    // Generate explanation using OpenAI
    console.log('Calling generateCodeExplanation...');
    const explanation = await generateCodeExplanation(
      repomixData,
      code,
      owner,
      repo,
      filePath,
      isSnippet
    );

    console.log('Explanation generated successfully, length:', explanation.length);

    return NextResponse.json({
      success: true,
      explanation
    });
  } catch (error) {
    console.error('Error in code explanation API route:', error);
    return NextResponse.json(
      { error: `Failed to generate explanation: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
