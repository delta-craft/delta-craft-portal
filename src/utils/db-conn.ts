import { createConnection, getConnection } from "typeorm";
import { Consents } from "../db/entities/Consents";
import { NextauthAccounts } from "../db/entities/NextauthAccounts";
import { NextauthSessions } from "../db/entities/NextauthSessions";
import { NextauthUsers } from "../db/entities/NextauthUsers";
import { NextauthVerificationRequests } from "../db/entities/NextauthVerificationRequests";
import { Points } from "../db/entities/Points";
import { PointTags } from "../db/entities/PointTags";
import { Teams } from "../db/entities/Teams";
import { UserConnections } from "../db/entities/UserConnections";

let connectionReadyPromise: Promise<void> | null = null;

export const dbConnect = async () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      await createConnection({
        type: "mariadb",
        host: process.env.DB_ADDRESS,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          NextauthAccounts,
          NextauthSessions,
          NextauthUsers,
          NextauthVerificationRequests,
          Teams,
          UserConnections,
          Points,
          PointTags,
          Consents,
        ],
      });
    })();
  }

  return connectionReadyPromise;
};
