"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

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

  const validateConfirm = (value: string) => {
    if (value !== password) {
      setConfirmError("Hasła nie są zgodne");
    } else {
      setConfirmError("");
    }
  };

  // ------- Obsługa rejestracji -------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccess(false);

    if (emailError || passwordError || confirmError) return;

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Błąd rejestracji");
      } else {
        setSuccess(true);
        setEmail("");
        setPassword("");
        setConfirm("");
      }
    } catch {
      setErrorMessage("Błąd połączenia z serwerem");
    }

    setLoading(false);
  };

  const isDisabled =
    !email ||
    !password ||
    !confirm ||
    emailError !== "" ||
    passwordError !== "" ||
    confirmError !== "";

  return (
    <div className="w-full p-6 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Rejestracja</h2>

      {success && (
        <p className="mb-4 p-2 bg-green-100 text-green-800 rounded text-center">
          ✔️ Konto utworzone! Możesz się zalogować.
        </p>
      )}

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
                validateConfirm(confirm);
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

        {/* Confirm password */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Powtórz hasło
          </label>
          <input
            type="password"
            className={`w-full border px-3 py-2 rounded ${
              confirmError ? "border-red-500" : "border-gray-300"
            }`}
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              validateConfirm(e.target.value);
              setErrorMessage("");
            }}
            required
          />
          {confirmError && (
            <p className="text-red-600 text-sm mt-1">{confirmError}</p>
          )}
        </div>

        {/* Register button */}
        <button
          type="submit"
          disabled={isDisabled || loading}
          className={`w-full py-2 rounded text-white font-medium transition ${
            isDisabled || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Rejestruję..." : "Utwórz konto"}
        </button>

        {/* Link do logowania */}
        <p className="text-sm text-center mt-2">
          Masz już konto?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Zaloguj się
          </Link>
        </p>
      </form>
    </div>
  );
}
