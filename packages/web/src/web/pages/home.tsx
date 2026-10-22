import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Compass,
  Instagram,
  Layers3,
  Menu,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { expertise, grPlans, grServices, plans, whatsapp, type Plan } from "../lib/catalog";
import { PromoCarousel } from "../components/promo-carousel";

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#inicio"
      aria-label="AssisTInfo, início"
    >
      <span className="brand-mark">
        <img src="/images/assistinfo-mark.webp" alt="" width="43" height="51" />
      </span>
      <span>
        Assis<span className="brand-blue">TInfo</span>
        <small>TECHNOLOGY</small>
      </span>
    </a>
  );
}

function WhatsAppLink({
  children,
  message,
  partner = false,
  className = "button button-blue",
}: {
  children: React.ReactNode;
  message?: string;
  partner?: boolean;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={whatsapp(message, partner)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function PlanDialog({ plan, onClose }: { plan: Plan | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (plan) ref.current?.showModal();
    else ref.current?.close();
  }, [plan]);
  return (
    <dialog
      ref={ref}
      className="plan-dialog"
      aria-labelledby="plan-dialog-title"
      onCancel={onClose}
    >
      {plan && (
        <>
          <button className="dialog-close" aria-label="Fechar detalhes" onClick={onClose}>
            <X size={22} />
          </button>
          <span className="icon-box">
            <plan.icon size={25} />
          </span>
          <p className="eyebrow">CONHEÇA A SOLUÇÃO</p>
          <h2 id="plan-dialog-title">{plan.name}</h2>
          <p>{plan.description}</p>
          <ul className="feature-list">
            {plan.features.map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>
          <div className="dialog-price">
            {plan.from && <small>A partir de </small>}
            <strong>R$ {plan.price}</strong>
          </div>
          <p className="scope-note">
            O escopo, os prazos e as condições serão confirmados com a equipe antes da contratação.
          </p>
          <WhatsAppLink
            message={`Olá! Quero saber mais sobre o plano ${plan.name}, anunciado ${plan.from ? "a partir de " : "por "}R$ ${plan.price}.`}
          >
            <FaWhatsapp /> Conversar sobre este plano <ArrowUpRight size={18} />
          </WhatsAppLink>
        </>
      )}
    </dialog>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const filtered = filter === "all" ? plans : plans.filter((plan) => plan.category === filter);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Tecnologia que conecta ideias a novas possibilidades.</span>
          <a
            href="https://www.instagram.com/assistinfo_25/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={13} /> Acompanhe a AssisTInfo <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav
            id="main-nav"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Navegação principal"
          >
            {[
              ["Início", "inicio"],
              ["Nossas soluções", "solucoes"],
              ["Especialidades", "especialidades"],
              ["Parceira GR Visual", "gr-visual"],
            ].map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {label}
                {id === "solucoes" && <ChevronDown size={12} />}
              </a>
            ))}
            <WhatsAppLink className="button button-blue mobile-nav-cta">
              Vamos conversar <ArrowUpRight size={16} />
            </WhatsAppLink>
          </nav>
          <WhatsAppLink className="button button-blue header-cta">
            Vamos conversar <ArrowUpRight size={16} />
          </WhatsAppLink>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="hero" id="inicio">
          <div className="hero-orbit" />
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span /> TECNOLOGIA COM PROPÓSITO. RESULTADOS REAIS.
              </div>
              <h1>
                Sua ideia,
                <br />
                nossa <span>criação.</span>
                <span className="heading-period" />
              </h1>
              <p>
                Transforme seu negócio com a <strong>AssisTInfo Technology.</strong> Soluções
                completas em desenvolvimento, automação e inteligência artificial.
              </p>
              <div className="hero-actions">
                <WhatsAppLink>
                  <FaWhatsapp size={19} /> Fale com a AssisTInfo <ArrowUpRight size={17} />
                </WhatsAppLink>
                <a className="text-link" href="#solucoes">
                  Explore as soluções <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-note">
                <span className="note-line" />
                <span>Da primeira ideia ao próximo nível do seu negócio.</span>
              </div>
            </div>
            <PromoCarousel />
          </div>
          <div className="container hero-bottom">
            <span>DESENVOLVIMENTO</span>
            <span className="cross">+</span>
            <span>AUTOMAÇÃO</span>
            <span className="cross">+</span>
            <span>INTELIGÊNCIA ARTIFICIAL</span>
            <div className="hero-bottom-line" />
            <a href="#solucoes" aria-label="Ir para nossas soluções">
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <div className="value-strip">
          <div className="container value-grid">
            <div>
              <span className="value-icon">
                <Compass size={24} />
              </span>
              <span>
                <strong>Tecnologia do seu jeito</strong>
                <small>Soluções alinhadas ao seu negócio.</small>
              </span>
            </div>
            <div>
              <span className="value-icon">
                <Target size={24} />
              </span>
              <span>
                <strong>Foco no que importa</strong>
                <small>Mais eficiência. Novas oportunidades.</small>
              </span>
            </div>
            <div>
              <span className="value-icon">
                <ShieldCheck size={24} />
              </span>
              <span>
                <strong>Parceria de verdade</strong>
                <small>Proximidade em cada etapa do projeto.</small>
              </span>
            </div>
          </div>
        </div>

        <section className="section pricing-section" id="solucoes">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span /> CONHEÇA NOSSAS SOLUÇÕES
                </p>
                <h2>
                  Tecnologia para cada
                  <br />
                  <span>momento do seu negócio.</span>
                </h2>
              </div>
              <p className="section-intro">
                Serviços da AssisTInfo.
                <br />
                Escolha seu próximo passo. A gente cria o caminho.
              </p>
            </div>
            <div className="catalog-toolbar">
              <fieldset className="filter-tabs">
                <legend className="sr-only">Filtrar soluções</legend>
                {[
                  ["all", "Todas as soluções"],
                  ["web", "Sites & presença digital"],
                  ["automation", "Automação & negócios"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    aria-pressed={filter === id}
                    className={filter === id ? "active" : ""}
                    onClick={() => setFilter(id)}
                  >
                    {label}
                  </button>
                ))}
              </fieldset>
              <span className="catalog-count">
                {filtered.length + (filter === "all" ? 1 : 0)} soluções para ir além
              </span>
            </div>
            <div className="pricing-grid">
              {filtered.map((plan) => (
                <article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.id}>
                  {plan.featured && (
                    <span className="card-ribbon">
                      <Sparkles size={12} /> PRESENÇA + CRESCIMENTO
                    </span>
                  )}
                  <div className="card-top">
                    <span className="icon-box">
                      <plan.icon size={24} />
                    </span>
                    <button
                      className="card-detail-icon"
                      aria-label={`Ver detalhes de ${plan.name}`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <ArrowUpRight size={21} />
                    </button>
                  </div>
                  <h3>{plan.name}</h3>
                  <p className="card-description">{plan.label}</p>
                  <div className="price-block">
                    <small>{plan.from ? "A partir de" : "Investimento"}</small>
                    <div>
                      <span>R$</span>
                      <strong>{plan.price}</strong>
                    </div>
                  </div>
                  <div className="card-divider" />
                  <ul className="feature-list">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={15} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <WhatsAppLink
                    className={`button ${plan.featured ? "button-blue" : "button-outline"} card-cta`}
                    message={`Olá! Quero contratar o plano ${plan.name}, anunciado ${plan.from ? "a partir de " : "por "}R$ ${plan.price}. Podemos conversar?`}
                  >
                    Quero esta solução <ArrowRight size={16} />
                  </WhatsAppLink>
                  <button className="detail-link" onClick={() => setSelectedPlan(plan)}>
                    Conheça os detalhes <Plus size={12} />
                  </button>
                </article>
              ))}
            </div>
            <div className="custom-solution">
              <div className="custom-icon">
                <Layers3 size={32} />
              </div>
              <div>
                <span className="eyebrow">SEU DESAFIO É ÚNICO. SUA SOLUÇÃO TAMBÉM.</span>
                <h3>A.TI Solução Personalizada</h3>
                <p>Combine soluções e descubra uma estimativa para tirar sua ideia do papel.</p>
              </div>
              <div className="custom-action">
                <span>Simule seu investimento · sem compromisso</span>
                <Link href="/calculadora" className="button button-dark">
                  Calcular meu projeto <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <p className="pricing-note">
              Contratação com atendimento humano pelo WhatsApp. Escopo, prazos e condições definidos
              com você.
            </p>
          </div>
        </section>

        <section className="section expertise-section" id="especialidades">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span /> MUITO ALÉM DO CÓDIGO
                </p>
                <h2>
                  Seu desafio. <span>Nossa expertise.</span>
                </h2>
              </div>
              <p className="section-intro">
                Também trabalhamos com soluções que
                <br />
                conectam todas as partes do seu negócio.
              </p>
            </div>
            <div className="expertise-grid">
              {expertise.map((item) => (
                <a
                  href={whatsapp(`Olá! Tenho interesse em ${item.title}. Podemos conversar?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.title}
                  className="expertise-item"
                >
                  <item.icon size={27} strokeWidth={1.6} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ArrowUpRight className="expertise-arrow" size={17} />
                </a>
              ))}
              <div className="expertise-last">
                <span>
                  O QUE VOCÊ IMAGINA,
                  <br />A GENTE CONECTA.
                </span>
                <Code2 size={34} />
              </div>
            </div>
          </div>
        </section>

        <section className="gr-section" id="gr-visual">
          <div className="container">
            <div className="partner-topline">
              <span>
                <i /> UMA PARCERIA QUE MULTIPLICA POSSIBILIDADES
              </span>
              <span className="partner-badge">
                <ShieldCheck size={13} /> PARCEIRA OFICIAL
              </span>
            </div>
            <div className="gr-intro">
              <div>
                <div className="gr-wordmark">
                  <span className="gr-monogram">
                    GR
                    <span />
                  </span>
                  <span>
                    Visual<small>COMUNICAÇÕES</small>
                  </span>
                </div>
                <p className="gr-signature">
                  Criação <b>•</b> Divulgação <b>•</b> Presença Digital
                </p>
                <h2>
                  Sua marca precisa <em>aparecer.</em>
                  <br />
                  Sua empresa precisa <span>ser vista.</span>
                </h2>
                <p className="gr-intro-text">
                  A tecnologia da AssisTInfo encontra a criatividade da GR Visual.
                  <br />
                  Juntos fazemos sua marca ir mais longe!
                </p>
                <a
                  className="instagram-link"
                  href="https://www.instagram.com/grvisualoficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={17} /> @grvisualoficial <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="gr-art" aria-hidden="true">
                <div className="gr-art-orbit" />
                <div className="art-window">
                  <div className="window-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className="art-small">SEJA VISTO. SEJA LEMBRADO.</span>
                  <span className="art-big">
                    Sua marca.
                    <br />
                    <em>Em outro</em>
                    <br />
                    <em>nível.</em>
                    <ArrowUpRight />
                  </span>
                  <div className="art-bottom">
                    <span>GR VISUAL®</span>
                    <span>
                      CRIATIVIDADE
                      <br />
                      QUE CONECTA.
                    </span>
                  </div>
                </div>
                <div className="gr-art-tag">
                  <Zap size={17} fill="currentColor" /> PRESENÇA QUE GERA CONEXÃO
                </div>
              </div>
            </div>
            <div className="gr-services">
              {grServices.map((item) => (
                <div key={item.title}>
                  <item.icon size={22} />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </span>
                </div>
              ))}
            </div>
            <div className="gr-pricing-heading">
              <div>
                <p className="eyebrow">SUA PRESENÇA DIGITAL COMEÇA AQUI</p>
                <h3>Um plano para sua próxima conquista.</h3>
              </div>
              <span>Conteúdo, estratégia e criatividade.</span>
            </div>
            <div className="gr-pricing-grid">
              {grPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`gr-card ${plan.featured ? "gr-featured" : ""}`}
                >
                  <div className="gr-card-heading">
                    <h4>{plan.name}</h4>
                    {plan.featured && <Sparkles size={17} />}
                  </div>
                  <div className="gr-price">
                    <span>R$</span>
                    <strong>{plan.price}</strong>
                    {plan.monthly && <small>/mês</small>}
                  </div>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <WhatsAppLink
                    className={`button ${plan.featured ? "button-magenta" : "button-gr"}`}
                    partner
                    message={`Olá, GR Visual! Quero fechar meu plano agora: ${plan.name}, por R$ ${plan.price}${plan.monthly ? "/mês" : ""}.`}
                  >
                    Escolher este plano <ArrowUpRight size={15} />
                  </WhatsAppLink>
                </article>
              ))}
            </div>
            <p className="gr-note">
              Escopo e condições confirmados com a GR Visual. Nos planos com tráfego pago, consulte
              as condições da verba de anúncios.
            </p>
            <div className="gr-final">
              <div>
                <strong>Pronto para colocar sua marca em movimento?</strong>
                <span>Vamos transformar sua presença digital.</span>
              </div>
              <WhatsAppLink
                partner
                message="Olá, GR Visual! Quero fechar meu plano agora."
                className="button button-magenta"
              >
                <FaWhatsapp size={19} /> Quero fechar meu plano agora <ArrowUpRight size={16} />
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section className="final-cta" id="contato">
          <div className="container final-cta-inner">
            <span className="final-cta-icon">
              <MessageCircle size={30} />
            </span>
            <p className="eyebrow">BOAS IDEIAS MERECEM SAIR DO PAPEL.</p>
            <h2>
              Seu próximo capítulo
              <br />
              começa com <span>uma conversa.</span>
            </h2>
            <p>
              Tem uma ideia ou precisa de uma solução para sua empresa?
              <br />
              Fale com a AssisTInfo Technology. Sua ideia, nossa criação.
            </p>
            <WhatsAppLink>
              <FaWhatsapp size={19} /> Vamos falar sobre sua ideia <ArrowUpRight size={17} />
            </WhatsAppLink>
            <span className="contact-number">(27) 99311-1872</span>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Brand light />
              <p>
                Conectamos sua ideia
                <br />
                ao futuro do seu negócio.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <a href="#solucoes">Nossas soluções</a>
              <a href="#especialidades">Especialidades</a>
              <a href="#gr-visual">GR Visual Comunicações</a>
            </div>
            <div>
              <h4>Vamos nos conectar</h4>
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp /> (27) 99311-1872
              </a>
              <a
                href="https://www.instagram.com/assistinfo_25/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={15} /> @assistinfo_25
              </a>
              <span className="footer-status">
                <i /> Atendimento online para todo o Brasil
              </span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} AssisTInfo Technology. Todos os direitos reservados.
            </span>
            <span>
              Feito de ideias. Movido por tecnologia.
              <span className="footer-dot" />
            </span>
          </div>
        </div>
      </footer>
      <WhatsAppLink className="floating-whatsapp">
        <span className="floating-tooltip">Vamos conversar?</span>
        <FaWhatsapp size={27} />
        <span className="sr-only">Conversar com a AssisTInfo no WhatsApp</span>
      </WhatsAppLink>
      <PlanDialog plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </>
  );
}
