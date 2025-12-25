import os
import sys

# Colores para la terminal
VERDE = "\033[92m"
ROJO = "\033[91m"
RESET = "\033[0m"

REQUIRED_ENV_VARS = [
    "PUBLIC_FIREBASE_API_KEY",
    "PUBLIC_FIREBASE_PROJECT_ID",
    "PUBLIC_FIREBASE_AUTH_DOMAIN"
]

def check_env_vars():
    print(f"{VERDE}🔍 1. Analizando Variables de Entorno...{RESET}")
    missing = []
    
    # Intentamos leer .env manualmente si no están cargadas
    if os.path.exists(".env"):
        with open(".env", "r") as f:
            content = f.read()
            for var in REQUIRED_ENV_VARS:
                if var not in content:
                    missing.append(var)
    else:
        print(f"{ROJO}❌ NO EXISTE EL ARCHIVO .env{RESET}")
        return False

    if missing:
        print(f"{ROJO}❌ FALTAN VARIABLES CRÍTICAS:{RESET}")
        for m in missing:
            print(f"   - {m}")
        print("⚠️  Sin esto, Firebase fallará en Vercel.")
        return False
    
    print(f"{VERDE}✅ Variables de entorno detectadas.{RESET}")
    return True

def run_build_check():
    print(f"\n{VERDE}🏗️  2. Ejecutando Build de Prueba con PNPM...{RESET}")
    # Ejecuta el check de tipos y el build real
    result = os.system("npx astro check && pnpm build")
    
    if result == 0:
        print(f"\n{VERDE}✅ EL PROYECTO ESTÁ SANO Y LISTO PARA DESPEGAR 🚀{RESET}")
        return True
    else:
        print(f"\n{ROJO}❌ EL BUILD FALLÓ. REVISA LOS LOGS ARRIBA.{RESET}")
        return False

if __name__ == "__main__":
    print("--- 🛡️  PROTOCOLO DE SEGURIDAD QUILLA ELECTRIC 🛡️  ---\n")
    if check_env_vars():
        run_build_check()
    else:
        sys.exit(1)