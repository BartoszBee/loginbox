"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetTokenForm({ token }: { token: string }) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirm }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      router.push("/");
    }, 1500);
  }

  return (
    <main className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Ustaw nowe hasło</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nowe hasło"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Powtórz hasło"
            className="w-full border px-3 py-2 rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Zapisz nowe hasło
          </button>
        </form>

        {error && <p className="mt-4 text-red-600">{error}</p>}
        {success && (
          <p className="mt-4 text-green-700">
            ✔ Hasło zmienione! Przekierowanie...
          </p>
        )}
      </div>
    </main>
  );
}
