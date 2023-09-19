import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
export const metadata = {
  title: 'thoughts',
  description: 'An X/thread clone with communites',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-neutral-900`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
