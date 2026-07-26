import type { ReactNode } from "react";
import { TrashIcon } from "./icons";

type SidebarItemProps = {
  label: string;
  count: number;
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
  onDelete?: () => void;
};

export function SidebarItem({ label, count, active, icon, onClick, onDelete }: SidebarItemProps) {
  return (
    <div
      className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-[var(--accent)] text-white"
          : "text-[var(--text-sub)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
      }`}
    >
      <button type="button" onClick={onClick} className="flex min-w-0 flex-1 items-center gap-2.5">
        <span className={active ? "text-white" : "text-[var(--text-sub)]"}>{icon}</span>
        <span className="truncate">{label}</span>
      </button>

      {onDelete ? (
        <>
          <span
            className={`text-xs group-hover:hidden ${active ? "text-white/80" : "text-[var(--text-sub)]"}`}
          >
            {count}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            aria-label={`${label} 폴더 삭제`}
            className={`hidden shrink-0 rounded-md p-1 transition group-hover:block ${
              active
                ? "text-white hover:bg-white/20"
                : "text-[var(--text-sub)] hover:bg-[var(--background)] hover:text-[var(--error)]"
            }`}
          >
            <TrashIcon className="h-3.5 w-3.5" />
          </button>
        </>
      ) : (
        <span className={`ml-auto text-xs ${active ? "text-white/80" : "text-[var(--text-sub)]"}`}>
          {count}
        </span>
      )}
    </div>
  );
}
