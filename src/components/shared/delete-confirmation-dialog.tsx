import type { ReactNode } from "react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface DeleteConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void | Promise<void>
  title?: ReactNode
  description?: ReactNode
  cancelText?: string
  confirmText?: string
  isPending?: boolean
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Удалить?",
  description = "Это действие нельзя отменить.",
  cancelText = "Отмена",
  confirmText = "Удалить",
  isPending = false,
}: DeleteConfirmationDialogProps) {
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isPending) {
      return
    }

    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={!isPending}
        className="overflow-hidden rounded-2xl border-border/50 p-0 sm:max-w-sm"
      >
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>

        <DialogFooter className="mx-0 mb-0 rounded-none border-border/50 px-6 py-4 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            className="gap-2"
            onClick={() => {
              void onConfirm()
            }}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
