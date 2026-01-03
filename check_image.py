
import os
from PIL import Image

image_path = r"c:\PROYECTOS\quilla-astro\src\assets\camaras-seguridad.png"

try:
    with Image.open(image_path) as img:
        width, height = img.size
        print(f"Dimensions: {width}x{height}")
        print(f"Format: {img.format}")
        print(f"Mode: {img.mode}")
        
except Exception as e:
    print(f"Error: {e}")
