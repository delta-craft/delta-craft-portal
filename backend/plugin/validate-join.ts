import { NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Consents } from "../../src/db/entities/Consents";
import { UserConnections } from "../../src/db/entities/UserConnections";
import { dbConnect } from "../../src/utils/db-conn";
import { IApiPluginResponse, ValidateError } from "./types";

const validateUUID = (uuid: string): boolean =>
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/.test(
    uuid
  );

const validateUserConsent = async (
  userConnection: UserConnections
): Promise<boolean> => {
  const { consent } = userConnection;
  if (!consent) return false;

  const repo = getRepository(Consents);
  const consents = await repo.find({ order: { created: "DESC" } });

  if (consents.length < 1) return true;

  const c = consents[0];

  return consent > c.created;
};

const validatePlayerJoin = async (
  uid: string,
  nick: string,
  res: NextApiResponse<IApiPluginResponse<boolean>>
) => {
  if (!nick || !uid) {
    res
      .status(400)
      .json({ content: false, error: ValidateError.ArgumentsError });
    return;
  }

  if (!validateUUID(uid)) {
    res.status(400).json({ content: false, error: ValidateError.UuidNotValid });
    return;
  }

  await dbConnect();

  const repo = getRepository(UserConnections);

  const result = await repo.find({ where: [{ uid }, { name: nick }] });

  if (!result || result.length < 1) {
    res
      .status(400)
      .json({ content: false, error: ValidateError.NotRegistered });
    return;
  }

  const firstByUid = result.find((x) => x.uid === uid);

  if (firstByUid) {
    if (!(await validateUserConsent(firstByUid))) {
      res
        .status(400)
        .json({ content: false, error: ValidateError.MissingConsent });
      return;
    }

    if (firstByUid.teamId !== null && firstByUid.teamId > 0) {
      res.status(200).json({ content: true });
      return;
    }

    res.status(200).json({ content: false, error: ValidateError.NotInTeam });
    return;
  }

  const firstByName = result.find((x) => x.name === nick);

  if (firstByName) {
    if (firstByName.uid == null || !validateUUID(firstByName.uid)) {
      const updated = { ...firstByName, uid };
      await repo.save(updated);
    }

    if (!(await validateUserConsent(firstByName))) {
      res
        .status(400)
        .json({ content: false, error: ValidateError.MissingConsent });
      return;
    }

    if (firstByName.teamId !== null && firstByName.teamId > 0) {
      res.status(200).json({ content: true });
      return;
    }

    res.status(400).json({ content: false, error: ValidateError.NotInTeam });
    return;
  }

  res.status(400).json({ content: false, error: ValidateError.MissingName });
};

export default validatePlayerJoin;
