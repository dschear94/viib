import { visualizer } from "./visuals/visualizer";


window.onload = function () {
    let setup = false;
    const currentTrack = document.getElementById("audio");

    document.getElementById("file-input-label").onclick = () => {

        // if (!contextCreated) {
        //     contextCreated = true;
        // debugger


            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioCtx.createAnalyser();
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
            barGraph(analyser, d3.interpolateSinebow)
    };

    document.getElementById("file-input").onchange = function () {
        const files = this.files;

        if (files.length > 0) {
            currentTrack.src = URL.createObjectURL(files[0]);
            currentTrack.load();
        }
    };
}

