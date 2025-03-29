"use client";
import Calculator from "@/components/Calculator/CalculatorContainer";
import ChartContainer from "@/components/Chart/ChartContainer";
import MintRedeemContainer from "@/components/MintRedeem/MintRedeemContainer";
import Progress from "@/components/MintRedeem/Progress";
import { useState } from "react";

export default function MintRedeem() {
  const [activeTab, setActiveTab] = useState("Mint/Redeem");

  return (
    <div className="min-h-[calc(100dvh-115.963px-88px)] overflow-hidden px-4 sm:px-8 py-10 sm:py-14 lg:py-20">
      <div className="relative max-w-[700px] rounded-xl mx-auto container flex flex-col gap-8">
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 font-medium text-lg rounded-lg ${
              activeTab === "Mint/Redeem"
                ? "bg-primary text-white"
                : "bg-background text-gray shadow-primary shadow-sm hover:bg-primary-light hover:text-white"
            }`}
            onClick={() => setActiveTab("Mint/Redeem")}
          >
            Mint/Redeem
          </button>
          {/* <button
            className={`px-4 py-2 font-medium text-lg rounded-lg ${
              activeTab === "Calculator"
                ? "bg-primary text-white"
                : "bg-background text-gray shadow-primary shadow-sm hover:bg-primary-light hover:text-white"
            }`}
            onClick={() => setActiveTab("Calculator")}
          >
            Calculator
          </button> */}
          <button
            className={`px-4 py-2 font-medium text-lg rounded-lg ${
              activeTab === "MS Chart"
                ? "bg-primary text-white"
                : "bg-background text-gray shadow-primary shadow-sm hover:bg-primary-light hover:text-white"
            }`}
            onClick={() => setActiveTab("MS Chart")}
          >
            MS Chart
          </button>
        </div>

        {activeTab === "Mint/Redeem" ? (
          <MintRedeemContainer />
        ) : activeTab === "Calculator" ? (
          <Calculator />
        ) : activeTab === "MS Chart" ? (
          <ChartContainer />
        ) : null}
      </div>
    </div>
  );
}
