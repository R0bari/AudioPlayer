if (localStorage.getItem('songs')) {
    songs = localStorage.getItem('songs').split(',');
} else {
    var songs = [ "Трофим - Город Сочи.mp3" ];
}

var posters = [ "Poster3.jpg" ];

var iconsFolder = "img/";
var songsFolder = "songs/";
var postersFolder = iconsFolder + "posters/";

var body = document.querySelector('body');
var songTitle = document.getElementById("songTitle");

var seekBar = document.getElementById("seek-bar");
const barRect = seekBar.getBoundingClientRect();

var fillBar = document.getElementById("fill");
var handle = document.getElementById('handle')

var volumeBar = document.querySelector('.volume-bar');
const volumeBarRect = volumeBar.getBoundingClientRect();

var playBtn = document.getElementById('play');
var currentTime = document.getElementById('current-time');
var songDuration = document.getElementById('song-duration');

var inputFileBtn = document.querySelector('.add-plus');
var filesInput = document.querySelector('.add-file-input');

var poster = document.getElementById('poster');
var background = document.getElementById('bg-poster');

var song = new Audio();
var currentSong = 0;