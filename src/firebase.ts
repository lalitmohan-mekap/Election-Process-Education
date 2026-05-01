import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Replace with your app's Firebase project configuration
// To get these values, go to your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForDemoPurposes12345",
  authDomain: "election-process-edu-demo.firebaseapp.com",
  projectId: "election-process-edu-demo",
  storageBucket: "election-process-edu-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-ABCDEF1234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional, uncomment if you want to use it)
// const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
