import type { ReactNode } from "react";
import { PencilIcon, TrashIcon } from "./icons";

type SidebarItemProps = {
  label: string;
  count: number;
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function SidebarItem({
  label,
  count,
  active,
  icon,
  onClick,
  onEdit,
  onDelete,
}: SidebarItemProps) {
  const hasActions = Boolean(onEdit || onDelete);

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

      {hasActions ? (
        <>
          <span
            className={`text-xs group-hover:hidden ${active ? "text-white/80" : "text-[var(--text-sub)]"}`}
          >
            {count}
          </span>
          <span className="hidden shrink-0 items-center gap-0.5 group-hover:flex">
            {onEdit && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onEdit();
                }}
                aria-label={`${label} 폴더 이름 수정`}
                className={`rounded-md p-1 transition ${
                  active
                    ? "text-white hover:bg-white/20"
                    : "text-[var(--text-sub)] hover:bg-[var(--background)] hover:text-[var(--accent)]"
                }`}
              >
                <PencilIcon className="h-3.5 w-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
                aria-label={`${label} 폴더 삭제`}
                className={`rounded-md p-1 transition ${
                  active
                    ? "text-white hover:bg-white/20"
                    : "text-[var(--text-sub)] hover:bg-[var(--background)] hover:text-[var(--error)]"
                }`}
              >
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </span>
        </>
      ) : (
        <span className={`ml-auto text-xs ${active ? "text-white/80" : "text-[var(--text-sub)]"}`}>
          {count}
        </span>
      )}
    </div>
  );
}
