import React, { useState } from "react";
import { ImageIcon, Wand2, Info, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { imageToText } from "../services/imageService";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";
import { FileUpload } from "../components/UI/FileUpload";

const ImageToText = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedFile || isLoading) return;

    setIsLoading(true);
    setResult("");
    try {
      const response = await imageToText(selectedFile);
      setResult(response.message || "No description generated.");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-2xl font-bold">Image To Text</h2>
        <p className="text-sm text-slate-500">
          Upload an image and let AI describe it in detail.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Source Image" description="Upload image to analyze">
          <FileUpload
            onFileSelect={setSelectedFile}
            accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
            fileType="image"
          />
          <Button
            className="w-full mt-4"
            onClick={handleAnalyze}
            isLoading={isLoading}
            disabled={!selectedFile}
          >
            <Wand2 className="w-5 h-5" /> Analyze Image
          </Button>
        </Card>

        <Card title="Analysis Result" description="AI generated description">
          {!result && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <Info className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-sm">Upload and analyze to see results</p>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-900/20"
            >
              <div className="flex items-center gap-2 mb-3 text-primary-600 dark:text-primary-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Description Generated
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {result}
              </p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ImageToText;
