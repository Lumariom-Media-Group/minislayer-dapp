


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
    transports:{[polygon.id]:fallback([http("https://polygon-mainnet.infura.io/v3/9ff2374d8b41416284fb36376dc72b69"),http("https://polygon-mainnet.infura.io/v3/3545d87e204f4141856095aa9c1a1da1")])},
    chains: [polygon],
    ssr: true, // If your dApp uses server side rendering (SSR)
});