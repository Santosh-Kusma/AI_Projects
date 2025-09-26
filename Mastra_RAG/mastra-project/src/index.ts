import { buffettAgent } from "./src/mastra/agents/buffettAgent";
import { Mastra } from "@mastra/core";
import { registerApiRoute } from "@mastra/core/server";
import { vectorStore } from "./src/mastra/rag/vectorStore";


export const mastra = new Mastra({
  // register the agent and vector store with Mastra instance.
  agents: { buffett: buffettAgent }, 
  vectors: { vectorStore }, 
  // Custom API Route
  server: {
    apiRoutes: [
      registerApiRoute("/api-chat", {
        method: "POST",
        handler: async (c) => {
          const mastra = c.get("mastra");
          const agent = await mastra.getAgent("buffett");

          // Parse request body
          const body = await c.req.json();
          const messages = body.messages;

          try {
            // Non-streaming
            const result = await agent.generate(messages);

            // const stream = await agent.stream(messages);

            // Return JSON response
            return c.json({
              success: true,
              output: result.text, // agent’s text reply
            });
            // return stream.toDataStreamResponse();

          } catch (error) {
            console.error("Error generating response:", error);
            return c.json({
              success: false,
              error: "Something went wrong, Kindly try again."
            });
          }
        },
      }),
    ],
  },
});
