/* eslint-disable import/no-anonymous-default-export */
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { FirebaseMessaging, getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyABpgtp0DHY2XabJkq_c9gwQi2WV_TStGQ",
  authDomain: "delta-craft.firebaseapp.com",
  projectId: "delta-craft",
  storageBucket: "delta-craft.appspot.com",
  messagingSenderId: "533973956878",
  appId: "1:533973956878:web:b8a6a199e1f7d473febf5f",
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
