import { createVectorQueryTool } from "@mastra/rag";
import { cohere } from "@ai-sdk/cohere";

// Return topk most similar chunks and send to buffettagent
export const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "vectorStore",               // use defined vectorStore
  indexName: "hathawayLetters",              // index/table name
  model: cohere.embedding("embed-english-v3.0"), // use the same embed technique to retrieve the related text from vectorStore
  enableFilter: true,                        // allows metadata filtering like year, source, etc.
});
