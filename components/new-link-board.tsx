"use client";

import { useRouter } from "next/navigation";
import { useLinks } from "@/lib/links-context";
import { Sidebar } from "./sidebar";
import { NewLinkForm } from "./new-link-form";

export function NewLinkBoard() {
  const router = useRouter();
  const { links } = useLinks();

  return (
    <div className="flex flex-1">
      <Sidebar
        selectedId={null}
        onSelect={(id) => router.push(id ? `/folder/${id}` : "/")}
        totalCount={links.length}
      />
      <main className="flex-1 px-8 py-8">
        <h2 className="mb-6 text-lg font-bold text-[var(--text)]">새 링크 추가</h2>
        <NewLinkForm />
      </main>
    </div>
  );
}
