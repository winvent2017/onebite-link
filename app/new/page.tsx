import { Header } from "@/components/header";
import { NewLinkBoard } from "@/components/new-link-board";
import { links } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text)]">
      <Header />
      <NewLinkBoard totalCount={links.length} />
    </div>
  );
}
