"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export default function Calculator() {
  const [selectedCalculator, setSelectedCalculator] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedCalculator(value);
    setIsOpen(false);
  };

  return (
    <div className="min-h-[calc(100dvh-115.963px-88px)] overflow-hidden text-text overflow-x-hidden px-4 sm:px-8 py-10 sm:py-14 lg:py-24">
      <div className="relative max-w-[700px] rounded-xl mx-auto container">
        <div className="bg-darkSlate bg-radial-glow glowing-effect relative z-10 p-4 rounded-xl shadow-insetDarkGlow flex flex-col gap-6 sm:p-6">
          <h1 className="font-semibold text-center text-lg sm:text-2xl">
            Mini Slayer Calculator
          </h1>

          <div className="w-full relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full shadow-insetDarkGlow flex justify-between items-center gap-4 bg-primary text-white font-medium px-4 py-2 md:px-5 md:py-3 rounded-lg transition-all hover:bg-primary-light focus:outline-none md:text-xl"
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
                {["Mint Calculator", "Redeem Calculator"].map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-3 md:px-5 text-sm md:text-base font-medium rounded-lg transition-colors hover:bg-primary"
                    onClick={() => handleSelect(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="font-medium flex items-center justify-between sm:text-lg">
              <label htmlFor="label" className="text-gray">
                Enter label:
              </label>

              <div>
                Current MS level:{" "}
                <span className="text-primary ml-2 font-bold text-xl sm:text-2xl underline">
                  3
                </span>
              </div>
            </div>

            <input
              type="text"
              id="label"
              placeholder="0"
              className="bg-[#121212] outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="flex flex-col gap-2.5">
              <div className="sm:text-lg">
                <label htmlFor="label" className="font-medium text-gray">
                  {selectedCalculator === ""
                    ? "Tokens Redeem/mint-able"
                    : selectedCalculator === "Mint Calculator"
                    ? "Tokens Mint-able"
                    : "Tokens Redeemable"}
                </label>
              </div>

              <input
                type="text"
                placeholder="-"
                className="bg-background outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow"
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="sm:text-lg">
                <label htmlFor="label" className="font-medium text-gray">
                  Mint Slayer price
                </label>
              </div>

              <input
                type="text"
                placeholder="-"
                className="bg-background outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="sm:text-lg">
              <label htmlFor="label" className="font-medium text-gray">
                Enter Mint Slayer amount:
              </label>
            </div>

            <input
              type="text"
              placeholder="0"
              className="bg-[#121212] outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="sm:text-lg">
              <label htmlFor="label" className="font-medium text-gray">
                {selectedCalculator === ""
                  ? "Total USDV spent/received"
                  : selectedCalculator === "Mint Calculator"
                  ? "Total USDV spent"
                  : "Total USDV received"}
              </label>
            </div>

            <input
              type="text"
              placeholder="-"
              className="bg-background outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="sm:text-lg">
              <label htmlFor="label" className="font-medium text-gray">
                Total USDT cost value:
              </label>
            </div>

            <input
              type="text"
              placeholder="-"
              className="bg-background outline-none placeholder:text-gray-500 text-xl sm:text-2xl font-medium px-4 py-3 md:px-5 md:py-4 rounded-lg shadow-insetDarkGlow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
