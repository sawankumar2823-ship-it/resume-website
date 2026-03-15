import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! Ask anything about Sawan's portfolio.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();

      const botMessage = {
        text: data.answer,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to chatbot.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Chat Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#6366f1",
          color: "white",
          fontSize: "26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3), 0 0 12px rgba(99,102,241,0.7)",
          zIndex: 99999,
        }}
      >
        🤖
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "25px",
            width: "320px",
            height: "420px",
            background: "#111",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            zIndex: 99999,

            transform: open ? "scale(1)" : "scale(0.9)",
            transition: "all 0.2s ease",
            transformOrigin: "bottom right",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px",
              background: "#6366f1",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sawan AI Assistant
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? "#6366f1" : "#333",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  maxWidth: "75%",
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div style={{ color: "#aaa", fontSize: "12px" }}>Thinking...</div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #333",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
                background: "#1a1a1a",
                color: "white",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "10px 14px",
                border: "none",
                background: "#6366f1",
                color: "white",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
