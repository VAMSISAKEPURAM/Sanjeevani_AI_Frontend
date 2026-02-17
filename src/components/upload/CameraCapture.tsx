'use client';

import { useState, useRef, useEffect } from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export default function CameraCapture({
  onCapture,
  onClose,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }

        // Simpler constraints to support more devices (laptops often struggle with precise resolution/facingMode)
        const constraints: MediaStreamConstraints = {
          video: {
            // On mobile, prefer correct camera. On desktop, just get video.
            facingMode: isFrontCamera ? 'user' : 'environment',
            // Remove fixed ideal resolution to prevent OverconstrainedError on low-res cams
            // We'll let the browser decide the best resolution
          },
        };

        const newStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );

        if (mounted) {
          streamRef.current = newStream;
          setStream(newStream);
          setError(null);
          if (videoRef.current) {
            videoRef.current.srcObject = newStream;
          }
        } else {
          newStream.getTracks().forEach((track) => track.stop());
        }
      } catch (err: unknown) {
        console.error('Error accessing camera:', err);
        if (mounted) {
          // Show specific error message
          let msg = 'Unable to access camera.';
          const error = err as Error;
          // Check for common error names safely
          if (error && error.name) {
            if (error.name === 'NotAllowedError')
              msg = 'Camera permission denied. Please allow access.';
            if (error.name === 'NotFoundError')
              msg = 'No camera found on this device.';
            if (error.name === 'NotReadableError')
              msg = 'Camera is in use by another app.';
            if (error.name === 'OverconstrainedError')
              msg = 'Camera does not match requirements.';
          }

          setError(msg);
        }
      }
    };

    initCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isFrontCamera]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      // Trigger flash animation
      setFlash(true);
      setTimeout(() => setFlash(false), 200);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to blob/file
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `capture-${Date.now()}.jpg`, {
                type: 'image/jpeg',
              });
              stopCamera();
              onCapture(file);
            }
          },
          'image/jpeg',
          0.9
        );
      }
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera((prev) => !prev);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-black/80">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-white font-medium">{error}</p>
          <button
            onClick={() => setIsFrontCamera((prev) => !prev)}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors font-medium text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Video Preview */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-30">
        {/* Top Bar */}
        <div className="flex justify-between items-start pointer-events-auto">
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white/90">
            {isFrontCamera ? 'Front Camera' : 'Back Camera'}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-center pointer-events-auto pb-2 px-4">
          <button
            onClick={toggleCamera}
            className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-all hover:rotate-180 duration-500"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          {/* Capture Button */}
          <button
            onClick={handleCapture}
            className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center relative group"
            disabled={!!error}
          >
            <div className="w-12 h-12 bg-white rounded-full transition-transform group-hover:scale-95 duration-200" />
          </button>

          {/* Spacer to center capture button */}
          <div className="w-11" />
        </div>
      </div>
    </motion.div>
  );
}
