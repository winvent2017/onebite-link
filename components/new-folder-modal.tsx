"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folders-context";
import { Modal } from "./modal";

type NewFolderModalProps = {
  onClose: () => void;
};

export function NewFolderModal({ onClose }: NewFolderModalProps) {
  const { addFolder, isAddingFolder } = useFolders();
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isAddingFolder) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    const folder = await addFolder(trimmed);
    if (folder) onClose();
  }

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl bg-[var(--card)] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.16)]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="folder-name" className="text-sm font-medium text-[var(--text)]">
            새 폴더
          </label>
          <input
            ref={inputRef}
            id="folder-name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--placeholder)] focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)]"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--text-sub)] transition hover:bg-[var(--background)]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!name.trim() || isAddingFolder}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition active:scale-[0.98] ${
              name.trim() && !isAddingFolder
                ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                : "cursor-not-allowed bg-[var(--disabled-bg)] text-[var(--disabled-text)] active:scale-100"
            }`}
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  );
}
