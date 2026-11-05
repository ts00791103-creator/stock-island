from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import date, timedelta
from functools import lru_cache
import requests, math, random, os
app=FastAPI(title='股票島 API',version='1.0.0')
origins=[s.strip() for s in os.getenv('CORS_ORIGINS','http://localhost:5173,http://127.0.0.1:5173,https://stock-island-web.onrender.com').split(',') if s.strip()]
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_methods=['GET'],allow_headers=['*'])
STOCKS={'2330':'台積電','2308':'台達電','2317':'鴻海','2454':'聯發科','2603':'長榮','2618':'長榮航','0050':'元大台灣50','00878':'國泰永續高股息','00919':'群益台灣精選高息'}
@app.get('/api/health')
def health():return {'ok':True,'version':'1.0.0'}
@app.get('/api/stocks')
def stocks():return [{'symbol':k,'name':v} for k,v in STOCKS.items()]
def demo(symbol):
 rng=random.Random(int(symbol) if symbol.isdigit() else 2330);now=date.today();days=[];d=now-timedelta(days=365)
 while d<=now:
  if d.weekday()<5:days.append(d)
  d+=timedelta(days=1)
 out=[];last=150.0
 for d in days:
  op=max(1,last+rng.uniform(-3,3));close=max(1,op+rng.uniform(-5,5));out.append({'time':d.isoformat(),'open':round(op,2),'high':round(max(op,close)+rng.uniform(.1,2),2),'low':round(max(.01,min(op,close)-rng.uniform(.1,2)),2),'close':round(close,2)});last=close
 return out
@lru_cache(maxsize=128)
def twse_month(symbol,yyyymm):
 r=requests.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY',params={'response':'json','date':yyyymm+'01','stockNo':symbol},timeout=12,headers={'User-Agent':'StockIsland/1.0 research app'});r.raise_for_status();j=r.json()
 if j.get('stat')!='OK':return []
 out=[]
 for a in j.get('data',[]):
  try:
   y,m,d=map(int,a[0].split('/'));dt=date(y+1911,m,d).isoformat()
   def n(i):return float(a[i].replace(',','').replace('--',''))
   out.append({'time':dt,'open':n(3),'high':n(4),'low':n(5),'close':n(6)})
  except (ValueError,IndexError,TypeError):continue
 return out
@app.get('/api/history')
def history(symbol:str='2330',months:int=12):
 symbol=symbol.strip();symbol=next((k for k,v in STOCKS.items() if symbol==v),symbol)
 if not symbol.isdigit() or len(symbol)>6:raise HTTPException(400,'請輸入有效股票代號')
 if not 1<=months<=24:raise HTTPException(400,'月份範圍須介於 1 至 24')
 # TWSE endpoint supports TWSE-listed equities; ETFs or OTC stocks may require different sources.
 rows=[];today=date.today()
 for offset in range(months-1,-1,-1):
  yr=today.year;mo=today.month-offset
  while mo<=0:mo+=12;yr-=1
  try:rows.extend(twse_month(symbol,f'{yr:04d}{mo:02d}'))
  except requests.RequestException:continue
 rows=sorted({x['time']:x for x in rows}.values(),key=lambda x:x['time'])
 if rows:return {'symbol':symbol,'name':STOCKS.get(symbol,''),'source':'TWSE','candles':rows,'last_date':rows[-1]['time']}
 return {'symbol':symbol,'name':STOCKS.get(symbol,''),'source':'DEMO','candles':demo(symbol),'last_date':None,'warning':'交易所無可用資料，顯示示範資料，非真實行情'}
