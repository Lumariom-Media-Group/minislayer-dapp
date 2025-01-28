"use client";
import { miniSlayerAbi } from "@/abi/miniSlayerAbi";
import { getMintAndRedeemPrice, MINI_SLAYER } from "@/constants";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useReadContract } from "wagmi";


export default function Calculator() {
  
  const [currentLevel, setCurrentLevel] = useState(3);
  const [mintAmount, setMintAmount] = useState(0);
  const [selectedCalculator, setSelectedCalculator] = useState<
    "Mint Calculator" | "Redeem Calculator" | ""
  >("");

  const totalAmount =
    selectedCalculator == "Mint Calculator"
      ? mintAmount * getMintAndRedeemPrice(currentLevel).mintPrice
      : mintAmount * getMintAndRedeemPrice(currentLevel).redeemPrice;

      const { data: amountMintedOrRedeemed, refetch: refetchMintedOrRedeemed } =
          useReadContract({
            address: MINI_SLAYER,
            abi: miniSlayerAbi,
            functionName: "amountMintedOrRedeemed",
          });
      const { data: currentLevelInContract, refetch: refetchCurrentLevel } = useReadContract({
          address: MINI_SLAYER,
          abi: miniSlayerAbi,
          functionName: "getLevel",
          args: [amountMintedOrRedeemed || BigInt(0)],
        });

  function getAmountWithTax(
    amount: number,
    selectedCalculator: "Mint Calculator" | "Redeem Calculator" | ""
  ): number {
    if (selectedCalculator === "Redeem Calculator") {
      // Subtract 5% from the amount
      return amount * 0.95;
    } else {
      // Add 20% to the amount
      return amount * 1.2;
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: "Redeem Calculator" | "Mint Calculator") => {
    setSelectedCalculator(value);
    setIsOpen(false);
  };

  return (
    <div className="bg-darkSlate bg-radial-glow glowing-effect relative z-10 p-4 rounded-xl shadow-insetDarkGlow flex flex-col gap-4 sm:gap-6 sm:p-6">
      <h1 className="font-semibold text-center text-lg sm:text-2xl">
        Mini Slayer Calculator
      </h1>

      <div className="w-full relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full shadow-insetDarkGlow outline-none flex justify-between items-center gap-4 bg-primary text-white font-medium px-4 py-2.5 sm:px-5 sm:py-3 sm:text-xl rounded-lg transition-all hover:bg-primary-light focus:outline-none"
        >
          {selectedCalculator ? selectedCalculator : "Select Calculator"}
          <FaChevronDown
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute mt-2 shadow-primary shadow-sm bg-background text-text rounded-lg w-full z-10">
            <button
              className="block w-full text-left px-4 py-2.5 sm:py-3 sm:px-5 text-base font-medium rounded-lg transition-colors hover:bg-primary"
              onClick={() => handleSelect("Mint Calculator")}
            >
              Mint Calculator
            </button>

            <button
              className="block w-full text-left px-4 py-2.5 sm:py-3 sm:px-5 text-base font-medium rounded-lg transition-colors hover:bg-primary"
              onClick={() => handleSelect("Redeem Calculator")}
            >
              Redeem Calculator
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:gap-2.5">
        <div className="font-medium flex items-center justify-between sm:text-lg">
          <label htmlFor="labelInput" className="text-gray">
            Enter Level:
          </label>
          <div className="flex items-center">
            Current MS level:{" "}
            <span className="text-primary ml-2 font-bold text-xl sm:text-2xl underline">
              {currentLevelInContract ? Number(currentLevelInContract) : 0}
            </span>
          </div>
        </div>
        <input
          type="number"
          id="labelInput"
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              setCurrentLevel(Number(e.target.value));
            }
          }}
          placeholder="0"
          className="bg-[#121212] outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow border-2 border-transparent transition-all duration-300 focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <div className="sm:text-lg">
            <label htmlFor="tokensInput" className="font-medium text-gray">
              {selectedCalculator === ""
                ? "Tokens Redeem/mint-able"
                : selectedCalculator === "Mint Calculator"
                ? "Tokens Mint-able"
                : "Tokens Redeemable"}
            </label>
          </div>
          <input
            type="text"
            id="tokensInput"
            placeholder="10"
            value={10}
            disabled
            className="bg-background outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow border-2 border-transparent transition-all duration-300 focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2 sm:gap-2.5">
          <div className="sm:text-lg">
            <label htmlFor="slayerPriceInput" className="font-medium text-gray">
              Mint Slayer price
            </label>
          </div>
          <input
            type="text"
            id="slayerPriceInput"
            placeholder="-"
            disabled
            value={
              currentLevel > 0
                ? selectedCalculator == "Mint Calculator"
                  ? getMintAndRedeemPrice(currentLevel).mintPrice
                  : getMintAndRedeemPrice(currentLevel).redeemPrice
                : "-"
            }
            className="bg-background outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow border-2 border-transparent transition-all duration-300 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-2.5">
        <div className="sm:text-lg">
          <label htmlFor="mintAmountInput" className="font-medium text-gray">
            Enter Mint Slayer amount:
          </label>
        </div>
        <input
          type="number"
          min={1}
          max={10}
          onChange={(e) => {
            const number = Number(e.target.value);
            if (!isNaN(number)) {
              setMintAmount(number);
            }
          }}
          id="mintAmountInput"
          placeholder="0"
          className="bg-[#121212] outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow border-2 border-transparent transition-all duration-300 focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-2 sm:gap-2.5">
        <div className="sm:text-lg">
          <p className="font-medium text-gray">
            {selectedCalculator === ""
              ? "Total USDV spent/received"
              : selectedCalculator === "Mint Calculator"
              ? "Total USDV spent"
              : "Total USDV received"}
          </p>
        </div>
        {selectedCalculator === "" ? (
          <div className="bg-background flex flex-col gap-1 font-medium px-4 py-3 text-2xl sm:text-4xl md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow">
            -
          </div>
        ) : (
          <div className="bg-background flex flex-col gap-1 font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow">
            <div className="flex items-center gap-1 font-bold text-base sm:text-lg">
              <span>{totalAmount}</span>
              <span className={selectedCalculator == "Mint Calculator" ? "text-green":"text-red"}>
                {selectedCalculator == "Mint Calculator"
                  ? "+20% Tax"
                  : "-5% Tax"}
              </span>
            </div>
            <div className="font-semibold text-blue text-3xl sm:text-4xl">
              {getAmountWithTax(totalAmount, selectedCalculator)} USDV
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:gap-2.5">
        <div className="sm:text-lg">
          <p className="font-medium text-gray">Total USDT cost value:</p>
        </div>
        {selectedCalculator === "" ? (
          <div className="bg-background flex flex-col gap-1 font-medium px-4 py-3 text-2xl sm:text-4xl md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow">
            -
          </div>
        ) : (
          <div className="bg-background flex flex-col gap-1 font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow">
            <div className="font-semibold text-base sm:text-lg">
              <span>
                {getAmountWithTax(totalAmount, selectedCalculator)} USDV x 1.25
              </span>
            </div>
            <div className="font-bold text-green text-3xl sm:text-4xl">
              $ {getAmountWithTax(totalAmount, selectedCalculator) * 1.25}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
