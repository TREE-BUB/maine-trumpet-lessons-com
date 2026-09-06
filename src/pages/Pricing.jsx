import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import CTABand from '../components/CTABand'

const RATES = [
  ['30-minute lessons', '$40'],
  ['45-minute lessons', '$55'],
  ['60-minute lessons', '$70'],
]

export default function Pricing() {
  return (
    <div className="page">
      <SEO path="/pricing" />
      <section className="section-sm" style={{ paddingTop: 72 }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="eyebrow eyebrow-lg">Pricing</div>
          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', marginTop: 20 }}>2025–2026 rates.</h1>

          <div style={{ marginTop: 40, borderTop: '1px solid var(--line)' }}>
            {RATES.map(([label, price]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 24,
                  padding: '22px 4px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <span style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)', fontWeight: 600 }}>{label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(1.3rem, 2.4vw, 1.85rem)', fontWeight: 700, color: 'var(--accent-deep)' }}>{price}</span>
              </div>
            ))}
          </div>

          <p className="lede" style={{ marginTop: 32, maxWidth: 640 }}>
            I do not raise prices on existing students, so the price you pay for your first lesson will be the price you always pay.
          </p>

          <div
            className="card"
            style={{
              marginTop: 30,
              padding: '28px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 22,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ maxWidth: 520, lineHeight: 1.6, color: 'var(--ink)', fontSize: '1.02rem' }}>
              Price shouldn't be a barrier to learning about music. If you or your child would like lessons but are worried about the cost, please reach out. In most cases, I am able to offer need-based discounts.
            </p>
            <Link className="btn btn-accent btn-lg" to="/contact">Get in touch</Link>
          </div>
        </div>
      </section>
      <CTABand />
    </div>
  )
}
