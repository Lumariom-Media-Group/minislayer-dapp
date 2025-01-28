import React from "react";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import { SiGitbook } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="px-4 sm:px-8 py-6 lg:py-8">
      <div className="max-w-[1280px] mx-auto text-text flex flex-col items-center gap-4 md:flex-row-reverse md:justify-between">
        <p className="font-bold">&copy; SLAYER PLATFORM 2025</p>

        <div className="flex items-center gap-6" >
          <a href="https://slayer-platform.gitbook.io/mini-slayer" target="_blank">
            <SiGitbook className="text-xl transition-all duration-300 hover:scale-110" />
          </a>
          <a href="https://x.com/SlayerPlatform"target="_blank">
            <FaXTwitter className="text-xl transition-all duration-300 hover:scale-110" />
          </a>
          <a href="https://discord.gg/2ndKVN4RYz"target="_blank">
            <FaDiscord className="text-xl transition-all duration-300 hover:scale-110" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
