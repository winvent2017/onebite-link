import Link from "next/link";
import { PlusIcon } from "./icons";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-700 bg-slate-900/80 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-1.5">
        <span className="text-2xl">🔖</span>
        <h1 className="text-xl font-bold tracking-tight text-white">
          한입<span className="text-lime-400">링크</span>
        </h1>
      </div>

      <Link
        href="/new"
        className="flex items-center gap-1.5 rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-lime-300 active:scale-95"
      >
        <PlusIcon className="h-4 w-4" />새 링크
      </Link>
    </header>
  );
}
