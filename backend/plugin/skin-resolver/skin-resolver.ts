import axios from "axios";
import { NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { dbConnect } from "../../../src/utils/db-conn";

const isLocal = process.env.NODE_ENV === "development";

export const resolveSkin = async (uuid: string, res: NextApiResponse) => {
  await dbConnect();

  const ucRepo = getRepository(UserConnections);

  const r = await ucRepo.findOne({ where: { uid: uuid } });
  try {
    if (!r) {
      const img = await axios.get<ArrayBuffer>(
        "https://minotar.net/skin/MHF_Steve",
        {
          responseType: "arraybuffer",
        }
      );

      res.setHeader("Content-Type", "image/png");
      res.statusCode = 200;
      if (!isLocal)
        res.setHeader(
          "Cache-Control",
          `public, immutable, no-transform, s-maxage=3600, max-age=3600`
        );
      res.end(img.data);
      return;
    }

    const nick = r.name;

    const img = await axios.get<ArrayBuffer>(
      `https://minotar.net/skin/${nick}`,
      {
        responseType: "arraybuffer",
      }
    );

    res.setHeader("Content-Type", "image/png");
    res.statusCode = 200;
    if (!isLocal)
      res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=3600, max-age=3600`
      );
    res.end(img.data);
    return;
  } catch (ex) {
    console.log(ex);
    res.status(400).end();
    return;
  }
};
