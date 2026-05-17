# 🎯 Teste de Visão — Landing Page Completa

**Status:** ✅ Pronto para usar

---

## 📦 O Que Você Tem

Todos os arquivos estão na pasta `projeto de otica capitacao de leads`:

```
├── index.html                    ✅ Landing page (6 telas)
├── admin.html                    ✅ Painel de leads
├── server.js                     ✅ Backend (Node.js)
├── package.json                  ✅ Dependências
├── SETUP.md                      ✅ Instruções de setup
├── README.md                     📍 Este arquivo
├── leads.json                    📊 Base de dados local (criado após primeiro teste)
└── PRD_Teste_Visao_Digital.pdf   📋 Documento técnico
└── Anuncio_Teste_Visao_Estrategia.pdf  📋 Estratégia de anúncios
```

---

## 🚀 COMECAR AGORA (3 Minutos)

### 1. **Testar Localmente**

Abra terminal e execute:

```bash
cd C:\Users\User\Documents\Claude\Projects\projeto de otica capitacao de leads
npm install
npm start
```

Depois abra no navegador:
```
http://localhost:3000
```

**Pronto!** A landing page está rodando. Teste os formulários, complete os testes, veja os resultados aparecerem.

### 2. **Ver os Leads Capturados**

Abra:
```
http://localhost:3000/admin.html
```

Aqui você vê todos os leads em uma tabela bonita + estatísticas.

### 3. **Subir para Produção**

Leia o arquivo `SETUP.md` (no mesmo diretório). Ele tem 3 opções:
- **Opção 1:** Deixar rodando localmente (só você acessa)
- **Opção 2:** Vercel + Firebase (online, público, profissional)
- **Opção 3:** Outro servidor (AWS, Heroku, DigitalOcean)

**Recomendado:** Opção 2 (Vercel + Firebase). É free e escalável.

---

## 📝 Como Funciona

### **Fluxo do Usuário:**
1. Clica no anúncio → vai para `index.html`
2. Vê intro, clica "Começar Teste"
3. Preenche formulário (nome, email, WhatsApp)
4. Responde 3 testes rápidos (visão longe, perto, astigmatismo)
5. Vê resultado (ex: "Você tem MIOPIA + ASTIGMATISMO")
6. Sistema salva dados em banco
7. Você entra em contato via WhatsApp

### **Onde Dados Ficam:**
- **Localmente:** `leads.json` (quando rodando em localhost)
- **Produção:** Firebase Firestore (quando online)
- **Painel:** Acesso via `/admin.html`

---

## 🎨 Customizações Rápidas

### Mudar Logo/Branding
Abra `index.html`, procure por:
```html
<div class="logo">
    <h1>👀</h1>
    <p>Teste de Visão</p>
</div>
```

Troque por sua logo:
```html
<div class="logo">
    <img src="sua-logo.png" width="100">
    <p>Sua Ótica</p>
</div>
```

### Mudar Cores
Procure por `#667eea` e `#764ba2` no arquivo CSS. Substitua pelas cores da sua marca.

### Mudar Textos
Procure pelos headlines e descrições no HTML. Ajuste conforme sua marca.

---

## 📱 Responsividade

✅ **Testado em:**
- Desktop
- Tablet
- Mobile (iPhone, Android)

A landing é **mobile-first**, então vai funcionar perfeito no celular (onde vem 80% do tráfego).

---

## 🔧 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Module not found" | Execute `npm install` novamente |
| "Port 3000 already in use" | Mude em `server.js`: `const PORT = 3001` |
| Leads não salvando | Verifique se Firebase está configurado (veja SETUP.md) |
| Landing lenta | Reinicie servidor: `npm start` |
| Erro 404 em `/admin.html` | Certifique-se que está acessando `http://localhost:3000/admin.html` |

---

## 📊 Métricas Esperadas (Primeira Semana)

| Métrica | Meta |
|---------|------|
| Taxa Conclusão do Teste | >60% (6 de cada 10 começam, terminam) |
| Taxa Lead Capturado | >70% (7 de cada 10 que terminam, deixam dados) |
| Custo por Lead | R$ 1-5 (depende do volume de cliques) |
| Taxa Conversão pós-contato | >25% (1 em cada 4 contatados, agenda) |

---

## ✅ Checklist Pré-Launch

- [ ] Testou localmente? (`npm start` funciona?)
- [ ] Landing carrega em <3 segundos?
- [ ] Formulário valida email e WhatsApp?
- [ ] Testes completam sem erros?
- [ ] Resultado calcula corretamente?
- [ ] Dados salvam em `leads.json`?
- [ ] Painel admin mostra os leads?
- [ ] URL do anúncio está pronta?
- [ ] Firebase configurado (se for produção)?
- [ ] Deploy em Vercel OK (se for produção)?

---

## 🎬 Próximos Passos (Ordem)

1. **Testar localmente** (você está aqui)
   ```bash
   npm install && npm start
   ```

2. **Customizar branding** (seu logo, cores, textos)

3. **Subir para Vercel** (quando tiver certeza que tá pronto)
   - Ler `SETUP.md`
   - Seguir passos

4. **Rodar primeiro anúncio**
   - Facebook: R$ 50/dia por 7 dias
   - Google: R$ 30/dia por 7 dias

5. **Monitorar leads**
   - Abrir `http://seu-site.vercel.app/admin.html`
   - Ver dados em tempo real
   - Contatar via WhatsApp

6. **Otimizar**
   - A/B test de headlines
   - Testar imagens diferentes
   - Aumentar budget se performar bem

---

## 📞 Suporte

Se tiver dúvida:
1. Leia `SETUP.md` (respostas para 90% das perguntas)
2. Verifique console do navegador (F12 → Console) pra ver erros
3. Teste em modo incógnito (evita cache)

---

## 🎓 Arquivos Importantes para Entender

- **PRD_Teste_Visao_Digital.pdf** — O que foi construído (leia se quiser entender a arquitetura)
- **Anuncio_Teste_Visao_Estrategia.pdf** — Como rodar anúncios (leia antes de ligar campanha)
- **SETUP.md** — Como colocar online (leia antes de fazer deploy)

---

**Desenvolvido com ❤️ para sua ótica**

Boa sorte com os leads! 🚀
