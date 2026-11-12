import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nishchay Jasuja',
  description: "Nishchay Jasuja's personal portfolio.",
  keywords: ['Nishchay Jasuja', 'Nish', 'Nish Jasuja', 'Nishchay'],
  verification: { google: 'MTyxsBI3PBZMqxoW-lPaM3SFC4amx8TQssCQuaivt_0' },
  openGraph: { siteName: 'jasujanish' },
};

const site = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nish Jasuja',
  url: 'https://jasujanish.github.io/',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
        {children}
      </body>
    </html>
  );
}
