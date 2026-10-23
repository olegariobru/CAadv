import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Arrow = () => <span aria-hidden="true">↗</span>

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 }
    )
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeArea, setActiveArea] = useState(0)
  const heroRef = useRef(null)
  useReveal()

  useEffect(() => {
    const move = event => {
      if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const rect = heroRef.current.getBoundingClientRect()
      heroRef.current.style.setProperty('--mx', `${(event.clientX - rect.left) / rect.width * 100}%`)
      heroRef.current.style.setProperty('--my', `${(event.clientY - rect.top) / rect.height * 100}%`)
    }
    const node = heroRef.current
    node?.addEventListener('pointermove', move)
    return () => node?.removeEventListener('pointermove', move)
  }, [])

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
      <section className="hero" id="inicio" ref={heroRef}>
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span /> Advocacia humana e estratégica</p>
          <h1>Clareza para decidir.<br/><em>Estratégia</em> para avançar.</h1>
          <p className="hero-text">Orientação jurídica próxima, segura e descomplicada para proteger seus direitos, seu patrimônio e as decisões que movem a sua vida.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contato">Agendar uma conversa <Arrow /></a>
            <a className="text-link" href="#atuacao">Conheça minha atuação <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Composição abstrata inspirada em equilíbrio e precisão">
          <div className="arch"><div className="portrait-placeholder"><span>Sua foto<br/>aqui</span></div></div>
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <div className="seal">Ética <i>•</i> Presença <i>•</i> Estratégia <i>•</i></div>
        </div>
        <p className="provisional">Modelo demonstrativo — nome, OAB, textos e imagem serão personalizados.</p>
      </section>

      <section className="statement" data-reveal>
        <p className="section-index">01 — Propósito</p>
        <blockquote>Questões jurídicas não precisam ser sinônimo de distância ou incerteza.</blockquote>
        <p>Meu papel é traduzir a complexidade, antecipar caminhos e oferecer uma orientação que faça sentido para a sua realidade.</p>
      </section>

      <section className="areas" id="atuacao">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span /> Áreas de atuação</p>
          <h2>Conhecimento técnico.<br/><em>Olhar individual.</em></h2>
        </div>
        <div className="area-layout" data-reveal>
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
        <div className="about-card" data-reveal>
          <div className="about-photo"><span>Retrato profissional</span></div>
          <div className="quote-mark">“</div>
        </div>
        <div className="about-copy" data-reveal>
          <p className="eyebrow light"><span /> Sobre</p>
          <h2>Direito se faz com técnica.<br/><em>E também com escuta.</em></h2>
          <p>Sou Marina Azevedo, advogada com atuação voltada à construção de soluções jurídicas consistentes e possíveis. Acredito em um atendimento atento, que considera cada história antes de indicar qualquer caminho.</p>
          <p>Minha prática une estudo permanente, comunicação transparente e presença em todas as etapas — do primeiro contato à resolução.</p>
          <div className="signature">Marina Azevedo <small>OAB/UF 00.000 · dado provisório</small></div>
        </div>
      </section>

      <section className="method" id="metodo">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span /> Como funciona</p>
          <h2>Você entende cada passo.<br/><em>Desde o primeiro.</em></h2>
        </div>
        <div className="steps">
          {[
            ['01', 'Escuta', 'Uma conversa inicial para compreender sua situação, prioridades e expectativas.'],
            ['02', 'Diagnóstico', 'Análise jurídica transparente, com riscos, possibilidades e próximos passos bem definidos.'],
            ['03', 'Estratégia', 'Um plano de ação personalizado, conduzido com acompanhamento próximo e comunicação clara.']
          ].map(step => <article key={step[0]} data-reveal><span>{step[0]}</span><div className="step-icon">{step[0] === '01' ? '◡' : step[0] === '02' ? '◇' : '↗'}</div><h3>{step[1]}</h3><p>{step[2]}</p></article>)}
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow light"><span /> Vamos conversar</p>
          <h2>Seu próximo passo pode começar com uma <em>boa conversa.</em></h2>
          <p>Conte brevemente o que você precisa. Retornarei para combinarmos o melhor caminho para o atendimento.</p>
          <a className="button sand" href="mailto:contato@exemplo.com">Enviar uma mensagem <Arrow /></a>
        </div>
        <div className="contact-details" data-reveal>
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
