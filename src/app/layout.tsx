import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Shrirang Appa Barne — Member of Parliament, Maval',
  description: 'Official site of Shrirang Appa Barne, three-time Member of Parliament from Maval Lok Sabha constituency. Sansad Ratna awardee committed to development and public service.',
  openGraph: {
    title: 'Shrirang Appa Barne — MP, Maval',
    description: 'Jantecha vishwas, vikasacha nirdhar — Shrirang Appa Barne.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
