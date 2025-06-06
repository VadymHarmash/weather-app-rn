import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeUC84SXQEj84Yjdf54S8sCWvMtmVwJHQ",
  authDomain: "weather-app-rn-auth.firebaseapp.com",
  projectId: "weather-app-rn-auth",
  storageBucket: "weather-app-rn-auth.firebasestorage.app",
  messagingSenderId: "564904604208",
  appId: "1:564904604208:web:5e9d208d8d0696b175f3f5",
};

const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_STORAGE = getStorage(FIREBASE_APP);
