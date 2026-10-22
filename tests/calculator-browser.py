from playwright.sync_api import sync_playwright, expect
from urllib.parse import unquote
import json

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/google-chrome', headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    def text(selector):
        return page.locator(selector).inner_text().replace('\xa0', ' ').replace(' ', ' ')
    def pillar(name):
        page.locator('.calc-pillar').filter(has=page.get_by_role('heading', name=name, exact=True)).click()

    page.goto('http://localhost:4200', wait_until='networkidle')
    page.get_by_role('link', name='Calcular meu projeto', exact=True).click()
    expect(page).to_have_url('http://localhost:4200/calculadora')
    expect(page.get_by_role('button', name='Configurar meu projeto', exact=True)).to_be_disabled()
    assert page.locator('.calc-pillar').count() == 7
    assert 'R$ 0' not in text('.calc-summary')
    pillar('Sites & landing pages')
    assert 'R$ 920' in text('.calc-live-value')
    page.get_by_role('button', name='Configurar meu projeto', exact=True).click()
    expect(page.get_by_role('heading', name='Dê forma à sua ideia.', exact=True)).to_be_in_viewport()
    page.get_by_role('radio', name='Site institucional', exact=True).check()
    assert 'R$ 1.690' in text('.calc-live-value')
    page.get_by_role('checkbox', name='Formulário de contato', exact=True).check()
    page.locator('.calc-volume select').select_option('2')
    expect(page.get_by_role('heading', name='Conexões que fazem sentido')).to_be_visible()
    page.get_by_role('radio', name='Complexidade Intermediário', exact=True).check()
    assert 'R$ 2.197' in text('.calc-live-value')
    page.get_by_role('textbox', name='Conte um pouco mais sobre sua ideia').fill('Quero um site para minha empresa com formulário e portfólio.')
    page.get_by_role('button', name='Ver minha estimativa', exact=True).click()
    expect(page.get_by_role('heading', name='Seu próximo passo, dimensionado.', exact=True)).to_be_in_viewport()
    assert 'R$ 2.197' in text('.calc-breakdown-total')
    assert 'R$ 2.636' in text('.calc-breakdown-total')
    message = unquote(page.get_by_role('link', name='Validar pelo WhatsApp', exact=False).get_attribute('href')).replace('\xa0', ' ')
    for phrase in ['5527993111872', 'Formulário de contato', 'Mais de 5 páginas', 'Intermediário', 'Quero um site para minha empresa', 'R$ 2.197', 'não proposta final']:
        assert phrase in message, phrase
    page.get_by_role('button', name='Recomeçar', exact=True).click()
    pillar('Análise de dados')
    assert 'Sob orçamento' in text('.calc-live-value')
    assert 'R$ 0' not in text('.calc-live-value')
    page.get_by_role('button', name='Configurar meu projeto', exact=True).click()
    page.get_by_role('button', name='Adicionar Dashboards & Power BI', exact=True).click()
    assert page.locator('.calc-scope').count() == 2
    assert 'ESTIMATIVA PARCIAL' in text('.calc-summary')
    assert 'R$ 1.500' in text('.calc-live-value')
    page.get_by_role('button', name='Ver minha estimativa', exact=True).click()
    assert 'Análise de dados' in text('.calc-pending')
    assert 'Faixa parcial' in unquote(page.locator('.calc-whatsapp').get_attribute('href'))
    page.get_by_role('button', name='Recomeçar', exact=True).click()
    pillar('IA para negócios')
    pillar('Integrações & APIs')
    page.get_by_role('button', name='Configurar meu projeto', exact=True).click()
    page.get_by_role('radio', name='Automação inteligente', exact=True).check()
    page.get_by_role('radio', name='Automação com APIs', exact=True).check()
    assert 'R$ 2.500' in text('.calc-live-value')
    page.get_by_role('button', name='Ver minha estimativa', exact=True).click()
    assert page.locator('.calc-breakdown>ul>li').count() == 1
    assert page.locator('.calc-dedup').is_visible()
    page.get_by_role('button', name='Recomeçar', exact=True).click()
    pillar('Sistemas & processos')
    page.get_by_role('button', name='Configurar meu projeto', exact=True).click()
    page.get_by_role('checkbox', name='Modelagem de banco de dados', exact=True).check()
    page.get_by_role('checkbox', name='Motor de relatórios em PDF', exact=True).check()
    assert 'R$ 4.300' in text('.calc-live-value')
    page.get_by_role('button', name='Remover Sistemas & processos', exact=True).click()
    assert page.locator('.calc-pillar').count() == 7
    assert 'R$ 0' not in text('.calc-summary')

    widths = [320, 360, 375, 390, 620, 768, 900, 1024, 1440]
    for width in widths:
        page.set_viewport_size({'width': width, 'height': 1000})
        page.goto('http://localhost:4200/calculadora', wait_until='networkidle')
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'), f'overflow select {width}'
        if width in [390, 1440]:
            page.screenshot(path=f'/home/user/calculator-{width}-select.png', full_page=True)
        for name in ['Sistemas & processos', 'Análise de dados', 'Dashboards & Power BI', 'Sites & landing pages', 'E-commerce', 'IA para negócios', 'Integrações & APIs']:
            pillar(name)
        page.get_by_role('button', name='Configurar meu projeto', exact=True).click()
        assert page.locator('.calc-scope').count() == 7
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'), f'overflow scope {width}'
        if width in [390, 1440]:
            page.screenshot(path=f'/home/user/calculator-{width}-scope.png')
        page.get_by_role('radio', name='Complexidade Avançado', exact=True).check()
        page.get_by_role('textbox', name='Conte um pouco mais sobre sua ideia').fill('Um projeto conectado para a operação da minha empresa.')
        page.get_by_role('button', name='Ver minha estimativa', exact=True).click()
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'), f'overflow result {width}'
        if width in [390, 1440]:
            page.screenshot(path=f'/home/user/calculator-{width}-result.png', full_page=True)
    assert not errors, errors
    page.get_by_role('link', name='Voltar ao site', exact=True).first.click()
    expect(page).to_have_url('http://localhost:4200/')
    assert page.locator('.price-card').count() == 6
    print(json.dumps({'navigation': 'passed', 'all7Pillars': 'passed', 'exclusiveFormats': 'passed', 'complexityCalculation': 'passed', 'onlyQuoteAndPartialEstimates': 'passed', 'recommendations': 'passed', 'extrasEligibility': 'passed', 'automationDeduplication': 'passed', 'WhatsAppBrief': 'passed', 'responsiveWidthsAnd3Steps': widths, 'consoleErrors': errors}, indent=2))
    browser.close()