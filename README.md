# LoginBox

Demo aplikacji pokazujące jak zbudować system logowania od zera w Next.js 16 — bez NextAuth, Clerk ani żadnej innej gotowej biblioteki auth. Chodziło o to, żeby zobaczyć co tak naprawdę dzieje się pod spodem.

## Co tu jest

Pełny flow: rejestracja, logowanie, sesje, reset hasła, wylogowanie. Hasła hashowane bcryptem, sesja trzymana w HttpOnly cookie, ochrona stron przez middleware.

Stack: Next.js 16 (App Router), React 19, SQLite, TypeScript, Tailwind CSS 4.

## Uruchomienie

```bash
npm install
npm run dev
```

Baza danych tworzy się automatycznie przy pierwszym uruchomieniu, nie trzeba nic konfigurować.

## Kilka rzeczy wartych uwagi

Reset hasła w normalnej aplikacji wysyłałby token emailem — tutaj token pojawia się na ekranie, żeby nie dokładać zależności od zewnętrznego serwisu. Podobnie z rate limitingiem i pełną ochroną CSRF — świadomie pominięte, żeby nie zaciemniać głównego tematu.

SQLite działa lokalnie bez żadnej konfiguracji, ale do produkcyjnego deploymentu trzeba by wymienić na Postgres.
