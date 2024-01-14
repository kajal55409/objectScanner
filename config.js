import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvlgy3DUfNZIDf0geeypzfnH4m446oTv0",
  authDomain: "objectscanner-5854a.firebaseapp.com",
  databaseURL: "https://objectscanner-5854a-default-rtdb.firebaseio.com",
  projectId: "objectscanner-5854a",
  storageBucket: "objectscanner-5854a.appspot.com",
  messagingSenderId: "839826333179",
  appId: "1:839826333179:web:636f319cac4beef7017f5e",
  measurementId: "G-80CT55JXHF",
};

let app;
if (!firebase.apps.length) { 
app = 
  firebase.initializeApp(firebaseConfig);
}
export const storage = getStorage(app);
// console.log(storage)
export { firebase };
