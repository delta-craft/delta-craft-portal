import axios from "axios";

export interface IWitResponse {
  text: string;
  intents: IIntent[];
  entities: { "blacklist:blacklist"?: IEntity<Blacklist>[] };
  traits: { positivity?: IPositivity[] };
}

interface IPositivity {
  confidence: number;
  id: string;
  value?: Positivity;
}

export type Positivity = "negative" | "positive" | "neutral";

export type Blacklist = "racism" | "homophobia" | "profanity";

interface IEntity<T> {
  id: string;
  name: string;
  body: string;
  confidence: number;
  value: T;
}

interface IIntent {
  id: string;
  name: IntentName;
  confidence: number;
}

type IntentName = "chat";

const resolveMessage = async (text: string): Promise<IWitResponse> => {
  if (!text || text.length < 1) return;

  const res = await axios.get<IWitResponse>(
    `https://api.wit.ai/message?q=${text}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_WIT_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200 || !res.data) return null;

  const data = res.data;

  return data;
};

export default resolveMessage;
