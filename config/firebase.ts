import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAH8of3wpOlZDvS6Ao5m0r9JBg4wedPo4Q",
  authDomain: "dashboard-snekers-hub.firebaseapp.com",
  projectId: "dashboard-snekers-hub",
  storageBucket: "dashboard-snekers-hub.appspot.com",
  messagingSenderId: "81046294714",
  appId: "1:81046294714:web:e1f44bc07bcc12b1813283",
  measurementId: "G-52BB3LWPHK",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.ts"
    );
  } else {
    return firebaseConfig;
  }
}
