export const visualizer1 = function (analyser, colors) {

    analyser.fftSize = 256;

    const h = window.innerHeight,
        w = window.innerWidth;

    var svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var gradient = svg.append("defs").append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "20%")
        .attr("x2", "20%")
        .attr("y2", "100%");

    gradient.append("stop")
        .attr("offset", "20%")
        .attr("stop-color", "#ccf");

    gradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#1C425C");

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#19162B");

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    // could use transparent gradient overlay to vary raindrop color
    // svg.selectAll("path")
    //     .data(dataArray)
    //     .enter().append("path")
    //     .attr("fill", "url(#gradient)")
    //     .attr("d", function () { return raindrop(d); })
    //     .attr("transform", function (d) {
    //         return "rotate(" + d + ")"
    //             + "translate(" + (h / 4 + Math.random() * h / 6) + ",0)"
    //             + "rotate(90)";
    //     });

    // size is linearly proportional to square pixels (not exact, yet)
    function raindrop(size) {
        var r = Math.sqrt(size / Math.PI);
        return "M" + r + ",0"
            + "A" + r + "," + r + " 0 1,1 " + -r + ",0"
            + "C" + -r + "," + -r + " 0," + -r + " 0," + -3 * r
            + "C0," + -r + " " + r + "," + -r + " " + r + ",0"
            + "Z";
    }

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll("path")
            .data(dataArray)
            .enter().append("path")
            .attr("fill", "url(#gradient)")
            .attr("d", function (d) { return raindrop(d) })
            .attr("transform", function (d) {
                return "rotate(" + d + ")"
                    + "translate(" + (h / 4 + Math.random() * h / 6) + ",0)"
                    + "rotate(90)";
            });
    }
    renderFrame();
}