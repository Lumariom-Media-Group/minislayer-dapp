import React from "react";

interface LabelBadgeProps {
  text: string;
  className?: string;
}

const LabelBadge: React.FC<LabelBadgeProps> = ({ text, className = "" }) => {
  return (
    <div
      className={`bg-background text-green px-2.5 py-1 font-medium rounded-lg text-sm sm:px-4 ${className}`}
    >
      {text}
    </div>
  );
};

export default LabelBadge;
