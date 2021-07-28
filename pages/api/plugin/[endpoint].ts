import { NextApiRequest, NextApiResponse } from "next";
import chatResolver from "../../../backend/plugin/chat-resolver/chat-resolver";
import {
  checkSessionValid,
  logoutAll,
  newLogin,
  updateSession,
} from "../../../backend/plugin/login-resolver/login-resolver";
import isTeamOwner from "../../../backend/plugin/login-resolver/team-owner-resolver";
import resolvePoints from "../../../backend/plugin/points-resolver/points-resolver";
import { resolveSkin } from "../../../backend/plugin/skin-resolver/skin-resolver";
import {
  IApiPluginResponse,
  PluginApiError,
} from "../../../backend/plugin/types";
import validatePlayerJoin from "../../../backend/plugin/validate-join";

type Endpoint =
  | "validate"
  | "addpoints"
  | "date"
  | "login"
  | "validate-session"
  | "update-session"
  | "logout-all"
  | "skin"
  | "check-chat"
  | "is-team-owner";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IApiPluginResponse<any>>
) => {
  const { url, query, method, body } = req;

  const endpoint = query.endpoint.toString() as Endpoint;

  if (endpoint === "skin" && method === "GET") {
    const uid = query.uuid?.toString();
    await resolveSkin(uid, res);
    return;
  }

  /**
   *  Resolvers below require authorization
   */

  if (req.headers.authorization !== process.env.PLUGIN_SECRET) {
    res.status(401).json({
      error: PluginApiError.Unauthorized,
      content: { url, query, body, method },
    });
    return;
  }

  if (endpoint === "check-chat" && method === "GET") {
    const message = query.message?.toString();

    await chatResolver(message, res);
    return;
  }

  if (endpoint === "is-team-owner" && method === "GET") {
    const uid = query.uuid?.toString();

    await isTeamOwner(uid, res);
    return;
  }

  if (endpoint === "validate" && method === "GET") {
    const nick = query.nick?.toString();
    const uid = query.uuid?.toString();
    await validatePlayerJoin(uid, nick, res);
    return;
  }

  if (endpoint === "addpoints" && method === "POST" && !!body) {
    await resolvePoints(body, res);
    return;
  }

  if (endpoint === "date") {
    res.status(200).json({
      content: Date.now(),
    });
    return;
  }

  if (endpoint === "validate-session" && method === "GET") {
    const ip = query.ip?.toString();
    const uuid = query.uuid?.toString();

    await checkSessionValid(uuid, ip, res);
    return;
  }

  if (endpoint === "login" && method === "POST" && !!body) {
    await newLogin(body, res);
    return;
  }

  if (endpoint === "update-session" && method === "POST" && !!body) {
    await updateSession(body, res);
    return;
  }

  if (endpoint === "logout-all" && method === "POST") {
    await logoutAll(res);
    return;
  }

  res.status(200).json({
    error: PluginApiError.NotImplemented,
    content: { url, query, body, method },
  });
};

export default handler;
