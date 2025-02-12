"use client"

import '@rainbow-me/rainbowkit/styles.css';
import {
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { wagmiConfig } from '@/lib/wagmiConfig';
import { darkTheme } from '@rainbow-me/rainbowkit';




const queryClient = new QueryClient();

export function WalletProvider({children}:{children:React.ReactNode}){
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme({
                    accentColor:"#7e2cd4",
                    accentColorForeground:"#ffffff"
                })}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};