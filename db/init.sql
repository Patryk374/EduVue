CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    nazwa VARCHAR(255) NOT NULL,
    dlugosc_trwania VARCHAR(100) NOT NULL,
    sugerowany_przedzial_wiekowy VARCHAR(100) NOT NULL,
    szczegoly TEXT NOT NULL
);

INSERT INTO courses (nazwa, dlugosc_trwania, sugerowany_przedzial_wiekowy, szczegoly) VALUES
    ('Podstawy programowania', '4 tygodnie', '12-16 lat', 'Wprowadzenie do podstaw programowania w języku Python.'),
    ('Zaawansowany JavaScript', '6 tygodni', '16-18 lat', 'Kurs omawiający zaawansowane koncepty JavaScriptu w praktyce.'),
    ('Projektowanie stron WWW', '5 tygodni', '14-17 lat', 'Tworzenie atrakcyjnych i responsywnych stron internetowych.');
