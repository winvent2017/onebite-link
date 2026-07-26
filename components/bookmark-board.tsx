"use client";

import { useRouter } from "next/navigation";
import type { LinkItem } from "@/lib/types";
import { Sidebar } from "./sidebar";
import { LinkGrid } from "./link-grid";

type BookmarkBoardProps = {
  links: LinkItem[];
};

export function BookmarkBoard({ links }: BookmarkBoardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-1">
      <Sidebar
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
