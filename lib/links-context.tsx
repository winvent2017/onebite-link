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
import type { LinkItem } from "./types";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  folderId: string;
};

type UpdateLinkInput = {
  title: string;
  description: string;
  folderId: string;
};

type LinksContextValue = {
  links: LinkItem[];
  isAddingLink: boolean;
  addLink: (input: NewLinkInput) => Promise<LinkItem | null>;
  updateLink: (id: string, input: UpdateLinkInput) => void;
  deleteLink: (id: string) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  created_at: string;
};

function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    thumbnail: row.thumbnail_url ?? "",
    folderId: row.folder_id !== null ? String(row.folder_id) : "",
    createdAt: row.created_at.slice(0, 10),
  };
}

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id, created_at")
      .order("id", { ascending: false })
      .then(({ data }) => {
        if (!data) return;
        setLinks(data.map(toLinkItem));
      });
  }, []);

  async function addLink(input: NewLinkInput) {
    if (isAddingRef.current) return null;
    isAddingRef.current = true;
    setIsAddingLink(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .insert({
          url: input.url,
          title: input.title,
          description: input.description,
          thumbnail_url: input.thumbnail,
          folder_id: input.folderId ? Number(input.folderId) : null,
        })
        .select("id, url, title, description, thumbnail_url, folder_id, created_at")
        .single();

      if (error || !data) return null;

      const link = toLinkItem(data);
      setLinks((prev) => [link, ...prev]);
      return link;
    } finally {
      isAddingRef.current = false;
      setIsAddingLink(false);
    }
  }

  function updateLink(id: string, input: UpdateLinkInput) {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...input } : link)),
    );
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  const value = useMemo(
    () => ({ links, isAddingLink, addLink, updateLink, deleteLink }),
    [links, isAddingLink],
  );

  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
