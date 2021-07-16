import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import { IPointSummary } from "../../src/models/types";

interface IProps {
  summary: IPointSummary;
  ratios: IPointSummary;
}

const SummaryChart: React.FC<IProps> = ({ summary, ratios }) => {
  if (
    ratios.crafting === 0 &&
    ratios.journey === 0 &&
    ratios.mining === 0 &&
    ratios.warfare === 0
  )
    return null;

  return (
    <div className="progress" style={{ height: 7.5 }}>
      <Tooltip title={`Mining - ${summary.mining} bodů`}>
        <div
          className="progress-bar bkg-mining"
          role="progressbar"
          style={{ width: `${ratios.mining * 100}%` }}
        ></div>
      </Tooltip>
      <Tooltip title={`Crafting - ${summary.crafting} bodů`}>
        <div
          className="progress-bar bkg-crafting"
          role="progressbar"
          style={{ width: `${ratios.crafting * 100}%` }}
        ></div>
      </Tooltip>
      <Tooltip title={`Warfare - ${summary.warfare} bodů`}>
        <div
          className="progress-bar bkg-warfare"
          role="progressbar"
          style={{ width: `${ratios.warfare * 100}%` }}
        ></div>
      </Tooltip>
      <Tooltip title={`Journey - ${summary.journey} bodů`}>
        <div
          className="progress-bar bkg-journey"
          role="progressbar"
          style={{ width: `${ratios.journey * 100}%` }}
        ></div>
      </Tooltip>
    </div>
  );
};

export default SummaryChart;
