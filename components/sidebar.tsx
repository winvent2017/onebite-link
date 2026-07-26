"use client";

import type { Folder } from "@/lib/types";
import { SidebarItem } from "./sidebar-item";
import { GridIcon, FolderIcon } from "./icons";

type SidebarProps = {
  folders: Folder[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  totalCount: number;
};

export function Sidebar({ folders, selectedId, onSelect, totalCount }: SidebarProps) {
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
            count={folder.count}
            active={selectedId === folder.id}
            icon={<FolderIcon className="h-4 w-4" />}
            onClick={() => onSelect(folder.id)}
          />
        ))}
      </nav>
    </aside>
  );
}
