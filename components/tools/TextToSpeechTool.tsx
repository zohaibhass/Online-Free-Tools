'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Square, Upload, Download, Mic, RotateCcw } from 'lucide-react';

export function TextToSpeechTool() {
  const [text, setText] = useState('Hello! This is a realistic text-to-speech converter. You can adjust speed, pitch, and voice.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => setVoices(speechSynthesis.getVoices());
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    return () => { speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = () => {
    if (isPlaying) {
      stop();
      return;
    }
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (voices.length > 0) utterance.voice = voices[selectedVoice];
    utterance.rate = rate;
    utterance.pitch = pitch;

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsPlaying(true);

    utterance.onend = () => setIsPlaying(false);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const startRecording = async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied or not supported.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (!recordedUrl) return;
    const a = document.createElement('a');
    a.href = recordedUrl;
    a.download = 'speech-recording.webm';
    a.click();
  };

  const clearAll = () => {
    setText('');
    stop();
    setRecordedUrl(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setText(ev.target?.result as string);
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Text to Speech + Recorder</h1>
        <p className="text-muted-foreground mt-2">Speak + Record + Download</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Text to Speak</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[180px] text-base resize-y"
            placeholder="Type or paste your text here..."
          />
          <Button variant="outline" size="sm" onClick={() => document.getElementById('tts-upload')?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload .txt
          </Button>
          <input id="tts-upload" type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Voice Settings</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Voice</label>
            <select value={selectedVoice} onChange={(e) => setSelectedVoice(Number(e.target.value))} className="w-full p-3 border rounded-lg">
              {voices.map((v, i) => (
                <option key={i} value={i}>{v.name} — {v.lang}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2"><span>Speed</span><span>{rate.toFixed(1)}x</span></div>
            <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2"><span>Pitch</span><span>{pitch.toFixed(1)}</span></div>
            <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button onClick={speak} disabled={!text.trim()} className="py-6">
          {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isPlaying ? 'Pause' : 'Speak'}
        </Button>

        <Button onClick={stop} variant="outline" disabled={!isPlaying} className="py-6">
          <Square className="mr-2" /> Stop
        </Button>

        <Button
          onClick={isRecording ? stopRecording : startRecording}
          variant={isRecording ? "destructive" : "default"}
          className="py-6"
        >
          <Mic className="mr-2" /> {isRecording ? 'Stop Recording' : 'Record'}
        </Button>

        <Button onClick={clearAll} variant="outline" className="py-6">
          <RotateCcw className="mr-2" /> Clear
        </Button>
      </div>

      {recordedUrl && (
        <Card>
          <CardHeader><CardTitle>Recorded Audio</CardTitle></CardHeader>
          <CardContent>
            <audio controls src={recordedUrl} className="w-full mb-4" />
            <Button onClick={downloadRecording}>
              <Download className="mr-2" /> Download Recording (.webm)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}