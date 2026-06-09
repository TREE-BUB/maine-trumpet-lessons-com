import { useState } from 'react'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [networkError, setNetworkError] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please tell me your name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Enter a valid email.'
    if (form.message.trim().length < 8) er.message = 'A sentence or two helps.'
    return er
  }

  const submit = async (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length > 0) return

    setSubmitting(true)
    setNetworkError(false)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New lesson inquiry from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setNetworkError(true)
      }
    } catch {
      setNetworkError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setSent(false)
    setForm({ name: '', email: '', message: '' })
    setErrors({})
    setNetworkError(false)
  }

  return (
    <div className="page">
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
                {[['Email', 'hello@mainetrumpetlessons.com'], ['Studio', 'Deering Center, Portland (ME)']].map(([k, v]) => (
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
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'color-mix(in srgb, var(--accent) 16%, transparent)', color: 'var(--accent-deep)', display: 'grid', placeItems: 'center', margin: '0 auto', fontSize: '1.8rem' }}>✓</div>
                  <h3 style={{ fontSize: '1.5rem', marginTop: 22 }}>Thank you, {form.name.split(' ')[0]}!</h3>
                  <p style={{ color: 'var(--muted)', marginTop: 12, lineHeight: 1.6, maxWidth: '40ch', marginLeft: 'auto', marginRight: 'auto' }}>
                    Your message is on its way. I'll reply to <b style={{ color: 'var(--ink)' }}>{form.email}</b> soon to get your trial lesson scheduled.
                  </p>
                  <button className="btn btn-ghost" style={{ marginTop: 28 }} onClick={reset}>
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  {/* Honeypot */}
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                  <div className={'field' + (errors.name ? ' err' : '')}>
                    <label htmlFor="c-name">Your name</label>
                    <input id="c-name" value={form.name} onChange={set('name')} placeholder="Jane Cornet" />
                    <span className="msg">{errors.name}</span>
                  </div>

                  <div className={'field' + (errors.email ? ' err' : '')}>
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" value={form.email} onChange={set('email')} placeholder="jane@email.com" />
                    <span className="msg">{errors.email}</span>
                  </div>

                  <div className={'field' + (errors.message ? ' err' : '')}>
                    <label htmlFor="c-msg">Message</label>
                    <textarea
                      id="c-msg"
                      rows="5"
                      value={form.message}
                      onChange={set('message')}
                      placeholder="A bit about you — your experience, goals, and when you'd like to start."
                      style={{ resize: 'vertical' }}
                    />
                    <span className="msg">{errors.message}</span>
                  </div>

                  {networkError && (
                    <p style={{ fontSize: '0.88rem', color: '#c0392b', textAlign: 'center' }}>
                      Something went wrong — please try again or email <a href="mailto:hello@mainetrumpetlessons.com" style={{ color: 'inherit', textDecoration: 'underline' }}>hello@mainetrumpetlessons.com</a> directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-accent btn-lg"
                    style={{ width: '100%' }}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Send message'}
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
