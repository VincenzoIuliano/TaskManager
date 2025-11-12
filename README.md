# Task Manager React

Un’applicazione web leggera per gestire le tasks, sviluppata in React con Context API.

## Funzionalità principali
- Aggiunta, modifica e rimozione delle tasks
- Ricerca in tempo reale con debounce
- Ordinamento dinamico per titolo, stato e data di creazione
- Colorazione delle tasks in base allo stato:
  - 🟡 To do → #fbbf24
  - 🔵 Doing → #3b82f6
  - 🟢 Done → #10b981
- Design pulito e responsive

## Stack
- React + Context API
- CSS modulare e animazioni leggere

## Nota bene
Per far funzionare il progetto, è necessario avere un server locale che esponga le tasks tramite API REST.

## Installazione
```bash
git clone [link-repo]
cd [nome-cartella]
npm install
npm start
