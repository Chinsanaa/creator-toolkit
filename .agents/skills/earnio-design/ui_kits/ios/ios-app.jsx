/* global React */
const DS = window.EarnioDesignSystem_f806e6;
const { Button, Badge, Avatar, ProgressBar } = DS;
const { IOSDevice } = window;

/* ---------- icons ---------- */
const I = {
  home: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>,
  compass: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>,
  wallet: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M16 12h.01"/></svg>,
  user: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  trend: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17l6-6 4 4 8-8M21 7h-5M21 7v5"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  arrowUp: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>,
  calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  chevR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 6 6 6-6 6"/></svg>,
  cog: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2l-.4-2.6H8.9l-.4 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 4 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2l.4 2.6h6.2l.4-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z"/></svg>,
  card: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  help: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2.5 2-2.5 3.5M12 17h.01"/></svg>,
  logout: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/></svg>,
};
const Mark = ({ size = 26, color }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true" style={{ color }}>
    <path d="M34 62 L62 34" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M44 34 H62 V52" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PF = {
  tiktok: { name: 'TikTok', color: '#0B1220', icon: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.6 5.82a4.28 4.28 0 0 1-1.1-2.82h-3.2v12.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.4a5.83 5.83 0 0 0-.78-.05A5.85 5.85 0 1 0 15.3 15.2V9.01a7.4 7.4 0 0 0 4.3 1.37V7.18a4.28 4.28 0 0 1-3-1.36z"/></svg> },
  youtube: { name: 'YouTube', color: '#FF0033', icon: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.2zM9.8 15.3V8.7l5.7 3.3z"/></svg> },
  instagram: { name: 'Instagram', color: '#C13584', icon: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg> },
};
const TREND = [1.4, 1.7, 1.5, 2.0, 1.9, 2.3, 2.1, 2.6, 2.2, 2.8, 2.5, 2.48];
const MONTHS = ['J','F','M','A','M','J','J','A','S','O','N','D'];
const DEALS = [
  { brand: 'Maybee', title: 'Pop&Joy summer launch', budget: '₮800,000', platforms: ['tiktok', 'instagram'], deadline: '6d', tag: 'Featured' },
  { brand: 'Gobi', title: 'Cashmere autumn reel', budget: '₮1,200,000', platforms: ['instagram'], deadline: '12d', tag: null },
  { brand: 'MCS', title: 'Festival recap', budget: '₮650,000', platforms: ['tiktok', 'youtube'], deadline: '9d', tag: null },
  { brand: 'Nomin', title: 'Grocery haul', budget: '₮500,000', platforms: ['tiktok'], deadline: '4d', tag: 'New' },
];
const TX = [
  { date: 'Jun 12', label: 'Pop&Joy — UGC video', amt: 640000, credit: true, status: 'Completed' },
  { date: 'Jun 10', label: 'Withdrawal · Khan Bank', amt: 1000000, credit: false, status: 'Pending' },
  { date: 'Jun 09', label: 'YouTube ad revenue', amt: 420000, credit: true, status: 'Completed' },
  { date: 'Jun 05', label: 'Gobi Cashmere — reel', amt: 520000, credit: true, status: 'Completed' },
];
const fmt = (n) => '₮' + n.toLocaleString('en-US');

/* ===== shared styles ===== */
const DISPLAY = 'var(--font-display)';
const SANS = 'var(--font-sans)';
const MONO = 'var(--font-mono)';
const TOP = 60; // status-bar safe area
const card = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, boxShadow: 'var(--shadow-sm)' };

/* ===== app header ===== */
function AppHeader({ kicker, title, right }) {
  return (
    <div style={{ padding: `${TOP}px 20px 10px`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
      <div>
        {kicker ? <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-muted)' }}>{kicker}</div> : null}
        <h1 style={{ fontFamily: DISPLAY, fontSize: 27, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '2px 0 0' }}>{title}</h1>
      </div>
      {right}
    </div>
  );
}
function RoundIcon({ children, onClick, badge }) {
  return (
    <button onClick={onClick} style={{ position: 'relative', width: 42, height: 42, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-xs)' }}>
      {children}
      {badge ? <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: 'var(--danger)', border: '1.5px solid var(--surface)' }} /> : null}
    </button>
  );
}

/* ===== bottom tab bar ===== */
const TABS = [['home', 'Home', 'home'], ['explore', 'Explore', 'compass'], ['wallet', 'Wallet', 'wallet'], ['profile', 'Profile', 'user']];
function TabBar({ tab, setTab }) {
  return (
    <div style={{ flex: 'none', padding: '8px 14px 30px', background: 'color-mix(in srgb, var(--surface) 82%, transparent)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
      {TABS.map(([k, label, icon]) => {
        const active = tab === k;
        return (
          <button key={k} onClick={() => setTab(k)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 0', color: active ? 'var(--primary)' : 'var(--text-faint)' }}>
            {I[icon]({ width: 23, height: 23 })}
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: active ? 700 : 600 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ===== ONBOARDING ===== */
const SLIDES = [
  { title: 'Track every ₮ you earn', sub: 'See revenue from TikTok, YouTube and Instagram in one clean dashboard.', visual: 'earnings' },
  { title: 'Land brand deals', sub: 'Browse sponsorships from Mongolian brands and apply in a tap — no cold DMs.', visual: 'deal' },
  { title: 'Get paid in MNT', sub: 'Withdraw straight to Khan Bank, Golomt or XacBank. Your money, your way.', visual: 'payout' },
];
function OnboardVisual({ kind }) {
  return (
    <div style={{ position: 'relative', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'var(--blue-200)' }} aria-hidden="true">
        <ellipse cx="200" cy="150" rx="150" ry="110" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 9" fill="none"/>
      </svg>
      {kind === 'earnings' && (
        <div style={{ width: 250, ...card, borderRadius: 26, boxShadow: 'var(--shadow-xl)', padding: 20, transform: 'rotate(-3deg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-muted)' }}>This month</span>
            <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: 12.5, fontFamily: MONO }}>▲ 18.2%</span>
          </div>
          <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 27, letterSpacing: '-0.02em', color: 'var(--text-strong)', marginTop: 5 }}>₮2,480,000</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 48, marginTop: 14 }}>
            {[40, 55, 46, 68, 60, 82, 74, 98].map((h, i) => <div key={i} style={{ flex: 1, height: h + '%', borderRadius: 4, background: i === 7 ? 'var(--gradient-spark)' : 'var(--blue-100)' }} />)}
          </div>
        </div>
      )}
      {kind === 'deal' && (
        <div style={{ width: 250, ...card, borderRadius: 26, boxShadow: 'var(--shadow-xl)', padding: 18, transform: 'rotate(2deg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--gradient-brand)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 700 }}>M</span>
            <div><div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Maybee</div><div style={{ fontFamily: DISPLAY, fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)' }}>Pop&Joy launch</div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>₮800,000</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--primary)', borderRadius: 999, padding: '5px 12px' }}>Apply</span>
          </div>
        </div>
      )}
      {kind === 'payout' && (
        <div style={{ width: 250, borderRadius: 26, boxShadow: 'var(--shadow-xl)', padding: 22, transform: 'rotate(-2deg)', background: 'var(--gradient-ink)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 60% 80% at 90% 0%, rgba(46,91,255,.5) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative' }}>
            <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', fontWeight: 600 }}>Available balance</span>
            <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 26, marginTop: 4 }}>₮2,100,000</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, background: '#fff', color: 'var(--ink-900)', borderRadius: 999, padding: '9px 14px', fontWeight: 700, fontSize: 13.5, width: 'fit-content' }}>{I.arrowUp({ width: 16, height: 16 })}Withdraw to Khan Bank</div>
          </div>
        </div>
      )}
    </div>
  );
}
function Onboarding({ onDone, onLogin }) {
  const [i, setI] = React.useState(0);
  const last = i === SLIDES.length - 1;
  const s = SLIDES[i];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)', backgroundImage: 'radial-gradient(ellipse 60% 35% at 20% 4%, var(--mesh-1) 0%, transparent 60%),radial-gradient(ellipse 50% 30% at 95% 0%, var(--mesh-2) 0%, transparent 55%)' }}>
      <div style={{ padding: `${TOP}px 20px 0`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)' }}><Mark size={24} /><span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>Earnio</span></div>
        <button onClick={onDone} style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: SANS }}>Skip</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        <OnboardVisual kind={s.visual} />
        <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, letterSpacing: '-0.035em', color: 'var(--text-strong)', margin: '8px 0 0', lineHeight: 1.1 }}>{s.title}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--text-muted)', margin: '14px 0 0' }}>{s.sub}</p>
      </div>
      <div style={{ padding: '0 24px 40px' }}>
        <div style={{ display: 'flex', gap: 7, justifyContent: 'center', marginBottom: 22 }}>
          {SLIDES.map((_, k) => <span key={k} style={{ height: 7, borderRadius: 99, transition: 'all .25s', width: k === i ? 24 : 7, background: k === i ? 'var(--primary)' : 'var(--ink-200)' }} />)}
        </div>
        <Button variant="primary" size="lg" fullWidth rightIcon={I.arrow({})} onClick={() => last ? onDone() : setI(i + 1)}>{last ? 'Create account' : 'Continue'}</Button>
        <button onClick={onLogin} style={{ width: '100%', marginTop: 14, border: 'none', background: 'transparent', color: 'var(--text-muted)', fontWeight: 600, fontSize: 14.5, cursor: 'pointer', fontFamily: SANS }}>I already have an account</button>
      </div>
    </div>
  );
}

/* ===== AUTH ===== */
function Field({ label, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-strong)', fontFamily: SANS }}>{label}</span>
      <input {...rest} style={{ fontFamily: SANS, fontSize: 16, padding: '13px 15px', borderRadius: 13, border: '1px solid var(--border)', background: 'var(--surface)', outline: 'none', color: 'var(--text-strong)' }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = 'var(--focus-ring)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
    </label>
  );
}
function Auth({ mode, setMode, onAuthed }) {
  const isLogin = mode === 'login';
  const [agree, setAgree] = React.useState(false);
  const oauth = (label, glyph) => (
    <button style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '12px', borderRadius: 13, border: '1px solid var(--border)', background: 'var(--surface)', fontFamily: SANS, fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)', cursor: 'pointer' }}>{glyph}{label}</button>
  );
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--surface)', overflow: 'auto' }}>
      <div style={{ padding: `${TOP}px 24px 0` }}>
        <div style={{ color: 'var(--primary)' }}><Mark size={34} /></div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '16px 0 6px' }}>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
        <p style={{ fontSize: 14.5, color: 'var(--text-muted)', margin: 0 }}>{isLogin ? 'Log in to track earnings and deals.' : 'Free to join. No card required.'}</p>
      </div>
      <div style={{ flex: 1, padding: '22px 24px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 11 }}>
          {oauth('Apple', <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1.1 2.7-2.2.5-.8.9-1.6 1.2-2.5-2.5-1-2.7-3.2-2.7-3.3zM14.2 5.5c.6-.8 1-1.8.9-2.9-.9.1-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.1z"/></svg>)}
          {oauth('Google', <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5z"/><path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.2 13.6a6 6 0 0 1 0-3.8V7.1H2.7a10 10 0 0 0 0 9z"/><path fill="#EA4335" d="M12 6.4c1.5 0 2.9.5 3.9 1.5l2.9-2.9A10 10 0 0 0 2.7 7.1l3.5 2.7C7 7.3 9.3 5.4 12 5.4z"/></svg>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-faint)', fontSize: 12.5 }}><span style={{ flex: 1, height: 1, background: 'var(--border)' }} />or<span style={{ flex: 1, height: 1, background: 'var(--border)' }} /></div>
        {!isLogin ? <Field label="Name" placeholder="Your name" /> : null}
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Field label="Password" type="password" placeholder="••••••••" />
        {!isLogin ? (
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }} onClick={() => setAgree(!agree)}>
            <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 7, border: agree ? 'none' : '1.5px solid var(--border-strong)', background: agree ? 'var(--primary)' : 'var(--surface)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{agree ? I.check({ width: 14, height: 14 }) : null}</span>
            <span style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.45, fontFamily: SANS }}>I accept the <b style={{ color: 'var(--text-link)' }}>Terms</b> and <b style={{ color: 'var(--text-link)' }}>Privacy Policy</b></span>
          </label>
        ) : null}
      </div>
      <div style={{ padding: '16px 24px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button variant="primary" size="lg" fullWidth onClick={onAuthed} disabled={!isLogin && !agree}>{isLogin ? 'Log in' : 'Create account'}</Button>
        <button onClick={() => setMode(isLogin ? 'signup' : 'login')} style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: SANS }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}<b style={{ color: 'var(--primary)' }}>{isLogin ? 'Sign up' : 'Log in'}</b>
        </button>
      </div>
    </div>
  );
}

/* ===== HOME ===== */
function StatChip({ label, value }) {
  return (
    <div style={{ flex: 1, ...card, borderRadius: 16, padding: '12px 14px' }}>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontFamily: MONO, fontSize: 16.5, fontWeight: 600, color: 'var(--text-strong)', marginTop: 3 }}>{value}</div>
    </div>
  );
}
function Home({ go }) {
  return (
    <Scroll>
      <AppHeader kicker="Wednesday, Jun 16" title="Hey, Bold-Erdene" right={<div style={{ display: 'flex', gap: 10 }}><RoundIcon badge>{I.bell({ width: 20, height: 20 })}</RoundIcon><Avatar name="Bold Erdene" size="md" ring /></div>} />
      <div style={{ padding: '6px 20px 0' }}>
        {/* balance hero */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, padding: 22, background: 'var(--gradient-ink)', color: '#fff', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 55% 80% at 88% 0%, rgba(46,91,255,.55) 0%, transparent 60%),radial-gradient(ellipse 40% 70% at 8% 100%, rgba(18,194,243,.32) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>Available balance</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 700, fontFamily: MONO, background: 'rgba(255,255,255,.14)', borderRadius: 999, padding: '4px 9px' }}>{I.trend({ width: 13, height: 13 })} 18.2%</span>
            </div>
            <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 34, letterSpacing: '-0.02em', margin: '6px 0 0' }}>₮2,100,000</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button onClick={() => go('wallet')} style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: '#fff', color: 'var(--ink-900)', border: 'none', borderRadius: 999, padding: '11px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: SANS }}>{I.arrowUp({ width: 16, height: 16 })}Withdraw</button>
              <button onClick={() => go('explore')} style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: 'rgba(255,255,255,.16)', color: '#fff', border: 'none', borderRadius: 999, padding: '11px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: SANS }}>Find deals</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 11, marginTop: 14 }}>
          <StatChip label="This month" value="₮2.48M" />
          <StatChip label="Active deals" value="4" />
          <StatChip label="Platforms" value="3" />
        </div>
        {/* chart */}
        <div style={{ ...card, padding: 18, marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>Monthly earnings</span>
            <Badge tone="success" dot>+18%</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 110 }}>
            {TREND.map((v, k) => (
              <div key={k} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', height: (v / 3) * 96, borderRadius: '5px 5px 2px 2px', background: k === TREND.length - 1 ? 'var(--gradient-spark)' : 'var(--blue-100)' }} />
                <span style={{ fontSize: 9.5, color: 'var(--text-faint)', fontFamily: MONO }}>{MONTHS[k]}</span>
              </div>
            ))}
          </div>
        </div>
        {/* recent */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '22px 2px 12px' }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>Recent earnings</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-link)' }}>See all</span>
        </div>
        <div style={{ ...card, padding: '4px 16px' }}>
          {[['tiktok', 'Pop&Joy — UGC video', 'Sponsorship', 800000], ['youtube', 'Ad revenue payout', 'Earnings', 420000], ['instagram', 'Gobi Cashmere — reel', 'Sponsorship', 650000]].map(([src, label, type, amt], k) => {
            const p = PF[src];
            return (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 0', borderTop: k ? '1px solid var(--border)' : 'none' }}>
                <span style={{ flex: 'none', width: 38, height: 38, borderRadius: 11, background: 'var(--surface-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>{p.icon({ width: 18, height: 18 })}</span>
                <div style={{ minWidth: 0, flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{type}</div></div>
                <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: 'var(--success)' }}>+{fmt(amt)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Scroll>
  );
}

/* ===== EXPLORE ===== */
function Explore({ applied, onApply }) {
  const [f, setF] = React.useState('all');
  const list = DEALS.filter((d) => f === 'all' || d.platforms.includes(f));
  return (
    <Scroll>
      <AppHeader kicker="Sponsorships" title="Explore deals" />
      <div style={{ padding: '4px 20px 0' }}>
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }}>{I.search({ width: 18, height: 18 })}</span>
          <input placeholder="Search campaigns and brands" style={{ width: '100%', fontFamily: SANS, fontSize: 15, padding: '13px 16px 13px 42px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)', outline: 'none', color: 'var(--text-strong)' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 2 }}>
          {[['all', 'All'], ['tiktok', 'TikTok'], ['youtube', 'YouTube'], ['instagram', 'Instagram']].map(([k, label]) => (
            <button key={k} onClick={() => setF(k)} style={{ flex: 'none', border: '1px solid', borderColor: f === k ? 'var(--primary)' : 'var(--border)', background: f === k ? 'var(--primary)' : 'var(--surface)', color: f === k ? '#fff' : 'var(--text-body)', borderRadius: 999, padding: '8px 16px', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', fontFamily: SANS }}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {list.map((d, k) => {
            const isApplied = applied.includes(d.title);
            return (
              <div key={k} style={{ ...card, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
                  <span style={{ flex: 'none', width: 44, height: 44, borderRadius: 13, background: 'var(--gradient-brand)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 700, fontSize: 17 }}>{d.brand[0]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600 }}>{d.brand}</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: 15.5, fontWeight: 600, color: 'var(--text-strong)' }}>{d.title}</div>
                  </div>
                  {d.tag ? <Badge tone="brand">{d.tag}</Badge> : null}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  {d.platforms.map((k2) => <span key={k2} style={{ color: PF[k2].color, display: 'inline-flex' }}>{PF[k2].icon({ width: 17, height: 17 })}</span>)}
                  <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: 'var(--text-faint)' }}>{I.calendar({ width: 14, height: 14 })}{d.deadline} left</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 13, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 600, color: 'var(--text-strong)' }}>{d.budget}</span>
                  {isApplied ? <Badge tone="success" dot>Applied</Badge> : <Button variant="primary" size="sm" onClick={() => onApply(d.title)}>Apply now</Button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Scroll>
  );
}

/* ===== WALLET ===== */
function Wallet({ onPayout }) {
  const [amt, setAmt] = React.useState('');
  const [sent, setSent] = React.useState(false);
  return (
    <Scroll>
      <AppHeader kicker="Wallet" title="Balance" />
      <div style={{ padding: '4px 20px 0' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, padding: 22, background: 'var(--gradient-brand)', color: '#fff', boxShadow: 'var(--shadow-brand)' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', fontWeight: 600 }}>Available to withdraw</span>
          <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 34, margin: '6px 0 0' }}>₮2,100,000</div>
          <div style={{ display: 'flex', gap: 18, marginTop: 14, fontSize: 12.5 }}>
            <span style={{ color: 'rgba(255,255,255,.85)' }}>Pending <b style={{ fontFamily: MONO }}>₮1.0M</b></span>
            <span style={{ color: 'rgba(255,255,255,.85)' }}>Earned <b style={{ fontFamily: MONO }}>₮12.4M</b></span>
          </div>
        </div>
        {/* request payout */}
        <div style={{ ...card, padding: 18, marginTop: 14 }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 4 }}>Request payout</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 14 }}>Minimum ₮50,000</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0 14px' }}>
            <span style={{ fontFamily: MONO, fontSize: 26, fontWeight: 600, color: 'var(--text-faint)' }}>₮</span>
            <input value={amt} onChange={(e) => setAmt(e.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" style={{ flex: 1, border: 'none', outline: 'none', fontFamily: MONO, fontSize: 26, fontWeight: 600, color: 'var(--text-strong)', background: 'transparent', minWidth: 0 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 13, background: 'var(--surface-muted)', border: '1px solid var(--border)', marginBottom: 14 }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--surface)', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>{I.card({ width: 17, height: 17 })}</span>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>Khan Bank</div><div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: MONO }}>••4821</div></div>
            {I.chevR({ width: 18, height: 18, style: { color: 'var(--text-faint)' } })}
          </div>
          {sent ? <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--success)', fontWeight: 600, marginBottom: 12 }}>{I.check({ width: 16, height: 16 })}Payout requested — processing to Khan Bank.</div> : null}
          <Button variant="primary" fullWidth onClick={() => { setSent(true); onPayout(); }}>Withdraw {amt ? fmt(Number(amt)) : ''}</Button>
        </div>
        {/* transactions */}
        <div style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 700, color: 'var(--text-strong)', margin: '22px 2px 12px' }}>Transactions</div>
        <div style={{ ...card, padding: '4px 16px' }}>
          {TX.map((t, k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderTop: k ? '1px solid var(--border)' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 8, alignItems: 'center' }}>{t.date}<span style={{ width: 3, height: 3, borderRadius: 99, background: 'var(--text-faint)' }} /><span style={{ color: t.status === 'Pending' ? 'var(--warning)' : 'var(--success)', fontWeight: 600 }}>{t.status}</span></div>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: t.credit ? 'var(--success)' : 'var(--text-strong)' }}>{t.credit ? '+' : '−'}{fmt(t.amt)}</span>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

/* ===== PROFILE ===== */
function Profile({ onLogout }) {
  const rows = [['cog', 'Account'], ['bell', 'Notifications'], ['card', 'Payment methods'], ['help', 'Help & support']];
  return (
    <Scroll>
      <AppHeader kicker="Profile" title="You" />
      <div style={{ padding: '4px 20px 0' }}>
        <div style={{ ...card, padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name="Bold Erdene" size="lg" ring />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: 'var(--text-strong)' }}>Bold-Erdene</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>@bolderdene · Creator</div>
          </div>
          <Button variant="secondary" size="sm">Edit</Button>
        </div>
        {/* connected platforms */}
        <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '22px 4px 10px' }}>Connected platforms</div>
        <div style={{ ...card, padding: '4px 16px' }}>
          {Object.entries(PF).map(([k, p], idx) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 0', borderTop: idx ? '1px solid var(--border)' : 'none' }}>
              <span style={{ color: p.color, display: 'inline-flex' }}>{p.icon({ width: 22, height: 22 })}</span>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>{p.name}</span>
              <Badge tone="success" dot>Synced</Badge>
            </div>
          ))}
        </div>
        {/* settings */}
        <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '22px 4px 10px' }}>Settings</div>
        <div style={{ ...card, padding: '4px 16px' }}>
          {rows.map(([icon, label], idx) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 0', borderTop: idx ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--surface-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-body)' }}>{I[icon]({ width: 17, height: 17 })}</span>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: 'var(--text-strong)' }}>{label}</span>
              {I.chevR({ width: 18, height: 18, style: { color: 'var(--text-faint)' } })}
            </div>
          ))}
        </div>
        <button onClick={onLogout} style={{ width: '100%', marginTop: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--danger)', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: SANS }}>{I.logout({ width: 18, height: 18 })}Log out</button>
      </div>
    </Scroll>
  );
}

/* scroll wrapper for app screens (leaves room for tab bar) */
function Scroll({ children }) {
  return <div style={{ flex: 1, overflow: 'auto', paddingBottom: 18 }}>{children}</div>;
}

/* ===== ROOT ===== */
function EarnioIOS() {
  const [flow, setFlow] = React.useState('onboarding'); // onboarding | auth | app
  const [authMode, setAuthMode] = React.useState('signup');
  const [tab, setTab] = React.useState('home');
  const [applied, setApplied] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const fireToast = (m) => { setToast(m); clearTimeout(window.__et); window.__et = setTimeout(() => setToast(null), 2400); };

  let screen;
  if (flow === 'onboarding') screen = <Onboarding onDone={() => { setAuthMode('signup'); setFlow('auth'); }} onLogin={() => { setAuthMode('login'); setFlow('auth'); }} />;
  else if (flow === 'auth') screen = <Auth mode={authMode} setMode={setAuthMode} onAuthed={() => { setFlow('app'); setTab('home'); }} />;
  else {
    const inner = tab === 'home' ? <Home go={setTab} />
      : tab === 'explore' ? <Explore applied={applied} onApply={(t) => { setApplied((a) => [...a, t]); fireToast('Application sent to ' + t.split(' ')[0]); }} />
      : tab === 'wallet' ? <Wallet onPayout={() => fireToast('Payout requested')} />
      : <Profile onLogout={() => { setFlow('onboarding'); setApplied([]); }} />;
    screen = (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>
        {inner}
        <TabBar tab={tab} setTab={setTab} />
      </div>
    );
  }

  const chips = [
    ['Onboarding', () => setFlow('onboarding')],
    ['Sign up', () => { setAuthMode('signup'); setFlow('auth'); }],
    ['Home', () => { setFlow('app'); setTab('home'); }],
    ['Explore', () => { setFlow('app'); setTab('explore'); }],
    ['Wallet', () => { setFlow('app'); setTab('wallet'); }],
    ['Profile', () => { setFlow('app'); setTab('profile'); }],
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 16px 56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: 'var(--primary)' }}><Mark size={26} /><span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 21, letterSpacing: '-0.02em', color: 'var(--ink-900)' }}>Earnio iOS</span></div>
      <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'var(--ink-500)', margin: '0 0 18px' }}>Tap through, or jump to a screen:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 26, maxWidth: 440 }}>
        {chips.map(([label, fn]) => (
          <button key={label} onClick={fn} style={{ border: '1px solid var(--border)', background: 'rgba(255,255,255,.75)', backdropFilter: 'blur(8px)', color: 'var(--ink-700)', borderRadius: 999, padding: '8px 15px', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: SANS, boxShadow: 'var(--shadow-xs)' }}>{label}</button>
        ))}
      </div>
      <div style={{ position: 'relative' }}>
        <IOSDevice>
          {screen}
          {toast ? (
            <div style={{ position: 'absolute', bottom: 108, left: '50%', transform: 'translateX(-50%)', zIndex: 80, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--ink-900)', color: '#fff', padding: '11px 18px', borderRadius: 999, boxShadow: 'var(--shadow-lg)', fontSize: 13.5, fontWeight: 600, fontFamily: SANS, whiteSpace: 'nowrap', animation: 'et-toast .3s var(--ease-out)' }}>
              <span style={{ color: 'var(--success)', display: 'inline-flex' }}>{I.check({ width: 16, height: 16 })}</span>{toast}
            </div>
          ) : null}
        </IOSDevice>
      </div>
      <style>{`@keyframes et-toast{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
    </div>
  );
}
window.EarnioIOS = EarnioIOS;
