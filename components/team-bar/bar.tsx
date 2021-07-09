import React from "react";

interface IProps {
  percentage: number;
}

const Bar: React.FC<IProps> = ({ percentage }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Bar;
