import { useState, useEffect, useCallback } from "react";
import { FileTreeItem } from "@/lib/types/github";
import { getDiagram, getOrCreateRepository, storeDiagram } from "@/lib/supabase";
import { toast } from "sonner";

export function useDiagram(owner: string, repo: string, fileStructure: FileTreeItem[]) {
  const [diagram, setDiagram] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<Date | undefined>();
  const [repomixData, setRepomixData] = useState<string | null>(null);
  const [usingAI, setUsingAI] = useState<boolean>(false);

  // Fetch Repomix data
  const fetchRepomixData = useCallback(async () => {
    try {
      const response = await fetch('/api/repomix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner, repo }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch repository analysis');
      }
      
      const data = await response.json();
      setRepomixData(data.data);
      return data.data;
    } catch (err) {
      console.error('Error fetching Repomix data:', err);
      return null;
    }
  }, [owner, repo]);

  // Generate diagram using OpenAI and Repomix data
  const generateAIDiagram = useCallback(async (repoData: string) => {
    try {
      setUsingAI(true);
      console.log('Starting AI diagram generation for', owner + '/' + repo);
      console.log('Repomix data length:', repoData.length);
      
      // Call the diagram generation API
      console.log('Calling diagram API endpoint...');
      const response = await fetch('/api/diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner, repo, repomixData: repoData }),
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error:', errorData);
        throw new Error(`API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }
      
      const data = await response.json();
      console.log('API response data:', { success: data.success, diagramAvailable: !!data.diagram });
      
      if (!data.success || !data.diagram) {
        throw new Error('Invalid response from diagram generation API');
      }
      
      console.log('AI diagram generated successfully, length:', data.diagram.length);
      return data.diagram;
    } catch (err) {
      console.error('Error generating AI diagram:', err);
      setUsingAI(false);
      return null;
    }
  }, [owner, repo]);

  // Generate diagram using Repomix data and file structure
  const generateDiagram = useCallback(async (forceRegenerate = false) => {
    try {
      setLoading(true);
      console.log('=== DIAGRAM LOADING STARTED ===');
      console.log(`Repository: ${owner}/${repo}`);
      console.log('Timestamp:', new Date().toISOString());
      
      // Check Supabase cache first (unless force regenerate is true)
      if (!forceRegenerate) {
        try {
          console.log(`Checking for cached diagram for ${owner}/${repo}`);
          const cachedDiagram = await getDiagram(owner, repo);
          if (cachedDiagram) {
            console.log('Found cached diagram in Supabase');
            console.log('Diagram length:', cachedDiagram.length);
            console.log('=== DIAGRAM LOADED FROM DATABASE ===');
            setDiagram(cachedDiagram);
            setLastGenerated(new Date());
            setUsingAI(true); // Assume AI-generated if from Supabase
            setLoading(false);
            return;
          } else {
            console.log('No cached diagram found, generating new one');
          }
        } catch (cacheError) {
          console.error('Error retrieving cached diagram from Supabase:', cacheError);
          // Continue with generation if Supabase retrieval fails
        }
      } else {
        console.log('Force regenerating diagram, bypassing cache');
      }
      
      // Generate new diagram if not in cache
      console.log('Cache miss: Generating fresh diagram');
      
      // Fetch Repomix data if we don't have it yet
      let repoData = repomixData;
      if (!repoData) {
        console.log('Fetching Repomix data...');
        console.time('Repomix data fetch');
        repoData = await fetchRepomixData();
        console.timeEnd('Repomix data fetch');
        console.log('Repomix data fetched:', repoData ? 'success' : 'failed');
        if (repoData) {
          console.log('Repomix data length:', repoData.length);
        }
      }
      
      let mermaidDiagram: string;
      
      // Try to generate an AI diagram if we have Repomix data
      if (repoData) {
        console.log('Attempting to generate AI diagram with o3-mini...');
        console.time('AI diagram generation');
        const aiDiagram = await generateAIDiagram(repoData);
        console.timeEnd('AI diagram generation');
        
        if (aiDiagram) {
          console.log('AI diagram generation successful');
          console.log('AI diagram length:', aiDiagram.length);
          mermaidDiagram = aiDiagram;
          setUsingAI(true);
          
          // Store in Supabase
          try {
            console.log(`Storing diagram for ${owner}/${repo} in Supabase`);
            const repository = await getOrCreateRepository(owner, repo);
            console.log(`Repository ID for storage: ${repository.id}`);
            await storeDiagram(repository.id, aiDiagram);
            console.log('Diagram stored in Supabase successfully');
          } catch (storageError) {
            console.error('Error storing diagram in Supabase:', storageError);
            // Continue even if storage fails
          }
        } else {
          console.log('AI diagram generation failed, falling back to basic diagram');
          // Fall back to basic diagram generation
          console.time('Basic diagram generation (with Repomix)');
          mermaidDiagram = generateMermaidDiagram(fileStructure, repoData, owner, repo);
          console.timeEnd('Basic diagram generation (with Repomix)');
          setUsingAI(false);
        }
      } else {
        console.log('No Repomix data available, using basic diagram');
        // No Repomix data, use basic diagram
        console.time('Basic diagram generation');
        mermaidDiagram = generateBasicDiagram(fileStructure, owner, repo);
        console.timeEnd('Basic diagram generation');
        setUsingAI(false);
      }
      
      setDiagram(mermaidDiagram);
      setLastGenerated(new Date());
      setError(null);
      console.log('=== DIAGRAM GENERATION COMPLETED ===');
    } catch (err) {
      console.error('=== DIAGRAM ERROR ===');
      console.error('Error in generateDiagram:', err);
      setError((err as Error).message || "Failed to generate diagram");
    } finally {
      setLoading(false);
    }
  }, [owner, repo, fileStructure, repomixData, fetchRepomixData, generateAIDiagram, usingAI]);

  // Generate diagram when file structure changes
  useEffect(() => {
    if (fileStructure.length > 0) {
      void generateDiagram();
    }
  }, [fileStructure, generateDiagram]);

  // Function to generate Mermaid diagram
  function generateMermaidDiagram(
    fileStructure: FileTreeItem[], 
    repomixData: string | null,
    owner: string, 
    repo: string
  ): string {
    // Basic diagram if no Repomix data is available
    if (!repomixData) {
      return generateBasicDiagram(fileStructure, owner, repo);
    }
    
    // Enhanced diagram generation using Repomix data
    // For now, we'll generate a basic diagram, but this could be enhanced with LLM integration
    
    // Start with Mermaid flowchart definition
    let diagram = `graph TD\n`;
    
    // Add repository as the root node
    diagram += `  root["${owner}/${repo}"]\n`;
    
    // Create a map to track unique IDs for nodes
    const nodeMap = new Map<string, string>();
    let nodeCounter = 0;
    
    // Function to get or create a node ID
    function getNodeId(path: string): string {
      if (!nodeMap.has(path)) {
        nodeMap.set(path, `node${nodeCounter++}`);
      }
      return nodeMap.get(path)!;
    }
    
    // Process file structure to create nodes and connections
    function processFileStructure(items: FileTreeItem[], parentId: string) {
      items.forEach(item => {
        const nodeId = getNodeId(item.path);
        
        if (item.type === "folder") {
          diagram += `  ${nodeId}["📁 ${item.name}"]\n`;
          diagram += `  ${parentId} --> ${nodeId}\n`;
          
          // Process children
          if (item.children.length > 0) {
            processFileStructure(item.children, nodeId);
          }
        } else {
          // Determine file type icon based on extension
          const extension = item.name.split('.').pop()?.toLowerCase() || '';
          let icon = '📄';
          
          // Add special icons for common file types
          if (['js', 'jsx', 'ts', 'tsx'].includes(extension)) {
            icon = '🟨'; // JavaScript/TypeScript
          } else if (['html', 'htm'].includes(extension)) {
            icon = '🌐'; // HTML
          } else if (['css', 'scss', 'sass'].includes(extension)) {
            icon = '🎨'; // CSS
          } else if (['json'].includes(extension)) {
            icon = '📋'; // JSON
          } else if (['md', 'markdown'].includes(extension)) {
            icon = '📝'; // Markdown
          } else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
            icon = '🖼️'; // Images
          }
          
          diagram += `  ${nodeId}["${icon} ${item.name}"]\n`;
          diagram += `  ${parentId} --> ${nodeId}\n`;
        }
      });
    }
    
    // Start processing from the root
    processFileStructure(fileStructure, 'root');
    
    return diagram;
  }

  // Generate a basic diagram from file structure
  function generateBasicDiagram(
    fileStructure: FileTreeItem[],
    owner: string,
    repo: string
  ): string {
    // Start with Mermaid flowchart definition
    let diagram = `graph TD\n`;
    
    // Add repository as the root node
    diagram += `  root["${owner}/${repo}"]\n`;
    
    // Add top-level files and directories
    fileStructure.forEach((item, index) => {
      const id = `node${index}`;
      
      if (item.type === "folder") {
        diagram += `  ${id}["📁 ${item.name}"]\n`;
      } else {
        diagram += `  ${id}["📄 ${item.name}"]\n`;
      }
      
      // Connect to root
      diagram += `  root --> ${id}\n`;
    });
    
    return diagram;
  }

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(diagram);
      console.log('Diagram copied to clipboard');
    } catch (error) {
      console.error("Failed to copy diagram:", error);
    }
  };

  // Handle export as PNG
  const handleExportImage = () => {
    try {
      // Get the SVG element from the mermaid-diagram-container
      const container = document.getElementById('mermaid-diagram-container');
      if (!container) {
        console.error("Diagram container not found");
        return;
      }
      
      const svgElement = container.querySelector('svg');
      if (!(svgElement instanceof SVGSVGElement)) {
        console.error("SVG element not found in diagram container");
        return;
      }

      // Create a blob URL directly from the SVG
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Create a download link for the SVG instead of trying to convert to PNG
      // This avoids the tainted canvas issue
      const a = document.createElement('a');
      a.href = svgUrl;
      a.download = `${owner}-${repo}-diagram.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(svgUrl);
      }, 100);
    } catch (error) {
      console.error("Error exporting diagram:", error);
    }
  };

  return {
    diagram,
    loading,
    error,
    lastGenerated,
    usingAI,
    regenerate: () => generateDiagram(true),
    handleCopy,
    handleExportImage
  };
}
