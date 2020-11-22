firstInit();

function firstInit() {
    seekBar.addEventListener('click', (event) => {
        song.currentTime = (event.clientX - barRect.left) * song.duration / barRect.width;
        drawBar();
    });
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    volumeBar.addEventListener('click', handleChangeVolumeClick);

    if (localStorage.getItem('currentSong')) {
        currentSong = localStorage.getItem('currentSong');
    }
    initSong(songs[currentSong]);
    if (localStorage.getItem('currentTime')) {
        song.currentTime = localStorage.getItem('currentTime');
        drawBar();
    }
    if (localStorage.getItem('volume')) {
        song.volume = localStorage.getItem('volume');
        drawVolumeBar();
    }
    setInterval(() => localStorage.setItem('currentTime', song.currentTime), 5000);
    song.addEventListener('timeupdate', drawBar);
}
function initSong(songToPlay) {
    song.src = songsFolder + songToPlay;
    songTitle.textContent = songToPlay;
    song.volume = 0.5;
    poster.src = postersFolder +posters[currentSong];
    background.src = postersFolder + posters[currentSong];
}

function prepareSong(songToPlay) {
    initSong(songToPlay);
    song.play();
    playBtn.src = 'Pause.png';
}

function playOrPauseSong(){
    if(song.paused){
        song.play();
        playBtn.src = iconsFolder + 'Pause.png';
    }
    else{
        song.pause();
        playBtn.src = iconsFolder + 'Play.png';
    }
}

function next(){
    
    currentSong++;
    if(currentSong > 2){
        currentSong = 0;
    }
    changeSong(currentSong);
}
function previous(){
    
    currentSong--;
    if(currentSong < 0){
        currentSong = 2;
    }
    changeSong(currentSong);
}
function changeSong(currentSong) {
    prepareSong(songs[currentSong]);
    playBtn.src = iconsFolder + 'Pause.png';
    poster.src = postersFolder +posters[currentSong];
    background.src = postersFolder + posters[currentSong];

    localStorage.setItem('currentSong', currentSong);
    localStorage.setItem('currentTime', 0);
}

function drawBar() {
    var position = song.currentTime / song.duration;
    
    fillBar.style.width = position * 100 +'%';
    handle.style.marginLeft = song.currentTime * barRect.width / song.duration;

    currentTime.innerHTML = toClockView(song.currentTime);
    songDuration.innerHTML = isNaN(song.duration) ? '00:00' : toClockView(song.duration);

    if (position >= 1) {
        playBtn.src = iconsFolder + 'Play.png';         
    }
}

function toClockView(currentTime) {
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime) - minutes * 60;
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return minutes + ":" + seconds;
}

function handleKeydown(event)  {
    switch (event.code) {
        case 'ArrowLeft': 
            song.currentTime = song.currentTime >= 5 ? song.currentTime - 5: 0;
            break;
        case 'ArrowRight': 
            song.currentTime = song.duration - 5 >= song.currentTime ? song.currentTime + 5: song.duration;
            break;
    }
}

function handleKeyup(event)  {
    switch (event.code) {
        case 'Space':
            playOrPauseSong();
            break;
    }
}

function handleChangeVolumeClick(event) {
    song.volume = (volumeBarRect.bottom - event.clientY) / volumeBarRect.height;
    drawVolumeBar(song.volume);
    localStorage.setItem('volume', song.volume);
}

function drawVolumeBar() {
    const lowPercent = Math.floor(song.volume * 100) + '%';
    const topPercent = Math.floor((1 - song.volume) * 100) + '%';
    volumeBar.style.background = 'linear-gradient(to top, royalblue ' + lowPercent + 
    ', rgb(195, 204, 231) ' + lowPercent + ')';
}