import { useState, useEffect, useCallback } from "react";
import { GitHubContent, FileTreeItem } from "@/lib/types/github";

export function useRepositoryData(owner: string, repo: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileStructure, setFileStructure] = useState<FileTreeItem[]>([]);

  // Make fetchRepoStructure available outside the effect
  const fetchRepoStructure = useCallback(async (): Promise<FileTreeItem[]> => {
    if (!owner || !repo) return [];
    
    try {
      setLoading(true);
      setError(null);
      const completeStructure = await buildCompleteFileTree(owner, repo);
      setFileStructure(completeStructure);
      return completeStructure;
    } catch (err) {
      const errorMessage = (err as Error).message || "An error occurred while fetching the repository data.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [owner, repo]);

  useEffect(() => {
    // Only auto-fetch on initial mount if we're not using the initialization flow
    fetchRepoStructure().catch(err => {
      console.error("Error in initial repo structure fetch:", err);
    });
  }, [fetchRepoStructure]);

  async function buildCompleteFileTree(owner: string, repo: string): Promise<FileTreeItem[]> {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
    const result = await fetchDirectoryContents(apiUrl, owner, repo);
    return result;
  }

  async function fetchDirectoryContents(url: string, owner: string, repo: string): Promise<FileTreeItem[]> {
    try {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      };
      
      // Add authorization header with GitHub token from environment variable
      const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (githubToken) {
        headers['Authorization'] = `token ${githubToken}`;
      }
      
      const response = await fetch(url, { 
        headers,
        // Add cache options for better performance
        cache: 'no-store'
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Try again later.");
        } else if (response.status === 404) {
          throw new Error(`Repository or path not found.`);
        } else {
          throw new Error(`GitHub API error: ${response.status}`);
        }
      }
      
      const contents = await response.json() as GitHubContent[];
      
      // Process each item in parallel for better performance
      const promises = contents.map(async (item) => {
        if (item.type === "dir") {
          // Fetch contents of this directory
          try {
            const children = await fetchDirectoryContents(item.url, owner, repo);
            
            // Create folder item with its children
            return {
              type: "folder" as const,
              name: item.name,
              path: item.path,
              expanded: false,
              children
            };
          } catch (error) {
            // If there's an error, still return the folder but with empty children
            console.error(`Error fetching contents of ${item.path}:`, error);
            return {
              type: "folder" as const,
              name: item.name,
              path: item.path,
              expanded: false,
              children: []
            };
          }
        } else {
          // Create file item
          return {
            type: "file" as const,
            name: item.name,
            path: item.path,
            sha: item.sha,
            url: item.html_url
          };
        }
      });
      
      // Wait for all directories to be processed
      const items = await Promise.all(promises);
      
      // Sort items: folders first, then files, both alphabetically
      items.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === "folder" ? -1 : 1;
      });
      
      return items;
    } catch (error) {
      console.error("Error fetching directory contents:", error);
      throw error;
    }
  }

  return {
    loading,
    error,
    fileStructure,
    fetchRepoStructure
  };
}
