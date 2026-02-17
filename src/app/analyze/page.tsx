'use client';

import { useState } from 'react';
import ImageUploader from '@/components/upload/ImageUploader';
import WeatherWidget from '@/components/weather/WeatherWidget';
import { Loader2, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

import { useScanHistory } from '@/hooks/useScanHistory';
import ScanHistoryList from '@/components/analyze/ScanHistoryList';

import Image from 'next/image';

interface AnalysisResult {
  disease: string;
  confidence: number;
  chemical_pesticides: string;
  chemical_dosage_per_ha: string;
  organic_pesticides: string;
  organic_dosage_per_ha: string;
  cause_prevention: string;
  imagePreview?: string;
  modelUsed?: string;
}

import { fetchFromBackend, API_BASE_URL } from '@/lib/api';


const cropImages = [
  '/images/crops/paddy.png',
  '/images/crops/maize.png',
  '/images/crops/chilli.png',
  '/images/crops/groundnut.png',
  '/images/crops/tomato.png',
  '/images/crops/potato.png',
  '/images/crops/sugarcane.png', // Sugarcane
];

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const { t, language } = useLanguage();
  const { saveScan, history, clearHistory } = useScanHistory();

  const handleAnalyze = async () => {
    if (!file || !selectedCrop) return;

    setAnalyzing(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string;

      try {
        const formData = new FormData();
        formData.append('image', file);

        const cropKey = selectedCrop.toLowerCase();
        const response = await fetchFromBackend(`/predict/${cropKey}`, {
          method: 'POST',
          body: formData,
        });

        if (response.success) {
          const labelClean = response.predicted_label.replace(/_/g, ' ').replace(/Tomato|Potato|Chilli/gi, '').trim();

          const info = response.treatment_info || {};

          const newResult = {
            disease: labelClean || response.predicted_label,
            confidence: (response.confidence * 100).toFixed(1) as any,
            chemical_pesticides: info.chemical_pesticides,
            chemical_dosage_per_ha: info.chemical_dosage_per_ha,
            organic_pesticides: info.organic_pesticides,
            organic_dosage_per_ha: info.organic_dosage_per_ha,
            cause_prevention: info.cause_prevention,
            imagePreview: base64Image,
            modelUsed: response.model_used,
          };

          setResult(newResult);

          saveScan({
            ...newResult,
            confidence: response.confidence * 100,
          });
        } else {
          // If it's a verification mismatch, show just the message
          if (response.match === false) {
            alert(response.detail);
          } else {
            alert('Analysis failed: ' + response.detail);
          }
        }
      } catch (error: any) {
        console.error('Analysis error:', error);
        alert('Error connecting to analysis server: ' + error.message);
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-(--spacing(16)))]"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
          {t.analyze.title}
        </h1>
        <p className="text-lg text-muted-foreground">{t.analyze.subtitle}</p>
      </div>

      <div className="grid gap-8">
        <WeatherWidget />


        <AnimatePresence mode="wait">
          {!result ? (
            !selectedCrop ? (
              /* Step 1: Crop Selection */
              <motion.div
                key="crop-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Select a crop to detect disease
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                  {t.hero.supportedCrops.list.map(
                    (crop: string, index: number) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedCrop(crop)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex flex-col items-center justify-center p-4 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/50 transition-all aspect-square gap-3 overflow-hidden"
                      >
                        {cropImages[index] ? (
                          <div className="relative w-24 h-24 mb-2 rounded-xl overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Image
                              src={cropImages[index]!}
                              alt={crop}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="p-4 bg-linear-to-br from-green-400 to-green-600 rounded-full text-white shadow-md group-hover:shadow-green-200 group-hover:scale-110 transition-all duration-300">
                            <Leaf className="w-8 h-8" />
                          </div>
                        )}

                        <span className="font-semibold text-center text-lg z-10">
                          {crop}
                        </span>
                      </motion.button>
                    )
                  )}
                </div>
              </motion.div>
            ) : (
              /* Step 2: Upload */
              <motion.div
                key="uploader"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => {
                      setSelectedCrop(null);
                      setFile(null);
                    }}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    ← Back to Crops
                  </button>
                  <span className="text-sm text-muted-foreground/30">|</span>
                  <span className="text-sm font-medium text-primary">
                    Selected: {selectedCrop}
                  </span>
                </div>

                <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 md:p-8">
                  <ImageUploader onImageSelect={setFile} />

                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleAnalyze}
                      disabled={!file || analyzing}
                      className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      {analyzing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t.analyze.upload.analyzing}
                        </>
                      ) : (
                        t.analyze.upload.analyzeBtn
                      )}
                    </button>
                  </div>
                </div>

                <ScanHistoryList
                  history={history}
                  onSelect={setResult}
                  onClear={clearHistory}
                />
              </motion.div>
            )
          ) : (
            /* Result View */
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
            >
              <div className="bg-primary/10 p-6 border-b border-primary/10 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span>Result: {result.disease}</span>
                  <span className="text-sm font-normal bg-primary text-primary-foreground px-3 py-1 rounded-full w-fit">
                    {result.confidence}% {t.analyze.result.confidence}
                  </span>
                </h2>
                {/* Model Used Display */}
                <div className="mt-2 text-xs text-muted-foreground">
                  Model: {result.modelUsed || "Standard CNN"}
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {result.imagePreview && (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted mb-6 border border-border/50">
                    <Image
                      src={result.imagePreview}
                      alt="Analyzed crop"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Disease */}
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                      🦠 Disease
                    </h3>
                    <p className="text-blue-900 font-medium text-lg leading-snug">
                      {result.disease}
                    </p>
                  </div>

                  {/* Chemical Pesticides */}
                  <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                    <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                      🧪 Chemical Pesticides
                    </h3>
                    <p className="text-red-900 font-medium leading-snug">
                      {result.chemical_pesticides}
                    </p>
                  </div>

                  {/* Chemical Dosage */}
                  <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                    <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                      ⚖️ Chemical Dosage/Ha
                    </h3>
                    <p className="text-red-900 font-medium leading-snug">
                      {result.chemical_dosage_per_ha}
                    </p>
                  </div>

                  {/* Organic Pesticides */}
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2">
                      🌿 Organic Pesticides
                    </h3>
                    <p className="text-green-900 font-medium leading-snug">
                      {result.organic_pesticides}
                    </p>
                  </div>

                  {/* Organic Dosage */}
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2">
                      ⚖️ Organic Dosage/Ha
                    </h3>
                    <p className="text-green-900 font-medium leading-snug">
                      {result.organic_dosage_per_ha}
                    </p>
                  </div>

                  {/* Cause & Prevention */}
                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
                      🛡️ Cause & Prevention
                    </h3>
                    <p className="text-amber-900 leading-relaxed whitespace-pre-line">
                      {result.cause_prevention}
                    </p>
                  </div>

                  {/* Precautions Section */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-2 lg:col-span-3">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                      ⚠️ Precautions
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Before Spraying */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          Before Spraying
                        </h4>
                        <ul className="text-sm text-slate-700 list-disc list-outside ml-4 space-y-1">
                          <li>Read the pesticide label and instructions carefully.</li>
                          <li>Wear full-sleeve shirt and full pants.</li>
                          <li>Wear a mask or cloth over nose and mouth.</li>
                          <li>Wear gloves to protect hands.</li>
                          <li>Wear goggles or transparent glasses to protect eyes.</li>
                          <li>Ensure the sprayer is not leaking.</li>
                          <li>Check wind direction before starting.</li>
                          <li>Mix pesticides only in the recommended quantity.</li>
                          <li>Do mixing in open and well-ventilated areas.</li>
                          <li>Keep children, pregnant women and animals away.</li>
                          <li>Do not eat, drink, or smoke during mixing.</li>
                        </ul>
                      </div>

                      {/* During Spraying */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          During Spraying
                        </h4>
                        <ul className="text-sm text-slate-700 list-disc list-outside ml-4 space-y-1">
                          <li>Spray in the direction of the wind (never against the wind).</li>
                          <li>Avoid touching eyes, nose or mouth during spraying.</li>
                          <li>Keep all body parts covered to avoid direct contact.</li>
                          <li>Do not spray during strong wind, rain or extreme sunlight.</li>
                          <li>Maintain distance from other workers.</li>
                          <li>Avoid walking through sprayed areas.</li>
                          <li>Do not let pesticide leak on skin or clothes.</li>
                          <li>Avoid spraying near wells, ponds or houses.</li>
                        </ul>
                      </div>

                      {/* After Spraying */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          After Spraying
                        </h4>
                        <ul className="text-sm text-slate-700 list-disc list-outside ml-4 space-y-1">
                          <li>Wash hands and face with soap and water immediately.</li>
                          <li>Remove sprayed clothes and wash them separately.</li>
                          <li>Do not enter the sprayed field for at least 24 hours.</li>
                          <li>Clean the sprayer properly after use.</li>
                          <li>Do not eat food until washing well.</li>
                          <li>Dispose empty containers safely (never reuse).</li>
                          <li>Take a full bath after completing work.</li>
                        </ul>
                      </div>

                      {/* Storage & Handling */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                          Storage & Handling
                        </h4>
                        <ul className="text-sm text-slate-700 list-disc list-outside ml-4 space-y-1">
                          <li>Store pesticides only in original containers.</li>
                          <li>Keep pesticides away from children and food items.</li>
                          <li>Keep containers tightly closed and in a locked area.</li>
                          <li>Never transfer pesticides into water bottles.</li>
                          <li>Always check expiry date before use.</li>
                        </ul>
                      </div>

                      {/* Emergency Precautions */}
                      <div className="md:col-span-2 bg-red-50 p-4 rounded-xl border border-red-100">
                        <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-red-600"></span>
                          Emergency Precautions
                        </h4>
                        <ul className="text-sm text-red-800 list-disc list-outside ml-4 space-y-1">
                          <li>If pesticide touches skin wash with plenty of water.</li>
                          <li>If contact with eyes wash for at least 15 minutes.</li>
                          <li>If dizziness, vomiting, or breathing issues occur seek hospital care immediately.</li>
                          <li>Carry the pesticide bottle/label to the hospital for faster treatment.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => {
                      setResult(null);
                      setFile(null);
                      setSelectedCrop(null); // Go back to crop selection
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    {t.analyze.upload.analyzeAnother}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
