import React, { useEffect, useState } from "react";
import { useTotalVolume } from "@/hooks/useTotalVolume";
const Progress = () => {
  const [data, setData] = useState({
    total_mint_volume: "0",
    total_redeem_volume: "0",
    total_volume: 0,
    total_mint_volume_24h: "0",
    total_redeem_volume_24h: "0",
    total_volume_24h: 0,
  });

  const [percentage, setPercentage] = useState(0);

  const {data: volumeData,isLoading:volumeDataLoading,isRefetching:volumeDataRefetching} = useTotalVolume();

  useEffect(() => {
    
    if(volumeData){
        setData(volumeData);

        const currentAmount = volumeData.total_volume;
        //20 million is the target amount
        const targetAmount = 1000000;

        // Calculate percentage based on mint volume
        const calculatedPercentage = (currentAmount / targetAmount) * 100;

        setPercentage(parseFloat(calculatedPercentage.toFixed(5)));
    }
    
  }, [volumeData]);

  return (
    <div className="bg-darkSlate relative z-10 p-4 rounded-xl shadow-insetDarkGlow flex flex-col gap-6 sm:p-6">
      {/* Progress Bar */}
      
      <div className="progress relative">
        <div
          className="bar"
          style={{
            width: `${percentage}%`,
          }}
        >
          <div className="progress-value">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-lg text-gray">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
      <p className="italic text-sm">*Mint Fee Free at 100%*</p>

      {/* Volume Details */}
      <div className="w-full flex flex-col gap-3 text-sm sm:text-base">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">Daily Buy Volume:</h1>
          <p className="font-semibold text-green">
            ${Number(data.total_mint_volume_24h).toLocaleString()} USDV
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">Daily Sell Volume:</h1>
          <p className="font-semibold text-blue">
            ${Number(data.total_redeem_volume_24h).toLocaleString()} USDV
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">All Time Volume:</h1>
          <p className="font-semibold text-purple-500">
            ${Number(data.total_volume).toLocaleString()} USDV
          </p>
        </div>
      </div>
    </div>
  );
};

export default Progress;
