import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDyTQmugtLdJLY8GRA7tucDFuxx3Dw5_uA",
  authDomain: "graduation-thesis-8ffb0.firebaseapp.com",
  databaseURL: "https://graduation-thesis-8ffb0-default-rtdb.firebaseio.com",
  projectId: "graduation-thesis-8ffb0",
  storageBucket: "graduation-thesis-8ffb0.appspot.com",
  messagingSenderId: "820360035086",
  appId: "1:820360035086:web:b58ff5ab0f99772ff1355f"
};

let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = app.auth();
const database = app.database();

export { auth, database };