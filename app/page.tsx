"use client";
import MintRedeemContainer from "@/components/MintRedeem/MintRedeemContainer";
import Progress from "@/components/MintRedeem/Progress";

export default function MintRedeem() {
  return (
    <div className="min-h-[calc(100dvh-115.963px-88px)] overflow-hidden px-4 sm:px-8 py-10 sm:py-14 lg:py-20">
      <div className="relative max-w-[700px] rounded-xl mx-auto container flex flex-col gap-8">
        <Progress />

        <MintRedeemContainer />
      </div>
    </div>
  );
}
