import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';
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
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage(app);
// console.log(storage)
export { firebase,auth, db };


// import {initializeApp} from 'firebase/app';import {getAuth} from 'firebase/auth';import {initializeFirestore} from 'firebase/firestore';
// const firebaseConfig = {
//   apiKey: '',
//   authDomain: '',
//   projectId: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   appId: '',
//   measurementId: '',
// };
// Initialize Firebase 
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);


// export {auth, db};