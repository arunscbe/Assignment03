import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Image as ImageIcon, Music } from 'lucide-react';
import { cn } from './Button';

export const FileUpload = ({ onFileSelect, accept = {}, maxFiles = 1, fileType = 'image' }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  const clearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    onFileSelect(null);
  };

  const getIcon = () => {
    if (fileType === 'image') return <ImageIcon className="w-8 h-8" />;
    if (fileType === 'audio') return <Music className="w-8 h-8" />;
    return <File className="w-8 h-8" />;
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-3",
            isDragActive 
              ? "border-primary-500 bg-primary-500/5" 
              : "border-slate-300 dark:border-slate-700 hover:border-primary-400 hover:bg-slate-50 dark:hover:bg-slate-900/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            {getIcon()}
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">Click or drag to upload</p>
            <p className="text-sm text-slate-500">Supports {fileType === 'image' ? 'JPG, PNG, WEBP' : 'MP3, WAV'}</p>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-inner">
          <button
            onClick={clearFile}
            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full z-10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-48 object-contain" />
          ) : (
            <div className="flex items-center gap-3 p-4 h-48 justify-center flex-col">
               <div className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-2">
                {getIcon()}
              </div>
              <p className="font-medium text-slate-900 dark:text-white truncate max-w-xs">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
