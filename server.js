
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

const rooms = new Map();
function getRoom(id) {
  if (!rooms.has(id)) rooms.set(id, []);
  return rooms.get(id);
}

wss.on('connection', (ws) => {
  let currentRoom = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'join') {
      currentRoom = msg.room || 'portal-room';
      const room = getRoom(currentRoom);

      for (let i = room.length - 1; i >= 0; i--) {
        if (room[i].readyState !== WebSocket.OPEN) room.splice(i, 1);
      }

      if (!room.includes(ws)) room.push(ws);

      const role = room.length === 1 ? 'caller' : 'callee';
      ws.role = role;

      ws.send(JSON.stringify({ type: 'joined', count: room.length, role }));

      if (room.length >= 2) {
        for (const peer of room) {
          if (peer.readyState === WebSocket.OPEN) {
            peer.send(JSON.stringify({ type: 'ready' }));
          }
        }
      }
      return;
    }

    if (!currentRoom) return;
    const room = getRoom(currentRoom);
    for (const peer of room) {
      if (peer !== ws && peer.readyState === WebSocket.OPEN) {
        peer.send(JSON.stringify(msg));
      }
    }
  });

  ws.on('close', () => {
    if (!currentRoom) return;
    const room = getRoom(currentRoom);
    const idx = room.indexOf(ws);
    if (idx >= 0) room.splice(idx, 1);
    for (const peer of room) {
      if (peer.readyState === WebSocket.OPEN) {
        peer.send(JSON.stringify({ type: 'peer-left' }));
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Magic WebRTC Portal fixed: http://localhost:' + PORT));
