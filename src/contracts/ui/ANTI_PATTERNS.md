# UI Anti-Patterns

The following patterns are forbidden.

## Structure

❌ Single-file components with multiple responsibilities  
❌ Header / Body / Footer declared in the same file  
❌ Exporting subcomponents individually  
❌ Multiple public entry points per component

## Composition

❌ <Header />, <Body /> used without parent component  
❌ Passing layout responsibilities to subcomponents  
❌ Using children for structural control

## Styling

❌ Inline styles  
❌ Arbitrary className passthrough  
❌ Utility class composition outside UI layer

## Abstraction

❌ BaseComponent, Wrapper, Container components  
❌ Extending UI components for layout or spacing  
❌ Over-configurable components

## Organization

❌ Creating new patterns when one already exists  
❌ Breaking folder structure for convenience  
❌ Introducing exceptions without refactoring existing components
