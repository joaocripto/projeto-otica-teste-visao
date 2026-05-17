# 🚀 SETUP — Teste de Visão (Produção)

Guia completo para colocar sua landing page online.

---

## **OPÇÃO 1: Testar Localmente (Rápido)**

### Pré-requisitos
- Node.js 18+ instalado ([download](https://nodejs.org))

### Passos
```bash
# 1. Navegar até a pasta do projeto
cd C:\Users\User\Documents\Claude\Projects\projeto de otica capitacao de leads

# 2. Instalar dependências
npm install

# 3. Iniciar servidor
npm start

# 4. Abrir no navegador
# http://localhost:3000
```

**Pronto!** A página vai estar rodando localmente. Teste os formulários e veja os dados em `leads.json`.

---

## **OPÇÃO 2: Colocar Online (Vercel + Firebase)**

### O que você vai fazer:
1. **Frontend** → Vercel (hosting free)
2. **Backend** → Vercel (functions)
3. **Banco de dados** → Firebase Firestore (free)

### PASSO 1: Configurar Firebase

1. Ir em https://console.firebase.google.com
2. Clique em **"Criar Projeto"**
   - Nome: `teste-visao-optica`
   - País: Brasil
3. Aguarde criação (~ 1 min)
4. Clique em **"Firestore Database"** (menu lateral esquerdo)
5. Clique em **"Criar Banco de Dados"**
   - Modo: **Iniciar no modo de teste**
   - Local: **Selecione mais próximo (São Paulo/South America)**
   - Clique em **"Criar"**
6. Agora vá em **"Project Settings"** (engrenagem no canto superior)
7. Clique em **"Contas de Serviço"**
8. Clique em **"Python"** (ou Node.js) → **"Gerar Chave Privada"**
9. Um JSON vai ser baixado. **Guarde este arquivo com segurança.**

### PASSO 2: Preparar Código para Vercel

1. Abra a pasta do seu projeto
2. Crie um arquivo chamado `.env.local`:

```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=seu-project-id-aqui
FIREBASE_PRIVATE_KEY_ID=seu-private-key-id-aqui
FIREBASE_CLIENT_EMAIL=seu-email@seu-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=seu-client-id-aqui
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUa_CHAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
```

**Como preenchher:**
- Abra o JSON que você baixou do Firebase
- Copie os valores (`project_id`, `private_key`, etc) e cole acima

**IMPORTANTE:** Não compartilhe este arquivo! Ele contém sua chave de segurança.

### PASSO 3: Criar Conta Vercel

1. Ir em https://vercel.com
2. Clique em **"Sign Up"**
3. Conecte sua conta GitHub / Google / ou crie um email
4. Siga os passos de confirmação

### PASSO 4: Deploy para Vercel

#### Opção A: Via Vercel CLI (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Entrar na pasta do projeto
cd C:\Users\User\Documents\Claude\Projects\projeto de otica capitacao de leads

# 3. Fazer deploy
vercel

# 4. Responder às perguntas:
# ? Set up and deploy? Y
# ? Which scope do you want to deploy to? (selecione sua conta)
# ? Link to existing project? N
# ? Project name? teste-visao-optica
# ? In which directory is your code? ./
# ? Want to modify vercel.json to enable Production? Y

# 5. Depois, adicionar variáveis de ambiente:
vercel env add FIREBASE_PROJECT_ID
# (cola seu project_id)

vercel env add FIREBASE_PRIVATE_KEY_ID
# (cola seu private_key_id)

# ... repita para todas as variáveis acima
```

#### Opção B: Via GitHub (Mais Fácil depois)

1. Crie um repositório no GitHub com seus arquivos
2. Vá em https://vercel.com/new
3. Conecte seu repositório GitHub
4. Clique em **"Import"**
5. Vá em **Settings** → **Environment Variables**
6. Adicione todas as variáveis do `.env.local`
7. Clique em **"Deploy"**

---

## **PASSO 5: Atualizar Domínio do Anúncio**

Depois que o deploy terminar, você vai ter uma URL como:
```
https://teste-visao-optica.vercel.app
```

**Use esta URL no seu anúncio do Facebook/Google!**

No Facebook Ads Manager:
- Campaign → Ad Set → Ads
- Website URL: `https://teste-visao-optica.vercel.app`
- Landing Page URL: `https://teste-visao-optica.vercel.app`

---

## **PASSO 6: Visualizar Leads Capturados**

### Via Painel (recomendado):

1. Abra em seu navegador:
```
https://teste-visao-optica.vercel.app/api/leads
```

Você vai ver um JSON com todos os leads capturados.

### Via Firebase Console:

1. Vá em https://console.firebase.google.com
2. Selecione seu projeto
3. Clique em **"Firestore Database"**
4. Navegue pela coleção **"leads"**
5. Veja todos os documentos (cada um é um lead)

### Exportar para CSV (Google Sheets):

1. Abra Google Sheets
2. **File** → **Open** → **Web connected app**
3. Cole esta URL no terminal / script:
```
https://seu-site.vercel.app/api/leads
```
Você vai receber um JSON, copie para uma planilha.

---

## **TROUBLESHOOTING**

### "404 - Page not found"
- Verifique se o arquivo `index.html` está na pasta raiz
- Reinicie o servidor: `npm start`

### "Firebase não está conectando"
- Verifique as variáveis de ambiente em `vercel env list`
- A chave privada está no formato correto? (com `\n` escapado)
- Firestore está habilitado? Vá em Firebase Console → Firestore Database

### "Leads não estão salvando"
- Abra DevTools (F12) → Console
- Veja se há erro em vermelho
- Se disser "Permission Denied", ajuste regras Firestore:
  - Firebase Console → Firestore → Rules
  - Cole isto:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /leads/{document=**} {
        allow read, write;
      }
    }
  }
  ```

### "Domínio está lento"
- Verifique se o servidor está rodando
- Limpe cache do navegador (Ctrl+Shift+Del)
- Espere 30s (Vercel às vezes demora pra iniciar)

---

## **PRÓXIMAS ETAPAS**

✅ **Landing pronta?**
1. Teste em celular (mobile-first!)
2. Teste o formulário + cálculo
3. Confirme que leads estão salvando
4. Vire URL do anúncio

✅ **Pronto para rodar anúncio?**
1. Facebook Ads Manager
2. Google Ads
3. Budget: R$ 50-100/dia (começar pequeno)
4. Acompanhar CTR, CPC, leads por 7 dias

✅ **Precisa otimizar?**
1. Testar headlines diferentes
2. A/B test de imagens
3. Aumentar budget se performance boa
4. Analisar quais testes as pessoas mais respondem

---

## **SUPORTE RÁPIDO**

**Problema:** Não consigo conectar Firebase
**Solução:** Teste localmente primeiro com `npm start`. Os dados vão salvar em `leads.json`.

**Problema:** Vercel diz "Build failed"
**Solução:** Verifique `package.json` tem `"start": "node server.js"`. Execute `npm install` novamente.

**Problema:** Parei de receber leads
**Solução:** Firebase pode ter desabilitado por segurança. Vá em Firebase Console → Security Rules → Permita leitura/escrita.

---

## **CHECKLIST FINAL**

- [ ] Node.js 18+ instalado
- [ ] `npm install` rodado com sucesso
- [ ] `npm start` funciona localmente
- [ ] Landing page carrega em localhost:3000
- [ ] Formulário valida email/WhatsApp
- [ ] Testes funcionam e calculam resultado
- [ ] `leads.json` salva os dados localmente
- [ ] Firebase projeto criado e testado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy em Vercel funcionando
- [ ] URL de produção gerada
- [ ] Leads aparecem em `/api/leads`
- [ ] Anúncio aponta para URL correta
- [ ] Primeira campanha teste rodando

---

**Pronto! Sua landing está live.** 🎉

Para suporte ou dúvidas sobre o setup, volta aqui.
