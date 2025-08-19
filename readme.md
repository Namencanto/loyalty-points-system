# Loyalty Points – Usage

A simple loyalty points manager in TypeScript.
It supports both CLI REPL and a TUI (text UI).

---

## ⚙️ Tech Stack

- Node.js (CommonJS)
- TypeScript
- class-validator (validation of commands)
- blessed (terminal-based UI / TUI)

---

## 🧠 Logic Overview

- **Service (`LoyaltyService`)**
  Keeps customer balances in memory (Map).
  Provides `earn(customerId, points)` and `redeem(customerId, points)`.

- **Controller (`LoyaltyController`)**
  Receives validated commands (`CommandDTO`).
  Calls the service and wraps the result into a `ResponseDTO`.

- **Validation (`CommandDTO`)**
  Uses `class-validator` decorators to enforce rules:
  - `op` must be `earn` or `redeem`
  - `customerId` must be non-empty string
  - `points` must be integer >= 1

- **CLI (`processTokens`, `startRepl`)**
  - Tokenizes input
  - Parses commands
  - Validates and calls the controller
  - Prints results using `printers`

- **TUI (`tui.ts` with blessed)**
  Provides a form-based interface:
  - Radio buttons for `earn` / `redeem`
  - Input fields for `customerId` and `points`
  - Output log panel

---

## 🚀 Setup

Install dependencies:
npm install

Build the project:
npm run build

---

## ▶️ Run

Start REPL:
npm start

Run single command:
npm start -- earn alice 10

Run the text UI:
npm run tui

---

## 📜 Commands

earn <customerId> <points>
redeem <customerId> <points>
help
exit

---

## 💡 Example

> earn bob 5
Earned 5 points for bob. Balance: 5 points.

> redeem bob 3
Redeemed 3 points for bob. Balance: 2 points.
Warning: Customer bob has a low balance: 2 points.
