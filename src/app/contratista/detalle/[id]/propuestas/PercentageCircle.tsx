import React from 'react';

interface PercentageCircleProps {
  percentage: number;
}

const PercentageCircle: React.FC<PercentageCircleProps> = ({ percentage }) => {
  const circumference = 2 * Math.PI * 24;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-14 h-14 transform -rotate-90">
        <circle
          className="text-gray-300"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="24"
          cx="28"
          cy="28"
        />
        <circle
          className="text-primary"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="24"
          cx="28"
          cy="28"
        />
      </svg>
      <span className="absolute text-sm font-semibold text-primary">
        {percentage}%
      </span>
    </div>
  );
};

export default PercentageCircle;