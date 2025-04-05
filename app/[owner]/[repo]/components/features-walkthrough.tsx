"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, Loader2, ArrowLeft, ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FileTreeItem } from "@/lib/types/github";
import { getFeatures, getOrCreateRepository, storeFeatures } from "@/lib/supabase";
import { toast } from "sonner";

interface FeaturesWalkthroughProps {
  owner: string;
  repo: string;
  fileStructure?: FileTreeItem[];
}

interface Feature {
  id: number;
  title: string;
  description: string;
  matches: number;
  walkthrough?: WalkthroughData | null;
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

export function FeaturesWalkthrough({ owner, repo, fileStructure }: FeaturesWalkthroughProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loadingWalkthroughs, setLoadingWalkthroughs] = useState(false);

  // Function to get repository content summary
  const getRepoContentSummary = () => {
    if (!fileStructure) return "";
    
    // Create a summary of the repository structure
    const summarizeFileTree = (items: FileTreeItem[], depth = 0, maxDepth = 3): string => {
      if (depth > maxDepth) return "...";
      
      return items.map(item => {
        if (item.type === "file") {
          return `${"  ".repeat(depth)}- ${item.path}`;
        } else {
          return `${"  ".repeat(depth)}+ ${item.path}/\n${summarizeFileTree(item.children, depth + 1, maxDepth)}`;
        }
      }).join("\n");
    };
    
    return summarizeFileTree(fileStructure);
  };

  // Fetch features on component mount
  useEffect(() => {
    if (owner && repo) {
      // Check if features are already in the database first
      const checkExistingFeatures = async () => {
        try {
          setLoading(true);
          console.log(`Checking for cached features for ${owner}/${repo}`);
          const cachedFeatures = await getFeatures(owner, repo);
          
          if (cachedFeatures && cachedFeatures.length > 0) {
            console.log(`Found ${cachedFeatures.length} cached features in Supabase`);
            console.log('Features with walkthroughs:', cachedFeatures.filter(f => f.walkthrough).length);
            setFeatures(cachedFeatures);
            setLoading(false);
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error checking existing features:", error);
          return false;
        }
      };
      
      // Only fetch features if they don't exist in the database
      checkExistingFeatures().then(featuresExist => {
        if (!featuresExist) {
          fetchFeaturesWithWalkthroughs();
        }
      });
    }
  }, [owner, repo]);

  // Filter features based on search query
  const filteredFeatures = searchQuery.trim() === "" 
    ? features 
    : features.filter((feature: Feature) => 
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Fetch features and walkthroughs from the API
  const fetchFeaturesWithWalkthroughs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching features for ${owner}/${repo} with generateWalkthroughs=true`);
      
      const response = await fetch("/api/analyze-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner,
          repo,
          generateWalkthroughs: true,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch features: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Received ${data.features?.length || 0} features from API`);
      
      if (data.features && data.features.length > 0) {
        // Log walkthrough data for debugging
        console.log(`Features with walkthroughs: ${data.features.filter((f: any) => f.walkthrough).length}`);
        data.features.forEach((feature: any, index: number) => {
          console.log(`Feature ${index + 1}: ${feature.title}, Has walkthrough: ${feature.walkthrough ? 'Yes' : 'No'}`);
          if (feature.walkthrough) {
            console.log(`  Steps: ${feature.walkthrough.steps?.length || 0}`);
          }
        });
        
        setFeatures(data.features);
      } else {
        setFeatures([]);
      }
    } catch (err) {
      console.error('=== FEATURES ERROR ===');
      console.error("Error fetching features:", err);
      setError((err as Error).message || "Failed to fetch features");
    } finally {
      setLoading(false);
    }
  };

  // Handle feature selection
  const handleFeatureSelect = (feature: Feature) => {
    setSelectedFeature(feature);
    setCurrentStepIndex(0); // Reset to first step when selecting a new feature
  };

  // Go back to feature list
  const handleBackToFeatures = () => {
    setSelectedFeature(null);
  };

  // Navigate to next step
  const handleNextStep = () => {
    if (selectedFeature?.walkthrough && currentStepIndex < selectedFeature.walkthrough.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Navigate to previous step
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Render markdown content with syntax highlighting
  const renderMarkdown = (content: string) => {
    return (
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            code: ({node, className, children, ...props}) => {
              const match = /language-(\w+)/.exec(className || '');
              const childrenContent = String(children || '');
              const isInline = !match && !childrenContent.includes('\n');
              
              if (isInline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
              
              const language = match ? match[1] : '';
              return (
                <div className="my-4">
                  <SyntaxHighlighter
                    style={tomorrow as any}
                    language={language || 'text'}
                    PreTag="div"
                  >
                    {childrenContent.replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading repository features...</p>
          <p className="text-xs text-muted-foreground">(Using database cache when available)</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-red-500">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={fetchFeaturesWithWalkthroughs}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Walkthrough view with step-by-step navigation
  if (selectedFeature) {
    const walkthrough = selectedFeature.walkthrough;
    
    // Handle case where walkthrough failed to generate
    if (selectedFeature.error) {
      return (
        <div className="flex items-center justify-center h-[70vh] p-6">
          <div className="max-w-4xl w-full h-full rounded-lg border bg-[#2a2a2a] flex flex-col p-6">
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBackToFeatures}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Features
              </Button>
              <h2 className="text-2xl font-bold">{selectedFeature.title}</h2>
              <p className="text-muted-foreground">{selectedFeature.description}</p>
            </div>
            
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <p className="text-red-500 mb-4">{selectedFeature.error}</p>
                <Button 
                  variant="outline" 
                  onClick={handleBackToFeatures}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Handle case where walkthrough is still loading
    if (!walkthrough) {
      return (
        <div className="flex items-center justify-center h-[70vh] p-6">
          <div className="max-w-4xl w-full h-full rounded-lg border bg-[#2a2a2a] flex flex-col p-6">
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBackToFeatures}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Features
              </Button>
              <h2 className="text-2xl font-bold">{selectedFeature.title}</h2>
              <p className="text-muted-foreground">{selectedFeature.description}</p>
            </div>
            
            <div className="flex items-center justify-center flex-1">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading walkthrough...</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    const currentStep = walkthrough.steps[currentStepIndex];
    const totalSteps = walkthrough.steps.length;
    
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <div className="max-w-4xl w-full h-full rounded-lg border bg-[#2a2a2a] flex flex-col p-6 overflow-hidden">
          {/* Header and navigation */}
          <div>
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBackToFeatures}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Features
              </Button>
              <h2 className="text-2xl font-bold">{selectedFeature.title}</h2>
              <p className="text-muted-foreground">{selectedFeature.description}</p>
            </div>
            
            {/* Step navigation */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                Step {currentStepIndex + 1} of {totalSteps}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrevStep} 
                  disabled={currentStepIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNextStep} 
                  disabled={currentStepIndex === totalSteps - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Scrollable content area */}
          <div className="flex-1 w-full border rounded-md overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="p-4">
                {/* Step title and description */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{currentStep.title}</h3>
                  <p className="text-muted-foreground mb-4">{currentStep.description}</p>
                </div>
                
                {/* Files involved */}
                {currentStep.files.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Files Involved:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStep.files.map((file, index) => (
                        <div key={index} className="text-xs bg-[#3a3a3a] px-2 py-1 rounded">
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Code and explanation */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Code:</h4>
                  <div className="max-w-full overflow-hidden">
                    {renderMarkdown(currentStep.code)}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Explanation:</h4>
                  {renderMarkdown(currentStep.explanation)}
                </div>
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  }

  // Feature list view
  return (
    <div className="flex items-center justify-center h-[70vh] p-6">
      <div className="max-w-4xl w-full h-full rounded-lg border bg-[#2a2a2a] flex flex-col p-6 overflow-hidden">
        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search features..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Feature Results */}
        <div className="text-sm text-muted-foreground mb-2">
          {filteredFeatures.length} Features {searchQuery.trim() !== "" && `Matching "${searchQuery}"`}
          <span className="text-xs ml-2">(Click a feature to view its walkthrough guide)</span>
        </div>
        
        <div className="flex-1 w-full border rounded-md overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="flex flex-col space-y-2 p-4">
              {filteredFeatures.length > 0 ? (
                <>
                  {filteredFeatures.map((feature: Feature) => (
                    <div 
                      key={feature.id} 
                      className="p-4 border rounded-md hover:bg-[#3a3a3a] transition-colors cursor-pointer flex justify-between items-center"
                      onClick={() => handleFeatureSelect(feature)}
                    >
                      <div className="flex items-start">
                        <div className="text-primary mr-2">•</div>
                        <div>
                          <div className="font-medium">{feature.title}</div>
                          <div className="text-sm text-muted-foreground">{feature.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Approximately {feature.matches} file{feature.matches !== 1 ? 's' : ''} involved
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {feature.error ? (
                          <div className="text-xs text-red-500 mr-2">Error</div>
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No features found matching your search.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={fetchFeaturesWithWalkthroughs}
                  >
                    Refresh Features
                  </Button>
                </div>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
