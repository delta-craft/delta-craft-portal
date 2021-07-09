import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Providers from "next-auth/providers";
import { getRepository } from "typeorm";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { dbConnect } from "../../../src/utils/db-conn";

const auth = NextAuth({
  debug: false,
  //session: { jwt: true },
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  database: {
    type: "mysql",
    host: process.env.DB_ADDRESS,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entityPrefix: "nextauth_",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async (session, user: JWT) => {
      await dbConnect();
      const repo = getRepository(UserConnections);

      if (!user.id) return session;

      try {
        const res = await repo.findOneOrFail({
          where: { nextId: user.id },
          relations: ["team"],
        });
        if (!res) return session;

        session.links = res;

        return session;
      } catch (err) {
        repo.insert({ nextId: user.id as any, consent: new Date(2020, 1, 1) });
      }
    },
    // jwt: async (token, user, account, profile, isNewUser) => {
    //   // Add access_token to the token right after signin
    //   if (account?.accessToken) {
    //     token.accessToken = account.accessToken;
    //   }
    //   return token;
    // },
  },
});

export default auth;
