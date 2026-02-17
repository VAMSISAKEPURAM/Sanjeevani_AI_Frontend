'use client';

import { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6 text-red-600">
        <AlertCircle className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-3">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We encountered an unexpected error. Don&apos;t worry, your crops are
        safe. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
