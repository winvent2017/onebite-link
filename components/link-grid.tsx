import type { LinkItem } from "@/lib/types";
import { LinkCard } from "./link-card";

export function LinkGrid({ links }: { links: LinkItem[] }) {
  if (links.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-24 text-center text-[var(--text-sub)]">
        <p className="text-sm">등록된 링크가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
