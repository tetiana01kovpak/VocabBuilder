import type { Metadata, Viewport } from 'next';
import Providers from '@/components/Providers/Providers';
import '@/styles/variables.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'VocabBuilder',
  description:
    'VocabBuilder — build and train your English vocabulary with your personal dictionary.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
