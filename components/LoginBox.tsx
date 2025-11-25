"use client";

import { useState } from "react";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string) => {
    if (!value.includes("@") || !value.includes(".")) {
      setEmailError("Nieprawidłowy adres email");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      setPasswordError("Hasło musi mieć co najmniej 6 znaków");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); 
    setSuccess(false);

    if (emailError || passwordError) return;

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Błąd logowania");
      } else {
        setSuccess(true);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setErrorMessage("Błąd połączenia z serwerem");
    }

    setLoading(false);
  };

  const isDisabled =
    !email || !password || emailError !== "" || passwordError !== "";

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Logowanie</h2>

      {success && (
        <p className="mb-3 p-2 bg-green-100 text-green-800 rounded">
          ✔️ Zalogowano pomyślnie!
        </p>
      )}

      {errorMessage && (
        <p className="mb-3 p-2 bg-red-100 text-red-800 rounded">
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            required
          />
          {emailError && (
            <p className="text-red-600 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm">Hasło</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border px-3 py-2 rounded-l"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
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
          {passwordError && (
            <p className="text-red-600 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isDisabled || loading}
          className={`w-full py-2 rounded text-white ${
            isDisabled || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logowanie..." : "Zaloguj"}
        </button>
      </form>
    </div>
  );
}
