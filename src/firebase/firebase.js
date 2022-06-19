import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiDoWmKufta5QdmcdB5DuM795GF3arMpk",
  authDomain: "qorina-pbf-uas.firebaseapp.com",
  projectId: "qorina-pbf-uas",
  storageBucket: "qorina-pbf-uas.appspot.com",
  messagingSenderId: "148005329284",
  appId: "1:148005329284:web:9aaa3a9000ef3888f525d1",
  measurementId: "G-CXK2PE4H7X",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp); // For Authentication
const db = getFirestore(firebaseApp); // For Using Database

export { auth, db };
