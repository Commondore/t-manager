import { AddTaskDialog } from "@/components/add-task-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export const AddTask = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full gap-2 rounded-xl bg-white/20 text-white shadow-none backdrop-blur-sm group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:p-0 hover:bg-white/30 disabled:opacity-50"
      >
        <Plus className="h-5 w-5" />
        <span className="group-data-[collapsible=icon]:hidden">
          Добавить задачу
        </span>
      </Button>
      <AddTaskDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
