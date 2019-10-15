import "./styles/index.scss";

// import { visualizer1 } from "./visuals/visualizer-1";
import { visualizer1 } from "./visuals/visualizer-2";


window.onload = function () {
// create initial AudioContext
    let audioCtx = window.AudioContext || window.webkitAudioContext;
    let contextCreated = false;
    let analyser;


    const currentTrack = document.getElementById("audio");

    document.getElementById("file-input-label").onclick = () => {
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
                currentTrack.play();
            }
            analyser.minDecibels = -105;
            analyser.maxDecibels = -25;
            analyser.smoothingTimeConstant = 0.8;
            source.connect(audioCtx.destination);
            visualizer1(analyser, d3.interpolateBuPu);
        }
    };

    document.getElementById("file-input").onchange = function () {
        const files = this.files;

        if (files.length > 0) {
            currentTrack.src = URL.createObjectURL(files[0]);
            currentTrack.load();
        }
    };
}

