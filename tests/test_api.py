from backend.main import app, demo
def test_demo_sorted():
 rows=demo('2330')
 assert rows and all(rows[i]['time']<rows[i+1]['time'] for i in range(len(rows)-1))
 assert all(x['low']<=min(x['open'],x['close'])<=max(x['open'],x['close'])<=x['high'] for x in rows)
