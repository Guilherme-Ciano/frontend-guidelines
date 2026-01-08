module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },

  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "import",
    "boundaries",
    "jsx-a11y",
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],

  settings: {
    react: { version: "detect" },

    "boundaries/elements": [
      { type: "ui", pattern: "src/ui/*" },
      { type: "hooks", pattern: "src/hooks/*" },
      { type: "api", pattern: "src/api/*" },
      { type: "state", pattern: "src/state/*" },
      { type: "tokens", pattern: "src/tokens/*" },
      { type: "utils", pattern: "src/utils/*" },

      // 🔒 NON-RUNTIME
      { type: "contracts", pattern: "src/contracts/*" },
    ],
  },

  rules: {
    /* ============================
       🚫 CONTRACTS — READ ONLY
    ============================ */
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["**/contracts/**"],
            message:
              "Contracts are reference-only. Do NOT import code from contracts.",
          },
          {
            group: ["axios", "fetch"],
            message: "Use api/httpClient only.",
          },
        ],
      },
    ],

    /* ============================
       🧱 ARCHITECTURE BOUNDARIES
    ============================ */
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          { from: "ui", allow: ["tokens", "utils"] },
          { from: "hooks", allow: ["tokens", "utils"] },
          { from: "state", allow: ["utils"] },
          { from: "api", allow: ["utils"] },
          { from: "tokens", allow: [] },

          // contracts import NOTHING
          { from: "contracts", allow: [] },
        ],
      },
    ],

    /* ============================
       🪝 HOOKS — STRICT
    ============================ */
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",

    /* ============================
       🎨 STYLING — ZERO FREEDOM
    ============================ */
    "react/forbid-dom-props": ["error", { forbid: ["style"] }],

    /* ============================
       🧠 CODE QUALITY
    ============================ */
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error",

    "import/no-default-export": "off",

    "max-lines-per-function": ["warn", { max: 50 }],
    "max-lines": ["error", { max: 200 }],
    complexity: ["warn", 10],

    /* ============================
       ♿ ACCESSIBILITY
    ============================ */
    "jsx-a11y/no-static-element-interactions": "error",
    "jsx-a11y/click-events-have-key-events": "error",

    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },

  env: {
    browser: true,
    node: true,
    es2020: true,
  },
};
