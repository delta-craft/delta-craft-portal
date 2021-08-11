import React from "react";
import JoinUsCard from "./join-us-card";

const JoinUsContainer: React.FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-center pt-4 flex-column align-items-center">
        <div className="col-12 col-md-6 px-3 py-3">
          <JoinUsCard
            icon={<i className="fas fa-map-marked-alt"></i>}
            title="Mapa"
            desc="Zkoumej svět DeltaCraftu z pohodlí svého prohlížeče"
            link="https://map.deltacraft.eu/"
          />
        </div>
        <div className="col-12 col-md-6 px-3 py-3">
          <JoinUsCard
            icon={<i className="fab fa-discord"></i>}
            title="Discord"
            desc="Připoj se na náš Discord server"
            link="https://discord.gg/NcHEfTx"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUsContainer; 