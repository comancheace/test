Magic WebRTC Portal - Remote Webcam Only

This is a true WebRTC version, not JPEG snapshots.

Features:
- You only see the other user's webcam.
- Your local webcam is hidden but sent to the other user.
- WebRTC video/audio streaming.
- WebSocket signaling server.
- Blue/magenta magic portal canvas effects.

How to run:
1. Install Node.js.
2. Open terminal in this folder.
3. Run:
   npm install
   npm start
4. Open:
   http://localhost:3000

For internet use:
- Deploy to an HTTPS server.
- Both users open the same URL and enter the same room name.
- Some networks need a TURN server; this uses only public STUN by default.

Note:
This is HTML5/WebRTC because browsers support WebRTC natively.
Doing real WebRTC directly inside Cinder++ requires external native libraries and is much more complex.
