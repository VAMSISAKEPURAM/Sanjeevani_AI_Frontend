'use client';

import { motion } from 'framer-motion';
import { CloudSun } from 'lucide-react';

export default function WeatherNotification() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-background/50 backdrop-blur-md rounded-2xl p-6 text-center border border-border/50 shadow-sm"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <CloudSun className="h-6 w-6 text-foreground" />
          <h3 className="text-xl font-bold text-foreground font-serif tracking-wide">
            Weather Data Processed
          </h3>
        </div>
        <p className="text-muted-foreground font-medium">
          Your location&apos;s weather information has been successfully stored.
        </p>
      </div>
    </motion.div>
  );
}
