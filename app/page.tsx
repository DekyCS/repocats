"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Github } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [repoInput, setRepoInput] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse the input to extract owner and repo
    let owner, repo;
    
    // Clean the input first
    const cleanInput = repoInput.trim();
    
    // Handle full GitHub URLs with various formats
    if (cleanInput.includes("github.com")) {
      // Extract the part after github.com/
      let path = "";
      
      if (cleanInput.includes("github.com/")) {
        path = cleanInput.split("github.com/")[1];
      } else if (cleanInput.includes("github.com:")) {
        path = cleanInput.split("github.com:")[1];
      }
      
      if (path) {
        // Split by slash and get the first two parts
        const urlParts = path.split("/");
        if (urlParts && urlParts.length >= 2) {
          owner = urlParts[0];
          // Remove any hash, query params, or .git extension
          repo = urlParts[1].split("#")[0].split("?")[0].replace(/\.git$/, "");
        }
      }
    } 
    // Handle git clone URLs (both https and ssh)
    else if (cleanInput.includes("git@github.com:") || cleanInput.includes("git://github.com/")) {
      let path = "";
      
      if (cleanInput.includes("git@github.com:")) {
        path = cleanInput.split("git@github.com:")[1];
      } else if (cleanInput.includes("git://github.com/")) {
        path = cleanInput.split("git://github.com/")[1];
      }
      
      if (path) {
        const urlParts = path.split("/");
        if (urlParts && urlParts.length >= 2) {
          owner = urlParts[0];
          repo = urlParts[1].split("#")[0].split("?")[0].replace(/\.git$/, "");
        }
      }
    }
    // Handle owner/repo format
    else if (cleanInput.includes("/")) {
      const parts = cleanInput.split("/");
      if (parts.length >= 2) {
        owner = parts[0].trim();
        repo = parts[1].trim().split("#")[0].split("?")[0].replace(/\.git$/, "");
      }
    }
    
    // Navigate to the repo page if we have valid owner and repo
    if (owner && repo) {
      console.log(`Navigating to repository: ${owner}/${repo}`);
      router.push(`/${owner}/${repo}`);
    } else {
      // Show an error or feedback to the user
      alert("Please enter a valid GitHub repository in the format 'owner/repo' or a GitHub URL");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="mb-8 pt-24">
            <div className="text-5xl md:text-6xl lg:text-7xl mb-2" style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)' }}>welcome to</div>
            <div className="text-5xl md:text-6xl lg:text-7xl" style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)' }}>
              a <span className="text-[#C3B1E1]">smarter</span> repository
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mt-6">
            Beautifully designed, AI-powered BROO, and focused on developer productivity.
            <br />
            Explore code with features, diagrams, and intelligent explanations.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Enter GitHub repository (e.g., facebook/react or https://github.com/facebook/react)"
                className="pl-12 py-6 text-lg h-auto"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
              />
            </div>
            
            <Button type="submit" size="lg" className="py-6 text-lg">
              Explore Repository
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
        
        <div className="mt-8">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm"
            onClick={() => {
              setRepoInput("DekyCS/bagelhacks");
              setTimeout(() => handleSubmit({ preventDefault: () => {} } as React.FormEvent), 100);
            }}
          >
            Try an example: DekyCS/bagelhacks
          </Button>
        </div>
      </div>
      
      <footer className="mt-auto pt-12 pb-6 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Repository Viewer - Built with Next.js and AI</p>
      </footer>
    </div>
  );
}
