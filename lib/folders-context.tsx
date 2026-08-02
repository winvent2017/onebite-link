"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "./types";

type FoldersContextValue = {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<Folder | null>;
  renameFolder: (id: string, name: string) => Promise<void>;
  deleteFolder: (id: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("id, name")
      .order("id", { ascending: true })
      .then(({ data }) => {
        if (!data) return;
        setFolders(data.map((row) => ({ id: String(row.id), name: row.name })));
      });
  }, []);

  async function addFolder(name: string) {
    if (isAddingRef.current) return null;
    isAddingRef.current = true;
    setIsAddingFolder(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name })
        .select("id, name")
        .single();

      if (error || !data) return null;

      const folder: Folder = { id: String(data.id), name: data.name };
      setFolders((prev) => [...prev, folder]);
      return folder;
    } finally {
      isAddingRef.current = false;
      setIsAddingFolder(false);
    }
  }

  async function renameFolder(id: string, name: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", id)
      .select("id, name")
      .single();

    if (error || !data) return;

    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { id: String(data.id), name: data.name } : folder)),
    );
  }

  function deleteFolder(id: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  const value = useMemo(
    () => ({ folders, isAddingFolder, addFolder, renameFolder, deleteFolder }),
    [folders, isAddingFolder],
  );

  return <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>;
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
