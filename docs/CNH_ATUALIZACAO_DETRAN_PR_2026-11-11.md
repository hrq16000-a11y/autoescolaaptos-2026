# Revisão CNH / Detran-PR — 11 de novembro de 2026

## Escopo desta micro-rodada (sem alterar produção)

Retirada do quiz `/simulado-detran-pr`, conteúdo desatualizado em FAQ, Home, serviços e páginas informativas. URL antiga encaminhada a `/formas-estudo-teorico` na navegação React, piloto TanStack e config Vercel; removida do sitemap e do prefetch. Sem exclusões de bancos, dados de alunos, leads, Supabase, Auth ou histórico de commits.

**Distinção:** o simulador de direção deixou de ser etapa obrigatória; a prova teórica e os materiais preparatórios oficiais continuam existindo. Removemos o quiz do nosso site por decisão do proprietário, sem sugerir que o exame teórico foi extinto.

## Fontes oficiais consultadas

- [Contran 1.020/2025 — texto integral](https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=detalharAto&cod_menu=9431&cod_modulo=310&numeroAto=00001020&orgao=CONTRAN%2FMT&tipo=RES&valorAno=2025): processos, art. 38 (mínimo de 2 horas práticas; 2 por categoria AB), arts. 62–65 (adição de categoria), PPD de 1 ano.
- [Detran-PR — regras e perguntas](https://www.detran.pr.gov.br/Pagina/Informacoes-sobre-mudancas-no-processo-de-habilitacao-Resolucao-Contran-10202025): prova teórica 30 questões, 20 acertos, 60 minutos; fim do prazo máximo de 12 meses.
- [Detran-PR — panorama atualizado em 19/10/2026](https://www.detran.pr.gov.br/Noticia/Aulas-EaD-nova-biometria-e-CNH-digital-Detran-PR-torna-habilitacao-mais-acessivel-em-oito): não obrigatoriedade de simulador de direção, retirada da baliza na B e rampa na A; curso de reciclagem no Paraná passa a 45 horas-aula; CNH digital.
- [Detran-PR — exame toxicológico primeira CNH A/B desde junho de 2026](https://www.detran.pr.gov.br/Noticia/Detran-PR-reforca-que-exame-toxicologico-e-obrigatorio-para-tirar-CNH-de-carro-e-moto).
- [Detran-PR — Lei 23.259/2026 sobre exames médico e psicológico](https://www.detran.pr.gov.br/Noticia/Governador-sanciona-lei-que-reduz-em-55-valor-dos-exames-de-obtencao-e-renovacao-da-CNH).
- [Detran-PR — instrutor de trânsito autônomo](https://www.detran.pr.gov.br/Pagina/Instrutor-de-Transito-Autonomo).
- [Detran-PR — agendar curso de reciclagem](https://www.detran.pr.gov.br/servicos/Motorista/Reciclagem/Agendar-curso-de-reciclagem-ybrzPqN4): presencial e EaD disponíveis; 45 horas-aula. Após EaD, prova eletrônica (30 questões, 21 acertos), taxa e agendamento próprio; nova tentativa após 5 dias com taxa adicional em caso de reprovação.

## Gates e pendências editoriais

- Rodar CI do projeto (build, build:standalone, testes e gates já existentes), incluindo `tests/cnh-atualizacao-2026.test.mjs`.
- Verificar navegação no mobile e redirecionamento do endereço antigo na hospedagem real, pois uma configuração Vercel não altera automaticamente o roteamento do Lovable.
- Verificar HTML inicial/SEO da campanha `/inclusao-moto` separadamente: o experimento estático da PR #121 do repositório antigo não foi importado automaticamente.
- Exigir confirmação operacional sobre ofertas comerciais, disponibilidade de cursos e percentuais de aprovação antes de voltar a publicar afirmações não documentadas.
- Alguns textos institucionais e artigos antigos precisam de revisão editorial em rodadas específicas; não considerar todo o site homologado sem esse inventário.
- Reteste gratuito: não afirmar cobrança nem gratuidade automática enquanto o procedimento do Detran-PR não for confirmado.
- Não acessar nem modificar dados reais, DNS, funções Supabase ou configurações de publicação neste PR.
