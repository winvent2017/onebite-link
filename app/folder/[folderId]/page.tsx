import { Header } from "@/components/header";
import { FolderBoard } from "@/components/folder-board";

export default async function FolderPage(props: PageProps<"/folder/[folderId]">) {
  const { folderId } = await props.params;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text)]">
      <Header />
      <FolderBoard folderId={folderId} />
    </div>
  );
}
