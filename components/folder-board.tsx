"use client";

import { useRouter } from "next/navigation";
import { links } from "@/lib/mock-data";
import { useFolders } from "@/lib/folders-context";
import { Sidebar } from "./sidebar";
import { LinkGrid } from "./link-grid";

type FolderBoardProps = {
  folderId: string;
};

export function FolderBoard({ folderId }: FolderBoardProps) {
  const router = useRouter();
  const { folders } = useFolders();
  const folder = folders.find((item) => item.id === folderId);
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <div className="flex flex-1">
      <Sidebar
        selectedId={folderId}
        onSelect={(id) => router.push(id ? `/folder/${id}` : "/")}
        totalCount={links.length}
      />
      <main className="flex-1 px-8 py-8">
        {folder ? (
          <>
            <h2 className="mb-6 text-lg font-bold text-[var(--text)]">{folder.name}</h2>
            <LinkGrid links={folderLinks} />
          </>
        ) : (
          <p className="text-sm text-[var(--text-sub)]">폴더를 찾을 수 없습니다.</p>
        )}
      </main>
    </div>
  );
}
