import { getRepository } from "typeorm";
import { NextauthSessions } from "../../db/entities/NextauthSessions";
import { NextauthUsers } from "../../db/entities/NextauthUsers";
import { dbConnect } from "../../utils/db-conn";

export const verifyToken = async (token: string): Promise<NextauthUsers> => {
  if (token.includes("Bearer ")) token = token.replace("Bearer ", "");

  await dbConnect();

  const res1 = await getRepository(NextauthSessions).findOne({
    where: { accessToken: token },
  });

  if (!res1) return null;

  const { userId } = res1;

  const res2 = await getRepository(NextauthUsers).findOne({
    where: { id: userId },
    relations: ["userConnections"],
  });

  if (!res2) return null;

  return res2;
};
