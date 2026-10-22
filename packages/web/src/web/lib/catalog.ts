import {
  Globe2,
  Monitor,
  Bot,
  Megaphone,
  Workflow,
  BriefcaseBusiness,
  Code2,
  ShoppingCart,
  AppWindow,
  Cable,
  BrainCircuit,
  ChartNoAxesCombined,
  Palette,
  Instagram,
  MessageCircle,
  MousePointer2,
  Store,
  Contact,
} from "lucide-react";

export const whatsapp = (
  message = "Olá! Quero conversar sobre uma solução para a minha empresa.",
  partner = false,
) =>
  `https://wa.me/${partner ? "5527988435960" : "5527993111872"}?text=${encodeURIComponent(message)}`;

export const plans = [
  {
    id: "start",
    name: "A.TI Start Web",
    label: "O primeiro passo da sua presença digital",
    price: "920",
    from: true,
    category: "web",
    icon: Globe2,
    description: "Tire sua ideia do papel com uma presença online profissional, clara e acessível.",
    features: [
      "Presença digital profissional",
      "Design adaptado ao celular",
      "Contato direto com seu cliente",
    ],
  },
  {
    id: "negocio",
    name: "A.TI Negócio Digital",
    label: "Seu negócio pronto para ir além",
    price: "1.690",
    from: false,
    category: "web",
    icon: Monitor,
    description:
      "Apresente sua empresa e suas soluções em uma experiência digital pensada para gerar novas conexões.",
    features: [
      "Apresentação da sua empresa",
      "Experiência focada em conversão",
      "Seus serviços em destaque",
    ],
    featured: true,
  },
  {
    id: "venda",
    name: "A.TI Venda Rápida Digital",
    label: "Conecte sua oferta a quem precisa",
    price: "1.390",
    from: false,
    category: "automation",
    icon: Bot,
    description: "Facilite o caminho entre a descoberta da sua oferta e a conversa de venda.",
    features: [
      "Jornada de compra simplificada",
      "Foco na sua oferta",
      "Conexão com seus canais de venda",
    ],
  },
  {
    id: "divulgacao",
    name: "A.TI Site & Divulgação",
    label: "Uma presença que merece ser vista",
    price: "1.850",
    from: false,
    category: "web",
    icon: Megaphone,
    description:
      "Una presença digital e divulgação para apresentar sua marca a novas oportunidades.",
    features: [
      "Site para sua marca",
      "Presença e comunicação digital",
      "Estratégia alinhada ao seu negócio",
    ],
  },
  {
    id: "automacao",
    name: "A.TI Automação Inteligente",
    label: "Menos tarefas. Mais possibilidades.",
    price: "2.500",
    from: true,
    category: "automation",
    icon: Workflow,
    description:
      "Conecte ferramentas e simplifique processos para sua equipe focar no que realmente importa.",
    features: ["Fluxos conectados", "Automação de processos", "Soluções para sua operação"],
  },
  {
    id: "business",
    name: "A.TI Business Pro",
    label: "Tecnologia para o próximo nível",
    price: "3.000",
    from: true,
    category: "automation",
    icon: BriefcaseBusiness,
    description:
      "Uma visão integrada de tecnologia para acompanhar os próximos passos da sua empresa.",
    features: [
      "Solução orientada ao negócio",
      "Integração de possibilidades",
      "Estratégia e tecnologia juntas",
    ],
  },
];

export type Plan = (typeof plans)[number];
export const expertise = [
  { title: "Sites e Landing Pages", text: "Sua melhor primeira impressão.", icon: Globe2 },
  {
    title: "Lojas virtuais e E-commerce",
    text: "Sua vitrine aberta para o mundo.",
    icon: ShoppingCart,
  },
  { title: "Chatbots e Automação", text: "Mais agilidade em cada conversa.", icon: Bot },
  { title: "Sistemas Web e Aplicativos", text: "Ideias que viram ferramentas.", icon: AppWindow },
  { title: "Integrações e APIs", text: "Tudo conectado. Tudo mais simples.", icon: Cable },
  {
    title: "Inteligência Artificial",
    text: "Novas possibilidades para crescer.",
    icon: BrainCircuit,
  },
  {
    title: "Dashboards e Power BI",
    text: "Seus dados, decisões mais claras.",
    icon: ChartNoAxesCombined,
  },
];

export const grServices = [
  { icon: Instagram, title: "Social Media", text: "Artes para Instagram, Facebook e Stories" },
  {
    icon: MessageCircle,
    title: "WhatsApp que vende",
    text: "Divulgação e catálogos para WhatsApp",
  },
  { icon: Store, title: "Marketplace", text: "Divulgação para ampliar seu alcance" },
  { icon: MousePointer2, title: "Tráfego Pago", text: "Criação de anúncios e campanhas" },
  { icon: Palette, title: "Identidade Visual", text: "Sua identidade e sua logomarca" },
  { icon: Contact, title: "Cartão Digital", text: "Cartão de visita digital interativo" },
];

export const grPlans = [
  {
    name: "Pacote Mini Especial",
    price: "140",
    monthly: true,
    features: [
      "Ajustes na identidade visual",
      "3 Stories",
      "Estratégia de comunicação",
      "Tabela de preços",
    ],
  },
  {
    name: "Plano Básico",
    price: "150",
    monthly: true,
    features: [
      "3 posts por semana",
      "3 Stories por semana",
      "Planejamento de conteúdo",
      "Link na bio",
    ],
  },
  {
    name: "Plano Intermediário",
    price: "250",
    monthly: true,
    features: ["5 posts por semana", "Stories diários", "Planejamento e link na bio", "Suporte"],
  },
  {
    name: "Plano Pro",
    price: "397",
    monthly: true,
    features: ["5 posts estratégicos", "Stories diários interativos", "Link otimizado", "Suporte"],
    featured: true,
  },
  {
    name: "Pacote Mini + Tráfego Pago",
    price: "470",
    monthly: false,
    features: ["Gestão de redes sociais", "Criação de anúncios", "Presença + divulgação"],
  },
  {
    name: "Plano Premium",
    price: "680",
    monthly: true,
    features: [
      "Gestão completa",
      "Tráfego pago",
      "Estratégia personalizada",
      "Suporte prioritário",
    ],
  },
];

export { Code2 };
