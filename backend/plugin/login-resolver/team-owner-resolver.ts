import { NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Teams } from "../../../src/db/entities/Teams";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { dbConnect } from "../../../src/utils/db-conn";
import { validateUUID } from "../../../src/utils/uuid-helper";
import { IApiPluginResponse, PluginApiError, ValidateError } from "../types";

const isTeamOwner = async (
  uid: string,
  res: NextApiResponse<IApiPluginResponse<boolean>>
) => {
  if (!validateUUID(uid)) {
    res.status(400).json({
      content: false,
      message: "Invalid UUID",
      error: PluginApiError.UuidNotValid,
    });
    return;
  }

  await dbConnect();

  const ucRepo = getRepository(UserConnections);

  const uc = await ucRepo.findOne({ where: { uid } });

  if (!uc) {
    res.status(400).json({
      content: false,
      message: "User not found",
      error: PluginApiError.Unknown,
    });
    return;
  }

  if (!uc.teamId) {
    res.status(400).json({
      content: false,
      message: "User not in team",
      error: ValidateError.NotInTeam,
    });
    return;
  }

  const team = await getRepository(Teams).findOne({ where: { id: uc.teamId } });

  const isOwner = team.ownerConnId === uc.id;

  res.status(200).json({
    content: isOwner,
    message: isOwner ? "User is team owner" : "User is not team owner",
    error: null,
  });

  return;
};

export default isTeamOwner;
