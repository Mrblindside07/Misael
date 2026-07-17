const playlist = [
    {
        title: "Santa Doesn't Know You Like I Do",
        artist: "Sabrina Carpenter",
        cover: 'fruitcake cover.jpg',
        audio: "santa doesn't know you like i do.flac"
    },
    {
        title: "Don't Smile",
        artist: "Sabrina Carpenter",
        cover: 'short n sweet cover.jpg',
        audio: "Sabrina Carpenter - Don't Smile.flac"
    },
    {
        title: "Espresso",
        artist: "Sabrina Carpenter",
        cover: "espresso_cover.jpg",
        audio: "espresso.mp3"
    }
];

const audioEl       = document.getElementById("audio-element");
const playBtn       = document.getElementById("play-btn");
const nextBtn       = document.getElementById("next-btn");
const prevBtn       = document.getElementById("prev-btn");
const trackTitle    = document.getElementById("track-title");
const trackArtist   = document.getElementById("track-artist");
const albumCover    = document.getElementById("album-cover");
const progressBar   = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl   = document.getElementById("total-time");
const playerWrapper = document.getElementById("music-player-wrapper");

let isPlaying = false;
let currentTrackIndex = 0;

function loadTrack(index) {
    const track = playlist[index];
    trackTitle.textContent  = track.title;
    trackArtist.textContent = track.artist;
    albumCover.src          = track.cover;
    audioEl.src             = track.audio;
    progressBar.value       = 0;
    currentTimeEl.textContent = "0:00";
    totalTimeEl.textContent   = "0:00";
}

function playMusic() {
    isPlaying = true;
    playBtn.textContent = "Pause";
    playerWrapper.classList.add("playing");
    audioEl.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.textContent = "Play";
    playerWrapper.classList.remove("playing");
    audioEl.pause();
}

playBtn.addEventListener("click", function () {
    if (isPlaying) { pauseMusic(); } else { playMusic(); }
});

nextBtn.addEventListener("click", function () {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playMusic();
});

prevBtn.addEventListener("click", function () {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playMusic();
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? "0" : "") + sec;
}

audioEl.addEventListener("timeupdate", function () {
    const currentTime = audioEl.currentTime;
    const duration    = audioEl.duration;
    if (!isNaN(duration)) {
        progressBar.value         = (currentTime / duration) * 100;
        currentTimeEl.textContent = formatTime(currentTime);
        totalTimeEl.textContent   = formatTime(duration);
    }
});

progressBar.addEventListener("input", function () {
    const duration = audioEl.duration;
    if (!isNaN(duration)) {
        audioEl.currentTime = (progressBar.value / 100) * duration;
    }
});

audioEl.addEventListener("ended", function () {
    nextBtn.click();
});

loadTrack(currentTrackIndex);

/* ══════════════════════════════
   SCROLL: shrink nav
   ══════════════════════════════ */
window.addEventListener('scroll', function() {
    const header = document.querySelector('nav');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = 'none';
    }
});

/* ══════════════════════════════
   HAMBURGER MENU
   ══════════════════════════════ */
const hamburger   = document.getElementById('nav-toggle');
const navLinks    = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });
}

/* ══════════════════════════════
   THEME TOGGLE
   ══════════════════════════════ */
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
    }
    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

/* ══════════════════════════════
   MODALS
   ══════════════════════════════ */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
    if (e.target.classList.contains('lightbox-overlay')) {
        e.target.classList.remove('active');
    }
});

/* ══════════════════════════════
   MULTIMEDIA FILTER & LIGHTBOX
   ══════════════════════════════ */
const filterBtns   = document.querySelectorAll('.filter-btn');
const masonryItems = document.querySelectorAll('.masonry-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        masonryItems.forEach(item => {
            item.style.display =
                (filterValue === 'all' || item.getAttribute('data-category') === filterValue)
                ? 'block' : 'none';
        });
    });
});

const lightboxOverlay = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightbox-img');
const lightboxClose   = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxOverlay.classList.add('active');
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightboxOverlay.classList.remove('active');
    });
}

/* ══════════════════════════════
   BEFORE & AFTER SLIDER
   ══════════════════════════════ */
const baContainer = document.querySelector('.ba-slider-container');
const baHandle    = document.querySelector('.ba-slider-handle');
const baAfter     = document.querySelector('.ba-image-after');

if (baContainer && baHandle && baAfter) {
    let isDragging = false;

    const startDrag = () => { isDragging = true; };
    const endDrag   = () => { isDragging = false; };

    const doDrag = (e) => {
        if (!isDragging) return;
        let clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const rect = baContainer.getBoundingClientRect();
        let x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const pct = (x / rect.width) * 100;
        baHandle.style.left = pct + '%';
        baAfter.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    };

    baHandle.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mousemove', doDrag);
    baHandle.addEventListener('touchstart', startDrag);
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchmove', doDrag);
}

/* ══════════════════════════════
   CUSTOM VIDEO PLAYER
   ══════════════════════════════ */
const video              = document.getElementById('showreel-video');
const playPauseBtn       = document.getElementById('play-pause-btn');
const overlayPlayBtn     = document.getElementById('overlay-play-btn');
const muteBtn            = document.getElementById('mute-btn');
const fullscreenBtn      = document.getElementById('fullscreen-btn');
const progressContainer  = document.getElementById('video-progress-container');
const progressFilled     = document.getElementById('video-progress-filled');
const videoCurrentTimeEl = document.getElementById('video-current');
const durationEl         = document.getElementById('video-duration');

if (video) {
    function fmtTime(s) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec < 10 ? '0' + sec : sec}`;
    }

    video.addEventListener('loadedmetadata', () => {
        durationEl.textContent = fmtTime(video.duration);
    });

    function togglePlay() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸';
            overlayPlayBtn.classList.add('hidden');
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
            overlayPlayBtn.classList.remove('hidden');
        }
    }

    playPauseBtn.addEventListener('click', togglePlay);
    overlayPlayBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.addEventListener('timeupdate', () => {
        videoCurrentTimeEl.textContent = fmtTime(video.currentTime);
        progressFilled.style.width = `${(video.currentTime / video.duration) * 100}%`;
    });

    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            (video.requestFullscreen || video.webkitRequestFullscreen || video.msRequestFullscreen).call(video);
        } else {
            (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
        }
    });
}