// src/lib/firebase/config.ts
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// 1. Definimos la config (Tipamos las variables de entorno como strings)
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID as string
};

// 🔍 DIAGNÓSTICO (Esto saldrá en los Logs de Vercel)
if (typeof process !== "undefined") { // Solo logs en el servidor
    console.log("🔥 [FIREBASE CHECK] Intentando iniciar...");
    console.log("🔥 [FIREBASE CHECK] API Key existe?", firebaseConfig.apiKey ? "SÍ" : "NO (ES NULL/UNDEFINED)");
    console.log("🔥 [FIREBASE CHECK] Project ID:", firebaseConfig.projectId);
}

// 2. Inicializamos con protección Y TIPOS
// 👇 AQUÍ ESTÁ EL CAMBIO IMPORTANTE: Definimos qué "forma" tienen las variables
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  // Si falta la API Key, lanzamos error manual antes de que Firebase explote
  if (!firebaseConfig.apiKey) {
      throw new Error("Falta la PUBLIC_FIREBASE_API_KEY en las variables de entorno.");
  }

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log("✅ [FIREBASE] Inicializado correctamente.");

} catch (error) {
  console.error("❌ [FIREBASE ERROR FATAL]:", error);
  // Si falla, las variables quedarán undefined, pero TS ya sabe su tipo potencial
}

// Exportamos usando el operador '!' (Non-null assertion) si TypeScript se pone muy estricto,
// o simplemente así. Al definir los tipos arriba, los errores 7034/7005 desaparecerán.
export { db, auth };