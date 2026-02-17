'use client';

import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { Volume2, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface VoiceButtonProps {
  text: string;
}

export default function VoiceButton({ text }: VoiceButtonProps) {
  const { language } = useLanguage();
  const { speak, cancel, isSpeaking, isSupported } = useTextToSpeech(language);

  if (!isSupported) return null;

  return (
    <button
      onClick={() => (isSpeaking ? cancel() : speak(text))}
      className={`inline-flex items-center gap-2 p-3 rounded-full transition-all duration-300 ${
        isSpeaking
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-green-100 text-green-700 hover:bg-green-200'
      }`}
      aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
      title={isSpeaking ? 'Stop reading' : 'Read aloud'}
    >
      {isSpeaking ? (
        <>
          <Square className="w-5 h-5 fill-current" />
          <div className="flex gap-1 h-3 items-end">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-current rounded-full"
                animate={{
                  height: [4, 12, 4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}
