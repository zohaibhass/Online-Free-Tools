'use client';

import { useState, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Upload, Download, RotateCcw } from 'lucide-react';

export function DiffCheckerTool() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(true);
  const [showDiff, setShowDiff] = useState(false);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const fileInput1 = useRef<HTMLInputElement>(null);
  const fileInput2 = useRef<HTMLInputElement>(null);

  const diffResult = useMemo(() => {
    if (!showDiff || !text1 || !text2) return null;

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLen = Math.max(lines1.length, lines2.length);

    let added = 0, removed = 0, changed = 0;

    const diffLines = Array.from({ length: maxLen }, (_, i) => {
      let line1 = lines1[i] || '';
      let line2 = lines2[i] || '';

      if (ignoreWhitespace) {
        line1 = line1.trim();
        line2 = line2.trim();
      }

      if (line1 === line2) return { type: 'unchanged' as const, line1, line2, index: i };
      if (!line1) { added++; return { type: 'added' as const, line1: '', line2, index: i }; }
      if (!line2) { removed++; return { type: 'removed' as const, line1, line2: '', index: i }; }
      changed++;
      return { type: 'changed' as const, line1, line2, index: i };
    });

    return { diffLines, stats: { added, removed, changed, total: maxLen } };
  }, [text1, text2, showDiff, ignoreWhitespace]);

  const scrollToLine = (index: number, side: 'left' | 'right') => {
    const ref = side === 'left' ? leftRef : rightRef;
    const el = ref.current?.children[index] as HTMLElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-primary');
      setTimeout(() => el.classList.remove('ring-2', 'ring-primary'), 2000);
    }
  };

  const highlightWords = (a: string, b: string, isLeft: boolean) => {
    if (!a || !b) return a || b;
    const wa = a.split(/(\s+)/);
    const wb = b.split(/(\s+)/);
    return wa.map((word, i) => {
      if (word === wb[i]) return <span key={i}>{word}</span>;
      return (
        <span key={i} className={`px-1 rounded ${isLeft ? 'bg-red-500/30 line-through' : 'bg-green-500/30'}`}>
          {word}
        </span>
      );
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, target: '1' | '2') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (target === '1') setText1(content);
      else setText2(content);
    };
    reader.readAsText(file);
  };

  const download = (content: string, name: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const compare = () => setShowDiff(true);
  const clearAll = () => {
    setText1('');
    setText2('');
    setShowDiff(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Advanced Diff Checker</h1>
        <p className="text-muted-foreground mt-2">Side-by-side comparison with large text areas</p>
      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Switch id="ws" checked={ignoreWhitespace} onCheckedChange={setIgnoreWhitespace} />
          <Label htmlFor="ws">Ignore Whitespace</Label>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Text 1 */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Text 1 (Original)</CardTitle>
            <Button variant="outline" size="sm" onClick={() => fileInput1.current?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <input type="file" ref={fileInput1} className="hidden" onChange={(e) => handleFile(e, '1')} accept=".txt,.md,.json" />
          </CardHeader>
          <CardContent>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)} 
              className="min-h-[420px] font-mono text-sm resize-y"
              placeholder="Paste or upload your first text here..."
            />
            {text1 && (
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => download(text1, 'original.txt')}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Text 2 */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Text 2 (Modified)</CardTitle>
            <Button variant="outline" size="sm" onClick={() => fileInput2.current?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <input type="file" ref={fileInput2} className="hidden" onChange={(e) => handleFile(e, '2')} accept=".txt,.md,.json" />
          </CardHeader>
          <CardContent>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)} 
              className="min-h-[420px] font-mono text-sm resize-y"
              placeholder="Paste or upload your second text here..."
            />
            {text2 && (
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => download(text2, 'modified.txt')}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button onClick={compare} className="flex-1 py-6 text-lg" disabled={!text1.trim() || !text2.trim()}>
          Compare Side-by-Side
        </Button>
        <Button onClick={clearAll} variant="outline" className="flex-1 py-6 text-lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>

      {showDiff && diffResult && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-green-500/10 border border-green-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-green-600">+{diffResult.stats.added}</div>
                <div className="text-sm text-green-600">Added</div>
              </CardContent>
            </Card>
            <Card className="bg-red-500/10 border border-red-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-red-600">-{diffResult.stats.removed}</div>
                <div className="text-sm text-red-600">Removed</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-500/10 border border-amber-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-amber-600">~{diffResult.stats.changed}</div>
                <div className="text-sm text-amber-600">Changed</div>
              </CardContent>
            </Card>
          </div>

          {/* Side-by-Side Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Side-by-Side Comparison • Click line numbers to scroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Side */}
                <div ref={leftRef} className="border rounded-2xl overflow-hidden">
                  <div className="bg-red-50 dark:bg-red-950 p-4 font-semibold text-red-600 border-b">TEXT 1 — Original</div>
                  {diffResult.diffLines.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => scrollToLine(i, 'left')}
                      className={`p-4 border-b hover:bg-muted/50 cursor-pointer font-mono text-sm leading-relaxed ${item.type === 'removed' || item.type === 'changed' ? 'bg-red-50/70 dark:bg-red-950/40' : ''}`}
                    >
                      <span className="inline-block w-8 text-right text-muted-foreground mr-4 font-medium">{i + 1}</span>
                      {item.type === 'removed' || item.type === 'changed'
                        ? highlightWords(item.line1, item.line2, true)
                        : item.line1 || <span className="italic text-muted-foreground">(empty line)</span>}
                    </div>
                  ))}
                </div>

                {/* Right Side */}
                <div ref={rightRef} className="border rounded-2xl overflow-hidden">
                  <div className="bg-green-50 dark:bg-green-950 p-4 font-semibold text-green-600 border-b">TEXT 2 — Modified</div>
                  {diffResult.diffLines.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => scrollToLine(i, 'right')}
                      className={`p-4 border-b hover:bg-muted/50 cursor-pointer font-mono text-sm leading-relaxed ${item.type === 'added' || item.type === 'changed' ? 'bg-green-50/70 dark:bg-green-950/40' : ''}`}
                    >
                      <span className="inline-block w-8 text-right text-muted-foreground mr-4 font-medium">{i + 1}</span>
                      {item.type === 'added' || item.type === 'changed'
                        ? highlightWords(item.line1, item.line2, false)
                        : item.line2 || <span className="italic text-muted-foreground">(empty line)</span>}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}