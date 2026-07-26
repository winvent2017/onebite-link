import { Header } from "@/components/header";
import { NewLinkBoard } from "@/components/new-link-board";
import { folders, links } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text)]">
      <Header />
      <NewLinkBoard folders={folders} totalCount={links.length} />
    </div>
  );
}
