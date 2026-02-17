'use client';

import Link from 'next/link';
import { ArrowRight, Leaf, CloudSun, Sprout } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

import VoiceButton from '@/components/ui/VoiceButton';

export default function Hero() {
  const { t, language } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24 min-h-[70vh] flex flex-col justify-center pb-12">
      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-screen-2xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            {t.hero.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-primary via-green-600 to-primary background-animate"
            style={{
              backgroundSize: '200% auto',
            }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto flex flex-col items-center gap-4"
          >
            {t.hero.description}
            <VoiceButton text={`${t.hero.title}. ${t.hero.description}`} />
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/analyze"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {t.hero.learnMore}
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        {/* Decorative elements */}
        <motion.div
          key={language}
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-16"
        >
          <div className="flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
              <Leaf className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              {t.hero.features.detection.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.hero.features.detection.desc}
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 rounded-full bg-accent/20 p-3 text-accent-foreground">
              <Sprout className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              {t.hero.features.solutions.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.hero.features.solutions.desc}
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600">
              <CloudSun className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              {t.hero.features.weather.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.hero.features.weather.desc}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background gradient blob */}
      {/* Background gradient blob */}
      <motion.div
        style={{ y: y1, opacity: 0.6 }}
        className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background"
      ></motion.div>
    </section>
  );
}
