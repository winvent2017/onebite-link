"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Folder } from "./types";
import { folders as initialFolders } from "./mock-data";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Folder;
  deleteFolder: (id: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function addFolder(name: string) {
    const folder: Folder = { id: crypto.randomUUID(), name, count: 0 };
    setFolders((prev) => [...prev, folder]);
    return folder;
  }

  function deleteFolder(id: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  const value = useMemo(() => ({ folders, addFolder, deleteFolder }), [folders]);

  return <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>;
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
