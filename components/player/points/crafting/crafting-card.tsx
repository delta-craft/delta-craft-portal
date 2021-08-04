import Paper from "@material-ui/core/Paper";
import React from "react";
import { GetPlayerDetail_player_points_pointTags } from "../../../../src/gql/client/types/GetPlayerDetail";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";

interface IProps {
  tags: GetPlayerDetail_player_points_pointTags[];
}

const CraftingCard: React.FC<IProps> = ({ tags }) => {
  const t = Object.fromEntries(tags.map((x) => [x.key, x.value]));

  console.log(t);

  return (
    <Paper className="p-md-4">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <Image
          src={`/img/points/crafting/${t.Item}.webp`}
          alt=""
          height={150}
          width={150}
        />
        <Typography className="my-2 text-center">{t.Amount ?? 1}×</Typography>
      </div>
    </Paper>
  );
};

export default CraftingCard;
