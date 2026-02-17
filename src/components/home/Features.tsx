'use client';

import { ShieldCheck, Smartphone, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  const { t, language } = useLanguage();

  const features = [
    {
      name: t.features.instantAnalysis.title,
      description: t.features.instantAnalysis.desc,
      icon: Zap,
    },
    {
      name: t.features.database.title,
      description: t.features.database.desc,
      icon: ShieldCheck,
    },
    {
      name: t.features.mobile.title,
      description: t.features.mobile.desc,
      icon: Smartphone,
    },
    {
      name: t.features.support.title,
      description: t.features.support.desc,
      icon: Users,
    },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {t.features.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {t.features.subtitle}
          </motion.p>
        </div>
        <motion.div
          key={language}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={item}
              whileHover={{ y: -8 }}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 border border-transparent"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-border transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10 group-hover:ring-primary/20">
                <feature.icon
                  className="h-8 w-8 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.name}
              </h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
