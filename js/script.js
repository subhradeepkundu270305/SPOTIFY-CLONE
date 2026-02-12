console.log("Spotify Clone Initialized");

let currentSong = new Audio();
let songs = [];
let currFolder = "";
let lastVolume = 0.5;

/* ================= UTIL ================= */

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}

/* ================= LOAD SONGS ================= */

async function getSongs(folder) {
    currFolder = folder;

    const response = await fetch(`/${folder}/`);
    const text = await response.text();

    const div = document.createElement("div");
    div.innerHTML = text;

    const anchors = div.getElementsByTagName("a");
    songs = [];

    for (let a of anchors) {
        if (a.href.endsWith(".mp3")) {
            songs.push(decodeURIComponent(a.href.split(`/${folder}/`)[1]));
        }
    }

    const songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    let html = "";
    for (const song of songs) {
        html += `
            <li data-track="${song}">
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>Unknown Artist</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            </li>`;
    }

    songUL.innerHTML = html;

    Array.from(songUL.getElementsByTagName("li")).forEach((li) => {
        li.addEventListener("click", () => {
            playMusic(li.dataset.track);
        });
    });

    return songs;
}

/* ================= PLAY MUSIC ================= */

function playMusic(track, pause = false) {
    const playBtn = document.getElementById("play");

    currentSong.src = `/ ${currFolder}/` + track;

    if (!pause) {
        currentSong.play();
        playBtn.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").textContent = track;
    document.querySelector(".artistname").textContent = "Unknown Artist";

    document.querySelector(".songtime").textContent = "00:00";
    document.querySelector(".totaltime").textContent = "00:00";

    // Update album cover
    const albumFolder = currFolder.split("/").pop();
    document.querySelector(".player-cover").src =
        `/songs/${albumFolder}/cover.jpg`;
}

/* ================= DISPLAY ALBUMS ================= */

async function displayAlbums() {
    const response = await fetch(`/songs/`);
    const text = await response.text();

    const div = document.createElement("div");
    div.innerHTML = text;

    const anchors = Array.from(div.getElementsByTagName("a"));
    const cardContainer = document.querySelector(".cardContainer");

    let html = "";

    for (let a of anchors) {
        if (a.href.includes("/songs") && !a.href.includes(".htaccess")) {
            const folder = a.href.split("/").slice(-2)[0];

            const metaRes = await fetch(`/songs/${folder}/info.json`);
            const meta = await metaRes.json();

            html += `
                <div data-folder="${folder}" class="card">
                    <div style="position: relative;">
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <div class="play">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 20V4L19 12L5 20Z" fill="#000" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <h2>${meta.title}</h2>
                    <p>${meta.description}</p>
                </div>`;
        }
    }

    cardContainer.innerHTML = html;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        card.addEventListener("click", async () => {
            songs = await getSongs(`songs/${card.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
}

/* ================= MAIN ================= */

async function main() {
    const playBtn = document.getElementById("play");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("previous");
    const volumeSlider = document.querySelector(".range input");
    const volumeIcon = document.querySelector(".volume img");

    await getSongs("songs/ncs");
    playMusic(songs[0], true);
    await displayAlbums();

    /* PLAY / PAUSE */
    playBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playBtn.src = "img/pause.svg";
        } else {
            currentSong.pause();
            playBtn.src = "img/play.svg";
        }
    });

    /* TIME UPDATE */
    currentSong.addEventListener("timeupdate", () => {
        if (!isNaN(currentSong.duration) && currentSong.duration > 0) {

            document.querySelector(".songtime").textContent =
                secondsToMinutesSeconds(currentSong.currentTime);

            document.querySelector(".totaltime").textContent =
                secondsToMinutesSeconds(currentSong.duration);

            document.querySelector(".circle").style.left =
                (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }
    });

    /* AUTO NEXT */
    currentSong.addEventListener("ended", () => {
        let index = songs.indexOf(
            decodeURIComponent(currentSong.src.split("/").pop())
        );
        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    /* SEEK BAR */
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        if (!currentSong.duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;

        currentSong.currentTime = currentSong.duration * percent;
    });

    /* SIDEBAR */
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").classList.add("active");
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").classList.remove("active");
    });

    /* PREVIOUS */
    prevBtn.addEventListener("click", () => {
        let index = songs.indexOf(
            decodeURIComponent(currentSong.src.split("/").pop())
        );
        if (index - 1 >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    /* NEXT */
    nextBtn.addEventListener("click", () => {
        let index = songs.indexOf(
            decodeURIComponent(currentSong.src.split("/").pop())
        );
        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    /* VOLUME */
    volumeSlider.value = lastVolume * 100;
    currentSong.volume = lastVolume;

    volumeSlider.addEventListener("input", (e) => {
        const volume = parseInt(e.target.value) / 100;
        currentSong.volume = volume;
        lastVolume = volume;

        volumeIcon.src =
            volume === 0 ? "img/mute.svg" : "img/volume.svg";
    });

    volumeIcon.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            lastVolume = currentSong.volume;
            currentSong.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.src = "img/mute.svg";
        } else {
            currentSong.volume = lastVolume;
            volumeSlider.value = lastVolume * 100;
            volumeIcon.src = "img/volume.svg";
        }
    });
}

main();
