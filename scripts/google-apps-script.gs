/**
 * Google Apps Script para guardar clientes de Quilla Electric en Google Sheets.
 *
 * Pasos de instalación (1 sola vez):
 * 1. Crea una hoja en Google Sheets (ej. "Clientes Quilla Electric").
 * 2. Menú: Extensiones -> Apps Script.
 * 3. Borra el código de ejemplo y pega este archivo completo.
 * 4. Clic en "Implementar" -> "Nueva implementación" -> Tipo: "Aplicación web".
 *    - Ejecutar como: "Yo" (tu cuenta de Google).
 *    - Quién tiene acceso: "Cualquier persona".
 * 5. Copia la URL /exec generada y pégala en GOOGLE_SCRIPT_URL dentro de app.js.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha y Hora (Perú)",
        "Nombre",
        "Celular",
        "Distrito",
        "Servicio",
        "Detalle",
        "Origen"
      ]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
    }

    var fechaPeru = Utilities.formatDate(
      new Date(),
      "America/Lima",
      "dd/MM/yyyy HH:mm:ss"
    );

    sheet.appendRow([
      fechaPeru,
      data.nombre || "",
      "'" + (data.celular || ""),
      data.distrito || "",
      data.servicio || "",
      data.detalle || "",
      data.origen || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

