"use client";

import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { NewLinkForm } from "./new-link-form";

type NewLinkBoardProps = {
  totalCount: number;
};

export function NewLinkBoard({ totalCount }: NewLinkBoardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-1">
      <Sidebar
        selectedId={null}
        onSelect={(id) => router.push(id ? `/folder/${id}` : "/")}
        totalCount={totalCount}
      />
      <main className="flex-1 px-8 py-8">
        <h2 className="mb-6 text-lg font-bold text-[var(--text)]">새 링크 추가</h2>
        <NewLinkForm />
      </main>
    </div>
  );
}
