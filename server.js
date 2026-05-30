const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

const rooms = new Map();

function roomSet(id) {
  if (!rooms.has(id)) rooms.set(id, new Set());
  return rooms.get(id);
}

wss.on('connection', (ws) => {
  let room = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'join') {
      room = msg.room || 'portal';
      const set = roomSet(room);
      set.add(ws);
      ws.send(JSON.stringify({ type: 'joined', count: set.size }));
      for (const p of set) {
        if (p !== ws && p.readyState === WebSocket.OPEN) {
          p.send(JSON.stringify({ type: 'peer-joined' }));
        }
      }
      return;
    }

    if (!room) return;
    const set = roomSet(room);
    for (const p of set) {
      if (p !== ws && p.readyState === WebSocket.OPEN) {
        p.send(JSON.stringify(msg));
      }
    }
  });

  ws.on('close', () => {
    if (!room) return;
    const set = roomSet(room);
    set.delete(ws);
    for (const p of set) {
      if (p.readyState === WebSocket.OPEN) {
        p.send(JSON.stringify({ type: 'peer-left' }));
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Magic WebRTC Portal: http://localhost:' + PORT));
