(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{F4q1:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("q1tI"),i=n("5BuN");function c(e){return r.createElement("div",{className:"stopwatch-page-header cui-margin-bottom"},r.createElement("div",{className:"cui-container cui-center cui-background-default"},r.createElement("div",{className:"cui-padding-large-vertical"},e.icon&&r.createElement("div",{className:"cui-flex-center cui-margin-bottom"},r.createElement("span",{"cui-icon":e.icon})),r.createElement("h1",{className:"cui-h1 cui-text-center cui-margin-remove-bottom cui-anim-fade-in"},e.title),r.createElement("p",{className:"cui-text-center cui-text-muted cui-scale-y-in cui-animation-delay cui-margin-large-bottom"},e.description))),r.createElement(i.a,null))}},LquK:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return w}));var r=n("q1tI");function i(e){return r.useEffect((function(){}),[e.value,e.name]),r.createElement("div",{className:"cui-flex cui-middle cui-padding-small"},r.createElement("div",{className:"cui-flex-grow"},e.label),r.createElement("div",{className:"cui-input-switch"},r.createElement("input",{type:"checkbox",id:e.name,name:e.name,checked:e.value,onChange:function(t){var n=t.target;e.onUpdate&&e.onUpdate(n.name,n.checked)}}),r.createElement("label",{htmlFor:e.name,className:"cui-content"})))}var c=n("zQbK"),a=n("BGBc");function o(e){var t=r.useRef(void 0);var n=e.modifiers?" "+e.modifiers:"";return r.useEffect((function(){if(!Object(a.e)(e.id))throw new Error("Drop component id was not provieded, but is required!");t.current=window.$cui.get("#"+e.id)})),r.createElement("div",{className:"cui-drop-trigger cui-block"+n},r.createElement("a",{className:"cui-link cui-flex cui-middle cui-width-1-1 cui-padding-small"},r.createElement("span",{className:"cui-flex-grow cui-text-capital cui-margin-right"},e.value),r.createElement("span",{"cui-icon":"chevron_small_down"})),r.createElement("div",{className:"cui-dropdown drop-height","cui-drop":"outClose: Y;autoClose: Y",id:e.id},r.createElement("ul",{className:"cui-drop-nav drop-max-width"},e.items&&e.items.map((function(n,i){return r.createElement("li",{key:n+i},r.createElement("a",{className:"cui-overflow-hidden cui-text-truncate cui-text-capital",onClick:function(){var r;r=n,t.current&&t.current.emit("close"),e.onChange&&r!==e.value&&e.onChange(e.name,r)}},n))})))))}var u=["simple","circle","test"],l=n("Df+x"),s=n("aWFj"),f=n("M7ac"),m=n("WvY0"),d=n("55Ip");function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,c=void 0;try{for(var a,o=e[Symbol.iterator]();!(r=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,c=e}finally{try{r||null==o.return||o.return()}finally{if(i)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function w(){var e=v(Object(c.a)(),2),t=e[0],n=e[1],a=Object(s.a)();function p(e,r){if("soundEnabled"===e||"darkMode"===e||"simpleView"===e){var i=b(b({},t),{},y({},e,r));n(i)}}return r.useEffect((function(){}),[t.darkMode,t.soundEnabled]),r.createElement(r.Fragment,null,r.createElement(m.a,{routeName:"settings"},r.createElement("div",{key:"settings-switches",className:"cui-section stopwatch-content-width"},r.createElement("ul",{className:"cui-list"},r.createElement("li",null,r.createElement(i,{label:"Dark mode",name:"darkMode",value:t.darkMode,onUpdate:p})),r.createElement("li",null,r.createElement(i,{label:"Play sound",name:"soundEnabled",value:t.soundEnabled,onUpdate:p})),r.createElement("li",null,r.createElement("div",{className:"cui-flex cui-middle cui-between cui-padding-small"},r.createElement("span",null,"Countdown timer"),r.createElement(o,{id:"settings-drop",name:"countdownView",value:t.countdownView,items:u,onChange:function(e,r){var i=b(b({},t),{},y({},e,r));n(i)}}))))),r.createElement("div",{key:"settings-devtool",className:"cui-flex cui-center cui-right--s"},a.mode===f.a.DEVELOPMENT&&r.createElement(d.b,{to:l.a.getUrl("devtools"),className:"cui-link"},"Visit DevTools"))))}},WvY0:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n("BGBc"),i=n("q1tI"),c=n("q4m4"),a=n("Df+x"),o=n("F4q1");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,c=void 0;try{for(var a,o=e[Symbol.iterator]();!(r=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,c=e}finally{try{r||null==o.return||o.return()}finally{if(i)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function d(e){var t=a.a.getRoute(e.routeName),n=f(i.useState(t.name),2),u=n[0],s=n[1];function m(e){Object(r.e)(e)&&(Object(c.o)(t.name),Object(c.n)(t.name),s(e))}return i.useEffect((function(){Object(c.o)(t.name),Object(c.n)(t.name)}),[]),i.createElement(i.Fragment,null,i.createElement(o.a,{title:u,icon:t.icon,description:t.description}),i.createElement("div",{className:"stopwatch-content-width cui-margin-top"},Object(c.e)(e.children).map((function(e){return"string"==typeof e.type?i.cloneElement(e,l({},e.props)):i.cloneElement(e,l({setPageTitle:m},e.props))}))))}},zQbK:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var r=n("q1tI"),i=n("cnBG"),c=n("p9Ok"),a=n("q4m4");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,c=void 0;try{for(var a,o=e[Symbol.iterator]();!(r=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,c=e}finally{try{r||null==o.return||o.return()}finally{if(i)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(){var e=l(r.useState(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},i.c)),2),t=e[0],n=e[1];function s(){window.$settingsFlow.perform(c.a.GET_SETTINGS)}function f(e){n(e),Object(a.m)(e.darkMode)}return r.useEffect((function(){var e=window.$settingsFlow.subscribe(c.a.GET_SETTINGS,{finish:f}),t=window.$settingsFlow.subscribe(c.a.SET_SETTINGS,{finish:s});return s(),function(){window.$settingsFlow.unsubscribe(c.a.GET_SETTINGS,e.id),window.$settingsFlow.unsubscribe(c.a.SET_SETTINGS,t.id)}}),[t.darkMode,t.soundEnabled]),[t,function(e){window.$settingsFlow.perform(c.a.SET_SETTINGS,e)}]}}}]);
//# sourceMappingURL=stopwatch.chunk.5.5.6e85215d29a95982c0ed.js.map