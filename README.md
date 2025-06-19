# EduVue

Prosty projekt demonstracyjny aplikacji typu frontend/backend. Backend napisany w .NET 6, frontend w Vue.js (Vite) oraz baza danych PostgreSQL uruchamiane są w kontenerach Dockera.

## Funkcje

- Interfejs użytkownika w Vue.js z wykorzystaniem Tailwind CSS
- Tłumaczenia w języku polskim i angielskim (vue-i18n)
- Integracja z Firebase dla przechowywania danych kursów
- Responsywny design
- Tryb ciemny/jasny
- Filtrowanie i wyszukiwanie kursów

## Uruchamianie w trybie developerskim

1. Uruchom usługi z obserwacją zmian:
   ```bash
   docker-compose up
   ```
   Kontenery backendu i frontendu korzystają z `dotnet watch` oraz `vite`, dzięki czemu zmiany w kodzie są od razu widoczne.
2. Frontend będzie dostępny pod `http://localhost:3000`, backend pod `http://localhost:5001`, a Expo DevTools dla aplikacji mobilnej na `http://localhost:19000`.
3. Aplikację mobilną możesz też uruchomić lokalnie:
   ```bash
   cd mobile
   npx expo start
   ```

## Struktura

- `backend/` – aplikacja ASP.NET minimal API z jednym endpointem `/courses` zwracającym listę kursów z bazy.
- `frontend/` – aplikacja Vue.js z interfejsem użytkownika, tłumaczeniami i integracją Firebase.
- `mobile/` – aplikacja React Native (Expo) uruchamiana równocześnie z pozostałymi usługami.
- `db/init.sql` – skrypt SQL tworzący tabelę `courses` i przykładowe dane.

## Technologie

- Frontend:
  - Vue.js 3
  - Vite
  - Tailwind CSS
  - vue-i18n
  - Firebase
  - Pinia (state management)
- Backend:
  - .NET 6
  - PostgreSQL
  - Dapper
- DevOps:
  - Docker
  - Docker Compose
