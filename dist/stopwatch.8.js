(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{81:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var r=n(1),a=n(12),i=n(20),c=n(21);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,i=void 0;try{for(var c,o=e[Symbol.iterator]();!(r=(c=o.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(){var e=s(r.useState(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},a.c)),2),t=e[0],n=e[1];function l(){window.$settingsFlow.perform(i.a.GET_SETTINGS)}function f(e){n(e),Object(c.m)(e.darkMode)}return r.useEffect((function(){var e=window.$settingsFlow.subscribe(i.a.GET_SETTINGS,{finish:f}),t=window.$settingsFlow.subscribe(i.a.SET_SETTINGS,{finish:l});return l(),function(){window.$settingsFlow.unsubscribe(i.a.GET_SETTINGS,e.id),window.$settingsFlow.unsubscribe(i.a.SET_SETTINGS,t.id)}}),[t.darkMode,t.soundEnabled]),[t,function(e){window.$settingsFlow.perform(i.a.SET_SETTINGS,e)}]}},86:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(1),a=n(13),i=n(8);var c=Object(i.i)((function(e){var t=e.history;return r.createElement("button",{className:"cui-button cui-accent",onClick:function(){return t.goBack()}},"Go Back")}));function o(e){var t;return r.createElement("div",{className:e.classes},r.createElement("div",null,r.createElement("h2",{className:"cui-h2 cui-text-center cui-text-error"},e.message),r.createElement("div",{className:""},r.createElement("div",{className:"cui-flex cui-center"},r.createElement(a.b,{to:"/",className:"cui-button cui-margin-small-right"},"Go Home"),null!==(t=e.goBack)&&void 0!==t?t:r.createElement(c,null)))))}},88:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return te}));var r=n(1),a=n(8),i=n(3);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),e}function l(e,t){var n=t.get(e);if(!n)throw new TypeError("attempted to get private field on non-instance");return n.get?n.get.call(e):n.value}function f(e,t,n){var r=t.get(e);if(!r)throw new TypeError("attempted to set private field on non-instance");if(r.set)r.set.call(e,n);else{if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=n}return n}var d=new WeakMap,m=function(){function e(){o(this,e),d.set(this,{writable:!0,value:void 0}),f(this,d,screen)}return s(e,[{key:"activate",value:function(){l(this,d).keepAwake=!0}},{key:"release",value:function(){l(this,d).keepAwake=!1}}]),e}(),p=function(){function e(){o(this,e),c(this,"element",void 0),this.element=void 0}return s(e,[{key:"activate",value:function(){this.element||(this.element=this.createElement("/static/video/Screen.mp4"),document.body.appendChild(this.element))}},{key:"release",value:function(){this.element&&(this.element.remove(),this.element=void 0)}},{key:"createElement",value:function(e){var t=document.createElement("video");return t.autoplay=!0,t.muted=!0,t.loop=!0,t.src=e,t.classList.add("loop-screen"),t.textContent="Not Supported",t}}]),e}(),b=new WeakMap,h=function(){function e(){o(this,e),b.set(this,{writable:!0,value:void 0}),f(this,b,this.getToggle())}return s(e,[{key:"activate",value:function(){l(this,b).activate()}},{key:"release",value:function(){l(this,b).release()}},{key:"getToggle",value:function(){return"keepAwake"in screen?new m:new p}}]),e}();function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e,t){var n=t.get(e);if(!n)throw new TypeError("attempted to get private field on non-instance");return n.get?n.get.call(e):n.value}function y(e,t,n){var r=t.get(e);if(!r)throw new TypeError("attempted to set private field on non-instance");if(r.set)r.set.call(e,n);else{if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=n}return n}var g="RUNNING",E="STOPPED",S="PAUSED",O=new WeakMap,j=new WeakMap,k=new WeakMap,T=new WeakMap,I=new WeakMap,P=new WeakMap,x=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),O.set(this,{writable:!0,value:void 0}),j.set(this,{writable:!0,value:void 0}),k.set(this,{writable:!0,value:void 0}),T.set(this,{writable:!0,value:void 0}),I.set(this,{writable:!0,value:void 0}),P.set(this,{writable:!0,value:void 0}),y(this,j,0),y(this,k,0),y(this,T,!1),y(this,I,E),y(this,P,void 0)}var t,n,r;return t=e,(n=[{key:"onTick",value:function(e){y(this,O,e)}},{key:"tick",value:function(){var e=this;y(this,P,setTimeout((function(){try{w(e,I)===g&&w(e,O)&&w(e,O).call(e,w(e,j),w(e,k),e)?(w(e,T)?(y(e,j,0),y(e,T,!1)):(y(e,j,w(e,j)+1),y(e,k,w(e,k)+1)),e.tick()):w(e,I)!==S&&e.stop()}catch(t){console.error("An error occured on stopwatch tick"),console.error(t),e.stop()}}),1e3))}},{key:"reset",value:function(){y(this,T,!0)}},{key:"start",value:function(){return w(this,I)!==g&&(y(this,j,0),y(this,I,g),this.tick(),!0)}},{key:"stop",value:function(){return w(this,I)===g&&(this.finish(),y(this,I,E),!0)}},{key:"pause",value:function(){return w(this,I)===g&&(y(this,I,S),!0)}},{key:"resume",value:function(){return w(this,I)===S&&(y(this,I,g),this.tick(),!0)}},{key:"finish",value:function(){w(this,P)&&(clearTimeout(w(this,P)),y(this,P,void 0)),y(this,j,0),y(this,k,0)}},{key:"getState",value:function(){return w(this,I)}}])&&v(t.prototype,n),r&&v(t,r),e}(),N=n(21),A=n(35),C=n(86),B=n(81);function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,i=void 0;try{for(var c,o=e[Symbol.iterator]();!(r=(c=o.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function M(e){!function(e,t){function n(){t&&e&&t(e)}r.useEffect((function(){return e&&window.addEventListener("resize",n),function(){e&&window.removeEventListener("resize",n)}}),[e])}(e,(function(e){Object(i.e)(e)&&a(c(e))}));var t=R(r.useState(c(e)),2),n=t[0],a=t[1];function c(e){return!!Object(i.e)(e)&&(e&&e.clientHeight>=(screen.availHeight||screen.height)-30&&e.clientWidth>=(screen.availWidth||screen.width)-30)}return r.useEffect((function(){}),[n]),n}function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function G(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $(e){var t=r.useRef(null),n=r.useRef(null),a=r.useRef(null),i=r.useRef(null),c=r.useRef(null),o=r.useRef(null),u=r.useRef(null),s=r.useRef(null),l=r.useRef(null),f=r.useRef(null),d=r.useRef(null),m=r.useRef(null),p=new(0,window.AudioContext);function b(e){var r=void 0;switch(e){case"countdown":r=t.current;break;case"end":r=o.current;break;case"exercise":r=n.current;break;case"warmup":r=a.current;break;case"break":r=i.current;break;case"cooldown":r=c.current}r&&(r.currentTime=0,p.resume(),r.play())}return r.useEffect((function(){t.current&&(s.current=p.createMediaElementSource(t.current),s.current.connect(p.destination)),a.current&&(f.current=p.createMediaElementSource(a.current),f.current.connect(p.destination)),n.current&&(l.current=p.createMediaElementSource(n.current),l.current.connect(p.destination)),i.current&&(d.current=p.createMediaElementSource(i.current),d.current.connect(p.destination)),c.current&&(m.current=p.createMediaElementSource(c.current),m.current.connect(p.destination)),o.current&&(u.current=p.createMediaElementSource(o.current),u.current.connect(p.destination))}),[]),r.createElement(r.Fragment,null,e.children&&Object(N.e)(e.children).map((function(e){return r.cloneElement(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){G(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({playSound:b},e.props))})),r.createElement("audio",{ref:t,id:"stopwatch-countdown",src:"/static/audio/stopwatch_countdown.mp3"}),r.createElement("audio",{ref:n,id:"stopwatch-exercise",src:"/static/audio/stopwatch_exercise.mp3"}),r.createElement("audio",{ref:a,id:"stopwatch-warmup",src:"/static/audio/stopwatch_warmup.mp3"}),r.createElement("audio",{ref:i,id:"stopwatch-break",src:"/static/audio/stopwatch_break.mp3"}),r.createElement("audio",{ref:c,id:"stopwatch-cooldown",src:"/static/audio/stopwatch_cooldown.mp3"}),r.createElement("audio",{ref:o,id:"stopwatch-cooldown",src:"/static/audio/stopwatch_end.mp3"}))}function W(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,i=void 0;try{for(var c,o=e[Symbol.iterator]();!(r=(c=o.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return F(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function U(e){var t="cui-icon-button cui-icon";return e.modifiers&&(t+=" "+e.modifiers),r.createElement("button",{className:t,onClick:e.onClick,"cui-icon":e.icon})}function V(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,i=void 0;try{for(var c,o=e[Symbol.iterator]();!(r=(c=o.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return L(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function z(e){var t=V(r.useState({startBtnText:"Start",startBtnCls:"cui-accent",pauseBtnText:"Pause",isPauseVisible:!1,startBtnIcon:"media_play",pauseBtnIcon:"media_pause"}),2),n=t[0],a=t[1];return r.useEffect((function(){return function(e){switch(e){case g:a({startBtnCls:"cui-error",startBtnIcon:"media_stop",startBtnText:"Stop",isPauseVisible:!0,pauseBtnIcon:"media_pause",pauseBtnText:"Pause"});break;case S:a({startBtnCls:"cui-error",startBtnIcon:"media_stop",startBtnText:"Stop",isPauseVisible:!0,pauseBtnIcon:"media_play",pauseBtnText:"Resume"});break;case E:a({startBtnCls:"cui-accent",startBtnIcon:"media_play",startBtnText:"Start",isPauseVisible:!1,pauseBtnIcon:"media_pause",pauseBtnText:"Pause"})}}(e.playState),function(){}}),[e.playState]),r.createElement("div",{className:"training-control-btns"},r.createElement("a",{className:"cui-icon-button cui-default cui-margin-small","cui-icon":e.soundIcon,onClick:e.onMute}),n.isPauseVisible&&r.createElement(U,{icon:n.pauseBtnIcon,onClick:e.onPauseResume,modifiers:"cui-margin-small cui-large cui-default"}),r.createElement(U,{icon:n.startBtnIcon,onClick:e.onStartStop,modifiers:"cui-large cui-fill "+n.startBtnCls}),r.createElement("a",{className:"cui-icon-button cui-default cui-margin-small","cui-icon":e.fullscreenIcon,onClick:e.onFullScreen}))}function H(e){var t;return r.createElement("div",{className:"rounded-countdown-timer"},r.createElement("p",{className:"cui-margin-remove round-name"},null===(t=e.watchState.round)||void 0===t?void 0:t.name),r.createElement("span",{className:"cui-block cui-text-muted cui-text-small round-count"},"Round ",e.watchState.roundIdx+1,"/",e.watchState.roundTotal),r.createElement("span",{className:"cui-svg total-circle-progress","cui-circle-progress":e.watchState.trainingProgress},r.createElement("div",{className:""},r.createElement("span",{className:"cui-svg current-circle-progress","cui-circle-progress":e.watchState.roundProgress},r.createElement("div",null,r.createElement("span",{className:"cui-svg countdown-circle-progress","cui-circle-progress":e.watchState.progress},r.createElement("div",null,r.createElement("span",{className:"cui-block cui-text-small"},e.watchState.actionIdx+1),r.createElement("h1",{className:"cui-h1 cui-margin-remove "+e.watchState.timerCls},e.watchState.timer))))))))}function J(e){return r.createElement("div",null,r.createElement("div",{className:"cui-flex-center"},r.createElement("progress",{className:"cui-progress cui-small cui-success width-100",value:e.watchState.trainingProgress,max:"100"})),r.createElement("h1",{className:"cui-h1 countdown-timer-size "+e.watchState.timerCls},e.watchState.timer),r.createElement("div",{className:"cui-flex-center"},r.createElement("progress",{className:"cui-progress cui-small width-100",value:e.watchState.roundProgress,max:"100"})))}function q(e){var t,n,a;return r.createElement("div",{className:"simple-countdown-timer"},r.createElement("p",{className:"cui-margin-remove round-name"},null===(t=e.watchState.round)||void 0===t?void 0:t.name),r.createElement("span",{className:"cui-block cui-text-muted cui-text-small round-count"},"Round ",e.watchState.roundIdx+1,"/",e.watchState.roundTotal),r.createElement("h1",{className:"cui-h1 main-timer "+e.watchState.timerCls},e.watchState.timer),r.createElement("h3",{className:"cui-h2 cui-margin-remove action-name "+Object(N.g)(null===(n=e.watchState.action)||void 0===n?void 0:n.type)},null===(a=e.watchState.action)||void 0===a?void 0:a.name),r.createElement("span",{className:"cui-block cui-text-small action-index"},"Action ",e.watchState.actionIdx+1,"/",e.watchState.actionTotal))}var K=n(42);function Q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Q(Object(n),!0).forEach((function(t){Y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,i=void 0;try{for(var c,o=e[Symbol.iterator]();!(r=(c=o.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ee(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ee(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ee(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function te(){var e,t,n=Z(r.useState({training:void 0}),2),i=n[0],c=n[1],o=Z((e=!1,t=r.useRef(e),r.useEffect((function(){t.current=e}),[]),[t.current,function(e){console.log("Flag: "+e+", Loading: "+t),t.current!=e&&(t.current=e)}]),2),u=o[0],s=o[1],l=Z(r.useState(!1),2),f=l[0],d=l[1],m=Object(a.h)().id;function p(e){e||d(!0);var t=(new A.b).validate(e);t.status?(s(!1),c({training:e})):Object(N.p)("Incorrect training","Training is not correct: ".concat(t.errors.join(", ")))}return r.useEffect((function(){Object(N.o)("Perform training");var e=window.$flow.subscribe("GET_TRAINING",{finish:p});return m>-1&&(s(!0),window.$flow.perform("GET_TRAINING",m)),function(){window.$flow.unsubscribe("GET_TRAINING",e.id)}}),[m]),u?r.createElement(K.a,null):f?r.createElement(C.a,{message:"We couldn't find training",classes:"cui-height-1-1 cui-flex-center"}):i.training?r.createElement(ne,{training:i.training}):r.createElement("span",null)}function ne(e){var t,n=Z(r.useState(""),2),a=n[0],c=n[1];return r.useEffect((function(){Object(N.o)("Perform training");var t=new h;if(e.training){Object(N.o)(e.training.name),Object(N.n)(e.training.name);try{t.activate()}catch(e){c("We could not activate feature to keep your device's screen awake during training performance")}}return function(){t.release()}}),[e.training]),r.createElement(r.Fragment,null,r.createElement($,null,r.createElement(re,{key:null===(t=e.training)||void 0===t?void 0:t.id,callError:function(e){c(e)},training:e.training})),Object(i.e)(a)&&r.createElement("div",{className:"cui-position-float cui-position-bottom cui-position-right app-float-bottom cui-margin-right"},r.createElement("span",{className:"cui-icon cui-error cui-tooltip","cui-icon":"ban","cui-tooltip":a})))}function re(e){var t=Z(function(){var e=W(r.useState(new x),2),t=e[0],n=e[1];return r.useEffect((function(){return console.log("Stopwatch hook init"),function(){console.log("Stopwatch hook end")}}),[]),[t,function(e){t.onTick(e),n(t)}]}(),2),n=t[0],a=t[1],c=Z(r.useState({timer:"-",state:E,timerCls:"",progress:100,roundProgress:100,trainingProgress:100,roundIdx:0,roundTotal:0,actionIdx:0,actionTotal:0,roundDuration:0,totalDuration:0,action:void 0,round:void 0}),2),o=c[0],u=c[1],s=Z(Object(B.a)(),2),l=s[0],f=s[1],d=r.useRef(n);d.current=n;var m=r.useRef(o);m.current=o;var p=r.useRef(l);p.current=l;var b,h=r.useRef(null),v=M(h.current);function w(e){var t=e.rounds[0],n=t.actions[0];u(X(X({},o),{},{round:t,roundIdx:0,roundTotal:e.rounds.length,roundDuration:Object(N.c)(t.actions),actionIdx:0,action:n,actionTotal:t.actions.length,totalDuration:Object(N.h)(e)[1]}))}function y(t,n,r){var a=parseInt(m.current.action.duration),i=a-t,c=Object(N.d)(t,a);return 0===t&&O(m.current.action.type),i>0?(j(r.getState(),{time:i,progress:100-c,ct:t,total:n}),i<=2&&O("countdown"),!0):function(){var t=m.current.actionIdx+1;if(m.current.round.actions.length>t){var n=m.current.round.actions[t];return u(X(X({},m.current),{},{actionIdx:t,action:n})),!0}var r=m.current.roundIdx+1;if(e.training.rounds.length>r){var a=e.training.rounds[r],i=a.actions[0];return u(X(X({},m.current),{},{actionIdx:0,action:i,actionTotal:a.actions.length,round:a,roundIdx:r,roundDuration:Object(N.c)(a.actions)})),!0}return w(e.training),!1}()?(O("countdown"),j(g,{time:0,progress:0,ct:i,total:n}),d.current.reset(),!0):(O("end"),j(E,{time:0,progress:100,ct:0,total:0}),!1)}function O(t){p.current.soundEnabled&&e.playSound&&Object(i.e)(t)&&e.playSound(t)}function j(e,t){if(!Object(i.e)(t)||t.time<0)u(X(X({},m.current),{},{state:e}));else{var n=(o=t.ct,100-Object(N.d)(function(e){return m.current.round.actions.reduce((function(e,t,n){return n<m.current.actionIdx?e+parseInt(t.duration):e}),0)+e}(o),m.current.roundDuration)),r=function(e){return 100-Object(N.d)(e,m.current.totalDuration)}(t.total);u(X(X({},m.current),{},{timer:Object(N.b)(t.time),timerCls:(a=t.time,c=e,c===g&&a>=0&&a<3?"cui-text-warning timer-blink-animation":""),state:e,progress:t.progress,roundProgress:n,trainingProgress:r}))}var a,c,o}return r.useEffect((function(){return e.training&&(w(e.training),a(y)),function(){d.current&&d.current.stop()}}),[e.training,l.soundEnabled]),r.createElement("div",{className:"stopwatch-layout-content cui-background-default",ref:h},r.createElement("div",{className:"cui-height-1-1 cui-overflow-y-auto cui-flex cui-center cui-middle "+(b=o.action,Object(i.e)(b)?Object(N.f)(b.type):"")},r.createElement("div",{className:"stopwatch-content-width cui-text-center cui-flex-center animation-fade-in"},r.createElement("div",null,function(e,t){switch(e){case"simple":return r.createElement(q,{watchState:t});case"circle":return r.createElement(H,{watchState:t});case"test":return r.createElement(J,{watchState:t});default:return r.createElement("div",null)}}(l.countdownView,o)))),r.createElement(z,{playState:o.state,soundIcon:l.soundEnabled?"speaker":"volume_muted",fullscreenIcon:v?"shrink":"expand",onFullScreen:function(){h.current&&(v&&Object(i.c)(),Object(i.f)(h.current))},onStartStop:function(){o.state===E&&n.start()?j(g):o.state!==E&&n.stop()&&(w(e.training),j(E,{time:0,progress:100,ct:0,total:0}))},onPauseResume:function(){o.state===g&&n.pause()?j(S):o.state===S&&n&&n.resume()&&j(g)},onMute:function(){f(X(X({},l),{},{soundEnabled:!l.soundEnabled}))}}))}}}]);
//# sourceMappingURL=stopwatch.8.js.map