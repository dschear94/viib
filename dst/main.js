/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dst/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _visuals_visualizer_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visuals/visualizer-2 */ "./src/visuals/visualizer-2.js");
 // import { visualizer1 } from "./visuals/visualizer-1";



window.onload = function () {
  // create initial AudioContext
  var audioCtx = window.AudioContext || window.webkitAudioContext;
  var contextCreated = false;
  var analyser;
  var currentTrack = document.getElementById("audio");

  document.getElementById("file-input-label").onclick = function () {
    if (!contextCreated) {
      contextCreated = true; // context = new AudioContext();

      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      var source = audioCtx.createMediaElementSource(currentTrack);
      source.connect(analyser);
      analyser.fftSize = 2048;
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      document.getElementById("play-pause").onclick = function () {
        currentTrack.play();
      };

      analyser.minDecibels = -105;
      analyser.maxDecibels = -25;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(audioCtx.destination);
      Object(_visuals_visualizer_2__WEBPACK_IMPORTED_MODULE_1__["visualizer1"])(analyser, d3.interpolateBuPu);
    }
  };

  document.getElementById("file-input").onchange = function () {
    var files = this.files;

    if (files.length > 0) {
      currentTrack.src = URL.createObjectURL(files[0]);
      currentTrack.load();
    }
  };
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/visuals/visualizer-2.js":
/*!*************************************!*\
  !*** ./src/visuals/visualizer-2.js ***!
  \*************************************/
/*! exports provided: visualizer1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visualizer1", function() { return visualizer1; });
var visualizer1 = function visualizer1(analyser, colors) {
  analyser.fftSize = 256;
  var h = window.innerHeight,
      w = window.innerWidth;
  var svg = d3.select("body").append("svg").attr("width", w).attr("height", h).append("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
  var gradient = svg.append("defs").append("linearGradient").attr("id", "gradient").attr("x1", "0%").attr("y1", "20%").attr("x2", "20%").attr("y2", "100%");
  gradient.append("stop").attr("offset", "20%").attr("stop-color", "#ccf");
  gradient.append("stop").attr("offset", "50%").attr("stop-color", "#1C425C");
  gradient.append("stop").attr("offset", "100%").attr("stop-color", "#19162B");
  var dataArray = new Uint8Array(analyser.frequencyBinCount); // could use transparent gradient overlay to vary raindrop color
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
    return "M" + r + ",0" + "A" + r + "," + r + " 0 1,1 " + -r + ",0" + "C" + -r + "," + -r + " 0," + -r + " 0," + -3 * r + "C0," + -r + " " + r + "," + -r + " " + r + ",0" + "Z";
  }

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(dataArray);
    svg.selectAll("path").data(dataArray).enter().append("path").attr("fill", "url(#gradient)").attr("d", function (d) {
      return raindrop(d);
    }).attr("transform", function (d) {
      return "rotate(" + d + ")" + "translate(" + (h / 4 + Math.random() * h / 6) + ",0)" + "rotate(90)";
    });
  }

  renderFrame();
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlzdWFscy92aXN1YWxpemVyLTIuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiYXVkaW9DdHgiLCJBdWRpb0NvbnRleHQiLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJjb250ZXh0Q3JlYXRlZCIsImFuYWx5c2VyIiwiY3VycmVudFRyYWNrIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9uY2xpY2siLCJjcmVhdGVBbmFseXNlciIsInNvdXJjZSIsImNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZSIsImNvbm5lY3QiLCJmZnRTaXplIiwiYnVmZmVyTGVuZ3RoIiwiZnJlcXVlbmN5QmluQ291bnQiLCJkYXRhQXJyYXkiLCJVaW50OEFycmF5IiwiZ2V0Qnl0ZVRpbWVEb21haW5EYXRhIiwicGxheSIsIm1pbkRlY2liZWxzIiwibWF4RGVjaWJlbHMiLCJzbW9vdGhpbmdUaW1lQ29uc3RhbnQiLCJkZXN0aW5hdGlvbiIsInZpc3VhbGl6ZXIxIiwiZDMiLCJpbnRlcnBvbGF0ZUJ1UHUiLCJvbmNoYW5nZSIsImZpbGVzIiwibGVuZ3RoIiwic3JjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwibG9hZCIsImNvbG9ycyIsImgiLCJpbm5lckhlaWdodCIsInciLCJpbm5lcldpZHRoIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsImdyYWRpZW50IiwicmFpbmRyb3AiLCJzaXplIiwiciIsIk1hdGgiLCJzcXJ0IiwiUEkiLCJyZW5kZXJGcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImdldEJ5dGVGcmVxdWVuY3lEYXRhIiwic2VsZWN0QWxsIiwiZGF0YSIsImVudGVyIiwiZCIsInJhbmRvbSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FB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LENBRW9CLE1BRnBCLEVBR0tDLElBSEwsQ0FHVSxNQUhWLEVBR2tCLGdCQUhsQixFQUlLQSxJQUpMLENBSVUsR0FKVixFQUllLFVBQVVjLENBQVYsRUFBYTtBQUFFLGFBQU9aLFFBQVEsQ0FBQ1ksQ0FBRCxDQUFmO0FBQW9CLEtBSmxELEVBS0tkLElBTEwsQ0FLVSxXQUxWLEVBS3VCLFVBQVVjLENBQVYsRUFBYTtBQUM1QixhQUFPLFlBQVlBLENBQVosR0FBZ0IsR0FBaEIsR0FDRCxZQURDLElBQ2VyQixDQUFDLEdBQUcsQ0FBSixHQUFRWSxJQUFJLENBQUNVLE1BQUwsS0FBZ0J0QixDQUFoQixHQUFvQixDQUQzQyxJQUNnRCxLQURoRCxHQUVELFlBRk47QUFHSCxLQVRMO0FBVUg7O0FBQ0RlLGFBQVc7QUFDZCxDQXhFTSxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuXG4vLyBpbXBvcnQgeyB2aXN1YWxpemVyMSB9IGZyb20gXCIuL3Zpc3VhbHMvdmlzdWFsaXplci0xXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyMSB9IGZyb20gXCIuL3Zpc3VhbHMvdmlzdWFsaXplci0yXCI7XG5cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbi8vIGNyZWF0ZSBpbml0aWFsIEF1ZGlvQ29udGV4dFxuICAgIGxldCBhdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICBsZXQgY29udGV4dENyZWF0ZWQgPSBmYWxzZTtcbiAgICBsZXQgYW5hbHlzZXI7XG5cblxuICAgIGNvbnN0IGN1cnJlbnRUcmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXVkaW9cIik7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGUtaW5wdXQtbGFiZWxcIikub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFjb250ZXh0Q3JlYXRlZCkge1xuICAgICAgICAgICAgY29udGV4dENyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICAgICAgICAgIGF1ZGlvQ3R4ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XG4gICAgICAgICAgICBhbmFseXNlciA9IGF1ZGlvQ3R4LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBhdWRpb0N0eC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoY3VycmVudFRyYWNrKTtcbiAgICAgICAgICAgIHNvdXJjZS5jb25uZWN0KGFuYWx5c2VyKTtcbiAgICAgICAgICAgIGFuYWx5c2VyLmZmdFNpemUgPSAyMDQ4O1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyTGVuZ3RoID0gYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgICAgICAgICBjb25zdCBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xuICAgICAgICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKGRhdGFBcnJheSk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXktcGF1c2VcIikub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJhY2sucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW5hbHlzZXIubWluRGVjaWJlbHMgPSAtMTA1O1xuICAgICAgICAgICAgYW5hbHlzZXIubWF4RGVjaWJlbHMgPSAtMjU7XG4gICAgICAgICAgICBhbmFseXNlci5zbW9vdGhpbmdUaW1lQ29uc3RhbnQgPSAwLjg7XG4gICAgICAgICAgICBzb3VyY2UuY29ubmVjdChhdWRpb0N0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgICAgICB2aXN1YWxpemVyMShhbmFseXNlciwgZDMuaW50ZXJwb2xhdGVCdVB1KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGUtaW5wdXRcIikub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5maWxlcztcblxuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY3VycmVudFRyYWNrLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZXNbMF0pO1xuICAgICAgICAgICAgY3VycmVudFRyYWNrLmxvYWQoKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImV4cG9ydCBjb25zdCB2aXN1YWxpemVyMSA9IGZ1bmN0aW9uIChhbmFseXNlciwgY29sb3JzKSB7XG5cbiAgICBhbmFseXNlci5mZnRTaXplID0gMjU2O1xuXG4gICAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgdyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgdmFyIHN2ZyA9IGQzLnNlbGVjdChcImJvZHlcIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgdylcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3IC8gMiArIFwiLFwiICsgaCAvIDIgKyBcIilcIik7XG5cbiAgICB2YXIgZ3JhZGllbnQgPSBzdmcuYXBwZW5kKFwiZGVmc1wiKS5hcHBlbmQoXCJsaW5lYXJHcmFkaWVudFwiKVxuICAgICAgICAuYXR0cihcImlkXCIsIFwiZ3JhZGllbnRcIilcbiAgICAgICAgLmF0dHIoXCJ4MVwiLCBcIjAlXCIpXG4gICAgICAgIC5hdHRyKFwieTFcIiwgXCIyMCVcIilcbiAgICAgICAgLmF0dHIoXCJ4MlwiLCBcIjIwJVwiKVxuICAgICAgICAuYXR0cihcInkyXCIsIFwiMTAwJVwiKTtcblxuICAgIGdyYWRpZW50LmFwcGVuZChcInN0b3BcIilcbiAgICAgICAgLmF0dHIoXCJvZmZzZXRcIiwgXCIyMCVcIilcbiAgICAgICAgLmF0dHIoXCJzdG9wLWNvbG9yXCIsIFwiI2NjZlwiKTtcblxuICAgIGdyYWRpZW50LmFwcGVuZChcInN0b3BcIilcbiAgICAgICAgLmF0dHIoXCJvZmZzZXRcIiwgXCI1MCVcIilcbiAgICAgICAgLmF0dHIoXCJzdG9wLWNvbG9yXCIsIFwiIzFDNDI1Q1wiKTtcblxuICAgIGdyYWRpZW50LmFwcGVuZChcInN0b3BcIilcbiAgICAgICAgLmF0dHIoXCJvZmZzZXRcIiwgXCIxMDAlXCIpXG4gICAgICAgIC5hdHRyKFwic3RvcC1jb2xvclwiLCBcIiMxOTE2MkJcIik7XG5cbiAgICBjb25zdCBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudCk7XG5cbiAgICAvLyBjb3VsZCB1c2UgdHJhbnNwYXJlbnQgZ3JhZGllbnQgb3ZlcmxheSB0byB2YXJ5IHJhaW5kcm9wIGNvbG9yXG4gICAgLy8gc3ZnLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAvLyAgICAgLmRhdGEoZGF0YUFycmF5KVxuICAgIC8vICAgICAuZW50ZXIoKS5hcHBlbmQoXCJwYXRoXCIpXG4gICAgLy8gICAgIC5hdHRyKFwiZmlsbFwiLCBcInVybCgjZ3JhZGllbnQpXCIpXG4gICAgLy8gICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbiAoKSB7IHJldHVybiByYWluZHJvcChkKTsgfSlcbiAgICAvLyAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBcInJvdGF0ZShcIiArIGQgKyBcIilcIlxuICAgIC8vICAgICAgICAgICAgICsgXCJ0cmFuc2xhdGUoXCIgKyAoaCAvIDQgKyBNYXRoLnJhbmRvbSgpICogaCAvIDYpICsgXCIsMClcIlxuICAgIC8vICAgICAgICAgICAgICsgXCJyb3RhdGUoOTApXCI7XG4gICAgLy8gICAgIH0pO1xuXG4gICAgLy8gc2l6ZSBpcyBsaW5lYXJseSBwcm9wb3J0aW9uYWwgdG8gc3F1YXJlIHBpeGVscyAobm90IGV4YWN0LCB5ZXQpXG4gICAgZnVuY3Rpb24gcmFpbmRyb3Aoc2l6ZSkge1xuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gTWF0aC5QSSk7XG4gICAgICAgIHJldHVybiBcIk1cIiArIHIgKyBcIiwwXCJcbiAgICAgICAgICAgICsgXCJBXCIgKyByICsgXCIsXCIgKyByICsgXCIgMCAxLDEgXCIgKyAtciArIFwiLDBcIlxuICAgICAgICAgICAgKyBcIkNcIiArIC1yICsgXCIsXCIgKyAtciArIFwiIDAsXCIgKyAtciArIFwiIDAsXCIgKyAtMyAqIHJcbiAgICAgICAgICAgICsgXCJDMCxcIiArIC1yICsgXCIgXCIgKyByICsgXCIsXCIgKyAtciArIFwiIFwiICsgciArIFwiLDBcIlxuICAgICAgICAgICAgKyBcIlpcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJGcmFtZSgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckZyYW1lKTtcbiAgICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZGF0YUFycmF5KTtcblxuICAgICAgICBzdmcuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgLmRhdGEoZGF0YUFycmF5KVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwidXJsKCNncmFkaWVudClcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gcmFpbmRyb3AoZCkgfSlcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicm90YXRlKFwiICsgZCArIFwiKVwiXG4gICAgICAgICAgICAgICAgICAgICsgXCJ0cmFuc2xhdGUoXCIgKyAoaCAvIDQgKyBNYXRoLnJhbmRvbSgpICogaCAvIDYpICsgXCIsMClcIlxuICAgICAgICAgICAgICAgICAgICArIFwicm90YXRlKDkwKVwiO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlckZyYW1lKCk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==