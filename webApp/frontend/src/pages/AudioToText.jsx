import React, { useState } from 'react';
import { Mic2, FileAudio, Copy, Check, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { audioToText } from '../services/audioService';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { FileUpload } from '../components/UI/FileUpload';

const AudioToText = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranscribe = async () => {
    if (!selectedFile || isLoading) return;

    setIsLoading(true);
    setTranscription('');
    try {
      const response = await audioToText(selectedFile);
      setTranscription(response.transcription || 'No transcription available.');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-2xl font-bold">Audio To Text</h2>
        <p className="text-sm text-slate-500">Transcribe voice recordings into accurate text.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Audio File" description="Upload MP3 or WAV recording">
          <FileUpload 
            onFileSelect={setSelectedFile} 
            accept={{ 'audio/*': ['.mp3', '.wav', '.m4a'] }}
            fileType="audio"
          />
          {selectedFile && (
            <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center gap-3">
              <Headphones className="w-5 h-5 text-primary-500" />
              <audio controls className="h-8 flex-1">
                <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
              </audio>
            </div>
          )}
          <Button 
            className="w-full mt-4" 
            onClick={handleTranscribe} 
            isLoading={isLoading}
            disabled={!selectedFile}
          >
            <Mic2 className="w-5 h-5" /> Transcribe Audio
          </Button>
        </Card>

        <Card 
          title="Transcription" 
          description="Transcribed text output"
          footer={transcription && (
            <Button variant="outline" className="w-full" onClick={copyToClipboard}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
          )}
        >
          {!transcription && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <FileAudio className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-sm">Upload audio to begin</p>
            </div>
          ) : isLoading ? (
             <div className="space-y-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className={`h-3 bg-slate-100 dark:bg-slate-800 animate-pulse rounded w-[${100 - (i*10)}%]`} />
               ))}
             </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="p-4 bg-white dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 h-48 overflow-y-auto scrollbar-hide"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {transcription}
              </p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AudioToText;
