This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## PHP auth backend (lokalnie)

W repozytorium znajduje się prosty, lokalny backend w PHP w `app/header/` (pliki: `db.php`, `register.php`, `login.php`, `logout.php`, `me.php`). Poniżej minimalne kroki uruchomienia i wskazówki:

1) Uruchom wbudowany serwer PHP z katalogu projektu:

```bash
# serwuje pliki pod http://localhost:8000
php -S localhost:8000 -t .
```

2) Baza (SQLite) — utwórz plik i zastosuj migrację:

```bash
# utwórz plik DB i załaduj migrację
# (w katalogu projektu)
touch database.sqlite
sqlite3 database.sqlite < migrations/create_users.sql
```

Dla MySQL utwórz bazę i uruchom SQL z `migrations/create_users.sql` (sekcja MySQL w pliku). Ustaw wówczas zmienne środowiskowe:

- `DB_TYPE=mysql`
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`

Możesz też ustawić `DB_DSN` bezpośrednio.

3) Upewnij się, że frontend wysyła żądania do odpowiedniego miejsca:

- Jeśli PHP działa na tym samym hoście/porcie co frontend, relatywne ścieżki (`login.php`, `register.php`, `me.php`) będą działać.
- Jeśli PHP działa na innym porcie (np. `http://localhost:8000`), zaktualizuj URL w `app/header/header.tsx` (np. `http://localhost:8000/app/header/login.php`) lub skonfiguruj proxy/rewrites w `next.config.js`.

4) Bezpieczeństwo (ważne dla produkcji):

- Użyj HTTPS i ustaw ciasteczka sesji z `Secure` i `HttpOnly`.
- Ogranicz dozwolone pochodzenie w CORS (nie używaj `*` w prod).
- Dodaj rate limiting, zabezpieczenia CSRF, walidację i logowanie zdarzeń.

---
