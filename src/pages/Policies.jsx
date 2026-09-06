import SEO from '../components/SEO'
import CTABand from '../components/CTABand'

function PolicyBlock({ n, title, children }) {
  return (
    <div style={{ marginTop: 50, paddingTop: 38, borderTop: '1px solid var(--line)' }}>
      <div style={{ fontFamily: 'var(--mono)', color: 'var(--accent-deep)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>{n}</div>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', marginTop: 12 }}>{title}</h2>
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--muted)', lineHeight: 1.7, fontSize: '1.05rem' }}>
        {children}
      </div>
    </div>
  )
}

function PolicyList({ items }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '2px 0', display: 'flex', flexDirection: 'column', gap: 13 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: 13 }}>
          <span style={{ color: 'var(--accent-deep)', fontWeight: 700, flexShrink: 0 }}>—</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Policies() {
  return (
    <div className="page">
      <SEO path="/policies" />
      <section className="section-sm" style={{ paddingTop: 72 }}>
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div className="eyebrow eyebrow-lg">Studio policies</div>
          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', marginTop: 20 }}>What to expect.</h1>
          <p className="lede" style={{ marginTop: 24 }}>
            Congratulations on taking trumpet lessons! I teach because I really enjoy sharing my love for music, and the trumpet. The guidelines below outline what I expect from my students, and what my students should expect from me. If you have any questions or anticipate issues with any of my policies, please let me know and we'll work together to address your concerns.
          </p>

          <PolicyBlock n="01" title="Practice expectations">
            <p>I'm a strong believer that the quality of your practice is more important than the quantity of your practice. So, the quick (and perhaps frustratingly vague!) answer to how much students are expected to practice is simply: as much time as it takes to prepare your assignments and be ready for lessons and rehearsals!</p>
            <p>That having been said, beginners may find that 20–30 minutes a day, 5 days a week is sufficient to prepare their assignments. Middle school students often practice every day for 45 minutes to an hour, and high school students over an hour each day (especially when preparing for concerts or auditions).</p>
          </PolicyBlock>

          <PolicyBlock n="02" title="Required materials">
            <p>Students are expected to come with appropriate equipment each week. This includes:</p>
            <PolicyList items={[
              'An instrument (and mouthpiece) in good, working condition',
              'Assigned sheet music, etude books, solos, and method books',
              'Valve oil',
              'A pencil (or stylus if you are using a tablet device)',
              'Mutes (depending on assignments)',
            ]} />
          </PolicyBlock>

          <PolicyBlock n="03" title="Billing and attendance">
            <p>Payment is due with each lesson and can be made via cash, check, or Venmo. Failure to pay on time may result in the suspension of lessons.</p>
            <p>It's important that you show up to lessons on time and prepared. I understand that students often juggle many responsibilities, and sometimes those responsibilities can cause scheduling conflicts. My official attendance policy is:</p>
            <PolicyList items={[
              'Illness or family emergencies will always be accommodated, but I ask that you give me as much notice as possible (48 hours is preferable).',
              'I will do my best to accommodate scheduling issues related to school or other extracurricular activities if enough notice is given (1 week is preferable here). With enough notice, family vacations also fall into this category.',
              'Students will be given one "unexcused" absence per year. An unexcused absence is a last-second cancellation for non-emergency reasons or any kind of no-show. These lessons will be made up the first time, but will not be made up a second time.',
            ]} />
            <p>Please note that this is a very generous attendance policy. Any abuse of this policy will be grounds for terminating private lessons.</p>
          </PolicyBlock>

          <PolicyBlock n="04" title="Terminating lessons">
            <p>Private lessons are "at-will" and may be terminated at any time by the parent or student. The instructor may also terminate lessons for the following reasons:</p>
            <PolicyList items={[
              'Failure to pay lesson fees, or frequent late payments',
              'Frequent unexcused absences',
              'Lack of effort or preparation for lessons',
              'Repeated disrespectful or offensive behavior',
            ]} />
            <p>Please note that, in most cases, refunds will not be provided if lessons are terminated, although exceptions can be made at my discretion for extenuating circumstances.</p>
          </PolicyBlock>

          <PolicyBlock n="05" title="Switching teachers">
            <p>Not every teacher is a perfect fit for every student. If you are currently studying with me and don't feel lessons are going well, please let me know how we can be more productive! I will do my best to accommodate all reasonable requests and if things still aren't going great, I would be happy to recommend and introduce you to other teachers in the area who might be a better fit.</p>
            <p>Similarly, I don't teach students who currently study with another teacher unless that teacher knows about it. If you're looking to switch teachers, please have that conversation with your current teacher before reaching out to me.</p>
          </PolicyBlock>
        </div>
      </section>
      <CTABand />
    </div>
  )
}
