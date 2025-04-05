"use client";

import React, { useEffect, useRef, useState } from 'react';

// Import mermaid dynamically to avoid SSR issues
let mermaid: any;
let svgPanZoom: any;

interface MermaidChartProps {
  chart: string;
  className?: string;
  zoomingEnabled?: boolean;
}

export const MermaidChart: React.FC<MermaidChartProps> = ({ 
  chart, 
  className,
  zoomingEnabled = true 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [panZoomInstance, setPanZoomInstance] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Only load browser-specific modules on the client side
  useEffect(() => {
    const loadModules = async () => {
      try {
        // Dynamically import modules only on client-side
        mermaid = (await import('mermaid')).default;
        svgPanZoom = (await import('svg-pan-zoom')).default;
        
        setIsClient(true);
      } catch (err) {
        console.error('Error loading modules:', err);
        setError('Failed to load diagram rendering modules');
      }
    };
    
    loadModules();
  }, []);

  // Effect to handle changes in zoomingEnabled
  useEffect(() => {
    if (panZoomInstance) {
      if (zoomingEnabled) {
        panZoomInstance.enableZoom();
      } else {
        panZoomInstance.disableZoom();
      }
    }
  }, [zoomingEnabled, panZoomInstance]);

  useEffect(() => {
    if (!isClient || !mermaid || !chart || !ref.current) return;

    // Initialize mermaid with optimal settings for complex diagrams
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis',
        diagramPadding: 8,
      },
      themeVariables: {
        // Dark theme variables
        primaryColor: '#6366f1',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#6366f1',
        lineColor: '#8b8b8b',
        secondaryColor: '#444444',
        tertiaryColor: '#2a2a2a',
        // Background colors for different node types
        nodeBorder: '#555555',
        mainBkg: '#333333',
        secondaryBkg: '#3a3a3a',
        tertiaryBkg: '#2a2a2a',
        // Text colors
        textColor: '#eeeeee',
        // Notes and other elements
        noteBkgColor: '#444444',
        noteTextColor: '#eeeeee',
        noteBorderColor: '#555555',
      }
    });

    const renderChart = async () => {
      if (!ref.current) return;

      try {
        setError(null);
        // Clear previous content
        ref.current.innerHTML = '';
        
        // Render the chart
        const { svg } = await mermaid.render('mermaid-chart', chart);
        
        // Set the SVG content for potential download
        setSvgContent(svg);
        
        // Insert the SVG into the DOM
        ref.current.innerHTML = svg;
        
        // Clean up previous instance
        if (panZoomInstance) {
          try {
            panZoomInstance.destroy();
          } catch (e) {
            console.log('Error destroying previous instance:', e);
          }
        }
        
        // Initialize pan and zoom after a short delay to ensure the SVG is fully rendered
        setTimeout(() => {
          if (ref.current) {
            const svgElement = ref.current.querySelector('svg');
            if (svgElement) {
              try {
                // Set the SVG background to match the app theme
                svgElement.style.backgroundColor = '#2a2a2a';
                
                // Initialize new pan-zoom instance with error handling
                const instance = svgPanZoom(svgElement, {
                  zoomEnabled: zoomingEnabled,
                  controlIconsEnabled: true,
                  fit: true,
                  center: true,
                  minZoom: 0.5,
                  maxZoom: 10,
                  zoomScaleSensitivity: 0.4,
                  beforePan: function() {
                    return true; // Always allow panning
                  }
                });
                
                setPanZoomInstance(instance);
              } catch (err) {
                console.error('Error initializing pan-zoom:', err);
                // Continue without pan-zoom functionality
              }
            }
          }
        }, 200);
      } catch (err) {
        console.error('Error rendering Mermaid chart:', err);
        setError(`Failed to render diagram: ${(err as Error).message}`);
      }
    };

    renderChart();

    // Cleanup function
    return () => {
      if (panZoomInstance) {
        try {
          panZoomInstance.destroy();
        } catch (e) {
          console.log('Error destroying instance on cleanup:', e);
        }
      }
    };
  }, [chart, isClient, zoomingEnabled]);

  // If not client-side yet, show a loading state
  if (!isClient) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center justify-center h-full min-h-[300px] bg-[#2a2a2a] rounded-lg">
          <p className="text-gray-500">Loading diagram...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {error ? (
        <div className="p-4 border border-red-300 bg-red-900/20 text-red-300 rounded">
          {error}
        </div>
      ) : (
        <div 
          ref={ref} 
          className="mermaid-chart overflow-hidden bg-[#2a2a2a] rounded-lg p-2 h-full"
          id="mermaid-diagram-container"
        />
      )}
    </div>
  );
};
