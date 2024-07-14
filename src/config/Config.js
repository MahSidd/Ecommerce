

import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJ6UMtRpsPYskKob1vD6DSZfhlBSrjS24",
    authDomain: "ecommerce-7a42d.firebaseapp.com",
    projectId: "ecommerce-7a42d",
    storageBucket: "ecommerce-7a42d.appspot.com",
    messagingSenderId: "404019659287",
    appId: "1:404019659287:web:53b84304ccd522f99ed252",
    measurementId: "G-GCV2T4TT7Z"
    
  };
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export {auth,db,storage}