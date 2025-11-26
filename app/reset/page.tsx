"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [sentToken, setSentToken] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Błąd");
      return;
    }

    setSentToken(data.token);
  }

  return (
    <main className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md p-6 bg-white shadow rounded text-center">
        <h1 className="text-2xl font-bold mb-4">Resetowanie hasła</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Podaj email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Wyślij link resetujący
          </button>
        </form>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {sentToken && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            Token resetujący (w realnej aplikacji wysyłany mailem):
            <br />
            <strong>{sentToken}</strong>
            <br />
            <a className="text-blue-600 underline" href={`/reset/${sentToken}`}>
              Kliknij, aby ustawić nowe hasło →
            </a>
          </div>
        )}
        <Link
          href="/"
          className="text-blue-600 hover:underline text-sm inline-block mt-4"
        >
          ← Powrót do logowania
        </Link>
      </div>
    </main>
  );
}
