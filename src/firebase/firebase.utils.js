import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBRK-r3QqkjSODTWU6734Tyf6HeO6JLBfc",
  authDomain: "crwn-db-d1f6e.firebaseapp.com",
  databaseURL: "https://crwn-db-d1f6e.firebaseio.com",
  projectId: "crwn-db-d1f6e",
  storageBucket: "crwn-db-d1f6e.appspot.com",
  messagingSenderId: "466296666236",
  appId: "1:466296666236:web:d3dbc748e22f9da8def1f9",
  measurementId: "G-VZM0REXV5L"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName: displayName,
        email: email,
        createdAt: createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;