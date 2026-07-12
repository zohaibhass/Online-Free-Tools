'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Copy, Download, Upload, RotateCcw } from 'lucide-react';

export function SqlFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [uppercaseKeywords, setUppercaseKeywords] = useState(true);
  const [copied, setCopied] = useState(false);

  const formatSQL = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    let sql = input.trim();

    // Clean extra spaces
    sql = sql.replace(/\s+/g, ' ');

    const majorKeywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
      'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE',
      'ALTER TABLE', 'DROP TABLE'
    ];

    // Add newlines before major keywords
    majorKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.replace(/ /g, '\\s+')}\\b`, 'gi');
      sql = sql.replace(regex, `\n${keyword}`);
    });

    // Format with indentation
    let formatted = '';
    let indent = 0;
    const lines = sql.split('\n');

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // Decrease indent for certain keywords
      if (/^(FROM|WHERE|JOIN|ON|ORDER BY|GROUP BY|HAVING|LIMIT)/i.test(trimmed)) {
        indent = Math.max(1, indent);
      }

      formatted += '  '.repeat(indent) + trimmed + '\n';

      // Increase indent after SELECT, INSERT, etc.
      if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)/i.test(trimmed)) {
        indent++;
      }
    });

    // Uppercase keywords
    if (uppercaseKeywords) {
      formatted = formatted.replace(
        /\b(select|from|where|join|left|right|inner|on|and|or|order by|group by|having|limit|offset|insert|update|delete|create|alter|drop|table|values|set)\b/gi,
        match => match.toUpperCase()
      );
    }

    setOutput(formatted.trim());
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setInput(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const downloadFormatted = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted_query.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">SQL Formatter</h1>
        <p className="text-muted-foreground mt-2">Beautiful and clean SQL formatting</p>
      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Switch
            id="uppercase"
            checked={uppercaseKeywords}
            onCheckedChange={setUppercaseKeywords}
          />
          <Label htmlFor="uppercase">Uppercase Keywords</Label>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Input SQL</CardTitle>
            <Button variant="outline" size="sm" onClick={() => document.getElementById('sql-upload')?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <input
              id="sql-upload"
              type="file"
              accept=".sql,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your SQL query here..."
              className="min-h-[420px] font-mono text-sm resize-y"
            />
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Formatted SQL</CardTitle>
            {output && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadFormatted}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="Formatted SQL will appear here..."
              className="min-h-[420px] font-mono text-sm resize-y bg-muted"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button onClick={formatSQL} className="flex-1 py-7 text-lg font-semibold" disabled={!input.trim()}>
          Format SQL
        </Button>
        <Button onClick={clearAll} variant="outline" className="flex-1 py-7 text-lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
    </div>
  );
}