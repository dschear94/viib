export const visualizer1 = function (analyser, colors) {

    analyser.fftSize = 256;

    const h = window.innerHeight,
        w = window.innerWidth;

    let svg;

    if (document.getElementById('visualizer-svg')) {
        d3.selectAll("svg > *").remove();
    } else {
        d3.selectAll("svg").remove();
        svg = d3.select('body').append('svg')
            .attr('width', w)
            .attr('height', h)
            .attr('id', 'visualizer-svg');
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let geo = d3.geoGraticule10();
    var canvas = d3.select("canvas").node(),
        context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height;

    var sites = d3.range(100).map(function () { return [Math.random() * width, Math.random() * height]; }),
        cells = d3.voronoi().size([width, height]).polygons(sites),
        formatHex = d3.format("02x");

    var colors = d3.range(256)
        .map(d3.scaleLinear().domain([0, 255]))
        .map(function (c) { return d3.rgb(c); });

    for (var i = 0; i < 256; ++i) {
        context.beginPath();
        cells.forEach(function (cell) {
            drawCell(cell);
            var p0 = cell.shift(),
                p1 = cell[0],
                t = Math.min(0.5, 4 / distance(p0, p1)),
                p2 = [p0[0] * (1 - t) + p1[0] * t, p0[1] * (1 - t) + p1[1] * t];
            cell.push(p2);
        });
        context.fillStyle = "#" + formatHex(i) + "0000";
        context.fill();
    }

    var source = context.getImageData(0, 0, width, height).data,
        targetBuffer = context.createImageData(width, height),
        target = targetBuffer.data;

    for (var i = 0, y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x, i += 4) {
            target[i + 0] =
                target[i + 1] =
                target[i + 2] =
                target[i + 3] = 255;
        }
    }

    context.clearRect(0, 0, width, height);

    d3.timer(function (elapsed) {
        for (var i = 0, y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x, i += 4) {
                var c = colors[Math.floor(source[i] + elapsed / 10) % 256];
                target[i + 0] = c.r;
                target[i + 1] = c.g;
                target[i + 2] = c.b;
            }
        }
        context.putImageData(targetBuffer, 0, 0);
    });

    function drawCell(cell) {
        context.moveTo(cell[0][0], cell[0][1]);
        for (var i = 1, n = cell.length; i < n; ++i) context.lineTo(cell[i][0], cell[i][1]);
        context.closePath();
    }

    function distance(a, b) {
        var dx = a[0] - b[0], dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    }
};