import { NextApiResponse } from "next";
import resolveMessage, { Positivity } from "../../../src/utils/wit-client";
import { IApiPluginResponse } from "../types";

const chatResolver = async (
  message: string,
  res: NextApiResponse<IApiPluginResponse<boolean>>
) => {
  const witResult = await resolveMessage(encodeURI(message));
  if (!witResult) {
    res.status(200).json({ content: true, message: "Ahoj, Jirko, wit nic" });
    return;
  }

  const { traits, entities } = witResult;

  let positivity: Positivity = "neutral";

  if (traits.positivity?.length > 0) {
    positivity = traits.positivity[0].value;
  }

  if (
    entities["blacklist:blacklist"] &&
    entities["blacklist:blacklist"].length > 0 &&
    positivity === "negative"
  ) {
    const words = entities["blacklist:blacklist"]
      .map((x) => `${x.body} (${x.value})`)
      .join(", ");

    res.status(400).json({ content: false, message: words });
    return;
  }

  res.status(200).json({
    content: true,
    message:
      "Check prošel do konce, všechno bylo tak nějak přijatelné. OKA OKA",
  });
  return;
  //res.traits.positivity[0]?.value?.toString() ?? "";
};

export default chatResolver;
