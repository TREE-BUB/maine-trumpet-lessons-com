import SEO from '../components/SEO'
import CTABand from '../components/CTABand'

const PILLARS = [
  {
    k: '01',
    t: 'Developing technique.',
    d: "We'll work together to develop the fundamentals, from producing a good tone and clear articulation to double-tonguing and range extension through a mix of accepted methodologies and individualized exercises that are tailored to each student's strengths and gaps.",
  },
  {
    k: '02',
    t: 'Thinking musically.',
    d: 'The trumpet is a means to an end, and the "end" is to make music! Lessons will include the building blocks of musicianship — listening sessions, sight-singing, and, for more advanced students, discussions of music theory, phrasing, style, and form.',
  },
  {
    k: '03',
    t: 'Thinking critically.',
    d: "Most importantly, we will work together to build a framework to approach problem-solving. We'll build these frameworks by learning music together, sight-reading, and developing an approach to problem-solving that will help you both in music and in life.",
  },
]

export default function Lessons() {
  return (
    <div className="page">
      <SEO path="/lessons" />
      <section className="section-sm" style={{ paddingTop: 72 }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <div className="eyebrow eyebrow-lg">LESSONS</div>
          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', marginTop: 20 }}>Teaching philosophy.</h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 700 }}>
            My teaching style and philosophy has been (and continues to be) influenced by the many wonderful musicians I have studied and worked with. I do my best to adapt my approach to the needs, interests, and priorities of each student, but my teaching centers around three fundamental pillars:
          </p>

          <div style={{ marginTop: 44, borderTop: '1px solid var(--line)' }}>
            {PILLARS.map((p) => (
              <div
                key={p.k}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 'clamp(24px, 4vw, 56px)',
                  padding: '32px 0',
                  borderBottom: '1px solid var(--line)',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: 'var(--accent-deep)',
                    fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {p.k}
                </div>
                <div>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.85rem)' }}>{p.t}</h3>
                  <p style={{ color: 'var(--muted)', marginTop: 12, lineHeight: 1.65, fontSize: '1.05rem', maxWidth: '64ch' }}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </div>
  )
}
