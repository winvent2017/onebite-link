import Link from "next/link";
import { PlusIcon } from "./icons";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-[var(--card)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-1.5">
        <span className="text-xl">🔖</span>
        <h1 className="text-xl font-bold tracking-tight text-[var(--text)]">
          한입<span className="text-[var(--accent)]">링크</span>
        </h1>
      </div>

      <Link
        href="/new"
        className="flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)] active:scale-[0.98]"
      >
        <PlusIcon className="h-4 w-4" />새 링크
      </Link>
    </header>
  );
}
