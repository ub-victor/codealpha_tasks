document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audio = new Audio();
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.getElementById('progress');
    const progressContainer = document.querySelector('.progress-container');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const cover = document.getElementById('cover');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeControl = document.getElementById('volume');
    const playlist = document.getElementById('playlist');
    
    // Songs data
    const songs = [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            cover: "assets/images/cover1.jpg",
            audio: "assets/songs/song1.mp3"
        },
        {
            title: "Save Your Tears",
            artist: "The Weeknd",
            cover: "assets/images/cover2.jpg",
            audio: "assets/songs/song2.mp3"
        },
        {
            title: "Starboy",
            artist: "The Weeknd ft. Daft Punk",
            cover: "assets/images/cover3.jpg",
            audio: "assets/songs/song3.mp3"
        }
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Initialize player
    function initPlayer() {
        loadSong(songs[currentSongIndex]);
        renderPlaylist();
        updateCurrentYear();
    }
    
    // Load song
    function loadSong(song) {
        title.textContent = song.title;
        artist.textContent = song.artist;
        cover.src = song.cover;
        audio.src = song.audio;
    }
    
    // Play song
    function playSong() {
        isPlaying = true;
        playBtn.querySelector('i').classList.remove('fa-play');
        playBtn.querySelector('i').classList.add('fa-pause');
        document.querySelector('.music-player').classList.add('playing');
        audio.play();
    }
    
    // Pause song
    function pauseSong() {
        isPlaying = false;
        playBtn.querySelector('i').classList.remove('fa-pause');
        playBtn.querySelector('i').classList.add('fa-play');
        document.querySelector('.music-player').classList.remove('playing');
        audio.pause();
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            playSong();
        }
        highlightCurrentSong();
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            playSong();
        }
        highlightCurrentSong();
    }
    
    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time display
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
    
    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Set volume
    function setVolume() {
        audio.volume = this.value;
    }
    
    // Render playlist
    function renderPlaylist() {
        playlist.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            li.dataset.index = index;
            if (index === currentSongIndex) {
                li.classList.add('playing');
            }
            li.addEventListener('click', function() {
                currentSongIndex = parseInt(this.dataset.index);
                loadSong(songs[currentSongIndex]);
                playSong();
                highlightCurrentSong();
            });
            playlist.appendChild(li);
        });
    }
    
    // Highlight current song in playlist
    function highlightCurrentSong() {
        const playlistItems = document.querySelectorAll('#playlist li');
        playlistItems.forEach(item => item.classList.remove('playing'));
        playlistItems[currentSongIndex].classList.add('playing');
    }
    
    // Update current year in footer
    function updateCurrentYear() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
    
    // Event listeners
    playBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });
    
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    
    progressContainer.addEventListener('click', setProgress);
    volumeControl.addEventListener('input', setVolume);
    
    // Initialize the player
    initPlayer();
});