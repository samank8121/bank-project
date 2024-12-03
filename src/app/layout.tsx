import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { getMessage } from '@/messages';

export const metadata: Metadata = {
  title: getMessage('meta', 'layoutTitle'),
  description: getMessage('meta', 'layoutDescription'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
