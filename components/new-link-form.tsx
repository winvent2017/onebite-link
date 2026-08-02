"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import { ChevronDownIcon } from "./icons";

export function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink, isAddingLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl || isLoading || isAddingLink) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(trimmedUrl)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "오픈 그래프 정보를 가져오지 못했습니다.");
      }

      const link = await addLink({
        url: data.url,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        folderId,
      });

      if (!link) {
        throw new Error("링크를 저장하지 못했습니다.");
      }

      router.push(folderId ? `/folder/${folderId}` : "/");
    } catch {
      setError("링크 정보를 가져오지 못했습니다. 주소를 확인하고 다시 시도해 주세요.");
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-2xl bg-[var(--card)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
          링크 주소
        </label>
        <input
          id="url"
          type="url"
          required
          disabled={isLoading}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--placeholder)] focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)] disabled:opacity-60"
        />
        {error && <p className="text-xs text-[var(--error)]">{error}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
          폴더
        </label>
        <div className="relative">
          <select
            id="folder"
            value={folderId}
            disabled={isLoading}
            onChange={(event) => setFolderId(event.target.value)}
            className="w-full appearance-none rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)] disabled:opacity-60"
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

      <button
        type="submit"
        disabled={!url.trim() || isLoading}
        className={`mt-2 rounded-xl px-4 py-3 text-sm font-bold transition active:scale-[0.98] ${
          url.trim() && !isLoading
            ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
            : "cursor-not-allowed bg-[var(--disabled-bg)] text-[var(--disabled-text)] active:scale-100"
        }`}
      >
        {isLoading ? "확인 중..." : "확인"}
      </button>
    </form>
  );
}
