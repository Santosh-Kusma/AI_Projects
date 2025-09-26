# 📊 RAG Chatbot

This project implements a **Retrieval-Augmented Generation (RAG)** chatbot using **Mastra**, **Cohere embeddings**, and **OpenAI GPT**.  
It allows querying **Warren Buffett’s Berkshire Hathaway shareholder letters (2019–2024)** with natural language.

---

🚀 Features

⚡ RAG-powered search → combines semantic search with LLM responses
🧠 Cohere embeddings → generate high-dimensional vector representations of shareholder letters
🤖 OpenAI GPT agent → produces clear, structured, and citation-supported answ
📚 Document ingestion pipeline → PDFs parsed, chunked, embedded, and stored in vector DB
🔍 Context-aware responses → answers to Berkshire Hathaway shareholder letters
💾 Memory persistence → conversation history stored with SQLite via Mastra

🛠️ Tech Stack

Mastra → agent orchestration + vector store + memory
Cohere → embeddings (embed-english-v3.0)
OpenAI → GPT model for response generation
pdf-parse → PDF text extraction
SQLite + LibSQLStore → persistent chat memory

📂 Workflow

Ingest documents → PDFs → text → chunked → embeddings → vector DB
Query pipeline → user query → embeddings search → retrieve top matches
LLM response → GPT answers using retrieved chunks + provides citations

## 📂 Folder Structure

Assignment_Pazago/
│── frontend/ # React frontend
│ ├── src/
│ │ ├── App.jsx # Chat UI
│ │ ├── App.module.css # Chat styles
│ │ ├── main.jsx # React entry
│ ├── index.html
│ ├── package.json
│ └── package-lock.json
│
│── mastra-project/ # Backend (Mastra)
│ ├── .mastra/
│ │ └── mastra.db # Local SQLite store
│ ├── documents/
│ │ └── Berkshire_Hathaway_letters/ # PDF source docs (2019–2024)
│ ├── scripts/
│ │ └── ingestBuffett.ts # Script to ingest letters into vector DB
│ ├── src/mastra/
│ │ ├── agents/
│ │ │ └── buffettAgent.ts # Agent definition
│ │ ├── memory/
│ │ │ └── memoryStore.ts # Memory persistence
│ │ └── rag/
│ │   ├── vectorQueryTool.ts # Tool for querying vectors
│ │   └── vectorStore.ts # Vector store config
| | |──index.ts # Mastra entry + custom API route
│ ├── .env # API keys + env config
│ ├── package.json
│ ├── package-lock.json
│ └── tsconfig.json

## ⚡ Setup & Installation

### 1. Install Mastra CLI
1. Initialize & Install
cd mastra-project
npm install
2. Environment Configuration
Create a .env file in mastra-project/:

env
OPENAI_API_KEY=your_openai_api_key
COHERE_API_KEY=your_cohere_api_key
DATABASE_URL=file:.mastra/mastra.db


📥 Ingesting Buffett Letters
To load PDFs into the vector store:

cd mastra-project
npx tsx scripts/ingestBuffett.ts 
note: The debug block inside node_modules/pdf-parse/index.js must remain commented to avoid errors (it tries to read ./test/data/05-versions-space.pdf by default).
This extracts text from PDFs inside documents/Berkshire_Hathaway_letters/
and embeds them into the pgVector store.

🧪 Testing in Playground
Run development server:

RUN
mastra dev / npm run dev
Custom API endpoint → http://localhost:4111/api-chat


💻 Frontend (React Chat UI)
Start frontend:

cd frontend
npm install
npm run dev
The chat connects to backend API (/api-chat) and supports streaming responses.

✅ Summary
Mastra Agent with OpenAI + Cohere embeddings
RAG pipeline using vectorQueryTool
Buffett letters (2019–2024) PDFs → vector store
Frontend React chat UI with streaming support
Deployment ready (local)





