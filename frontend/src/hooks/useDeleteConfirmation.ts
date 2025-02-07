import { useState, useCallback } from "react";

interface UseDeleteConfirmationProps {
  onDelete: () => Promise<void> | void;
}

export function useDeleteConfirmation({ onDelete }: UseDeleteConfirmationProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingRemove, setPendingRemove] = useState(false);

  const handleDelete = useCallback(() => {
    setModalOpen(true);
    setPendingRemove(true);
  }, []);

  const handleConfirmRemove = useCallback(async () => {
    if (pendingRemove) {
      await onDelete();
    }
    setModalOpen(false);
    setPendingRemove(false);
  }, [pendingRemove, onDelete]);

  const handleRestore = useCallback(() => {
    setPendingRemove(false);
    setModalOpen(false);
  }, []);

  return {
    modalOpen,
    handleDelete,
    handleConfirmRemove,
    handleRestore,
    setModalOpen,
  };
}
