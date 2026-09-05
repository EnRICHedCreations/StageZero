const express = require('express');
const path = require('path');
const app = express();
const dist = path.join(__dirname, 'dist');
app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use(express.static(dist));
app.use((_, res) => res.sendFile(path.join(dist, 'index.html')));
app.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('Stage Zero is live'));
