
import {  useQuery } from '@tanstack/react-query';



interface VolumeData {
    total_mint_volume: string;
    total_redeem_volume: string;
    total_volume: number;
    total_mint_volume_24h: string;
    total_redeem_volume_24h: string;
    total_volume_24h: number;
  }
  

const getTotalVolume = async (): Promise<VolumeData> => {

    const resp = await fetch('api/getTotalVolume');
    const response = await resp.json();
    return response;
};

export const useTotalVolume = () => {
    return useQuery({
        refetchInterval: 1000,
        queryKey: ['getTotalVolume'],
        queryFn: () => getTotalVolume(),
    })
}