# Loyalty Points – Usage

A simple loyalty points manager in TypeScript.  
It supports both CLI REPL and a TUI (text UI).

---

## Setup

Install dependencies:
npm install

Build the project:
npm run build

---

## Run

Start REPL:
npm start

Run single command:
npm start -- earn alice 10

Run the text UI:
npm run tui

---

## Commands

earn <customerId> <points>
redeem <customerId> <points>
help
exit

---

## Example

> earn bob 5
Earned 5 points for bob. Balance: 5 points.

> redeem bob 3
Redeemed 3 points for bob. Balance: 2 points.
Warning: Customer bob has a low balance: 2 points.
