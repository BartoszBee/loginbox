"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  // ------- Walidacja -------
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

  // ------- Obsługa logowania -------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccess(false);

    if (emailError || passwordError) return;

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Błąd logowania");
      } else {
        setSuccess(true);
        router.push("/protected");
      }
    } catch {
      setErrorMessage("Błąd połączenia z serwerem");
    }

    setLoading(false);
  };

  const isDisabled =
    !email || !password || emailError !== "" || passwordError !== "";

  return (
    <div className="w-full p-6 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Logowanie</h2>

      {/* komunikat success */}
      {success && (
        <p className="mb-4 p-2 bg-green-100 text-green-800 rounded text-center">
          ✔️ Zalogowano pomyślnie!
        </p>
      )}

      {/* komunikat error */}
      {errorMessage && (
        <p className="mb-4 p-2 bg-red-100 text-red-800 rounded text-center">
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className={`w-full border px-3 py-2 rounded ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
              setErrorMessage("");
            }}
            required
          />
          {emailError && (
            <p className="text-red-600 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">Hasło</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full border px-3 py-2 rounded-l ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
                setErrorMessage("");
              }}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="border border-gray-300 px-3 rounded-r bg-gray-100 text-sm"
            >
              {showPassword ? "Ukryj" : "Pokaż"}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-600 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Przycisk logowania */}
        <button
          type="submit"
          disabled={isDisabled || loading}
          className={`w-full py-2 rounded text-white font-medium transition ${
            isDisabled || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logowanie..." : "Zaloguj się"}
        </button>

        {/* Link do resetu hasła */}
        <div className="flex justify-between text-sm mt-2">
          <Link href="/reset" className="text-blue-600 hover:underline">
            Zapomniałeś hasła?
          </Link>
          <Link href="/register" className="text-blue-600 hover:underline">
            Nie masz konta?
          </Link>
        </div>
      </form>
    </div>
  );
}
