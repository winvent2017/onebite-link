import type { LinkItem } from "@/lib/types";
import { ExternalLinkIcon } from "./icons";

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

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl bg-[var(--card)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
    >
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
    </a>
  );
}
