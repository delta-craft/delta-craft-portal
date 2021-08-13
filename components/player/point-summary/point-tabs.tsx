import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState } from "react";
import { PlayerStats_player_stats } from "../../../src/gql/client/types/PlayerStats";
import CraftingSummary from "./crafting-summary";
import MiningSummary from "./mining-summary";
import WarfareSummary from "./warfare-summary";

interface IProps {
  stats: PlayerStats_player_stats;
}

const PointTabs: React.FC<IProps> = ({ stats }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const { crafting, mining, mob } = stats;

  return (
    <div>
      <Tabs value={currentTab} onChange={handleChange} centered>
        <Tab label="Mining" />
        <Tab label="Crafting" />
        <Tab label="Warfare" />
      </Tabs>
      <div className="my-4">
        {currentTab === 0 && <MiningSummary stats={mining} />}
        {currentTab === 1 && <CraftingSummary stats={crafting} />}
        {currentTab === 2 && <WarfareSummary stats={mob} />}
      </div>
    </div>
  );
};

export default PointTabs;
