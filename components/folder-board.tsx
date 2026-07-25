"use client";

import { useRouter } from "next/navigation";
import type { Folder, LinkItem } from "@/lib/types";
import { Sidebar } from "./sidebar";
import { LinkGrid } from "./link-grid";

type FolderBoardProps = {
  folders: Folder[];
  links: LinkItem[];
  totalCount: number;
  folderId: string;
  folderName: string;
};

export function FolderBoard({
  folders,
  links,
  totalCount,
  folderId,
  folderName,
}: FolderBoardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-1">
      <Sidebar
        folders={folders}
        selectedId={folderId}
        onSelect={(id) => router.push(id ? `/folder/${id}` : "/")}
        totalCount={totalCount}
      />
      <main className="flex-1 px-8 py-8">
        <h2 className="mb-6 text-lg font-bold text-slate-100">{folderName}</h2>
        <LinkGrid links={links} />
      </main>
    </div>
  );
}
