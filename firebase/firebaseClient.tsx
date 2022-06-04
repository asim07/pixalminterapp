import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const bucket = "gs://pixeltrue-nft.appspot.com";

const firebaseConfig = {
  apiKey: process.env.FIREB_API_KEY,
  authDomain: process.env.FIREB_AUTH_DOMAIN,
  projectId: process.env.FIREB_PROJECT_ID,
  storageBucket: process.env.FIREB_STORAGE_BUCKET || bucket,
  messagingSenderId: process.env.FIREB_MESSAGING_SENDER_ID,
  appId: process.env.FIREB_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const storage = firebase
  .app()
  .storage(process.env.FIREB_STORAGE_BUCKET || bucket);

export default firebase;
