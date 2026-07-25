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
      className="group flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4 transition hover:-translate-y-0.5 hover:border-lime-400/60 hover:shadow-[0_0_24px_-4px_rgba(163,230,53,0.35)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-base font-bold text-lime-400">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-100">{link.title}</p>
          <p className="truncate text-xs text-slate-400">{hostname}</p>
        </div>
        <ExternalLinkIcon className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-lime-400" />
      </div>
      <p className="line-clamp-2 text-sm text-slate-300">{link.description}</p>
    </a>
  );
}
