"use client";
import { useState } from "react";
import MintRedeemContainer from "@/components/MintRedeem/MintRedeemContainer";
import CalculatorContainer from "@/components/Calculator/CalculatorContainer";

export default function MintRedeem() {
  const [activeTab, setActiveTab] = useState("Mint/Redeem");

  return (
    <div className="min-h-[calc(100dvh-115.963px-88px)] overflow-hidden px-4 sm:px-8 py-10 sm:py-14 lg:py-24">
      <div className="relative max-w-[700px] rounded-xl mx-auto container">
        {/* Tabs */}
        <div className="flex justify-center gap-4 pb-4 mb-8">
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
          <button
            className={`px-4 py-2 font-medium text-lg rounded-lg ${
              activeTab === "Calculator"
                ? "bg-primary text-white"
                : "bg-background text-gray shadow-primary shadow-sm hover:bg-primary-light hover:text-white"
            }`}
            onClick={() => setActiveTab("Calculator")}
          >
            Calculator
          </button>
        </div>

        {/* Active Tab Content */}
        {activeTab === "Mint/Redeem" ? (
          <MintRedeemContainer />
        ) : (
          <CalculatorContainer />
        )}
      </div>
    </div>
  );
}
