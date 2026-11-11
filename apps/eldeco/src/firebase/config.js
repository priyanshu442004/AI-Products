import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyBpYEMNlNaNLBZYHqVbU2boaVh2CfwZEuU",
  authDomain: "finsight-78ad1.firebaseapp.com",
  projectId: "finsight-78ad1",
  storageBucket: "finsight-78ad1.firebasestorage.app",
  messagingSenderId: "877048953120",
  appId: "1:877048953120:web:9749d9d01dd7c1bed17f45",
  measurementId: "G-2E7GC7T7EC"
};

let app;
try {
  app = getApp();
} catch {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export default app;
