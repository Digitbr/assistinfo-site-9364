import {
  AppWindow,
  Database,
  ChartNoAxesCombined,
  Globe2,
  ShoppingCart,
  BrainCircuit,
  Cable,
} from "lucide-react";

export const pillars = [
  {
    id: "systems",
    name: "Sistemas & processos",
    description: "Organize sua operação com um sistema feito para o seu negócio.",
    icon: AppWindow,
    reference: "A partir de R$ 3.000",
    features: [
      "Cadastro e gestão de clientes",
      "Ordens de serviço",
      "Gestão de frotas",
      "Permissões de acesso",
      "Fluxos de aprovação",
      "Controle de estoque",
    ],
    volumes: ["Até 10 usuários", "11 a 50 usuários", "Mais de 50 usuários"],
  },
  {
    id: "data",
    name: "Análise de dados",
    description: "Transforme informações dispersas em decisões mais claras.",
    icon: Database,
    reference: "Sob orçamento",
    features: [
      "Limpeza e organização de dados",
      "Análise de indicadores",
      "Cruzamento de fontes",
      "Análise exploratória",
      "Relatórios de resultados",
    ],
    volumes: ["1 fonte de dados", "2 a 5 fontes", "Mais de 5 fontes"],
  },
  {
    id: "dashboards",
    name: "Dashboards & Power BI",
    description: "Visualize indicadores e acompanhe o que realmente importa.",
    icon: ChartNoAxesCombined,
    reference: "A partir de R$ 1.500",
    features: [
      "Indicadores de vendas",
      "Visão financeira",
      "Painéis operacionais",
      "Filtros interativos",
      "Atualização de dados",
    ],
    volumes: ["1 painel", "2 a 4 painéis", "5 ou mais painéis"],
  },
  {
    id: "web",
    name: "Sites & landing pages",
    description: "Uma presença profissional para apresentar, conectar e converter.",
    icon: Globe2,
    reference: "Landing page a partir de R$ 920",
    features: [
      "Formulário de contato",
      "Integração com WhatsApp",
      "Seção de serviços",
      "Portfólio de projetos",
      "Blog e conteúdo",
    ],
    volumes: ["1 página", "2 a 5 páginas", "Mais de 5 páginas"],
  },
  {
    id: "commerce",
    name: "E-commerce",
    description: "Monte sua vitrine digital e facilite o caminho até a venda.",
    icon: ShoppingCart,
    reference: "Base da tabela: R$ 1.390",
    features: [
      "Catálogo de produtos",
      "Carrinho e checkout",
      "Meios de pagamento",
      "Cálculo de frete",
      "Cupons de desconto",
      "Controle de pedidos",
    ],
    volumes: ["Até 30 produtos", "31 a 200 produtos", "Mais de 200 produtos"],
  },
  {
    id: "ai",
    name: "IA para negócios",
    description: "Atendimento e automações para dar mais tempo à sua equipe.",
    icon: BrainCircuit,
    reference: "Chatbot a partir de R$ 900",
    features: [
      "Triagem de atendimento",
      "Qualificação de leads",
      "Assistente de conhecimento",
      "Automação de tarefas",
      "Resumo de documentos",
    ],
    volumes: ["1 fluxo de atendimento", "2 a 5 fluxos", "Mais de 5 fluxos"],
  },
  {
    id: "api",
    name: "Integrações & APIs",
    description: "Conecte seus sistemas, elimine retrabalho e automatize fluxos.",
    icon: Cable,
    reference: "Avulsa sob orçamento",
    features: [
      "Conexão com CRM",
      "Sincronização de dados",
      "Integração de pagamentos",
      "Webhooks",
      "Conexão com ERP",
    ],
    volumes: ["1 integração", "2 a 4 integrações", "5 ou mais integrações"],
  },
] as const;

export type PillarId = (typeof pillars)[number]["id"];
export type Scope = { features: string[]; volume: number };
export type Project = {
  selected: PillarId[];
  scopes: Record<PillarId, Scope>;
  webType: "landing" | "institutional" | "promotion";
  aiType: "chatbot" | "automation";
  apiType: "standalone" | "integrated";
  complexity: "basic" | "intermediate" | "advanced";
  extras: { database: boolean; pdf: boolean };
  description: string;
};

export const complexities = [
  {
    id: "basic",
    name: "Essencial",
    factor: 1,
    detail: "Escopo enxuto e regras simples",
    adjustment: "Sem ajuste",
  },
  {
    id: "intermediate",
    name: "Intermediário",
    factor: 1.3,
    detail: "Vários fluxos e regras de negócio",
    adjustment: "+30% referencial",
  },
  {
    id: "advanced",
    name: "Avançado",
    factor: 1.7,
    detail: "Regras e operações mais complexas",
    adjustment: "+70% referencial",
  },
] as const;

export const webOptions = [
  {
    id: "landing",
    name: "Landing page",
    price: 920,
    detail: "A.TI Start Web · conversão em uma página",
  },
  {
    id: "institutional",
    name: "Site institucional",
    price: 1690,
    detail: "A.TI Negócio Digital · presença com múltiplas páginas",
  },
  {
    id: "promotion",
    name: "Site + divulgação",
    price: 1850,
    detail: "A.TI Site & Divulgação · web e setup inicial de campanhas",
  },
] as const;
export const aiOptions = [
  {
    id: "chatbot",
    name: "Chatbot de atendimento",
    price: 900,
    detail: "Triagem no WhatsApp e qualificação de leads",
  },
  {
    id: "automation",
    name: "Automação inteligente",
    price: 2500,
    detail: "Pacote integrado de sistemas, APIs e IA",
  },
] as const;
export const apiOptions = [
  {
    id: "standalone",
    name: "Integração avulsa",
    price: null,
    detail: "Escopo e preço avaliados pela equipe",
  },
  {
    id: "integrated",
    name: "Automação com APIs",
    price: 2500,
    detail: "Pacote A.TI Automação Inteligente; sem duplicar com IA",
  },
] as const;

export function initialProject(): Project {
  return {
    selected: [],
    scopes: Object.fromEntries(pillars.map((p) => [p.id, { features: [], volume: 0 }])) as Record<
      PillarId,
      Scope
    >,
    webType: "landing",
    aiType: "chatbot",
    apiType: "standalone",
    complexity: "basic",
    extras: { database: false, pdf: false },
    description: "",
  };
}

export const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
export type EstimateLine = { id: string; name: string; price: number; basis: string };

export function estimateProject(project: Project) {
  const lines: EstimateLine[] = [];
  const pending: string[] = [];
  const has = (id: PillarId) => project.selected.includes(id);
  const add = (id: string, name: string, price: number, basis: string) =>
    lines.push({ id, name, price, basis });
  if (has("systems"))
    add("systems", "Sistema web — A.TI Business Pro", 3000, "A partir de R$ 3.000 na tabela");
  if (has("data")) pending.push("Análise de dados — escopo e investimento sob orçamento");
  if (has("dashboards"))
    add("dashboards", "Dashboards em Power BI", 1500, "A partir de R$ 1.500 na tabela");
  if (has("web")) {
    const option = webOptions.find((o) => o.id === project.webType)!;
    add("web", option.name, option.price, option.detail);
  }
  if (has("commerce"))
    add("commerce", "Loja virtual — A.TI Venda Rápida Digital", 1390, "R$ 1.390 na tabela");
  const automation =
    (has("ai") && project.aiType === "automation") ||
    (has("api") && project.apiType === "integrated");
  if (has("ai") && project.aiType === "chatbot")
    add("chatbot", "Chatbot de atendimento", 900, "A partir de R$ 900 na tabela");
  if (automation)
    add("automation", "A.TI Automação Inteligente", 2500, "Pacote único de sistemas, APIs e IA");
  if (has("api") && project.apiType === "standalone")
    pending.push("Integração de API avulsa — escopo e investimento sob orçamento");
  const extrasEligible = project.selected.some((id) =>
    ["systems", "data", "dashboards", "api"].includes(id),
  );
  if (extrasEligible && project.extras.database)
    add(
      "database",
      "Modelagem de banco de dados",
      500,
      "A partir de R$ 500 na tabela; módulo adicional solicitado",
    );
  if (extrasEligible && project.extras.pdf)
    add(
      "pdf",
      "Motor de relatórios em PDF",
      800,
      "A partir de R$ 800 na tabela; módulo adicional solicitado",
    );
  const base = lines.reduce((sum, line) => sum + line.price, 0);
  const complexity = complexities.find((c) => c.id === project.complexity)!;
  const minimum = Math.round(base * complexity.factor);
  const maximum = Math.round(minimum * 1.2);
  return {
    lines,
    pending,
    base,
    adjustment: minimum - base,
    minimum,
    maximum,
    complexity,
    extrasEligible,
    sharedAutomation:
      has("ai") &&
      project.aiType === "automation" &&
      has("api") &&
      project.apiType === "integrated",
  };
}

export function recommendations(project: Project) {
  const result: { title: string; text: string; pillar?: PillarId }[] = [];
  const has = (id: PillarId) => project.selected.includes(id);
  if (has("data") && !has("dashboards"))
    result.push({
      title: "Dê visibilidade aos seus dados",
      text: "Um dashboard pode transformar a análise em indicadores acompanhados pela equipe.",
      pillar: "dashboards",
    });
  if (has("commerce") && !has("api"))
    result.push({
      title: "Conecte a loja à operação",
      text: "Integrações podem conectar pedidos, estoque e ferramentas de gestão. São opcionais.",
      pillar: "api",
    });
  if (has("systems") && !has("dashboards"))
    result.push({
      title: "Acompanhe sua operação",
      text: "Considere painéis para visualizar indicadores do sistema; a base de dashboard é R$ 1.500.",
      pillar: "dashboards",
    });
  if (
    has("web") &&
    project.scopes.web.features.includes("Blog e conteúdo") &&
    project.webType === "landing"
  )
    result.push({
      title: "Conteúdo pede espaço para crescer",
      text: "Um site institucional pode ser mais adequado que uma landing page para um blog. Altere o formato se fizer sentido.",
    });
  const totalFeatures = project.selected.reduce(
    (n, id) => n + project.scopes[id].features.length,
    0,
  );
  const highVolume = project.selected.some((id) => project.scopes[id].volume === 2);
  if (
    (highVolume || totalFeatures >= 6 || project.selected.length >= 3) &&
    project.complexity === "basic"
  )
    result.push({
      title: "Revise o nível de complexidade",
      text: "O volume ou a combinação de funcionalidades pode exigir nível intermediário ou avançado. A escolha continua sendo sua.",
    });
  if (
    has("ai") &&
    has("api") &&
    project.aiType === "automation" &&
    project.apiType === "integrated"
  )
    result.push({
      title: "Um pacote, duas conexões",
      text: "IA e APIs integradas compartilham Automação Inteligente: R$ 2.500 contabilizados apenas uma vez.",
    });
  return result.slice(0, 3);
}

export function projectMessage(project: Project) {
  const estimate = estimateProject(project);
  const choices = project.selected.map((id) => {
    const pillar = pillars.find((p) => p.id === id)!;
    const scope = project.scopes[id];
    const option =
      id === "web"
        ? webOptions.find((o) => o.id === project.webType)?.name
        : id === "ai"
          ? aiOptions.find((o) => o.id === project.aiType)?.name
          : id === "api"
            ? apiOptions.find((o) => o.id === project.apiType)?.name
            : null;
    return `• ${pillar.name}${option ? ` — ${option}` : ""}\n  Volume: ${pillar.volumes[scope.volume]}\n  Funcionalidades: ${scope.features.length ? scope.features.join(", ") : "A definir com a equipe"}`;
  });
  return [
    "Olá, AssisTInfo! Montei meu projeto na calculadora e gostaria de validar o orçamento.",
    "PILARES E ESCOPO",
    ...choices,
    `Complexidade: ${estimate.complexity.name} (${estimate.complexity.adjustment}).`,
    "ITENS COM BASE NA TABELA",
    ...estimate.lines.map((l) => `• ${l.name}: ${currency(l.price)}`),
    ...(estimate.base
      ? [
          `Base: ${currency(estimate.base)}. Ajuste de complexidade: ${currency(estimate.adjustment)}.`,
          `${estimate.pending.length ? "Faixa parcial" : "Faixa estimada"}: ${currency(estimate.minimum)} a ${currency(estimate.maximum)}.`,
          "Cálculo: base × complexidade; limite superior +20% referencial.",
        ]
      : ["Sem valor calculável; avaliação sob orçamento."]),
    ...(estimate.pending.length ? ["ITENS A COTAR", ...estimate.pending.map((p) => `• ${p}`)] : []),
    ...(project.description.trim() ? [`Minha ideia: ${project.description.trim()}`] : []),
    "Simulação referencial, não proposta final. Licenças, hospedagem, consumo de APIs/IA, manutenção e verba de anúncios não incluídos.",
  ].join("\n");
}
