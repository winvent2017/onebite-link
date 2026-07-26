"use client";

import { useRouter } from "next/navigation";
import type { Folder, LinkItem } from "@/lib/types";
import { Sidebar } from "./sidebar";
import { LinkGrid } from "./link-grid";

type BookmarkBoardProps = {
  folders: Folder[];
  links: LinkItem[];
};

export function BookmarkBoard({ folders, links }: BookmarkBoardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-1">
      <Sidebar
        folders={folders}
        selectedId={null}
        onSelect={(id) => id && router.push(`/folder/${id}`)}
        totalCount={links.length}
      />
      <main className="flex-1 px-8 py-8">
        <h2 className="mb-6 text-lg font-bold text-[var(--text)]">전체 링크</h2>
        <LinkGrid links={links} />
      </main>
    </div>
  );
}
