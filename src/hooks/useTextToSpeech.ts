import { useState, useEffect, useRef, useCallback } from 'react';

type SupportedLanguage = 'en' | 'hi' | 'te';

const LANG_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  te: 'te-IN',
};

export const useTextToSpeech = (language: SupportedLanguage = 'en') => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);
  const voices = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synth.current = window.speechSynthesis;
      // Allow a tick for voices to load/init
      setTimeout(() => {
        setIsSupported(true);
      }, 0);

      const loadVoices = () => {
        voices.current = window.speechSynthesis.getVoices();
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  /* getBestVoice - with Regional Fallback */
  const getBestVoice = useCallback((langCode: string) => {
    const voicesList = voices.current;

    // Helper to find voice by exact lang, prefix, or name
    const findVoice = (code: string) => {
      // 1. Exact
      let v = voicesList.find((voice) => voice.lang === code);
      if (v) return v;

      // 2. Prefix
      const short = code.split('-')[0];
      v = voicesList.find((voice) => voice.lang.startsWith(short));
      if (v) return v;

      // 3. Name check
      if (short === 'te')
        return voicesList.find((voice) =>
          voice.name.toLowerCase().includes('telugu')
        );
      if (short === 'hi')
        return voicesList.find(
          (voice) =>
            voice.name.toLowerCase().includes('hindi') ||
            voice.name.toLowerCase().includes('india')
        );

      return null;
    };

    // A. Try target language
    let best = findVoice(langCode);
    if (best) return best;

    // B. Fallback Chain for Indian Context
    const shortLang = langCode.split('-')[0];
    if (shortLang === 'te') {
      // Fallback 1: Hindi (often supports Indic scripts or is simply better than US English)
      console.warn('Telugu voice missing. Falling back to Hindi.');
      best = findVoice('hi-IN');
      if (best) return best;

      // Fallback 2: English (India) - e.g. Microsoft Ravi
      console.warn('Hindi voice missing. Falling back to English (India).');
      best = voicesList.find(
        (v) => v.lang === 'en-IN' || v.name.includes('India')
      );
      if (best) return best;
    }

    // 4. Fallback to first available voice or null (browser default)
    return null;
  }, []);

  /* GC Fix: Keep reference to active utterance */
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(
    (text: string) => {
      if (!synth.current) return;

      // Cancel existing speech
      synth.current.cancel();

      // Refresh voices just in case they loaded late
      const latestVoices = window.speechSynthesis.getVoices();
      if (latestVoices.length > 0) {
        voices.current = latestVoices;
      }

      const langCode = LANG_MAP[language] || 'en-US';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;

      const voice = getBestVoice(langCode);
      if (voice) {
        console.log(
          `Speaking in ${language} (${langCode}) using: ${voice.name}`
        );
        utterance.voice = voice;
      } else {
        console.warn(
          `No specific voice found for ${langCode}. Using system default.`
        );
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        utteranceRef.current = null; // Cleanup
      };
      utterance.onerror = (e) => {
        console.error('Speech error details:', {
          error: e.error,
          elapsedTime: e.elapsedTime,
          message: 'SpeechSynthesisErrorEvent',
        });
        setIsSpeaking(false);
        utteranceRef.current = null;
      };

      // Prevent GC
      utteranceRef.current = utterance;
      synth.current.speak(utterance);
    },
    [language, getBestVoice]
  );

  const cancel = useCallback(() => {
    if (!synth.current) return;
    synth.current.cancel();
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const handleUnload = () => {
      window.speechSynthesis.cancel();
      if (synth.current) {
        synth.current.cancel();
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload();
    };
  }, []);

  return {
    speak,
    cancel,
    isSpeaking,
    isSupported,
  };
};
