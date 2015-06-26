# cas-fee-p1
HSR CAS FEE Projekt1 NotePro von Gruppe3: Felix Adam + Martin Brändli

Zu beachten:
- Single-Applikation unter app/index.html
- Jasmine-Tests unter app/test/SpecRunner.html (ACHTUNG: leert local Storage)

Special-Features:
- Popup beim Erledigen
- Popup bei abgelaufenen Tasks
- Ablaufende Tasks werden eingefärbt
- Alle Daten werden laufend vom Server gelesen (Daten immer aktuell)
- Sortierung erfolgt beim zweiten Klick in die andere Richtung (ASC / DESC)

- Getestete Browser: Chrome Version 43, Firefox 38

Verbesserungsmöglichkeiten:
- Offline-Funktionalität (localStorage und nur auf Wunsch vom User eine Synchronisation mit dem Server)
- Einstellungen im localStorage speichern (Sort-Reihenfolge, Switch für erledigte Aufgaben)