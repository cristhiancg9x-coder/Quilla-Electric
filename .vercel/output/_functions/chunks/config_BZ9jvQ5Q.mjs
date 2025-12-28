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
if (typeof process !== "undefined") {
  console.log("🔥 [FIREBASE CHECK] Intentando iniciar...");
  console.log("🔥 [FIREBASE CHECK] API Key existe?", firebaseConfig.apiKey ? "SÍ" : "NO (ES NULL/UNDEFINED)");
  console.log("🔥 [FIREBASE CHECK] Project ID:", firebaseConfig.projectId);
}
let app;
let db;
let auth;
try {
  if (!firebaseConfig.apiKey) {
    throw new Error("Falta la PUBLIC_FIREBASE_API_KEY en las variables de entorno.");
  }
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log("✅ [FIREBASE] Inicializado correctamente.");
} catch (error) {
  console.error("❌ [FIREBASE ERROR FATAL]:", error);
}

export { auth as a, db as d };
