
// Firebase config - REPLACE with your own PGW Firebase project values later
const firebaseConfig = {
  apiKey: "AIzaSyBLtz4dcljBBrfuNjJyjw6gMcMPTIvDWQE",
  authDomain: "pgw-ev.firebaseapp.com",
  projectId: "pgw-ev",
  storageBucket: "pgw-ev.firebasestorage.app",
  messagingSenderId: "717136976737",
  appId: "1:717136976737:web:858aa1cad43cb250ddc320",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
