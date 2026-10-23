import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Arrow = () => <svg className="arrow-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
</svg>

function App() {
  const [introVisible, setIntroVisible] = useState(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroVisible(false)
      return
    }
    const timer = window.setTimeout(() => setIntroVisible(false), 1600)
    return () => window.clearTimeout(timer)
  }, [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeArea, setActiveArea] = useState(0)
  const heroVisualRef = useRef(null)
  const navigationAnimation = useRef(null)
  const navigationTimer = useRef(null)
  const replayNavigation = () => {
    const section = navigationAnimation.current
    if (!section) return
    navigationAnimation.current = null
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    section.classList.remove('section-entered')
    void section.offsetWidth
    section.classList.add('section-entered')
  }
  const animateNavigation = id => {
    setMenuOpen(false)
    navigationAnimation.current = document.getElementById(id)
    window.clearTimeout(navigationTimer.current)
    navigationTimer.current = window.setTimeout(replayNavigation, 180)
  }
  useEffect(() => {
    const onScroll = () => {
      if (!navigationAnimation.current) return
      window.clearTimeout(navigationTimer.current)
      navigationTimer.current = window.setTimeout(replayNavigation, 140)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(navigationTimer.current)
    }
  }, [])
  useEffect(() => {
    const sections = document.querySelectorAll('#atuacao, #metodo')
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && navigationAnimation.current !== entry.target) {
          entry.target.classList.add('section-entered')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const visual = heroVisualRef.current
    if (!visual) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame
    let pulseTimer

    const updateOrbits = () => {
      frame = undefined
      const rect = visual.getBoundingClientRect()
      const progress = Math.max(-1, Math.min(1, (window.innerHeight * 0.5 - rect.top) / window.innerHeight))
      visual.style.setProperty('--orbit-turn', `${progress * 10}deg`)
      visual.style.setProperty('--orbit-y', `${progress * 8}px`)
      if (!reducedMotion.matches) {
        visual.classList.add('is-scrolling')
        clearTimeout(pulseTimer)
        pulseTimer = window.setTimeout(() => visual.classList.remove('is-scrolling'), 3200)
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateOrbits)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visual.classList.toggle('orbits-visible', entry.isIntersecting)
    }, { threshold: 0.15 })

    observer.observe(visual)
    updateOrbits()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      clearTimeout(pulseTimer)
    }
  }, [])

  const areas = [
    { number: '01', title: 'Direito Tributário', text: 'Orientação para empresas que precisam regularizar dívidas tributárias, avaliar a incidência de impostos e reduzir riscos fiscais.' },
    { number: '02', title: 'Direito Empresarial', text: 'Consultoria para contratos mais seguros e decisões empresariais tomadas com análise jurídica e atenção aos riscos.' },
    { number: '03', title: 'Consultoria Preventiva', text: 'Estratégia, prevenção e segurança jurídica para empresas e empresários antes que o problema se transforme em litígio.' }
  ]

  return <>
    {introVisible && <div className="brand-intro" aria-hidden="true">
      <img src="/assets/carolina-alcantara-logo.png" alt="" />
    </div>}
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="Início">
        <img className="brand-logo" src="/assets/carolina-alcantara-logo.png" alt="Carolina Alcântara — Advocacia e Consultoria Jurídica" />
      </a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
      <nav className={menuOpen ? 'open' : ''} aria-label="Navegação principal">
        <a href="#atuacao" onClick={() => animateNavigation('atuacao')}>Atuação</a>
        <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
        <a href="#metodo" onClick={() => animateNavigation('metodo')}>Como funciona</a>
        <a className="nav-contact" href="#contato" onClick={() => setMenuOpen(false)}>Fale comigo <Arrow /></a>
      </nav>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="practice-note">Carolina Alcântara · Advocacia e Consultoria Jurídica</p>
          <h1 className="blur-in">Advocacia tributária e empresarial.</h1>
          <p className="hero-text">Estratégia, prevenção e segurança jurídica para empresas e empresários.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contato">Agendar uma conversa <Arrow /></a>
          </div>
        </div>
        <div className="hero-visual" ref={heroVisualRef} aria-label="Retrato profissional de Carolina Alcântara">
          <div className="arch"><img className="portrait" src="/assets/carolina-alcantara-portrait.png" alt="Carolina Alcântara em seu escritório" /></div>
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
        </div>
        <p className="provisional">Carolina Alcântara · OAB/SP 485.968</p>
      </section>

      <section className="areas" id="atuacao">
        <div className="section-heading">
          <h2>Assuntos em que posso orientar você</h2>
        </div>
        <div className="area-layout">
          <div className="area-list">
            {areas.map((area, index) => <button key={area.title} className={activeArea === index ? 'active' : ''} onClick={() => setActiveArea(index)}>
              <span>{area.number}</span>{area.title}<span className="area-arrow"><Arrow /></span>
            </button>)}
          </div>
          <article className="area-detail" key={activeArea}>
            <span className="detail-number">{areas[activeArea].number}</span>
            <div><h3>{areas[activeArea].title}</h3><p>{areas[activeArea].text}</p><a href="#contato">Conversar sobre o seu caso <Arrow /></a></div>
          </article>
        </div>
      </section>

      <section className="about" id="sobre">
        <figure className="about-image">
          <img src="/assets/carolina-alcantara-about.png" alt="Carolina Alcântara trabalhando em seu escritório" />
        </figure>
        <div className="about-copy">
          <h2>Carolina Alcântara</h2>
          <p>Sou Carolina Alcântara, advogada tributária e empresarial. Ajudo empresas a regularizar dívidas tributárias, evitar impostos desnecessários, reduzir riscos e estruturar contratos mais seguros.</p>
          <p>O trabalho é voltado à estratégia, à prevenção e à segurança jurídica de empresas e empresários.</p>
          <div className="signature">Carolina Alcântara <small>OAB/SP 485.968</small></div>
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
          <h2>Converse sobre a necessidade da sua empresa.</h2>
          <p>Descreva brevemente a questão tributária ou empresarial. O retorno será feito para combinar o atendimento.</p>
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
      <a className="brand footer-brand" href="#inicio"><img className="brand-logo" src="/assets/carolina-alcantara-logo.png" alt="Carolina Alcântara — Advocacia e Consultoria Jurídica" /></a>
      <div className="footer-socials" role="group" aria-label="Redes sociais">
        <button type="button" disabled aria-label="Instagram — link em breve" title="Instagram — link em breve">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>
        </button>
        <button type="button" disabled aria-label="LinkedIn — link em breve" title="LinkedIn — link em breve">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4"/><circle cx="7.5" cy="7" r=".8" fill="currentColor" stroke="none"/></svg>
        </button>
        <button type="button" disabled aria-label="Facebook — link em breve" title="Facebook — link em breve">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M14 21V10c0-2 1-3 3-3h1M10 12h7"/></svg>
        </button>
      </div>
      <div className="footer-credits">
        <p>© {new Date().getFullYear()} · Todos os direitos reservados</p>
        <p>Desenvolvido por Bruno Olegário</p>
      </div>
    </footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
