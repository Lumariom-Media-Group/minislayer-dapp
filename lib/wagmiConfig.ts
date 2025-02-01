


import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,

} from '@rainbow-me/rainbowkit';
import { http,fallback } from '@wagmi/core'

import {

    polygon,

} from 'wagmi/chains';


export const wagmiConfig = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: '876dfdad5fe2328754adbfc08c7aaf4f',
    transports:{[polygon.id]:fallback([http("https://polygon.llamarpc.com"),http()])},
    chains: [polygon],
    ssr: true, // If your dApp uses server side rendering (SSR)
});