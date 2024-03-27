import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDMlwynfk38c8wqKCXUeZKW7IHxQXC8faE',
  authDomain: 'cycle-unity.firebaseapp.com',
  projectId: 'cycle-unity',
  storageBucket: 'cycle-unity.appspot.com',
  messagingSenderId: '419126188543',
  appId: '1:419126188543:web:eba51429ecfdae3f296fca',
};

const fireBaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(fireBaseApp);
const firestoreDb = getFirestore(fireBaseApp);

export default firestoreDb;
