import os
import json
import subprocess
import datetime

class AnalizadorAstro:
    def __init__(self):
        self.reporte = {
            "fecha": str(datetime.datetime.now()),
            "proyecto": {},
            "estructura": {},
            "seguridad": {},
            "rendimiento": {}
        }

    def obtener_info_proyecto(self):
        if os.path.exists("package.json"):
            with open("package.json", "r", encoding="utf-8") as f:
                data = json.load(f)
                self.reporte["proyecto"] = {
                    "nombre": data.get("name"),
                    "version": data.get("version"),
                    "scripts": list(data.get("scripts", {}).keys()),
                    "astro_version": data.get("dependencies", {}).get("astro") or data.get("devDependencies", {}).get("astro"),
                    "total_deps": len(data.get("dependencies", {})),
                    "total_dev_deps": len(data.get("devDependencies", {}))
                }

    def analizar_estructura(self):
        # Contar archivos .astro, .md, .mdx
        componentes = 0
        paginas = 0
        for root, dirs, files in os.walk("src"):
            for file in files:
                if file.endswith(".astro"):
                    if "pages" in root: paginas += 1
                    else: componentes += 1
        
        self.reporte["estructura"] = {
            "num_paginas": paginas,
            "num_componentes": componentes,
            "usa_public": os.path.exists("public"),
            "config_file": next((f for f in os.listdir(".") if "astro.config" in f), "No encontrado")
        }

    def auditoria_pnpm(self):
        try:
            # Ejecutamos audit para ver si hay problemas
            result = subprocess.run(["pnpm", "audit", "--json"], capture_output=True, text=True)
            # Intentamos parsear el JSON de pnpm audit
            try:
                audit_data = json.loads(result.stdout)
                self.reporte["seguridad"] = "Vulnerabilidades detectadas. Ver detalles."
            except:
                self.reporte["seguridad"] = "Limpio o error al auditar"
        except:
            self.reporte["seguridad"] = "pnpm no disponible"

    def generar_resumen(self):
        self.obtener_info_proyecto()
        self.analizar_estructura()
        self.auditoria_pnpm()
        
        # Guardar en un archivo para el usuario
        nombre_archivo = "resumen_para_gemini.txt"
        with open(nombre_archivo, "w", encoding="utf-8") as f:
            f.write("--- RESUMEN DE PROYECTO PARA ANALISIS ---\n")
            f.write(json.dumps(self.reporte, indent=4))
            f.write("\n--- FIN DEL REPORTE ---")
        
        print(f"\n✅ Análisis completo.")
        print(f"📄 Se ha generado el archivo: {nombre_archivo}")
        print("👉 Copia el contenido de ese archivo y pégalo aquí para que lo analice.")

if __name__ == "__main__":
    analizador = AnalizadorAstro()
    analizador.generar_resumen()