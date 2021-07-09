import { getRepository } from "typeorm";
import { Consents } from "../../../src/db/entities/Consents";
import { NextauthUsers } from "../../../src/db/entities/NextauthUsers";
import { Teams } from "../../../src/db/entities/Teams";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { PointType } from "../../../src/models/enums";
import { IPointSummary } from "../../../src/models/types";
import { dbConnect } from "../../../src/utils/db-conn";
import { calculateRatios } from "../../../src/utils/point-ratio";
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
      const repo = getRepository(UserConnections);

      const userConn = await repo.findOne({
        where: { id },
        relations: ["points", "points.pointTags"],
      });
      if (!userConn) return null;

      const { points } = userConn;

      let mining = 0;
      let crafting = 0;
      let warfare = 0;
      let journey = 0;

      points.forEach((element) => {
        if (element.pointType === PointType.Mining) mining += element.points;
        if (element.pointType === PointType.Crafting)
          crafting += element.points;
        if (element.pointType === PointType.Warfare) warfare += element.points;
        if (element.pointType === PointType.Journey) journey += element.points;
      });

      const summary: IPointSummary = {
        mining,
        crafting,
        warfare,
        journey,
      };

      const ratios = calculateRatios(summary);

      return { summary, ratios };
    },
    getTeamPointSummary: async (
      _parent,
      { id },
      _ctx,
      _info
    ): Promise<{ summary: IPointSummary; ratios: IPointSummary }> => {
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

      let mining = 0;
      let crafting = 0;
      let warfare = 0;
      let journey = 0;

      const { userConnections } = teams;

      userConnections.forEach((uConn) => {
        uConn.points.forEach((element) => {
          if (element.pointType === PointType.Mining) mining += element.points;
          if (element.pointType === PointType.Crafting)
            crafting += element.points;
          if (element.pointType === PointType.Warfare)
            warfare += element.points;
          if (element.pointType === PointType.Journey)
            journey += element.points;
        });
      });

      const summary: IPointSummary = {
        mining,
        crafting,
        warfare,
        journey,
      };

      const ratios = calculateRatios(summary);

      return { summary, ratios };
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
  },
};

export default resolvers;
