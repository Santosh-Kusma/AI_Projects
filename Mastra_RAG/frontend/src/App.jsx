import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSendQuery() {
    if (!query.trim()) return;

    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4111/api-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            userMessage, // match API contract
          ],
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      const agentMessage = {
        role: "agent",
        content: data.output || "No response received.",
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (err) {
      console.error("Error sending query:", err);
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "Error: Could not fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.chatView}>
      <div className={styles.chatMessages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.role === "user" ? styles.chatUser : styles.chatAgent}
          >
            <strong>{msg.role === "user" ? "You" : "Agent"}:</strong>{" "}
            {msg.content}
          </div>
        ))}

        {loading && <div className={styles.loader}></div>}
      </div>

      <div className={styles.chatBox}>
        <input
          className={styles.chatInput}
          type="text"
          placeholder="Share your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
        />
        <button className={styles.sendButton} onClick={handleSendQuery}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
