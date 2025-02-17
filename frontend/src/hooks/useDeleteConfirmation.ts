import { useState, useCallback } from "react";

interface UseDeleteConfirmationProps {
  onDelete: () => Promise<void> | void;
  onRestore?: () => void;
  id?: string | null;
}

export function useDeleteConfirmation({
  onDelete,
  onRestore,
  id,
}: UseDeleteConfirmationProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [lastAction, setLastAction] = useState<() => Promise<void> | void>(
    () => {}
  );

  const handleDelete = useCallback(async () => {
    if (!id) {
      setIsErrorModalOpen(true);
      return;
    }
    try {
      await onDelete();
      setLastAction(() => onDelete);
      setModalOpen(true);
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  }, [id, onDelete]);

  const handleConfirmRemove = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleRestore = useCallback(async () => {
    try {
      if (lastAction) {
        await lastAction();
        if (onRestore) {
          onRestore();
        }
      }
    } catch (error) {
      console.error("Error in handleRestore:", error);
    }
    setModalOpen(false);
  }, [lastAction, onRestore]);

  return {
    isErrorModalOpen,
    setIsErrorModalOpen,
    modalOpen,
    handleDelete,
    handleConfirmRemove,
    handleRestore,
    setModalOpen,
  };
}
