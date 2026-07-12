'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Edit2, Check, RotateCcw } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export function TodoListTool() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
      priority,
      dueDate: dueDate || undefined,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
    setDueDate('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const startEditing = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = () => {
    if (!editingId || !editText.trim()) return;
    setTodos(prev => prev.map(todo =>
      todo.id === editingId ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const updatePriority = (id: string, newPriority: 'low' | 'medium' | 'high') => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, priority: newPriority } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">My Todo List</h1>
        <p className="text-muted-foreground">Stay productive and organized</p>
      </div>

      {/* Add New Task */}
      <Card>
        <CardHeader><CardTitle>Add New Task</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
            className="text-lg py-6"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1 block">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full p-3 border rounded-lg bg-background"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
            <div>
              <label className="text-sm mb-1 block">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 border rounded-lg bg-background"
              />
            </div>
          </div>

          <Button onClick={addTodo} className="w-full py-6 text-lg" disabled={!input.trim()}>
            <Plus className="mr-2 h-5 w-5" /> Add Task
          </Button>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'active', 'completed'] as const).map(f => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Tasks' : f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
        {completedCount > 0 && (
          <Button variant="ghost" onClick={clearCompleted} className="ml-auto text-red-600">
            Clear Completed
          </Button>
        )}
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <Card className="p-12 text-center text-muted-foreground">
            No tasks found. Add one above!
          </Card>
        ) : (
          filteredTodos.map(todo => (
            <Card key={todo.id} className="p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 accent-primary"
                />

                {editingId === todo.id ? (
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                    className="flex-1"
                  />
                ) : (
                  <div className="flex-1">
                    <p className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.text}
                    </p>
                    {todo.dueDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        📅 {new Date(todo.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => editingId === todo.id ? saveEdit() : startEditing(todo.id, todo.text)}
                  >
                    {editingId === todo.id ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                  </Button>

                  <Button size="sm" variant="ghost" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>

                <div className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${todo.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                    todo.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30'
                  }`}>
                  {todo.priority}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="text-center text-sm text-muted-foreground pt-4">
          {completedCount} of {todos.length} completed
        </div>
      )}
    </div>
  );
}