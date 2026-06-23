import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cohort CrowdFund',
  description: 'Kickstarter for live expert lessons.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
