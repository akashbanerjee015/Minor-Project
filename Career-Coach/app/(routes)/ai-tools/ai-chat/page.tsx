"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import EmptyState from "./_components/EmptyState";

type Message = {
  role: "user" | "ai";
  text: string;
};

function AiChat() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim() || loading) return;

    const userMessage = userInput.trim();

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/openrouter/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "AI failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-48">
      {/* Header */}
      <div className="flex items-center justify-between gap-8">
        <div>
          <h2 className="font-bold text-lg">AI Career Q/A</h2>
          <p className="text-gray-600">
            Smarter career decisions start here – get tailored advice
          </p>
        </div>
        <Button onClick={() => setMessages([])}>+ New Chat</Button>
      </div>

      {/* Chat */}
      <div className="flex flex-col h-[75vh]">
        {messages.length === 0 && (
          <div className="mt-5">
            <EmptyState selectedQuestion={(q: string) => setUserInput(q)} />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg max-w-3xl ${
                msg.role === "user"
                  ? "bg-blue-100 ml-auto"
                  : "bg-gray-100"
              }`}
            >
              {msg.role === "ai" ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {loading && (
            <p className="text-sm text-gray-400">AI typing…</p>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-4 mt-4">
          <Input
            placeholder="Type here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button onClick={sendMessage} disabled={loading}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
