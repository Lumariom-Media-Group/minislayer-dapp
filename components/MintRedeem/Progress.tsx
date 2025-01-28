import React, { useEffect, useState } from "react";

const Progress = () => {
  const [data, setData] = useState({
    total_mint_volume: 0,
    total_redeem_volume: 0,
    total_volume: 0,
    total_mint_volume_24h: 0,
    total_redeem_volume_24h: 0,
    total_volume_24h: 0,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getTotalVolume");
        const result = await response.json();
        setData(result);

        const currentAmount = parseFloat(result.total_volume);
        //20 million is the target amount
        const targetAmount = 20000000;

        // Calculate percentage based on mint volume
        const calculatedPercentage = (currentAmount / targetAmount) * 100;

        setPercentage(parseFloat(calculatedPercentage.toFixed(2)));
      } catch (error) {
        console.error("Error fetching volume data:", error);
      }
    };

    fetchData();
  }, []);

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
      <p className="italic text-sm">*Fee Free at 100%*</p>

      {/* Volume Details */}
      <div className="w-full flex flex-col gap-3 text-sm sm:text-base">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">Daily Volume:</h1>
          <p className="font-semibold text-[#DADCF2]">
            ${Number(data.total_volume_24h).toLocaleString()} USDV
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">All Time Volume:</h1>
          <p className="font-semibold text-[#DADCF2]">
            ${Number(data.total_volume).toLocaleString()} USDV
          </p>
        </div>
      </div>
    </div>
  );
};

export default Progress;
