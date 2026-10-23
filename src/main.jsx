import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Arrow = () => <span aria-hidden="true">↗</span>

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeArea, setActiveArea] = useState(0)

  const areas = [
    { number: '01', title: 'Direito de Família', text: 'Orientação cuidadosa em divórcios, guarda, pensão, inventários e acordos — com atenção ao que importa além do processo.' },
    { number: '02', title: 'Direito Civil', text: 'Análise e condução de contratos, responsabilidade civil e conflitos patrimoniais, sempre com estratégia e linguagem objetiva.' },
    { number: '03', title: 'Planejamento Patrimonial', text: 'Organização jurídica do patrimônio e da sucessão para proteger escolhas, prevenir conflitos e construir tranquilidade.' }
  ]

  return <>
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="Início">
        <span className="brand-mark">MA</span>
        <span>Marina Azevedo<small>Advocacia</small></span>
      </a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
      <nav className={menuOpen ? 'open' : ''} aria-label="Navegação principal">
        <a href="#atuacao" onClick={() => setMenuOpen(false)}>Atuação</a>
        <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
        <a href="#metodo" onClick={() => setMenuOpen(false)}>Como funciona</a>
        <a className="nav-contact" href="#contato" onClick={() => setMenuOpen(false)}>Fale comigo <Arrow /></a>
      </nav>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="practice-note">Direito de família · Direito civil · Patrimônio</p>
          <h1>Advocacia para decisões de família, patrimônio e relações civis.</h1>
          <p className="hero-text">Atendimento jurídico para compreender o seu caso, avaliar os caminhos possíveis e conduzir cada etapa com informação clara.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contato">Agendar uma conversa <Arrow /></a>
            <a className="text-link" href="#atuacao">Conheça minha atuação <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Espaço reservado para o retrato profissional da advogada">
          <div className="arch"><div className="portrait-placeholder"><span>Sua foto<br/>aqui</span></div></div>
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
        </div>
        <p className="provisional">Modelo demonstrativo — nome, OAB, textos e imagem serão personalizados.</p>
      </section>

      <section className="statement">
        <p className="section-index">01 — Propósito</p>
        <h2>Antes de indicar um caminho, é preciso entender o que está em jogo.</h2>
        <p>O atendimento começa pela análise do contexto, dos documentos e das prioridades de cada pessoa. A orientação é apresentada em linguagem direta, incluindo alternativas e riscos.</p>
      </section>

      <section className="areas" id="atuacao">
        <div className="section-heading">
          <h2>Assuntos em que posso orientar você</h2>
        </div>
        <div className="area-layout">
          <div className="area-list">
            {areas.map((area, index) => <button key={area.title} className={activeArea === index ? 'active' : ''} onClick={() => setActiveArea(index)}>
              <span>{area.number}</span>{area.title}<b>↗</b>
            </button>)}
          </div>
          <article className="area-detail" key={activeArea}>
            <span className="detail-number">{areas[activeArea].number}</span>
            <div><h3>{areas[activeArea].title}</h3><p>{areas[activeArea].text}</p><a href="#contato">Conversar sobre o seu caso <Arrow /></a></div>
          </article>
        </div>
      </section>

      <section className="about" id="sobre">
        <div className="about-card">
          <div className="about-photo"><span>Retrato profissional</span></div>
        </div>
        <div className="about-copy">
          <h2>Quem estará ao seu lado no atendimento</h2>
          <p>Sou Marina Azevedo, advogada com atuação voltada à construção de soluções jurídicas consistentes e possíveis. Acredito em um atendimento atento, que considera cada história antes de indicar qualquer caminho.</p>
          <p>Minha prática une estudo permanente, comunicação transparente e presença em todas as etapas — do primeiro contato à resolução.</p>
          <div className="signature">Marina Azevedo <small>OAB/UF 00.000 · dado provisório</small></div>
        </div>
      </section>

      <section className="method" id="metodo">
        <div className="section-heading method-heading">
          <h2>Do primeiro relato ao encaminhamento jurídico</h2>
          <p>Este fluxo é provisório e será ajustado ao modo de trabalho real da profissional.</p>
        </div>
        <div className="steps">
          {[
            ['01', 'Escuta', 'Uma conversa inicial para compreender sua situação, prioridades e expectativas.'],
            ['02', 'Diagnóstico', 'Análise jurídica transparente, com riscos, possibilidades e próximos passos bem definidos.'],
            ['03', 'Estratégia', 'Um plano de ação personalizado, conduzido com acompanhamento próximo e comunicação clara.']
          ].map(step => <article key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-copy">
          <h2>Conte brevemente qual orientação jurídica você procura.</h2>
          <p>Conte brevemente o que você precisa. Retornarei para combinarmos o melhor caminho para o atendimento.</p>
          <a className="button sand" href="mailto:contato@exemplo.com">Enviar uma mensagem <Arrow /></a>
        </div>
        <div className="contact-details">
          <div><small>ATENDIMENTO</small><p>Online para todo o Brasil<br/>Presencial com agendamento</p></div>
          <div><small>CONTATO PROVISÓRIO</small><p>(00) 00000-0000<br/>contato@exemplo.com</p></div>
          <div><small>HORÁRIOS</small><p>Segunda a sexta<br/>9h às 18h</p></div>
        </div>
      </section>
    </main>

    <footer>
      <a className="brand footer-brand" href="#inicio"><span className="brand-mark">MA</span><span>Marina Azevedo<small>Advocacia</small></span></a>
      <p>Conteúdo demonstrativo. Não substitui consulta jurídica.</p>
      <p>© {new Date().getFullYear()} · Todos os direitos reservados</p>
    </footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
