import { getRepository } from "typeorm";
import { Consents } from "../../../src/db/entities/Consents";
import { FcmTokens } from "../../../src/db/entities/FcmTokens";
import { NextauthUsers } from "../../../src/db/entities/NextauthUsers";
import { Sessions } from "../../../src/db/entities/Sessions";
import { Teams } from "../../../src/db/entities/Teams";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { PointType } from "../../../src/models/enums";
import { IPointSummary } from "../../../src/models/types";
import { minutesBetween } from "../../../src/utils/date-helper";
import { dbConnect } from "../../../src/utils/db-conn";
import { calculateRatios, totalPoints } from "../../../src/utils/point-ratio";
import {
  calcPlayerSummary,
  calcTeamSummary,
} from "../../db-helper/summary-helper";
import { dateScalar } from "../scalars/date-scalar";
import { pointTypeScalar } from "../scalars/point-type-scalar";

const resolvers = {
  Date: dateScalar,
  PointType: pointTypeScalar,
  Query: {
    test: () => "test",
    getUsers: async () => {
      await dbConnect();
      const users = await getRepository(NextauthUsers).find({
        relations: [
          "userConnections",
          "userConnections.points",
          "userConnections.points.pointTags",
        ],
      });
      return users;
    },
    getUser: async (_parent, _params, _ctx, _info) => {
      const user = _ctx.user as NextauthUsers;
      if (!user) return null;

      await dbConnect();
      const user2 = await getRepository(NextauthUsers).findOne({
        where: { id: user.id },
        relations: ["userConnections", "userConnections.team"],
      });
      return user2;
    },
    getTeams: async (_parent, _params, _ctx, { fieldNodes }) => {
      await dbConnect();
      const teams = await getRepository(Teams).find({
        relations: ["userConnections", "userConnections.next"],
      });
      return teams;
    },
    getTeam: async (_parent, { id }, _ctx, { fieldNodes }) => {
      await dbConnect();
      const team = await getRepository(Teams).findOne(id, {
        relations: ["userConnections", "userConnections.next"],
      });
      return team;
    },
    consents: async (_parent, _params, _ctx, _info) => {
      await dbConnect();
      const consents = await getRepository(Consents).find({
        order: { created: "DESC" },
      });
      return consents;
    },
    getPlayerPointSummary: async (
      _parent,
      { id },
      _ctx,
      _info
    ): Promise<{ summary: IPointSummary; ratios: IPointSummary }> => {
      await dbConnect();
      const repo = getRepository(UserConnections);

      const userConn = await repo.findOne({
        where: { id },
        relations: ["points", "points.pointTags"],
      });
      if (!userConn) return null;

      return calcPlayerSummary(userConn);
    },
    getTeamPointSummary: async (
      _parent,
      { id },
      _ctx,
      _info
    ): Promise<{ summary: IPointSummary; ratios: IPointSummary }> => {
      await dbConnect();
      const repo = getRepository(Teams);

      const teams = await repo.findOne({
        where: { id },
        relations: [
          "userConnections",
          "userConnections.points",
          "userConnections.points.pointTags",
        ],
      });
      if (!teams) return null;

      return calcTeamSummary(teams);
    },
    getMajorTeamsSummary: async (
      _parent,
      _params,
      _ctx,
      _info
    ): Promise<{
      red: { summary: IPointSummary; ratios: IPointSummary };
      blue: { summary: IPointSummary; ratios: IPointSummary };
    }> => {
      await dbConnect();
      // TODO: Fix sometime
      const repo = getRepository(Teams);
      const responseBlue = await repo.find({
        where: { majorTeam: "blue" },
        relations: ["userConnections", "userConnections.points"],
      });

      let miningB = 0;
      let craftingB = 0;
      let warfareB = 0;
      let journeyB = 0;

      responseBlue.forEach((blueTeam) => {
        blueTeam.userConnections.forEach((uc) => {
          uc.points.forEach((element) => {
            if (element.pointType === PointType.Mining)
              miningB += element.points;
            if (element.pointType === PointType.Crafting)
              craftingB += element.points;
            if (element.pointType === PointType.Warfare)
              warfareB += element.points;
            if (element.pointType === PointType.Journey)
              journeyB += element.points;
          });
        });
      });

      const summaryBlue: IPointSummary = {
        mining: miningB,
        crafting: craftingB,
        warfare: warfareB,
        journey: journeyB,
      };

      const responseRed = await repo.find({
        where: { majorTeam: "red" },
        relations: ["userConnections", "userConnections.points"],
      });

      let miningR = 0;
      let craftingR = 0;
      let warfareR = 0;
      let journeyR = 0;

      responseRed.forEach((redTeam) => {
        redTeam.userConnections.forEach((uc) => {
          uc.points.forEach((element) => {
            if (element.pointType === PointType.Mining)
              miningR += element.points;
            if (element.pointType === PointType.Crafting)
              craftingR += element.points;
            if (element.pointType === PointType.Warfare)
              warfareR += element.points;
            if (element.pointType === PointType.Journey)
              journeyR += element.points;
          });
        });
      });

      const summaryRed: IPointSummary = {
        mining: miningR,
        crafting: craftingR,
        warfare: warfareR,
        journey: journeyR,
      };

      return {
        red: { summary: summaryRed, ratios: calculateRatios(summaryRed) },
        blue: { summary: summaryBlue, ratios: calculateRatios(summaryBlue) },
      };
    },
    player: async (
      _parent,
      { nickname },
      _ctx,
      _info
    ): Promise<UserConnections> => {
      await dbConnect();

      const repo = getRepository(UserConnections);

      const res = await repo.findOne({
        where: { name: nickname },
        relations: ["points", "points.pointTags", "team"],
      });

      if (!res) return null;

      res.points = res.points.sort((a, b) => (a.created > b.created ? -1 : 1));

      return res;
    },
    players: async (_parent, _params, _ctx, _info): Promise<{}[]> => {
      await dbConnect();

      const repo = getRepository(UserConnections);

      const res = await repo.find({
        relations: ["points", "points.pointTags", "team"],
      });

      if (!res) return [];

      const valid = res.filter((x) => x.name !== null);

      let arr = [];

      for (const v of valid) {
        arr = [...arr, { ...v, pointSummary: calcPlayerSummary(v) }];
      }

      arr = arr.sort((a, b) =>
        totalPoints(a.pointSummary.summary) >
        totalPoints(b.pointSummary.summary)
          ? -1
          : 1
      );

      return arr;
    },
    loginSession: async (_parent, _params, _ctx, _info) => {
      const user = _ctx.user as NextauthUsers;
      if (!user) return null;

      await dbConnect();

      const uConn = await getRepository(UserConnections).findOne({
        where: { nextId: user.id },
      });

      if (!uConn) return null;

      const sessionRepo = getRepository(Sessions);

      const res = await sessionRepo.findOne({
        where: { connectionId: uConn.id },
      });

      if (!res) return null;

      if (!res.authRequest) return null;

      if (minutesBetween(res.authRequest, new Date()) > 5) return null;

      return res;
    },
  },
  Mutation: {
    updateNickname: async (_parent, { nickname }, _ctx, _info) => {
      const user = _ctx.user as NextauthUsers;
      if (!user) return false;
      if (nickname.length < 4) return false;
      await dbConnect();
      const repo = getRepository(UserConnections);
      const userConn = await repo.findOne({
        where: { nextId: user.id },
      });
      if (!userConn) return false;
      userConn.name = nickname;
      await repo.save(userConn);
      return true;
    },
    updateTeam: async (_parent, _params, _ctx, _info): Promise<boolean> => {
      const user = _ctx.user as NextauthUsers;
      if (!user) return false;

      const name = _params.name;
      const colour = _params.colour;

      const teamId = user.userConnections[0]?.teamId;

      await dbConnect();

      const teamsRepo = getRepository(Teams);

      const team = await teamsRepo.findOne({
        where: { id: teamId },
      });

      team.name = name;
      team.teamColourHex = colour;

      const res = await teamsRepo.save(team);
      return !!res;
    },
    updateConsent: async (_parent, _params, _ctx, _info): Promise<boolean> => {
      const user = _ctx.user as NextauthUsers;
      if (!user) return false;

      await dbConnect();

      const userConnectionsRepo = getRepository(UserConnections);

      const userConn = await userConnectionsRepo.findOne({
        where: { nextId: user.id },
      });

      if (!userConn) return false;

      userConn.consent = new Date(Date.now());

      try {
        await userConnectionsRepo.save(userConn);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateLoginSession: async (
      _parent,
      { confirm }: { confirm: boolean },
      _ctx,
      _info
    ) => {
      const user = _ctx.user as NextauthUsers;
      if (!user) return null;

      await dbConnect();

      const uConn = await getRepository(UserConnections).findOne({
        where: { nextId: user.id },
      });

      if (!uConn) return null;

      const sessionRepo = getRepository(Sessions);

      const res = await sessionRepo.findOne({
        where: { connectionId: uConn.id },
      });

      if (!res) return false;

      try {
        if (confirm) {
          res.auth = true;
          res.updated = new Date();
          await sessionRepo.save(res);
          return true;
        }
        res.auth = false;
        res.updated = null;
        res.authRequest = null;
        await sessionRepo.save(res);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    updateFcmToken: async (
      _parent,
      { token }: { token: string },
      _ctx,
      _info
    ): Promise<boolean> => {
      const user = _ctx.user as NextauthUsers;
      if (!user) return null;

      if (token.length < 10) return false;

      await dbConnect();

      const tokensRepo = getRepository(FcmTokens);

      try {
        await tokensRepo
          .createQueryBuilder("token")
          .delete()
          .where("token.updated <= :date", {
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          })
          .execute();
      } catch (ex) {
        console.log(ex);
      }

      const tokenRef = await tokensRepo.findOne({
        where: { token },
      });

      if (!tokenRef) {
        const nToken = new FcmTokens();
        nToken.connectionId = user.userConnections[0].id;
        nToken.token = token;
        nToken.updated = new Date();
        await tokensRepo.save(nToken);
        return true;
      }

      tokenRef.connectionId = user.userConnections[0].id;
      tokenRef.updated = new Date();
      await tokensRepo.save(tokenRef);
      return true;
    },
  },
};

export default resolvers;
