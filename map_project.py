import os

# Archivos que queremos leer completos para revisar la configuración
ARCHIVOS_CLAVE = ['astro.config.mjs', 'package.json', 'tsconfig.json', 'vercel.json']
# Carpetas a ignorar
IGNORAR_DIRS = ['node_modules', '.git', '.vercel', 'dist', '.astro']

def generar_resumen():
    with open('RESUMEN_PROYECTO.txt', 'w', encoding='utf-8') as salida:
        salida.write("--- ESTRUCTURA DE DIRECTORIOS ---\n")
        
        for root, dirs, files in os.walk("."):
            # Filtrar carpetas ignoradas
            dirs[:] = [d for d in dirs if d not in IGNORAR_DIRS]
            
            level = root.replace(".", "").count(os.sep)
            indent = " " * 4 * (level)
            salida.write(f"{indent}{os.path.basename(root)}/\n")
            subindent = " " * 4 * (level + 1)
            for f in files:
                salida.write(f"{subindent}{f}\n")

        salida.write("\n\n--- CONTENIDO DE ARCHIVOS CLAVE ---\n")
        
        for archivo in ARCHIVOS_CLAVE:
            if os.path.exists(archivo):
                salida.write(f"\n=== {archivo} ===\n")
                try:
                    with open(archivo, 'r', encoding='utf-8') as f:
                        salida.write(f.read())
                except Exception as e:
                    salida.write(f"Error leyendo archivo: {e}")
            else:
                salida.write(f"\n=== {archivo} (NO ENCONTRADO) ===\n")

if __name__ == "__main__":
    generar_resumen()
    print("✅ Archivo 'RESUMEN_PROYECTO.txt' generado con éxito.")