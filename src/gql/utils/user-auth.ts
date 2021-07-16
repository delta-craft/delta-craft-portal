import { getRepository } from "typeorm";
import { NextauthSessions } from "../../db/entities/NextauthSessions";
import { NextauthUsers } from "../../db/entities/NextauthUsers";
import { UserConnections } from "../../db/entities/UserConnections";
import { dbConnect } from "../../utils/db-conn";

export const verifyToken = async (token: string): Promise<NextauthUsers> => {
  if (token.includes("Bearer ")) token = token.replace("Bearer ", "");

  await dbConnect();

  if (token.startsWith("Mobile ")) {
    const mobileToken = token.replace("Mobile ", "");
    const uc = await getRepository(UserConnections).findOne({
      where: { mobileToken },
    });
    if (!uc) return null;

    const res2 = await getRepository(NextauthUsers).findOne({
      where: { id: uc.nextId },
      relations: ["userConnections"],
    });

    return res2;
  }

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
