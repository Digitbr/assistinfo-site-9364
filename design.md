# AssisTInfo — Design

Website one-page B2B premium para desenvolvimento e marketing. Referência: hierarquia corporativa, ciano, navegação limpa e contraste da TOTVS, sem copiar marca ou conteúdo. Atualização aprovada: usar o mascote azul e dourado fornecido como símbolo da marca, ao lado do nome AssisTInfo.

## Identidade
- Navy #09234c para títulos; azul #1262ed para CTAs; ciano #00bbd6 nos detalhes.
- Fundo branco e #f4f7fc, texto secundário #637087; bordas #e2e8f1; dourado #ebbc56 em pequenos acentos.
- Parceira GR: #081529, magenta #ed389b e ciano #46d8ec. Cards escuros com bordas discretas.
- Marca: mascote azul/dourado extraído do anúncio fornecido, com wordmark AssisTInfo. Manter o mesmo desenho do personagem, sem reinterpretar sua identidade.
- Tipografia: Manrope para títulos e Inter para leitura, ambas sem serifa, self-hosted se disponíveis. Título hero 70px desktop / 46px mobile, corpo 15–18px.

## Composição
- Container máximo 1200px, margens 48px desktop / 20px mobile. Espaçamento de seção 88px.
- Barra utilitária navy + header sticky branco, navegação por âncoras e CTA alto contraste.
- Hero claro assimétrico, título à esquerda com palavra em azul. À direita, carrossel de dois anúncios interativos refeitos em HTML acessível: Sites & Sistemas e Posts & Apresentações. Fundo navy, linhas elétricas azuis, detalhes dourados, mascote compartilhado e prévias ilustrativas de cada serviço. Textos curtos e CTA de WhatsApp específico; não rasterizar a composição inteira.
- Faixa de três diferenciais sem números de clientes inventados.
- Catálogo de seis cards em 3 colunas + sétima solução personalizada em destaque horizontal. Bordas suaves, raio 12px e sombra contida. Filtros acessíveis por categoria, preço com hierarquia forte, destaques sem alegações de popularidade sem evidência.
- Expertise em grade compacta com sete especialidades.
- Área GR com ruptura escura, assinatura magenta/ciano, 6 serviços e 6 planos em grade 3x2.
- CTA final claro, footer navy e botão WhatsApp flutuante.

## Interação e acessibilidade
- Contratação externa WhatsApp com texto e nome do plano: AssisTInfo 5527993111872; GR 5527988435960.
- Sem checkout, pagamentos, autenticação ou DB; front-end somente.
- Filtros de serviços, menu mobile com aria-expanded, diálogo de detalhes com Escape e gerenciamento de foco.
- Foco visível, links externos seguros, áreas de toque >=44px, contraste legível, reduzir movimento conforme preferência.
- Carrossel: navegação manual, indicadores, pausa/reprodução, intervalo 7s; suspender em hover/foco, aba oculta e ao sair da viewport. Interação manual pausa a rotação; sem autoplay para reduced-motion. Anúncios não são campanhas publicadas ou pagas.
- Responsivo: 3 → 2 → 1 colunas; hero empilha; sem overflow horizontal.

## Arquivos
- Rota /calculadora: configurador em 3 etapas (pilares → escopo → resumo), mesmo mascote/wordmark e identidade azul/navy/dourada. Grade de 7 cards selecionáveis, resumo lateral sticky, barra de etapas acessível e layout empilhado mobile.
- Preços da imagem enviada pelo usuário: landing 920, site 1690, site+divulgação 1850, e-commerce 1390, sistema 3000, PDF 800, banco 500, chatbot 900, automação IA/APIs 2500, dashboard 1500. Análise de dados e API avulsa permanecem sob orçamento.
- Cálculo aprovado: soma dos itens tabelados × complexidade (1 / 1.3 / 1.7); faixa alta +20%. Não média de mercado; ajustes explicitamente referenciais. IA/API integrado usa automação 2500 uma única vez. Web é escolha exclusiva; extras tabelados explicitamente opcionais. Sob orçamento não vira zero nem total fechado: subtotal parcial claramente identificado.
- Cards e recomendações derivados de catálogo estático local e escolhas do usuário, sem LLM/API externa. Volume e funcionalidades compõem o briefing; não criam taxas ocultas. Recomendar complexidade com base neles sem mudar escolha silenciosamente.
- WhatsApp envia pilares, opções, funcionalidades, volume, complexidade, itens, fórmula, faixa parcial e pendências. Sem coleta/login/DB e sem envio automático. Tela vazia não exibe valor zero como orçamento.
- Arquivos: pages/calculator.tsx, components/calculator.css, lib/estimator.ts; nova rota em app.tsx e botão em Solução Personalizada.
- packages/web/src/web/pages/home.tsx: página e componentes.
- packages/web/src/web/components/promo-carousel.tsx e promo-carousel.css: anúncios interativos e identidade do mascote.
- packages/web/src/web/lib/catalog.ts: catálogo e links WhatsApp.
- packages/web/src/web/styles.css: tokens e estilos responsivos.
- packages/web/src/web/pages/index.tsx: composição/exportação apenas.
- packages/web/public/images e fonts: assets locais.
- packages/web/index.html: título e SEO pt-BR. Manter infraestrutura e analytics do template.
