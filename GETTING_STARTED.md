# Getting Started — Frontend Guidelines & Contracts

This repository exists to solve a modern frontend problem:

> **How do we keep frontend code consistent, scalable, and predictable when humans and AI write code together?**

This is **not** a component library.  
This is **not** a design system.  
This is **not** meant to be imported and reused directly.

This repository defines **contracts**, not implementations.

---

## 🧠 The Problem We’re Solving

Modern frontend teams face three recurring challenges:

### 1. Pattern Drift

Even with good developers:

- Components slowly diverge
- Each new feature invents a “slightly better” pattern
- Consistency erodes over time

### 2. Over-Abstraction or Chaos

Teams usually fall into one of two traps:

- ❌ Heavy design systems that slow development
- ❌ Total freedom that creates unmaintainable UI

### 3. AI Without Guardrails

AI tools (Cursor, Copilot, ChatGPT):

- Generate valid code
- But invent patterns
- Ignore architectural intent
- Optimize locally, not systemically

**Without constraints, AI accelerates inconsistency.**

---

## 🎯 The Core Idea

Instead of sharing **code**, we share **rules**.

Instead of exporting components, we define:

- Structural contracts
- Composition rules
- Anti-patterns
- Canonical examples

> **Applications implement their own UI.  
> This repo teaches _how_ they should do it.**

---

## 🧱 What This Repository Is

✅ A **source of truth**  
✅ A **contract registry**  
✅ A **canonical reference**  
✅ A **tool to align humans and AI**

---

## 🚫 What This Repository Is NOT

❌ A component library  
❌ A shared UI package  
❌ A runtime dependency  
❌ Something to import components from

If you are trying to `import Card from here`, you are using it wrong.

---

## 🧩 Key Concepts

### Contracts

Contracts define **how things must be built**, not **what must be reused**.

They live in:

```

src/contracts/

```

They are:

- Read-only
- Reference-only
- Never imported
- Never modified by applications

---

### Canonical Examples

Examples (like `Card`) are **not reusable components**.

They exist to answer:

> “What does a correct component look like?”

Examples:

- Define folder structure
- Enforce composition patterns
- Show responsibility boundaries

They live in:

```

src/contracts/ui/examples/

```

---

### Runtime Code

Some things **are meant to be reused**:

- tokens
- schemas
- validation
- api abstractions
- shared hooks

These are exported normally and can be imported by applications.

---

## 🧠 How AI Is Aligned

This repository is designed so that AI tools:

- Read contracts
- Learn patterns
- Reproduce structures
- Stop inventing abstractions

This is achieved through:

- Explicit folder semantics
- ESLint enforcement
- Canonical examples
- Cursor pre-prompts

---

## 🚀 Using This in a New Project (Step-by-Step)

### 1️⃣ Create your project (example: Vite + React)

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
git init
git add .
git commit -m "init project"
```

---

### 2️⃣ Add this repository as a contracts module

**Recommended (Git Submodule):**

```bash
git submodule add https://github.com/Guilherme-Ciano/frontend-guidelines contracts/frontend-guidelines
```

Alternative (simpler):

```bash
git subtree add --prefix=contracts/frontend-guidelines \
https://github.com/Guilherme-Ciano/frontend-guidelines main --squash
```

📌 The `contracts/` folder must live **outside `src/`**.

---

### 3️⃣ Do NOT import from contracts

Contracts are:

- Read-only
- Reference-only
- Never part of the runtime

Applications must **reproduce patterns locally**.

---

### 4️⃣ Set up ESLint enforcement

Install required dependencies:

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import \
eslint-plugin-boundaries eslint-plugin-jsx-a11y
```

Use the ESLint rules provided by this repository
(or copy them directly if you prefer full decoupling).

These rules:

- Block imports from `contracts/`
- Enforce architectural boundaries
- Prevent pattern drift

---

### 5️⃣ Configure Cursor (AI alignment)

Create `.cursor/rules.md` in your project:

```md
This project follows frontend contracts.

Reference:
contracts/frontend-guidelines/src/contracts/ui

Rules:

- Contracts are read-only
- Never write inside contracts
- Do not import from contracts
- Reproduce patterns locally in src/
- Follow Card as the canonical UI example
```

This ensures AI:

- Reads before writing
- Writes only inside `src/`
- Reproduces structure instead of copying code

---

## 🧪 How to Create a New Component

When creating UI components:

1. Read the UI contract
2. Inspect the Card example
3. Copy the structure
4. Implement locally in `src/ui`
5. Never invent a new pattern

**Example prompt to AI:**

```
Create a Modal component in src/ui/modal following the UI contracts.
Do not modify or write inside contracts.
```

---

## 🧠 Mental Model (Important)

| Concept    | Meaning                   |
| ---------- | ------------------------- |
| contracts/ | Constitution              |
| examples   | Jurisprudence             |
| src/       | Living code               |
| ESLint     | Law enforcement           |
| AI         | Apprentice, not architect |

---

## 🔒 Enforcing Contracts in Projects

To fully benefit from this repository, projects **must** enforce the contracts at two levels:

1. **Physically** (Git)
2. **Cognitively** (AI tools)

Both are mandatory.

---

## 🔐 Pre-commit Hook (Mandatory)

Projects must block any attempt to modify files inside `contracts/`.

Create the following file in your project:

📄 `.git/hooks/pre-commit`

```bash
#!/bin/sh

# Prevent any change inside contracts/
CHANGED_CONTRACTS=$(git diff --cached --name-only | grep '^contracts/')

if [ -n "$CHANGED_CONTRACTS" ]; then
  echo "❌ Commit blocked."
  echo ""
  echo "Contracts are READ-ONLY."
  echo "The following files were modified:"
  echo "$CHANGED_CONTRACTS"
  echo ""
  echo "Implement changes inside src/, never inside contracts/."
  exit 1
fi

exit 0
```

Then make it executable:

```bash
chmod +x .git/hooks/pre-commit
```

📌 **Result**

- Humans cannot commit changes to contracts
- AI cannot accidentally modify contracts
- Contracts remain immutable

---

## 🤖 Cursor — Global Project Prompt (Mandatory)

AI tools must be explicitly instructed to treat contracts as **read-only reference**.

Create the following file in your project root:

📄 `.cursor/rules.md`

```md
This project follows company frontend contracts.

Reference:
contracts/frontend-guidelines/

Rules:

- Contracts are READ-ONLY
- Never create, edit, or delete files in contracts/
- Never import code from contracts/
- Use examples only as structural reference
- Reproduce patterns locally inside src/

UI:

- Follow the Card example structure
- Use composition pattern
- Split responsibilities by file
- Do not invent new patterns

If there is conflict:

- Follow contracts over local preference
- Consistency > cleverness
```

📌 **Result**

- AI reads before writing
- AI never writes inside contracts
- UI patterns stay consistent
- No design system creep

---

## 🧠 Why Both Are Required

| Mechanism       | Protects Against                    |
| --------------- | ----------------------------------- |
| Pre-commit hook | Accidental or manual contract edits |
| Cursor rules    | AI-generated structural drift       |

Using only one is insufficient.

---

## 🚨 Common Failure Mode

If you see:

- Components being created inside `contracts/`
- AI importing example components
- Pattern divergence across UI

Then:

- The pre-commit hook is missing
- Or `.cursor/rules.md` is missing
- Or both

---

## 🔒 Final Rule

> **Consistency beats creativity.
> Structure beats cleverness.
> Contracts beat opinions.**

If something conflicts with the contract:

- Fix the implementation
- Never weaken the contract

---

## ✨ Outcome

By using this system, teams achieve:

- Predictable UI
- Faster onboarding
- Safe AI-assisted development
- Zero pattern drift
- Scalable frontend architecture

This repository exists so that **the codebase gets better over time — not noisier**.
