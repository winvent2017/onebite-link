import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { FolderBoard } from "@/components/folder-board";
import { folders, links } from "@/lib/mock-data";

export default async function FolderPage(props: PageProps<"/folder/[folderId]">) {
  const { folderId } = await props.params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text)]">
      <Header />
      <FolderBoard
        folders={folders}
        links={folderLinks}
        totalCount={links.length}
        folderId={folderId}
        folderName={folder.name}
      />
    </div>
  );
}
