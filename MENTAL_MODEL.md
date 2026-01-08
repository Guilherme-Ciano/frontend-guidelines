# MENTAL MODEL — FOR AI ONLY

You are working in a project governed by frontend contracts.

This repository defines:

- HOW code must be structured
- NOT code to be reused

## Core Principles

- Contracts are READ-ONLY
- Examples are illustrative, not reusable
- Patterns must be reproduced locally
- Never invent new patterns
- Consistency overrides creativity

## Folder Semantics

contracts/
= Constitution
= Reference only
= Never write here
= Never import from here

src/
= Living code
= Only place where new code is created
= Must follow contracts

examples/
= Canonical structure
= Do not copy code
= Copy structure only

## Card Example

Card is NOT a component to be reused.

Card exists to define:

- File boundaries
- Composition pattern
- Export strategy
- Responsibility split

All UI components must follow the same structure.

## Writing Rules

Before writing code:

1. Read contracts
2. Identify the canonical example
3. Reproduce the structure in src/
4. Use local implementation
5. Never modify contracts

If unsure:

- Prefer consistency over optimization
- Prefer structure over abstraction
- Prefer explicitness over cleverness

## Forbidden Actions

- Creating files inside contracts/
- Modifying examples
- Importing code from contracts
- Introducing alternative patterns

Violations mean incorrect output.
