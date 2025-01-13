"use client";
import { useState } from "react";

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("Mint Calculator");

  return (
    <div className="min-h-[calc(100dvh-115.963px-88px)] overflow-hidden text-text overflow-x-hidden px-4 sm:px-8 py-10 sm:py-14 lg:py-24">
      <div className="relative max-w-[700px] rounded-xl mx-auto container">
        <div className="bg-darkSlate bg-radial-glow glowing-effect relative z-10 p-4 rounded-xl shadow-insetDarkGlow flex flex-col gap-4 sm:gap-6 sm:p-6">
          <h1 className="font-semibold text-center text-lg sm:text-2xl">
            Mini Slayer Calculator
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 sm:gap-6 justify-center mb-6">
            {["Mint Calculator", "Redeem Calculator"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-background text-gray hover:bg-primary-light hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:gap-2.5">
            <div className="font-medium flex items-center justify-between sm:text-lg">
              <label htmlFor="labelInput" className="text-gray">
                Enter label:
              </label>
              <div className="flex items-center">
                Current MS level:{" "}
                <span className="text-primary ml-2 font-bold text-xl sm:text-2xl underline">
                  3
                </span>
              </div>
            </div>
            <input
              type="text"
              id="labelInput"
              placeholder="0"
              className="bg-[#121212] outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow border-2 border-transparent transition-all duration-300 focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
            <div className="flex flex-col gap-2 sm:gap-2.5">
              <div className="sm:text-lg">
                <label htmlFor="tokensInput" className="font-medium text-gray">
                  {activeTab === "Mint Calculator"
                    ? "Tokens Mint-able"
                    : "Tokens Redeemable"}
                </label>
              </div>
              <input
                type="text"
                id="tokensInput"
                placeholder="-"
                className="bg-background outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow border-2 border-transparent transition-all duration-300 focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-2.5">
              <div className="sm:text-lg">
                <label
                  htmlFor="slayerPriceInput"
                  className="font-medium text-gray"
                >
                  Mint Slayer price
                </label>
              </div>
              <input
                type="text"
                id="slayerPriceInput"
                placeholder="-"
                className="bg-background outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow border-2 border-transparent transition-all duration-300 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-2.5">
            <div className="sm:text-lg">
              <label
                htmlFor="mintAmountInput"
                className="font-medium text-gray"
              >
                Enter Mint Slayer amount:
              </label>
            </div>
            <input
              type="text"
              id="mintAmountInput"
              placeholder="0"
              className="bg-[#121212] outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow border-2 border-transparent transition-all duration-300 focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-2.5">
            <div className="sm:text-lg">
              <p className="font-medium text-gray">
                {activeTab === "Mint Calculator"
                  ? "Total USDV spent"
                  : "Total USDV received"}
              </p>
            </div>
            <div className="bg-background flex flex-col gap-1 font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow">
              <div className="flex items-center gap-1 font-bold text-base sm:text-lg">
                <span>20 - </span>
                <span className="text-red">5% Tax</span>
              </div>
              <div className="font-semibold text-blue text-3xl sm:text-4xl">
                19 USDV
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-2.5">
            <div className="sm:text-lg">
              <p className="font-medium text-gray">Total USDT cost value:</p>
            </div>
            <div className="bg-background flex flex-col gap-1 font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow">
              <div className="font-semibold text-base sm:text-lg">
                <span>29 USDV x 1.25</span>
              </div>
              <div className="font-bold text-green text-3xl sm:text-4xl">
                $ 23.75
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
