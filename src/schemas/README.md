# Schemas de Validação

Este diretório contém todos os schemas Zod para validação de dados.

## Princípios

1. **DRY**: Schemas comuns devem ser reutilizados via `common.ts`
2. **Composição**: Schemas complexos devem ser compostos de schemas menores
3. **Tipos**: Sempre exporte os tipos inferidos com `z.infer<typeof schema>`
4. **Mensagens**: Todas as mensagens de erro devem ser claras e em português

## Estrutura

- `common.ts`: Schemas reutilizáveis (email, CPF, CNPJ, etc.)
- `user.ts`: Schemas relacionados a usuários
- Adicione novos arquivos por domínio (ex: `product.ts`, `order.ts`)

## Exemplo de Uso

```typescript
import { createUserSchema } from '@company/frontend-core/schemas';
import { validateForm } from '@company/frontend-core/validation';

const result = validateForm(createUserSchema, formData);
if (result.isValid) {
  // Usar result.data
} else {
  // Usar result.fieldErrors
}
```
