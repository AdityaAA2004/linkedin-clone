import { initializeApp } from 'firebase/app'; 
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth,setPersistence, browserSessionPersistence } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAG7xEpQmOZ73LlvFArxDt-SOeMP7RcVsQ",
    authDomain: "linkedin-clone-693dd.firebaseapp.com",
    projectId: "linkedin-clone-693dd",
    storageBucket: "linkedin-clone-693dd.appspot.com",
    messagingSenderId: "111168076355",
    appId: "1:111168076355:web:b8515ea716a757fc5532f6"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const FullDataBase = getFirestore(firebaseApp);
  const PostsCollection = collection(FullDataBase, 'posts'); // Assuming 'posts' is your Firestore collection name
  const DescriptionCollection = collection(FullDataBase, 'description'); // Assuming 'posts' is your Firestore collection name
  const auth = getAuth(firebaseApp);
  setPersistence(auth, browserSessionPersistence);

  export {PostsCollection,auth,DescriptionCollection};