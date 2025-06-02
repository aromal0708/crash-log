# 🚀 Crash Logg – Phase 1: System Foundation & Architecture

This document outlines the foundational work completed during Phase 1 of the Crash Logging Platform. This phase focused on designing the architecture, defining core entities, and preparing the infrastructure for scalable development.

---

## 🧱 Project Objective

Build a production-grade crash/error logging platform that allows developers to track and analyze runtime errors across their projects in real-time—similar to Sentry, Datadog, or LogRocket.

---

## 📐 Architecture & Design

- Structured as a modular monorepo:
  - Separate folders for root, server logic, and reusable libraries
  - TypeScript-based codebase

- Defined a long-term roadmap:
  - Support both frontend and backend logging
  - Freemium SaaS model
  - Developer dashboard with observability features

---

## 🗃️ Folder Structure

crash-log/
├── lib/ # Logging utility (console.text, file logger)
├── middleware/ # Middleware (e.g., for logging, auth)
├── server/ # Express API backend
├── types/ # Global TypeScript declarations
├── logs/ # Local log output directory
├── index.ts # Root entry (optional setup)
└── README.md # Documentation

yaml
Copy
Edit

---

## 🧩 Core Entities Defined

1. 👤 User (Developer)
   - Can create multiple projects
   - Each project has its own logging configuration

2. 📁 Project
   - Linked to a user
   - Contains a unique API key
   - Aggregates logs specific to that project

3. ❗ Error
   - Stores production error data
   - Includes: message, timestamp, project reference, route, etc.

---

## ⚙️ Logging System (lib/logger)

- Built a lightweight custom logger:
  - Logs saved locally to /logs directory
  - Timestamped format with route and message
  - One file per day per environment
- Added console.text(error) for standardized error logging
  - Extended via declaration merging in global.d.ts

Example log line:
[2025-05-14 10:03:01] [GET] /test-error -> I don't care about this error

yaml
Copy
Edit

---

## 🧪 Local Testing

- Created a test route /test-error for demo logging
- Triggered various simulated errors to verify:
  - Logging consistency
  - File output correctness
  - Logging to console and file simultaneously

---

## 📄 TypeScript Setup

- tsconfig.json includes:
  - Target: ES2020, Module: CommonJS
  - Path aliases for @lib, @server, etc.
  - Strict mode, esModuleInterop
  - Declarations and baseUrl
- global.d.ts:
  - Custom type declaration for console.text()

---

## 🔐 API Key Strategy (Planned)

- Decided on: One API key per project
- Reasoning:
  - Easier rotation, granular access control, scalable management

---

## 📈 Business Direction (Explored)

- Compared with existing SaaS tools:
  - Sentry, Datadog, Windsor
- Identified MVP scope:
  - Logging
  - Error aggregation
  - User and project management
- Discussed monetization and freemium model strategy

---

## ✅ Phase Summary

Laid the groundwork for a scalable crash logging platform. Core infrastructure, design principles, and local logging utilities are implemented and ready for external ingestion and API interaction.

---

## ⏭️ Next Step: Phase 2 – Error Ingestion & API Design

- Build ingestion routes (POST /errors)
- MongoDB models for User, Project, Error
- API key middleware
- Project creation & error storage