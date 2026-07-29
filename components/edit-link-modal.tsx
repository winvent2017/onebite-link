"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import type { LinkItem } from "@/lib/types";
import { Modal } from "./modal";
import { ChevronDownIcon } from "./icons";

type EditLinkModalProps = {
  link: LinkItem;
  onClose: () => void;
};

export function EditLinkModal({ link, onClose }: EditLinkModalProps) {
  const { folders } = useFolders();
  const { updateLink } = useLinks();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    titleRef.current?.select();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    updateLink(link.id, { title: trimmedTitle, description: description.trim(), folderId });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl bg-[var(--card)] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.16)]"
      >
        <h2 className="text-sm font-medium text-[var(--text)]">링크 수정</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="link-folder-edit" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <div className="relative">
            <select
              id="link-folder-edit"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              className="w-full appearance-none rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)]"
            >
              <option value="">폴더 선택 안 함</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[var(--text-sub)]" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="link-title-edit" className="text-sm font-medium text-[var(--text)]">
            제목
          </label>
          <input
            ref={titleRef}
            id="link-title-edit"
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="링크 제목을 입력하세요"
            className="rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--placeholder)] focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="link-description-edit" className="text-sm font-medium text-[var(--text)]">
            설명
          </label>
          <textarea
            id="link-description-edit"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="링크 설명을 입력하세요"
            className="resize-none rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--placeholder)] focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)]"
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
            disabled={!title.trim()}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition active:scale-[0.98] ${
              title.trim()
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
