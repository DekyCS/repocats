import OpenAI from 'openai';

// Initialize the OpenAI client with the API key
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  // If we already have a client, return it
  if (openaiClient) {
    return openaiClient;
  }

  // Get the API key from environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  
  console.log('OpenAI API Key available:', !!apiKey);
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not set in environment variables');
  }

  // Create a new client
  openaiClient = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // Allow usage in browser environments
  });

  return openaiClient;
}

// Function to generate an intelligent diagram using GPT-4o model
export async function generateIntelligentDiagram(
  repomixData: string,
  owner: string,
  repo: string
): Promise<string> {
  try {
    console.log('Starting intelligent diagram generation for', owner + '/' + repo);
    const openai = getOpenAIClient();
    
    // Create a prompt for the model to analyze the repository with a strict template
    const prompt = `
      You are a principal software engineer tasked with creating a system design diagram using Mermaid.js based on repository data.
      Your goal is to create a clear, accurate, and visually appealing diagram that represents the architecture of the repository.
      
      Repository: ${owner}/${repo}
      
      Here is the repository data in an AI-friendly format:
      
      ${repomixData.substring(0, 15000)} 
      
      IMPORTANT: You must follow the EXACT template structure provided below, only changing the content to match the repository's architecture.
      
      TEMPLATE:
      \`\`\`
      flowchart LR
          %% Main layers as subgraphs arranged horizontally
          subgraph Frontend["Frontend Layer"]
              direction TB
              F1[UI Components]
              F2[Pages/Routes]
              F3[State Management]
              F4[API Client]
              
              F1 --> F2
              F2 --> F3
              F3 --> F4
              
              %% Add more detailed components based on the actual repository
              subgraph F1Components["UI Components"]
                  direction LR
                  F1C1[Component 1]
                  F1C2[Component 2]
              end
              
              F1 --- F1Components
          end
          
          subgraph Backend["Backend Layer"]
              direction TB
              B1[API Routes]
              B2[Controllers]
              B3[Services]
              B4[Models]
              B5[Middleware]
              
              B1 --> B2
              B2 --> B3
              B3 --> B4
              B1 --> B5
              B5 --> B2
              
              %% Add more detailed components based on the actual repository
              subgraph B3Services["Key Services"]
                  direction LR
                  B3S1[Service 1]
                  B3S2[Service 2]
              end
              
              B3 --- B3Services
          end
          
          subgraph Data["Data Layer"]
              direction TB
              D1[(Primary Database)]
              D2[Data Access]
              D3[(Cache)]
              D4[Migrations]
              
              D2 --> D1
              D2 --> D3
              D4 --> D1
          end
          
          subgraph External["External Services"]
              direction TB
              E1[Third-party API 1]
              E2[Third-party API 2]
              E3[Authentication]
              E4[Storage]
          end
          
          %% Connections between layers
          F4 -->|"API calls"| B1
          B4 -->|"queries"| D2
          B3 -->|"integrates with"| E1
          B3 -->|"calls"| E2
          B5 -->|"verifies"| E3
          B3 -->|"uses"| E4
          
          %% Additional connections for more detail
          F3 -.->|"caches data"| D3
          
          %% Styling
          classDef frontend fill:#A9D6E5,stroke:#333,stroke-width:1px
          classDef backend fill:#A8DADC,stroke:#333,stroke-width:1px
          classDef data fill:#F8C4B4,stroke:#333,stroke-width:1px
          classDef external fill:#CBC3E3,stroke:#333,stroke-width:1px
          classDef subcomponent fill:#F0F0F0,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
          
          %% Apply styles
          class F1,F2,F3,F4 frontend
          class B1,B2,B3,B4,B5 backend
          class D1,D2,D3,D4 data
          class E1,E2,E3,E4 external
          class F1Components,B3Services subcomponent
      \`\`\`
      
      INSTRUCTIONS:
      1. Use flowchart LR (left-to-right) to better utilize horizontal space
      2. Use direction TB (top-to-bottom) within each subgraph to keep them compact
      3. Position the subgraphs horizontally next to each other
      4. Include detailed components that accurately represent the repository structure
      5. Use nested subgraphs to show component hierarchies where appropriate
      6. Include important connections between components, but avoid excessive connections that make the diagram cluttered
      7. Use descriptive names for components based on the repository's actual architecture
      8. Ensure connection labels accurately describe the relationships between components
      9. Maintain the color scheme exactly as provided
      10. Add dotted/dashed lines for secondary or optional connections
      
      Your response must be ONLY the Mermaid.js code, without any additional text, explanations, or markdown code fences.
      Do not include an init declaration. Just return the diagram code.
    `;
    
    console.log('Calling OpenAI API with gpt-4o model...');
    
    // Call the OpenAI API with gpt-4o model
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using gpt-4o model as requested
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3, // Lower temperature for more consistent outputs
      max_tokens: 2000,
    });
    
    console.log('OpenAI API response received:', !!response);
    
    // Extract the diagram from the response
    const diagram = response.choices[0].message.content || "";
    
    console.log('Diagram generated, length:', diagram.length);
    
    // Clean up the response to ensure it's valid Mermaid syntax
    return cleanMermaidDiagram(diagram);
  } catch (error) {
    console.error("Error generating intelligent diagram:", error);
    throw new Error(`Failed to generate intelligent diagram: ${(error as Error).message}`);
  }
}

// Function to generate code explanations using GPT-4o model
export async function generateCodeExplanation(
  repomixData: string,
  code: string,
  owner: string,
  repo: string,
  filePath?: string,
  isSnippet: boolean = false
): Promise<string> {
  try {
    console.log('Starting code explanation generation for', owner + '/' + repo);
    const openai = getOpenAIClient();
    
    // Create a prompt for the model to explain the code
    const prompt = `
      You are a friendly, helpful developer explaining code to a colleague.
      Your goal is to provide a brief, conversational explanation that's easy to understand.
      
      Repository: ${owner}/${repo}
      ${filePath ? `File Path: ${filePath}` : ''}
      ${isSnippet ? 'This is a code snippet selected from the file.' : 'This is the entire file.'}
      
      Here is some context about the repository:
      
      ${repomixData.substring(0, 3000)} 
      
      Here is the code to explain:
      
      \`\`\`
      ${code}
      \`\`\`
      
      INSTRUCTIONS:
      1. Keep your explanation VERY BRIEF (max 3-4 paragraphs)
      2. Use a friendly, conversational tone like you're chatting with a colleague
      3. Focus on the main purpose and key functionality only
      4. Avoid technical jargon unless absolutely necessary
      5. Use simple markdown for readability (headings, lists, code blocks)
      6. Don't analyze every line - focus on the big picture
      7. If it's a snippet, briefly mention how it fits into the broader context
      
      Your explanation should be something a developer could quickly read and understand in under a minute.
    `;
    
    console.log('Calling OpenAI API with gpt-4o model for code explanation...');
    
    // Call the OpenAI API with gpt-4o model
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using gpt-4o model as requested
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // Higher temperature for more conversational tone
      max_tokens: 800, // Reduced token limit for brevity
    });
    
    console.log('OpenAI API response received:', !!response);
    
    // Extract the explanation from the response
    const explanation = response.choices[0].message.content || "";
    
    console.log('Code explanation generated, length:', explanation.length);
    
    return explanation;
  } catch (error) {
    console.error("Error generating code explanation:", error);
    throw new Error(`Failed to generate code explanation: ${(error as Error).message}`);
  }
}

// Helper function to clean up the Mermaid diagram
function cleanMermaidDiagram(diagram: string): string {
  console.log('Cleaning Mermaid diagram...');
  
  // Remove any markdown code block markers
  let cleaned = diagram.replace(/```mermaid/g, "").replace(/```/g, "");
  
  // Fix common syntax issues with graph/flowchart declarations
  if (cleaned.includes("graph TDflowchart TD")) {
    console.log('Fixing duplicate graph/flowchart declarations');
    cleaned = cleaned.replace("graph TDflowchart TD", "flowchart TD");
  }
  
  // Standardize on flowchart TD if multiple declarations exist
  if (cleaned.match(/graph\s+TD[\s\S]*flowchart\s+TD/)) {
    console.log('Fixing multiple graph/flowchart declarations');
    cleaned = cleaned.replace(/graph\s+TD/g, "").trim();
    if (!cleaned.startsWith("flowchart TD")) {
      cleaned = "flowchart TD\n" + cleaned;
    }
  }
  
  // Ensure the diagram starts with a proper declaration
  if (!cleaned.trim().startsWith("graph TD") && 
      !cleaned.trim().startsWith("graph LR") && 
      !cleaned.trim().startsWith("flowchart TD") && 
      !cleaned.trim().startsWith("flowchart LR")) {
    console.log('Adding flowchart TD prefix to diagram');
    cleaned = "flowchart TD\n" + cleaned;
  }
  
  // Fix common syntax issues
  cleaned = cleaned
    // Ensure subgraph syntax is correct
    .replace(/subgraph\s+([^]*)$/gm, 'subgraph $1')
    // Fix color syntax if needed
    .replace(/style\s+(\w+)\s+fill:([^,;]+)/g, 'style $1 fill:$2')
    // Fix arrow syntax (ensure spaces around arrows)
    .replace(/(\w+)-->(\w+)/g, '$1 --> $2')
    .replace(/(\w+)-.->(\w+)/g, '$1 -.-> $2')
    .replace(/(\w+)==>(\w+)/g, '$1 ==> $2')
    // Fix node definitions with too long text (common source of errors)
    .replace(/\[([^\]]{100,})\]/g, (match, p1) => `["${p1.substring(0, 80)}..."]`)
    // Fix line breaks in node text (another common source of errors)
    .replace(/\[([^\]]*\n[^\]]*)\]/g, (match, p1) => `["${p1.replace(/\n/g, ' ')}"]`)
    // Ensure proper line endings
    .replace(/\r\n/g, '\n');
  
  // Create a fallback diagram in case of parsing errors
  const fallbackDiagram = `
flowchart TD
    A[Repository Structure] --> B[Frontend Components]
    A --> C[Backend Services]
    A --> D[Configuration]
    B --> E[UI Elements]
    C --> F[API Endpoints]
    C --> G[Data Models]
    D --> H[Build Setup]
    
    style A fill:#f9f9f9,stroke:#333,stroke-width:2px
    style B fill:#A9D6E5,stroke:#333,stroke-width:1px
    style C fill:#A8DADC,stroke:#333,stroke-width:1px
    style D fill:#D3D3D3,stroke:#333,stroke-width:1px
    style E fill:#A9D6E5,stroke:#333,stroke-width:1px
    style F fill:#A8DADC,stroke:#333,stroke-width:1px
    style G fill:#F8C4B4,stroke:#333,stroke-width:1px
    style H fill:#D3D3D3,stroke:#333,stroke-width:1px
  `.trim();
  
  // Test if the cleaned diagram is valid Mermaid syntax
  try {
    // Simple syntax check for common errors
    const lines = cleaned.split('\n');
    let openBrackets = 0;
    let openQuotes = false;
    
    // Check for specific syntax errors that cause parsing failures
    if (cleaned.includes("graph TDflowchart TD") || 
        cleaned.includes("flowchart TDgraph TD") ||
        cleaned.match(/graph\s+TD[\s\S]*flowchart\s+TD/)) {
      console.warn('Syntax error: Multiple graph/flowchart declarations');
      return fallbackDiagram;
    }
    
    for (const line of lines) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '[') openBrackets++;
        if (line[i] === ']') openBrackets--;
        if (line[i] === '"' && (i === 0 || line[i-1] !== '\\')) openQuotes = !openQuotes;
      }
      
      // Check for unbalanced brackets or quotes at the end of each line
      if (openBrackets < 0) {
        console.warn('Syntax error: Unbalanced brackets in diagram');
        return fallbackDiagram;
      }
    }
    
    // Check for unbalanced brackets or quotes at the end of the diagram
    if (openBrackets !== 0 || openQuotes) {
      console.warn('Syntax error: Unbalanced brackets or quotes in diagram');
      return fallbackDiagram;
    }
    
    // Check for lines that are too long (can cause rendering issues)
    const longLines = lines.filter(line => line.length > 500);
    if (longLines.length > 0) {
      console.warn('Syntax warning: Diagram contains lines that are too long');
      return fallbackDiagram;
    }
    
    console.log('Diagram cleaned, final length:', cleaned.length);
    return cleaned;
  } catch (error) {
    console.error('Error validating diagram syntax:', error);
    return fallbackDiagram;
  }
}
