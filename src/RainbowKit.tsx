'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig, midnightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { useMemo } from 'react';
import { metaMaskWallet, rabbyWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets';

const queryClient = new QueryClient();

export default function RainbowKit({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = useMemo(() => {
    const projectId = '9ad7935d3c59f4539726eef6da314c0f';

    return getDefaultConfig({
      appName: 'Flippy Sacrifice',
      projectId,
      chains: [mainnet],
      ssr: true, // If your dApp uses server side rendering (SSR)
      wallets: [
        {
          groupName: 'Wallllllllets',
          wallets: [rainbowWallet, rabbyWallet, metaMaskWallet],
        },
      ],
    });
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={midnightTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
