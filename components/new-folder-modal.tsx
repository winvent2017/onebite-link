"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folders-context";

type NewFolderModalProps = {
  onClose: () => void;
};

export function NewFolderModal({ onClose }: NewFolderModalProps) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addFolder(trimmed);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--card)] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.16)]"
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
            disabled={!name.trim()}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition active:scale-[0.98] ${
              name.trim()
                ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                : "cursor-not-allowed bg-[var(--disabled-bg)] text-[var(--disabled-text)] active:scale-100"
            }`}
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
