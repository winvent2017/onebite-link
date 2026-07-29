import { Header } from "@/components/header";
import { BookmarkBoard } from "@/components/bookmark-board";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text)]">
      <Header />
      <BookmarkBoard />
    </div>
  );
}
