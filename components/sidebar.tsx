"use client";

import { useState } from "react";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import { SidebarItem } from "./sidebar-item";
import { GridIcon, FolderIcon } from "./icons";
import { DeleteFolderModal } from "./delete-folder-modal";
import { EditFolderModal } from "./edit-folder-modal";

type SidebarProps = {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  totalCount: number;
};

export function Sidebar({ selectedId, onSelect, totalCount }: SidebarProps) {
  const { folders } = useFolders();
  const { links } = useLinks();
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [editTarget, setEditTarget] = useState<{ id: string; name: string } | null>(null);

  return (
    <aside className="w-56 shrink-0 px-3 py-6">
      <nav className="flex flex-col gap-1">
        <SidebarItem
          label="ALL"
          count={totalCount}
          active={selectedId === null}
          icon={<GridIcon className="h-4 w-4" />}
          onClick={() => onSelect(null)}
        />
      </nav>

      <p className="mt-6 mb-2 px-3 text-xs font-semibold tracking-wider text-[var(--text-sub)] uppercase">
        폴더
      </p>
      <nav className="flex flex-col gap-1">
        {folders.map((folder) => (
          <SidebarItem
            key={folder.id}
            label={folder.name}
            count={links.filter((link) => link.folderId === folder.id).length}
            active={selectedId === folder.id}
            icon={<FolderIcon className="h-4 w-4" />}
            onClick={() => onSelect(folder.id)}
            onEdit={() => setEditTarget({ id: folder.id, name: folder.name })}
            onDelete={() => setDeleteTarget({ id: folder.id, name: folder.name })}
          />
        ))}
      </nav>

      {editTarget && (
        <EditFolderModal
          folderId={editTarget.id}
          initialName={editTarget.name}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteFolderModal
          folderId={deleteTarget.id}
          folderName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </aside>
  );
}
