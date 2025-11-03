import { initializeApp } from 'firebase/app'; 
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth,setPersistence, browserSessionPersistence } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

const firebaseApp = initializeApp(firebaseConfig);
const FullDataBase = getFirestore(firebaseApp);
const PostsCollection = collection(FullDataBase, 'posts'); // Assuming 'posts' is your Firestore collection name
const DescriptionCollection = collection(FullDataBase, 'description'); // Assuming 'posts' is your Firestore collection name
const auth = getAuth(firebaseApp);
setPersistence(auth, browserSessionPersistence);

export {PostsCollection,auth,DescriptionCollection};