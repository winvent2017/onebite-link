import { Header } from "@/components/header";
import { NewLinkBoard } from "@/components/new-link-board";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text)]">
      <Header />
      <NewLinkBoard />
    </div>
  );
}
