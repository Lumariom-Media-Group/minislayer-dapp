import React from "react";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`btn bg-primary outline-none text-text font-bold px-6 py-2 rounded-xl transition-all duration-300 active:scale-95 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
