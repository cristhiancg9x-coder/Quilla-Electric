import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBtp5vRqrN1R3lwoinI1xz6Hdaup1OGKn4",
  authDomain: "quilla-electric-platform.firebaseapp.com",
  projectId: "quilla-electric-platform",
  storageBucket: "quilla-electric-platform.firebasestorage.app",
  messagingSenderId: "777764083566",
  appId: "1:777764083566:web:ad309f4fa8a25d66f4937f"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth as a, db as d };
