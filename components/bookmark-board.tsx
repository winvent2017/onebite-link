"use client";

import { useRouter } from "next/navigation";
import { useLinks } from "@/lib/links-context";
import { Sidebar } from "./sidebar";
import { LinkGrid } from "./link-grid";

export function BookmarkBoard() {
  const router = useRouter();
  const { links } = useLinks();

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
