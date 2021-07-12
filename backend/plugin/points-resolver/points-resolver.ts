import { NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Points } from "../../../src/db/entities/Points";
import { PointTags } from "../../../src/db/entities/PointTags";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { filterUnique } from "../../../src/utils/array-helpers";
import { dbConnect } from "../../../src/utils/db-conn";
import { IApiPluginResponse, PluginApiError, PointsError } from "../types";

interface IDataCoMiPrijdou {
  data: IPointPartial[];
}

interface IPointPartial {
  points: number;
  uuid: string;
  pointType: number;
  description: string;
  created: Date;
  pointTags?: IPointTagPartial[];
}

interface IPointTagPartial {
  key: string;
  value: string;
}

const validateUUID = (uuid: string): boolean =>
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/.test(
    uuid
  );

const resolvePoints = async (
  data: IPointPartial[],
  res: NextApiResponse<IApiPluginResponse<boolean>>
) => {
  await dbConnect();

  const ucRepo = getRepository(UserConnections);

  const uuids = data
    .filter((x) => validateUUID(x.uuid))
    .map((x) => x.uuid)
    .filter(filterUnique);

  if (uuids.length < 1) {
    res.status(400).json({ content: false, error: PointsError.NoPlayers });
    return;
  }

  const uidFilter = uuids.map((x) => {
    return { uid: x };
  });

  const ucs = await ucRepo.find({ where: [...uidFilter] });

  if (!ucs || ucs.length < 1) {
    res.status(400).json({ content: false, error: PointsError.NoPlayers });
    return;
  }

  const pointRepo = getRepository(Points);
  const pointTagsRepo = getRepository(PointTags);

  try {
    for (const uc of ucs) {
      const points = data.filter((x) => x.uuid === uc.uid);

      for (const point of points) {
        const p = new Points();
        p.userId = uc.id;
        p.points = point.points;
        p.created = new Date(point.created);
        p.pointType = point.pointType;
        p.description = point.description;

        const resPoint = await pointRepo.save(p);
        if (point.pointTags && point.pointTags.length > 0) {
          for (const pt of point.pointTags) {
            const pointTag = new PointTags();
            pointTag.key = pt.key;
            pointTag.value = pt.value;
            pointTag.pointId = resPoint.id;

            await pointTagsRepo.save(pointTag);
          }
        }
      }
    }
  } catch (err) {
    res.status(400).json({
      content: false,
      error: PluginApiError.Unknown,
      message: err?.toString(),
    });
    return;
  }
  res.status(200).json({
    content: true,
  });
};

export default resolvePoints;
