'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'Michael', 'Jennifer', 'William', 'Linda', 'David', 'Barbara']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']

export function RandomNameGeneratorTool() {
  const [names, setNames] = useState<string[]>([])
  const [count, setCount] = useState(5)

  const generate = () => {
    const generated = []
    for (let i = 0; i < count; i++) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)]
      const last = lastNames[Math.floor(Math.random() * lastNames.length)]
      generated.push(`${first} ${last}`)
    }
    setNames(generated)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Number of Names: {count}</label>
        <input
          type="range"
          min="1"
          max="50"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <Button onClick={generate} className="w-full">Generate Names</Button>

      {names.length > 0 && (
        <div className="space-y-2">
          {names.map((name, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-muted border border-border">
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
