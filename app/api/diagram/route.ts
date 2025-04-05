import { NextRequest, NextResponse } from 'next/server';
import { generateIntelligentDiagram } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    console.log('Diagram API route called');
    
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not set in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }
    
    const { owner, repo, repomixData } = await request.json();
    console.log(`Processing request for ${owner}/${repo}, repomixData length: ${repomixData?.length || 0}`);
    
    if (!owner || !repo || !repomixData) {
      console.error('Missing required parameters', { owner, repo, repomixDataAvailable: !!repomixData });
      return NextResponse.json(
        { error: 'Owner, repo, and repomixData parameters are required' },
        { status: 400 }
      );
    }
    
    // Generate the intelligent diagram using OpenAI o3-mini
    console.log('Calling generateIntelligentDiagram...');
    const diagram = await generateIntelligentDiagram(repomixData, owner, repo);
    console.log('Diagram generated successfully, length:', diagram.length);
    
    return NextResponse.json({ 
      success: true, 
      diagram
    });
  } catch (error) {
    console.error('Error generating diagram:', error);
    return NextResponse.json(
      { error: `Failed to generate diagram: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
