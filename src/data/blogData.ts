export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  content: string;
  keywords: string[];
}

export const blogCategories = [
  { id: "all", name: "Todos" },
  { id: "direcao-defensiva", name: "Direção Defensiva" },
  { id: "prova-detran", name: "Prova do DETRAN" },
  { id: "legislacao", name: "Legislação" },
  { id: "dicas", name: "Dicas" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "o-que-e-direcao-defensiva",
    title: "O que é Direção Defensiva? Guia Completo para Motoristas",
    description: "Aprenda os princípios fundamentais da direção defensiva e como aplicá-los no dia a dia para evitar acidentes e dirigir com mais segurança.",
    category: "direcao-defensiva",
    image: "/placeholder.svg",
    readTime: "8 min",
    publishedAt: "2024-12-01",
    keywords: ["direção defensiva", "segurança no trânsito", "autoescola são josé dos pinhais"],
    content: `
## O que é Direção Defensiva?

A **direção defensiva** é um conjunto de técnicas e atitudes que todo motorista deve adotar para prevenir acidentes de trânsito. Não se trata apenas de seguir as regras, mas de antecipar situações de risco e agir preventivamente.

## Os 5 Elementos da Direção Defensiva

### 1. Conhecimento
Conhecer as leis de trânsito, as características do seu veículo e as condições das vias por onde você trafega é fundamental.

### 2. Atenção
Mantenha o foco total na direção. Evite distrações como celular, conversas intensas ou ajustes no rádio enquanto dirige.

### 3. Previsão
Antecipe as ações de outros motoristas e pedestres. Observe sinais de comportamento perigoso e prepare-se para reagir.

### 4. Decisão
Após identificar um perigo, tome decisões rápidas e corretas. A hesitação pode ser tão perigosa quanto uma decisão errada.

### 5. Habilidade
Domine as técnicas de direção: frenagem, mudança de faixa, estacionamento e manobras em situações adversas.

## Dicas Práticas de Direção Defensiva

- **Mantenha distância segura**: Use a regra dos 2 segundos em condições normais e 4 segundos em chuva
- **Verifique os retrovisores constantemente**: A cada 5-8 segundos
- **Sinalize suas intenções**: Use setas com antecedência
- **Adapte-se às condições**: Reduza a velocidade em chuva, neblina ou à noite

## Por que a Direção Defensiva é Importante?

Segundo dados do DETRAN-PR, a maioria dos acidentes poderia ser evitada com práticas de direção defensiva. Na **Autoescola APTOS** em São José dos Pinhais, ensinamos não apenas a passar na prova, mas a ser um motorista consciente e seguro.

## Conclusão

A direção defensiva salva vidas. Invista em conhecimento e pratique sempre essas técnicas. Se você está em São José dos Pinhais e quer aprender direção defensiva com profissionais experientes, venha conhecer a Autoescola APTOS.
    `
  },
  {
    slug: "como-passar-prova-teorica-detran",
    title: "Prova Teórica do DETRAN-PR: 15 Dicas de Estudo Atualizadas",
    description: "Entenda a prova teórica do Paraná em 2026: 30 questões, pelo menos 20 acertos, 60 minutos e dicas de estudo com fontes oficiais.",
    category: "prova-detran",
    image: "/placeholder.svg",
    readTime: "10 min",
    publishedAt: "2024-11-28",
    updatedAt: "2026-11-12",
    keywords: ["prova teórica detran pr", "20 acertos em 30 questões", "estudo CNH", "autoescola são josé dos pinhais"],
    content: `
## Como funciona a prova teórica no Paraná?

A prova teórica continua obrigatória para obter a primeira habilitação. O Detran-PR informa que são **30 questões**, com **60 minutos** de duração regular e aprovação a partir de **20 acertos**. Confirme os requisitos do seu agendamento no órgão oficial.

## 15 dicas para estudar

### Preparação
1. Consulte o **Código de Trânsito Brasileiro (CTB)** e os materiais oficiais de habilitação.
2. Revise exemplos de situações reais de trânsito e a interpretação das regras.
3. Distribua o estudo ao longo dos dias.
4. Anote os assuntos em que tem dúvidas e revise com atenção.
5. Consulte os canais do Detran-PR e da Senatran para orientações atualizadas.

### Temas importantes
6. **Sinalização**: placas e marcas viárias.
7. **Legislação**: normas de circulação, infrações e penalidades.
8. **Direção defensiva**: prevenção de riscos e comportamentos seguros.
9. **Primeiros socorros**: condutas responsáveis em sinistros.
10. **Meio ambiente**: impactos da circulação de veículos.

### Na prova
11. Planeje o deslocamento e durma bem.
12. Confira local, horário e documentos no agendamento.
13. Leia o enunciado inteiro antes de responder.
14. Preste atenção a palavras que mudam o sentido da pergunta.
15. Administre os 60 minutos e revise suas respostas se houver tempo.

## Orientação com a Autoescola APTOS

A Autoescola APTOS, em São José dos Pinhais, pode esclarecer dúvidas sobre as opções de preparação e os serviços que estiverem disponíveis. Confira as condições diretamente com a equipe.

**O antigo simulador próprio da APTOS foi descontinuado.** Este guia não oferece questões interativas nem simulados exclusivos. Nenhuma dica garante aprovação.

Fonte: [Detran-PR — mudanças no processo de habilitação](https://www.detran.pr.gov.br/Pagina/Informacoes-sobre-mudancas-no-processo-de-habilitacao-Resolucao-Contran-10202025).

*Revisão editorial de novembro de 2026.*
    `
  },
  {
    slug: "principais-placas-de-transito",
    title: "Principais Placas de Trânsito: Guia Completo com Imagens",
    description: "Conheça as placas de trânsito mais importantes: regulamentação, advertência e indicação. Essencial para a prova do DETRAN e para dirigir com segurança.",
    category: "legislacao",
    image: "/placeholder.svg",
    readTime: "12 min",
    publishedAt: "2024-11-25",
    keywords: ["placas de trânsito", "sinalização", "legislação trânsito", "prova detran"],
    content: `
## Entendendo as Placas de Trânsito

As placas de trânsito são a linguagem universal das vias. Conhecê-las é fundamental para a segurança de todos e é um dos temas mais cobrados na prova do DETRAN.

## Tipos de Placas de Trânsito

### 1. Placas de Regulamentação (Fundo Branco, Borda Vermelha)

As placas de regulamentação são **obrigatórias** e informam sobre obrigações, limitações, proibições ou restrições.

**Principais placas:**
- **R-1 (Parada Obrigatória)**: O famoso "PARE"
- **R-2 (Dê a preferência)**: Triângulo invertido
- **R-6a (Proibido estacionar)**: Círculo com "E" cortado
- **R-19 (Velocidade máxima)**: Indica o limite de velocidade

### 2. Placas de Advertência (Fundo Amarelo)

Alertam sobre condições potencialmente perigosas na via.

**Principais placas:**
- **A-1a (Curva acentuada à esquerda)**
- **A-5 (Pista sinuosa à esquerda)**
- **A-26a (Sentido único)**
- **A-32a (Passagem de pedestres)**

### 3. Placas de Indicação (Fundo Verde ou Azul)

Orientam sobre direções, serviços e pontos de interesse.

**Principais placas:**
- **Indicação de destino** (fundo verde)
- **Serviços auxiliares** (fundo azul): hospital, restaurante, hotel
- **Atrativos turísticos** (fundo marrom)

## Cores e Significados

| Cor de Fundo | Significado |
|--------------|-------------|
| Branco com borda vermelha | Regulamentação |
| Amarelo | Advertência |
| Verde | Indicação de direção |
| Azul | Serviços auxiliares |
| Marrom | Turismo |
| Laranja | Obras |

## Dicas para Memorizar as Placas

1. **Agrupe por categoria**: Estude todas as placas de regulamentação juntas
2. **Use flashcards**: Faça cartões com a placa de um lado e o significado do outro
3. **Observe no trânsito**: Durante o dia, identifique as placas que você vê
4. **Revise placas por assunto**: Consulte materiais oficiais de sinalização e exercite a interpretação das regras

## Na Autoescola APTOS

Oferecemos material didático completo sobre sinalização e aulas práticas onde você aprende a identificar e respeitar as placas em situações reais de trânsito em São José dos Pinhais.
    `
  },
  {
    slug: "como-passar-prova-pratica-detran",
    title: "Prova Prática do DETRAN-PR: o que mudou em 2026",
    description: "Veja as mudanças no exame prático do Paraná em 2026, incluindo a retirada da baliza e da rampa, e orientações seguras de preparação.",
    category: "prova-detran",
    image: "/placeholder.svg",
    readTime: "9 min",
    publishedAt: "2024-11-20",
    updatedAt: "2026-11-12",
    keywords: ["prova prática detran pr", "fim da baliza", "exame de direção 2026", "autoescola são josé dos pinhais"],
    content: `
## Exame prático no Paraná: mudanças em 2026

O Detran-PR informou a **retirada da baliza como exigência no exame prático de categoria B**. Para a **categoria A (moto)**, foi retirada a **rampa** do circuito de avaliação. Estacionar e controlar o veículo continuam sendo habilidades úteis no dia a dia, mas não devem ser anunciados como aquelas etapas obrigatórias que foram eliminadas.

## O que observar durante o exame?

### Antes de começar
- Ajustar banco, espelhos e itens de segurança.
- Conhecer os comandos do veículo e seguir as orientações recebidas.

### Na circulação
- Respeitar sinalização, preferenciais e limites de velocidade.
- Sinalizar conversões e mudanças de faixa.
- Demonstrar controle, observação do entorno e frenagem segura.
- Estar atento a pedestres e outros usuários da via.

## Como funciona a avaliação?

Falhas de segurança e infrações podem comprometer o resultado. Os critérios de pontuação, interrupção e reprovação devem ser conferidos nas orientações atuais do Detran-PR. **Não há uma regra vigente de três tentativas de baliza neste exame**, pois a etapa deixou de ser exigida.

## Dicas de preparação

1. Treine circulação urbana em condições seguras e com acompanhamento adequado.
2. Pratique o uso de setas, espelhos, frenagem e controle do veículo.
3. Confira local, horário e documentos da prova agendada.
4. Procure descansar e evite manobras apressadas.
5. Continue aprendendo a estacionar para a direção cotidiana, sem confundir com o exame atual.

## Na Autoescola APTOS

A APTOS, em São José dos Pinhais, pode informar quais modalidades de aulas e preparação estão disponíveis. Confirme horários e condições com a equipe. **A aprovação depende do desempenho do candidato e da avaliação oficial.**

Fontes: [Detran-PR — mudanças recentes](https://www.detran.pr.gov.br/Noticia/Aulas-EaD-nova-biometria-e-CNH-digital-Detran-PR-torna-habilitacao-mais-acessivel-em-oito) e [retirada da rampa para motos](https://www.detran.pr.gov.br/Noticia/CNH-para-moto-exames-praticos-no-Parana-nao-terao-mais-rampa-como-obstaculo).

*Revisão editorial de novembro de 2026.*
    `
  },
  {
    slug: "direcao-economica-meio-ambiente",
    title: "Direção Econômica: Como Economizar Combustível e Ajudar o Meio Ambiente",
    description: "Aprenda técnicas de direção econômica para reduzir o consumo de combustível, economizar dinheiro e contribuir com o meio ambiente.",
    category: "dicas",
    image: "/placeholder.svg",
    readTime: "7 min",
    publishedAt: "2024-11-15",
    keywords: ["direção econômica", "economia combustível", "meio ambiente", "eco driving"],
    content: `
## O que é Direção Econômica?

A **direção econômica** (ou eco driving) é um conjunto de técnicas que permite reduzir o consumo de combustível em até 25%, economizando dinheiro e reduzindo a emissão de poluentes.

## Por que Praticar Direção Econômica?

- **Economia financeira**: Menos gastos com combustível
- **Preservação ambiental**: Menor emissão de CO2 e poluentes
- **Menor desgaste do veículo**: Componentes duram mais
- **Mais segurança**: Direção mais suave é mais segura

## 10 Técnicas de Direção Econômica

### 1. Acelere Gradualmente
Evite acelerações bruscas. Pressione o acelerador suavemente até atingir a velocidade desejada.

### 2. Mantenha Velocidade Constante
Variações de velocidade aumentam o consumo. Use o piloto automático quando possível.

### 3. Troque de Marcha no Momento Certo
- Carros a gasolina: troque entre 2.000 e 2.500 RPM
- Carros a diesel: troque entre 1.500 e 2.000 RPM

### 4. Use o Freio Motor
Ao se aproximar de um semáforo, solte o acelerador e deixe o carro desacelerar naturalmente.

### 5. Evite Marcha Lenta Prolongada
Se for ficar parado mais de 1 minuto, desligue o motor.

### 6. Planeje Seus Trajetos
Rotas mais curtas ou com menos trânsito economizam combustível.

### 7. Verifique os Pneus
Pneus com pressão baixa aumentam o consumo em até 3%.

### 8. Reduza o Peso
Retire objetos desnecessários do porta-malas.

### 9. Use o Ar-Condicionado com Moderação
O A/C pode aumentar o consumo em até 20% na cidade.

### 10. Faça Manutenção Regular
Motor bem regulado consome menos.

## Impacto Ambiental

Um carro popular emite cerca de 2,3 kg de CO2 por litro de gasolina. Com direção econômica, você pode:
- Reduzir suas emissões em até 25%
- Economizar centenas de litros por ano
- Contribuir para um ar mais limpo

## Direção Econômica na Autoescola APTOS

Ensinamos técnicas de direção econômica em nossas aulas práticas. Nossos instrutores em São José dos Pinhais estão preparados para formar motoristas conscientes e responsáveis.
    `
  },
  {
    slug: "primeiros-socorros-transito",
    title: "Primeiros Socorros no Trânsito: O que Fazer em Caso de Acidente",
    description: "Guia essencial sobre primeiros socorros em acidentes de trânsito. Aprenda o que fazer e o que não fazer para ajudar vítimas corretamente.",
    category: "legislacao",
    image: "/placeholder.svg",
    readTime: "11 min",
    publishedAt: "2024-11-10",
    keywords: ["primeiros socorros", "acidente trânsito", "samu", "resgate"],
    content: `
## A Importância dos Primeiros Socorros

Saber como agir nos primeiros minutos após um acidente pode salvar vidas. Este conhecimento é cobrado na prova teórica do DETRAN e é essencial para todo motorista.

## O que Fazer ao Presenciar um Acidente

### 1. Mantenha a Calma
Pare em local seguro e avalie a situação antes de agir.

### 2. Sinalize o Local
- Ligue o pisca-alerta
- Coloque o triângulo de segurança a 30 metros (em vias comuns) ou 200 metros (em rodovias)
- Use galhos, pedras ou outros objetos se necessário

### 3. Acione o Socorro
**Números de emergência:**
- **SAMU**: 192
- **Bombeiros**: 193
- **Polícia Rodoviária Federal**: 191
- **Polícia Militar**: 190

Informe:
- Localização exata
- Número de vítimas
- Gravidade aparente
- Se há vazamento de combustível ou risco de incêndio

### 4. Avalie as Vítimas
- Verifique se estão conscientes
- Observe a respiração
- Procure sangramentos visíveis

## O que NÃO Fazer

❌ **Não remova a vítima** (exceto em risco iminente de explosão/incêndio)
❌ **Não dê água ou medicamentos**
❌ **Não retire o capacete** de motociclistas
❌ **Não movimente a cabeça** de vítimas inconscientes
❌ **Não tente "consertar" fraturas**

## Situações Específicas

### Vítima Inconsciente mas Respirando
- Mantenha-a na posição em que está
- Proteja a cabeça
- Aguarde o socorro

### Sangramento Intenso
- Use um pano limpo para pressionar o ferimento
- Não retire objetos encravados
- Mantenha pressão até o socorro chegar

### Engasgamento
- Se a vítima consegue tossir, incentive
- Se não respira, aplique a manobra de Heimlich (apenas se souber)

## Kit de Primeiros Socorros no Veículo

É recomendado ter:
- Triângulo de sinalização (obrigatório)
- Lanterna
- Luvas descartáveis
- Gaze e ataduras
- Cobertor térmico

## Responsabilidade Legal

O Art. 176 do CTB determina que deixar de prestar socorro à vítima de acidente é infração gravíssima, além de poder configurar crime (omissão de socorro).

## Aprenda Mais na Autoescola APTOS

Nosso curso teórico em São José dos Pinhais inclui módulo completo sobre primeiros socorros, preparando você não apenas para a prova, mas para situações reais.
    `
  },
  {
    slug: "infracoes-transito-pontuacao",
    title: "Infrações de Trânsito: Entenda a Pontuação e as Multas",
    description: "Guia completo sobre infrações de trânsito no Brasil: tipos, pontuação, valores das multas e como evitar a suspensão da CNH.",
    category: "legislacao",
    image: "/placeholder.svg",
    readTime: "10 min",
    publishedAt: "2024-11-05",
    keywords: ["infrações trânsito", "multas", "pontuação CNH", "suspensão habilitação"],
    content: `
## Sistema de Pontuação no Brasil

Desde 2021, o limite de pontos para suspensão da CNH varia conforme o histórico do condutor:
- **40 pontos**: Condutores sem infração gravíssima
- **30 pontos**: Condutores com 1 infração gravíssima
- **20 pontos**: Condutores com 2+ infrações gravíssimas

## Classificação das Infrações

### Infração Leve (3 pontos)
**Valor da multa**: R$ 88,38 (valores de 2024)

Exemplos:
- Estacionar em desacordo com a regulamentação
- Não sinalizar com antecedência a conversão

### Infração Média (4 pontos)
**Valor da multa**: R$ 130,16

Exemplos:
- Usar veículo com equipamento obrigatório defeituoso
- Deixar de atualizar cadastro de endereço

### Infração Grave (5 pontos)
**Valor da multa**: R$ 195,23

Exemplos:
- Ultrapassar pela direita
- Dirigir com o braço de fora
- Transportar criança sem cadeirinha

### Infração Gravíssima (7 pontos)
**Valor da multa**: R$ 293,47

Exemplos:
- Avançar sinal vermelho
- Excesso de velocidade acima de 20%
- Usar celular ao dirigir
- Não usar cinto de segurança

### Infrações com Multiplicador

Algumas infrações têm multa multiplicada:
- **Excesso de velocidade acima de 50%**: 3x o valor = R$ 880,41
- **Dirigir embriagado**: 10x o valor = R$ 2.934,70
- **Participar de racha**: 10x o valor = R$ 2.934,70

## Crimes de Trânsito

Algumas condutas não são apenas infrações, mas crimes:
- Homicídio culposo
- Lesão corporal culposa
- Embriaguez ao volante
- Participar de racha
- Dirigir sem habilitação gerando perigo

## Como Consultar Suas Multas

1. Acesse o site do DETRAN-PR
2. Informe CPF e RENACH
3. Consulte infrações e pontuação

## Recurso de Multas

Você pode recorrer de multas em até 30 dias:
1. Defesa prévia (antes do auto de infração)
2. Recurso à JARI (1ª instância)
3. Recurso ao CETRAN (2ª instância)

## Evite Infrações

A melhor forma de não perder pontos é dirigir com responsabilidade. Na **Autoescola APTOS** em São José dos Pinhais, formamos motoristas conscientes das regras e preparados para um trânsito mais seguro.
    `
  },
  {
    slug: "renovacao-cnh-como-funciona",
    title: "Renovação de CNH: Passo a Passo Completo e Atualizado",
    description: "Renove a CNH no Paraná em 2026: exames, prazos, renovação simplificada, prorrogação excepcional e taxas oficiais.",
    category: "dicas",
    image: "/placeholder.svg",
    readTime: "6 min",
    publishedAt: "2024-10-30",
    updatedAt: "2026-11-12",
    keywords: ["renovação CNH", "renovar habilitação", "detran PR", "autoescola são josé dos pinhais"],
    content: `
## Quando renovar a CNH?

A validade depende da idade e da avaliação médica. Os prazos **máximos** são de até **10 anos** para condutores de 18 a 49 anos, **5 anos** para 50 a 69 e **3 anos** a partir de 70 anos. O médico pode estabelecer prazo menor.

**Atenção à prorrogação excepcional de 2026:** o Detran-PR informou que determinadas CNHs com vencimento original entre **5 de junho e 8 de dezembro de 2026** tiveram a validade prorrogada para **9 de dezembro de 2026**, conforme condições e exceções oficiais. Consulte seu caso antes de dirigir com documento vencido.

## Passo a passo no Paraná

1. Solicite o serviço pelo Detran-PR, aplicativo Detran Inteligente, unidade de atendimento ou CFC.
2. Confira os documentos, valores vigentes e eventuais requisitos biométricos.
3. Agende e realize o exame de aptidão física e mental.
4. Realize avaliação psicológica quando exigida, como no exercício de atividade remunerada (EAR). Outras etapas podem se aplicar às categorias profissionais.
5. Acompanhe a emissão e a disponibilidade da CNH Digital ou impressa.

## Renovação simplificada em 2026

Existem condições específicas para motoristas inscritos no **Registro Nacional Positivo de Condutores (RNPC)**, sem infrações sujeitas a pontuação nos últimos 12 meses. A modalidade possui regras conforme a faixa etária e **não dispensa de forma geral o exame de aptidão física e mental**.

## Taxas, documentos e prazo de entrega

Consulte a lista atual de documentos e as taxas diretamente no Detran-PR e na clínica credenciada. **Não use tabelas de preços de 2024 como referência atual.**

A CNH Digital costuma ficar disponível após a conclusão do procedimento e o registro do resultado. O prazo da versão impressa depende da emissão e da entrega pelos Correios; acompanhe pelo canal oficial.

## E se a CNH já venceu?

Em regra, dirigir com CNH vencida há **mais de 30 dias** é infração gravíssima, observadas eventuais prorrogações aplicáveis. Para documentos vencidos há mais de cinco anos, **não presuma que é obrigatório refazer os exames teórico e prático da primeira habilitação**. Consulte o procedimento de renovação atualizado do Detran-PR.

## Atendimento na Autoescola APTOS

A APTOS, em São José dos Pinhais, pode informar sobre os serviços de orientação e atendimento disponíveis. A emissão da CNH depende do órgão de trânsito e das avaliações exigidas.

Fontes: [Detran-PR — orientações de renovação em 2026](https://www.detran.pr.gov.br/Noticia/Apos-mudancas-de-2026-Detran-PR-reforca-orientacoes-sobre-renovacao-da-CNH) e [serviço oficial de renovação](https://www.detran.pr.gov.br/servicos/Motorista/Carteira-de-motorista/Solicitar-a-renovacao-da-carteira-de-motorista-MD3PAr6a).

*Revisão editorial de novembro de 2026.*
    `
  }
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentSlug: string, limit: number = 3) => {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return blogPosts.slice(0, limit);
  
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.category === currentPost.category)
    .slice(0, limit);
};
