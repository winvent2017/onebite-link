import type { ReactNode } from "react";

type SidebarItemProps = {
  label: string;
  count: number;
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
};

export function SidebarItem({ label, count, active, icon, onClick }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-[var(--accent)] text-white"
          : "text-[var(--text-sub)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
      }`}
    >
      <span className={active ? "text-white" : "text-[var(--text-sub)]"}>{icon}</span>
      <span className="truncate">{label}</span>
      <span className={`ml-auto text-xs ${active ? "text-white/80" : "text-[var(--text-sub)]"}`}>
        {count}
      </span>
    </button>
  );
}
