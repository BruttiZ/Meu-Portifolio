# Arquitetura da engine

```text
visitante
   ↓ pergunta + memória curta
API /api/chat
   ├─ validação e limites
   ├─ easter eggs determinísticos
   ├─ classificação de intenção/profundidade
   ├─ recuperação de páginas Markdown
   ├─ montagem de contexto e regras
   └─ narrador Gemini
          ↓
 resposta + sugestões de exploração
```

## Biblioteca

Os arquivos em `knowledge/` são a fonte factual canônica. Cada página possui
frontmatter com `title`, `tags`, `aliases` e `related`. A engine pontua:

1. correspondência exata de alias;
2. termos presentes em título e tags;
3. termos presentes no conteúdo;
4. assuntos presentes na memória curta;
5. relações conceituais conhecidas.

Não há banco vetorial nesta versão. O ranking lexical/conceitual é intencional:
tem custo zero, é previsível, rápido e funciona em funções serverless da Vercel.

## Memória

O navegador conserva no máximo seis turnos e envia somente texto. A API recorta,
valida e usa no máximo os quatro turnos mais recentes. Nada é persistido no servidor.

## Segurança factual

- O prompt de personalidade não contém a biografia completa.
- Apenas páginas recuperadas são entregues ao narrador.
- Ausência de página relevante produz fallback determinístico.
- Easter eggs são resolvidos antes do modelo.
- O modelo recebe proibição explícita de usar conhecimento externo.

## Vercel

`next.config.mjs` inclui `knowledge/**/*.md` no trace da rota para que as páginas
existam no bundle serverless e também no output standalone do Docker.
