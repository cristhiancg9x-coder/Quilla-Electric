import os
from PIL import Image

def optimize_images(input_dir, output_dir, quality=80):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    print(f"--- Iniciando optimizacion Quilla Electric en: {input_dir} ---")
    
    for filename in os.listdir(input_dir):
        # We only process JPG, PNG, JPEG. SVG is kept as as.
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(input_dir, filename)
            
            # Change extension to .webp
            name = os.path.splitext(filename)[0]
            output_path = os.path.join(output_dir, f"{name}.webp")
            
            try:
                with Image.open(input_path) as img:
                    # Convert RGBA to RGB for JPEG-like behaviors if needed, 
                    # but WebP supports alpha so it's fine.
                    img.save(output_path, "WEBP", quality=quality, method=6)
                
                original_size = os.path.getsize(input_path) / 1024
                optimized_size = os.path.getsize(output_path) / 1024
                
                print(f"[OK] {filename} -> {name}.webp")
                print(f"   Reduccion: {original_size:.1f}KB -> {optimized_size:.1f}KB ({((original_size-optimized_size)/original_size)*100:.1f}%)")
            
            except Exception as e:
                print(f"[ERROR] Error procesando {filename}: {e}")
        elif filename.lower().endswith('.svg'):
            # Just copy SVG
            import shutil
            shutil.copy2(os.path.join(input_dir, filename), os.path.join(output_dir, filename))
            print(f"[OK] {filename} (Copiado sin cambios)")

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    INPUT_FOLDER = os.path.join(BASE_DIR, "raw_assets")
    OUTPUT_FOLDER = os.path.join(BASE_DIR, "img")
    
    if not os.path.exists(INPUT_FOLDER) or not os.listdir(INPUT_FOLDER):
        print(f"La carpeta '{INPUT_FOLDER}' esta vacia.")
    else:
        optimize_images(INPUT_FOLDER, OUTPUT_FOLDER)
