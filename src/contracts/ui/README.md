# UI Contract

This UI layer follows strict composition rules.

- UI components use the composition pattern
- Subcomponents live in separate files
- index.ts is the only public export
- Components are consumed as <Component.Sub />
- No alternative patterns are allowed
- Existing components define the standard
- Copy structure, do not invent new ones
