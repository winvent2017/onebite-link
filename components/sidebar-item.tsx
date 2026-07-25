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
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active
          ? "bg-lime-400 text-slate-900"
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
      }`}
    >
      <span className={active ? "text-slate-900" : "text-slate-400"}>{icon}</span>
      <span className="truncate">{label}</span>
      <span className={`ml-auto text-xs ${active ? "text-slate-800" : "text-slate-500"}`}>
        {count}
      </span>
    </button>
  );
}
