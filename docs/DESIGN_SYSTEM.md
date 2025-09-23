# Sistema de Design Unificado - Projeto ARCO

Este documento descreve o novo sistema de design implementado no projeto ARCO para padronizar componentes e garantir consistência em toda a aplicação.

## Visão Geral

O sistema de design unificado resolve os seguintes problemas:

1. **Duplicação de componentes** - Consolidação das versões "Regular", "Enhanced" e "Revised" em uma única implementação
2. **Inconsistência visual** - Padronização dos estilos e comportamentos dos componentes
3. **Fragmentação de código** - Organização lógica de componentes em categorias bem definidas
4. **Difícil manutenção** - Redução do esforço para atualizar e manter componentes

## Estrutura de Componentes

Os componentes foram reorganizados nas seguintes categorias:

### 1. Componentes de UI (`src/components/ui/`)

Componentes básicos de interface:

- `Typography.tsx` - Sistema tipográfico (Heading1, Heading2, BodyLarge, etc.)
- `Button.tsx` - Sistema de botões com variantes
- `Card.tsx` - Componente de cartão com variações
- `Input.tsx` - Campos de entrada padronizados
- `Select.tsx` - Seleção de opções

### 2. Componentes de Layout (`src/components/layout/`)

Componentes estruturais para definir o layout:

- `Section.tsx` - Contêiner para seções de página
- `Grid.tsx` - Sistema de grid para layouts responsivos
- `NavBar.tsx` - Barra de navegação
- `Footer.tsx` - Rodapé

### 3. Seções de Página (`src/components/sections/`)

Componentes maiores que formam seções completas:

- `Hero.tsx` - Banner principal (consolidado de HeroARCO/Enhanced/Revised)
- `CTA.tsx` - Chamadas para ação (consolidado de CTA/Enhanced/Revised)
- `ProcessSection.tsx` - Seção de processos
- `CaseStudies.tsx` - Estudos de caso

### 4. Componentes de Funcionalidades (`src/components/features/`)

Componentes específicos de funcionalidades:

- `DesignSystem.tsx` - Re-exportação unificada do sistema de design
- `AnalyticsProvider.tsx` - Provedor de análises
- `LanguageSelector.tsx` - Seletor de idioma

## Como Usar o Sistema de Design

### Importação de Componentes Específicos

```tsx
// Importação direta dos componentes específicos
import { Button } from '@/components/ui/Button';
import { Heading1, BodyLarge } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';

function MyComponent() {
  return (
    <Section>
      <Heading1>Título Principal</Heading1>
      <BodyLarge>Texto introdutório.</BodyLarge>
      <Button>Ação</Button>
    </Section>
  );
}
```

### Importação Unificada (via DesignSystem)

```tsx
// Importação unificada via sistema de design
import { Heading1, Button, BodyLarge, Section } from '@/components/features/DesignSystem';

function MyComponent() {
  return (
    <Section>
      <Heading1>Título Principal</Heading1>
      <BodyLarge>Texto introdutório.</BodyLarge>
      <Button>Ação</Button>
    </Section>
  );
}
```

## Utilitários do Sistema de Design

### Função `cn` para Classes CSS

A função `cn` permite combinar classes do Tailwind de forma segura, evitando conflitos:

```tsx
import { cn } from '@/lib/utils/cn';

function MyComponent({ className }) {
  return (
    <div
      className={cn(
        'base-class',
        'conditional-class',
        className // classes passadas como propriedades
      )}
    >
      Conteúdo
    </div>
  );
}
```

## Migração e Compatibilidade

Para facilitar a migração gradual, foram criados arquivos de alias que redirecionam importações antigas para os novos componentes consolidados. Isso permite que o código existente continue funcionando sem quebrar, enquanto novos desenvolvimentos podem utilizar o novo sistema.

## Extensão do Sistema de Design

Para adicionar novos componentes ao sistema de design:

1. Crie o componente na categoria apropriada
2. Siga os padrões de estilização e nomenclatura
3. Utilize a função `cn` para mesclar classes
4. Exporte o componente no arquivo `DesignSystem.tsx`

## Recomendações para Desenvolvedores

1. **Preferir componentes do sistema de design** ao invés de criar novos
2. **Estender componentes existentes** quando necessário novas variações
3. **Manter a consistência visual** utilizando as variáveis de cores e espaçamentos
4. **Documentar decisões de design** ao adicionar ou modificar componentes

---

_Este sistema de design está em evolução contínua. Contribuições e melhorias são bem-vindas._
