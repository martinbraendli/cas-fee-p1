# cas-fee-p1
HSR CAS FEE Projekt1 NotePro von Gruppe3: Felix Adam + Martin Brändli

Zu beachten:
- Single-Applikation unter app/index.html
- ein Markup- File
- zwei DAL's (Data Abstraction Layer) für local Storage bzw Datenbank
- Jasmine-Tests unter app/test/SpecRunner.html (ACHTUNG: leert local Storage)

Special-Features:
- Popup beim Erledigen
- Popup bei abgelaufenen Tasks
- Ablaufende Tasks werden eingefärbt
- 4 fancy color schemes zur Auswahl für individuelle visuelle Bedürfnisse
- Alle Daten werden laufend vom Server gelesen (Daten immer aktuell)
- Formular-checker via Popup- Screen
- Animiertes visuelles Feedback
- Sortierung erfolgt beim zweiten Klick in die andere Richtung (ASC / DESC)

- Getestete Browser: Chrome Version 43, Firefox 38

Verbesserungsmöglichkeiten:
- Offline-Funktionalität (localStorage und nur auf Wunsch vom User eine Synchronisation mit dem Server)
- Einstellungen im localStorage speichern (Sort-Reihenfolge, Switch für erledigte Aufgaben)