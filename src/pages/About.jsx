import SEO from '../components/SEO'
import CTABand from '../components/CTABand'

export default function About() {
  return (
    <div className="page">
      <SEO path="/about" />
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
      <CTABand />
    </div>
  )
}
