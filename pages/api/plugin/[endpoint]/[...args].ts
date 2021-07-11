import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, query } = req;

  res.status(200).json({ url, query });
};

export default handler;
