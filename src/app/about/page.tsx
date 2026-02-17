'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[calc(100vh-(--spacing(16)))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            {t.about.title}
          </h1>
          <p className="text-lg text-muted-foreground">{t.about.subtitle}</p>
        </div>

        <hr className="my-5" />

        <div className="prose prose-green mx-auto">
          <p>{t.about.description}</p>

          <h3>{t.about.mission.title}</h3>
          <p>{t.about.mission.desc}</p>

          <h3>{t.about.features.title}</h3>
          <ul className="list-disc pl-6 space-y-2">
            {t.about.features.list.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h3>{t.about.crops.title}</h3>
          <p className="text-lg text-muted-foreground mt-4">
            {t.about.crops.description}
          </p>

          <hr className="my-5" />

          <h3>{t.about.team.title}</h3>
          <p>{t.about.team.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}
