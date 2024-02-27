'use client';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import RainbowKit from '@/RainbowKit';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Toaster } from 'sonner';
import classNames from 'classnames';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

const metadata = {
  title: 'Sacrifice',
  description: 'Sacrifice your Flippy to the State Chain Gateway',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <RainbowKit>
          <div className="min-w-[100vw] min-h-screen flex flex-col items-center">
            <div className="flex p-2 justify-between container">
              <div className="flex gap-x-2 items-center">
                <a
                  className={classNames(
                    'text-lg',
                    pathname === '/' ? 'text-white' : 'text-neutral-500',
                  )}
                  href="/"
                >
                  Flippy Sacrifice
                </a>
                <a
                  className={classNames(
                    'text-lg',
                    pathname === '/graveyard' ? 'text-white' : 'text-neutral-500',
                  )}
                  href="/graveyard"
                >
                  Graveyard
                </a>
              </div>
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
