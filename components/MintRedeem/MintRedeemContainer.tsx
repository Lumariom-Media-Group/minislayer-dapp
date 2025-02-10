import React, { useState } from "react";
import Mint from "./Mint";
import Redeem from "./Redeem";
import { useAtom } from "jotai";
import { activeTabAtom } from "@/atoms/atoms";
import Progress from "./Progress";

const MintRedeemContainer = () => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <>
      <Progress />

      <div className="bg-darkSlate glowing-effect relative z-10 p-4 rounded-xl shadow-insetDarkGlow flex flex-col gap-6 sm:p-6">
        <div className="flex rounded-lg up bg-background justify-center">
          <button
            className={`px-4 uppercase border-[3px] flex-1 py-2 text-lg rounded-lg sm:text-xl lg:text-[22px] ${
              activeTab === "Mint"
                ? "border-primary glow-border font-extrabold text-primary"
                : "border-transparent font-semibold  text-gray"
            }`}
            onClick={() => setActiveTab("Mint")}
          >
            Mint
          </button>
          <button
            className={`px-4 uppercase border-[3px] flex-1 py-2 text-lg rounded-lg sm:text-xl lg:text-[22px] ${
              activeTab === "Redeem"
                ? "border-primary glow-border font-extrabold text-primary"
                : "border-transparent font-semibold  text-gray"
            }`}
            onClick={() => setActiveTab("Redeem")}
          >
            Redeem
          </button>
        </div>

        {activeTab === "Mint" ? <Mint /> : <Redeem />}
      </div>
    </>
  );
};

export default MintRedeemContainer;
