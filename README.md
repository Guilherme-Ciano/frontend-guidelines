# @onaci/frontend-guidelines

> **Architecture enforcement through code** — A strict, opinionated package that enforces frontend standards, patterns, and architectural boundaries via ESLint rules and TypeScript, not documentation.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Zod](https://img.shields.io/badge/Zod-3.22-purple.svg)](https://zod.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-8.50-4B32C3.svg)](https://eslint.org/)

## 🎯 What This Is

This is **not a component library**. This is an **architecture enforcement package** that:

- **Enforces patterns through code** — ESLint rules prevent anti-patterns at compile-time
- **Defines architectural boundaries** — Strict import rules prevent architectural violations
- **Provides validation standards** — Zod-first validation with reusable schemas
- **Offers reference implementations** — Example components, hooks, and utilities following the enforced patterns

## 🚫 What This Prevents

This package is **restrictive by design**. It prevents:

- ❌ Direct `fetch()` or `axios` calls → Forces use of `api/httpClient` abstraction
- ❌ Inline `style` props → Forces use of design tokens and UI components
- ❌ Manual validation functions → Forces use of Zod schemas
- ❌ Raw Tailwind utility classes → Forces use of design system components
- ❌ Hooks outside `hooks/` directory → Enforces directory structure
- ❌ API calls in React components → Enforces separation of concerns
- ❌ Cross-boundary imports → Enforces architectural boundaries
- ❌ Importing from `contracts/` → Contracts are reference-only

## 🏗️ Architecture Enforcement

### ESLint Rules

The package exports strict ESLint configuration that enforces:

```js
// .eslintrc.js
const { eslintConfig } = require("@onaci/frontend-guidelines");

module.exports = eslintConfig;
```

**Enforced Rules:**

- ✅ No direct API calls (must use `api/` layer)
- ✅ No inline styles (must use design system)
- ✅ No manual validation (must use Zod schemas)
- ✅ Architectural boundaries (enforced imports)
- ✅ Hooks rules (React hooks best practices)
- ✅ Accessibility (a11y rules)
- ✅ Contracts are read-only (cannot import from `contracts/`)

### Architectural Boundaries

The package enforces strict boundaries between modules:

```text
ui/          → Can import: tokens, utils
hooks/        → Can import: tokens, utils, validation
api/          → Can import: utils, validation, schemas
state/        → Can import: utils, validation
validation/   → Can import: schemas, utils
schemas/      → Can import: nothing
tokens/       → Can import: nothing
contracts/    → READ-ONLY (cannot be imported)
```

## 📦 Installation

```bash
yarn add @onaci/frontend-guidelines
# or
npm install @onaci/frontend-guidelines
# or
pnpm add @onaci/frontend-guidelines
```

### Peer Dependencies

```json
{
  "react": "^18.2.0"
}
```

## 🚀 Quick Start

### 1. Configure ESLint

```js
// .eslintrc.js
const { eslintConfig } = require("@onaci/frontend-guidelines");

module.exports = eslintConfig;
```

### 2. Use Validation Schemas

```tsx
import {
  createUserSchema,
  emailSchema,
} from "@onaci/frontend-guidelines/schemas";
import { validateForm } from "@onaci/frontend-guidelines/validation";

const result = validateForm(createUserSchema, formData);
if (result.isValid) {
  // Use result.data (fully typed)
} else {
  // Handle result.fieldErrors
}
```

### 3. Use API Abstraction

```tsx
import { createHttpClient } from "@onaci/frontend-guidelines/api";

const api = createHttpClient({
  baseURL: "https://api.example.com",
  headers: { Authorization: "Bearer token" },
});

// All API calls must go through this abstraction
const user = await api.get<User>("/users/1");
```

### 4. Use State Management Factory

```tsx
import { createStore } from "@onaci/frontend-guidelines/state";

interface UserState {
  name: string;
  setName: (name: string) => void;
}

const useUserStore = createStore<UserState>({
  initialState: {
    name: "",
    setName: (name) => set({ name }),
  },
});
```

### 5. Use Custom Hooks

```tsx
import {
  useDebounce,
  useLocalStorage,
  useFormValidation,
} from "@onaci/frontend-guidelines/hooks";

// Form validation with Zod
const { values, errors, handleSubmit } = useFormValidation({
  schema: createUserSchema,
  onSubmit: async (data) => {
    // data is fully typed and validated
  },
});
```

## 📁 Project Structure

```
src/
├── api/              # HTTP client abstraction (enforced usage)
├── eslint/           # ESLint configuration (architecture enforcement)
├── hooks/            # Custom React hooks (enforced location)
├── schemas/          # Zod validation schemas (enforced validation)
├── state/            # Zustand store factory (enforced pattern)
├── tokens/           # Design tokens (enforced styling)
├── ui/               # Reference UI components (shadcn/ui pattern)
├── utils/            # Utility functions
├── validation/       # Validation utilities (Zod wrappers)
└── contracts/        # Reference contracts (READ-ONLY)
```

## 🎨 Design Tokens

Access design tokens programmatically:

```tsx
import { colors, spacing, typography } from "@onaci/frontend-guidelines/tokens";

// Use in your components (enforced, no inline styles)
const customStyle = {
  color: colors.primary[600],
  padding: spacing[4],
  fontSize: typography.fontSize.base,
};
```

## ✅ Validation & Schemas

### Common Schemas

```tsx
import {
  emailSchema,
  cpfSchema,
  cnpjSchema,
  phoneSchema,
  urlSchema,
  nonEmptyStringSchema,
} from "@onaci/frontend-guidelines/schemas";
```

### Custom Schemas

```tsx
import { z } from "zod";
import {
  emailSchema,
  nonEmptyStringSchema,
} from "@onaci/frontend-guidelines/schemas";

export const customSchema = z.object({
  name: nonEmptyStringSchema.min(2),
  email: emailSchema,
  age: z.number().min(18).max(100),
});

export type CustomInput = z.infer<typeof customSchema>;
```

### Validation Utilities

```tsx
import {
  validateForm,
  validateField,
  safeParse,
} from "@onaci/frontend-guidelines/validation";

// Form validation
const result = validateForm(schema, formData);

// Field validation
const error = validateField(schema, "email", value);

// Safe parsing
const parsed = safeParse(schema, data);
```

## 🪝 Available Hooks

- `useDebounce<T>(value: T, delay: number)` — Debounce values
- `useLocalStorage<T>(key: string, initialValue: T)` — LocalStorage with cross-tab sync
- `useMediaQuery(query: string)` — Responsive design helpers
- `useToggle(initialValue?: boolean)` — Boolean state management
- `useFormValidation<T>(options)` — Form validation with Zod integration

## 🔒 Contracts (Reference Only)

The `contracts/` directory contains **reference implementations** that demonstrate the enforced patterns. These are **READ-ONLY** and cannot be imported in runtime code.

**Purpose:**

- Show correct patterns
- Serve as examples for AI code generation
- Document expected component structure
- Enforce via ESLint (imports are blocked)

## 🧪 Type Safety

All exports are fully typed with TypeScript:

```tsx
import type {
  ButtonProps,
  CreateUserInput,
  ValidationResult,
  FormFieldError,
} from "@onaci/frontend-guidelines";
```

## 🛡️ How Enforcement Works

### At Compile Time

TypeScript and ESLint catch violations:

```tsx
// ❌ This will fail ESLint
fetch("/api/users"); // Error: Direct fetch calls are forbidden

// ✅ This is enforced
const api = createHttpClient({ baseURL: "..." });
await api.get("/api/users");
```

### At Runtime

The package provides the abstractions, but the real enforcement happens at development time through ESLint rules.

## 📚 Reference Components

The `ui/` directory contains **reference implementations** following shadcn/ui patterns. These demonstrate:

- Composition pattern (`Card.Header`, `Card.Footer`, etc.)
- Tailwind CSS usage (via design tokens)
- Accessibility best practices
- TypeScript patterns

**Note:** These are examples. Your project should implement its own components following these patterns.

## 🤝 Contributing

This is an internal package. Contributions must:

1. **Maintain strictness** — No optional patterns or configuration flags
2. **Enforce via code** — Add ESLint rules, not documentation
3. **Follow existing patterns** — Consistency is critical
4. **Pass all checks** — ESLint and TypeScript must pass
5. **Update contracts** — Reference implementations must be updated

## 🎓 Philosophy

> **"Make it impossible to do the wrong thing"**

This package doesn't suggest best practices—it **enforces** them. If something isn't defined here, it shouldn't be done. This restrictive approach ensures:

- **Consistency** across all projects
- **Quality** through enforced patterns
- **Maintainability** via clear boundaries
- **AI-friendly** code generation that follows standards automatically

## 📝 License

UNLICENSED — Internal use only

## 🔗 Related

- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [ESLint](https://eslint.org/)

---

**Built to enforce consistency, not to provide components.**
