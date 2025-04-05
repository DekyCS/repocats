import { FolderIcon, FileIcon, ChevronRight, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define types for our file structure
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

interface AppSidebarProps {
  fileStructure?: FileTreeItem[];
  loading?: boolean;
  onFileSelect?: (file: FileItem) => void;
}

export function AppSidebar({ 
  fileStructure = [], 
  loading = false,
  onFileSelect
}: AppSidebarProps) {
  const [folders, setFolders] = useState<FileTreeItem[]>(fileStructure);
  
  // Update folders when fileStructure changes
  useEffect(() => {
    if (fileStructure.length > 0) {
      setFolders(fileStructure);
    }
  }, [fileStructure]);

  // Toggle folder expansion
  const toggleFolder = (folderItem: FolderItem) => {
    const newFolders = [...folders];
    
    // Find the folder in the hierarchy and toggle its expanded state
    const toggleFolderInTree = (items: FileTreeItem[]): boolean => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type === "folder") {
          if (item.path === folderItem.path) {
            // Found the folder, toggle its expanded state
            item.expanded = !item.expanded;
            return true;
          }
          
          // Search in children
          if (toggleFolderInTree(item.children)) {
            return true;
          }
        }
      }
      return false;
    };
    
    toggleFolderInTree(newFolders);
    setFolders(newFolders);
  };

  // Handle file click
  const handleFileClick = (file: FileItem) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  // Recursive function to render file structure
  const renderFileStructure = (items: FileTreeItem[]) => {
    return items.map((item) => {
      if (item.type === "folder") {
        return (
          <div key={item.path} className="mb-1">
            <div 
              className="flex items-center gap-1 hover:bg-secondary p-1 rounded cursor-pointer"
              onClick={() => toggleFolder(item)}
            >
              {item.expanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <FolderIcon size={16} />
              <span className="text-sm truncate">{item.name}</span>
            </div>
            {item.expanded && (
              <div className="ml-3 pl-1">
                {item.children.length > 0 ? (
                  renderFileStructure(item.children)
                ) : (
                  <div className="text-xs text-muted-foreground pl-5 py-1">Empty folder</div>
                )}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div 
            key={item.path} 
            className="flex items-center gap-1 ml-1 mb-1 hover:bg-secondary p-1 rounded cursor-pointer"
            onClick={() => handleFileClick(item)}
          >
            <FileIcon size={16} />
            <span className="text-sm truncate">{item.name}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 flex-shrink-0">
        <h2 className="text-sm font-medium">Files</h2>
      </div>
      <ScrollArea className="flex-1 h-[calc(100%-2.5rem)]">
        <div className="p-2">
          {loading ? (
            <div className="text-sm">Loading repository structure...</div>
          ) : folders.length === 0 ? (
            <div className="text-sm">No files found</div>
          ) : (
            <div>
              {renderFileStructure(folders)}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
