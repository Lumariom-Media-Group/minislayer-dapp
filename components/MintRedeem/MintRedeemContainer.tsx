import React, { useState } from "react";
import Mint from "./Mint";
import Redeem from "./Redeem";

const MintRedeemContainer = () => {
  const [activeTab, setActiveTab] = useState("Mint");

  return (
    <div className="bg-darkSlate glowing-effect relative z-10 p-4 rounded-xl shadow-insetDarkGlow flex flex-col gap-6 sm:p-6">
      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 font-medium text-lg rounded-lg ${
            activeTab === "Mint"
              ? "bg-primary text-white"
              : "bg-background text-gray shadow-primary shadow-sm hover:bg-primary-light hover:text-white"
          }`}
          onClick={() => setActiveTab("Mint")}
        >
          Mint
        </button>
        <button
          className={`px-4 py-2 font-medium text-lg rounded-lg ${
            activeTab === "Redeem"
              ? "bg-primary text-white"
              : "bg-background text-gray shadow-primary shadow-sm hover:bg-primary-light hover:text-white"
          }`}
          onClick={() => setActiveTab("Redeem")}
        >
          Redeem
        </button>
      </div>

      {activeTab === "Mint" ? <Mint /> : <Redeem />}
    </div>
  );
};

export default MintRedeemContainer;
