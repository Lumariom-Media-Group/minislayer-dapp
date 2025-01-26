"use client";
import { act, useState } from "react";
import MintRedeemContainer from "@/components/MintRedeem/MintRedeemContainer";
import CalculatorContainer from "@/components/Calculator/CalculatorContainer";
import { useAtom } from "jotai";
import { activeTabAtom, showCalculatorAtom } from "@/atoms/atoms";
import MintProgress from "@/components/MintRedeem/MintProgress";
import RedeemProgress from "@/components/MintRedeem/RedeemProgress";

export default function MintRedeem() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [showCalculator, setShowCalculator] = useAtom(showCalculatorAtom);

  return (
    <div className="min-h-[calc(100dvh-115.963px-88px)] overflow-hidden px-4 sm:px-8 py-10 sm:py-14 lg:py-24">
      <div className="relative max-w-[700px] rounded-xl mx-auto container flex flex-col gap-8">
        {/* Tabs */}
        <div className="flex justify-center gap-4 pb-4">
          <button
            className={`px-4 py-2 font-medium text-lg rounded-lg ${
              !showCalculator
                ? "bg-primary text-white"
                : "bg-background text-gray shadow-primary shadow-sm hover:bg-primary-light hover:text-white"
            }`}
            onClick={() => setShowCalculator(false)}
          >
            Mint/Redeem
          </button>
          <button
            className={`px-4 py-2 font-medium text-lg rounded-lg ${
              showCalculator
                ? "bg-primary text-white"
                : "bg-background text-gray shadow-primary shadow-sm hover:bg-primary-light hover:text-white"
            }`}
            onClick={() => setShowCalculator(true)}
          >
            Calculator
          </button>
        </div>

        {/* Active Tab Progress Bar */}
        {!showCalculator &&
          (activeTab === "Mint" ? <MintProgress /> : <RedeemProgress />)}

        {/* Active Tab Content */}
        {!showCalculator ? <MintRedeemContainer /> : <CalculatorContainer />}
      </div>
    </div>
  );
}
