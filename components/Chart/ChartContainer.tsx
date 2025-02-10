"use client";

import { useChart } from "@/hooks/useChart";
import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { format, isToday, subDays } from "date-fns";
import { useReadContract, useReadContracts } from "wagmi";
import { MINI_SLAYER, USDV_DECIMALS } from "@/constants";
import { miniSlayerAbi } from "@/abi/miniSlayerAbi";
import { formatUnits } from "viem";

export default function ChartContainer() {
  const [selectedPeriod, setSelectedPeriod] = useState("All");
  const { data: chartData, isLoading: chartDataLoading } = useChart();

  // Filter chart data based on selectedPeriod
  const filteredData = useMemo(() => {
    if (!chartData) return [];

    const now = new Date();
    let fromDate;

    switch (selectedPeriod) {
      case "1D":
        fromDate = subDays(now, 1);
        break;
      case "7D":
        fromDate = subDays(now, 7);
        break;
      case "1M":
        fromDate = subDays(now, 30);
        break;
      case "1Y":
        fromDate = subDays(now, 365);
        break;
      default:
        return chartData; // "All" case returns full data
    }

    return chartData.filter((item) => {
      const date = new Date(Number(item.timestamp) * 1000);
      return date >= fromDate;
    });
  }, [chartData, selectedPeriod]);

  // Convert timestamps to readable format
  const formattedData = useMemo(() => {
    return (
      filteredData?.map((item) => {
        const date = new Date(Number(item.timestamp) * 1000);

        return {
          timestamp: isToday(date)
            ? format(date, "h:mm a")
            : format(date, "d MMM"),
          price: Number(item.price),
        };
      }) || []
    );
  }, [filteredData]);

  const { data: amountMintedOrRedeemed, refetch: refetchMintedOrRedeemed } =
    useReadContract({
      address: MINI_SLAYER,
      abi: miniSlayerAbi,
      functionName: "amountMintedOrRedeemed",
    });

  const { data: currentLevel, refetch: refetchCurrentLevel } = useReadContract({
    address: MINI_SLAYER,
    abi: miniSlayerAbi,
    functionName: "getLevel",
    args: [amountMintedOrRedeemed || BigInt(0)],
  });

  const { data: getPricesArgs_, refetch: refetchGetPricesArgs } =
    useReadContracts({
      contracts: [
        {
          address: MINI_SLAYER,
          abi: miniSlayerAbi,
          functionName: "amountMintedOrRedeemed",
        },
        {
          address: MINI_SLAYER,
          abi: miniSlayerAbi,
          functionName: "lockedMinimumAmount",
        },
      ],

      allowFailure: false,
    });

  const getPricesArgs = getPricesArgs_
    ? getPricesArgs_
    : ([BigInt(0), BigInt(0)] as [bigint, bigint]);

  const {
    data: miniSlayerPrice,
    error,
    refetch: refetchMiniSlayerPrice,
  } = useReadContract({
    address: MINI_SLAYER,
    abi: miniSlayerAbi,
    functionName: "getPrices",
    args: getPricesArgs,
  });

  const [mintPrice, redeemPrice] = miniSlayerPrice
    ? miniSlayerPrice
    : [BigInt(0), BigInt(0)];

  return (
    <div className="bg-darkSlate glowing-effect relative z-10 p-4 rounded-xl shadow-insetDarkGlow flex flex-col gap-4 sm:gap-6 sm:p-6">
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-gray text-lg">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Logo" className="max-w-[30px]" />
              <h1>MINI SLAYER |</h1>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/images/usdv.png"
                alt="USDV Logo"
                className="max-w-[30px]"
              />
              <h1>USDV</h1>
            </div>
          </div>

          <div className="font-bold text-xl sm:text-2xl self-end sm:self-auto">
            {formatUnits(mintPrice, USDV_DECIMALS)} USDV
          </div>
        </div>

        {/* Chart Here */}
        <div className="w-full h-[350px] bg-background rounded-2xl shadow-insetDarkGlow flex items-center justify-center">
          {chartData ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                height={350}
                data={formattedData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#666"
                  strokeWidth={2}
                  strokeOpacity={0.5}
                />
                <XAxis dataKey="timestamp" padding={{ left: 30, right: 20 }} />
                <YAxis
                  tickFormatter={(value, index) =>
                    index === 0 ? "USDV" : value
                  }
                />
                <Tooltip />
                <Line
                  type="linear"
                  dataKey="price"
                  stroke="#7e2cd4"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="items-center">Loading..</div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
          <div className="font-semibold text-text">
            MS Live Level:{" "}
            <span className="text-primary">{currentLevel?.toString()}</span>
          </div>
          <div className="bg-background p-1 rounded-xl flex items-center gap-1 self-end sm:self-auto">
            {["1D", "7D", "1M", "1Y", "All"].map((period) => (
              <button
                key={period}
                className={`rounded-xl px-2 font-medium py-1 border-2 ${
                  selectedPeriod === period
                    ? "text-primary border-primary"
                    : "text-text border-transparent"
                }`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
