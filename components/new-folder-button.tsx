"use client";

import { useState } from "react";
import { FolderPlusIcon } from "./icons";
import { NewFolderModal } from "./new-folder-modal";

export function NewFolderButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent)] transition hover:bg-[var(--accent-hover)] hover:text-white"
      >
        <FolderPlusIcon className="h-4 w-4" />새 폴더
      </button>
      {isOpen && <NewFolderModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
