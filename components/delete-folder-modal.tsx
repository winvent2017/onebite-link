"use client";

import { useFolders } from "@/lib/folders-context";
import { Modal } from "./modal";

type DeleteFolderModalProps = {
  folderId: string;
  folderName: string;
  onClose: () => void;
};

export function DeleteFolderModal({ folderId, folderName, onClose }: DeleteFolderModalProps) {
  const { deleteFolder } = useFolders();

  function handleConfirm() {
    deleteFolder(folderId);
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-5 rounded-2xl bg-[var(--card)] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.16)]">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-[var(--text)]">폴더 삭제</h2>
          <p className="text-sm text-[var(--text-sub)]">
            &apos;{folderName}&apos; 폴더를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--text-sub)] transition hover:bg-[var(--background)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-xl bg-[var(--error)] px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98]"
          >
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
}
