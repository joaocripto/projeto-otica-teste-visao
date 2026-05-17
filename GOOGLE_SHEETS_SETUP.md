# 🎯 Setup Google Sheets — Automação de Leads

Quando um cliente faz o teste, os dados saem **automaticamente** na sua planilha do Google Sheets. Aqui tá como configurar.

---

## **PASSO 1: Criar Service Account no Google Cloud**

1. Vai em: https://console.cloud.google.com/
2. Clica em **"Criar Projeto"** (ou seleciona um existente)
3. No menu lateral, vai em **"APIs e Serviços"** → **"Credenciais"**
4. Clica em **"+ Criar credenciais"** → **"Conta de Serviço"**
5. Preenche:
   - **Nome da conta de serviço:** `teste-visao-leads`
   - Clica em **"Criar e Continuar"**
6. Na segunda tela, clica em **"Continuar"** (pode ignorar o resto por agora)
7. Clica em **"Concluído"**

---

## **PASSO 2: Gerar Chave Privada**

1. Volta em **"Credenciais"**
2. Procura pela conta de serviço que criou (`teste-visao-leads`)
3. Clica no **email da conta de serviço**
4. Va em **"Chaves"** (abas no topo)
5. Clica em **"Adicionar Chave"** → **"Criar nova chave"**
6. Seleciona **"JSON"** e clica em **"Criar"**
7. **Um arquivo JSON vai ser baixado** — guarda esse arquivo com segurança!

---

## **PASSO 3: Pegar as Informações da Chave**

1. Abre o arquivo JSON que foi baixado
2. Copia esses valores:
   - **`client_email`** — algo como `teste-visao-leads@seu-projeto.iam.gserviceaccount.com`
   - **`private_key`** — a chave longa que começa com `-----BEGIN PRIVATE KEY-----`

---

## **PASSO 4: Compartilhar a Planilha com a Conta de Serviço**

1. Abre a planilha **"Leads - Teste Visão"** no Google Sheets
2. Clica em **"Compartilhar"** (canto superior direito)
3. Cola o **`client_email`** que você copiou
4. Seleciona **"Editor"** (pra poder escrever na planilha)
5. Clica em **"Compartilhar"**

---

## **PASSO 5: Adicionar as Credenciais no .env**

1. Abre a pasta do projeto no editor de texto (VS Code, Notepad, etc)
2. Cria um arquivo chamado **`.env`** (sem extensão, só o nome)
3. Cola isso dentro (substituindo pelos seus valores reais):

```
GOOGLE_SHEET_ID=1E6zv2S6vNEGuKtPfUKFdzfp1mOiYtMmICpP0bW1LNyc
GOOGLE_SERVICE_ACCOUNT_EMAIL=teste-visao-leads@seu-projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSua_chave_aqui\n-----END PRIVATE KEY-----\n"
```

⚠️ **IMPORTANTE:**
- Na `private_key`, substitui as quebras de linha por `\n` (assim: `\n` ao invés de quebra real)
- Deixa as aspas duplas no começo e fim
- **Não compartilha esse arquivo com ninguém!**

---

## **PASSO 6: Instalar Dependências**

```bash
npm install
```

Isso vai instalar as bibliotecas de Google Sheets.

---

## **PASSO 7: Testar Localmente**

```bash
npm start
```

Acessa: `http://localhost:3000`

Faz um teste:
1. Preenche os dados
2. Responde os testes
3. Clica em "Ver Resultado"

Depois, abre sua planilha no Google Sheets — **o lead deve aparecer lá automaticamente!** ✅

---

## **✅ Pronto!**

Agora toda vez que alguém faz o teste, os dados saem automáticos na sua planilha. Você não precisa fazer nada manualmente.

---

## **🚀 Depois: Deploy em Netlify**

Quando tiver testado localmente e confirmado que tá funcionando:

1. Vai em **netlify.com**
2. Login com Google/GitHub
3. Arrasta a pasta `projeto de otica capitacao de leads` pra lá
4. **Pronto** — sai uma URL tipo `seu-site.netlify.app`
5. No Netlify, em **Settings** → **Environment Variables**, adiciona as mesmas variáveis do `.env`

---

## **❓ Problemas?**

**Problema:** "GOOGLE_SERVICE_ACCOUNT_EMAIL não está configurado"
→ Você não criou o `.env` ou não preencheu corretamente

**Problema:** "Erro ao adicionar ao Google Sheets"
→ Você não compartilhou a planilha com a conta de serviço

**Problema:** "Leads não aparecem na planilha"
→ Reinicia o servidor (`npm start` novamente)

---

**Qualquer dúvida, volta aqui!** 🚀
