(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{79:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(1),c=r(39);function a(e){return n.createElement("div",{className:"stopwatch-page-header cui-margin-bottom"},n.createElement("div",{className:"cui-container cui-center cui-background-default"},n.createElement("div",{className:"cui-padding-large-vertical"},e.icon&&n.createElement("div",{className:"cui-flex-center cui-margin-bottom"},n.createElement("span",{"cui-icon":e.icon})),n.createElement("h1",{className:"cui-h1 cui-text-center cui-margin-remove-bottom cui-anim-fade-in"},e.title),n.createElement("p",{className:"cui-text-center cui-text-muted cui-scale-y-in cui-animation-delay cui-margin-large-bottom"},e.description))),n.createElement(c.a,null))}},80:function(e,t,r){"use strict";r.d(t,"a",(function(){return p}));var n=r(3),c=r(1),a=r(21),i=r(4),o=r(79);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,c=!1,a=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){c=!0,a=e}finally{try{n||null==o.return||o.return()}finally{if(c)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function p(e){var t=i.a.getRoute(e.routeName),r=m(c.useState(t.name),2),u=r[0],s=r[1];function f(e){Object(n.e)(e)&&(Object(a.o)(t.name),Object(a.n)(t.name),s(e))}return c.useEffect((function(){Object(a.o)(t.name),Object(a.n)(t.name)}),[]),c.createElement(c.Fragment,null,c.createElement(o.a,{title:u,icon:t.icon,description:t.description}),c.createElement("div",{className:"stopwatch-content-width cui-margin-top"},Object(a.e)(e.children).map((function(e){return"string"==typeof e.type?c.cloneElement(e,l({},e.props)):c.cloneElement(e,l({setPageTitle:f},e.props))}))))}},91:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return b}));var n=r(1);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,c=!1,a=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){c=!0,a=e}finally{try{n||null==o.return||o.return()}finally{if(c)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function l(e,t){var r=o(n.useState({response:void 0,error:void 0,loading:!1}),2),c=r[0],i=r[1];return n.useEffect((function(){i(a(a({},c),{},{loading:!0})),fetch(e,t).then((function(e){return e.json()})).then((function(e){i({error:void 0,response:e,loading:!1})})).catch((function(e){i({error:e,response:void 0,loading:!1})}))}),[]),c}function s(){return n.createElement("div",{className:"cui-height-1-1 cui-width-1-1 cui-flex-center"},n.createElement("span",null,"Loading..."))}function m(e){var t="cui-flex-center";return e.modifiers&&(t+=" "+e.modifiers),n.createElement("div",{className:t},n.createElement("span",{className:"cui-text-error"},e.message))}function f(e){return n.createElement("div",{className:"cui-section"},n.createElement("h2",{className:"cui-h2",id:e.section.id},e.section.name),e.section.content&&e.section.content.map((function(e,t){return n.createElement(p,{key:t,paragraph:e})})))}function p(e){return n.createElement("div",{className:""},e.paragraph.header&&n.createElement("h3",{className:"cui-h3"},e.paragraph.header),e.paragraph.text&&n.createElement("p",null,e.paragraph.text),e.paragraph.list&&n.createElement("ul",{className:"cui-list cui-bullet-shade"},e.paragraph.list.map((function(e,t){return n.createElement("li",{key:t},e)}))))}var d=r(80);function b(){return n.createElement(d.a,{routeName:"help"},n.createElement(y,{key:"help"}))}function y(){var e=l("/static/docs/help.json");return n.useEffect((function(){})),e.error?n.createElement(m,{message:e.error.message}):e.loading||!e.response?n.createElement(s,null):n.createElement(h,{doc:e.response})}function h(e){return n.createElement(n.Fragment,null,n.createElement("div",{className:"cui-section"},n.createElement("h2",{className:"cui-h2"},"Contents"),n.createElement("ul",{className:"cui-list"},e.doc.sections.map((function(e){return n.createElement("li",{key:e.id},n.createElement("a",{className:"cui-link cui-accent",href:"#"+e.id},e.name))})))),e.doc.sections.map((function(e){return n.createElement(f,{key:e.id,section:e})})),n.createElement("div",{className:""},"Version: ",e.doc.version))}}}]);
//# sourceMappingURL=stopwatch.7.js.map