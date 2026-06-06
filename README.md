# AI Chatbot

Experimental personal AI assistant prototype built with Next.js, TypeScript, LangChain, OpenAI, and PostgreSQL-backed vector memory.

The project explores two interfaces for the same assistant: a browser chat UI and a terminal chat mode. The assistant can retrieve saved memories from a vector store and use them as context when answering.

## Features

- Next.js chat UI with server actions
- Terminal chat mode with streamed responses
- LangChain + OpenAI chat model integration
- PostgreSQL vector store for memory retrieval
- Memory saving from terminal conversations
- Tailwind-based chat interface

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- LangChain
- OpenAI API
- PostgreSQL
- TypeORM vector store

## Project Status

This is a prototype, not a finished product.

Current focus:

- assistant memory
- vector search
- web + terminal interaction models

Planned ideas:

- reminders
- file loading
- authentication
- Google Calendar integration
- Whoop API integration

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create `.env.local`:

```bash
OPENAI_API_KEY=""

DB_HOST="localhost"
DB_PORT=5432
DB_USERNAME=""
DB_PASSWORD=""
DB_DATABASE=""
```

Run the web app:

```bash
pnpm dev
```

Run the terminal assistant:

```bash
pnpm terminal:dev
```

## Scripts

```bash
pnpm dev           # Start Next.js development server
pnpm terminal:dev  # Start terminal assistant
pnpm build         # Build production app
pnpm start         # Start production app
pnpm lint          # Run Next.js linting
```

## Notes

The assistant prompt and model configuration live in `services/langchain/langchain.service.ts`.

Memory storage and retrieval are handled in `terminal/vectorStore.ts`.
