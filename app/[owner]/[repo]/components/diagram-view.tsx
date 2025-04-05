"use client";

import { useState } from "react";
import { MermaidChart } from "@/components/mermaid-chart";
import { useDiagram } from "@/hooks/useDiagram";
import { FileTreeItem } from "@/lib/types/github";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Download, Copy, RefreshCw } from "lucide-react";

interface DiagramViewProps {
  owner: string;
  repo: string;
  fileStructure: FileTreeItem[];
}

const defaultDiagram = "graph LR;";

export function DiagramView({ owner, repo, fileStructure }: DiagramViewProps) {
  const [zoomingEnabled, setZoomingEnabled] = useState(true);
  
  const {
    diagram,
    error,
    loading,
    regenerate,
    handleCopy,
    handleExportImage
  } = useDiagram(owner, repo, fileStructure);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading repository diagram...</p>
          <p className="text-xs text-muted-foreground">(Using database cache when available)</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-red-500">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => regenerate()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[70vh] p-6">
      <div className="max-w-4xl w-full h-full rounded-lg border bg-[#2a2a2a] flex flex-col p-6">
        {/* Controls Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Switch
              checked={zoomingEnabled}
              onCheckedChange={setZoomingEnabled}
              id="zoom-toggle"
            />
            <label htmlFor="zoom-toggle" className="text-sm">Enable Zooming</label>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={() => regenerate()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
        </div>
        
        {/* Diagram Display */}
        <div className="flex-1 relative overflow-hidden">
          <MermaidChart 
            chart={diagram || defaultDiagram} 
            className="h-full w-full"
            zoomingEnabled={zoomingEnabled}
          />
        </div>
      </div>
    </div>
  );
}
