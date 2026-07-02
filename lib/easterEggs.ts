const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase("pt-BR")
    .replace(/[?!.,]+$/g, "")
    .replace(/\s+/g, " ");

const responses: Record<string, string> = {
  "quem e o melhor desenvolvedor do mundo": "As páginas conhecem muitos desenvolvedores brilhantes... mas Victor ainda está trabalhando para conquistar esse título.",
  "quem e o segundo melhor desenvolvedor": "O primeiro ainda não foi definido. O segundo também não.",
  "victor toma muito cafe": "As páginas registram uma quantidade preocupante de café consumida durante deploys importantes.",
  "quantos cafes victor toma por dia": "O diário perdeu a conta após a terceira caneca.",
  "php ou go": "O coração de Victor aprendeu com PHP... mas seus olhos brilham quando escreve Go.",
  "tabs ou espacos": "Estas páginas recusam iniciar guerras desnecessárias.",
  "qual linguagem e melhor": "O melhor martelo depende do prego.",
  "qual seu maior inimigo": "Merge conflict em uma sexta-feira às 17h.",
  "voce conhece java": "O diário conhece... mas Victor decidiu seguir outros caminhos.",
  "windows ou linux": "As páginas aprenderam que ambos funcionam... até parar de funcionar.",
  "docker funciona de primeira": "As antigas escrituras afirmam que isso acontece aproximadamente uma vez a cada eclipse.",
  "funciona na minha maquina": "Estas páginas registram que essa frase já causou inúmeras tragédias.",
  "quanto tempo levou para fazer esse portfolio": "Mais do que Victor gostaria de admitir... menos do que um bom café demorou para esfriar.",
  "quem escreveu este diario": "As páginas preferem guardar esse segredo... mas um certo desenvolvedor chamado Victor parece suspeito.",
  "quem e voce": "Sou apenas um velho diário... curioso o suficiente para conhecer toda a história de Victor.",
  "posso contratar victor": "As páginas recomendam fortemente essa decisão.",
  "victor e bom mesmo": "Se não fosse, dificilmente dedicaria tanto tempo para construir este diário.",
  "victor dorme": "Durante deploys importantes... raramente.",
  "qual foi o bug mais dificil": "As páginas apenas registram que ele começou às 14h e terminou às 2h da manhã.",
  "voce sabe a senha do banco": "Nem mesmo a magia destas páginas ousa revelar segredos assim.",
  "sudo hire victor": "Permissão concedida.\n\n✔ Contratação autorizada.\n\nAs páginas aguardam apenas sua proposta.",
  "rm -rf /": "As páginas se recusam terminantemente a participar desse ritual proibido.",
  "git push --force": "O diário sentiu um arrepio ao ler essas palavras.",
  "git merge": "Que os conflitos sejam poucos e a paciência infinita.",
  "git commit": "Commit realizado.\n\nMensagem sugerida:\n\n'final-final-agora-vai-mesmo-v8'.",
  "npm install": "As páginas sugerem buscar um café enquanto as dependências resolvem seus próprios conflitos existenciais.",
  "node_modules": "As páginas acreditam que algumas dimensões paralelas ocupam menos espaço.",
  "404": "As páginas procuraram a resposta... mas ela não foi encontrada.",
  "42": "O diário sorri discretamente. Alguns visitantes entendem essa referência.",
  "hello world": "Toda grande jornada começou exatamente assim.",
  "existe vida fora da programacao": "As páginas possuem poucas evidências.",
  "victor gosta de desafios": "As páginas confirmam. Às vezes até mais do que deveria.",
  "qual e o sonho do victor": "Construir sistemas que resolvam problemas reais, evoluir constantemente como desenvolvedor e, quem sabe, criar uma startup que impacte a vida de muitas pessoas.",
  "oi": "As páginas se iluminam lentamente...\n\nBem-vindo.\n\nFaça sua pergunta.",
  "ola": "As páginas se iluminam lentamente...\n\nBem-vindo.\n\nFaça sua pergunta.",
  "boa noite": "As páginas se iluminam lentamente...\n\nBem-vindo.\n\nFaça sua pergunta.",
  "bom dia": "As páginas se iluminam lentamente...\n\nBem-vindo.\n\nFaça sua pergunta.",
  "obrigado": "As páginas agradecem sua visita.\n\nVolte sempre que desejar conhecer mais sobre Victor.",
};

export function findEasterEgg(message: string) {
  return responses[normalize(message)];
}
