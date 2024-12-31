import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";

const Header = () => {
  return (
    <header className="rounded-xl rounded-t-none px-4 sm:px-8 py-6 shadow-insetWhiteGlow lg:py-8">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <img
          src="/images/logo.png"
          alt="logo"
          className="max-w-[45px] xl:hidden"
        />

        <img
          src="/images/logo_with_name.png"
          alt="logo"
          className="max-w-[150px] hidden xl:block"
        />

        <PrimaryButton label="Connect Wallet" />
      </div>
    </header>
  );
};

export default Header;
