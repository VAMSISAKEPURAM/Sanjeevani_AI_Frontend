'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, FileImage, Camera } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import CameraCapture from './CameraCapture';
import Image from 'next/image';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
      setShowCamera(false);
    },
    [onImageSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeImage = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {showCamera ? (
          <CameraCapture
            key="camera"
            onCapture={handleFile}
            onClose={() => setShowCamera(false)}
          />
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className={`relative flex flex-col items-center justify-center w-full h-auto min-h-[320px] rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out overflow-hidden ${
                dragActive
                  ? 'border-primary bg-primary/10 scale-[1.02]'
                  : 'border-border bg-card/50 hover:bg-card/80 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />

              {preview ? (
                <div className="relative w-full h-full p-2 min-h-[320px]">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-xl">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onButtonClick();
                      }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Upload className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCamera(true);
                      }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="p-3 bg-red-500/20 backdrop-blur-md rounded-full text-red-100 hover:bg-red-500/40 transition-colors"
                    >
                      <span className="sr-only">Remove</span>✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 w-full">
                  {/* Pulse Animation Wrapper */}
                  <div className="relative mb-6 mx-auto w-24 h-24 flex items-center justify-center">
                    {/* Pulsing circles */}
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        borderColor: [
                          'rgba(34, 197, 94, 0.2)',
                          'rgba(34, 197, 94, 0.6)',
                          'rgba(34, 197, 94, 0.2)',
                        ],
                        boxShadow: [
                          '0 0 0 0px rgba(34, 197, 94, 0)',
                          '0 0 0 10px rgba(34, 197, 94, 0.1)',
                          '0 0 0 0px rgba(34, 197, 94, 0)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'loop',
                      }}
                      className="absolute inset-0 rounded-full border-2 border-primary/30"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'loop',
                      }}
                      className="absolute inset-2 rounded-full border border-primary/40 bg-primary/5"
                    />

                    {/* Icon Container */}
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <FileImage className="w-8 h-8" />
                    </div>
                  </div>

                  <p className="text-lg font-medium text-foreground mb-2">
                    {t.analyze.upload.dragDrop}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {t.analyze.upload.supports}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
                    <button
                      type="button"
                      onClick={onButtonClick}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {t.analyze.upload.browseBtn}
                    </button>

                    <span className="text-muted-foreground text-sm font-medium px-2">
                      {t.analyze.upload.or}
                    </span>

                    <button
                      type="button"
                      onClick={() => setShowCamera(true)}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground shadow-sm transition-all hover:bg-secondary/80 hover:scale-105"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      {t.analyze.upload.cameraBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
