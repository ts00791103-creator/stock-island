import React from 'react';

const places = [
  {name:'專業K線島',sub:'K線・均線・布林',key:'chart',kind:'castle',x:16,y:30},
  {name:'亞當鏡像島',sub:'鏡像・波段推估',key:'adam',kind:'crystal',x:50,y:21},
  {name:'籌碼島',sub:'外資・投信・融資',key:'later',kind:'tower',x:83,y:34},
  {name:'價值島',sub:'基本面・合理價',key:'later',kind:'mine',x:31,y:72},
  {name:'ETF島',sub:'配息・退休配置',key:'later',kind:'house',x:70,y:74}
];
const pix = {shapeRendering:'crispEdges'};
function Building({kind}) {
  if(kind==='castle') return <g {...pix}><path fill="#495c67" d="M18 23h8v-8h9v8h12v-8h9v8h8v32H18z"/><path fill="#c3c4b0" d="M20 25h9v-8h5v8h15v-8h5v8h8v27H20z"/><path fill="#697987" d="M16 20h14v6H16zm30 0h14v6H46z"/><path fill="#374e5d" d="M37 37h10v15H37zM25 31h5v8h-5zm29 0h5v8h-5z"/><path fill="#a17e68" d="M34 52V40h12v12z"/><path fill="#435d68" d="M38 43h4v9h-4z"/><path fill="#e5d5a7" d="M25 12h5v6h-5zm26 0h5v6h-5z"/></g>;
  if(kind==='crystal') return <g {...pix}><path fill="#394f64" d="M40 7 63 27 56 55 39 64 18 48 17 26z"/><path fill="#9fc4c3" d="M40 9 59 27 40 48 21 27z"/><path fill="#d2d7c5" d="M40 9v39L21 27z"/><path fill="#648c9d" d="M40 48 59 27 54 53 40 61z"/><path fill="#527c8c" d="M21 27 40 48v13L22 46z"/><path fill="#f0e9cc" d="M36 17h8v9h-8zm-9 11h7v6h-7z"/><path fill="#e3d9ad" d="M40 1h4v7h-4zm-29 30h6v4h-6zm53 8h6v5h-6z"/></g>;
  if(kind==='tower') return <g {...pix}><path fill="#536779" d="M37 22h9v37h-9z"/><path fill="#c5c8ba" d="M34 18h15v13H34z"/><path fill="#536779" d="M4 19h28v21H4zm47 0h28v21H51z"/><path fill="#668c9c" d="M8 22h21v15H8zm46 0h21v15H54z"/><path fill="#a2b6b0" d="M15 22v15m7-15v15M8 29h21m25 0h21m-14-7v15m7-15v15" stroke="#384f68" strokeWidth="2"/><path fill="#e6d7a9" d="M38 10h7v12h-7z"/><path fill="#879f9a" d="M37 41h10v18H37z"/></g>;
  if(kind==='mine') return <g {...pix}><path fill="#4b5d60" d="M12 45 29 20 46 31 65 18 74 45 61 57H22z"/><path fill="#8d9181" d="M17 44 31 24 46 35 63 23 69 44z"/><path fill="#303d48" d="M30 58V41h24v17z"/><path fill="#ad8b64" d="M27 40h30v5H27zm2 5h5v14h-5zm23 0h5v14h-5z"/><path fill="#d5ba82" d="M8 51h14v6H8zm53 0h13v6H61z"/><path fill="#8aafa0" d="M9 31h9v8H9z"/></g>;
  return <g {...pix}><path fill="#556b5e" d="M18 34 42 14 66 34v27H18z"/><path fill="#c9bda0" d="M23 34h38v26H23z"/><path fill="#855f55" d="M13 36 42 10 71 36H59L42 22 25 36z"/><path fill="#a57865" d="M20 33 42 15 64 33z"/><path fill="#586f75" d="M33 43h12v17H33zM49 40h9v10h-9z"/><path fill="#a2c0b5" d="M51 42h5v6h-5z"/><path fill="#718c70" d="M9 48h15v13H9zm54-4h12v17H63z"/><path fill="#a0aa7b" d="M12 41h9v11h-9zm53-5h8v13h-8z"/></g>;
}
function Island({kind}) {
 const palette=kind==='crystal'?['#6b8e91','#8aa9a4']:kind==='house'?['#6d8b70','#92a47c']:['#738a70','#9aaa7d'];
 return <svg viewBox="0 0 160 130" width="100%" aria-hidden="true" style={{maxWidth:190,display:'block',imageRendering:'pixelated',filter:'drop-shadow(5px 8px 0 #081d2d)'}}>
  <g {...pix}>
   <path fill="#314f55" d="M16 51h10V39h20V29h62v8h22v14h13v39h-13v12h-23v8H46v-9H26V89H16z"/>
   <path fill="#c2b58c" d="M9 43h12V32h24V22h68v9h20v13h13v39h-13v12h-22v8H45v-9H22V83H9z"/>
   <path fill={palette[0]} d="M17 44h11V34h23V29h56v9h20v12h11v28h-13v10h-22v7H48v-8H30V76H17z"/>
   <path fill={palette[1]} d="M28 39h24v-8h55v9h18v10h9v13H24V48h4z"/>
   <path fill="#536e60" d="M31 80h13v5H31zm81-12h12v5h-12zM48 89h16v4H48z"/>
  </g>
  <g transform="translate(42 24) scale(.94)"><Building kind={kind}/></g>
 </svg>;
}
export default function PixelWorld({onPick}) {
 return <section aria-label="16-bit 經典遊戲股票島地圖" style={{position:'relative',isolation:'isolate',overflow:'hidden',border:'3px solid #65788a',borderRadius:8,background:'#153753',color:'#f0e8d3',padding:'18px 6px 20px',boxShadow:'inset 0 0 0 3px #0b2236'}}>
 <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.55,backgroundImage:'linear-gradient(90deg,transparent 96%,#326080 97%,transparent 100%),linear-gradient(0deg,transparent 96%,#326080 97%,transparent 100%)',backgroundSize:'78px 78px'}}/>
 <header style={{position:'relative',zIndex:1,margin:'0 auto 12px',width:'fit-content',maxWidth:'95%',padding:'9px 18px',textAlign:'center',background:'#273c4d',border:'4px solid #b19a77',boxShadow:'4px 5px 0 #081a29',fontWeight:900,fontSize:22,letterSpacing:2}}>股票島 <span style={{fontSize:12,display:'block',letterSpacing:1,fontWeight:600,color:'#d6c9b3'}}>STOCK ISLAND · 16-BIT</span></header>
 <div style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'repeat(6,minmax(0,1fr))',gap:'12px 2px',maxWidth:850,margin:'auto'}}>
 {places.map((p,i)=><button key={p.name} type="button" onClick={()=>onPick(p.key)} aria-label={'進入'+p.name} style={{gridColumn:i<3?'span 2':i===3?'2 / span 2':'4 / span 2',border:0,background:'transparent',color:'inherit',minWidth:0,padding:'3px 0',display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',touchAction:'manipulation'}}>
 <Island kind={p.kind}/><strong style={{display:'block',marginTop:7,padding:'5px 3px',border:'2px solid #b7a17e',background:'#263a4c',boxShadow:'2px 3px 0 #081c2d',fontSize:'clamp(10px,2.8vw,15px)',whiteSpace:'nowrap'}}>{p.name}</strong><small style={{display:'block',marginTop:7,color:'#d2d6d1',fontSize:'clamp(9px,2.2vw,12px)',lineHeight:1.4}}>{p.sub}</small></button>)}
 </div><footer style={{position:'relative',zIndex:1,textAlign:'center',fontSize:12,marginTop:22,color:'#d6c6a8'}}>⚓　點擊島嶼進入分析　⚓</footer></section>;
}
