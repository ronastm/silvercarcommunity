import Firebase from 'firebase';
let config = {
	apiKey: "AIzaSyDieN-8VDi1c5Jha_51IxTgsTMfmmHqt-g",
    authDomain: "silvercar-community.firebaseapp.com",
    databaseURL: "https://silvercar-community.firebaseio.com",
    projectId: "silvercar-community",
    storageBucket: "silvercar-community.appspot.com",
    messagingSenderId: "354997727389",
    appId: "1:354997727389:web:e59f630010fdf118e2a474"
};
let app = Firebase.initializeApp(config);
export const db = app.database();