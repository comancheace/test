WebRTC + MediaPipe Hands Magic Portal

WHAT IT DOES
------------
- True WebRTC remote webcam.
- Local webcam hidden.
- MediaPipe Hand Landmarker tracks your index fingertip.
- Hand coordinates are sent by WebSocket.
- If local and remote fingertips overlap, MAGIC TOUCH triggers:
  purple glow, particle burst, energy beam, magic sound.

RUN LOCALLY
-----------
1. Install Node.js.
2. Open terminal in this folder.
3. Run:
   npm install
   npm start
4. Open:
   http://localhost:3000

TEST WITH TWO DEVICES ON SAME NETWORK
-------------------------------------
Computer running Node:
http://localhost:3000

Other computer / phone:
http://YOUR_PC_IP:3000

INTERNET DEPLOYMENT
-------------------
Needs:
- Node.js hosting
- HTTPS
- WebSocket support

For difficult networks, TURN server may be required.
This demo includes public OpenRelay TURN settings for testing.

MOBILE
------
MediaPipe Hands works on modern Android Chrome and iPhone Safari/Chrome.
Camera permissions must be allowed.

NOTES
-----
MediaPipe code uses @mediapipe/tasks-vision from jsDelivr CDN.
WebRTC adds webcam tracks with RTCPeerConnection.addTrack and displays remote tracks in ontrack.


BACKGROUND MP3 MUSIC
--------------------
This version includes a placeholder:

public/assets/music.mp3.placeholder.txt

Replace it with your real file named exactly:

public/assets/music.mp3

The music starts after the user clicks "Open Portal" because browsers block autoplay audio before user interaction.

Volume:
- Normal portal: 0.35
- MAGIC TOUCH: 0.62
