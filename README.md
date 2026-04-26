# 🌿 Sistema CIT — Monitoramento Ambiental

> **Plataforma web para catalogar e gerenciar pontos de coleta de qualidade da água em nascentes, córregos e veredas.**  
> Desenvolvido como teste prático para o processo seletivo da empresa **CIT (Centro de Inteligência Territorial)**.

---

LINK PARA TESTE: https://vercel.com/gabrielteotonio80-2375s-projects/teste-pratico-cit

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Banco de Dados](#-banco-de-dados)
- [Como Executar](#-como-executar)
- [Autor](#-autor)

---

## 🌍 Sobre o Projeto

O **Sistema CIT** nasceu da necessidade real de equipes ambientais que monitoram nascentes, córregos e pequenos rios em áreas rurais do Cerrado e da Amazônia. Antes da plataforma, os dados eram registrados em cadernos e planilhas isoladas — um processo inviável com o crescimento do número de pontos monitorados.

A solução entrega um sistema **CRUD completo** com interface web moderna, permitindo que pesquisadores de campo registrem, consultem, editem e removam pontos de coleta de forma simples e rápida — com persistência total dos dados em nuvem via **Supabase**.

O desafio opcional de associar **Equipes de Monitoramento** aos pontos de coleta também foi implementado, permitindo visualizar claramente qual equipe é responsável por cada ponto.

---

## ✅ Funcionalidades

### 📍 Pontos de Coleta

| Operação | Descrição |
|----------|-----------|
| ➕ **Create** | Cadastro de novos pontos com tipo, coordenadas, parâmetros de qualidade da água e equipe responsável |
| 📋 **Read** | Listagem em cards com visualização completa de todos os dados do ponto |
| ✏️ **Update** | Edição de qualquer campo do ponto existente via formulário pré-preenchido |
| 🗑️ **Delete** | Exclusão com modal de confirmação para evitar remoções acidentais |
| 🔍 **Busca** | Filtro em tempo real por tipo do ponto ou observações |
| 📊 **Ordenação** | Ordenação por latitude, longitude ou tipo do ponto |

**Dados registrados por ponto:**
- Tipo do ponto (Nascente, Vereda, Córrego)
- Latitude e Longitude
- Altitude (opcional)
- Data da coleta
- pH, Turbidez e Temperatura da água
- Condições do entorno
- Observações gerais
- Equipe responsável (associação com a tabela de equipes)

---

### 👥 Equipes de Monitoramento *(Desafio Opcional — Implementado)*

| Operação | Descrição |
|----------|-----------|
| ➕ **Create** | Cadastro de equipes com nome, integrantes, contato e região de atuação |
| 📋 **Read** | Listagem em cards + visualização com contagem de pontos de coleta vinculados |
| ✏️ **Update** | Edição dos dados da equipe via formulário pré-preenchido |
| 🗑️ **Delete** | Exclusão com modal de confirmação (pontos vinculados têm a referência removida, não são excluídos) |
| 🔍 **Busca** | Filtro por nome da equipe ou região de atuação |
| 📊 **Ordenação** | Ordenação por nome ou região |

---

### 🖥️ Interface & UX

- **Navegação por seções** — links da navbar alternam entre Pontos de Coleta e Equipes sem recarregar a página
- **Modais dedicados** — formulários de criação/edição em overlays, sem perder o contexto da tela
- **Notificações flutuantes** — feedback visual de sucesso após criar ou editar um registro
- **Atalho de criação** — é possível cadastrar uma nova equipe diretamente de dentro do formulário de ponto de coleta
- **Responsividade** — layout adaptado para diferentes tamanhos de tela

---

## 🛠️ Tecnologias Utilizadas

### Front-end

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5** | — | Estrutura semântica da aplicação |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3** | — | Estilização modular com variáveis CSS |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript (ES Modules)** | ES2020+ | Lógica de UI, eventos e chamadas à API |
| ![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat&logo=fontawesome&logoColor=white) **Font Awesome** | 6.4.0 | Ícones visuais |

### Back-end & Banco de Dados

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white) **Supabase** | ^2.104.1 | Backend as a Service — banco de dados PostgreSQL em nuvem + API REST automática |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) **PostgreSQL** | — | Banco de dados relacional (gerenciado pelo Supabase) |

### Ferramentas de Desenvolvimento

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) **Vite** | ^8.0.10 | Servidor de desenvolvimento e bundler |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) **Node.js** | — | Ambiente de execução para as ferramentas de dev |
| ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white) **ESLint** | ^10.2.1 | Análise estática e qualidade de código |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) **Git** | — | Controle de versão |

---

## 📁 Estrutura de Pastas

```
TESTE-PRATICO-CIT/
│
├── index.html                    # Ponto de entrada da aplicação (HTML único com todos os modais)
├── package.json                  # Dependências e scripts do projeto
├── package-lock.json             # Lock file das dependências
├── schema.sql                    # Script SQL de criação das tabelas no banco de dados
├── .gitignore                    # Arquivos ignorados pelo Git
├── README.md                     # Documentação do projeto
│
└── src/
    ├── css/                      # Estilos modularizados
    │   ├── style.css             # Arquivo principal (importa todos os outros via @import)
    │   ├── global.css            # Variáveis CSS, reset e estilos base do body
    │   ├── navbar.css            # Barra de navegação superior
    │   ├── cards.css             # Cards de listagem, grid e botões de ação
    │   ├── modals.css            # Modais, formulários e avisos flutuantes
    │   ├── detalhes.css          # Modal de visualização detalhada de registros
    │   └── footer.css            # Rodapé da aplicação
    │
    └── js/                       # Lógica JavaScript modularizada
        ├── main.js               # Inicializa todos os módulos ao carregar a página
        ├── pages.js              # Controla a navegação entre seções e abertura de modais
        ├── supabase.js           # Instância do cliente Supabase (configuração da conexão)
        │
        ├── api/                  # Camada de acesso a dados (comunicação com o Supabase)
        │   ├── apiPontosColeta.js    # CRUD completo para a tabela pontos_coleta
        │   └── apiEquipes.js         # CRUD completo para a tabela equipes
        │
        └── ui/                   # Camada de interface (renderização e eventos do DOM)
            ├── uiPontosColeta.js     # Renderiza cards, formulários e modais de pontos
            └── uiEquipes.js          # Renderiza cards, formulários e modais de equipes
```

### Arquitetura em Camadas

```
┌──────────────────────────────────────────────────┐
│                   index.html                     │  ← Estrutura HTML + todos os modais
└────────────────────┬─────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼───────┐       ┌─────────▼───────┐
│   pages.js    │       │    main.js      │  ← Inicialização e orquestração
│  (navegação)  │       │  (bootstrap)    │
└───────────────┘       └────────┬────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                                         │
   ┌──────────▼──────────┐             ┌───────────────▼──────────┐
   │   ui/uiPontosColeta │             │      ui/uiEquipes        │  ← Camada UI
   │  (renderização DOM) │             │    (renderização DOM)    │
   └──────────┬──────────┘             └───────────────┬──────────┘
              │                                         │
   ┌──────────▼──────────┐             ┌───────────────▼──────────┐
   │ api/apiPontosColeta │             │      api/apiEquipes      │  ← Camada API
   │  (CRUD Supabase)    │             │      (CRUD Supabase)     │
   └──────────┬──────────┘             └───────────────┬──────────┘
              │                                         │
              └──────────────┬──────────────────────────┘
                             │
                   ┌─────────▼─────────┐
                   │    supabase.js    │  ← Conexão com o banco
                   │  (cliente único)  │
                   └─────────┬─────────┘
                             │
                   ┌─────────▼─────────┐
                   │  Supabase Cloud   │  ← PostgreSQL em nuvem
                   │  (PostgreSQL)     │
                   └───────────────────┘
```

---

## 🗄️ Banco de Dados

O esquema relacional foi criado no PostgreSQL via Supabase. A relação entre as tabelas é de **1 equipe → N pontos de coleta**.

```sql
-- Tabela de Equipes
CREATE TABLE equipes (
    id_equipe        INT AUTO_INCREMENT PRIMARY KEY,
    nome_equipe      VARCHAR(100) NOT NULL,
    integrantes      TEXT,
    contato          VARCHAR(50),
    regiao_atuacao   VARCHAR(100)
);

-- Tabela de Pontos de Coleta
CREATE TABLE pontos_coleta (
    id_ponto      INT AUTO_INCREMENT PRIMARY KEY,
    tipo_ponto    VARCHAR(50) NOT NULL,     -- Nascente, Vereda, Córrego
    latitude      DECIMAL(10, 8) NOT NULL,
    longitude     DECIMAL(11, 8) NOT NULL,
    altitude      FLOAT,
    data_coleta   DATE DEFAULT CURRENT_DATE,
    ph            DECIMAL(4, 2),
    turbidez      DECIMAL(5, 2),
    temperatura   DECIMAL(4, 1),
    entorno       TEXT,
    observacoes   TEXT,
    id_equipe     INT,

    CONSTRAINT fk_equipe
        FOREIGN KEY (id_equipe)
        REFERENCES equipes(id_equipe)
        ON DELETE SET NULL   -- Ponto permanece mesmo se a equipe for deletada
);
```

### Diagrama ER

```
┌─────────────────────┐          ┌──────────────────────────┐
│       equipes       │          │      pontos_coleta       │
├─────────────────────┤          ├──────────────────────────┤
│ id_equipe (PK)      │◄─────────│ id_equipe (FK, nullable) │
│ nome_equipe         │  1    N  │ id_ponto (PK)            │
│ integrantes         │          │ tipo_ponto               │
│ contato             │          │ latitude                 │
│ regiao_atuacao      │          │ longitude                │
└─────────────────────┘          │ altitude                 │
                                 │ data_coleta              │
                                 │ ph                       │
                                 │ turbidez                 │
                                 │ temperatura              │
                                 │ entorno                  │
                                 │ observacoes              │
                                 └──────────────────────────┘
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada)
- [Git](https://git-scm.com/) instalado
- Conexão com a internet (o banco de dados está em nuvem via Supabase)

---

### 1. Clone o repositório

```bash
git clone https://github.com/gabrielteotonio10/TESTE-PRATICO-CIT.git
cd TESTE-PRATICO-CIT
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Execute em modo de desenvolvimento

```bash
npm run dev
```

O terminal exibirá algo como:

```
  VITE v8.x.x  ready in Xms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Abra o navegador e acesse **http://localhost:5173**

---

### 4. Build para produção (opcional)

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para pré-visualizar o build:

```bash
npm run preview
```

---

### ⚙️ Configuração do Supabase

O projeto já está configurado com uma instância Supabase ativa. A conexão é feita em `src/js/supabase.js`:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "SUA_URL_AQUI";
const supabaseKey = "SUA_CHAVE_AQUI";

export const supabase = createClient(supabaseUrl, supabaseKey);
```

> Caso queira usar seu próprio Supabase: crie um projeto em [supabase.com](https://supabase.com), execute o `schema.sql` no editor SQL do painel, e substitua a URL e a chave anônima no arquivo acima.

---

## 👤 Autor

Desenvolvido por **Gabriel Teotônio de Castro Coelho Costa**  
Teste prático para o processo seletivo da **CIT — Centro de Inteligência Territorial**

[![GitHub](https://img.shields.io/badge/GitHub-gabrielteotonio10-181717?style=flat&logo=github)](https://github.com/gabrielteotonio10)

---

*© 2026 Sistema de Monitoramento CIT. Todos os direitos reservados.*
