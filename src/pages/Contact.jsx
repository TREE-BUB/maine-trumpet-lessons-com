import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import SEO from '../components/SEO'

export default function Contact() {
  const [state, handleSubmit] = useForm('xvznrgqd')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const reset = () => window.location.reload()

  return (
    <div className="page">
      <SEO title="Contact" description="Get in touch to schedule private trumpet lessons in Deering Center, Portland, Maine. Reach out via the contact form or email hello@mainetrumpetlessons.com." path="/contact" />
      <section className="section-sm" style={{ paddingTop: 72, paddingBottom: 90 }}>
        <div className="wrap">
          <div className="contact-grid">
            {/* Left column */}
            <div>
              <div className="eyebrow eyebrow-lg">Contact</div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)', marginTop: 20 }}>
                Let's set up<br />your first lesson.
              </h1>
              <p className="lede" style={{ marginTop: 22, maxWidth: 420 }}>
                Send a note and I'll get back to you within a day or two to find a time that works.
              </p>

              <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  ['Email', <a href="mailto:hello@mainetrumpetlessons.com?subject=I%27m%20interested%20in%20trumpet%20lessons!" style={{ color: 'var(--ink)', textDecoration: 'underline', textDecorationColor: 'var(--line)' }}>hello@mainetrumpetlessons.com</a>],
                  ['Studio', 'Deering Center, Portland (ME)'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', width: 64, flexShrink: 0 }}>{k}</span>
                    <span style={{ fontSize: '1rem', color: 'var(--ink)' }}>{v}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://www.google.com/maps/place/Deering+Center,+Portland,+ME"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', marginTop: 28, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)' }}
              >
                <img
                  src="/deering-map.png"
                  alt="Map showing the Deering Center neighborhood of Portland, Maine"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </a>
            </div>

            {/* Right column — form */}
            <div className="card" style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
              {state.succeeded ? (
                <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'color-mix(in srgb, var(--accent) 16%, transparent)', color: 'var(--accent-deep)', display: 'grid', placeItems: 'center', margin: '0 auto', fontSize: '1.8rem' }}>✓</div>
                  <h3 style={{ fontSize: '1.5rem', marginTop: 22 }}>Thank you, {name.split(' ')[0]}!</h3>
                  <p style={{ color: 'var(--muted)', marginTop: 12, lineHeight: 1.6, maxWidth: '40ch', marginLeft: 'auto', marginRight: 'auto' }}>
                    Your message is on its way. I'll reply to <b style={{ color: 'var(--ink)' }}>{email}</b> soon to get your trial lesson scheduled.
                  </p>
                  <button className="btn btn-ghost" style={{ marginTop: 28 }} onClick={reset}>
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div className={'field' + (state.errors?.find(e => e.field === 'name') ? ' err' : '')}>
                    <label htmlFor="c-name">Your name</label>
                    <input id="c-name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Cornet" />
                    <ValidationError field="name" prefix="Name" errors={state.errors} className="msg" />
                  </div>

                  <div className={'field' + (state.errors?.find(e => e.field === 'email') ? ' err' : '')}>
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@email.com" />
                    <ValidationError field="email" prefix="Email" errors={state.errors} className="msg" />
                  </div>

                  <div className={'field' + (state.errors?.find(e => e.field === 'message') ? ' err' : '')}>
                    <label htmlFor="c-msg">Message</label>
                    <textarea
                      id="c-msg"
                      name="message"
                      rows="5"
                      placeholder="A bit about you — your experience, goals, and when you'd like to start."
                      style={{ resize: 'vertical' }}
                    />
                    <ValidationError field="message" prefix="Message" errors={state.errors} className="msg" />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent btn-lg"
                    style={{ width: '100%' }}
                    disabled={state.submitting}
                  >
                    {state.submitting ? 'Sending…' : 'Send message'}
                  </button>

                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', letterSpacing: '0.04em' }}>
                    I'll never share your details. Promise.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
