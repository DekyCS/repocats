"use client";

import { useParams, useRouter } from "next/navigation";
import { RepoContent } from "@/app/[owner]/[repo]/components/repo-content";
import { FeaturesWalkthrough } from "@/app/[owner]/[repo]/components/features-walkthrough";
import { DiagramView } from "@/app/[owner]/[repo]/components/diagram-view";
import { useEffect, useState, Suspense } from "react";
import Loading from "./loading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeIcon, BookOpenIcon, NetworkIcon, Loader2 } from "lucide-react";
import { useRepositoryData } from "@/hooks/useRepositoryData";
import { FileTreeItem } from "@/lib/types/github";
import { getOrCreateRepository, getDiagram, getFeatures, storeDiagram, storeFeatures } from "@/lib/supabase";
import { toast } from "sonner";

// Main page component (client component)
export default function RepoPage() {
  const params = useParams();
  const router = useRouter();
  const owner = params?.owner as string;
  const repo = params?.repo as string;
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [initializationProgress, setInitializationProgress] = useState<string>("Checking repository status...");
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  const { loading, error, fileStructure, fetchRepoStructure } = useRepositoryData(owner, repo);
  
  // Function to generate repository features
  const generateFeatures = async (repoStructure: FileTreeItem[]) => {
    try {
      setInitializationProgress("Generating repository features...");
      setProgressPercentage(60);
      
      // Create a summary of the repository content for the AI
      const getRepoContentSummary = () => {
        const fileList = repoStructure.map(item => {
          return `${item.type === 'file' ? '[FILE]' : '[DIR]'} ${item.path}`;
        }).join('\n');
        
        return `Repository: ${owner}/${repo}\n\nFile Structure:\n${fileList}`;
      };
      
      const repoContent = getRepoContentSummary();
      console.log('Repository content summary length:', repoContent.length);
      
      // Set generateWalkthroughs to true to ensure walkthroughs are generated
      console.log(`Generating features for ${owner}/${repo}`);
      const response = await fetch("/api/analyze-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner,
          repo,
          repoContent,
          generateWalkthroughs: true // Changed to true to ensure walkthroughs are generated
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate features");
      }
      
      const data = await response.json();
      const featuresData = data.features || [];
      console.log(`Generated ${featuresData.length} features successfully`);
      
      // Store features in Supabase
      if (featuresData.length > 0) {
        const repository = await getOrCreateRepository(owner, repo);
        await storeFeatures(repository.id, featuresData);
        console.log('Features stored in Supabase successfully');
      }
      
      return featuresData;
    } catch (err) {
      console.error("Error generating features:", err);
      // Don't throw the error, just return an empty array to allow the page to load
      return [];
    }
  };
  
  // Function to generate repository diagram
  const generateDiagram = async () => {
    try {
      setInitializationProgress("Generating repository diagram...");
      setProgressPercentage(80);
      
      // First fetch Repomix data for the repository
      const fetchRepomixData = async () => {
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
          return data.data;
        } catch (err) {
          console.error('Error fetching Repomix data:', err);
          return null;
        }
      };
      
      // Get Repomix data
      const repomixData = await fetchRepomixData();
      
      if (!repomixData) {
        console.warn('Could not get repository analysis data, skipping diagram generation');
        return null;
      }
      
      // Generate diagram using AI
      console.log('Calling diagram API endpoint...');
      
      try {
        const response = await fetch('/api/diagram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ owner, repo, repomixData }),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await response.json();
        
        if (!data.success || !data.diagram) {
          throw new Error('Invalid response from diagram generation API');
        }
        
        // Store diagram in Supabase
        const repository = await getOrCreateRepository(owner, repo);
        await storeDiagram(repository.id, data.diagram);
        console.log('Diagram stored in Supabase successfully');
        
        return data.diagram;
      } catch (apiError) {
        console.error('Error in diagram API call:', apiError);
        
        // If we hit rate limits, return a basic diagram
        const basicDiagram = `
graph TD
    A[${owner}/${repo}] --> B[Repository]
    B --> C[Code]
    B --> D[Documentation]
    B --> E[Configuration]
`;
        
        // Try to store the basic diagram
        try {
          const repository = await getOrCreateRepository(owner, repo);
          await storeDiagram(repository.id, basicDiagram);
          console.log('Basic diagram stored in Supabase as fallback');
        } catch (storageError) {
          console.error('Error storing basic diagram:', storageError);
        }
        
        return basicDiagram;
      }
    } catch (err) {
      console.error('Error in diagram generation flow:', err);
      // Return a minimal diagram instead of throwing
      return `graph TD\n    A[${owner}/${repo}]`;
    }
  };
  
  // Initialize repository data, features, and diagrams
  useEffect(() => {
    async function initializeRepository() {
      if (!owner || !repo) return;
      
      try {
        setIsInitializing(true);
        setProgressPercentage(0);
        setInitializationProgress("Checking repository status...");
        
        // Step 1: Get or create repository in database
        setInitializationProgress("Initializing repository...");
        setProgressPercentage(10);
        const repositoryData = await getOrCreateRepository(owner, repo);
        const repositoryId = repositoryData?.id;
        
        if (!repositoryId) {
          throw new Error("Failed to initialize repository in database");
        }
        
        // Step 2: Fetch repository structure
        setInitializationProgress("Fetching repository structure...");
        setProgressPercentage(30);
        const repoStructure = await fetchRepoStructure();
        
        // Step 3: Check if diagram exists, if not generate it
        setInitializationProgress("Checking diagram data...");
        setProgressPercentage(40);
        let diagramData = await getDiagram(owner, repo);
        
        if (!diagramData) {
          try {
            setInitializationProgress("Generating repository diagram...");
            diagramData = await generateDiagram();
          } catch (diagramError) {
            console.error("Error during diagram generation:", diagramError);
            // Continue with initialization even if diagram generation fails
          }
        }
        
        // Step 4: Check if features exist, if not generate them
        setInitializationProgress("Checking features data...");
        setProgressPercentage(50);
        let featuresData = await getFeatures(owner, repo);
        
        if (!featuresData || featuresData.length === 0) {
          try {
            setInitializationProgress("Generating repository features...");
            featuresData = await generateFeatures(repoStructure);
          } catch (featuresError) {
            console.error("Error during features generation:", featuresError);
            // Continue with initialization even if features generation fails
          }
        }
        
        // All initialization complete
        setProgressPercentage(100);
        setInitializationProgress("Repository ready!");
        setTimeout(() => {
          setIsInitializing(false);
        }, 500); // Short delay to show "Repository ready!" message
      } catch (err) {
        console.error("Repository initialization error:", err);
        setInitializationError((err as Error).message || "Failed to initialize repository data");
        setIsInitializing(false);
      }
    }
    
    initializeRepository();
  }, [owner, repo, fetchRepoStructure]);
  
  // Show loading component when initializing or loading file structure
  if (isInitializing || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center text-center max-w-md">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading Repository</h2>
          <p className="text-muted-foreground mb-4">{initializationProgress || "Fetching repository data..."}</p>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || initializationError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500 mb-4">{error || initializationError}</p>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full h-screen pt-8 overflow-hidden">
      <Tabs defaultValue="code-explorer" className="w-full px-4 mb-4">
        <TabsList className="mx-auto">
          <TabsTrigger value="code-explorer">
            <CodeIcon className="w-4 h-4 mr-2" />
            Code Explorer
          </TabsTrigger>
          <TabsTrigger value="features">
            <BookOpenIcon className="w-4 h-4 mr-2" />
            Features Walkthroughs
          </TabsTrigger>
          <TabsTrigger value="diagram">
            <NetworkIcon className="w-4 h-4 mr-2" />
            Diagram
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code-explorer" className="mt-4">
          <RepoContent 
            owner={owner} 
            repo={repo} 
            fileStructure={fileStructure}
          />
        </TabsContent>
        <TabsContent value="features" className="mt-4">
          <FeaturesWalkthrough owner={owner} repo={repo} fileStructure={fileStructure} />
        </TabsContent>
        <TabsContent value="diagram" className="mt-4">
          <DiagramView owner={owner} repo={repo} fileStructure={fileStructure} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
