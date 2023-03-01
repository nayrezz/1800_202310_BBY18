//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDLqGUCzoT2XIDO--tG5-fdcpG1Jv8defk",
    authDomain: "blockbuddy-8a16d.firebaseapp.com",
    projectId: "blockbuddy-8a16d",
    storageBucket: "blockbuddy-8a16d.appspot.com",
    messagingSenderId: "66868852941",
    appId: "1:66868852941:web:96fa3d3f056d9df61b9184",
    measurementId: "G-YMSJCL5V9K"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();