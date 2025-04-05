"use client";

import { useState, useEffect, useRef } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FileIcon, Copy, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import { toast } from "@/components/ui/use-toast";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


// Import types from parent
type FileItem = {
  type: "file";
  name: string;
  path: string;
  sha: string;
  url?: string;
};

type FolderItem = {
  type: "folder";
  name: string;
  path: string;
  expanded: boolean;
  children: FileTreeItem[];
};

type FileTreeItem = FileItem | FolderItem;

interface RepoContentProps {
  owner: string;
  repo: string;
  fileStructure: FileTreeItem[];
}

export function RepoContent({ owner, repo, fileStructure }: RepoContentProps) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [fileLanguage, setFileLanguage] = useState<string>("text");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");
  const [loadingExplanation, setLoadingExplanation] = useState<boolean>(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);

  // Handle file selection
  const handleFileSelect = async (file: FileItem) => {
    setSelectedFile(file);
    await fetchFileContent(file);
  };

  // Determine the language based on file extension
  const getLanguageFromFilename = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'jsx',
      'ts': 'typescript',
      'tsx': 'tsx',
      'py': 'python',
      'rb': 'ruby',
      'java': 'java',
      'c': 'c',
      'cpp': 'cpp',
      'cs': 'csharp',
      'go': 'go',
      'php': 'php',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'md': 'markdown',
      'yml': 'yaml',
      'yaml': 'yaml',
      'sh': 'bash',
      'bash': 'bash',
      'sql': 'sql',
      'swift': 'swift',
      'kt': 'kotlin',
      'rs': 'rust',
      'dart': 'dart',
    };
    
    return languageMap[extension] || 'text';
  };

  // Get folder path from file path
  const getFolderPath = (filePath: string): string => {
    const parts = filePath.split('/');
    if (parts.length <= 1) return '';
    return parts.slice(0, -1).join('/');
  };

  // Check if file is a binary or non-displayable file
  const isNonDisplayableFile = (filename: string): boolean => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    // List of common binary and non-code file extensions
    const nonDisplayableExtensions = [
      // Images
      'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'ico', 'webp', 'tiff',
      // Videos
      'mp4', 'webm', 'mov', 'avi', 'wmv', 'flv', 'mkv',
      // Audio
      'mp3', 'wav', 'ogg', 'flac', 'aac',
      // Documents
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
      // Archives
      'zip', 'rar', 'tar', 'gz', '7z',
      // Other binary formats
      'exe', 'dll', 'so', 'bin', 'dat', 'iso',
      // Font files
      'ttf', 'otf', 'woff', 'woff2',
      // 3D and animation files
      'glb', 'gltf', 'fbx', 'obj', 'stl', 'dae', 'blend',
      'anim', 'aep', 'fla', 'swf', 'lottie', 'json3d',
    ];
    
    return nonDisplayableExtensions.includes(extension);
  };

  // Fetch file content from GitHub
  const fetchFileContent = async (file: FileItem) => {
    if (!file || file.type !== 'file') return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Construct the GitHub API URL for the file content
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`;
      
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3.raw',
      };
      
      // Add authorization header with GitHub token from environment variable if available
      const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (githubToken) {
        headers['Authorization'] = `token ${githubToken}`;
      }
      
      const response = await fetch(apiUrl, { 
        headers,
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch file content: ${response.status} ${response.statusText}`);
      }
      
      // Get the raw content
      const content = await response.text();
      setFileContent(content);
      
      // Set the language for syntax highlighting
      setFileLanguage(getLanguageFromFilename(file.name));
      
    } catch (err) {
      console.error('Error fetching file content:', err);
      setError((err as Error).message || 'Failed to fetch file content');
      setFileContent('');
    } finally {
      setLoading(false);
    }
  };

  // Fetch code explanation from the API
  const fetchCodeExplanation = async (code: string, isSnippet: boolean) => {
    if (!selectedFile) return;
    
    try {
      setLoadingExplanation(true);
      setExplanationError(null);
      
      // Call the explanation API
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner,
          repo,
          code,
          filePath: selectedFile.path,
          isSnippet
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }
      
      const data = await response.json();
      
      if (!data.success || !data.explanation) {
        throw new Error('Invalid response from explanation API');
      }
      
      setExplanation(data.explanation);
    } catch (err) {
      console.error('Error fetching code explanation:', err);
      setExplanationError((err as Error).message || 'Failed to generate explanation');
      setExplanation('');
    } finally {
      setLoadingExplanation(false);
    }
  };

  // Handle "Explain" context menu item click
  const handleExplain = () => {
    // Reset previous explanation
    setExplanation('');
    setExplanationError(null);
    
    // Open the drawer
    setIsDrawerOpen(true);
    
    // Get the code to explain (selected text or entire file)
    const codeToExplain = selectedText || fileContent;
    const isSnippet = !!selectedText;
    
    // Fetch the explanation
    fetchCodeExplanation(codeToExplain, isSnippet);
  };

  return (
    <div className="flex items-center justify-center h-[70vh] p-6">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-4xl w-full h-full rounded-lg border bg-[#2a2a2a]"
      >
        <ResizablePanel defaultSize={10} minSize={10}>
          <div className="h-full overflow-hidden">
            {/* Pass the complete file structure to the sidebar */}
            <AppSidebar 
              fileStructure={fileStructure} 
              loading={false} 
              onFileSelect={handleFileSelect}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex flex-col h-full">
            <div className="h-9 py-1 px-4 flex items-center border-b border-border">
              <FileIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              {selectedFile ? (
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">
                    {getFolderPath(selectedFile.path)}
                  </span>
                  {getFolderPath(selectedFile.path) && (
                    <span className="mx-1 text-muted-foreground">/</span>
                  )}
                  <span className="font-medium">{selectedFile.name}</span>
                </div>
              ) : (
                <span className="text-sm font-medium">{owner}/{repo}</span>
              )}
            </div>
            <div className="flex-1 h-[calc(100%-2rem)] w-full p-0 items-center justify-center">
              <ScrollArea className="h-full w-full">
                <div className="w-full h-full">
                  {loading ? (
                    <div className="flex items-center justify-center h-full pt-15">
                      <p className="text-muted-foreground">Loading file content...</p>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center h-full pt-15">
                      <p className="text-destructive">{error}</p>
                    </div>
                  ) : !selectedFile ? (
                    <div className="flex items-center justify-center h-full pt-15">
                      <p className="text-muted-foreground">Select a file from the sidebar to view its content</p>
                    </div>
                  ) : isNonDisplayableFile(selectedFile.name) ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 pt-15">
                      <p className="text-muted-foreground">This file type cannot be displayed in the code viewer</p>
                      <p className="text-sm text-muted-foreground">File: {selectedFile.name}</p>
                      {selectedFile.url && (
                        <a 
                          href={selectedFile.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm mt-2"
                        >
                          View on GitHub
                        </a>
                      )}
                    </div>
                  ) : (
                    <ContextMenu>
                      <ContextMenuTrigger className="w-full h-full" onContextMenu={() => {
                        // Get the currently selected text when right-clicking
                        const selection = window.getSelection();
                        const selectedText = selection ? selection.toString() : "";
                        setSelectedText(selectedText);
                      }}>
                        <SyntaxHighlighter 
                          language={fileLanguage}
                          style={tomorrow}
                          showLineNumbers={true}
                          wrapLines={true}
                          customStyle={{
                            borderRadius: '0',
                            margin: 0,
                            padding: 0,
                            width: '100%',
                            backgroundColor: '#1c1c1c', // New background color
                          }}
                          codeTagProps={{
                            style: {
                              color: '#cdc7bd', // Button color for default text
                              fontFamily: 'var(--font-geist-mono)',
                            }
                          }}
                          lineNumberStyle={{
                            minWidth: '3.5em',
                            paddingRight: '1em',
                            textAlign: 'right',
                            color: '#a09a91', // Darker shade of button color for line numbers
                            backgroundColor: '#2a2a2a', // Slightly lighter than background
                            borderRight: '1px solid #3a3a3a',
                            marginRight: '1em'
                          }}
                        >
                          {fileContent || '// No content available'}
                        </SyntaxHighlighter>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="min-w-[160px]">
                        <ContextMenuItem onSelect={() => {
                          // If text is selected, copy that; otherwise copy the entire file
                          const textToCopy = selectedText || fileContent;
                          navigator.clipboard.writeText(textToCopy);
                        }}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>{selectedText ? 'Copy' : 'Copy All'}</span>
                        </ContextMenuItem>
                        <ContextMenuItem onSelect={handleExplain}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          <span>Explain{selectedText ? '' : ' File'}</span>
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  )}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="text-center pb-2">
            <DrawerTitle className="text-lg">
              {selectedText ? (
                <div className="flex justify-center">
                  <div className="max-w-[95%] w-[800px]">
                    <ScrollArea className="h-[150px] rounded-md overflow-hidden border-0" style={{ border: 'none' }}>
                      <SyntaxHighlighter 
                        language={fileLanguage}
                        style={tomorrow}
                        showLineNumbers={false}
                        customStyle={{
                          borderRadius: '0.375rem',
                          margin: 0,
                          padding: '0.5rem',
                          fontSize: '0.875rem',
                          backgroundColor: '#1c1c1c', // New background color
                          maxHeight: 'none', // Remove default max height
                          border: 'none',
                        }}
                        codeTagProps={{
                          style: {
                            fontFamily: 'var(--font-geist-mono)',
                          }
                        }}
                      >
                        {selectedText}
                      </SyntaxHighlighter>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="text-sm font-medium max-w-[95%] w-[800px]">
                    {selectedFile ? selectedFile.name : "Explain Code"}
                  </div>
                </div>
              )}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-2 h-[450px] flex items-center justify-center">
            <div className="w-[800px] max-w-[95%]">
              {loadingExplanation ? (
                <div className="flex flex-col items-center justify-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Generating AI explanation...</p>
                </div>
              ) : explanationError ? (
                <div className="text-center">
                  <p className="text-destructive">{explanationError}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => fetchCodeExplanation(selectedText || fileContent, !!selectedText)}
                  >
                    Try Again
                  </Button>
                </div>
              ) : explanation ? (
                <ScrollArea className="h-[450px] pr-4">
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        code({className, children, ...props}) {
                          const match = /language-(\w+)/.exec(className || '');
                          if (match) {
                            // For code blocks, just use a pre with syntax highlighting class
                            return (
                              <pre className={`language-${match[1]} bg-[#2a2a2a] p-4 rounded overflow-auto`}>
                                <code className={`language-${match[1]}`} {...props}>
                                  {String(children).replace(/\n$/, '')}
                                </code>
                              </pre>
                            );
                          }
                          // For inline code
                          return (
                            <code className="bg-[#2a2a2a] px-1 py-0.5 rounded text-sm font-mono" {...props}>
                              {children}
                            </code>
                          );
                        },
                        h1: ({children}) => <h1 className="text-2xl font-bold mb-4 text-primary">{children}</h1>,
                        h2: ({children}) => <h2 className="text-xl font-bold mb-3 mt-6 text-primary">{children}</h2>,
                        h3: ({children}) => <h3 className="text-lg font-bold mb-2 mt-5 text-primary">{children}</h3>,
                        p: ({children}) => <p className="mb-4 text-foreground">{children}</p>,
                        ul: ({children}) => <ul className="mb-4 ml-6 list-disc">{children}</ul>,
                        ol: ({children}) => <ol className="mb-4 ml-6 list-decimal">{children}</ol>,
                        li: ({children}) => <li className="mb-1">{children}</li>,
                        blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>,
                        a: ({children, href}) => <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                      }}
                    >
                      {explanation}
                    </ReactMarkdown>
                    <div className="flex justify-center mt-8 mb-12">
                      <Button 
                        variant="default" 
                        onClick={() => setIsDrawerOpen(false)}
                        size="sm"
                      >
                        Close Explanation
                      </Button>
                    </div>
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              ) : (
                <p className="text-center text-muted-foreground">Waiting for explanation...</p>
              )}
            </div>
          </div>
          <DrawerFooter className="flex flex-col items-center pt-6 pb-8">
            <div className="flex gap-2">
              <Button 
                variant="default" 
                onClick={() => setIsDrawerOpen(false)}
                size="sm"
                className="w-full"
              >
                Close Explanation
              </Button>
              {explanation && !loadingExplanation && !explanationError && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(explanation);
                    toast({
                      title: "Copied!",
                      description: "Explanation copied to clipboard",
                    });
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              )}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </div>
  );
}
