'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    </Suspense>
  );
}
