'use client'

import NextAuthSessionProvider from '@/providers/sessionProvider';
import './globals.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
