import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';
import RainbowKit from '@/RainbowKit';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Sacrifice',
  description: 'Sacrifice your Flippy to the State Chain Gateway',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RainbowKit>
          <div className="min-w-[100vw] min-h-screen flex flex-col">
            <div className="flex p-2 justify-end">
              <ConnectButton />
            </div>
            {children}
          </div>
        </RainbowKit>
        <Toaster theme="dark" richColors />
      </body>
    </html>
  );
}
