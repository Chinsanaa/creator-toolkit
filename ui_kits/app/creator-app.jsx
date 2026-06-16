const { useState } = React;

const G = {
  brand:'linear-gradient(135deg,#4D74FF 0%,#2E5BFF 50%,#1736B8 100%)',
  spark:'linear-gradient(115deg,#2E5BFF 0%,#12C2F3 100%)',
  blue:'#2E5BFF', ink900:'#0B1220', ink700:'#2A3D5C', ink500:'#5B7498',
  ink200:'#CDD6E8', ink100:'#E8EDF6', ink50:'#F4F7FC',
  success:'#10B981', danger:'#F0455A', warning:'#F5A524',
};

const NAV_ITEMS = [
  {id:'dashboard',label:'Dashboard'},
  {id:'explore',label:'Explore'},
  {id:'wallet',label:'Wallet'},
];

function Sidebar({page, setPage}) {
  return (
    <div style={{width:'220px',height:'100vh',position:'fixed',left:0,top:0,
      background:'rgba(255,255,255,0.88)',backdropFilter:'blur(16px)',
      borderRight:`1.5px solid ${G.ink200}`,display:'flex',flexDirection:'column',padding:'20px 12px',zIndex:50}}>
      <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 12px',marginBottom:'24px'}}>
        <svg width="24" height="24" viewBox="0 0 96 96" fill="none">
          <defs><linearGradient id="sg" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4D74FF"/><stop offset="100%" stopColor="#1736B8"/>
          </linearGradient></defs>
          <polyline points="16,72 38,44 60,26 82,44" stroke="url(#sg)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="16" cy="72" r="5" fill="url(#sg)"/>
        </svg>
        <span style={{fontFamily:'var(--font-display)',fontSize:'17px',fontWeight:700,letterSpacing:'-0.02em',background:G.brand,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Earnio</span>
      </div>
      <nav style={{display:'flex',flexDirection:'column',gap:'2px',flex:1}}>
        {NAV_ITEMS.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)}
            style={{display:'flex',alignItems:'center',padding:'10px 12px',borderRadius:'12px',border:'none',cursor:'pointer',
              fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,textAlign:'left',transition:'all 140ms',
              background:page===n.id?'#EEF3FF':'transparent',color:page===n.id?G.blue:G.ink700}}>
            {n.label}
          </button>
        ))}
      </nav>
      <div style={{padding:'12px',borderRadius:'12px',background:G.ink50,border:`1.5px solid ${G.ink100}`}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'50%',background:G.brand,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'12px'}}>БД</div>
          <div>
            <div style={{fontSize:'13px',fontWeight:600}}>Болд Д.</div>
            <div style={{fontSize:'11px',color:G.ink500}}>Creator</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Topbar({page}) {
  return (
    <div style={{position:'fixed',top:0,left:'220px',right:0,height:'56px',zIndex:40,
      background:'rgba(255,255,255,0.88)',backdropFilter:'blur(12px)',
      borderBottom:`1.5px solid ${G.ink200}`,display:'flex',alignItems:'center',
      justifyContent:'space-between',padding:'0 24px'}}>
      <span style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,textTransform:'capitalize'}}>{page}</span>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <div style={{padding:'8px 16px',borderRadius:'999px',background:G.ink50,border:`1.5px solid ${G.ink200}`,fontSize:'14px',color:G.ink500}}>Search…</div>
        <div style={{width:'32px',height:'32px',borderRadius:'50%',background:G.brand,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'12px'}}>БД</div>
      </div>
    </div>
  );
}

const MONTHS = ['7-р','8-р','9-р','10-р','11-р','12-р','1-р','2-р','3-р','4-р','5-р','6-р'];
const BARS = [38,52,44,65,58,72,61,78,68,85,74,92];

function Dashboard() {
  const stats = [
    {label:'Total earnings',value:'₮ 4,820,000',delta:'+12.4%',up:true},
    {label:'This month',value:'₮ 312,500',delta:'+4.2%',up:true},
    {label:'Pending',value:'₮ 95,000',delta:null},
    {label:'Connected',value:'3 platforms',delta:null},
  ];
  const platforms = [{name:'YouTube',pct:46},{name:'TikTok',pct:37},{name:'Instagram',pct:17}];
  const recent = [
    {date:'2025-06-14',platform:'YouTube',desc:'Ad revenue — June week 2',amount:'₮ 82,400'},
    {date:'2025-06-12',platform:'TikTok',desc:'Creator fund — June',amount:'₮ 44,100'},
    {date:'2025-06-10',platform:'Instagram',desc:'Reel bonus',amount:'₮ 28,500'},
    {date:'2025-06-08',platform:'YouTube',desc:'Ad revenue — June week 1',amount:'₮ 76,200'},
  ];
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px'}}>
        {stats.map(s=>(
          <div key={s.label}
            style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'20px',boxShadow:'0 1px 3px rgba(11,18,40,.06)',transition:'border-color 220ms,box-shadow 220ms',cursor:'default'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=G.blue;e.currentTarget.style.boxShadow='0 4px 16px rgba(46,91,255,.16)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=G.ink200;e.currentTarget.style.boxShadow='0 1px 3px rgba(11,18,40,.06)'}}>
            <div style={{fontSize:'12px',color:G.ink500,marginBottom:'4px'}}>{s.label}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:'22px',fontWeight:600,fontFeatureSettings:"'tnum' 1",marginBottom:'4px'}}>{s.value}</div>
            {s.delta && <div style={{fontSize:'12px',fontWeight:600,color:s.up?G.success:G.danger}}>{s.up?'↑':'↓'} {s.delta}</div>}
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'16px'}}>
        <div style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'24px'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'20px'}}>12-month earnings</div>
          <div style={{display:'flex',gap:'4px',alignItems:'flex-end',height:'120px',marginBottom:'8px'}}>
            {BARS.map((h,i)=>(
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
                <div style={{width:'100%',borderRadius:'4px 4px 0 0',height:`${h}%`,
                  background:i===BARS.length-1?G.brand:`rgba(46,91,255,${0.10+i*0.04})`}}/>
                <div style={{fontSize:'9px',color:G.ink500,whiteSpace:'nowrap'}}>{MONTHS[i]}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'24px'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'20px'}}>By platform</div>
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {platforms.map(p=>(
              <div key={p.name}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                  <span style={{fontSize:'13px',color:G.ink700}}>{p.name}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:'13px'}}>{p.pct}%</span>
                </div>
                <div style={{height:'6px',borderRadius:'999px',background:G.ink100}}>
                  <div style={{height:'100%',width:`${p.pct}%`,borderRadius:'999px',background:'linear-gradient(115deg,#2E5BFF,#12C2F3)'}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'24px'}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'16px'}}>Recent earnings</div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{borderBottom:`1.5px solid ${G.ink100}`}}>
              {['Date','Platform','Description','Amount'].map(h=>(
                <th key={h} style={{padding:'8px',textAlign:'left',fontSize:'12px',fontWeight:600,color:G.ink500,paddingBottom:'10px'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map((r,i)=>(
              <tr key={i} style={{borderBottom:`1px solid ${G.ink50}`}}>
                <td style={{padding:'12px 8px',fontSize:'13px',color:G.ink500,fontFamily:'var(--font-mono)'}}>{r.date}</td>
                <td style={{padding:'12px 8px',fontSize:'13px',fontWeight:600}}>{r.platform}</td>
                <td style={{padding:'12px 8px',fontSize:'13px',color:G.ink700}}>{r.desc}</td>
                <td style={{padding:'12px 8px',fontSize:'13px',fontWeight:600,fontFamily:'var(--font-mono)',color:G.blue,fontFeatureSettings:"'tnum' 1"}}>{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const SPONSORSHIPS = [
  {brand:'Голомт Банк',title:'Gen-Z financial literacy campaign',budget:'₮ 500,000',platforms:['TikTok','Instagram'],deadline:'2025-07-01'},
  {brand:'MCS Coca-Cola',title:'Summer refreshment challenge',budget:'₮ 320,000',platforms:['TikTok'],deadline:'2025-07-15'},
  {brand:'Nomin Holdings',title:'Back to school 2025',budget:'₮ 250,000',platforms:['Instagram','YouTube'],deadline:'2025-07-20'},
  {brand:'Монгол Шуудан',title:'Digital services awareness',budget:'₮ 180,000',platforms:['YouTube'],deadline:'2025-07-30'},
  {brand:'Sky Mall',title:'Fashion week content',budget:'₮ 400,000',platforms:['TikTok','Instagram'],deadline:'2025-08-05'},
  {brand:'APU',title:'Mongolian spirits heritage',budget:'₮ 600,000',platforms:['YouTube','TikTok'],deadline:'2025-08-10'},
];

function Explore() {
  const [filter, setFilter] = useState('All');
  const [applied, setApplied] = useState({});
  const [toast, setToast] = useState(null);
  const filters = ['All','TikTok','YouTube','Instagram'];
  const filtered = filter === 'All' ? SPONSORSHIPS : SPONSORSHIPS.filter(s=>s.platforms.includes(filter));
  function apply(brand) {
    setApplied(a=>({...a,[brand]:true}));
    setToast(`Applied to ${brand}`);
    setTimeout(()=>setToast(null), 2500);
  }
  return (
    <div>
      {toast && (
        <div style={{position:'fixed',bottom:'24px',right:'24px',background:G.ink900,color:'#fff',padding:'12px 20px',borderRadius:'999px',fontSize:'14px',fontWeight:600,zIndex:100,boxShadow:'0 8px 24px rgba(11,18,40,.2)'}}>
          {toast}
        </div>
      )}
      <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap',alignItems:'center'}}>
        <div style={{flex:1,minWidth:'200px',padding:'10px 16px',borderRadius:'999px',border:`1.5px solid ${G.ink200}`,background:'#fff',fontSize:'14px',color:G.ink500}}>Search sponsorships…</div>
        <div style={{display:'flex',background:G.ink100,borderRadius:'999px',padding:'3px',gap:'2px'}}>
          {filters.map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'6px 14px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,transition:'all 140ms',
                background:filter===f?'#fff':'transparent',color:filter===f?G.blue:G.ink500,
                boxShadow:filter===f?'0 1px 3px rgba(11,18,40,.08)':'none'}}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
        {filtered.map(s=>(
          <div key={s.brand} style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'20px',boxShadow:'0 1px 3px rgba(11,18,40,.06)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
              <div style={{width:'36px',height:'36px',borderRadius:'50%',background:G.brand,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'13px'}}>{s.brand[0]}</div>
              <div style={{fontSize:'12px',color:G.ink500}}>{s.brand}</div>
            </div>
            <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,marginBottom:'10px',lineHeight:1.3}}>{s.title}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:'16px',fontWeight:600,color:G.blue,marginBottom:'8px',fontFeatureSettings:"'tnum' 1"}}>{s.budget}</div>
            <div style={{display:'flex',gap:'4px',marginBottom:'10px',flexWrap:'wrap'}}>
              {s.platforms.map(p=>(
                <span key={p} style={{padding:'2px 8px',borderRadius:'999px',background:G.ink50,fontSize:'11px',fontWeight:600,color:G.ink700}}>{p}</span>
              ))}
            </div>
            <div style={{fontSize:'12px',color:G.ink500,marginBottom:'14px'}}>Deadline: {s.deadline}</div>
            <button onClick={()=>!applied[s.brand]&&apply(s.brand)}
              style={{width:'100%',padding:'9px',borderRadius:'999px',border:'none',cursor:applied[s.brand]?'default':'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,transition:'all 220ms',
                background:applied[s.brand]?G.ink100:G.brand,color:applied[s.brand]?G.ink500:'#fff'}}>
              {applied[s.brand]?'Applied':'Apply'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const TRANSACTIONS = [
  {date:'2025-06-10',type:'Earning',desc:'YouTube ad revenue',status:'completed',amount:'+₮ 82,400'},
  {date:'2025-06-08',type:'Payout',desc:'Khan Bank withdrawal',status:'completed',amount:'-₮ 200,000'},
  {date:'2025-06-05',type:'Earning',desc:'TikTok creator fund',status:'completed',amount:'+₮ 44,100'},
  {date:'2025-06-01',type:'Payout',desc:'Khan Bank withdrawal',status:'pending',amount:'-₮ 100,000'},
  {date:'2025-05-28',type:'Earning',desc:'Instagram reel bonus',status:'completed',amount:'+₮ 28,500'},
];

function Wallet() {
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('Khan Bank');
  const [success, setSuccess] = useState(false);
  const statCards = [
    {label:'Available balance',value:'₮ 312,500'},
    {label:'Total paid out',value:'₮ 4,507,500'},
    {label:'Pending',value:'₮ 95,000'},
    {label:'This month',value:'₮ 154,900'},
  ];
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px'}}>
        {statCards.map(s=>(
          <div key={s.label} style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'20px'}}>
            <div style={{fontSize:'12px',color:G.ink500,marginBottom:'4px'}}>{s.label}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:'20px',fontWeight:600,fontFeatureSettings:"'tnum' 1"}}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
        <div style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'24px'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'16px'}}>Request payout</div>
          {success ? (
            <div style={{textAlign:'center',padding:'24px 0'}}>
              <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'#D1FAE5',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',fontSize:'20px'}}>✓</div>
              <div style={{fontWeight:700,marginBottom:'6px'}}>Payout requested</div>
              <div style={{fontSize:'13px',color:G.ink500}}>Funds arrive in 1–3 business days.</div>
              <button onClick={()=>{setSuccess(false);setAmount('');}}
                style={{marginTop:'16px',padding:'8px 20px',borderRadius:'999px',border:`1.5px solid ${G.ink200}`,background:'transparent',cursor:'pointer',fontWeight:600,fontSize:'13px'}}>New request</button>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={{display:'block',fontSize:'13px',fontWeight:600,marginBottom:'6px'}}>Amount (₮)</label>
                <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="₮ 0"
                  style={{width:'100%',minHeight:'44px',padding:'10px 14px',fontFamily:'var(--font-mono)',fontSize:'15px',border:`1.5px solid ${G.ink200}`,borderRadius:'12px',outline:'none',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{display:'block',fontSize:'13px',fontWeight:600,marginBottom:'6px'}}>Bank account</label>
                <select value={bank} onChange={e=>setBank(e.target.value)}
                  style={{width:'100%',minHeight:'44px',padding:'10px 14px',fontFamily:'var(--font-body)',fontSize:'15px',border:`1.5px solid ${G.ink200}`,borderRadius:'12px',background:'#fff',appearance:'none',outline:'none'}}>
                  {['Khan Bank','Golomt Bank','TDB Bank','State Bank'].map(b=><option key={b}>{b}</option>)}
                </select>
              </div>
              <button onClick={()=>amount&&setSuccess(true)}
                style={{padding:'11px',borderRadius:'999px',border:'none',background:G.brand,color:'#fff',fontWeight:700,cursor:'pointer',fontSize:'14px'}}>
                Request payout
              </button>
            </div>
          )}
        </div>
        <div style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'24px'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'16px'}}>Bank accounts</div>
          {['Khan Bank ••••8821','Golomt Bank ••••4492'].map(b=>(
            <div key={b} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px',borderRadius:'12px',background:G.ink50,marginBottom:'8px'}}>
              <span style={{fontSize:'14px',fontWeight:600}}>{b}</span>
              <span style={{padding:'3px 10px',borderRadius:'999px',background:'#D1FAE5',color:'#059669',fontSize:'11px',fontWeight:600}}>Active</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:'#fff',border:`1.5px solid ${G.ink200}`,borderRadius:'16px',padding:'24px'}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'16px'}}>Transaction history</div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{borderBottom:`1.5px solid ${G.ink100}`}}>
              {['Date','Type','Description','Status','Amount'].map(h=>(
                <th key={h} style={{padding:'8px',textAlign:'left',fontSize:'12px',fontWeight:600,color:G.ink500,paddingBottom:'10px'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((t,i)=>(
              <tr key={i} style={{borderBottom:`1px solid ${G.ink50}`}}>
                <td style={{padding:'12px 8px',fontSize:'13px',color:G.ink500,fontFamily:'var(--font-mono)'}}>{t.date}</td>
                <td style={{padding:'12px 8px',fontSize:'13px',fontWeight:600}}>{t.type}</td>
                <td style={{padding:'12px 8px',fontSize:'13px',color:G.ink700}}>{t.desc}</td>
                <td style={{padding:'12px 8px'}}>
                  <span style={{padding:'3px 10px',borderRadius:'999px',fontSize:'11px',fontWeight:600,
                    background:t.status==='completed'?'#D1FAE5':'#FEF3C7',
                    color:t.status==='completed'?'#059669':'#B45309'}}>{t.status}</span>
                </td>
                <td style={{padding:'12px 8px',fontSize:'13px',fontWeight:600,fontFamily:'var(--font-mono)',
                  color:t.amount.startsWith('+')?G.success:G.danger,fontFeatureSettings:"'tnum' 1"}}>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('dashboard');
  const screens = {dashboard:<Dashboard/>, explore:<Explore/>, wallet:<Wallet/>};
  return (
    <div style={{background:G.ink50,minHeight:'100vh'}}>
      <Sidebar page={page} setPage={setPage}/>
      <Topbar page={page}/>
      <main style={{marginLeft:'220px',paddingTop:'56px',padding:'80px 24px 40px 244px',minHeight:'100vh'}}>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
        <div key={page} style={{animation:'fadeIn 220ms ease-out'}}>
          {screens[page]}
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
