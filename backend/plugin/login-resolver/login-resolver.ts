import { NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { FcmTokens } from "../../../src/db/entities/FcmTokens";
import { ServerLogins } from "../../../src/db/entities/ServerLogins";
import { Sessions } from "../../../src/db/entities/Sessions";
import { Teams } from "../../../src/db/entities/Teams";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { minutesBetween } from "../../../src/utils/date-helper";
import { dbConnect } from "../../../src/utils/db-conn";
import { validateUUID } from "../../../src/utils/uuid-helper";
import { newLoginNotification } from "../../notifications/new-login-notification";
import {
  IApiPluginResponse,
  LoginError,
  PluginApiError,
  ValidateError,
} from "../types";

const validateIPv4 = (ip: string): boolean =>
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    ip
  );

interface IData {
  uuid: string;
  ip: string;
}

const newLogin = async (
  data: IData,
  res: NextApiResponse<IApiPluginResponse<boolean>>
) => {
  const { uuid, ip } = data;

  if (!validateUUID(uuid)) {
    res
      .status(400)
      .json({ content: false, error: PluginApiError.UuidNotValid });
    return;
  }

  if (!ip) {
    res.status(400).json({ content: false, error: PluginApiError.Unknown });
    return;
  }

  await dbConnect();

  const repoSessions = getRepository(Sessions);
  const repoUCons = getRepository(UserConnections);

  const uConn = await repoUCons.findOne({ where: { uid: uuid } });
  if (!uConn) {
    res
      .status(400)
      .json({ content: false, error: ValidateError.NotRegistered });
    return;
  }

  try {
    const s = await repoSessions.findOne({ where: { connectionId: uConn.id } });
    if (!s) {
      const session = new Sessions();
      session.connectionId = uConn.id;
      session.ip = ip;
      session.authRequest = new Date();
      session.auth = null;
      await repoSessions.save(session);

      const tokens = await getRepository(FcmTokens).find({
        where: { connectionId: uConn.id },
      });
      await newLoginNotification(tokens.map((x) => x.token));

      res.status(200).json({ content: true });

      return;
    }

    s.connectionId = uConn.id;
    s.ip = ip;
    s.authRequest = new Date();
    s.auth = null;
    await repoSessions.save(s);
    const tokens = await getRepository(FcmTokens).find({
      where: { connectionId: uConn.id },
    });

    await newLoginNotification(tokens.map((x) => x.token));

    res.status(200).json({ content: true });

    return;
  } catch (error) {
    console.log(error);
    res.status(200).json({ content: false, error: PluginApiError.Unknown });
    return;
  }
};

const updateSession = async (
  data: IData,
  res: NextApiResponse<IApiPluginResponse<boolean>>
) => {
  const { uuid, ip } = data;

  if (!validateUUID(uuid)) {
    res
      .status(400)
      .json({ content: false, error: PluginApiError.UuidNotValid });
    return;
  }

  if (!validateIPv4(ip)) {
    res.status(400).json({ content: false, error: LoginError.InvalidIP });
    return;
  }

  await dbConnect();

  const sessionRepo = getRepository(Sessions);
  const repoUCons = getRepository(UserConnections);

  const uConn = await repoUCons.findOne({ where: { uid: uuid } });
  if (!uConn) {
    res
      .status(400)
      .json({ content: false, error: ValidateError.NotRegistered });
    return;
  }

  const session = await sessionRepo.findOne({
    where: { connectionId: uConn.id },
  });

  if (!session) {
    res.status(400).json({ content: false, error: PluginApiError.Unknown });
    return;
  }

  if (session.ip !== ip) {
    res.status(400).json({ content: false, error: LoginError.IPMismatch });
    return;
  }

  session.updated = new Date();

  try {
    await sessionRepo.save(session);
    res.status(200).json({ content: true });
    return;
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ content: false, error: PluginApiError.Unknown });
    return;
  }
};

interface ISessionResponse {
  success: boolean;
  team?: {
    id: number;
    name: string;
    majorTeam: string;
  };
}

const checkSessionValid = async (
  uuid: string,
  ip: string,
  res: NextApiResponse<IApiPluginResponse<ISessionResponse>>
) => {
  if (!validateUUID(uuid)) {
    res.status(400).json({
      content: { success: false },
      error: PluginApiError.UuidNotValid,
    });
    return;
  }

  if (!validateIPv4(ip)) {
    res
      .status(400)
      .json({ content: { success: false }, error: LoginError.InvalidIP });
    return;
  }

  await dbConnect();

  const sessionRepo = getRepository(Sessions);
  const repoUCons = getRepository(UserConnections);

  const uConn = await repoUCons.findOne({
    where: { uid: uuid },
    relations: ["Teams"],
  });
  if (!uConn) {
    res.status(400).json({
      content: { success: false },
      error: ValidateError.NotRegistered,
    });
    return;
  }

  const session = await sessionRepo.findOne({
    where: { connectionId: uConn.id },
  });

  // console.log(session);

  if (!session) {
    res
      .status(400)
      .json({ content: { success: false }, error: PluginApiError.Unknown });
    return;
  }

  if (!session.updated || !session.authRequest) {
    res
      .status(400)
      .json({ content: { success: false }, error: LoginError.SessionExpired });
    return;
  }

  if (session.auth == false || session.ip !== ip) {
    session.updated = null;
    session.ip = null;
    session.auth = null;
    session.authRequest = null;
    await sessionRepo.save(session);
    res
      .status(400)
      .json({ content: { success: false }, error: LoginError.Denied });
    return;
  }

  if (
    minutesBetween(new Date(), session.updated) > 10 ||
    session.auth == null
  ) {
    session.updated = null;
    session.ip = null;
    session.auth = null;
    session.authRequest = null;
    await sessionRepo.save(session);
    res
      .status(400)
      .json({ content: { success: false }, error: LoginError.SessionExpired });
    return;
  }

  await logNewLogin(uConn, ip);

  res.status(200).json({ content: { success: true, team: { ...uConn.team } } });
  return;
};

const logNewLogin = async (uConn: UserConnections, ip: string) => {
  const repo = getRepository(ServerLogins);

  try {
    const l = new ServerLogins();
    l.connectionId = uConn.id;
    l.ip = ip;
    l.connectedOn = new Date();
    await repo.save(l);
  } catch (ex) {
    console.log(ex);
  }
};

const logoutAll = async (res: NextApiResponse<IApiPluginResponse<boolean>>) => {
  await dbConnect();
  const repo = getRepository(Sessions);
  try {
    await repo
      .createQueryBuilder()
      .update()
      .set({ auth: null, ip: null, updated: null, authRequest: null })
      .execute();
    res.status(200).json({ content: true });
  } catch (ex) {
    console.log(ex);
    res.status(200).json({ content: false, error: PluginApiError.Unknown });
  }
  return;
};

export { newLogin, logoutAll, checkSessionValid, updateSession };
