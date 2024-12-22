import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyAPdBu4EmNdt6_dM7ilO5Dj7UBmQiYAlGo",
  authDomain: "olxclone-bf9fc.firebaseapp.com",
  projectId: "olxclone-bf9fc",
  storageBucket: "olxclone-bf9fc.firebasestorage.app",
  messagingSenderId: "716399022251",
  appId: "1:716399022251:web:4d77013852da27f61d27ee",
  measurementId: "G-NTJXCKPCXY"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db, collection, getDocs }; 
