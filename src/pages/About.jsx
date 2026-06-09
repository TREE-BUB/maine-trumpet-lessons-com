const INSTRUMENTS = [
  { n: 'Bb Trumpet', d: 'The everyday workhorse for lessons and most repertoire.' },
  { n: 'Cornet', d: 'Warmer and rounder — lovely for brass band and lyrical playing.' },
  { n: 'Flugelhorn', d: 'That dark velvet tone for ballads and jazz.' },
  { n: 'Piccolo Trumpet', d: 'For Baroque and high-register showpieces.' },
]

const LINKS = [
  { label: 'YouTube', sub: 'Lesson clips & performances', href: '#' },
  { label: 'Instagram', sub: '@mainetrumpet', href: '#' },
  { label: 'SoundCloud', sub: 'Recordings & demos', href: '#' },
  { label: 'Portland Brass Collective', sub: 'Ensemble I play with', href: '#' },
]

function InstrumentIcon() {
  return (
    <div
      style={{
        width: 76,
        height: 76,
        flexShrink: 0,
        borderRadius: 12,
        background: 'var(--paper-2)',
        backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 11px, color-mix(in srgb, var(--teal) 7%, transparent) 11px 12px)',
        border: '1px solid var(--line)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </div>
  )
}

export default function About() {
  return (
    <div className="page">
      {/* Bio */}
      <section className="section-sm" style={{ paddingTop: 72 }}>
        <div className="wrap">
          <div className="eyebrow eyebrow-lg">About</div>
          <div className="bio-grid" style={{ marginTop: 28 }}>
            <img
              src="/jimi-trumpet.jpg"
              alt="Jimi Michel playing the trumpet"
              style={{
                aspectRatio: '4 / 5',
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--line)',
                display: 'block',
                position: 'sticky',
                top: 100,
              }}
            />
            <div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Jimi Michel, trumpet</h1>
              <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 18, color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '62ch' }}>
                <p>
                  Jimi Michel is a Maine-based musician, educator, and musicologist who has played in orchestras, jazz bands, theatre pits, and churches throughout the United States. He has performed as Principal Trumpet of the New York String Orchestra and the Bloomington (MN) Symphony Orchestra, as a substitute with the Syracuse Symphony, and with members of the Sacramento Philharmonic. As a musicologist, he has lectured throughout the United States and has written program notes for the St. Paul Chamber Orchestra, as well as for performances including members of the Boston Symphony, Chicago Symphony, New York Philharmonic, and Cleveland Orchestra. Jimi holds degrees from the Interlochen Arts Academy and the New England Conservatory. His principal teachers were Charlie Schlueter, Gary Bordner, and Terry Caviness, with additional studies with Stanley Friedman, Steve Emory, and John Raschella.
                </p>
                <p>
                  Jimi also has a second career in public health and technology. He has worked on five continents developing digital and mobile solutions to address a wide variety of global health challenges. From 2017–2020 he served as the mHealth Innovation Lead at the UC Davis Center for Health and Technology and previously worked for MEDITECH, Pathfinder International, the Rollins School of Public Health (Emory University), the University of Copenhagen, and Aetna/CVS Health. Collaborators have included WHO, UNICEF, World Bank, Water Aid, World Vision and the Ministries of Health in Vietnam, Malawi, Uganda, and Cambodia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="section-sm">
        <div className="wrap">
          <div className="eyebrow">Instruments</div>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', marginTop: 18 }}>What I play &amp; teach</h2>
          <div className="inst-grid" style={{ marginTop: 34 }}>
            {INSTRUMENTS.map((it) => (
              <div key={it.n} className="card" style={{ padding: 26, display: 'flex', gap: 20, alignItems: 'center' }}>
                <InstrumentIcon />
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>{it.n}</h3>
                  <p style={{ color: 'var(--muted)', marginTop: 7, lineHeight: 1.55, fontSize: '0.92rem' }}>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="section-sm" style={{ paddingBottom: 80 }}>
        <div className="wrap">
          <div className="eyebrow">Links</div>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', marginTop: 18 }}>Listen &amp; follow along</h2>
          <div style={{ marginTop: 30, borderTop: '1px solid var(--line)' }}>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '22px 4px',
                  borderBottom: '1px solid var(--line)',
                  transition: 'padding 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '16px')}
                onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '4px')}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)', fontWeight: 600, letterSpacing: '-0.01em' }}>{l.label}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.04em' }}>{l.sub}</span>
                </div>
                <span style={{ color: 'var(--accent-deep)', fontSize: '1.4rem' }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
