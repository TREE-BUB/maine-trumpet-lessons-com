import { Link } from 'react-router-dom'

export default function CTABand() {
  return (
    <section className="section">
      <div className="wrap">
        <div
          className="cta-band"
          style={{
            background: 'var(--teal)',
            color: 'var(--paper)',
            borderRadius: 20,
            padding: 'clamp(40px, 6vw, 76px)',
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>Ready when you are</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 3rem)', marginTop: 18, color: 'var(--paper)' }}>
              Take the next step on<br />your trumpet journey.
            </h2>
            <p
              className="lede"
              style={{ color: 'color-mix(in srgb, var(--paper) 78%, transparent)', marginTop: 18, maxWidth: 460 }}
            >
              Lessons here are low-pressure — no auditions to pass, no judgment, no rush. Whether you're starting fresh or picking it back up, I'm just here to help you enjoy playing and get a little better each week.
            </p>
          </div>
          <Link className="btn btn-accent btn-lg" to="/contact">
            Reach out to get started
          </Link>
        </div>
      </div>
    </section>
  )
}
