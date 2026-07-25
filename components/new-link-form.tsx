"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/lib/types";
import { ChevronDownIcon } from "./icons";

type NewLinkFormProps = {
  folders: Folder[];
};

export function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim()) return;
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-xl border border-slate-700 bg-slate-800 p-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-sm font-medium text-slate-300">
          링크 주소
        </label>
        <input
          id="url"
          type="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-lime-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="folder" className="text-sm font-medium text-slate-300">
          폴더
        </label>
        <div className="relative">
          <select
            id="folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="w-full appearance-none rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-lime-400"
          >
            <option value="">폴더 선택 안 함</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <button
        type="submit"
        disabled={!url.trim()}
        className="mt-2 rounded-full bg-lime-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-lime-300 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:active:scale-100"
      >
        저장
      </button>
    </form>
  );
}
