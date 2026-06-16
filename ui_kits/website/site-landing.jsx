const { useState, useEffect } = React;

const G = {
  brand: 'linear-gradient(135deg,#4D74FF 0%,#2E5BFF 50%,#1736B8 100%)',
  spark: 'linear-gradient(115deg,#2E5BFF 0%,#12C2F3 100%)',
  ink:   'linear-gradient(160deg,#0B1220 0%,#1A2840 100%)',
  blue:  '#2E5BFF',
  ink900:'#0B1220',
  ink700:'#2A3D5C',
  ink500:'#5B7498',
  ink200:'#CDD6E8',
  ink100:'#E8EDF6',
  ink50: '#F4F7FC',
  success:'#10B981',
  danger: '#F0455A',
};

function Mark({size=28}) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <defs>
        <linearGradient id="mg" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4D74FF"/>
          <stop offset="50%" stopColor="#2E5BFF"/>
          <stop offset="100%" stopColor="#1736B8"/>
        </linearGradient>
      </defs>
      <polyline points="16,72 38,44 60,26 82,44" stroke="url(#mg)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="72" r="5" fill="url(#mg)"/>
    </svg>
  );
}

function Modal({mode, onClose}) {
  const [m, setM] = useState(mode);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div style={{position:'fixed',inset:0,zIndex:200,background:'rgba(11,18,40,.5)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#fff',borderRadius:'20px',padding:'40px',width:'100%',maxWidth:'420px',boxShadow:'0 16px 48px rgba(11,18,40,.18)'}}>
        {done ? (
          <div style={{textAlign:'center',padding:'24px 0'}}>
            <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'#D1FAE5',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'24px'}}>✓</div>
            <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:700,marginBottom:'8px'}}>You're in.</div>
            <div style={{color:G.ink500,marginBottom:'24px'}}>Check your email to continue.</div>
            <button onClick={onClose} style={{padding:'10px 24px',borderRadius:'999px',border:'none',background:G.brand,color:'#fff',fontWeight:600,cursor:'pointer'}}>Close</button>
          </div>
        ) : (
          <>
            <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:700,marginBottom:'4px'}}>{m==='login'?'Welcome back':'Create account'}</div>
            <div style={{color:G.ink500,fontSize:'14px',marginBottom:'24px'}}>{m==='login'?'Sign in to your Earnio account':'Join thousands of Mongolian creators'}</div>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email"
                style={{width:'100%',minHeight:'44px',padding:'10px 14px',fontFamily:'var(--font-body)',fontSize:'15px',border:`1.5px solid ${G.ink200}`,borderRadius:'12px',outline:'none',boxSizing:'border-box'}}/>
              <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password"
                style={{width:'100%',minHeight:'44px',padding:'10px 14px',fontFamily:'var(--font-body)',fontSize:'15px',border:`1.5px solid ${G.ink200}`,borderRadius:'12px',outline:'none',boxSizing:'border-box'}}/>
              <button onClick={()=>setDone(true)}
                style={{padding:'12px',borderRadius:'999px',border:'none',background:G.brand,color:'#fff',fontWeight:700,fontSize:'15px',cursor:'pointer'}}>
                {m==='login'?'Sign in':'Create account'}
              </button>
            </div>
            <div style={{textAlign:'center',marginTop:'16px',fontSize:'14px',color:G.ink500}}>
              {m==='login'
                ? <><span>No account? </span><button onClick={()=>setM('signup')} style={{border:'none',background:'none',color:G.blue,fontWeight:600,cursor:'pointer'}}>Sign up</button></>
                : <><span>Have an account? </span><button onClick={()=>setM('login')} style={{border:'none',background:'none',color:G.blue,fontWeight:600,cursor:'pointer'}}>Sign in</button></>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Nav({audience, setAudience}) {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <>
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        background:scrolled?'rgba(255,255,255,0.88)':'transparent',
        backdropFilter:scrolled?'blur(16px)':'none',
        borderBottom:scrolled?`1px solid ${G.ink200}`:'none',
        transition:'all 220ms',height:'60px',
        display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{maxWidth:'1100px',width:'100%',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <Mark size={26}/>
            <span style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,letterSpacing:'-0.02em',background:G.brand,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Earnio</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'4px',background:G.ink100,borderRadius:'999px',padding:'3px'}}>
            {['Creators','Brands'].map(a=>(
              <button key={a} onClick={()=>setAudience(a)}
                style={{padding:'6px 16px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,transition:'all 140ms',
                  background:audience===a?'#fff':'transparent',color:audience===a?G.blue:G.ink500,
                  boxShadow:audience===a?'0 1px 3px rgba(11,18,40,.08)':'none'}}>{a}</button>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <button onClick={()=>setModal('login')}
              style={{padding:'8px 16px',borderRadius:'999px',border:'none',background:'transparent',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:G.ink700}}>Sign in</button>
            <button onClick={()=>setModal('signup')}
              style={{padding:'8px 18px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#fff',background:G.brand,boxShadow:'0 4px 16px rgba(46,91,255,.32)'}}>Get started</button>
          </div>
        </div>
      </nav>
      {modal && <Modal mode={modal} onClose={()=>setModal(null)}/>}
    </>
  );
}

function HeroCard() {
  const bars = [40,65,52,78,60,88,72];
  return (
    <div style={{position:'relative'}}>
      <div style={{background:'#fff',borderRadius:'20px',padding:'24px',boxShadow:'0 16px 48px rgba(11,18,40,.12)',border:`1.5px solid ${G.ink200}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px'}}>
          <div>
            <div style={{fontSize:'13px',color:G.ink500,marginBottom:'2px'}}>Total earnings</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:'28px',fontWeight:600,fontFeatureSettings:"'tnum' 1"}}>₮ 4,820,000</div>
          </div>
          <span style={{padding:'4px 10px',borderRadius:'999px',background:'#D1FAE5',color:'#059669',fontSize:'13px',fontWeight:600}}>↑ 12.4%</span>
        </div>
        <div style={{display:'flex',gap:'6px',alignItems:'flex-end',height:'80px',marginBottom:'16px'}}>
          {bars.map((h,i)=>(
            <div key={i} style={{flex:1,borderRadius:'4px 4px 0 0',height:`${h}%`,
              background:i===bars.length-1?G.brand:`rgba(46,91,255,${0.12+i*0.06})`}}/>
          ))}
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          {['TikTok','YouTube','Instagram'].map((p,i)=>(
            <div key={p} style={{flex:1,background:G.ink50,borderRadius:'8px',padding:'8px',textAlign:'center'}}>
              <div style={{fontSize:'11px',color:G.ink500,marginBottom:'2px'}}>{p}</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'13px',fontWeight:600,fontFeatureSettings:"'tnum' 1"}}>
                {['₮ 1.8M','₮ 2.2M','₮ 820K'][i]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:'absolute',top:'-16px',right:'-16px',background:'#fff',borderRadius:'12px',padding:'10px 14px',
        boxShadow:'0 8px 24px rgba(11,18,40,.12)',border:`1.5px solid ${G.ink200}`,fontSize:'13px',fontWeight:600,color:G.ink700,whiteSpace:'nowrap'}}>
        <span style={{color:G.success}}>↑</span> Payout ready
      </div>
    </div>
  );
}

function Hero({audience}) {
  const isCreator = audience === 'Creators';
  return (
    <section style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'100px 24px 60px',
      background:`radial-gradient(ellipse at 20% 20%,rgba(78,116,255,.18) 0%,transparent 60%), radial-gradient(ellipse at 80% 70%,rgba(18,194,243,.12) 0%,transparent 55%), ${G.ink50}`}}>
      <div style={{maxWidth:'1100px',width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'center'}}>
        <div>
          <div style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'6px 14px',borderRadius:'999px',background:'rgba(46,91,255,.08)',color:G.blue,fontSize:'13px',fontWeight:600,marginBottom:'20px'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:G.blue}}/>
            {isCreator ? 'For content creators' : 'For brands & agencies'}
          </div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(36px,5vw,56px)',fontWeight:700,letterSpacing:'-0.035em',lineHeight:1.05,color:G.ink900,marginBottom:'20px'}}>
            {isCreator ? <><span>Earn more</span><br/><span>from every post.</span></> : <><span>Find creators</span><br/><span>that convert.</span></>}
          </h1>
          <p style={{fontSize:'18px',color:G.ink700,lineHeight:1.65,marginBottom:'32px',maxWidth:'440px'}}>
            {isCreator
              ? 'Connect TikTok, YouTube, and Instagram. See your total earnings in one place. Get paid fast.'
              : 'Discover Mongolian Gen-Z creators across TikTok, YouTube, and Instagram. Run campaigns that perform.'}
          </p>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            <button style={{padding:'14px 32px',borderRadius:'999px',border:'none',background:G.brand,color:'#fff',fontWeight:700,fontSize:'16px',cursor:'pointer',boxShadow:'0 4px 16px rgba(46,91,255,.32)'}}>
              {isCreator ? 'Connect platforms' : 'View creators'}
            </button>
            <button style={{padding:'14px 24px',borderRadius:'999px',border:`1.5px solid ${G.ink200}`,background:'#fff',color:G.ink700,fontWeight:600,fontSize:'16px',cursor:'pointer'}}>
              Learn more
            </button>
          </div>
        </div>
        <HeroCard/>
      </div>
    </section>
  );
}

const STEPS = [
  {num:1,icon:'🔗',title:'Connect platforms',desc:'Link your TikTok, YouTube, and Instagram accounts securely with one click.'},
  {num:2,icon:'📊',title:'See your earnings',desc:'All your revenue streams in one clean dashboard. No more switching tabs.'},
  {num:3,icon:'💸',title:'Request a payout',desc:'Transfer to your Mongolian bank account. Funds arrive in 1–3 business days.'},
  {num:4,icon:'📈',title:'Grow with data',desc:'Track what content earns most and plan your next moves with confidence.'},
];

function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <section style={{padding:'80px 24px',background:'#fff'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'36px',fontWeight:700,letterSpacing:'-0.025em',marginBottom:'12px'}}>How it works</h2>
          <p style={{color:G.ink500,fontSize:'18px'}}>Four steps from signup to payout.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px'}}>
          {STEPS.map((s,i)=>(
            <div key={s.num} onClick={()=>setActive(i)}
              style={{cursor:'pointer',padding:'24px',borderRadius:'16px',border:`1.5px solid ${active===i?G.blue:G.ink200}`,background:active===i?'#EEF3FF':'#fff',transition:'all 220ms'}}>
              <div style={{fontSize:'24px',marginBottom:'12px'}}>{s.icon}</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'15px',marginBottom:'6px',color:active===i?G.blue:G.ink900}}>
                <span style={{color:G.ink500,fontWeight:500,fontSize:'13px',display:'block',marginBottom:'2px'}}>Step {s.num}</span>
                {s.title}
              </div>
              <p style={{fontSize:'13px',color:G.ink500,lineHeight:1.5}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {icon:'⚡',title:'Real-time sync',desc:'Your earnings update automatically every few hours across all connected platforms.'},
  {icon:'🔒',title:'Secure by default',desc:'Read-only platform access. We never post or modify your content.'},
  {icon:'🏦',title:'Mongolian banks',desc:'Payouts to Khan Bank, Golomt, TDB, and more. In tugrug, always.'},
  {icon:'📱',title:'Mobile ready',desc:'Check your stats and request payouts from your phone, anytime.'},
];

function Features() {
  return (
    <section style={{padding:'80px 24px',background:G.ink50}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'36px',fontWeight:700,letterSpacing:'-0.025em',marginBottom:'12px'}}>Built for creators here</h2>
          <p style={{color:G.ink500,fontSize:'18px'}}>Everything you need, nothing you don't.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px'}}>
          {FEATURES.map(f=>(
            <div key={f.title} style={{background:'#fff',borderRadius:'16px',padding:'28px',border:`1.5px solid ${G.ink200}`}}>
              <div style={{fontSize:'24px',marginBottom:'12px'}}>{f.icon}</div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'17px',fontWeight:700,marginBottom:'8px'}}>{f.title}</div>
              <p style={{fontSize:'14px',color:G.ink500,lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {name:'Болд Д.',platform:'TikTok · 210K',quote:'Earnio showed me I was earning 40% more than I thought. The dashboard is so clean.'},
  {name:'Сарнай О.',platform:'YouTube · 85K',quote:'Getting paid used to take weeks. Now I request a payout on Friday and it hits Monday.'},
  {name:'Тэмүүлэн Б.',platform:'Instagram · 130K',quote:'I connected all three platforms in under five minutes. Finally, one number for everything.'},
];

function Testimonials() {
  return (
    <section style={{padding:'80px 24px',background:'#fff'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'36px',fontWeight:700,letterSpacing:'-0.025em',marginBottom:'12px'}}>Creators love it</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
          {TESTIMONIALS.map(t=>(
            <div key={t.name} style={{background:G.ink50,borderRadius:'16px',padding:'24px',border:`1.5px solid ${G.ink200}`}}>
              <p style={{fontSize:'15px',color:G.ink700,lineHeight:1.6,marginBottom:'20px'}}>"{t.quote}"</p>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'50%',background:G.brand,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'13px'}}>{t.name[0]}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:'14px'}}>{t.name}</div>
                  <div style={{fontSize:'12px',color:G.ink500}}>{t.platform}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  {q:'Which platforms does Earnio support?',a:'TikTok, YouTube, and Instagram are fully supported. More platforms are coming soon.'},
  {q:'How long do payouts take?',a:'1–3 business days to Mongolian bank accounts. Khan Bank, Golomt, TDB, and others are supported.'},
  {q:'Is my account data safe?',a:'We use read-only access tokens. We never post, comment, or modify anything on your accounts.'},
  {q:'How much does Earnio cost?',a:'Free to start. We take a small percentage only when you earn — no monthly fees.'},
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{padding:'80px 24px',background:G.ink50}}>
      <div style={{maxWidth:'640px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'36px',fontWeight:700,letterSpacing:'-0.025em'}}>Questions</h2>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {FAQ.map((f,i)=>(
            <div key={i} style={{background:'#fff',borderRadius:'16px',border:`1.5px solid ${G.ink200}`,overflow:'hidden'}}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{width:'100%',padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',border:'none',background:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'15px',fontWeight:600,color:G.ink900,textAlign:'left'}}>
                {f.q}
                <span style={{transform:open===i?'rotate(45deg)':'none',transition:'transform 220ms',color:G.blue,fontSize:'20px',flexShrink:0,marginLeft:'16px'}}>+</span>
              </button>
              {open===i && <div style={{padding:'0 24px 20px',color:G.ink700,fontSize:'15px',lineHeight:1.6}}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section style={{padding:'64px 24px',background:G.ink900}}>
      <div style={{maxWidth:'600px',margin:'0 auto',textAlign:'center'}}>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:'36px',fontWeight:700,color:'#fff',letterSpacing:'-0.025em',marginBottom:'16px'}}>Start earning smarter.</h2>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'16px',marginBottom:'32px'}}>Join creators already using Earnio to track, manage, and grow their income.</p>
        <button style={{padding:'14px 36px',borderRadius:'999px',border:'none',background:G.brand,color:'#fff',fontWeight:700,fontSize:'16px',cursor:'pointer',boxShadow:'0 0 20px rgba(46,91,255,.4)'}}>Get started free</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{padding:'36px 24px',background:G.ink900,borderTop:`1px solid rgba(255,255,255,0.06)`}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <svg width="22" height="22" viewBox="0 0 96 96" fill="none">
            <polyline points="16,72 38,44 60,26 82,44" stroke="rgba(255,255,255,0.6)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="72" r="5" fill="rgba(255,255,255,0.6)"/>
          </svg>
          <span style={{color:'rgba(255,255,255,0.8)',fontWeight:700,fontFamily:'var(--font-display)'}}>Earnio</span>
        </div>
        <div style={{display:'flex',gap:'24px'}}>
          {['About','Pricing','Privacy','Terms'].map(l=>(
            <a key={l} href="#" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none',fontSize:'14px'}}>{l}</a>
          ))}
        </div>
        <div style={{color:'rgba(255,255,255,0.3)',fontSize:'14px'}}>© 2025 Earnio</div>
      </div>
    </footer>
  );
}

function App() {
  const [audience, setAudience] = useState('Creators');
  return (
    <div>
      <Nav audience={audience} setAudience={setAudience}/>
      <Hero audience={audience}/>
      <HowItWorks/>
      <Features/>
      <Testimonials/>
      <FAQSection/>
      <CTABand/>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
