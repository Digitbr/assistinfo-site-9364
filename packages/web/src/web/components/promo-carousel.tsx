import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Image,
  LayoutDashboard,
  MousePointer2,
  Pause,
  Play,
  Presentation,
  Sparkles,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsapp } from "../lib/catalog";

const campaigns = [
  {
    name: "Sites & Sistemas",
    kicker: "TECNOLOGIA QUE TRABALHA POR VOCÊ",
    title: "Seu negócio merece",
    emphasis: "uma solução à altura.",
    description: "Sites profissionais e sistemas que simplificam o dia a dia da sua empresa.",
    services: ["Sites profissionais", "Gestão de frotas", "Ordens de serviço"],
    cta: "Quero meu site ou sistema",
    icon: Code2,
  },
  {
    name: "Posts & Apresentações",
    kicker: "DESIGN PARA SER VISTO. E LEMBRADO.",
    title: "Sua marca em destaque.",
    emphasis: "Sua ideia com impacto.",
    description:
      "Posts e apresentações profissionais para fortalecer a sua presença digital e comercial.",
    services: ["Posts para redes", "Apresentações", "Identidade visual"],
    cta: "Quero destacar minha marca",
    icon: Sparkles,
  },
];

function Preview({ design, service }: { design: boolean; service: number }) {
  const captions = design
    ? ["Conteúdo que conecta.", "Ideias que impressionam.", "Uma marca. Sua essência."]
    : ["Sua empresa, online.", "Sua frota, conectada.", "Sua operação, organizada."];
  return (
    <div
      className={`campaign-preview ${design ? "preview-design" : "preview-system"}`}
      aria-hidden="true"
    >
      <div className="preview-chrome">
        <span>
          <i />
          <i />
          <i />
        </span>
        <small>{design ? "ESTÚDIO CRIATIVO" : "SEU PAINEL DIGITAL"}</small>
        <ArrowUpRight size={10} />
      </div>
      {design ? (
        <div className="design-preview-body">
          <div className="design-preview-heading">
            <span>
              DESIGN QUE
              <br />
              <b>FAZ ACONTECER.</b>
            </span>
            {service === 1 ? (
              <Presentation size={25} />
            ) : service === 2 ? (
              <MousePointer2 size={25} />
            ) : (
              <Image size={25} />
            )}
          </div>
          <div className={`design-tiles design-mode-${service}`}>
            <div />
            <div />
            <div />
          </div>
          <span className="preview-caption">{captions[service]}</span>
        </div>
      ) : (
        <div className="system-preview-body">
          <div className="preview-sidebar">
            <LayoutDashboard size={11} />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="preview-dashboard">
            <div className="preview-dashboard-title">
              {captions[service]} <span>VISÃO GERAL</span>
            </div>
            <div className="preview-metrics">
              <div />
              <div />
              <div />
            </div>
            <div className="preview-chart">
              {[30, 54, 37, 68, 52, 79, 64, 92, 73].map((height, i) => (
                <i key={i} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="preview-table">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
      <div className="preview-example">PRÉVIA ILUSTRATIVA</div>
    </div>
  );
}

export function PromoCarousel() {
  const [active, setActive] = useState(0);
  const [services, setServices] = useState([0, 0]);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setReducedMotion(media.matches);
      setPlaying(!media.matches);
    };
    const syncVisibility = () => setVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion || hovered || focused || !visible || !inView) return;
    const interval = window.setInterval(
      () => setActive((current) => (current + 1) % campaigns.length),
      7000,
    );
    return () => window.clearInterval(interval);
  }, [playing, reducedMotion, hovered, focused, visible, inView, active]);

  const select = (index: number) => {
    setActive((index + campaigns.length) % campaigns.length);
    setPlaying(false);
  };
  const campaign = campaigns[active];
  const service = services[active];
  const Icon = campaign.icon;

  return (
    <section
      ref={ref}
      className="promo-carousel"
      aria-label="Soluções em destaque da AssisTInfo"
      aria-roledescription="carrossel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="campaign-card" aria-live={playing ? "off" : "polite"} aria-atomic="true">
        <article
          className={`campaign-slide ${active === 1 ? "campaign-creative" : ""}`}
          key={active}
          aria-label={`Anúncio ${active + 1} de 2: ${campaign.name}`}
        >
          <div className="campaign-grid" aria-hidden="true" />
          <div className="campaign-electric" aria-hidden="true" />
          <div className="campaign-topline">
            <span>
              <i /> ASSISTINFO EM DESTAQUE
            </span>
            <span>
              0{active + 1}
              <b> / 02</b>
            </span>
          </div>
          <div className="campaign-copy">
            <p className="campaign-kicker">{campaign.kicker}</p>
            <h2>
              {campaign.title}
              <br />
              <em>{campaign.emphasis}</em>
            </h2>
            <p className="campaign-description">{campaign.description}</p>
          </div>
          <fieldset className="campaign-services">
            <legend className="sr-only">Explore os serviços de {campaign.name}</legend>
            {campaign.services.map((label, index) => (
              <button
                key={label}
                className={service === index ? "selected" : ""}
                aria-pressed={service === index}
                onClick={() => {
                  setServices((current) => current.map((item, i) => (i === active ? index : item)));
                  setPlaying(false);
                }}
              >
                {service === index && <Check size={10} />}
                {label}
              </button>
            ))}
          </fieldset>
          <div className="campaign-stage">
            <div className="campaign-mascot-halo" aria-hidden="true" />
            <img
              className="campaign-mascot"
              src="/images/assistinfo-mascot.png"
              alt="Mascote AssisTInfo azul com detalhes dourados, extraído do anúncio original"
              fetchPriority="high"
              width="400"
              height="655"
            />
            <Preview design={active === 1} service={service} />
            <span className="campaign-stamp">
              <Icon size={13} />{" "}
              {active === 0 ? "IDEIAS QUE VIRAM SOLUÇÕES" : "CRIATIVIDADE COM PROPÓSITO"}
            </span>
          </div>
          <div className="campaign-footer">
            <a
              className="campaign-cta"
              href={whatsapp(
                `Olá! Vi o anúncio de ${campaign.name} no site da AssisTInfo e tenho interesse em ${campaign.services[service]}. Podemos conversar?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={17} />
              {campaign.cta}
              <ArrowUpRight size={17} />
            </a>
            <span>
              <Zap size={11} /> SUA IDEIA. NOSSA CRIAÇÃO.
            </span>
          </div>
        </article>
      </div>
      <div className="campaign-controls">
        <div className="campaign-selectors">
          {campaigns.map((item, index) => (
            <button
              key={item.name}
              aria-label={`Mostrar anúncio ${index + 1}: ${item.name}`}
              aria-pressed={active === index}
              className={active === index ? "active" : ""}
              onClick={() => select(index)}
            >
              <span />
              {item.name}
            </button>
          ))}
        </div>
        <div className="campaign-player">
          <button
            className="campaign-play"
            disabled={reducedMotion}
            title={
              reducedMotion
                ? "Rotação automática desativada pela preferência de movimento reduzido"
                : playing
                  ? "Pausar rotação automática"
                  : "Reproduzir rotação automática"
            }
            aria-label={playing ? "Pausar anúncios" : "Reproduzir anúncios"}
            aria-pressed={playing}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button aria-label="Anúncio anterior" onClick={() => select(active - 1)}>
            <ArrowLeft size={15} />
          </button>
          <button aria-label="Próximo anúncio" onClick={() => select(active + 1)}>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
