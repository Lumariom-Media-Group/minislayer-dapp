import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import LabelBadge from "../ui-elements/LabelBadge";
import { CgArrowsExchangeV } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";

import {
  ContractFunctionExecutionError,
  erc20Abi,
  formatUnits,
  parseUnits,
  zeroAddress,
} from "viem";
import { miniSlayerAbi } from "@/abi/miniSlayerAbi";
import { useReadContract, useReadContracts, useWatchBlocks } from "wagmi";
import {
  MINI_SLAYER,
  MINI_SLAYER_DECIMALS,
  USDV,
  USDV_DECIMALS,
} from "@/constants";
import { useAccount } from "wagmi";
import { simulateContract, waitForTransactionReceipt } from "wagmi/actions";
import { wagmiConfig } from "@/lib/wagmiConfig";
import { useWriteContract } from "wagmi";
import { toast } from "react-hot-toast";
import { useConnectModal } from "@rainbow-me/rainbowkit";
const miniSlayerContract = {
  address: MINI_SLAYER,
  abi: miniSlayerAbi,
} as const;

const Redeem = () => {
  const { openConnectModal } = useConnectModal();
  const { writeContractAsync } = useWriteContract();
  const amountInRef = useRef<HTMLInputElement>(null);

  const [mintAmount, setMintAmount] = useState(0);
  const { address, isConnected } = useAccount();

  const { data: usdvBalance } = useReadContract({
    address: USDV,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address ? address : zeroAddress],
  });

  const { data: miniSlayerBalance, refetch: refetchMiniSlayerBalance } =
    useReadContract({
      ...miniSlayerContract,
      functionName: "balanceOf",
      args: [address ? address : zeroAddress],
    });

  const { data: amountMintedOrRedeemed } = useReadContract({
    address: MINI_SLAYER,
    abi: miniSlayerAbi,
    functionName: "amountMintedOrRedeemed",
  });

  const { data: usdvAllowance, refetch: refetchAllowance } = useReadContract({
    address: USDV,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address || zeroAddress, MINI_SLAYER],
  });

  const { data: currentLevel, refetch: refetchCurrentLevel } = useReadContract({
    address: MINI_SLAYER,
    abi: miniSlayerAbi,
    functionName: "getLevel",
    args: [amountMintedOrRedeemed || BigInt(0)],
  });

  console.log("amountMintedOrRedeemed", amountMintedOrRedeemed);

  const { data: miniSlayerLP, refetch: refetchMiniSlayerLP } = useReadContract({
    address: USDV,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [MINI_SLAYER],
  });

  const { data: getPricesArgs_ } = useReadContracts({
    contracts: [
      {
        ...miniSlayerContract,
        functionName: "amountMintedOrRedeemed",
      },
      {
        ...miniSlayerContract,
        functionName: "lockedMinimumAmount",
      },
    ],
    allowFailure: false,
  });

  const getPricesArgs = getPricesArgs_
    ? getPricesArgs_
    : ([BigInt(0), BigInt(0)] as [bigint, bigint]);

  const { data: miniSlayerPrice, error } = useReadContract({
    address: MINI_SLAYER,
    abi: miniSlayerAbi,
    functionName: "getPrices",
    args: getPricesArgs,
  });

  const { data: tokenPrice, refetch: refetchTokenPrice } = useReadContract({
    address: MINI_SLAYER,
    abi: miniSlayerAbi,
    functionName: "tokenPrice",
  });

  const [mintPrice, redeemPrice] = miniSlayerPrice
    ? miniSlayerPrice
    : [BigInt(0), BigInt(0)];

  const {
    data: getAmountOut,
    isSuccess: getAmountOutSuccess,
    isLoading: getAmountOutLoading,
    error: getRedeemAmountOutError,
  } = useReadContract({
    ...miniSlayerContract,
    functionName: "getRedeemAmountOut",
    args: [
      parseUnits(mintAmount.toString(), MINI_SLAYER_DECIMALS),
      tokenPrice || BigInt(0),
      getPricesArgs[0],
      getPricesArgs[1],
    ],
  });

  async function handleRedeem() {
    const toastId = toast.loading("Redeeming");

    try {
      const result = await simulateContract(wagmiConfig, {
        ...miniSlayerContract,
        functionName: "redeemToken",
        args: [
          parseUnits(mintAmount.toString(), MINI_SLAYER_DECIMALS),
          getAmountOutSuccess ? getAmountOut.redeemAmount : BigInt(0),
        ],
      });
    } catch (err) {
      console.log("simulationError", err);
      if (err instanceof ContractFunctionExecutionError) {
        toast.error("Tx Likely to Fail : " + err.shortMessage, { id: toastId });
        return;
      }
    }

    try {
      const txHash = await writeContractAsync({
        ...miniSlayerContract,
        functionName: "redeemToken",
        args: [
          parseUnits(mintAmount.toString(), MINI_SLAYER_DECIMALS),
          getAmountOutSuccess ? getAmountOut.redeemAmount : BigInt(0),
        ],
      });

      toast.loading("Tx Sent , Waiting for Tx to Complete", {
        id: toastId,
      });

      try {
        await waitForTransactionReceipt(wagmiConfig, {
          hash: txHash,
        });
        await refetchAllowance();
        toast.success("Redeem Completed", { id: toastId });
      } catch (err) {
        toast.error(
          "Tx Sent , but failed to wait for confirmation , please refresh",
          { id: toastId }
        );
      }
    } catch (err) {
      toast.error("Unable to Approve", { id: toastId });
    }
  }

  const requireAllowance = getAmountOutSuccess
    ? getAmountOut.redeemAmount
    : BigInt(0);
  const requireApproval = (usdvAllowance || BigInt(0)) < requireAllowance;

  useWatchBlocks({
    async onBlock() {
      await refetchCurrentLevel();
      await refetchTokenPrice();
    },
  });

  return (
    <>
      {/* <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg sm:text-2xl">Redeem</h1>

        <div className="border-2 rounded-full p-0.5 text-2xl">
          <CgArrowsExchangeV onClick={() => {

          }} />
        </div>
      </div> */}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 font-semibold sm:text-lg">
            <h1>Enter amount:</h1>

            <p>
              Balance:{" "}
              {formatUnits(
                miniSlayerBalance || BigInt(0),
                MINI_SLAYER_DECIMALS
              )}{" "}
            </p>
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
                ref={amountInRef}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  if (!isNaN(num)) {
                    setMintAmount(num);
                  }
                }}
                placeholder="0"
                className="w-full bg-transparent outline-none font-bold text-lg sm:text-2xl"
              />

              <button
                onClick={() => {
                  const balance = Number(
                    formatUnits(
                      miniSlayerBalance || BigInt(0),
                      MINI_SLAYER_DECIMALS
                    )
                  );
                  setMintAmount(balance);
                  if (amountInRef.current) {
                    amountInRef.current.value = balance.toString();
                  }
                }}
                className="border border-text rounded-lg px-4 py-1 font-semibold"
              >
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
                {getAmountOutLoading
                  ? "..."
                  : getAmountOutSuccess
                  ? formatUnits(getAmountOut.redeemAmount, MINI_SLAYER_DECIMALS)
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 sm:gap-4 text-sm sm:text-base">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">Mini Slayer (price per token)</h1>
          <p className="font-medium">
            {formatUnits(mintPrice, USDV_DECIMALS)} USDV
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">Mini Slayer LP</h1>
          <p className="font-medium">
            {formatUnits(miniSlayerLP || BigInt(0), USDV_DECIMALS)} USDV
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold">MS current level</h1>
          <p className="font-medium">Level {currentLevel?.toString()}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="font-semibold">Total USDV Receivable</h1>

            <LabelBadge text="-5% Fee" className="text-red" />
          </div>

          <p className="font-medium">
            {getAmountOutSuccess
              ? formatUnits(getAmountOut.redeemAmount, USDV_DECIMALS)
              : ""}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        {isConnected ? (
          <PrimaryButton
            label="REDEEM"
            className="py-3 rounded-[8px]"
            onClick={handleRedeem}
          />
        ) : (
          <PrimaryButton
            label="Connect Wallet"
            className="py-3 rounded-[8px]"
            onClick={openConnectModal}
          />
        )}

        <hr className="border-gray-400" />

        <p className="text-center font-semibold leading-none">
          Mint or Redeem USDV{" "}
          <a
            href="https://usdv.lumariommediagroup.com/"
            className="text-green hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </p>
      </div>
    </>
  );
};

export default Redeem;
