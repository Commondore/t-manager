import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"
import type { ITask } from "@/types/task"

interface TaskDetailsDialogProps {
  task: ITask | null
  onClose: (open: boolean) => void
}

export function TaskDetailsDialog({ task, onClose }: TaskDetailsDialogProps) {
  return (
    <Dialog open={Boolean(task)} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-2xl border-border/50 p-0 sm:max-w-md">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold">
            <PlusCircle className="h-5 w-5 text-primary" />
            {task?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 pt-4 pb-6">
          {/* Теги */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-border px-3 py-1 text-xs"
            >
              Лейбл
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-border px-3 py-1 text-xs"
            >
              Работа
            </Badge>
            <span className="ml-auto text-sm font-medium text-orange-500">
              Срок: завтра
            </span>
          </div>

          {/* Проект и Приоритет */}
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Проект: </span>
              <span className="font-medium">Средний</span>
            </div>
            <div>
              <span className="text-muted-foreground">Приоритет: </span>
              <Badge className="border-0 bg-amber-500/15 text-xs font-semibold text-amber-600">
                Средний
              </Badge>
            </div>
          </div>

          {/* Описание */}
          <div className="rounded-xl bg-muted/40 p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              Начать работу над новым макетом лендинг-страницы и первоначальным
              дизайном. Подготовить прототип и согласовать с командой.
            </p>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-border/70 hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onClose(false)}
            >
              Удалить
            </Button>
            <Button className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
              Редактировать
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
