"use client";

import { useState } from "react";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Logowanie</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm">Hasło</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border px-3 py-2 rounded-l"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="border px-3 rounded-r"
            >
              {showPassword ? "Ukryj" : "Pokaż"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
}
