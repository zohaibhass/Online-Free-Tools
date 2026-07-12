'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'advanced-dice-roller';

export function DiceRollerTool() {
  const [numDice, setNumDice] = useState<1 | 2 | 3 | 5>(3);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<number[][]>([]);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHistory(data.history || []);
      } catch (_) { }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ history }));
  }, [history]);

  const roll = useCallback(async () => {
    if (isRolling) return;

    setIsRolling(true);
    setResults([]);

    await new Promise(r => setTimeout(r, 1250));

    const newResults: number[] = [];
    for (let i = 0; i < numDice; i++) {
      newResults.push(Math.floor(Math.random() * sides) + 1);
    }

    const newTotal = newResults.reduce((a, b) => a + b, 0);

    setResults(newResults);
    setTotal(newTotal);
    setHistory(prev => [newResults, ...prev].slice(0, 10));

    setIsRolling(false);
  }, [isRolling, numDice, sides]);

  const copyResult = async () => {
    if (results.length === 0) return;
    await navigator.clipboard.writeText(`🎲 ${numDice}d${sides} = ${results.join(' + ')} = ${total}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="text-5xl">🎲</div>
          <h1 className="text-4xl font-bold tracking-tight">Dice Roller</h1>
        </div>
        <p className="text-muted-foreground">Realistic 3D dice rolling</p>
      </div>

      {/* 3D Dice Display */}
      <div className="bg-card border rounded-3xl p-8 mb-8 flex justify-center">
        <div className="flex gap-6 flex-wrap justify-center" style={{ perspective: '1800px' }}>
          {Array.from({ length: numDice }).map((_, i) => (
            <div key={i} className="relative w-24 h-24 md:w-28 md:h-28">
              <div
                className={`dice w-full h-full ${isRolling ? 'animate-dice-roll' : ''}`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isRolling ? undefined : getDiceRotation(results[i] || 1),
                }}
              >
                {[1, 2, 3, 4, 5, 6].map(face => (
                  <div
                    key={face}
                    className={`dice-face absolute inset-0 rounded-2xl flex items-center justify-center text-5xl font-bold shadow-xl border-4 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 backface-hidden dice-face-${face}`}
                  >
                    {face}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      {total > 0 && (
        <div className="text-center mb-8">
          <div className="text-7xl font-bold text-primary mb-1">{total}</div>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">TOTAL</p>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Number of Dice</span>
            <span className="font-mono font-bold">{numDice}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={numDice}
            onChange={(e) => setNumDice(Number(e.target.value) as 1 | 2 | 3 | 5)}
            className="w-full accent-primary"
          />
        </div>

        <div>
          <p className="text-sm mb-3">Sides</p>
          <div className="grid grid-cols-7 gap-2">
            {[4, 6, 8, 10, 12, 20, 100].map(s => (
              <Button
                key={s}
                variant={sides === s ? "default" : "outline"}
                onClick={() => setSides(s)}
                className="text-sm"
              >
                d{s}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={roll}
          disabled={isRolling}
          className="w-full py-8 text-xl font-semibold rounded-2xl"
          size="lg"
        >
          {isRolling ? '🎲 Rolling Dice...' : `Roll ${numDice} d${sides}`}
        </Button>

        <div className="flex gap-3">
          <Button onClick={copyResult} disabled={!total} variant="outline" className="flex-1">
            📋 Copy
          </Button>
          <Button onClick={() => { setResults([]); setTotal(0); }} variant="ghost" className="flex-1">
            Clear
          </Button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-10">
          <p className="text-sm text-muted-foreground mb-4">Recent Rolls</p>
          <div className="space-y-3">
            {history.map((rollSet, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-muted rounded-2xl p-4">
                {rollSet.map((n, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border flex items-center justify-center text-3xl font-bold">
                    {n}
                  </div>
                ))}
                <div className="ml-auto font-mono text-xl font-semibold text-primary">
                  = {rollSet.reduce((a, b) => a + b, 0)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .dice {
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .backface-hidden { backface-visibility: hidden; }

        @keyframes diceRoll {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(2160deg) rotateY(2520deg); }
        }

        .animate-dice-roll {
          animation: diceRoll 1.25s cubic-bezier(0.25, 0.1, 0.3, 1) forwards;
        }

        .dice-face-1 { transform: rotateX(0deg) rotateY(0deg); }
        .dice-face-2 { transform: rotateX(-90deg); }
        .dice-face-3 { transform: rotateY(90deg); }
        .dice-face-4 { transform: rotateY(-90deg); }
        .dice-face-5 { transform: rotateX(90deg); }
        .dice-face-6 { transform: rotateX(180deg); }
      `}</style>
    </div>
  );
}

function getDiceRotation(value: number) {
  const rotations: Record<number, string> = {
    1: 'rotateX(0deg) rotateY(0deg)',
    2: 'rotateX(-90deg) rotateY(0deg)',
    3: 'rotateY(90deg)',
    4: 'rotateY(-90deg)',
    5: 'rotateX(90deg) rotateY(0deg)',
    6: 'rotateX(180deg)',
  };
  return rotations[value] || '';
}