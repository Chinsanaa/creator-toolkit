/* global React */
const DS = window.EarnioDesignSystem_f806e6;
const { Button, Card, Badge, Input, Checkbox } = DS;

/* ---------- inline icon set (Lucide-style, 1.75 stroke) ---------- */
const I = {
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  trend: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17l6-6 4 4 8-8M21 7h-5M21 7v5"/></svg>,
  wallet: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M16 12h.01"/></svg>,
  briefcase: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  chart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="13" y="7" width="3" height="10"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  close: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>,
};
const Mark = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <path d="M34 62 L62 34" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M44 34 H62 V52" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Platform = {
  tiktok: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.6 5.82a4.28 4.28 0 0 1-1.1-2.82h-3.2v12.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.4a5.83 5.83 0 0 0-.78-.05A5.85 5.85 0 1 0 15.3 15.2V9.01a7.4 7.4 0 0 0 4.3 1.37V7.18a4.28 4.28 0 0 1-3-1.36z"/></svg>,
  youtube: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.2zM9.8 15.3V8.7l5.7 3.3z"/></svg>,
  instagram: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>,
};

/* ---------- content ---------- */
const CONTENT = {
  creator: {
    badge: 'For Mongolian creators',
    title: 'The platform for Mongolian creators',
    subtitle: 'Earnio connects you with local brands, handles sponsorships and payouts, and lets you focus on creating.',
    primary: 'Get started', secondary: 'Explore sponsorships',
    steps: [
      { icon: 'chart', t: 'Connect platforms.', d: 'Link TikTok, YouTube and Instagram to sync earnings automatically.' },
      { icon: 'trend', t: 'Track performance.', d: 'See revenue, trends and platform breakdowns in real time.' },
      { icon: 'briefcase', t: 'Find sponsorships.', d: 'Browse brand deals and apply directly from your dashboard.' },
      { icon: 'wallet', t: 'Get paid in MNT.', d: 'Manage wallet payouts and bank accounts in one place.' },
    ],
    features: [
      { t: 'Centralized opportunities.', d: 'Find and apply to sponsorship campaigns from Mongolian brands.' },
      { t: 'Payments built-in.', d: 'Track earnings and receive MNT payouts automatically.' },
      { t: 'Track performance.', d: 'See views, revenue and engagement from TikTok, YouTube and Instagram.' },
      { t: 'Easy delivery.', d: 'Manage briefs, applications and payouts in one platform.' },
    ],
    metrics: ['2.4M', '890K', '₮12M'],
  },
  brand: {
    badge: 'For brands',
    title: 'Reach Mongolian creators with sponsored campaigns',
    subtitle: 'Post brand deals, review creator applications, and manage partnerships with TikTok, YouTube and Instagram talent — from one dashboard.',
    primary: 'Get started', secondary: 'See how it works',
    steps: [
      { icon: 'briefcase', t: 'Create your account.', d: 'Sign up as a brand and set up your company profile.' },
      { icon: 'spark', t: 'Post a campaign.', d: 'Define budget, content type and creator requirements.' },
      { icon: 'chart', t: 'Review applications.', d: 'Compare creators and approve the best fits for your brand.' },
      { icon: 'trend', t: 'Track results.', d: 'Monitor campaign status and partnership outcomes in one place.' },
    ],
    features: [
      { t: 'Curated creators.', d: 'Reach vetted Mongolian creators across all three platforms.' },
      { t: 'Custom campaigns.', d: 'Brief exactly the video content you want made.' },
      { t: 'One dashboard.', d: 'Review pitches, approve creators and track deals together.' },
      { t: 'Pay in MNT.', d: 'Settle partnerships locally — no scattered email threads.' },
    ],
    metrics: ['120', '₮5M', '48h'],
  },
};
const TESTIMONIALS = [
  { quote: 'Earnio helped me track my TikTok earnings and land my first brand deal in Mongolia. Everything is in one place.', name: 'Bold-Erdene', role: 'TikTok creator' },
  { quote: 'I used to spreadsheet everything manually. Now I see YouTube and sponsorship income together and get paid in MNT.', name: 'Sarnai', role: 'YouTube creator' },
  { quote: 'The sponsorship board is the best part — I apply to local brands without cold DMs and keep status updated in the app.', name: 'Temuulen', role: 'UGC creator' },
];
const FAQ = [
  { q: 'How do I sign up as a creator?', a: 'Create a free Earnio account, connect your TikTok, YouTube or Instagram platforms, and complete your profile. You can browse sponsorships and apply directly from your dashboard.' },
  { q: 'Who can join?', a: 'Mongolian content creators on TikTok, YouTube and Instagram who want to track earnings, find brand deals, and manage payouts in MNT.' },
  { q: 'How do payments work?', a: 'Earnings sync from connected platforms. Sponsorship payouts and wallet withdrawals are handled in MNT through your Earnio wallet.' },
  { q: 'Can I work with multiple brands at once?', a: 'Yes. Apply to multiple sponsorships and manage each application from your dashboard.' },
];

/* ---------- mesh background ---------- */
const Mesh = ({ children, style }) => (
  <div style={{
    backgroundColor: 'var(--bg-page)',
    backgroundImage: 'radial-gradient(ellipse 70% 55% at 8% -8%, var(--mesh-1) 0%, transparent 55%),radial-gradient(ellipse 60% 50% at 96% -4%, var(--mesh-2) 0%, transparent 52%),radial-gradient(ellipse 55% 45% at 60% 108%, var(--mesh-3) 0%, transparent 55%)',
    ...style,
  }}>{children}</div>
);

/* ---------- Nav ---------- */
function Nav({ audience, setAudience, onSignup, onLogin }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'color-mix(in srgb, var(--surface) 68%, transparent)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid color-mix(in srgb, var(--border) 70%, transparent)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--primary)' }}>
          <Mark size={28} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>Earnio</span>
        </div>
        <nav style={{ display: 'flex', gap: 26, marginLeft: 14 }} className="site-navlinks">
          {['How it works', 'Features', 'FAQ'].map((l) => (
            <a key={l} href={'#' + l.replace(/\s+/g, '-').toLowerCase()} style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-strong)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>{l}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 3 }}>
            {[['creator', 'For creators'], ['brand', 'For brands']].map(([k, label]) => (
              <button key={k} onClick={() => setAudience(k)} style={{
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13, padding: '7px 14px', borderRadius: 'var(--radius-full)',
                background: audience === k ? 'var(--surface)' : 'transparent', color: audience === k ? 'var(--text-strong)' : 'var(--text-muted)',
                boxShadow: audience === k ? 'var(--shadow-xs)' : 'none', transition: 'all .18s',
              }}>{label}</button>
            ))}
          </div>
          <button onClick={onLogin} className="site-login" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: 'var(--text-body)' }}>Log in</button>
          <Button variant="dark" size="sm" onClick={onSignup}>Get started</Button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function HeroVisual({ metrics }) {
  return (
    <div style={{ position: 'relative', minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'var(--blue-200)' }} aria-hidden="true">
        <ellipse cx="200" cy="200" rx="172" ry="118" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 9" fill="none"/>
        <ellipse cx="200" cy="200" rx="120" ry="78" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 9" fill="none" transform="rotate(-12 200 200)"/>
      </svg>
      {/* central earnings card */}
      <div style={{ position: 'relative', width: 300, background: 'var(--surface)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)', padding: 24, transform: 'rotate(-2deg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>This month</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--success)', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono)' }}>▲ 18.2%</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 32, letterSpacing: '-0.02em', color: 'var(--text-strong)', marginTop: 6 }}>₮2,480,000</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 56, marginTop: 18 }}>
          {[38, 52, 44, 66, 58, 80, 72, 96].map((h, i) => (
            <div key={i} style={{ flex: 1, height: h + '%', borderRadius: 5, background: i === 7 ? 'var(--gradient-spark)' : 'var(--blue-100)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 18, color: 'var(--text-muted)' }}>
          <Platform.tiktok width="18" height="18"/><Platform.youtube width="18" height="18"/><Platform.instagram width="18" height="18"/>
          <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: 'var(--text-faint)' }}>3 connected</span>
        </div>
      </div>
      <Chip style={{ top: '6%', left: '0%' }} icon="trend" label={metrics[0] + ' views'} />
      <Chip style={{ top: '12%', right: '-2%' }} icon="wallet" label={metrics[2] + ' earned'} />
      <Chip style={{ bottom: '8%', left: '6%' }} icon="check" label="Payout sent" tone="success" />
    </div>
  );
}
function Chip({ style, icon, label, tone }) {
  return (
    <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 8, background: 'color-mix(in srgb, var(--surface) 90%, transparent)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: '8px 13px', boxShadow: 'var(--shadow-md)', ...style }}>
      <span style={{ display: 'inline-flex', width: 26, height: 26, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: tone === 'success' ? 'var(--success-soft)' : 'var(--primary-soft)', color: tone === 'success' ? 'var(--success)' : 'var(--primary)' }}>{I[icon]({ width: 15, height: 15 })}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', fontFamily: 'var(--font-mono)' }}>{label}</span>
    </div>
  );
}
function Hero({ c, onSignup }) {
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 28px 72px', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 40, alignItems: 'center' }} className="site-hero">
      <div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--primary-soft)', color: 'var(--primary-press)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-full)', padding: '6px 13px', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.01em' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />{c.badge}
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.035em', color: 'var(--text-strong)', margin: '20px 0 0' }}>{c.title}</h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-muted)', margin: '20px 0 0', maxWidth: 520 }}>{c.subtitle}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
          <Button variant="dark" size="lg" rightIcon={I.arrow({})} onClick={onSignup}>{c.primary}</Button>
          <Button variant="secondary" size="lg">{c.secondary}</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 30, color: 'var(--text-faint)' }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Works with</span>
          <Platform.tiktok width="19" height="19"/><Platform.youtube width="19" height="19"/><Platform.instagram width="19" height="19"/>
        </div>
      </div>
      <HeroVisual metrics={c.metrics} />
    </section>
  );
}

/* ---------- How it works ---------- */
function HowItWorks({ c }) {
  return (
    <section id="how-it-works" style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 28px 60px' }}>
      <Eyebrow>How it works</Eyebrow>
      <h2 style={hStyle}>{c === CONTENT.creator ? 'How Earnio works for creators' : 'How brand partnerships work'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginTop: 34 }} className="site-grid4">
        {c.steps.map((s, i) => (
          <Card key={i} padding="lg">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-flex', width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', background: 'var(--primary-soft)', color: 'var(--primary)' }}>{I[s.icon]({ width: 22, height: 22 })}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-faint)' }}>0{i + 1}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text-strong)', margin: '18px 0 6px' }}>{s.t}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{s.d}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features({ c }) {
  return (
    <section id="features" style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 28px 60px' }}>
      <Eyebrow>Features</Eyebrow>
      <h2 style={hStyle}>Everything in one place</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18, marginTop: 34 }} className="site-grid2">
        {c.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ flex: 'none', display: 'inline-flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', color: '#fff' }}>{I.check({ width: 20, height: 20 })}</span>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text-strong)', margin: '2px 0 6px' }}>{f.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{f.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 28px 60px' }}>
      <Eyebrow>Loved by creators</Eyebrow>
      <h2 style={hStyle}>Built for Mongolian creators</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 34 }} className="site-grid3">
        {TESTIMONIALS.map((t, i) => (
          <Card key={i} padding="lg">
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-body)', margin: '0 0 20px' }}>“{t.quote}”</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <DS.Avatar name={t.name} size="sm" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)' }}>{t.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{t.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{ maxWidth: 820, margin: '0 auto', padding: '40px 28px 70px' }}>
      <Eyebrow center>FAQ</Eyebrow>
      <h2 style={{ ...hStyle, textAlign: 'center' }}>Questions, answered</h2>
      <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>{f.q}</span>
                <span style={{ flex: 'none', color: 'var(--primary)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .22s' }}>{I.plus({ width: 20, height: 20 })}</span>
              </button>
              {isOpen ? <div style={{ padding: '0 20px 20px', fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-muted)' }}>{f.a}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- CTA band + footer ---------- */
function CtaBand({ onSignup }) {
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 28px 70px' }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--gradient-ink)', borderRadius: 'var(--radius-2xl)', padding: '56px 48px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 50% 80% at 80% 0%, rgba(46,91,255,.45) 0%, transparent 60%),radial-gradient(ellipse 40% 70% at 12% 100%, rgba(18,194,243,.3) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>Ready to earn more?</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.7)', margin: '14px auto 28px', maxWidth: 460 }}>Join Earnio free, connect your platforms, and start landing brand deals in MNT.</p>
          <Button variant="primary" size="lg" onClick={onSignup} rightIcon={I.arrow({})}>Get started</Button>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'var(--primary)' }}>
          <Mark size={22} /><span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-strong)' }}>Earnio</span>
          <span style={{ fontSize: 13, color: 'var(--text-faint)', marginLeft: 8 }}>© Earnio — Built for Mongolian creators</span>
        </div>
        <div style={{ display: 'flex', gap: 22, fontSize: 14, color: 'var(--text-muted)' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Log in</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Signup modal ---------- */
function SignupModal({ mode, onClose }) {
  const [done, setDone] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const isLogin = mode === 'login';
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(11,18,32,.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(100%, 440px)', background: 'var(--surface)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)', padding: 32, position: 'relative' }}>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 18, right: 18, width: 34, height: 34, borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--surface-muted)', color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{I.close({ width: 18, height: 18 })}</button>
        <div style={{ color: 'var(--primary)', marginBottom: 14 }}><Mark size={34} /></div>
        {done ? (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-strong)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>You're in 🎉</h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 22px' }}>Welcome to Earnio. Connect a platform to start tracking your earnings.</p>
            <Button variant="primary" fullWidth onClick={onClose}>Go to dashboard</Button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-strong)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p style={{ fontSize: 14.5, color: 'var(--text-muted)', margin: '0 0 22px' }}>{isLogin ? 'Log in to your Earnio dashboard.' : 'Free to join. No card required.'}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {!isLogin ? <Input label="Name" placeholder="Your name" /> : null}
              <Input label="Email" type="email" placeholder="you@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              {!isLogin ? <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} label="I accept the Terms and Privacy Policy" /> : null}
              <Button variant="primary" fullWidth onClick={() => setDone(true)} disabled={!isLogin && !agree}>{isLogin ? 'Log in' : 'Create account'}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- shared bits ---------- */
const hStyle = { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '10px 0 0' };
function Eyebrow({ children, center }) {
  return <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary)', textAlign: center ? 'center' : 'left' }}>{children}</div>;
}

/* ---------- root ---------- */
function EarnioSite() {
  const [audience, setAudience] = React.useState('creator');
  const [modal, setModal] = React.useState(null); // 'signup' | 'login' | null
  const c = CONTENT[audience];
  React.useEffect(() => {
    const s = document.createElement('style');
    s.textContent = '@media(max-width:900px){.site-hero{grid-template-columns:1fr!important}.site-grid4{grid-template-columns:repeat(2,1fr)!important}.site-grid2,.site-grid3{grid-template-columns:1fr!important}.site-navlinks{display:none!important}}';
    document.head.appendChild(s);
  }, []);
  return (
    <Mesh>
      <Nav audience={audience} setAudience={setAudience} onSignup={() => setModal('signup')} onLogin={() => setModal('login')} />
      <Hero c={c} onSignup={() => setModal('signup')} />
      <HowItWorks c={c} />
      <Features c={c} />
      <Testimonials />
      <Faq />
      <CtaBand onSignup={() => setModal('signup')} />
      <Footer />
      {modal ? <SignupModal mode={modal} onClose={() => setModal(null)} /> : null}
    </Mesh>
  );
}
window.EarnioSite = EarnioSite;
