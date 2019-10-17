import "./styles/index.scss";

import { visualizer1 } from "./visuals/visualizer-1";
// import { visualizer1 } from "./visuals/visualizer-3";


window.onload = function () {
// create initial AudioContext
    let audioCtx = window.AudioContext || window.webkitAudioContext;
    let contextCreated = false;
    let analyser;

    const currentTrack = document.getElementById("audio");


    const playPause = () => {
        if (currentTrack.paused) {
            currentTrack.play(); 
            document.getElementById("play-pause").innerHTML = "||";
            document.getElementById("play-pause").color = "ff02f2";
        } else {
            currentTrack.pause();
            document.getElementById("play-pause").innerHTML = ">";
        }
    };

    document.getElementById("file-input").onclick = () => {
        if (!contextCreated) {
            contextCreated = true;
            // context = new AudioContext();
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            const source = audioCtx.createMediaElementSource(currentTrack);
            source.connect(analyser);
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);
            document.getElementById("play-pause").onclick = () => {
                playPause();
            }
            analyser.minDecibels = -105;
            analyser.maxDecibels = -25;
            analyser.smoothingTimeConstant = 0.8;
            source.connect(audioCtx.destination);
            visualizer1(analyser, d3.interpolateBuPu);
        }
    };

    let title;

    document.getElementById("file-input").onchange = function () {
        const files = this.files;
        if (files.length > 0) {
            currentTrack.src = URL.createObjectURL(files[0]);
            currentTrack.load();
            title = files[0].name.split(".")[0];
            document.getElementById("nowPlaying").innerHTML = `now playing: ${title}`;
            document.getElementById("progress-bar-container").style.opacity = 1;
            document.getElementById("progress-bar").style.width = document.getElementById("nowPlaying").offsetWidth;
        }
    };

    let timeout;

    document.onclick = () => {
        if (!currentTrack.paused) {
            toggleDisplay();
        } 
    }

    document.onmouseover = () => {
        if (!currentTrack.paused) {
            showNotification();
            clearTimeout(timeout);
            timeout = this.setTimeout(() => hideNotification(), 3000);
        }
    }

    const showNotification = () => {
        document.getElementById("instruct").style.color = "aqua";
    }

    const hideNotification = () => {
        document.getElementById("instruct").style.color = "black";
    }

    document.getElementById("modal-over-left").onclick = () => {
        document.getElementById("file-input").click();
    }

    const hideDisplay = () => {
        if (!currentTrack.paused) {
            document.getElementById("main-title").style.opacity = 0;
            document.getElementById("bottom-bar").style.opacity = 0;
            document.getElementById("play-pause").style.opacity = 0;
            document.getElementById("modal-over-container").style.opacity = 0;
        }
    }

    const showDisplay = () => {
        document.getElementById("main-title").style.opacity = "";
        document.getElementById("bottom-bar").style.opacity = "";
        document.getElementById("play-pause").style.opacity = "";
        document.getElementById("modal-over-container").style.opacity = "";
    }

    let displayStatus;

    const toggleDisplay = () => {
        if (!currentTrack.paused) {
            if (displayStatus === "off") {
                showDisplay();
                displayStatus = "on";
            } else {
                hideDisplay();
                displayStatus = "off";
            } 
        }
    }

    currentTrack.ontimeupdate = () => {
        document.getElementById("progress").style.width = `${(currentTrack.currentTime / currentTrack.duration)*100}%`;
        document.getElementById("progress-left").style.width = `${((currentTrack.duration - currentTrack.currentTime) / currentTrack.duration)*100}%`;
    }

    currentTrack.onpause = () => {
        showDisplay();
    }

}

