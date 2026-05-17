const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ===== CONFIGURAÇÃO FIREBASE =====
// Você vai copiar suas credenciais do Firebase aqui
let db = null;

try {
  const admin = require('firebase-admin');

  const serviceAccount = {
    type: process.env.FIREBASE_TYPE || "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
    token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs"
  };

  if (!process.env.FIREBASE_PROJECT_ID) {
    console.warn('⚠️ Firebase não está configurado. Dados serão salvos localmente apenas.');
  } else {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    db = admin.firestore();
    console.log('✅ Firebase Firestore conectado');
  }
} catch (error) {
  console.warn('⚠️ Firebase não está disponível. Usando JSON local como fallback.');
}

// ===== CONFIGURAÇÃO GOOGLE SHEETS (2 métodos) =====
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1E6zv2S6vNEGuKtPfUKFdzfp1mOiYtMmICpP0bW1LNyc';
const SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK;
let googleSheet = null;

async function initGoogleSheets() {
  // Método 1: Webhook do Google Apps Script (mais simples)
  if (SHEETS_WEBHOOK) {
    console.log('✅ Google Sheets Webhook configurado');
    return;
  }

  // Método 2: Service Account clássico (mais complexo)
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      console.warn('⚠️ Google Sheets não está configurado. Usando salvo local apenas.');
      return;
    }

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, auth);
    await doc.loadInfo();
    googleSheet = doc.sheetsByIndex[0];
    console.log('✅ Google Sheets (Service Account) conectado');
  } catch (error) {
    console.warn('⚠️ Google Sheets não disponível:', error.message);
  }
}

async function addLeadToGoogleSheets(lead) {
  // Tenta primeiro via webhook (mais rápido)
  if (SHEETS_WEBHOOK) {
    try {
      await fetch(SHEETS_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      console.log('✅ Lead enviado ao Google Sheets via Webhook:', lead.id);
      return;
    } catch (error) {
      console.error('Erro ao enviar via webhook:', error.message);
    }
  }

  // Fallback: tenta via Service Account
  try {
    if (!googleSheet) return;

    const row = {
      'Nome': lead.nome,
      'Email': lead.email,
      'WhatsApp': lead.whatsapp,
      'Resultado': lead.resultado,
      'Data': new Date(lead.dataCriacao).toLocaleDateString('pt-BR')
    };

    await googleSheet.addRow(row);
    console.log('✅ Lead adicionado ao Google Sheets (Service Account):', lead.id);
  } catch (error) {
    console.error('Erro ao adicionar ao Google Sheets:', error);
  }
}

// Inicializar Google Sheets na startup
initGoogleSheets();

// ===== DADOS LOCAIS (FALLBACK) =====
const fs = require('fs');
const leadsFile = path.join(__dirname, 'leads.json');

function loadLeadsFromFile() {
  try {
    if (fs.existsSync(leadsFile)) {
      return JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
    }
  } catch (error) {
    console.error('Erro ao ler arquivo de leads:', error);
  }
  return [];
}

function saveLeadsToFile(leads) {
  try {
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf8');
  } catch (error) {
    console.error('Erro ao salvar arquivo de leads:', error);
  }
}

// ===== ROTAS =====

// Servir a landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir admin.html
app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Servir gerador de QR Code
app.get('/qr', (req, res) => {
  res.sendFile(path.join(__dirname, 'qr.html'));
});

// Receber dados do teste
app.post('/api/lead', async (req, res) => {
  try {
    const { nome, email, whatsapp, teste1, teste2, teste3, resultado } = req.body;

    // Validações básicas
    if (!nome || !email || !whatsapp) {
      return res.status(400).json({ erro: 'Dados incompletos' });
    }

    const novoLead = {
      id: Date.now().toString(),
      nome,
      email,
      whatsapp,
      teste1,
      teste2,
      teste3,
      resultado,
      dataCriacao: new Date().toISOString(),
      status: 'novo'
    };

    // Tentar salvar no Firebase
    if (db) {
      try {
        await db.collection('leads').doc(novoLead.id).set(novoLead);
        console.log('✅ Lead salvo no Firebase:', novoLead.id);
        // Também salvar no Google Sheets
        await addLeadToGoogleSheets(novoLead);
      } catch (firebaseError) {
        console.error('Erro ao salvar no Firebase:', firebaseError);
        // Fallback para arquivo local
        await saveLead(novoLead);
      }
    } else {
      // Sem Firebase, salvar localmente
      await saveLead(novoLead);
    }

    res.json({
      sucesso: true,
      mensagem: 'Lead capturado com sucesso!',
      leadId: novoLead.id
    });

  } catch (error) {
    console.error('Erro ao processar lead:', error);
    res.status(500).json({ erro: 'Erro ao processar dados' });
  }
});

// Função auxiliar para salvar localmente
async function saveLead(lead) {
  const leads = loadLeadsFromFile();
  leads.push(lead);
  saveLeadsToFile(leads);
  console.log('✅ Lead salvo localmente:', lead.id);

  // Também tentar salvar no Google Sheets
  await addLeadToGoogleSheets(lead);
}

// GET todos os leads (painel admin)
app.get('/api/leads', (req, res) => {
  try {
    const leads = loadLeadsFromFile();
    res.json({
      total: leads.length,
      leads: leads.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao recuperar leads' });
  }
});

// GET estatísticas
app.get('/api/stats', async (req, res) => {
  try {
    let leads = [];

    if (db) {
      const snapshot = await db.collection('leads').get();
      snapshot.forEach(doc => {
        leads.push(doc.data());
      });
    } else {
      leads = loadLeadsFromFile();
    }

    const stats = {
      totalLeads: leads.length,
      porResultado: {},
      ultimosLeads: leads.slice(-10)
    };

    leads.forEach(lead => {
      const resultado = lead.resultado || 'indefinido';
      stats.porResultado[resultado] = (stats.porResultado[resultado] || 0) + 1;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar estatísticas' });
  }
});

// DELETE para limpar dados locais
app.delete('/api/leads', (req, res) => {
  try {
    if (fs.existsSync(leadsFile)) {
      fs.unlinkSync(leadsFile);
      console.log('✅ Dados locais deletados:', leadsFile);
      res.json({ sucesso: true, mensagem: 'Dados locais apagados com sucesso' });
    } else {
      res.json({ sucesso: true, mensagem: 'Arquivo já estava vazio' });
    }
  } catch (error) {
    console.error('Erro ao deletar dados:', error);
    res.status(500).json({ erro: 'Erro ao limpar dados' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ===== INICIAR SERVIDOR =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Teste de Visão - Servidor Rodando    ║
║  http://localhost:${PORT}                ║
║  API: http://localhost:${PORT}/api/lead  ║
╚════════════════════════════════════════╝
  `);
});
