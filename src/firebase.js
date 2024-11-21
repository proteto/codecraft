import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyB2DJoeDMkKsSruYNLOxa6BP5FPIJAB5u0",
  authDomain: "codecraft-a6328.firebaseapp.com",
  databaseURL: "https://codecraft-a6328-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codecraft-a6328",
  storageBucket: "codecraft-a6328.firebasestorage.app",
  messagingSenderId: "12569324401",
  appId: "1:12569324401:web:41bb0717837a20d13824d0",
  measurementId: "G-9Q4MRVGCT5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);