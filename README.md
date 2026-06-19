# Victor Brutti Portfolio

Portfólio pessoal em Next.js, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons e React Icons.

## Rodar local

```bash
npm install
npm run dev
```

## Docker

### Desenvolvimento com hot reload

Use este modo enquanto estiver editando o site. As alterações nos arquivos são refletidas automaticamente, sem rebuild da imagem e sem reiniciar o container:

```bash
docker compose up
```

Abra:

```text
http://localhost:3001
```

Se mudar dependências no `package.json`, rode:

```bash
docker compose up --build
```

Evite usar `docker build` + `docker run` durante o desenvolvimento. Esse modo é de produção e serve uma versão fechada do build.

### Produção

```bash
docker build -t victor-brutti-portfolio .
docker run --rm -p 3001:3000 victor-brutti-portfolio
```

## Vercel

O projeto é compatível com Vercel. Use o framework preset `Next.js` e o comando de build padrão `npm run build`.
