import React, { useState } from "react";
import { Volume2, Play, Download, Headphones, Mic2 } from "lucide-react";
import { motion } from "framer-motion";
import { textToAudio } from "../services/audioService";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";

const TextToAudio = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setAudioUrl("");
    try {
      const response = await textToAudio(text);
      // The backend returns a URL. If it's relative, we prefix with base URL
      const url = `http://localhost:8000${response}`;
      setAudioUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "generated-audio.wav";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-2xl font-bold">Text To Audio</h2>
        <p className="text-sm text-slate-500">
          Transform your text into natural-sounding speech.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card title="Source Text" description="Enter the text to synthesize">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Welcome to Nova AI, the most advanced multimodal assistant platform..."
              className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500/50 outline-none resize-none transition-all"
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                {text.length} / 5000 characters
              </span>
              <Button
                onClick={handleGenerate}
                isLoading={isLoading}
                disabled={!text.trim()}
              >
                <Volume2 className="w-5 h-5" /> Generate Audio
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card
            title="Audio Output"
            description="Listen and download"
            className="h-full flex flex-col"
          >
            {!audioUrl && !isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-4">
                  <Headphones className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-sm">Click generate to create audio</p>
              </div>
            ) : isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-primary-500/20" />
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-t-4 border-primary-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Mic2 className="w-8 h-8 text-primary-500 animate-pulse" />
                  </div>
                </div>
                <p className="mt-6 font-medium text-primary-500">
                  Synthesizing Voice...
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center gap-8 py-8"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-primary-500/40">
                  <Play className="w-12 h-12 text-white fill-current" />
                </div>

                <div className="w-full space-y-4">
                  <audio controls className="w-full accent-primary-600">
                    <source src={audioUrl} type="audio/wav" />
                  </audio>
                  <Button
                    variant="outline"
                    className="w-full group"
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    Download Audio
                  </Button>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextToAudio;
