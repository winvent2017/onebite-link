import { Header } from "@/components/header";
import { NewLinkBoard } from "@/components/new-link-board";
import { folders, links } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-slate-100">
      <Header />
      <NewLinkBoard folders={folders} totalCount={links.length} />
    </div>
  );
}
