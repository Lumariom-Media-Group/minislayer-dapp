


import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,

} from '@rainbow-me/rainbowkit';

import {

    polygon,

} from 'wagmi/chains';


export const wagmiConfig = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: '876dfdad5fe2328754adbfc08c7aaf4f',
    chains: [polygon],
    ssr: true, // If your dApp uses server side rendering (SSR)
});