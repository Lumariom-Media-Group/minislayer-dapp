


import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,

} from '@rainbow-me/rainbowkit';

import {

    polygon,

} from 'wagmi/chains';


export const wagmiConfig = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [polygon],
    ssr: true, // If your dApp uses server side rendering (SSR)
});