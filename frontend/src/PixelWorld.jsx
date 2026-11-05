import React from 'react';
const places=[
 {name:'專業K線島',icon:'🏰',sub:'K線分析・均線・布林',key:'chart',cls:'chart'},
 {name:'亞當鏡像島',icon:'💠',sub:'鏡像走勢・波段推估',key:'adam',cls:'adam'},
 {name:'籌碼島',icon:'🛰️',sub:'外資・投信・融資融券',key:'later',cls:'chips'},
 {name:'價值島',icon:'⛏️',sub:'基本面・合理價',key:'later',cls:'value'},
 {name:'ETF島',icon:'🏡',sub:'配息・退休配置',key:'later',cls:'etf'}
];
export default function PixelWorld({onPick}){return <div className="pixel-world" aria-label="16-bit 像素風股票島地圖"><div className="pixel-sea"/><div className="pixel-banner">🏝️ 股票島 <small>Stock Island V1.2 · 16-bit</small></div><div className="pixel-map">{places.map(p=><button type="button" key={p.name} className={'pixel-island '+p.cls} onClick={()=>onPick(p.key)} aria-label={'進入'+p.name}><span className="pixel-land"><span className="pixel-building">{p.icon}</span></span><span className="pixel-name">{p.name}</span><span className="pixel-sub">{p.sub}</span></button>)}</div><div className="pixel-dock">⚓　點擊島嶼進入分析　⚓</div></div>}
