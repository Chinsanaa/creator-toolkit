const { useState } = React;

const G = {
  brand:'linear-gradient(135deg,#4D74FF 0%,#2E5BFF 50%,#1736B8 100%)',
  blue:'#2E5BFF', ink900:'#0B1220', ink700:'#2A3D5C', ink500:'#5B7498',
  ink200:'#CDD6E8', ink100:'#E8EDF6', ink50:'#F4F7FC',
  success:'#10B981', danger:'#F0455A',
};

const SLIDES = [
  {title:'All your earnings, one place.',sub:'Connect TikTok, YouTube, and Instagram to see your full income at a glance.',bg:'linear-gradient(160deg,#1736B8,#2E5BFF)'},
  {title:'Request payouts instantly.',sub:'Transfer to your Mongolian bank account. Funds arrive in 1–3 business days.',bg:'linear-gradient(160deg,#2E5BFF,#12C2F3)'},
  {title:'Built for Mongolian creators.',sub:'Earnio is designed for Gen-Z creators earning in ₮ across all major platforms.',bg:'linear-gradient(135deg,#4D74FF,#2E5BFF,#1736B8)'},
];

function Onboarding({onDone}) {
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  return (
    <div style={{flex:1,background:s.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',padding:'0 28px 36px',transition:'background 400ms'}}>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
        <div style={{textAlign:'center'}}>
          <div style={{width:'80px',height:'80px',borderRadius:'24px',background:'rgba(255,255,255,.15)',margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="40" height="40" viewBox="0 0 96 96" fill="none">
              <polyline points="16,72 38,44 60,26 82,44" stroke="rgba(255,255,255,.9)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="72" r="5" fill="rgba(255,255,255,.9)"/>
            </svg>
          </div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'26px',fontWeight:700,color:'#fff',lineHeight:1.15,maxWidth:'280px',margin:'0 auto 12px'}}>{s.title}</h2>
          <p style={{fontSize:'15px',color:'rgba(255,255,255,.75)',lineHeight:1.6,maxWidth:'260px',margin:'0 auto'}}>{s.sub}</p>
        </div>
      </div>
      <div style={{display:'flex',gap:'6px',marginBottom:'24px'}}>
        {SLIDES.map((_,i)=>(
          <div key={i} style={{height:'6px',borderRadius:'3px',background:i===slide?'#fff':'rgba(255,255,255,.35)',transition:'width 220ms',width:i===slide?'20px':'6px'}}/>
        ))}
      </div>
      <button onClick={()=>slide<SLIDES.length-1?setSlide(slide+1):onDone()}
        style={{width:'100%',padding:'16px',borderRadius:'999px',border:'none',background:'rgba(255,255,255,.2)',color:'#fff',fontFamily:'var(--font-body)',fontSize:'16px',fontWeight:700,cursor:'pointer',backdropFilter:'blur(8px)'}}>
        {slide<SLIDES.length-1?'Next':'Get started'}
      </button>
    </div>
  );
}

function Auth({onDone}) {
  const [mode, setMode] = useState('signup');
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  if (done) return (
    <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'28px',background:'#fff'}}>
      <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'#D1FAE5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',marginBottom:'16px'}}>✓</div>
      <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:700,marginBottom:'8px'}}>You're in.</div>
      <div style={{fontSize:'14px',color:G.ink500,marginBottom:'28px',textAlign:'center'}}>Your Earnio account is ready.</div>
      <button onClick={onDone} style={{width:'100%',padding:'16px',borderRadius:'999px',border:'none',background:G.brand,color:'#fff',fontWeight:700,fontSize:'16px',cursor:'pointer'}}>Go to app</button>
    </div>
  );
  return (
    <div style={{flex:1,background:'#fff',padding:'28px',display:'flex',flexDirection:'column',overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'32px'}}>
        <svg width="22" height="22" viewBox="0 0 96 96" fill="none">
          <defs><linearGradient id="al" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4D74FF"/><stop offset="100%" stopColor="#1736B8"/>
          </linearGradient></defs>
          <polyline points="16,72 38,44 60,26 82,44" stroke="url(#al)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="16" cy="72" r="5" fill="url(#al)"/>
        </svg>
        <span style={{fontFamily:'var(--font-display)',fontSize:'17px',fontWeight:700,background:G.brand,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Earnio</span>
      </div>
      <div style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:700,marginBottom:'4px'}}>{mode==='signup'?'Create account':'Welcome back'}</div>
      <div style={{color:G.ink500,fontSize:'14px',marginBottom:'24px'}}>{mode==='signup'?'Join Mongolian creators on Earnio':'Sign in to continue'}</div>
      <div style={{display:'flex',flexDirection:'column',gap:'12px',flex:1}}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email"
          style={{width:'100%',minHeight:'48px',padding:'12px 16px',fontFamily:'var(--font-body)',fontSize:'15px',border:`1.5px solid ${G.ink200}`,borderRadius:'12px',outline:'none',boxSizing:'border-box'}}/>
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password"
          style={{width:'100%',minHeight:'48px',padding:'12px 16px',fontFamily:'var(--font-body)',fontSize:'15px',border:`1.5px solid ${G.ink200}`,borderRadius:'12px',outline:'none',boxSizing:'border-box'}}/>
        <button onClick={()=>setDone(true)}
          style={{width:'100%',padding:'15px',borderRadius:'999px',border:'none',background:G.brand,color:'#fff',fontWeight:700,fontSize:'16px',cursor:'pointer',marginTop:'8px'}}>
          {mode==='signup'?'Create account':'Sign in'}
        </button>
        <div style={{textAlign:'center',fontSize:'14px',color:G.ink500}}>
          {mode==='signup'
            ? <><span>Have an account? </span><button onClick={()=>setMode('login')} style={{border:'none',background:'none',color:G.blue,fontWeight:600,cursor:'pointer'}}>Sign in</button></>
            : <><span>No account? </span><button onClick={()=>setMode('signup')} style={{border:'none',background:'none',color:G.blue,fontWeight:600,cursor:'pointer'}}>Sign up</button></>}
        </div>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div style={{flex:1,overflowY:'auto',background:G.ink50,padding:'16px'}}>
      <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:700,marginBottom:'2px'}}>Сайн уу, Болд</div>
      <div style={{fontSize:'13px',color:G.ink500,marginBottom:'20px'}}>June 2025</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'16px'}}>
        {[{l:'Total earnings',v:'₮ 4,820,000',d:'+12.4%',up:true},{l:'Available',v:'₮ 312,500',d:null}].map(s=>(
          <div key={s.l} style={{background:'#fff',borderRadius:'12px',padding:'14px',border:`1.5px solid ${G.ink200}`}}>
            <div style={{fontSize:'11px',color:G.ink500,marginBottom:'4px'}}>{s.l}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:'15px',fontWeight:600,fontFeatureSettings:"'tnum' 1"}}>{s.v}</div>
            {s.d && <div style={{fontSize:'11px',color:s.up?G.success:G.danger,fontWeight:600,marginTop:'2px'}}>{s.up?'↑':'↓'} {s.d}</div>}
          </div>
        ))}
      </div>
      <div style={{background:'#fff',borderRadius:'12px',padding:'14px',border:`1.5px solid ${G.ink200}`,marginBottom:'14px'}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:700,marginBottom:'10px'}}>Platform sync</div>
        {['TikTok','YouTube','Instagram'].map((p,i)=>(
          <div key={p} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:i<2?`1px solid ${G.ink50}`:'none'}}>
            <span style={{fontSize:'13px',fontWeight:600}}>{p}</span>
            <span style={{padding:'3px 8px',borderRadius:'999px',background:'#D1FAE5',color:'#059669',fontSize:'11px',fontWeight:600}}>Synced</span>
          </div>
        ))}
      </div>
      <div style={{background:'#fff',borderRadius:'12px',padding:'14px',border:`1.5px solid ${G.ink200}`}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:700,marginBottom:'10px'}}>Recent sponsorships</div>
        {['Голомт Банк','MCS Coca-Cola'].map((b,i)=>(
          <div key={b} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:i===0?`1px solid ${G.ink50}`:'none'}}>
            <span style={{fontSize:'13px'}}>{b}</span>
            <span style={{fontSize:'12px',color:G.blue,fontWeight:600}}>View</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExploreScreen() {
  const [applied, setApplied] = useState({});
  const items = [
    {brand:'Голомт',title:'Gen-Z finance campaign',budget:'₮ 500,000'},
    {brand:'MCS',title:'Summer challenge',budget:'₮ 320,000'},
    {brand:'Nomin',title:'Back to school',budget:'₮ 250,000'},
  ];
  return (
    <div style={{flex:1,overflowY:'auto',background:G.ink50,padding:'16px'}}>
      <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,marginBottom:'12px'}}>Explore</div>
      <div style={{padding:'10px 14px',borderRadius:'999px',background:'#fff',border:`1.5px solid ${G.ink200}`,fontSize:'14px',color:G.ink500,marginBottom:'14px'}}>Search sponsorships…</div>
      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        {items.map(s=>(
          <div key={s.brand} style={{background:'#fff',borderRadius:'12px',padding:'14px',border:`1.5px solid ${G.ink200}`}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,marginBottom:'4px'}}>{s.title}</div>
            <div style={{fontSize:'12px',color:G.ink500,marginBottom:'10px'}}>{s.brand}</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontFamily:'var(--font-mono)',fontWeight:600,color:G.blue,fontFeatureSettings:"'tnum' 1"}}>{s.budget}</span>
              <button onClick={()=>setApplied(a=>({...a,[s.brand]:true}))}
                style={{padding:'6px 16px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontWeight:600,fontSize:'12px',
                  background:applied[s.brand]?G.ink100:G.brand,color:applied[s.brand]?G.ink500:'#fff'}}>
                {applied[s.brand]?'Applied':'Apply'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletScreen() {
  const [amount, setAmount] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div style={{flex:1,overflowY:'auto',background:G.ink50,padding:'16px'}}>
      <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,marginBottom:'14px'}}>Wallet</div>
      <div style={{background:G.brand,borderRadius:'16px',padding:'22px',marginBottom:'14px',color:'#fff'}}>
        <div style={{fontSize:'12px',opacity:0.8,marginBottom:'4px'}}>Available to withdraw</div>
        <div style={{fontFamily:'var(--font-mono)',fontSize:'28px',fontWeight:600,fontFeatureSettings:"'tnum' 1"}}>₮ 312,500</div>
      </div>
      {!sent ? (
        <div style={{background:'#fff',borderRadius:'12px',padding:'16px',border:`1.5px solid ${G.ink200}`,marginBottom:'14px'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:700,marginBottom:'12px'}}>Request payout</div>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="₮ Amount"
            style={{width:'100%',minHeight:'44px',padding:'10px 14px',fontFamily:'var(--font-mono)',fontSize:'15px',border:`1.5px solid ${G.ink200}`,borderRadius:'10px',outline:'none',boxSizing:'border-box',marginBottom:'10px'}}/>
          <button onClick={()=>amount&&setSent(true)}
            style={{width:'100%',padding:'12px',borderRadius:'999px',border:'none',background:G.brand,color:'#fff',fontWeight:700,cursor:'pointer',fontSize:'14px'}}>
            Send to Khan Bank
          </button>
        </div>
      ) : (
        <div style={{background:'#D1FAE5',borderRadius:'12px',padding:'20px',textAlign:'center',marginBottom:'14px'}}>
          <div style={{fontSize:'24px',marginBottom:'6px'}}>✓</div>
          <div style={{fontWeight:700,color:'#065F46',marginBottom:'4px'}}>Payout sent</div>
          <button onClick={()=>{setSent(false);setAmount('');}}
            style={{marginTop:'8px',padding:'6px 16px',borderRadius:'999px',border:'none',background:'rgba(0,0,0,.06)',cursor:'pointer',fontSize:'12px',fontWeight:600}}>Done</button>
        </div>
      )}
      <div style={{background:'#fff',borderRadius:'12px',padding:'14px',border:`1.5px solid ${G.ink200}`}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:700,marginBottom:'10px'}}>Recent</div>
        {[
          {d:'Jun 10',desc:'YouTube revenue',amt:'+₮ 82,400',pos:true},
          {d:'Jun 8',desc:'Withdrawal',amt:'-₮ 200,000',pos:false},
          {d:'Jun 5',desc:'TikTok fund',amt:'+₮ 44,100',pos:true},
        ].map((t,i,arr)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<arr.length-1?`1px solid ${G.ink50}`:'none'}}>
            <div>
              <div style={{fontSize:'13px',fontWeight:600}}>{t.desc}</div>
              <div style={{fontSize:'11px',color:G.ink500}}>{t.d}</div>
            </div>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'13px',fontWeight:600,color:t.pos?G.success:G.danger,fontFeatureSettings:"'tnum' 1"}}>{t.amt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div style={{flex:1,overflowY:'auto',background:G.ink50,padding:'16px'}}>
      <div style={{textAlign:'center',padding:'20px 0 16px'}}>
        <div style={{width:'64px',height:'64px',borderRadius:'50%',background:G.brand,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'22px',margin:'0 auto 12px'}}>БД</div>
        <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700}}>Болд Дамдинсүрэн</div>
        <div style={{fontSize:'13px',color:G.ink500}}>bold@earnio.mn</div>
      </div>
      <div style={{background:'#fff',borderRadius:'12px',border:`1.5px solid ${G.ink200}`,overflow:'hidden',marginBottom:'12px'}}>
        {['Account settings','Connected platforms','Notifications','Privacy & security'].map((item,i,arr)=>(
          <div key={item} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',borderBottom:i<arr.length-1?`1px solid ${G.ink50}`:'none',cursor:'pointer'}}>
            <span style={{fontSize:'14px',fontWeight:600}}>{item}</span>
            <span style={{color:G.ink200,fontSize:'18px'}}>›</span>
          </div>
        ))}
      </div>
      <button style={{width:'100%',padding:'14px',borderRadius:'999px',border:`1.5px solid ${G.ink200}`,background:'#fff',color:G.danger,fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:700,cursor:'pointer'}}>
        Log out
      </button>
    </div>
  );
}

function MainApp() {
  const [tab, setTab] = useState('home');
  const screens = {home:<HomeScreen/>, explore:<ExploreScreen/>, wallet:<WalletScreen/>, profile:<ProfileScreen/>};
  const tabs = [{id:'home',label:'Home'},{id:'explore',label:'Explore'},{id:'wallet',label:'Wallet'},{id:'profile',label:'Profile'}];
  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',background:G.ink50,overflow:'hidden'}}>
      <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>{screens[tab]}</div>
      <div style={{display:'flex',background:'rgba(255,255,255,0.95)',backdropFilter:'blur(12px)',borderTop:`1.5px solid ${G.ink200}`,padding:'8px 0 2px',flexShrink:0}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',border:'none',background:'none',cursor:'pointer',padding:'6px 0'}}>
            <div style={{width:'24px',height:'24px',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',
              background:tab===t.id?G.brand:'transparent',transition:'all 140ms'}}>
              <div style={{width:'10px',height:'10px',borderRadius:'2px',background:tab===t.id?'#fff':G.ink200}}/>
            </div>
            <span style={{fontSize:'10px',fontWeight:600,color:tab===t.id?G.blue:G.ink500}}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('onboarding');
  const screens = {
    onboarding: <Onboarding onDone={()=>setScreen('auth')}/>,
    auth: <Auth onDone={()=>setScreen('app')}/>,
    app: <MainApp/>,
  };
  return (
    <IosFrame>
      {screens[screen]}
    </IosFrame>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',minHeight:'100vh',padding:'40px'}}>
    <App/>
  </div>
);
