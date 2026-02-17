'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="border-t border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-6 md:py-0"
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8 max-w-screen-2xl">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          {t.footer.rights} &copy; {new Date().getFullYear()} Sanjeevani AI.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </motion.footer>
  );
}
