# cas-fee-p1
HSR CAS FEE Projekt1 NotePro von Gruppe3: Felix Adam + Martin Br�ndli

Zu beachten:
- Single-Applikation unter app/index.html
- ein Markup- File
- zwei DAL's (Data Abstraction Layer) f�r local Storage bzw Datenbank
- Jasmine-Tests unter app/test/SpecRunner.html (ACHTUNG: leert local Storage)

Special-Features:
- Popup beim Erledigen
- Popup bei abgelaufenen Tasks
- Ablaufende Tasks werden eingef�rbt
- 4 fancy color schemes zur Auswahl f�r individuelle visuelle Bed�rfnisse
- Alle Daten werden laufend vom Server gelesen (Daten immer aktuell)
- Formular-checker via Popup- Screen
- Animiertes visuelles Feedback
- Sortierung erfolgt beim zweiten Klick in die andere Richtung (ASC / DESC)

- Getestete Browser: Chrome Version 43, Firefox 38

Verbesserungsm�glichkeiten:
- Offline-Funktionalit�t (localStorage und nur auf Wunsch vom User eine Synchronisation mit dem Server)
- Einstellungen im localStorage speichern (Sort-Reihenfolge, Switch f�r erledigte Aufgaben)