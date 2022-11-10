import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const app = initializeApp({ 

    apiKey: "AIzaSyBsDZnsVq5pCmqPxYl2mxdiBvrwtbROgNk",
    authDomain: "uploadfiles-4db5b.firebaseapp.com",
    projectId: "uploadfiles-4db5b",
    storageBucket: "uploadfiles-4db5b.appspot.com",
    messagingSenderId: "462911745166",
    appId: "1:462911745166:web:3df4eabd92a4e61b5e2ddf"

});

export const storage = getStorage(app);
