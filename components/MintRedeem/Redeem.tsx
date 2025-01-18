import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import LabelBadge from "../ui-elements/LabelBadge";
import { CgArrowsExchangeV } from "react-icons/cg";

const Redeem = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg sm:text-2xl">Redeem</h1>

        <div className="border-2 rounded-full p-0.5 text-2xl">
          <CgArrowsExchangeV />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 font-semibold sm:text-lg">
            <h1>Enter amount:</h1>

            <p>Balance: 0</p>
          </div>

          <div className="relative w-full flex rounded-lg shadow-insetDarkGlow">
            <div className="absolute rounded-lg top-0 left-0 w-full h-full shadow-insetDarkGlow z-10 pointer-events-none"></div>

            <div className="bg-background min-w-[110px] rounded-lg rounded-r-none p-4 flex items-center gap-2 sm:p-6 sm:gap-4 sm:min-w-[145px]">
              <img src="/images/logo.png" alt="usdv" className="max-w-[30px]" />

              <span className="font-bold sm:text-xl">MS</span>
            </div>

            <div className="bg-[#121212] rounded-lg rounded-l-none p-4 flex-1 flex items-center gap-2 sm:p-6 sm:gap-4">
              <input
                type="number"
                placeholder="0"
                className="w-full bg-transparent outline-none font-bold text-lg sm:text-2xl"
              />

              <button className="border border-text rounded-lg px-4 py-1 font-semibold">
                MAX
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 font-semibold sm:text-lg">
            <h1>You receive:</h1>
          </div>

          <div className="relative w-full flex rounded-lg shadow-insetDarkGlow">
            <div className="absolute rounded-lg top-0 left-0 w-full h-full shadow-insetDarkGlow z-10 pointer-events-none"></div>

            <div className="bg-background min-w-[110px] rounded-lg rounded-r-none p-4 flex items-center gap-2 sm:p-6 sm:gap-4 sm:min-w-[145px]">
              <img src="/images/usdv.png" alt="usdv" className="max-w-[30px]" />

              <span className="font-bold sm:text-xl">USDV</span>
            </div>

            <div className="bg-[#121212] rounded-lg rounded-l-none p-4 flex-1 flex items-center gap-2 sm:p-6 sm:gap-4">
              <div className="w-full bg-transparent outline-none font-bold text-lg sm:text-2xl">
                0
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 sm:gap-4 text-sm sm:text-base">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">Mini Slayer (price per token)</h1>
          <p className="font-medium">1 USDV</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">Mini Slayer LP</h1>
          <p className="font-medium">1000 USDV</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">MS current level</h1>
          <p className="font-medium">Level 1</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="font-semibold">Total USDV spent</h1>

            <LabelBadge text="-5% Tax" className="text-red" />
          </div>

          <p className="font-medium">0</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <PrimaryButton label="REDEEM" className="py-3 rounded-[8px]" />

        <hr className="border-gray-400" />

        <p className="text-center font-semibold leading-none">
          Mint or Redeem USDV{" "}
          <a href="#" className="text-green hover:underline">
            here
          </a>
        </p>
      </div>
    </>
  );
};

export default Redeem;
