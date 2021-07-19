import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { FirebaseMessaging, getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

let firebaseApp: FirebaseApp;
let messaging: FirebaseMessaging;

const initFirebase = () => {
  const apps = getApps();
  if (apps.length > 0) {
    return;
  }

  firebaseApp = initializeApp(firebaseConfig);
  messaging = getMessaging(firebaseApp);
};

export { initFirebase, firebaseApp, messaging };
