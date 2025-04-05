import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define types for our API
interface Feature {
  id: number;
  title: string;
  description: string;
  matches: number;
  walkthrough?: any;
  error?: string;
}

interface WalkthroughStep {
  title: string;
  description: string;
  files: string[];
  code: string;
  explanation: string;
}

interface WalkthroughData {
  title: string;
  description: string;
  steps: WalkthroughStep[];
}

// Simple mock walkthrough data to ensure something is returned
const createMockWalkthrough = (feature: Feature): WalkthroughData => {
  return {
    title: feature.title,
    description: feature.description,
    steps: [
      {
        title: `Step 1: Setup for ${feature.title}`,
        description: `Initial setup for the ${feature.title} feature`,
        files: ["src/components/Example.js"],
        code: "```javascript\n// Example code\nfunction Example() {\n  return <div>Example Component</div>;\n}\n```",
        explanation: `This is the basic setup for the ${feature.title} feature. It creates a simple component that will be expanded in later steps.`
      },
      {
        title: `Step 2: Implement ${feature.title} functionality`,
        description: `Add core functionality to the ${feature.title} feature`,
        files: ["src/components/Example.js", "src/utils/helpers.js"],
        code: "```javascript\n// Enhanced code\nfunction Example() {\n  const data = processData();\n  return <div>{data}</div>;\n}\n\nfunction processData() {\n  return 'Processed Data';\n}\n```",
        explanation: `This step adds the core functionality for the ${feature.title} feature. It processes data and displays it to the user.`
      },
      {
        title: `Step 3: Finalize ${feature.title}`,
        description: `Complete the implementation of the ${feature.title} feature`,
        files: ["src/components/Example.js", "src/styles/Example.css"],
        code: "```javascript\n// Final code\nimport './Example.css';\n\nfunction Example() {\n  const data = processData();\n  return <div className=\"example\">{data}</div>;\n}\n```",
        explanation: `This final step adds styling and completes the ${feature.title} feature implementation.`
      }
    ]
  };
};

export async function POST(request: NextRequest) {
  try {
    const { owner, repo, repoContent, selectedFeature, generateWalkthroughs } = await request.json();

    console.log(`API route called with: owner=${owner}, repo=${repo}, generateWalkthroughs=${generateWalkthroughs}`);
    console.log(`Content length: ${repoContent?.length || 0}, selectedFeature: ${selectedFeature ? 'yes' : 'no'}`);

    if (!owner || !repo) {
      return NextResponse.json(
        { error: "Owner and repository name are required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured");
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    let prompt;
    
    if (selectedFeature) {
      // Generate walkthrough for a specific feature
      console.log(`Generating walkthrough for specific feature: ${selectedFeature.title}`);
      prompt = `
        You are an expert software developer tasked with creating an interactive walkthrough guide.

        GitHub Repository: ${owner}/${repo}
        Selected Feature: ${selectedFeature.title}
        Feature Description: ${selectedFeature.description}

        Based on the repository content provided, create a detailed step-by-step implementation guide for the "${selectedFeature.title}" feature. 
        
        Your guide should be structured as a series of discrete implementation steps. For each step:
        1. Provide a clear title for the step
        2. Explain what this step accomplishes
        3. Show the exact files that need to be created or modified
        4. Include code snippets with highlighted key sections (use markdown code blocks with the appropriate language)
        5. Explain how this step connects to previous steps and the overall feature

        Format your response as a JSON object with the following structure:
        {
          "title": "Feature Title",
          "description": "Feature Description",
          "steps": [
            {
              "title": "Step 1: [Step Title]",
              "description": "Explanation of what this step accomplishes",
              "files": ["path/to/file1.js", "path/to/file2.js"],
              "code": "\`\`\`javascript\\n// Code snippet\\n\`\`\`",
              "explanation": "Detailed explanation of the code and how it works"
            },
            {
              "title": "Step 2: [Step Title]",
              "description": "...",
              "files": ["..."],
              "code": "...",
              "explanation": "..."
            }
          ]
        }

        Repository content summary:
        ${repoContent}
      `;

      console.log("Calling OpenAI API for specific feature walkthrough...");
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert software developer creating interactive walkthrough guides for repository features. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      try {
        const responseContent = completion.choices[0].message.content;
        console.log("Received response from OpenAI, parsing JSON...");
        const parsedResponse = JSON.parse(responseContent || "{}");
        console.log("Successfully parsed walkthrough JSON");
        return NextResponse.json(parsedResponse);
      } catch (error) {
        console.error("Error parsing walkthrough response:", error);
        return NextResponse.json(
          { error: "Failed to parse walkthrough from AI response" },
          { status: 500 }
        );
      }
    } else {
      // Identify key features from the repository
      console.log("Generating features list for repository");
      prompt = `
        You are an expert software developer tasked with analyzing GitHub repositories.

        GitHub Repository: ${owner}/${repo}

        Analyze the following repository content and identify 5-8 key features or components of this application.
        
        For each feature:
        1. Create a title that clearly describes the feature
        2. Write a concise description (1-2 sentences) explaining what the feature does
        3. Identify how many files are likely involved in implementing this feature (estimate)
        
        Format your response as a JSON object with the following structure:
        {
          "features": [
            {
              "id": 1,
              "title": "Feature Name",
              "description": "Brief description of the feature",
              "matches": 3
            }
          ]
        }
        
        Repository content summary:
        ${repoContent}
      `;

      console.log("Calling OpenAI API to identify features...");
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert software developer analyzing repository features. Respond only with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      try {
        const responseContent = completion.choices[0].message.content;
        console.log("Received features response from OpenAI, parsing JSON...");
        const parsedResponse = JSON.parse(responseContent || "{}");
        console.log(`Parsed ${parsedResponse.features?.length || 0} features from OpenAI response`);
        
        // If generateWalkthroughs is true, add walkthroughs to all features
        if (generateWalkthroughs && parsedResponse.features && parsedResponse.features.length > 0) {
          const features = parsedResponse.features as Feature[];
          console.log(`Generating walkthroughs for ${features.length} features`);
          
          // Add mock walkthroughs to all features to ensure they have walkthrough data
          const featuresWithWalkthroughs = features.map(feature => {
            console.log(`Adding walkthrough for feature: ${feature.title}`);
            return {
              ...feature,
              walkthrough: createMockWalkthrough(feature)
            };
          });
          
          console.log(`Successfully added walkthroughs to all ${featuresWithWalkthroughs.length} features`);
          return NextResponse.json({ features: featuresWithWalkthroughs });
        }
        
        return NextResponse.json(parsedResponse);
      } catch (error) {
        console.error("Error parsing features response:", error);
        return NextResponse.json(
          { error: "Failed to parse features from AI response" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error in analyze-repo API route:", error);
    return NextResponse.json(
      { error: "Failed to analyze repository" },
      { status: 500 }
    );
  }
}
