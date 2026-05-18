'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'

interface Todo {
  id: string
  text: string
  completed: boolean
}

export function TodoListTool() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!input.trim()) return
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input,
      completed: false,
    }
    setTodos([...todos, newTodo])
    setInput('')
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          className="flex-1 p-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button onClick={addTodo} size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-border">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 rounded"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
              {todo.text}
            </span>
            <Button size="sm" variant="ghost" onClick={() => deleteTodo(todo.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {todos.length === 0 && <div className="text-center text-muted-foreground py-8">No todos yet. Add one to get started!</div>}
      </div>

      {todos.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {todos.filter(t => t.completed).length} of {todos.length} completed
        </div>
      )}
    </div>
  )
}
