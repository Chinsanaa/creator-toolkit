function IosFrame({ children }) {
  return (
    <div style={{
      position:'relative', width:'402px', height:'874px', borderRadius:'54px',
      background:'#1A1A1A',
      boxShadow:'0 32px 80px rgba(0,0,0,.4), inset 0 0 0 1.5px rgba(255,255,255,.10)',
      overflow:'hidden', flexShrink:0
    }}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'54px',zIndex:20,
        display:'flex',alignItems:'flex-end',justifyContent:'space-between',padding:'0 28px 10px',
        color:'#fff',fontSize:'12px',fontWeight:600,pointerEvents:'none'}}>
        <span>9:41</span>
        <div style={{position:'absolute',top:'10px',left:'50%',transform:'translateX(-50%)',
          width:'126px',height:'36px',borderRadius:'20px',background:'#000',zIndex:10}}/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',fontSize:'11px'}}>
          <span>●●●</span>
          <span style={{marginLeft:'2px'}}>100%</span>
        </div>
      </div>
      <div style={{position:'absolute',inset:0,paddingTop:'54px',paddingBottom:'34px',overflow:'hidden',display:'flex',flexDirection:'column'}}>
        {children}
      </div>
      <div style={{position:'absolute',bottom:'8px',left:'50%',transform:'translateX(-50%)',
        width:'134px',height:'5px',borderRadius:'3px',background:'rgba(255,255,255,.28)'}}/>
    </div>
  );
}
