// GitHub API response types
export type GitHubContent = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir";
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

// File tree structure types
export type FileItem = {
  type: "file";
  name: string;
  path: string;
  sha: string;
  url?: string;
};

export type FolderItem = {
  type: "folder";
  name: string;
  path: string;
  expanded: boolean;
  children: FileTreeItem[];
};

export type FileTreeItem = FileItem | FolderItem;
