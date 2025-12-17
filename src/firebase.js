// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2eEA-eMBfwKl2xuynfu6lQameWR1xHGo",
  authDomain: "ai-ppt-auth.firebaseapp.com",
  projectId: "ai-ppt-auth",
  storageBucket: "ai-ppt-auth.firebasestorage.app",
  messagingSenderId: "254100468080",
  appId: "1:254100468080:web:01e38075290ce994ba5fb5",
  measurementId: "G-WH8F2E80Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);