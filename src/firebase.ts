import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyBOegHueLSZT9FZd7gcLcapuuBz3peIbHs",
  authDomain: "election-process-educati-72879.firebaseapp.com",
  projectId: "election-process-educati-72879",
  storageBucket: "election-process-educati-72879.firebasestorage.app",
  messagingSenderId: "312745567413",
  appId: "1:312745567413:web:f7ff8cef4ce942f384cafc",
  measurementId: "G-7NLTMQPQTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const performance = typeof window !== 'undefined' ? getPerformance(app) : null;

export default app;
