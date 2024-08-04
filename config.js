import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDIpQUdg8fjc8EmM-BrGNmMvbf1jKhj4o",
  authDomain: "fir-crud-6ef68.firebaseapp.com",
  projectId: "fir-crud-6ef68",
  storageBucket: "fir-crud-6ef68.appspot.com",
  messagingSenderId: "665772651661",
  appId: "1:665772651661:web:c3b1df781c68f2f62f9ec4",
  measurementId: "G-3951NVBS40"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);