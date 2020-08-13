import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCyKYHYZbzu_DYRW-pb3RAukzQob-3qCVw",
  authDomain: "silvercar-community.firebaseapp.com",
  databaseURL: "https://silvercar-community.firebaseio.com",
  projectId: "silvercar-community",
  storageBucket: "silvercar-community.appspot.com",
  messagingSenderId: "354997727389",
  appId: "1:354997727389:android:3d344b067d5052fee2a474"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;