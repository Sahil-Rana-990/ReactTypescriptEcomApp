import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDyqghlzMQoSWr7Ggemaj5Uv4fZ8amekTA",
  authDomain: "react-ecom-signup.firebaseapp.com",
  projectId: "react-ecom-signup",
  storageBucket: "react-ecom-signup.appspot.com",
  messagingSenderId: "753303429661",
  appId: "1:753303429661:web:d51b41151c2013f3a9dcf4",
  databaseURL:"https://react-ecom-signup-default-rtdb.firebaseio.com"
};

export const app=initializeApp(firebaseConfig)
