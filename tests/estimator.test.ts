import { describe, expect, test } from "bun:test";
import {
  estimateProject,
  initialProject,
  projectMessage,
  recommendations,
} from "../packages/web/src/web/lib/estimator";

describe("Calculadora AssisTInfo", () => {
  test("não transforma seleção vazia em orçamento", () => {
    const e = estimateProject(initialProject());
    expect(e.lines).toHaveLength(0);
    expect(e.minimum).toBe(0);
  });
  test("landing usa 920, institucional 1690 e divulgação 1850 de modo exclusivo", () => {
    const p = initialProject();
    p.selected = ["web"];
    expect(estimateProject(p).base).toBe(920);
    p.webType = "institutional";
    expect(estimateProject(p).base).toBe(1690);
    p.webType = "promotion";
    expect(estimateProject(p).base).toBe(1850);
    expect(estimateProject(p).lines).toHaveLength(1);
  });
  test("e-commerce + sistema + dashboard somam bases corretas", () => {
    const p = initialProject();
    p.selected = ["commerce", "systems", "dashboards"];
    expect(estimateProject(p).base).toBe(5890);
  });
  test("aplica complexidade e margem aprovadas com arredondamento em BRL", () => {
    const p = initialProject();
    p.selected = ["systems"];
    p.complexity = "intermediate";
    let e = estimateProject(p);
    expect(e.minimum).toBe(3900);
    expect(e.maximum).toBe(4680);
    expect(e.adjustment).toBe(900);
    p.complexity = "advanced";
    e = estimateProject(p);
    expect(e.minimum).toBe(5100);
    expect(e.maximum).toBe(6120);
  });
  test("IA + APIs integradas contam automação uma única vez", () => {
    const p = initialProject();
    p.selected = ["ai", "api"];
    p.aiType = "automation";
    p.apiType = "integrated";
    const e = estimateProject(p);
    expect(e.base).toBe(2500);
    expect(e.lines).toHaveLength(1);
    expect(e.sharedAutomation).toBe(true);
    expect(e.pending).toHaveLength(0);
  });
  test("chatbot + pacote de automação são serviços diferentes", () => {
    const p = initialProject();
    p.selected = ["ai", "api"];
    p.apiType = "integrated";
    expect(estimateProject(p).base).toBe(3400);
  });
  test("dados e API avulsa ficam pendentes, sem preço fictício", () => {
    const p = initialProject();
    p.selected = ["data", "api"];
    const e = estimateProject(p);
    expect(e.base).toBe(0);
    expect(e.pending).toHaveLength(2);
    expect(projectMessage(p)).toContain("Sem valor calculável");
  });
  test("mistura de tabelados e cotação nunca disfarça pendências", () => {
    const p = initialProject();
    p.selected = ["web", "data"];
    expect(estimateProject(p).base).toBe(920);
    expect(estimateProject(p).pending).toHaveLength(1);
    expect(projectMessage(p)).toContain("Faixa parcial");
    expect(projectMessage(p)).toContain("Análise de dados");
  });
  test("extras só entram quando um pilar aplicável está selecionado", () => {
    const p = initialProject();
    p.extras = { database: true, pdf: true };
    p.selected = ["systems"];
    expect(estimateProject(p).base).toBe(4300);
    p.selected = ["web"];
    expect(estimateProject(p).base).toBe(920);
    p.selected = [];
    expect(estimateProject(p).base).toBe(0);
  });
  test("funcionalidades e volume não geram cobranças escondidas", () => {
    const p = initialProject();
    p.selected = ["systems"];
    p.scopes.systems.features = ["Controle de estoque"];
    p.scopes.systems.volume = 2;
    expect(estimateProject(p).base).toBe(3000);
    expect(recommendations(p).some((r) => r.title === "Revise o nível de complexidade")).toBe(true);
    expect(p.complexity).toBe("basic");
  });
  test("mensagem mantém briefing, volumes, fórmula e exclusões", () => {
    const p = initialProject();
    p.selected = ["systems"];
    p.description = "Minha ideia personalizada";
    p.scopes.systems.features = ["Ordens de serviço"];
    const message = projectMessage(p);
    expect(message).toContain("Minha ideia personalizada");
    expect(message).toContain("Ordens de serviço");
    expect(message).toContain("Até 10 usuários");
    expect(message).toContain("+20%");
    expect(message).toContain("não proposta final");
  });
});
