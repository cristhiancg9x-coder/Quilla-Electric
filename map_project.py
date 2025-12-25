import os

# Archivos críticos para el diagnóstico de estilos y rutas
ARCHIVOS_CRITICOS = [
    'tailwind.config.mjs', 
    'tailwind.config.ts',
    'astro.config.mjs', 
    'src/pages/cotizador.astro',
    'src/layouts/MainLayout.astro'
]

IGNORAR_DIRS = ['node_modules', '.git', '.vercel', 'dist', '.astro']

def diagnosticar_proyecto():
    print("Generando diagnóstico de rutas y estilos...")
    with open('DIAGNOSTICO_ESTILOS.txt', 'w', encoding='utf-8') as salida:
        salida.write("--- ESTRUCTURA DE CARPETAS ACTUAL ---\n")
        
        # Mapear solo hasta nivel 4 para no saturar, pero ver modules
        for root, dirs, files in os.walk("."):
            dirs[:] = [d for d in dirs if d not in IGNORAR_DIRS]
            level = root.replace(".", "").count(os.sep)
            if level > 4: continue 
            
            indent = " " * 4 * (level)
            salida.write(f"{indent}{os.path.basename(root)}/\n")
            subindent = " " * 4 * (level + 1)
            for f in files:
                # Solo mostrar archivos relevantes (.astro, .jsx, .json, .css)
                if f.endswith(('.astro', '.jsx', '.tsx', '.js', '.mjs', '.css', '.json')):
                    salida.write(f"{subindent}{f}\n")

        salida.write("\n\n--- ARCHIVOS DE CONFIGURACIÓN (EL PROBLEMA) ---\n")
        
        for archivo in ARCHIVOS_CRITICOS:
            if os.path.exists(archivo):
                salida.write(f"\n=== CONTENIDO DE: {archivo} ===\n")
                try:
                    with open(archivo, 'r', encoding='utf-8') as f:
                        salida.write(f.read())
                except Exception as e:
                    salida.write(f"Error leyendo: {e}")
            else:
                salida.write(f"\n=== {archivo} (NO EXISTE - ESTO PUEDE SER EL ERROR) ===\n")

if __name__ == "__main__":
    diagnosticar_proyecto()
    print("✅ Archivo 'DIAGNOSTICO_ESTILOS.txt' generado.")