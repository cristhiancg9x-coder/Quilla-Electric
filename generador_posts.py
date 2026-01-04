import os
import frontmatter # Librería para leer los .md con yaml
import json

# RUTA DE TUS SERVICIOS (Ajusta esto según tu estructura real)
# Si el script está en la raíz del proyecto:
DIRECTORIO_SERVICIOS = './src/content/servicios' 

def extraer_y_generar_prompts():
    if not os.path.exists(DIRECTORIO_SERVICIOS):
        print(f"❌ Error: No encuentro la carpeta {DIRECTORIO_SERVICIOS}")
        return

    servicios_data = []

    # 1. Leer los archivos
    for filename in os.listdir(DIRECTORIO_SERVICIOS):
        if filename.endswith(".md") or filename.endswith(".mdx"):
            filepath = os.path.join(DIRECTORIO_SERVICIOS, filename)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
                
                # Extraemos info del Frontmatter y del Contenido
                servicio = {
                    "titulo": post.metadata.get('title', 'Sin título'),
                    "descripcion_corta": post.metadata.get('description', ''),
                    "precio": post.metadata.get('price', 'A cotizar'),
                    "imagen": post.metadata.get('image', ''),
                    "contenido_detallado": post.content # El cuerpo del markdown
                }
                servicios_data.append(servicio)

    # 2. Generar el Prompt Maestro
    # Esto crea un texto que tú pegarás en ChatGPT/Gemini para que escriba por ti.
    
    print("✅ Servicios extraídos. Generando archivo de prompts...")
    
    with open('SALIDA_PARA_REDES.txt', 'w', encoding='utf-8') as f:
        f.write("ACTÚA COMO UN EXPERTO COPYWRITER Y SEO. AQUÍ TIENES MIS SERVICIOS:\n")
        f.write("==================================================\n\n")
        
        for s in servicios_data:
            f.write(f"--- SERVICIO: {s['titulo']} ---\n")
            f.write(f"Data Base: {json.dumps(s, ensure_ascii=False)}\n\n")
            
            f.write("TAREA PARA LA IA (Instrucciones):\n")
            f.write("1. Crea un POST DE FACEBOOK (Feed): Usa emojis, estructura problema-agitación-solución. Incluye CTA al WhatsApp.\n")
            f.write("2. Crea una DESCRIPCIÓN PARA MARKETPLACE: Enfocada en keywords, características técnicas (bullets), ubicación y precio.\n")
            f.write("3. Sugiere 5 HASHTAGS virales para el nicho.\n")
            f.write("--------------------------------------------------\n\n")

    print(f"🎉 ¡Listo! Abre el archivo 'SALIDA_PARA_REDES.txt' y copia su contenido en tu chat de IA.")

if __name__ == "__main__":
    extraer_y_generar_prompts()