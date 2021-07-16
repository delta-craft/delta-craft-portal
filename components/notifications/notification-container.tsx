import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import { getToken, onMessage } from "firebase/messaging";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { initFirebase, messaging } from "../../src/firebase/fb";
import { updateFcmTokenMutation } from "../../src/gql/client/mutations";
import {
  UpdateFcmToken,
  UpdateFcmTokenVariables,
} from "../../src/gql/client/types/UpdateFcmToken";
import { useAppContext } from "../../src/hooks";

const NotificationContainer: React.FC = ({ children }) => {
  const [updateFcm] = useMutation<UpdateFcmToken, UpdateFcmTokenVariables>(
    updateFcmTokenMutation
  );

  const { session } = useAppContext();

  const initNotifications = async () => {
    try {
      initFirebase();

      const token = await getToken(messaging, {
        vapidKey: process.env.VAPID,
      });

      if (token) {
        const res = await updateFcm({ variables: { token } });

        const { data, errors } = res;
        if (errors || !data || !data.updateFcmToken) {
          toast.error("Chyba při registraci notifikací");
        }
        if (data.updateFcmToken) {
          initHandlers();
        }
      } else {
        console.log("Failed to receive FCM token");
      }
    } catch (err) {
      console.log("Notifications init error", err);
    }
  };

  const initHandlers = () => {
    onMessage(messaging, (payload) => {
      if (payload.data?.["gcm.notification.type"] === "login-request") {
        toast(
          (t) => (
            <div>
              Nová žádost o přihlášení{" "}
              <Link href="/login" passHref>
                <Button>Zobrazit</Button>
              </Link>
            </div>
          ),
          { duration: 10000 }
        );
      }
    });
  };

  const regServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }
  };

  useEffect(() => {
    if (session) {
      initNotifications();
      regServiceWorker();
      if (window) window.addEventListener("load", regServiceWorker);
      return () => {
        if (window) {
          window.removeEventListener("load", regServiceWorker);
        }
      };
    }
  }, [session]);

  return <>{children}</>;
};

export default NotificationContainer;
