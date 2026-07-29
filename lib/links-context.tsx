"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { LinkItem } from "./types";
import { links as initialLinks } from "./mock-data";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  folderId: string;
};

type LinksContextValue = {
  links: LinkItem[];
  addLink: (input: NewLinkInput) => LinkItem;
  deleteLink: (id: string) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  function addLink(input: NewLinkInput) {
    const link: LinkItem = {
      id: crypto.randomUUID(),
      title: input.title,
      url: input.url,
      description: input.description,
      thumbnail: input.thumbnail,
      folderId: input.folderId,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setLinks((prev) => [link, ...prev]);
    return link;
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  const value = useMemo(() => ({ links, addLink, deleteLink }), [links]);

  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
