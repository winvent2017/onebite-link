import { Header } from "@/components/header";
import { BookmarkBoard } from "@/components/bookmark-board";
import { folders, links } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text)]">
      <Header />
      <BookmarkBoard folders={folders} links={links} />
    </div>
  );
}
