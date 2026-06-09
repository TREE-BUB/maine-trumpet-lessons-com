import { useNavigate } from 'react-router-dom'
import CTABand from '../components/CTABand'

const TESTIMONIALS = [
  {
    quote: 'I really enjoyed studying with Mr. Michel. Lessons were really challenging, but when it came time for auditions and solo contests, I always felt prepared.',
    author: 'Alexa',
    role: 'Former middle & high school student, current band director',
  },
  {
    quote: "I've known Jimi for a long time as a fantastic trumpet player with a lot of musical insight into performance to offer a trumpet student.",
    author: 'Eric Forman',
    role: 'Band Director (Retired), North Reading High School',
  },
  {
    quote: "Jimi is a wonderful musician and educator. It's always a pleasure to perform together. The joy that he brings to making music is palpable!",
    author: 'Elizabeth England',
    role: 'Boston Ballet & New England Conservatory Prep',
  },
  {
    quote: 'Jimi Michel is a trumpeter and educator with robust pedagogical training and professional experience. An exceedingly well-rounded musician, he is an ideal teacher for advanced students looking toward professional careers as well as passionate and curious musical beginners looking to build a solid foundation on the trumpet and in music.',
    author: 'Dr. Daniel Bassin',
    role: 'Professional Trumpeter & Director of Orchestras, Idyllwild Arts Academy',
  },
  {
    quote: "Lessons with Jimi were great — I wasn't going to be a professional musician but he found a way to make lessons challenging and fun at the same time. I still play every once in a while and the things he taught keep helping me!",
    author: 'James',
    role: 'Former high school student, currently in med school',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page">
      {/* Hero */}
      <section style={{ padding: 'clamp(56px, 8vw, 104px) 0 72px' }}>
        <div className="wrap">
          <div className="hero-split">
            <div>
              <div className="eyebrow eyebrow-lg">Welcome!</div>
              <h1 style={{ marginTop: 24, lineHeight: 1.14, fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
                Picking up the trumpet for the first time? Returning after a long hiatus?{' '}
                <span style={{ color: 'var(--accent-deep)' }}>You're in the right place!</span>
              </h1>
              <p className="lede" style={{ marginTop: 26, fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)' }}>
                I've taught trumpet lessons for over two decades. I love teaching because there's nothing more exciting than seeing a student make progress on the instrument, as a musician, and, most importantly, as a critical thinker. Take a look around and, if you're interested in starting (or continuing!) your musical journey, reach out and let's talk!
                <br /><br />
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>– Jimi Michel</span>
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
                <button className="btn btn-accent btn-lg" onClick={() => go('/contact')}>Get in touch</button>
                <button className="btn btn-ghost btn-lg" onClick={() => go('/pricing')}>See pricing</button>
              </div>
            </div>
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
              }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="wrap">
          <div className="eyebrow" style={{ fontSize: '24px', fontWeight: 400 }}>TESTIMONIALS</div>
          <div className="testimonial-grid" style={{ marginTop: 36 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ padding: 30, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'Georgia, serif', color: 'var(--accent)', fontSize: '2.6rem', lineHeight: 0.6, height: '0.7em' }}>&ldquo;</div>
                <p style={{ color: 'var(--ink)', marginTop: 14, lineHeight: 1.6, fontSize: '1.02rem' }}>{t.quote}</p>
                <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{t.author}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 5, lineHeight: 1.5 }}>
                    {t.role}
                  </div>
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
