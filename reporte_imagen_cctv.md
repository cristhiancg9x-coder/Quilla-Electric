# Reporte de Imagen: Sistemas de Videovigilancia

A solicitud del usuario, se ha analizado la imagen utilizada en la tarjeta del servicio "Sistemas de Videovigilancia (CCTV)".

## Diagnóstico
El servicio "Sistemas de Videovigilancia" utiliza la imagen:
- **Archivo**: `src/assets/camaras-seguridad.png`
- **Dimensiones Actules de la Imagen Original**: **500px x 500px** (Formato Cuadrado 1:1)

## ¿Por qué se ve "demasiado grande" o "zoomeada"?
La tarjeta de servicio tiene un contenedor de imagen que ahora hemos forzado a ser **rectangular** (aprox. ancho variable x 250px alto).

Al usar `object-fit: cover` en CSS:
1. El navegador intenta llenar todo el ancho del contenedor.
2. Como la imagen original es **cuadrada (500x500)**, para llenar el ancho de una tarjeta (que es más ancho que alto), el navegador debe **recortar** una parte significativa de la altura (arriba y abajo) o hacer "zoom" para que el ancho encaje.
3. Si la imagen original tiene el sujeto (la cámara) ocupando gran parte del encuadre, este "zoom" recorta aún más el contexto, haciendo que la cámara se vea gigante.

## Solución Recomendada
Reemplazar la imagen por una que tenga una proporción más panorámica (Landscape), por ejemplo **16:9** o similar (ej. 1200x675px), donde el objeto principal tenga suficiente "aire" alrededor.
