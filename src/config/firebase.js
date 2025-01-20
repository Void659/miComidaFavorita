import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
// Pegar configuración de Firebase Console
apiKey: "AIzaSyDa7KbD96sB8mdGex-SA5fkOYRU7nHQ9Lc",
  authDomain: "micomidafavorita-5d40b.firebaseapp.com",
  projectId: "micomidafavorita-5d40b",
  storageBucket: "micomidafavorita-5d40b.firebasestorage.app",
  messagingSenderId: "270565778119",
  appId: "1:270565778119:web:42bcf30c360fbdc5b8d4e2"

};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
