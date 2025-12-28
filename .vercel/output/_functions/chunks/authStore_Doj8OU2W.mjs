import { atom } from 'nanostores';
import { a as auth } from './config_BZ9jvQ5Q.mjs';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const $currentUser = atom(null);
const $isAdmin = atom(false);

const ADMIN_EMAIL = "cristhiancg9x@gmail.com"; // <--- ¡VERIFICA QUE ESTE SEA TU CORREO!

// Escuchamos cambios en Firebase
onAuthStateChanged(auth, (user) => {
  if (user) {
    $currentUser.set(user);
    $isAdmin.set(user.email === ADMIN_EMAIL);
  } else {
    $currentUser.set(null);
    $isAdmin.set(false);
  }
});

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    if (auth.currentUser.email === ADMIN_EMAIL) {
        window.location.href = "/admin";
    } else {
        window.location.href = "/servicios";
    }
  } catch (error) {
    console.error("Error login:", error);
  }
};

// 👇 AQUÍ ESTÁ LA LIMPIEZA NUCLEAR 👇
const logout = async () => {
  try {
    console.log("☢️ Iniciando Limpieza Nuclear de Sesión...");

    // 1. Cerrar Firebase
    await signOut(auth);

    // 2. Destruir la Cookie antigua 'admin_session' (seteando fecha en el pasado)
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 3. Limpiar todo el almacenamiento local (LocalStorage y SessionStorage)
    localStorage.clear();
    sessionStorage.clear();

    // 4. Limpiar estado de NanoStores
    $currentUser.set(null);
    $isAdmin.set(false);

    console.log("✅ Todo limpio. Redirigiendo...");
    
    // 5. Redirección forzada al Login (no al home) para asegurar que salió
    window.location.href = "/login";

  } catch (error) {
    console.error("Error al salir:", error);
    // Si falla, forzamos la recarga igual
    window.location.href = "/login";
  }
};

export { loginWithGoogle as a, logout as l };
