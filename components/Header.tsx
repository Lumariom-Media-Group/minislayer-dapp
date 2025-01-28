"use client";

import React, { useState, useEffect } from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import { CgMenu } from "react-icons/cg";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { SiGitbook } from "react-icons/si";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

const Header = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`rounded-xl font-exo rounded-t-none px-4 sm:px-8 py-6 lg:py-8 ${
        isMenuOpen ? "" : "shadow-insetWhiteGlow"
      }`}
    >
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <img
          src="/images/logo.png"
          alt="logo"
          className="max-w-[45px] md:hidden"
        />

        <img
          src="/images/logo_with_name.png"
          alt="logo"
          className="max-w-[150px] hidden md:block"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center text-white font-semibold text-lg gap-8">
          <li
            className={`transition-all duration-300 hover:text-primary ${
              pathname === "/" ? "text-primary" : ""
            }`}
          >
            <Link href="/">Mint/Redeem</Link>
          </li>
          <li
            className={`transition-all duration-300 hover:text-primary ${
              pathname === "/calculator" ? "text-primary" : ""
            }`}
          >
            <Link href="/calculator">Calculator</Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {isConnected ? (
            <ConnectButton />
          ) : (
            <PrimaryButton label="Connect Wallet" onClick={openConnectModal} />
          )}

          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IoCloseSharp className="text-3xl transition-all duration-300 hover:text-primary" />
            ) : (
              <CgMenu className="text-2xl transition-all duration-300 hover:text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full min-h-[calc(100dvh-99.9625px)] bg-background flex flex-col justify-between gap-8">
          <ul className="mt-4 font-semibold text-lg py-6 space-y-6">
            <li
              className={`transition-all duration-300 hover:text-primary ${
                pathname === "/" ? "text-primary" : ""
              }`}
            >
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Mint/Redeem
              </Link>
            </li>
            <li
              className={`transition-all duration-300 hover:text-primary ${
                pathname === "/calculator" ? "text-primary" : ""
              }`}
            >
              <Link href="/calculator" onClick={() => setIsMenuOpen(false)}>
                Calculator
              </Link>
            </li>
          </ul>

          <div className="w-full flex flex-col items-center gap-4">
            <p className="text-gray font-medium">&copy; SLAYER PLATFORM 2024</p>

            <div className="flex items-center gap-6">
              <a href="#">
                <SiGitbook className="text-xl transition-all duration-300 hover:scale-110" />
              </a>
              <a href="#">
                <FaXTwitter className="text-xl transition-all duration-300 hover:scale-110" />
              </a>
              <a href="#">
                <FaDiscord className="text-xl transition-all duration-300 hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
