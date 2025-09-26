import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { embedMany } from "ai";
// import { openai } from "@ai-sdk/openai";
import { cohere } from "@ai-sdk/cohere"; // use cohere because openai is asking paid version to embedd
import { MDocument } from "@mastra/rag";
import { vectorStore } from "../src/mastra/rag/vectorStore";


// Ingestion process
async function ingestBuffettLetters() {

  await vectorStore.createIndex({
    indexName: "hathawayLetters",
    dimension: 1024,
  });

  // Folder with PDFs
  const lettersDir = path.resolve("documents", "Berkshire_Hathaway_letters");

  const files = fs.readdirSync(lettersDir).filter(f => f.endsWith(".pdf"));

  for (const file of files) {
    console.log(`Processing ${file}...`);
    const pdfBuffer = fs.readFileSync(path.join(lettersDir, file));
    const parsed = await pdfParse(pdfBuffer);

    // 1. Convert PDF text -> Mastra Document
    const doc = MDocument.fromText(parsed.text, {
      id: file,
      metadata: { source: file },
    });

    // 2. Chunk the document
    const chunks = await doc.chunk({
      strategy: "recursive",
      size: 600,
      overlap: 150,
    });

    // 3. Generate embeddings for chunks
    const { embeddings } = await embedMany({
      model: cohere.embedding("embed-english-v3.0"),
      values: chunks.map((chunk) => chunk.text),
    });

    // 4. Upsert with metadata
    await vectorStore.upsert({
      indexName: "hathawayLetters",
      vectors: embeddings,
      metadata: chunks.map(chunk => ({ text: chunk.text })),
    });

    console.log(`Stored ${chunks.length} chunks from ${file}`);
  }
}

ingestBuffettLetters()
  .then(() => console.log("Buffett letters ingestion complete"))
  .catch(err => console.error("Ingestion failed:", err));