import { Check, Trash } from 'lucide-react'

interface CardProps {
  title: string
  onRemove: () => void
  onCheck: () => void
  done?: boolean
}
export function Card({ title, onRemove, onCheck, done = false }: CardProps) {
  return (
    <div
      data-done={done}
      className="group flex justify-between p-4 rounded bg-border animate-in"
    >
      <div className="flex gap-4">
        <button
          onClick={onCheck}
          className="h-6 w-6 flex items-center justify-center border-2 border-primary rounded-full group-data-[done=true]:bg-primary"
        >
          {done && <Check className="h-4 w-4" />}
        </button>
        <p className="text-foreground group-data-[done=true]:line-through group-data-[done=true]:text-muted-foreground">
          {title}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="h-6 w-6 ml-4 rounded-full flex items-center justify-center hover:bg-red-500/20"
      >
        <Trash className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  )
}
