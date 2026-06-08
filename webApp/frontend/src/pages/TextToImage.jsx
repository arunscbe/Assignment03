import React, { useState } from "react";
import { Sparkles, Download, ImageIcon, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { textToImage } from "../services/imageService";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";

const TextToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setImageUrl("");
    try {
      const response = await textToImage(prompt);
      setImageUrl(response.imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const suggestions = [
    "Traditional Indian village house with a sunset background",
    "A futuristic cyberpunk city in 2077 with neon lights",
    "Minimalist workspace with plants and natural lighting",
    "Astronaut floating in deep space next to a black hole",
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-2xl font-bold">Text To Image</h2>
        <p className="text-sm text-slate-500">
          Generate high-quality visuals from your imagination.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card title="Controls" description="Adjust generation settings">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">
                  Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to see..."
                  className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500/50 outline-none resize-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 block">
                  Suggestions
                </label>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setPrompt(suggestion)}
                      className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded text-slate-600 dark:text-slate-400 border border-transparent hover:border-primary-500 transition-all text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleGenerate}
                isLoading={isLoading}
                disabled={!prompt.trim()}
              >
                <Sparkles className="w-4 h-4" /> Generate Image
              </Button>
            </div>
          </Card>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8">
          <Card title="Preview" className="h-full min-h-[500px] flex flex-col">
            <div className="flex-1 relative flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden group border border-slate-200 dark:border-slate-800 shadow-inner">
              <AnimatePresence mode="wait">
                {imageUrl ? (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={imageUrl}
                      alt="Generated"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <Button onClick={handleDownload} variant="primary">
                        <Download className="w-5 h-5" /> Download
                      </Button>
                      <Button onClick={handleGenerate} variant="secondary">
                        <RefreshCw className="w-5 h-5" /> Regenerate
                      </Button>
                    </div>
                  </motion.div>
                ) : isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 px-12 text-center"
                  >
                    <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                    <div>
                      <h4 className="font-bold text-lg">
                        Creating your masterpiece
                      </h4>
                      <p className="text-sm text-slate-500">
                        This usually takes about 10-15 seconds...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-slate-400 px-12 text-center"
                  >
                    <div className="p-6 rounded-full bg-slate-200/50 dark:bg-slate-900/50 mb-4">
                      <ImageIcon className="w-12 h-12 opacity-20" />
                    </div>
                    <p className="font-medium">No image generated yet</p>
                    <p className="text-sm opacity-60">
                      Enter a prompt on the left and click generate to see the
                      magic happen.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextToImage;
