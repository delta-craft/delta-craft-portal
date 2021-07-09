import type { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Consents } from "../../src/db/entities/Consents";
import { UserConnections } from "../../src/db/entities/UserConnections";
import { dbConnect } from "../../src/utils/db-conn";

enum ValidateError {
  ArgumentsError = "arguments_error",
  MethodNotValid = "method_not_valid",
  MissingConsent = "missing_consent",
  MissingName = "missing_name",
  UuidNotValid = "uuid_not_valid",
  NotRegistered = "not_registered",
  Unauthorized = "unauthorized",
  Unknown = "unknown",
}

interface IDataResponse {
  success: boolean;
  errors?: ValidateError[];
}

const validateUUID = (uuid: string): boolean =>
  /([0-9A-Z]{8})-([0-9A-Z]{4})-([0-9A-Z]{4})-([0-9A-Z]{4})-([0-9A-Z]{12})/i.test(
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

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IDataResponse>
) => {
  if (req.headers.authorization !== process.env.PLUGIN_SECRET) {
    res
      .status(401)
      .json({ success: false, errors: [ValidateError.Unauthorized] });
    return;
  }

  if (req.method !== "GET") {
    res
      .status(405)
      .json({ success: false, errors: [ValidateError.MethodNotValid] });
    return;
  }

  const { query } = req;

  if (!query.name || !query.uuid) {
    res
      .status(400)
      .json({ success: false, errors: [ValidateError.ArgumentsError] });
    return;
  }

  await dbConnect();

  const name = req.query.name.toString();
  const uid = req.query.uuid.toString();

  if (!validateUUID(uid)) {
    res
      .status(400)
      .json({ success: false, errors: [ValidateError.UuidNotValid] });
    return;
  }

  const repo = getRepository(UserConnections);

  const result = await repo.find({ where: [{ uid }, { name }] });

  if (!result || result.length < 1) {
    res
      .status(400)
      .json({ success: false, errors: [ValidateError.NotRegistered] });
    return;
  }

  const firstByUid = result.find((x) => x.uid === uid);

  if (firstByUid) {
    if (!(await validateUserConsent(firstByUid))) {
      res
        .status(400)
        .json({ success: false, errors: [ValidateError.MissingConsent] });
      return;
    }

    res.status(200).json({ success: true });
    return;
  }

  const firstByName = result.find((x) => x.name === name);

  if (firstByName) {
    const updated = { ...firstByName, uid };
    await repo.save(updated);

    if (!(await validateUserConsent(firstByName))) {
      res
        .status(400)
        .json({ success: false, errors: [ValidateError.MissingConsent] });
      return;
    }

    res.status(200).json({ success: true });
    return;
  }

  res.status(400).json({ success: false, errors: [ValidateError.MissingName] });
};

export default handler;
