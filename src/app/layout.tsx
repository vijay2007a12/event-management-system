import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'EventHub - Futuristic Event Management Platform',
  description: 'Plan, register, and manage events with immersive 3D visuals and premium UI',
  keywords: ['events', 'management', 'registration', 'billing', '3D', 'animations'],
  authors: [{ name: 'EventHub Team' }],
  creator: 'EventHub',
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL('https://eventhub.example.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eventhub.example.com',
    title: 'EventHub - Event Management Platform',
    description: 'Next-generation event management with 3D visuals',
    images: [
      {
        url: 'https://eventhub.example.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
