"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/types";
import { DeleteLinkModal } from "./delete-link-modal";
import { ExternalLinkIcon, TrashIcon } from "./icons";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function LinkCard({ link }: { link: LinkItem }) {
  const hostname = getHostname(link.url);
  const initial = hostname.charAt(0).toUpperCase();
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const showThumbnail = Boolean(link.thumbnail) && !thumbnailFailed;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[var(--card)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col"
      >
        {showThumbnail && (
          <div className="aspect-video w-full overflow-hidden bg-[var(--background)]">
            <img
              src={link.thumbnail}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
              onError={() => setThumbnailFailed(true)}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-base font-bold text-[var(--accent)]">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--text)]">{link.title}</p>
              <p className="truncate text-xs text-[var(--text-sub)]">{hostname}</p>
            </div>
            <ExternalLinkIcon className="ml-auto h-4 w-4 shrink-0 text-[var(--text-sub)] transition group-hover:text-[var(--accent)]" />
          </div>
          <p className="line-clamp-2 text-sm text-[var(--text-sub)]">{link.description}</p>
        </div>
      </a>

      <button
        type="button"
        onClick={() => setShowDeleteModal(true)}
        aria-label={`${link.title} 링크 삭제`}
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--card)] text-[var(--text-sub)] opacity-0 shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition group-hover:opacity-100 hover:bg-[var(--background)] hover:text-[var(--error)]"
      >
        <TrashIcon className="h-4 w-4" />
      </button>

      {showDeleteModal && (
        <DeleteLinkModal
          linkId={link.id}
          linkTitle={link.title}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
