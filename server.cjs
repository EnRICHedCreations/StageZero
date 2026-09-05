const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const dist = path.join(__dirname, 'dist');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8' };
http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200, {'content-type':'application/json'}); return res.end('{"status":"ok"}'); }
  const pathname = new URL(req.url, 'http://localhost').pathname;
  let file = path.resolve(dist, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (!file.startsWith(`${dist}${path.sep}`)) { res.writeHead(400); return res.end('Bad request'); }
  fs.readFile(file, (error, data) => {
    if (!error) { res.writeHead(200, {'content-type':types[path.extname(file)] || 'application/octet-stream'}); return res.end(data); }
    fs.readFile(path.join(dist, 'index.html'), (fallbackError, fallback) => {
      if (fallbackError) { res.writeHead(404); return res.end('Not found'); }
      res.writeHead(200, {'content-type':types['.html']}); res.end(fallback);
    });
  });
}).listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('Stage Zero is live'));
