"use client";

import { useState } from "react";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Jeśli błędy → nie wysyłamy
    if (emailError || passwordError) return;

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const isDisabled =
    !email || !password || emailError !== "" || passwordError !== "";

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
          disabled={isDisabled}
          className={`w-full py-2 rounded text-white ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
}
