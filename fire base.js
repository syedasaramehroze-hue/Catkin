// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "YOUR-KEY-HERE",
  authDomain: "YOUR-DOMAIN",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-BUCKET",
  messagingSenderId: "YOUR-ID",
  appId: "YOUR-APP-ID"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
