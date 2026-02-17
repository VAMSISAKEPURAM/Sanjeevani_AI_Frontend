import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analyze Crop',
  description:
    'Upload a photo of your crop to identify diseases, get treatment recommendations, and check weather advisories.',
};

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
