# EduVue

Prosty projekt demonstracyjny aplikacji typu frontend/backend. Backend napisany w .NET 6, frontend w Vue.js (Vite) oraz baza danych PostgreSQL uruchamiane są w kontenerach Dockera.

## Uruchamianie

1. Zbuduj i uruchom kontenery:
   ```bash
   docker-compose up --build
   ```
2. Frontend będzie dostępny pod `http://localhost:3000`, backend pod `http://localhost:5000`.

## Struktura

- `backend/` – aplikacja ASP.NET minimal API z jednym endpointem `/courses` zwracającym listę kursów z bazy.
- `frontend/` – prosta aplikacja Vue wypisująca dane z `/courses`.
- `db/init.sql` – skrypt SQL tworzący tabelę `courses` i przykładowe dane.

