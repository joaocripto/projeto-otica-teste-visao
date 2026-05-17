// ===== COLE ISSO NO GOOGLE APPS SCRIPT DO SEU GOOGLE SHEETS =====
// Passos:
// 1. Abre seu Google Sheets
// 2. Clica em "Extensões" (canto superior)
// 3. Clica em "Apps Script"
// 4. Deleta o código que tem lá
// 5. Cola TUDO isso abaixo
// 6. Clica em "Executar" (vai pedir permissão uma vez)
// 7. Clica em "Deploy" (botão azul no topo) → "New Deployment" → Type: "Web App"
// 8. Execute as: "Me"
// 9. Deploy
// 10. COPIA A URL que aparece (tipo: https://script.google.com/macros/d/...)
// 11. Cola essa URL em GOOGLE_SHEETS_WEBHOOK no .env

function doPost(e) {
  try {
    // Pega os dados que vêm do seu servidor
    const data = JSON.parse(e.postData.contents);

    // Abre a planilha ativa
    const sheet = SpreadsheetApp.getActiveSheet();

    // Se a primeira linha estiver vazia, cria o cabeçalho
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data',
        'Hora',
        'Nome',
        'Email',
        'WhatsApp',
        'Teste 1',
        'Teste 2',
        'Teste 3',
        'Resultado'
      ]);
    }

    // Adiciona a linha com os dados
    const dataObj = new Date(data.dataCriacao);
    sheet.appendRow([
      Utilities.formatDate(dataObj, Session.getScriptTimeZone(), 'dd/MM/yyyy'),
      Utilities.formatDate(dataObj, Session.getScriptTimeZone(), 'HH:mm:ss'),
      data.nome || '',
      data.email || '',
      data.whatsapp || '',
      data.teste1 || '',
      data.teste2 || '',
      data.teste3 || '',
      data.resultado || ''
    ]);

    // Responde com sucesso
    return ContentService.createTextOutput(
      JSON.stringify({ sucesso: true, id: data.id })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Se der erro, responde com o erro
    return ContentService.createTextOutput(
      JSON.stringify({ sucesso: false, erro: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'ok',
      mensagem: 'Google Sheets webhook configurado corretamente'
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
