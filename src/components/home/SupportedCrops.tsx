'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function SupportedCrops() {
  const { t } = useLanguage();

  if (!t.hero.supportedCrops) return null;

  return (
    <section className="py-12 bg-background/50">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {t.hero.supportedCrops.title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {t.hero.supportedCrops.list.map((crop: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-3 bg-card border border-border/50 rounded-full shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-default"
            >
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-medium text-foreground text-lg">
                {crop}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-4 text-muted-foreground">
          and many more..
        </p>
      </div>
    </section>
  );
}
