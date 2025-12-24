// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 1. Definimos la config
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
};

// 🔍 DIAGNÓSTICO (Esto saldrá en los Logs de Vercel)
// No imprimimos la clave completa por seguridad, solo si existe o no.
if (typeof process !== "undefined") { // Solo logs en el servidor
    console.log("🔥 [FIREBASE CHECK] Intentando iniciar...");
    console.log("🔥 [FIREBASE CHECK] API Key existe?", firebaseConfig.apiKey ? "SÍ" : "NO (ES NULL/UNDEFINED)");
    console.log("🔥 [FIREBASE CHECK] Project ID:", firebaseConfig.projectId);
}

// 2. Inicializamos con protección
let app;
let db;
let auth;

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
  // No exportamos nada roto para evitar el crash total, pero la DB no funcionará
}

// Exportamos
export { db, auth };