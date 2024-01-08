import { ClipboardList, Plus, Rocket } from 'lucide-react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Card } from './components/card'
import { FormEvent, useState } from 'react'
import { ButtonToggleTheme } from './components/theme/button-toggle'

interface ITodos {
  title: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<ITodos[]>([])
  const [inputTodo, setInputTodo] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const newTodo = {
      title: inputTodo,
      done: false,
    }

    setTodos((prev) => [...prev, newTodo])
    setInputTodo('')
  }

  function handleToggleCheckDone(index: number) {
    setTodos((prevState) =>
      prevState.map((todo, currentIndex) => {
        if (currentIndex === index)
          return {
            title: todo.title,
            done: !todo.done,
          }
        return todo
      }),
    )
  }

  function handleRemoveTodo(index: number) {
    setTodos((prevState) =>
      prevState.filter((_, currentIndex) => index !== currentIndex),
    )
  }

  const totalDone = todos.reduce((accumulator, currentItem) => {
    if (currentItem.done) accumulator++
    return accumulator
  }, 0)

  return (
    <div className="flex flex-col h-screen w-full bg-background items-center relative">
      <div className="absolute bottom-4 right-4">
        <ButtonToggleTheme />
      </div>

      <div className="flex items-center justify-center bg-muted/50 h-[200px] w-full">
        <div className="flex itens-center gap-2">
          <Rocket className="text-primary" />
          <strong className="font-mono text-muted-foreground text-xl">
            todo
          </strong>
        </div>
      </div>

      <main className="w-full max-w-[736px] -mt-6">
        <form className="flex items-center gap-2 mb-16" onSubmit={handleSubmit}>
          <Input
            placeholder="Adicione uma nova tarefa"
            value={inputTodo}
            onChange={(event) => setInputTodo(event.target.value)}
          />
          <Button type="submit">
            Criar <Plus className="h-4 w-4 ml-2" />
          </Button>
        </form>

        <div className="flex items-center justify-between pb-6 border-b">
          <div className="space-x-2">
            <strong className="text-sm text-secondary-foreground">
              Tarefas criadas
            </strong>
            <Badge variant="secondary">{todos.length}</Badge>
          </div>
          <div className="space-x-2">
            <strong className="text-sm text-primary">Concluídas</strong>
            <Badge variant="secondary">
              {totalDone} de {todos.length}
            </Badge>
          </div>
        </div>

        <section className="space-y-3">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <Card
                key={`todo-item-${index}`}
                title={todo.title}
                done={todo.done}
                onRemove={() => handleRemoveTodo(index)}
                onCheck={() => handleToggleCheckDone(index)}
              />
            ))
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center py-16">
              <ClipboardList className="h-14 w-14 text-muted-foreground" />
              <p className="text-muted-foreground text-center">
                <strong className="block">
                  {' '}
                  Você ainda não tem tarefas cadastradas
                </strong>
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
