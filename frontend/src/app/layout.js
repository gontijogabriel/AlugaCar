'use client'

import NextAuthSessionProvider from '@/providers/sessionProvider';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
