# Expense Tracker

A simple expense tracking application built with Node.js, Express, SQLite, and React.

## Features
- Add expenses with amount and description
- Retry-safe expense creation using idempotency keys
- Persistent storage using SQLite
- Simple React frontend

## Tech Stack
- Backend: Node.js, Express, SQLite
- Frontend: React (Vite)

## How It Works
- Backend exposes REST APIs to create and fetch expenses
- Each create request includes an idempotency key to avoid duplicates
- Frontend uses fetch API to communicate with backend

## Running the Project

### Backend
```bash
cd backend
npm install
npm run dev
