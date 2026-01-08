# Contract Enforcement

These contracts are enforced by convention and tooling.

## Hard Rules

- Contracts must never be imported
- Examples are illustrative only
- Runtime code must reproduce structure, not reuse code
- ESLint enforces contract boundaries

## Violations

Any of the following is a violation:

- Importing from contracts/
- Re-exporting example components
- Creating alternative composition patterns
- Introducing exceptions without refactoring existing code

## Authority

Contracts override:

- Personal preference
- Framework defaults
- External library examples

If a contract conflicts with implementation:

- Fix the implementation
- Never weaken the contract
