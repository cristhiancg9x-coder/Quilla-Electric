import os
import fnmatch

# ==========================================
# ⚙️ CONFIGURACIÓN DEL ESCÁNER PARA ASTRO
# ==========================================

OUTPUT_FILE = "CONTEXTO_ASTRO_FULL.txt"

# Carpetas a IGNORAR (Ruido y compilación)
IGNORE_DIRS = {
    'node_modules', '.git', '.firebase', 'dist', 'build', 
    'coverage', '__pycache__', '.vscode', '.idea',
    '.astro',       # Tipos generados por Astro (Ruido)
    '.vercel',      # Output de Vercel (Ruido)
    '.netlify',     # Output de Netlify
    'public'        # Assets estáticos (Imágenes, fuentes) no se leen, solo se listan
}

# Archivos a IGNORAR
IGNORE_FILES = {
    'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', '.DS_Store', 
    'logo.svg', 'favicon.ico', 'README.md', 'LICENSE',
    'analizar_astro.py', OUTPUT_FILE # No leerse a sí mismo
}

# Extensiones que SÍ queremos leer (El ADN de Astro + React + TS)
INCLUDE_EXTS = {
    # Lógica y Componentes
    '.astro', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue', '.svelte',
    # Estilos
    '.css', '.scss', '.sass', '.less',
    # Datos y Configuración
    '.json', '.yaml', '.yml', '.toml', '.xml',
    # Contenido
    '.md', '.mdx', '.html'
}

# Archivos PRIORITARIOS (La IA debe leerlos primero para entender el stack)
PRIORITY_FILES = [
    'astro.config.mjs', 'astro.config.ts',
    'tailwind.config.mjs', 'tailwind.config.js',
    'tsconfig.json', 'package.json',
    'src/env.d.ts'
]

# ==========================================
# 🛠️ FUNCIONES
# ==========================================

def get_file_size(path):
    """Devuelve el peso formateado."""
    try:
        size = os.path.getsize(path) / 1024
        return f"{size:.1f} KB"
    except:
        return "? KB"

def is_ignored(path, name, is_dir=False):
    """Verifica si un archivo o carpeta debe ser ignorado."""
    if is_dir:
        return name in IGNORE_DIRS
    if name in IGNORE_FILES:
        return True
    # Ignorar archivos que empiezan con punto (excepto configs clave como .env si quisieras)
    if name.startswith('.') and name not in ['.env', '.env.local', '.prettierrc']:
        return True
    return False

def generate_tree(startpath):
    """Genera un mapa visual del árbol de directorios."""
    tree_str = "🌳 ESTRUCTURA DEL PROYECTO:\n"
    for root, dirs, files in os.walk(startpath):
        # Modificar dirs in-place para evitar recorrer carpetas ignoradas
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = '│   ' * level
        folder_name = os.path.basename(root)
        if folder_name == '.': folder_name = os.path.basename(os.getcwd())
        
        tree_str += f"{indent}📁 {folder_name}/\n"
        
        subindent = '│   ' * (level + 1)
        for f in files:
            if not is_ignored(os.path.join(root, f), f):
                tree_str += f"{subindent}{f}\n"
    return tree_str

def read_files(startpath):
    """Lee el contenido, priorizando configs y filtrando por extensión."""
    content_str = ""
    total_chars = 0
    file_count = 0
    
    files_to_process = []

    # 1. Recolectar todos los archivos válidos
    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            if is_ignored(os.path.join(root, file), file):
                continue
                
            ext = os.path.splitext(file)[1].lower()
            if ext in INCLUDE_EXTS:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, startpath)
                # Normalizar path para comparar con prioridad (uso de /)
                rel_path_unix = rel_path.replace(os.sep, '/')
                files_to_process.append((full_path, rel_path_unix))

    # 2. Ordenar: Primero Prioritarios, luego Alfabético
    def sort_key(item):
        path = item[1]
        if path in PRIORITY_FILES:
            return (0, path) # Prioridad máxima
        return (1, path)     # Resto alfabético

    files_to_process.sort(key=sort_key)

    # 3. Leer contenido
    content_str += "\n" + "="*50 + "\n"
    content_str += "📦 CONTENIDO DEL CÓDIGO FUENTE\n"
    content_str += "="*50 + "\n"

    for full_path, rel_path in files_to_process:
        try:
            with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
                # Header del archivo
                content_str += f"\n\n--- 📄 INICIO: {rel_path} ---\n"
                content_str += content
                content_str += f"\n--- FIN: {rel_path} ---\n"
                
                total_chars += len(content)
                file_count += 1
                print(f"✅ Leído: {rel_path}")
        except Exception as e:
            print(f"❌ Error leyendo {rel_path}: {e}")

    return content_str, file_count, total_chars

# ==========================================
# 🚀 EJECUCIÓN
# ==========================================
def main():
    print("🤖 ANALIZANDO PROYECTO ASTRO/TYPESCRIPT...")
    cwd = os.getcwd()
    
    # 1. Generar Árbol
    tree = generate_tree(cwd)
    
    # 2. Leer Código
    content, count, chars = read_files(cwd)
    
    # 3. Ensamblar Reporte
    final_output = f"""CONTEXTO DEL PROYECTO: {os.path.basename(cwd)}
Generado por: analizar_astro.py
Fecha: {os.path.basename(cwd)}

ESTADÍSTICAS:
- Archivos leídos: {count}
- Caracteres aprox: {chars}
- Tokens estimados: ~{int(chars / 4)} (Verifica el límite de tu IA)

{tree}
{content}
"""
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(final_output)
    
    print("\n" + "="*50)
    print(f"🚀 ¡PROCESO COMPLETADO!")
    print(f"📂 Archivo generado: {OUTPUT_FILE}")
    print(f"📊 Tokens estimados: ~{int(chars / 4)}")
    print("👉 Sube este archivo al chat para continuar con el rediseño.")
    print("="*50)

if __name__ == "__main__":
    main()