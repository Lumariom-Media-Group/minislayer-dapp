
import {  useQuery } from '@tanstack/react-query';



interface ChartData {
    price: string;
    timestamp: string;
    
  }
  

const getCharts = async (): Promise<ChartData[]> => {

    const resp = await fetch('api/getCharts');
    const response = await resp.json();
    return response;
};

export const useChart = () => {
    return useQuery({
        
        queryKey: ['getCharts'],
        queryFn: () => getCharts(),
    })
}