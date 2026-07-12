'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Upload, RotateCcw } from 'lucide-react';

type Language = 'javascript' | 'css' | 'html';

export function CodeMinifierTool() {
  const [code, setCode] = useState('');
  const [minified, setMinified] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [copied, setCopied] = useState(false);

  const minify = () => {
    if (!code.trim()) {
      setMinified('');
      return;
    }

    let result = code;

    if (language === 'javascript') {
      // Remove comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
      // Remove whitespace
      result = result.replace(/\s+/g, ' ');
      // Remove spaces around operators
      result = result.replace(/\s*([{}()[\];,:=+\-*/%<>!&|?])\s*/g, '$1');
      // Remove unnecessary semicolons (basic)
      result = result.replace(/;\s*}/g, '}');
    } 
    else if (language === 'css') {
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');
      result = result.replace(/\s+/g, ' ');
      result = result.replace(/\s*([{}:;,])\s*/g, '$1');
      result = result.replace(/;\s*}/g, '}');
    }
    else if (language === 'html') {
      result = result.replace(/<!--[\s\S]*?-->/g, '');
      result = result.replace(/\s+/g, ' ');
      result = result.replace(/>\s+</g, '><');
    }

    setMinified(result.trim());
  };

  const copyToClipboard = () => {
    if (!minified) return;
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCode(ev.target?.result as string);
    reader.readAsText(file);
  };

  const downloadMinified = () => {
    if (!minified) return;
    const ext = language === 'javascript' ? 'js' : language;
    const blob = new Blob([minified], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minified.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setCode('');
    setMinified('');
  };

  const originalSize = code.length;
  const minifiedSize = minified.length;
  const savings = originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Code Minifier</h1>
        <p className="text-muted-foreground mt-2">Reduce file size instantly</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {(['javascript', 'css', 'html'] as const).map(lang => (
          <Button
            key={lang}
            variant={language === lang ? 'default' : 'outline'}
            onClick={() => setLanguage(lang)}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader className="flex-row flex justify-between items-center">
            <CardTitle>Original Code</CardTitle>
            <Button variant="outline" size="sm" onClick={() => document.getElementById('minify-upload')?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <input
              id="minify-upload"
              type="file"
              className="hidden"
              accept=".js,.css,.html,.txt"
              onChange={handleFileUpload}
            />
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="min-h-[420px] font-mono text-sm resize-y"
            />
            <div className="text-xs text-muted-foreground mt-2 text-right">{originalSize} bytes</div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader className="flex-row flex justify-between items-center">
            <CardTitle>Minified Code</CardTitle>
            {minified && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadMinified}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Textarea
              value={minified}
              readOnly
              placeholder="Minified code will appear here..."
              className="min-h-[420px] font-mono text-sm resize-y bg-muted"
            />
            {minified && (
              <div className="flex justify-between text-xs text-muted-foreground mt-3">
                <span>{minifiedSize} bytes</span>
                <span className="text-green-600 font-medium">{savings}% saved</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button onClick={minify} className="flex-1 py-7 text-lg font-semibold" disabled={!code.trim()}>
          Minify Code
        </Button>
        <Button onClick={clearAll} variant="outline" className="flex-1 py-7 text-lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>
    </div>
  );
}