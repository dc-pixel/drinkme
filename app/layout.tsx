import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DrinkMe — Everything for the perfect sip',
  description: 'Beverages, mixers, glassware, snacks and party essentials delivered fast.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
