import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Calculator,
  ChevronRight,
  FileText,
  Info,
  Layers3,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  aiOptions,
  apiOptions,
  complexities,
  currency,
  estimateProject,
  initialProject,
  pillars,
  projectMessage,
  recommendations,
  webOptions,
  type PillarId,
  type Project,
} from "../lib/estimator";
import { whatsapp } from "../lib/catalog";

const steps = ["Escolha os pilares", "Configure o escopo", "Veja sua estimativa"];

function FormatOptions({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: readonly { id: string; name: string; price: number | null; detail: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="calc-options">
      <legend>{title}</legend>
      <div>
        {options.map((option) => (
          <label className={value === option.id ? "selected" : ""} key={option.id}>
            <input
              type="radio"
              aria-label={option.name}
              name={title}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span>
              <strong>{option.name}</strong>
              <small>{option.detail}</small>
            </span>
            <b>{option.price === null ? "Sob orçamento" : currency(option.price)}</b>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function CalculatorPage() {
  const [project, setProject] = useState<Project>(initialProject);
  const [step, setStep] = useState(0);
  const previousStep = useRef(0);
  const estimate = estimateProject(project);
  const suggestions = recommendations(project);
  const selectedPillars = pillars.filter((p) => project.selected.includes(p.id));

  useEffect(() => {
    const old = document.title;
    document.title = "Calculadora de projetos — AssisTInfo";
    window.scrollTo(0, 0);
    return () => {
      document.title = old;
    };
  }, []);

  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    const frame = window.requestAnimationFrame(() => {
      const workspace = document.getElementById("calculator-workspace");
      if (workspace)
        window.scrollTo({
          top: workspace.getBoundingClientRect().top + window.scrollY - 100,
          behavior: "instant",
        });
      document.getElementById("calc-step-heading")?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [step]);

  function goTo(next: number) {
    setStep(next);
  }
  function togglePillar(id: PillarId) {
    setProject((current) => ({
      ...current,
      selected: current.selected.includes(id)
        ? current.selected.filter((item) => item !== id)
        : [...current.selected, id],
    }));
  }
  function toggleFeature(id: PillarId, feature: string) {
    setProject((current) => ({
      ...current,
      scopes: {
        ...current.scopes,
        [id]: {
          ...current.scopes[id],
          features: current.scopes[id].features.includes(feature)
            ? current.scopes[id].features.filter((item) => item !== feature)
            : [...current.scopes[id].features, feature],
        },
      },
    }));
  }
  function reset() {
    setProject(initialProject());
    setStep(0);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div className="calculator-page">
      <header className="calc-header">
        <div className="container">
          <Link href="/" className="brand">
            <span className="brand-mark">
              <img src="/images/assistinfo-mark.webp" alt="" width="43" height="51" />
            </span>
            <span>
              Assis<span className="brand-blue">TInfo</span>
              <small>TECHNOLOGY</small>
            </span>
          </Link>
          <span className="calc-header-label">
            <Calculator size={15} /> CONFIGURADOR DE PROJETOS
          </span>
          <Link href="/" className="calc-home">
            <ArrowLeft size={15} /> Voltar ao site
          </Link>
        </div>
      </header>
      <main>
        <section className="calc-hero">
          <div className="container">
            <div className="calc-breadcrumb">
              <Link href="/">Início</Link>
              <ChevronRight size={12} />
              <span>Solução personalizada</span>
            </div>
            <div className="calc-hero-grid">
              <div>
                <p className="eyebrow">
                  <span /> SUA IDEIA, UM PASSO MAIS PERTO.
                </p>
                <h1>
                  Seu projeto. Suas escolhas.
                  <br />
                  <span>Uma estimativa mais clara.</span>
                </h1>
                <p>
                  Combine soluções, defina seu escopo e descubra uma faixa de investimento.
                  <br />A tecnologia certa começa entendendo o que você precisa.
                </p>
              </div>
              <div className="calc-hero-note">
                <span>
                  <Layers3 size={27} />
                </span>
                <div>
                  <strong>Feito para o seu negócio.</strong>
                  <p>7 pilares. Possibilidades que se conectam.</p>
                  <small>Sem compromisso. Sem cadastro.</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="calc-workspace container" id="calculator-workspace">
          <nav className="calc-steps" aria-label="Etapas da calculadora">
            <ol>
              {steps.map((label, index) => (
                <li key={label}>
                  <button
                    aria-current={step === index ? "step" : undefined}
                    disabled={index > 0 && !project.selected.length}
                    className={step === index ? "active" : step > index ? "completed" : ""}
                    onClick={() => goTo(index)}
                  >
                    <span>{step > index ? <Check size={15} /> : `0${index + 1}`}</span>
                    <strong>{label}</strong>
                  </button>
                </li>
              ))}
            </ol>
            <button className="calc-reset" onClick={reset}>
              <RotateCcw size={14} /> Recomeçar
            </button>
          </nav>
          <div className="calc-layout">
            <div className="calc-main">
              <div className="calc-section-heading">
                <span>ETAPA 0{step + 1} / 03</span>
                <h2 id="calc-step-heading" tabIndex={-1}>
                  {step === 0
                    ? "O que vamos criar juntos?"
                    : step === 1
                      ? "Dê forma à sua ideia."
                      : "Seu próximo passo, dimensionado."}
                </h2>
                <p>
                  {step === 0
                    ? "Selecione um ou mais pilares. As opções de escopo serão montadas a partir das suas escolhas."
                    : step === 1
                      ? "Escolha o formato, as funcionalidades e o volume de cada solução. Tudo permanece editável."
                      : "Confira a composição do projeto e envie a simulação para a equipe validar escopo e investimento."}
                </p>
              </div>
              {step === 0 && (
                <>
                  <div className="calc-pillar-grid">
                    {pillars.map((pillar) => {
                      const selected = project.selected.includes(pillar.id);
                      const Icon = pillar.icon;
                      return (
                        <button
                          className={`calc-pillar ${selected ? "selected" : ""}`}
                          key={pillar.id}
                          aria-pressed={selected}
                          onClick={() => togglePillar(pillar.id)}
                        >
                          <span className="calc-pillar-top">
                            <span className="icon-box">
                              <Icon size={23} />
                            </span>
                            <span className="calc-checkbox">
                              {selected ? <Check size={13} /> : <Plus size={13} />}
                            </span>
                          </span>
                          <h3>{pillar.name}</h3>
                          <p>{pillar.description}</p>
                          <span className="calc-reference">{pillar.reference}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="calc-help">
                    <Info size={17} />
                    <p>
                      Os valores vêm da tabela da AssisTInfo. Serviços sem preço definido continuam{" "}
                      <strong>sob orçamento</strong> — nunca são tratados como gratuitos.
                    </p>
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="calc-scope-list">
                    {selectedPillars.map((pillar) => {
                      const Icon = pillar.icon;
                      const scope = project.scopes[pillar.id];
                      return (
                        <section className="calc-scope" key={pillar.id}>
                          <div className="calc-scope-title">
                            <span className="icon-box">
                              <Icon size={22} />
                            </span>
                            <div>
                              <h3>{pillar.name}</h3>
                              <p>{pillar.description}</p>
                            </div>
                            <button
                              aria-label={`Remover ${pillar.name}`}
                              className="calc-remove"
                              onClick={() => {
                                togglePillar(pillar.id);
                                if (project.selected.length === 1) setStep(0);
                              }}
                            >
                              Remover
                            </button>
                          </div>
                          {pillar.id === "web" && (
                            <FormatOptions
                              title="Formato da presença digital"
                              options={webOptions}
                              value={project.webType}
                              onChange={(value) =>
                                setProject((current) => ({
                                  ...current,
                                  webType: value as Project["webType"],
                                }))
                              }
                            />
                          )}
                          {pillar.id === "ai" && (
                            <FormatOptions
                              title="Solução de atendimento e IA"
                              options={aiOptions}
                              value={project.aiType}
                              onChange={(value) =>
                                setProject((current) => ({
                                  ...current,
                                  aiType: value as Project["aiType"],
                                }))
                              }
                            />
                          )}
                          {pillar.id === "api" && (
                            <FormatOptions
                              title="Modelo de integração"
                              options={apiOptions}
                              value={project.apiType}
                              onChange={(value) =>
                                setProject((current) => ({
                                  ...current,
                                  apiType: value as Project["apiType"],
                                }))
                              }
                            />
                          )}
                          <fieldset className="calc-feature-options">
                            <legend>O que você precisa?</legend>
                            <p>
                              Seleções para dimensionar o escopo; não adicionam taxas individuais.
                            </p>
                            <div>
                              {pillar.features.map((feature) => (
                                <label
                                  key={feature}
                                  className={scope.features.includes(feature) ? "selected" : ""}
                                >
                                  <input
                                    type="checkbox"
                                    aria-label={feature}
                                    checked={scope.features.includes(feature)}
                                    onChange={() => toggleFeature(pillar.id, feature)}
                                  />
                                  <span>{feature}</span>
                                </label>
                              ))}
                            </div>
                          </fieldset>
                          <label className="calc-volume">
                            <span>Volume aproximado</span>
                            <select
                              value={scope.volume}
                              onChange={(event) => {
                                const volume = Number(event.target.value);
                                setProject((current) => ({
                                  ...current,
                                  scopes: {
                                    ...current.scopes,
                                    [pillar.id]: { ...current.scopes[pillar.id], volume },
                                  },
                                }));
                              }}
                            >
                              {pillar.volumes.map((label, index) => (
                                <option value={index} key={label}>
                                  {label}
                                </option>
                              ))}
                            </select>
                          </label>
                        </section>
                      );
                    })}
                  </div>
                  {estimate.extrasEligible && (
                    <section className="calc-extras">
                      <div>
                        <FileText size={20} />
                        <h3>Módulos adicionais</h3>
                      </div>
                      <p>
                        Inclua somente se precisar de um serviço separado. Não marque novamente algo
                        já contemplado no escopo combinado com a equipe.
                      </p>
                      {[
                        { id: "database", name: "Modelagem de banco de dados", price: 500 },
                        { id: "pdf", name: "Motor de relatórios em PDF", price: 800 },
                      ].map((extra) => (
                        <label key={extra.id}>
                          <input
                            type="checkbox"
                            aria-label={extra.name}
                            checked={project.extras[extra.id as keyof Project["extras"]]}
                            onChange={(event) => {
                              const checked = event.target.checked;
                              setProject((current) => ({
                                ...current,
                                extras: { ...current.extras, [extra.id]: checked },
                              }));
                            }}
                          />
                          <span>
                            {extra.name}
                            <small>Serviço adicional · a partir de</small>
                          </span>
                          <strong>{currency(extra.price)}</strong>
                        </label>
                      ))}
                    </section>
                  )}
                  <fieldset className="calc-complexity">
                    <legend>Qual é a complexidade do projeto?</legend>
                    <p>
                      Funcionalidades e volume compõem o briefing, sem taxas automáticas. Você
                      escolhe o nível de complexidade; os ajustes são referenciais e precisam de
                      validação da equipe.
                    </p>
                    <div>
                      {complexities.map((item) => (
                        <label
                          key={item.id}
                          className={project.complexity === item.id ? "selected" : ""}
                        >
                          <input
                            type="radio"
                            aria-label={`Complexidade ${item.name}`}
                            name="complexity"
                            checked={project.complexity === item.id}
                            onChange={() =>
                              setProject((current) => ({ ...current, complexity: item.id }))
                            }
                          />
                          <strong>{item.name}</strong>
                          <span>{item.detail}</span>
                          <b>{item.adjustment}</b>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="calc-description">
                    <span>
                      Conte um pouco mais sobre sua ideia <small>(opcional)</small>
                    </span>
                    <textarea
                      aria-label="Conte um pouco mais sobre sua ideia"
                      maxLength={700}
                      rows={3}
                      placeholder="Ex.: Quero conectar os pedidos da loja ao estoque e acompanhar as vendas em um painel..."
                      value={project.description}
                      onChange={(event) =>
                        setProject((current) => ({ ...current, description: event.target.value }))
                      }
                    />
                    <small>
                      {project.description.length}/700 · Será incluído apenas na mensagem que você
                      enviar.
                    </small>
                  </label>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="calc-review-top">
                    <span>
                      <CheckCheck size={21} />
                    </span>
                    <div>
                      <strong>
                        {project.selected.length}{" "}
                        {project.selected.length === 1
                          ? "pilar selecionado"
                          : "pilares selecionados"}
                      </strong>
                      <p>
                        Complexidade {estimate.complexity.name.toLowerCase()} ·{" "}
                        {estimate.complexity.adjustment.toLowerCase()}
                      </p>
                    </div>
                    <button onClick={() => goTo(1)}>
                      Editar escopo <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="calc-review-items">
                    {selectedPillars.map((pillar) => {
                      const Icon = pillar.icon;
                      const scope = project.scopes[pillar.id];
                      const format =
                        pillar.id === "web"
                          ? webOptions.find((o) => o.id === project.webType)?.name
                          : pillar.id === "ai"
                            ? aiOptions.find((o) => o.id === project.aiType)?.name
                            : pillar.id === "api"
                              ? apiOptions.find((o) => o.id === project.apiType)?.name
                              : "";
                      return (
                        <article key={pillar.id}>
                          <Icon size={21} />
                          <div>
                            <h3>{pillar.name}</h3>
                            <p>
                              {format ? `${format} · ` : ""}
                              {pillar.volumes[scope.volume]}
                            </p>
                            <div>
                              {scope.features.length ? (
                                scope.features.map((feature) => (
                                  <span key={feature}>{feature}</span>
                                ))
                              ) : (
                                <span>Funcionalidades a definir com a equipe</span>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  {project.description.trim() && (
                    <div className="calc-brief">
                      <h3>Sua ideia</h3>
                      <p>{project.description}</p>
                    </div>
                  )}
                  <section className="calc-breakdown">
                    <div>
                      <h3>Como chegamos ao valor?</h3>
                      <span>TABELA ASSISTINFO + AJUSTES REFERENCIAIS</span>
                    </div>
                    {estimate.lines.length ? (
                      <>
                        <ul>
                          {estimate.lines.map((line) => (
                            <li key={line.id}>
                              <span>
                                <strong>{line.name}</strong>
                                <small>{line.basis}</small>
                              </span>
                              <b>{currency(line.price)}</b>
                            </li>
                          ))}
                        </ul>
                        <div className="calc-breakdown-row">
                          <span>Soma das bases da tabela</span>
                          <strong>{currency(estimate.base)}</strong>
                        </div>
                        <div className="calc-breakdown-row">
                          <span>
                            Ajuste de complexidade (
                            {estimate.complexity.factor === 1
                              ? "0"
                              : estimate.complexity.factor === 1.3
                                ? "30"
                                : "70"}
                            %)
                          </span>
                          <strong>+ {currency(estimate.adjustment)}</strong>
                        </div>
                        <div className="calc-breakdown-total">
                          <span>
                            {estimate.pending.length
                              ? "Faixa parcial dos itens tabelados"
                              : "Faixa estimada do projeto"}
                          </span>
                          <strong>
                            {currency(estimate.minimum)} — {currency(estimate.maximum)}
                          </strong>
                        </div>
                        <p className="calc-formula">
                          Base {currency(estimate.base)} ×{" "}
                          {estimate.complexity.factor.toLocaleString("pt-BR")} ={" "}
                          {currency(estimate.minimum)}. Limite superior: +20% referencial.
                        </p>
                      </>
                    ) : (
                      <div className="calc-no-price">
                        <Info size={20} />
                        <p>
                          Esses serviços não têm preço definido na tabela. A equipe avaliará seu
                          escopo para preparar uma proposta.
                        </p>
                      </div>
                    )}
                    {estimate.pending.length > 0 && (
                      <div className="calc-pending">
                        <strong>Não incluído na faixa — precisa de cotação</strong>
                        <ul>
                          {estimate.pending.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {estimate.sharedAutomation && (
                      <p className="calc-dedup">
                        <Check size={14} /> IA e APIs integradas usam um único pacote de R$ 2.500.
                      </p>
                    )}
                  </section>
                  <div className="calc-help">
                    <ShieldCheck size={18} />
                    <p>
                      <strong>Simulação, não proposta comercial.</strong> A faixa não é média de
                      mercado. Licenças, hospedagem, domínio, consumo de APIs/IA, manutenção e verba
                      de anúncios não estão incluídos. Escopo, prazo e investimento final serão
                      confirmados pela equipe.
                    </p>
                  </div>
                </>
              )}
              {suggestions.length > 0 && step > 0 && (
                <section className="calc-recommendations">
                  <h3>
                    <Sparkles size={16} /> Conexões que fazem sentido
                  </h3>
                  <p>Recomendações por regras de escopo. Nada é adicionado sem sua escolha.</p>
                  {suggestions.map((suggestion) => (
                    <article key={suggestion.title}>
                      <div>
                        <strong>{suggestion.title}</strong>
                        <p>{suggestion.text}</p>
                      </div>
                      {suggestion.pillar && (
                        <button
                          aria-label={`Adicionar ${pillars.find((p) => p.id === suggestion.pillar)?.name}`}
                          onClick={() => {
                            togglePillar(suggestion.pillar!);
                            setStep(1);
                          }}
                        >
                          <Plus size={14} /> Adicionar
                        </button>
                      )}
                    </article>
                  ))}
                </section>
              )}
              <div className="calc-bottom-nav">
                {step > 0 ? (
                  <button className="button button-outline" onClick={() => goTo(step - 1)}>
                    <ArrowLeft size={15} /> Voltar
                  </button>
                ) : (
                  <span>
                    {project.selected.length
                      ? `${project.selected.length} pilar(es) selecionado(s)`
                      : "Escolha pelo menos um pilar para continuar."}
                  </span>
                )}
                {step < 2 ? (
                  <button
                    className="button button-blue"
                    disabled={!project.selected.length}
                    onClick={() => goTo(step + 1)}
                  >
                    {step === 0 ? "Configurar meu projeto" : "Ver minha estimativa"}
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <a
                    className="button button-blue"
                    href={whatsapp(projectMessage(project))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp size={17} /> Validar pelo WhatsApp <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </div>
            <aside className="calc-summary" aria-label="Resumo do projeto">
              <div className="calc-summary-top">
                <span>
                  <Calculator size={17} /> SEU PROJETO EM TEMPO REAL
                </span>
                <i />
              </div>
              <h2>
                Uma ideia.
                <br />
                <span>Muitas possibilidades.</span>
              </h2>
              {project.selected.length === 0 ? (
                <div className="calc-empty">
                  <Layers3 size={35} />
                  <strong>O primeiro passo é seu.</strong>
                  <p>Selecione os pilares ao lado para começar a dimensionar sua solução.</p>
                </div>
              ) : (
                <>
                  <div className="calc-selected-tags">
                    {selectedPillars.map((p) => (
                      <span key={p.id}>
                        {p.name}
                        <button
                          aria-label={`Retirar ${p.name} do projeto`}
                          onClick={() => {
                            togglePillar(p.id);
                            if (project.selected.length === 1) setStep(0);
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="calc-live-value" aria-live="polite" aria-atomic="true">
                    <small>
                      {estimate.base
                        ? estimate.pending.length
                          ? "ESTIMATIVA PARCIAL · ITENS TABELADOS"
                          : "FAIXA ESTIMADA DE INVESTIMENTO"
                        : "AVALIAÇÃO PERSONALIZADA"}
                    </small>
                    {estimate.base ? (
                      <>
                        <strong>{currency(estimate.minimum)}</strong>
                        <span>até {currency(estimate.maximum)}</span>
                      </>
                    ) : (
                      <strong className="calc-quote-only">Sob orçamento</strong>
                    )}
                    <p>
                      {estimate.base
                        ? "Implantação do projeto · valores referenciais"
                        : "Vamos avaliar os detalhes com você."}
                    </p>
                  </div>
                  {estimate.pending.length > 0 && (
                    <div className="calc-summary-pending">
                      <Info size={15} />
                      <p>
                        <strong>
                          {estimate.pending.length}{" "}
                          {estimate.pending.length === 1
                            ? "item sob orçamento"
                            : "itens sob orçamento"}
                        </strong>
                        <br />
                        {estimate.base
                          ? "Essa faixa não inclui o projeto completo."
                          : "Não existe preço calculável para esses itens."}
                      </p>
                    </div>
                  )}
                  <div className="calc-summary-math">
                    <span>
                      Base da tabela{" "}
                      <b>{estimate.base ? currency(estimate.base) : "Sem preço definido"}</b>
                    </span>
                    <span>
                      Complexidade <b>{estimate.complexity.name}</b>
                    </span>
                    <span>
                      Ajuste referencial <b>{estimate.complexity.adjustment}</b>
                    </span>
                    <span>
                      Margem superior <b>{estimate.base ? "+20% referencial" : "Não aplicada"}</b>
                    </span>
                  </div>
                  {estimate.sharedAutomation && (
                    <p className="calc-summary-dedup">
                      <Check size={12} /> Automação contada uma única vez.
                    </p>
                  )}
                  <a
                    className="button calc-whatsapp"
                    href={whatsapp(projectMessage(project))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp size={18} />{" "}
                    {step === 2 ? "Enviar meu projeto" : "Conversar sobre a ideia"}
                    <ArrowUpRight size={15} />
                  </a>
                </>
              )}
              <div className="calc-summary-note">
                <ShieldCheck size={15} />
                <p>
                  Sem cobrança online. A simulação serve para orientar a conversa, não substitui um
                  orçamento validado.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <footer className="calc-footer container">
        <span>© {new Date().getFullYear()} AssisTInfo Technology</span>
        <span>Sua ideia, nossa criação.</span>
        <Link href="/">
          Voltar ao site <ArrowUpRight size={12} />
        </Link>
      </footer>
    </div>
  );
}
