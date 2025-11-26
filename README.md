# 🔐 Next.js Auth + SQLite (local only)

To jest prosta aplikacja demonstracyjna prezentująca, jak zbudować **system logowania, rejestracji i resetu hasła** w Next.js 14/15 z wykorzystaniem **SQLite** działającego lokalnie.

Projekt został stworzony jako materiał szkoleniowy.

---

## 🚀 Funkcje aplikacji

### ✔ Logowanie i rejestracja użytkowników
- hasła są bezpiecznie hashowane (`bcryptjs`)
- walidacja po stronie klienta i serwera
- po zalogowaniu tworzona jest **sesja httpOnly** zapisana w SQLite

### ✔ Sesje httpOnly + ochrona stron
- cookie `session` jest:
  - httpOnly
  - SameSite=Lax
  - Path=/
- zapisane sesje znajdują się w tabeli `sessions`
- strony takie jak `/protected` działają tylko po wykryciu aktywnej sesji

### ✔ Resetowanie hasła
- generowanie jednorazowego tokenu
- zapis w tabeli `password_resets`
- formularz ustawiania nowego hasła
- po użyciu token jest kasowany

### ✔ Lista użytkowników `/users`
- widok wszystkich kont w systemie
- możliwość usuwania użytkowników
- usuwanie działa wraz z czyszczeniem sesji powiązanych z użytkownikiem

### ✔ Wylogowanie
- usuwa cookie `session`
- usuwa rekord sesji z bazy
- automatyczny redirect na stronę główną (`/`)

---

## ⚠️ Ważne — SQLite działa **tylko lokalnie**


