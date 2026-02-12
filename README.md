# 🎵 Spotify Clone (Frontend) <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" width="28"/>

A fully responsive **Spotify Web Player UI Clone** built using **HTML, CSS, and JavaScript**.  
This project recreates the core layout and interactive behavior of Spotify’s web interface, including sidebar navigation, dynamic playlists, and a functional music player.

> ⚠️ This is a frontend-only project. No backend or authentication is implemented.

---

## 🚀 Features

- 🎨 Spotify-inspired modern UI
- 📱 Fully Responsive Design
- 📂 Dynamic Playlist Loading from local folders
- ▶️ Functional Music Player
- ⏭️ Next / Previous Controls
- 🔊 Volume Control + Mute Toggle
- ⏱️ Real-time Progress Bar
- 🔁 Auto Play Next Track
- 📂 Fixed Sidebar Layout
- 🍔 Mobile Sidebar Toggle
- 🖼️ Dynamic Album Cover Update

---

## 🛠️ Tech Stack

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40"/>
</p>

- **HTML5**
- **CSS3 (Flexbox + Responsive Design)**
- **Vanilla JavaScript (ES6)**
- No frameworks
- No libraries

---

## 📂 Project Structure

```
SPOTIFY-CLONE/
│
├── index.html
├── favicon.ico
│
├── css/
│   ├── style.css
│   └── utility.css
│
├── js/
│   └── script.js
│
├── img/
│   └── (icons & UI assets)
│
└── songs/
    ├── album1/
    │   ├── cover.jpg
    │   ├── info.json
    │   └── track.mp3
    └── album2/
```

---

## 🎧 How It Works

- Albums are dynamically fetched from the `/songs` directory.
- Clicking a playlist loads all `.mp3` files inside it.
- JavaScript handles:
  - Audio playback
  - Seekbar progress updates
  - Volume control
  - Auto-next track
  - UI state synchronization

---

## 📱 Responsive Design

- Sidebar becomes toggleable on smaller screens.
- Layout adapts for tablets and mobile devices.
- Bottom player remains fixed across screen sizes.

---

## ⚙️ How to Run Locally

Because this project dynamically fetches files, you must run it using a local server.

### Option 1 — VS Code Live Server
1. Install **Live Server** extension.
2. Right-click `index.html`.
3. Click **"Open with Live Server"**.

### Option 2 — Python Server

```bash
python -m http.server 3000
```

Then open:

```
http://127.0.0.1:3000
```

---

## 📌 Future Improvements

- 🔁 Shuffle Mode
- 🔂 Repeat Mode
- 🎚️ Drag-based Seek Control
- 🎨 Dynamic Album-Based Background
- 🎛️ Animated Equalizer
- 🔐 Backend Authentication
- 🎵 Spotify API Integration

---

## 👨‍💻 Author

**Subhradeep Kundu**

GitHub: https://github.com/subhradeepkundu270305

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
