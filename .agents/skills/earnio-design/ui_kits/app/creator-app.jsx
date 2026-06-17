/* global React */
const DS = window.EarnioDesignSystem_f806e6;
const { Button, IconButton, Card, StatCard, Badge, Avatar, Tabs, Input, Select, ProgressBar, Switch } = DS;

/* ---------- icons ---------- */
const I = {
  home: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>,
  compass: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>,
  wallet: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M16 12h.01"/></svg>,
  layers: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>,
  settings: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  trend: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17l6-6 4 4 8-8M21 7h-5M21 7v5"/></svg>,
  calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  refresh: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v5h-5"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  chevR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 6 6 6-6 6"/></svg>,
  arrowUp: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3 4 6v6c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>,
  user: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>,
  card: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  globe: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>,
  logout: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/></svg>,
  eye: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
};
const Mark = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <path d="M34 62 L62 34" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M44 34 H62 V52" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PF = {
  tiktok: { name: 'TikTok', color: '#0B1220', icon: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.6 5.82a4.28 4.28 0 0 1-1.1-2.82h-3.2v12.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.4a5.83 5.83 0 0 0-.78-.05A5.85 5.85 0 1 0 15.3 15.2V9.01a7.4 7.4 0 0 0 4.3 1.37V7.18a4.28 4.28 0 0 1-3-1.36z"/></svg> },
  youtube: { name: 'YouTube', color: '#FF0033', icon: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.2zM9.8 15.3V8.7l5.7 3.3z"/></svg> },
  instagram: { name: 'Instagram', color: '#C13584', icon: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg> },
};

/* ---------- mock data ---------- */
const TREND = [1.4, 1.7, 1.5, 2.0, 1.9, 2.3, 2.1, 2.6, 2.2, 2.8, 2.5, 2.48];
const MONTHS = ['J','F','M','A','M','J','J','A','S','O','N','D'];
const BREAKDOWN = [
  { k: 'tiktok', amount: 6.2, pct: 50 },
  { k: 'youtube', amount: 4.1, pct: 33 },
  { k: 'instagram', amount: 2.1, pct: 17 },
];
const RECENT = [
  { date: 'Jun 12', src: 'tiktok', label: 'Pop&Joy — UGC video', amt: 800000, type: 'Sponsorship' },
  { date: 'Jun 09', src: 'youtube', label: 'Ad revenue payout', amt: 420000, type: 'Earnings' },
  { date: 'Jun 05', src: 'instagram', label: 'Gobi Cashmere — reel', amt: 650000, type: 'Sponsorship' },
  { date: 'Jun 01', src: 'tiktok', label: 'Creator fund', amt: 180000, type: 'Earnings' },
];
const DEALS = [
  { brand: 'Maybee', title: 'Pop&Joy summer launch', budget: '₮800,000', platforms: ['tiktok', 'instagram'], deadline: '6 days', tag: 'Featured', desc: 'Film a 30s UGC video featuring the new Pop&Joy drink. Authentic, fun, summer vibes.' },
  { brand: 'Gobi', title: 'Cashmere autumn reel', budget: '₮1,200,000', platforms: ['instagram'], deadline: '12 days', tag: null, desc: 'One styled Instagram reel showcasing the new autumn cashmere collection.' },
  { brand: 'MCS Coca-Cola', title: 'Festival recap', budget: '₮650,000', platforms: ['tiktok', 'youtube'], deadline: '9 days', tag: null, desc: 'Recap the summer festival with energetic short-form content.' },
  { brand: 'Khan Bank', title: 'Student account explainer', budget: '₮900,000', platforms: ['youtube'], deadline: '15 days', tag: null, desc: 'A clear, friendly explainer of the new student account aimed at Gen-Z.' },
  { brand: 'Nomin', title: 'Grocery haul', budget: '₮500,000', platforms: ['tiktok'], deadline: '4 days', tag: null, desc: 'A fast, fun grocery haul featuring Nomin supermarket finds.' },
  { brand: 'UBeats', title: 'Headphone unboxing', budget: '₮720,000', platforms: ['youtube', 'instagram'], deadline: '20 days', tag: 'New', desc: 'Unbox and review the new wireless headphones for a young audience.' },
];
const TX = [
  { date: 'Jun 12', type: 'Sponsorship', label: 'Pop&Joy — UGC video', amt: 640000, credit: true, status: 'completed' },
  { date: 'Jun 10', type: 'Payout', label: 'Withdrawal · Khan Bank', amt: 1000000, credit: false, status: 'pending' },
  { date: 'Jun 09', type: 'Earnings', label: 'YouTube ad revenue', amt: 420000, credit: true, status: 'completed' },
  { date: 'Jun 05', type: 'Sponsorship', label: 'Gobi Cashmere — reel', amt: 520000, credit: true, status: 'completed' },
  { date: 'Jun 01', type: 'Fee', label: 'Platform fee (20%)', amt: 160000, credit: false, status: 'completed' },
];
const fmt = (n) => '₮' + n.toLocaleString('en-US');
const PLATFORMS = [
  { k: 'tiktok', handle: '@bolderdene', followers: '142K', month: 6.2, growth: '+8.4%', synced: true, posts: 24 },
  { k: 'youtube', handle: 'Bold-Erdene', followers: '38.5K', month: 4.1, growth: '+3.1%', synced: true, posts: 6 },
  { k: 'instagram', handle: '@bold.erdene', followers: '76.2K', month: 2.1, growth: '+12.6%', synced: true, posts: 18 },
];

/* ---------- shell ---------- */
const NAV = [
  { k: 'dashboard', label: 'Dashboard', icon: 'home' },
  { k: 'explore', label: 'Explore', icon: 'compass' },
  { k: 'wallet', label: 'Wallet', icon: 'wallet' },
  { k: 'platforms', label: 'Platforms', icon: 'layers' },
  { k: 'settings', label: 'Settings', icon: 'settings' },
];
function Sidebar({ page, setPage }) {
  return (
    <aside style={{ width: 248, flex: 'none', borderRight: '1px solid var(--border)', background: 'color-mix(in srgb, var(--surface) 75%, transparent)', backdropFilter: 'blur(14px)', padding: '22px 16px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }} className="app-sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 22px', color: 'var(--primary)' }}>
        <Mark size={26} /><span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>Earnio</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {NAV.map((n) => {
          const active = page === n.k;
          return (
            <button key={n.k} onClick={() => setPage(n.k)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              background: active ? 'var(--ink-900)' : 'transparent', color: active ? '#fff' : 'var(--text-muted)',
              boxShadow: active ? 'var(--shadow-md)' : 'none', transition: 'background .18s, color .18s',
            }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'var(--surface-muted)'; e.currentTarget.style.color = 'var(--text-strong)'; } }}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; } }}>
              {I[n.icon]({ width: 19, height: 19 })}{n.label}
            </button>
          );
        })}
      </nav>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 11 }}>
        <Avatar name="Bold Erdene" size="sm" ring />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Bold-Erdene</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Creator</div>
        </div>
      </div>
    </aside>
  );
}
function Topbar({ title, toast }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 28px', borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--surface) 70%, transparent)', backdropFilter: 'blur(14px)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: 0 }}>{title}</h1>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }}>{I.search({ width: 17, height: 17 })}</span>
          <input placeholder="Search" style={{ width: 200, fontFamily: 'var(--font-sans)', fontSize: 14, padding: '9px 14px 9px 34px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--surface)', outline: 'none', color: 'var(--text-strong)' }} className="app-search" />
        </div>
        <IconButton variant="outline" label="Notifications"><span style={{ position: 'relative' }}>{I.bell({ width: 19, height: 19 })}<span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: 'var(--danger)', border: '1.5px solid var(--surface)' }} /></span></IconButton>
        <Avatar name="Bold Erdene" size="sm" />
      </div>
      {toast ? <div style={{ position: 'fixed', top: 74, right: 28, zIndex: 60, display: 'flex', alignItems: 'center', gap: 9, background: 'var(--ink-900)', color: '#fff', padding: '11px 16px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', fontSize: 14, fontWeight: 600, animation: 'ern-toast .3s var(--ease-out)' }}><span style={{ color: 'var(--success)' }}>{I.trend({ width: 16, height: 16 })}</span>{toast}</div> : null}
    </header>
  );
}

/* ---------- page header ---------- */
function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary)' }}>{eyebrow}</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '7px 0 0' }}>{title}</h2>
        {subtitle ? <p style={{ fontSize: 14.5, color: 'var(--text-muted)', margin: '6px 0 0' }}>{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ go }) {
  return (
    <div style={{ animation: 'ern-fade .4s var(--ease-out)' }}>
      <PageHeader eyebrow="Creator dashboard" title="Welcome back, Bold-Erdene" subtitle="Here's how your earnings are tracking this month." action={<Button variant="primary" size="sm" leftIcon={I.refresh({})}>Sync earnings</Button>} />
      {/* hero balance band */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 16, marginBottom: 16 }} className="app-grid-2">
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-xl)', padding: '26px 28px', background: 'var(--gradient-ink)', color: '#fff', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 50% 90% at 90% 0%, rgba(46,91,255,.55) 0%, transparent 60%),radial-gradient(ellipse 40% 80% at 4% 100%, rgba(18,194,243,.28) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>Available balance</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 700, fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,.14)', borderRadius: 999, padding: '5px 11px' }}>{I.trend({ width: 13, height: 13 })} 18.2%</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 42, letterSpacing: '-0.02em', margin: '8px 0 0' }}>₮2,100,000</div>
            <div style={{ display: 'flex', gap: 24, marginTop: 12, fontSize: 13 }}>
              <span style={{ color: 'rgba(255,255,255,.75)' }}>Pending <b style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>₮1.0M</b></span>
              <span style={{ color: 'rgba(255,255,255,.75)' }}>Earned all-time <b style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>₮12.4M</b></span>
            </div>
            <div style={{ display: 'flex', gap: 11, marginTop: 22 }}>
              <button onClick={() => go('wallet')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', color: 'var(--ink-900)', border: 'none', borderRadius: 999, padding: '11px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>{I.arrowUp({ width: 16, height: 16 })}Withdraw</button>
              <button onClick={() => go('explore')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.16)', color: '#fff', border: 'none', borderRadius: 999, padding: '11px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Find deals</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16 }}>
          <StatCard label="This month" value="₮2.48M" delta="18.2%" trend="up" hint="vs ₮2.1M" />
          <StatCard label="Total earnings" value="₮12.4M" hint="All time" icon={I.wallet({})} />
          <StatCard label="Active deals" value="4" hint="2 awaiting review" />
          <StatCard label="Connected" value="3" hint="All platforms synced" icon={I.layers({})} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 16 }} className="app-grid-2">
        <Card title="Monthly earnings" subtitle="Last 12 months (₮M)" action={<Badge tone="success" dot>+18%</Badge>}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, marginTop: 8 }}>
            {TREND.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: '100%', height: (v / 3) * 160, borderRadius: '6px 6px 3px 3px', background: i === TREND.length - 1 ? 'var(--gradient-spark)' : 'var(--blue-100)', transition: 'height .3s' }} title={'₮' + v + 'M'} />
                <span style={{ fontSize: 10.5, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="By platform" subtitle="This month">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 4 }}>
            {BREAKDOWN.map((b) => {
              const p = PF[b.k];
              return (
                <div key={b.k}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: p.color, display: 'inline-flex' }}>{p.icon({ width: 18, height: 18 })}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{p.name}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-body)' }}>₮{b.amount}M</span>
                  </div>
                  <ProgressBar value={b.pct} showValue={false} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <Card title="Recent earnings" action={<Button variant="ghost" size="sm">View all</Button>}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {RECENT.map((r, i) => {
            const p = PF[r.src];
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
                <span style={{ flex: 'none', width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'var(--surface-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>{p.icon({ width: 18, height: 18 })}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)' }}>{r.label}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{r.type} · {r.date}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 14.5, fontWeight: 600, color: 'var(--success)' }}>+{fmt(r.amt)}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ---------- Explore ---------- */
function Explore({ onApply, applied }) {
  const [tab, setTab] = React.useState('all');
  const [q, setQ] = React.useState('');
  const filtered = DEALS.filter((d) => {
    const okTab = tab === 'all' || d.platforms.includes(tab);
    const okQ = !q || (d.title + d.brand).toLowerCase().includes(q.toLowerCase());
    return okTab && okQ;
  });
  return (
    <div style={{ animation: 'ern-fade .4s var(--ease-out)' }}>
      <PageHeader eyebrow="Sponsorships" title="Explore brand deals" subtitle={`${filtered.length} opportunities available right now.`} action={<Button variant="secondary" size="sm">My applications</Button>} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }}>{I.search({ width: 18, height: 18 })}</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search campaigns and brands" style={{ width: '100%', fontFamily: 'var(--font-sans)', fontSize: 15, padding: '12px 16px 12px 42px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface)', outline: 'none', color: 'var(--text-strong)' }} />
        </div>
        <Tabs variant="pill" value={tab} onChange={setTab} tabs={[{ value: 'all', label: 'All' }, { value: 'tiktok', label: 'TikTok' }, { value: 'youtube', label: 'YouTube' }, { value: 'instagram', label: 'Instagram' }]} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="app-grid3">
        {filtered.map((d, i) => {
          const isApplied = applied.includes(d.title);
          return (
            <Card key={i} padding="lg" interactive>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
                <span style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>{d.brand[0]}</span>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>{d.brand}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 15.5, fontWeight: 600, color: 'var(--text-strong)' }}>{d.title}</div>
                </div>
                {d.tag ? <span style={{ marginLeft: 'auto' }}><Badge tone="brand">{d.tag}</Badge></span> : null}
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 16px', minHeight: 42 }}>{d.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                {d.platforms.map((k) => <span key={k} style={{ color: PF[k].color, display: 'inline-flex' }}>{PF[k].icon({ width: 17, height: 17 })}</span>)}
                <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--text-faint)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>{I.calendar({ width: 14, height: 14 })}{d.deadline}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 600, color: 'var(--text-strong)' }}>{d.budget}</span>
                {isApplied
                  ? <Badge tone="success" dot>Applied</Badge>
                  : <Button variant="primary" size="sm" onClick={() => onApply(d.title)}>Apply now</Button>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Wallet ---------- */
function Wallet({ onPayout }) {
  const [amount, setAmount] = React.useState('');
  const [bank, setBank] = React.useState('Khan Bank ••4821');
  const [sent, setSent] = React.useState(false);
  return (
    <div style={{ animation: 'ern-fade .4s var(--ease-out)' }}>
      <PageHeader eyebrow="Wallet" title="Your balance & payouts" subtitle="Withdraw earnings to a Mongolian bank account in MNT." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 22 }} className="app-grid4">
        <StatCard label="Available to withdraw" value="₮2.1M" hint="Ready now" icon={I.wallet({})} />
        <StatCard label="Pending payouts" value="₮1.0M" hint="Processing transfers" />
        <StatCard label="Total earned" value="₮12.4M" hint="All time" />
        <StatCard label="Fees paid" value="₮2.48M" hint="20% on sponsorships" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }} className="app-grid-2">
        <Card title="Request payout" subtitle="Minimum ₮50,000">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 4 }}>
            <Input label="Amount (MNT)" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
            <Select label="Bank account" value={bank} onChange={(e) => setBank(e.target.value)} options={['Khan Bank ••4821', 'Golomt Bank ••0192', 'XacBank ••7733']} />
            {sent ? <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--success)', fontWeight: 600 }}>{I.trend({ width: 16, height: 16 })}Payout requested — processing to {bank}.</div> : null}
            <Button variant="primary" onClick={() => { setSent(true); onPayout(); }}>Request payout</Button>
          </div>
        </Card>
        <Card title="Bank accounts" action={<Button variant="ghost" size="sm">Add</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            {[['Khan Bank', '••4821', true], ['Golomt Bank', '••0192', false], ['XacBank', '••7733', false]].map(([n, num, def], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
                <span style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>{I.wallet({ width: 17, height: 17 })}</span>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{n}</div><div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{num}</div></div>
                {def ? <span style={{ marginLeft: 'auto' }}><Badge tone="brand">Default</Badge></span> : <button style={{ marginLeft: 'auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-link)', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-sans)' }}>Set default</button>}
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="Transaction history">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                {['Date', 'Type', 'Description', 'Status', 'Amount'].map((h, i) => <th key={h} style={{ padding: '6px 10px 12px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: i === 4 ? 'right' : 'left' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {TX.map((t, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '13px 10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{t.date}</td>
                  <td style={{ padding: '13px 10px', color: 'var(--text-body)', fontWeight: 600 }}>{t.type}</td>
                  <td style={{ padding: '13px 10px', color: 'var(--text-muted)' }}>{t.label}</td>
                  <td style={{ padding: '13px 10px' }}><Badge tone={t.status === 'pending' ? 'warning' : 'success'} dot>{t.status === 'pending' ? 'Pending' : 'Completed'}</Badge></td>
                  <td style={{ padding: '13px 10px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: t.credit ? 'var(--success)' : 'var(--text-strong)' }}>{t.credit ? '+' : '−'}{fmt(t.amt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Platforms ---------- */
function Platforms({ fireToast }) {
  const [syncing, setSyncing] = React.useState(null);
  return (
    <div style={{ animation: 'ern-fade .4s var(--ease-out)' }}>
      <PageHeader eyebrow="Connections" title="Your platforms" subtitle="Sync TikTok, YouTube and Instagram to pull earnings and audience data automatically." action={<Button variant="secondary" size="sm" leftIcon={I.plus({})}>Connect new</Button>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 22 }} className="app-grid3">
        {PLATFORMS.map((pl) => {
          const p = PF[pl.k];
          const busy = syncing === pl.k;
          return (
            <Card key={pl.k} padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'var(--surface-muted)', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>{p.icon({ width: 24, height: 24 })}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-strong)' }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{pl.handle}</div>
                </div>
                <Badge tone="success" dot>Synced</Badge>
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <div style={{ flex: 1, padding: '11px 13px', borderRadius: 'var(--radius-md)', background: 'var(--surface-muted)' }}>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>Followers</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 600, color: 'var(--text-strong)', marginTop: 2 }}>{pl.followers}</div>
                </div>
                <div style={{ flex: 1, padding: '11px 13px', borderRadius: 'var(--radius-md)', background: 'var(--surface-muted)' }}>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>This month</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 600, color: 'var(--text-strong)', marginTop: 2 }}>₮{pl.month}M</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>{pl.growth} growth</span>
                <Button variant="ghost" size="sm" leftIcon={I.refresh({ style: busy ? { animation: 'ern-spin 1s linear infinite' } : null })} onClick={() => { setSyncing(pl.k); setTimeout(() => { setSyncing(null); fireToast(p.name + ' synced'); }, 1100); }}>{busy ? 'Syncing…' : 'Sync now'}</Button>
              </div>
            </Card>
          );
        })}
      </div>
      <Card title="Audience by platform" subtitle="Share of total reach">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 4 }}>
          {[['tiktok', 54], ['instagram', 29], ['youtube', 17]].map(([k, pct]) => {
            const p = PF[k];
            return (
              <div key={k}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: p.color, display: 'inline-flex' }}>{p.icon({ width: 18, height: 18 })}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{p.name}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-body)' }}>{pct}%</span>
                </div>
                <ProgressBar value={pct} showValue={false} />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ---------- Settings ---------- */
function SettingsRow({ icon, title, desc, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 0' }}>
      <span style={{ flex: 'none', width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'var(--surface-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-body)' }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)' }}>{title}</div>
        {desc ? <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{desc}</div> : null}
      </div>
      {children}
    </div>
  );
}
function Settings({ onLogout }) {
  const [notif, setNotif] = React.useState({ deals: true, payouts: true, weekly: false });
  const section = { fontSize: 12.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 12px' };
  return (
    <div style={{ animation: 'ern-fade .4s var(--ease-out)' }}>
      <PageHeader eyebrow="Settings" title="Account settings" subtitle="Manage your profile, notifications and security." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }} className="app-grid-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={section}>Profile</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <Avatar name="Bold Erdene" size="lg" ring />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>Bold-Erdene</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>@bolderdene · Creator</div>
              </div>
              <Button variant="secondary" size="sm">Change photo</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Input label="Display name" defaultValue="Bold-Erdene" />
              <Input label="Email" type="email" defaultValue="bold@earnio.mn" />
              <Select label="Language" options={['English', 'Монгол']} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="primary" size="sm">Save changes</Button></div>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={section}>Notifications</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[['deals', I.layers, 'New brand deals', 'When a campaign matches your niche'], ['payouts', I.wallet, 'Payout updates', 'Status of your withdrawals'], ['weekly', I.calendar, 'Weekly summary', 'Earnings recap every Monday']].map(([key, ic, t, d], i) => (
                <div key={key} style={{ borderTop: i ? '1px solid var(--border)' : 'none' }}>
                  <SettingsRow icon={ic({ width: 18, height: 18 })} title={t} desc={d}>
                    <Switch checked={notif[key]} onChange={() => setNotif((n) => ({ ...n, [key]: !n[key] }))} />
                  </SettingsRow>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div style={section}>Security</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SettingsRow icon={I.shield({ width: 18, height: 18 })} title="Two-factor authentication" desc="Add an extra layer of security"><Badge tone="success" dot>On</Badge></SettingsRow>
              <div style={{ borderTop: '1px solid var(--border)' }}>
                <SettingsRow icon={I.eye({ width: 18, height: 18 })} title="Password" desc="Last changed 2 months ago"><Button variant="ghost" size="sm">Update</Button></SettingsRow>
              </div>
              <div style={{ borderTop: '1px solid var(--border)' }}>
                <SettingsRow icon={I.card({ width: 18, height: 18 })} title="Payout method" desc="Khan Bank ··4821"><Button variant="ghost" size="sm">Manage</Button></SettingsRow>
              </div>
            </div>
            <button onClick={onLogout} style={{ width: '100%', marginTop: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--danger)', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>{I.logout({ width: 18, height: 18 })}Log out</button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- root ---------- */
function EarnioApp() {
  const [page, setPage] = React.useState('dashboard');
  const [applied, setApplied] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    const s = document.createElement('style');
    s.textContent = '@keyframes ern-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes ern-toast{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}@keyframes ern-spin{to{transform:rotate(360deg)}}@media(max-width:1000px){.app-sidebar{display:none!important}.app-grid4{grid-template-columns:repeat(2,1fr)!important}.app-grid-2,.app-grid3{grid-template-columns:1fr!important}}';
    document.head.appendChild(s);
  }, []);
  const fireToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };
  const titles = { dashboard: 'Dashboard', explore: 'Explore', wallet: 'Wallet', platforms: 'Platforms', settings: 'Settings' };
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, var(--bg-page) 0%, var(--surface) 60%)' }}>
        <Topbar title={titles[page]} toast={toast} />
        <main style={{ padding: '26px 28px 60px', maxWidth: 1180, width: '100%', margin: '0 auto' }}>
          {page === 'dashboard' && <Dashboard go={setPage} />}
          {page === 'explore' && <Explore applied={applied} onApply={(t) => { setApplied((a) => [...a, t]); fireToast('Application sent to ' + t.split(' ')[0] + '!'); }} />}
          {page === 'wallet' && <Wallet onPayout={() => fireToast('Payout requested!')} />}
          {page === 'platforms' && <Platforms fireToast={fireToast} />}
          {page === 'settings' && <Settings onLogout={() => fireToast('Logged out')} />}
        </main>
      </div>
    </div>
  );
}
window.EarnioApp = EarnioApp;
