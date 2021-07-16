import axios from "axios";

interface IToCoMiVraci {
  multicast_id: number;
  success: number;
  failure: number;
  canonical_ids: number;
  results: { message_id: string }[];
}

export const newLoginNotification = async (tokens: string[]) => {
  for (const token of tokens) {
    const notification = {
      to: token,
      notification: {
        title: "Nová žádost o přihlášení",
        body: "Potvrďte žádost v portalu",
        type: "login-request",
      },
      webpush: {
        fcm_options: {
          link: "/login",
        },
      },
    };

    const result = await axios.post<IToCoMiVraci>(
      "https://fcm.googleapis.com/fcm/send",
      notification,
      {
        headers: {
          Authorization: `key=${process.env.FIREBASE_POSILACI_KEY}`,
          ContentType: "application/json",
        },
      }
    );
  }
};
