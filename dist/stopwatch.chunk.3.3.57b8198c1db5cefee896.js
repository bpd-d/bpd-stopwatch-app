(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{F4q1:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n("q1tI"),c=n("5BuN");function r(e){return i.createElement("div",{className:"stopwatch-page-header cui-margin-bottom"},i.createElement("div",{className:"cui-container cui-center cui-background-default"},i.createElement("div",{className:"cui-padding-large-vertical"},e.icon&&i.createElement("div",{className:"cui-flex-center cui-margin-bottom"},i.createElement("span",{"cui-icon":e.icon})),i.createElement("h1",{className:"cui-h1 cui-text-center cui-margin-remove-bottom cui-anim-fade-in"},e.title),i.createElement("p",{className:"cui-text-center cui-text-muted cui-scale-y-in cui-animation-delay cui-margin-large-bottom"},e.description))),i.createElement(c.a,null))}},"K+AP":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n("q1tI");function c(e){return i.createElement(i.Fragment,null,e.errors&&e.errors.length>0&&i.createElement("ul",{className:"cui-list"},e.errors.map((function(e,t){return i.createElement("li",{key:t,className:"cui-animation-fade-in"},i.createElement("span",{className:"cui-text-error"},e))}))))}},NROl:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var i=n("q1tI"),c=n("55Ip"),r=n("Ty5D");var a=Object(r.i)((function(e){var t=e.history;return i.createElement("button",{className:"cui-button cui-accent",onClick:function(){return t.goBack()}},"Go Back")}));function o(e){var t;return i.createElement("div",{className:e.classes},i.createElement("div",null,i.createElement("h2",{className:"cui-h2 cui-text-center cui-text-error"},e.message),i.createElement("div",{className:""},i.createElement("div",{className:"cui-flex cui-center"},i.createElement(c.b,{to:"/",className:"cui-button cui-margin-small-right"},"Go Home"),null!==(t=e.goBack)&&void 0!==t?t:i.createElement(a,null)))))}},VI6j:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n("q1tI");function c(e){var t,n,c=null!==(t=e.cancelLabel)&&void 0!==t?t:"Cancel",r=null!==(n=e.confirmLabel)&&void 0!==n?n:"OK";return i.createElement("div",{className:"cui-dropdown cui-section drop-max-width","cui-drop":"outClose: Y; autoClose: Y",id:e.id},i.createElement("p",null,e.message),i.createElement("div",{className:"cui-flex cui-right cui-margin-top"},i.createElement("button",{className:"cui-button cui-small",onClick:function(){window.$cui.get("#"+e.id).emit("close"),e.onCancel&&e.onCancel()}},c),i.createElement("button",{className:"cui-button cui-accent cui-small cui-margin-small-left",onClick:function(){window.$cui.get("#"+e.id).emit("close"),e.onConfirm()}},r)))}},gPDq:function(e,t,n){"use strict";n.r(t);var i=n("q1tI"),c=n("Ty5D"),r=n("T6Sh"),a=n("BGBc"),o=n("aXcz"),l=n("q4m4"),u=n("M7ac"),s=n("cnBG"),m=n("Kb2C"),d=n("Df+x");var f=n("NROl"),b=n("F4q1"),p=n("yC2Q");function E(e){return i.useEffect((function(){}),[e.items]),i.createElement("ul",{className:"cui-list cui-inline"},e.items&&e.items.length>0&&e.items.map((function(e,t){return i.createElement(v,{key:e.icon,icon:e.icon,label:e.label,onClick:e.onClick,modifiers:e.modifiers})})))}function v(e){var t,n="cui-button cui-rounded "+(null!==(t=e.modifiers)&&void 0!==t?t:"");return i.createElement("li",{className:"cui-padding-small-horizontal"},i.createElement("a",{className:n,"cui-icon":e.icon,onClick:e.onClick},i.createElement(p.a,{label:e.label})))}var g=n("vlay");function w(e){return i.createElement("div",{className:"cui-flex cui-middle"},i.createElement("div",{className:"cui-flex-center cui-margin-right"},i.createElement(g.a,{type:e.action.type})),i.createElement("div",{className:"cui-flex-grow"},i.createElement("div",{className:""},e.action.name),i.createElement("div",{className:"cui-text-muted"},"Lasts ",e.action.duration," seconds")))}function y(e){return i.createElement("div",{className:"cui-drop-trigger cui-block"},i.createElement("a",{className:"cui-link cui-block"},i.createElement(h,{action:e.value})),i.createElement("div",{className:"cui-dropdown drop-height","cui-drop":"outClose: Y;",id:e.id},i.createElement("ul",{className:"cui-drop-nav drop-max-width"},e.actions&&e.actions.map((function(t){return i.createElement("li",{key:t.id},i.createElement("a",{className:"cui-overflow-hidden cui-text-truncate",onClick:function(){!function(t){!e.onSelect||e.value&&e.value.id===t.id||e.onSelect(t),window.$cui.get("#"+e.id).emit("close")}(t)}},i.createElement(w,{action:t})))})))))}function h(e){return i.createElement("div",{className:"cui-flex cui-middle cui-width-1-1"},i.createElement("div",{className:"cui-flex-grow"},e.action?i.createElement(w,{action:e.action}):i.createElement("span",{className:"cui-inline-block cui-padding-small"},"No action selected")),i.createElement("span",{"cui-icon":"chevron_small_down"}))}var N=n("Rb10"),O=n("K+AP");function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e){return function(e){if(Array.isArray(e))return D(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||S(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],i=!0,c=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(i=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==o.return||o.return()}finally{if(c)throw r}}return n}(e,t)||S(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){if(e){if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function I(e){var t=A(Object(i.useState)({actions:[],selected:null,errors:[],name:""}),2),n=t[0],c=t[1];function r(t,i){var r;c(x(x({},n),{},{actions:t,selected:null!==(r=n.selected)&&void 0!==r?r:e.definedActions[0],errors:[],name:i||n.name}))}return i.useEffect((function(){var t=e.round&&e.round.name?e.round.name:Object(s.e)(e.currentCount);return r(Object(a.e)(e.round)?e.round.actions:[],t),function(){}}),[e.round,e.definedActions,e.currentCount]),i.createElement(N.a,{id:"edit-round-dialog",title:"Edit Round",body:i.createElement(i.Fragment,null,i.createElement("div",{className:""},i.createElement("div",{className:"cui-form"},i.createElement("label",{htmlFor:"",className:"cui-form-label"},"Round name"),i.createElement("input",{type:"text",className:"cui-input",placeholder:"Round name",value:n.name,onChange:function(e){var t=e.target.value,i=[];Object(a.e)(t)||i.push("Name cannot be empty"),c(x(x({},n),{},{errors:i,name:t}))}})),i.createElement("div",{className:"cui-margin-top"},"Actions"),i.createElement("ul",{className:"cui-list cui-margin-top edit-round-dialog-body"},n.actions&&n.actions.map((function(e,t){return i.createElement("li",{key:e.id+t,className:"animation-fade-in"},i.createElement("div",{className:"cui-flex cui-middle"},i.createElement("div",{className:"cui-flex-grow"},i.createElement(w,{action:e})),i.createElement("ul",{className:"cui-icon-nav"},i.createElement("li",null,i.createElement("a",{className:"cui-icon","cui-icon":"swap",onClick:function(){!function(e){if(Object(a.a)(n.selected,n.actions)){var t=k(n.actions);t[e]=n.selected,c(x(x({},n),{},{actions:t}))}}(t)}})),i.createElement("li",null,i.createElement("a",{className:"cui-icon","cui-icon":"trash",onClick:function(){!function(e){var t=k(n.actions);t.splice(e,1),r(t)}(t)}})))))}))),i.createElement("div",{className:"cui-flex cui-middle cui-nowrap cui-margin-top"},i.createElement("div",{className:"cui-flex-grow"},i.createElement(y,{value:n.selected,actions:e.definedActions,onSelect:function(e){e&&c(x(x({},n),{},{selected:e}))},name:"actioonaa",id:"round-select-drop"})),i.createElement("div",{className:"cui-padding-horizontal"},i.createElement("button",{"cui-icon":"plus",className:"cui-icon cui-icon-button",onClick:function(){n.selected&&r([].concat(k(n.actions),[n.selected]))}}))),i.createElement(O.a,{errors:n.errors}))),footer:i.createElement("div",{className:"cui-flex cui-right"},i.createElement("button",{className:"cui-button cui-margin-small-right","cui-close":""},"Cancel"),i.createElement("button",{className:"cui-button cui-accent",onClick:function(){if(e.onSave){var t={actions:k(n.actions),name:n.name},i=(new m.c).validate(t);if(i.status)return e.onSave(t,e.index),void c(x(x({},n),{},{name:Object(s.e)(e.currentCount+1),selected:null,actions:[]}));c(x(x({},n),{},{errors:i.errors}))}}},"Save"))})}var T=n("VI6j");function R(e){return i.createElement("div",{className:"cui-flex cui-middle cui-nowrap"},i.createElement("div",{className:"cui-flex-grow"},i.createElement("div",null,i.createElement("span",{className:"cui-text-bold"},e.round.name)),i.createElement("div",{className:"cui-text-muted cui-text-small cui-text-no-wrap"},i.createElement("span",null,e.round.actions.length," actions, ",Object(l.i)(Object(l.c)(e.round.actions))))),i.createElement("ul",{className:"cui-icon-nav cui-flex-shrink"},!e.isFirst&&i.createElement("li",null,i.createElement("a",{className:"cui-icon","cui-icon":"chevron_up",onClick:function(){e.onMoveUp(e.round,e.index)},"cui-tooltip":"Move up"})),!e.isLast&&i.createElement("li",null,i.createElement("a",{className:"cui-icon","cui-icon":"chevron_down",onClick:function(){e.onMoveDown(e.round,e.index)},"cui-tooltip":"Move down"})),i.createElement("li",null,i.createElement("a",{className:"cui-icon","cui-icon":"copy",onClick:function(){e.onClone(e.round,e.index)},"cui-tooltip":"Clone"})),i.createElement("li",null,i.createElement("a",{className:"cui-icon","cui-icon":"edit",onClick:function(){e.onEdit(e.round,e.index)},"cui-tooltip":"Edit"})),i.createElement("li",null,i.createElement("div",{className:"cui-drop-trigger"},i.createElement("a",{className:"cui-icon","cui-icon":"trash"}),i.createElement(T.a,{id:"delete-confirm-drop",message:"Do you really want to delete this round?",cancelLabel:"No",confirmLabel:"Yes",onConfirm:function(){e.onDelete(e.round,e.index)}})))))}function P(e){return i.createElement("div",{className:"cui-flex cui-right cui-middle"},i.createElement("button",{className:"cui-button",onClick:e.onCancel},"Cancel"),i.createElement("button",{className:"cui-button cui-accent cui-margin-small-left",onClick:e.onConfirm},e.confirmLabel))}function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(Object(n),!0).forEach((function(t){F(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],i=!0,c=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(i=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==o.return||o.return()}finally{if(c)throw r}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return L(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function G(e){var t=i.useMemo((function(){return Object(l.j)(e.actions)}),[e.actions]),n=_(i.useState({warmup:t.warmup?t.warmup[0]:null,exercise:t.exercise?t.exercise[0]:null,break:t.break?t.break[0]:null,cooldown:t.cooldown?t.cooldown[0]:null}),2),c=n[0],r=n[1],a=_(i.useState(1),2),o=a[0],u=a[1];return i.useEffect((function(){return r({warmup:t.warmup?t.warmup[0]:null,break:t.break?t.break[0]:null,exercise:t.exercise?t.exercise[0]:null,cooldown:t.cooldown?t.cooldown[0]:null}),function(){}}),[e.actions]),i.createElement(N.a,{title:"Quick Round",id:e.id,body:i.createElement(q,{actions:t,onUpdate:function(e,t){r($($({},c),{},F({},t,e)))},data:c,count:o,onCounterUpdate:function(e){u(e)}}),footer:i.createElement(P,{confirmLabel:"Save",onCancel:function(){window.$cui.get("#"+e.id).emit("close")},onConfirm:function(){if(!(o<1)){var t={name:"Quick",actions:Object(l.a)(c,o)};e.onSave(t)}}})})}function q(e){function t(t){t>0&&t<12&&e.onCounterUpdate(t)}return i.createElement(i.Fragment,null,i.createElement("div",null,i.createElement(M,{actions:e.actions[u.b.WARMUP],value:e.data.warmup,onUpdate:e.onUpdate,type:u.b.WARMUP,id:"warmup-select-drop",name:"warmup-action"})),i.createElement("div",{className:"cui-margin-top"},i.createElement(M,{actions:e.actions[u.b.EXERCISE],value:e.data.exercise,onUpdate:e.onUpdate,type:u.b.EXERCISE,id:"exercise-select-drop",name:"exercise-action"})),i.createElement("div",{className:"cui-form cui-margin-top"},i.createElement(M,{actions:e.actions[u.b.BREAK],value:e.data.break,onUpdate:e.onUpdate,type:u.b.BREAK,id:"break-select-drop",name:"break-action"})),i.createElement("div",{className:"cui-margin-top"},i.createElement(M,{actions:e.actions[u.b.COOLDOWN],value:e.data.cooldown,onUpdate:e.onUpdate,type:u.b.COOLDOWN,id:"cooldown-select-drop",name:"cooldown-action"})),i.createElement("div",{className:"cui-form cui-margin-top"},i.createElement("label",{className:"cui-form-label"},"Number of exercises"),i.createElement("div",{className:"cui-flex cui-middle cui-margin-small-top"},i.createElement("button",{className:"cui-icon-button","cui-icon":"minus",onClick:function(){return t(e.count-1)}}),i.createElement("span",{className:"cui-margin-horizontal"},e.count),i.createElement("button",{className:"cui-icon-button","cui-icon":"plus",onClick:function(){return t(e.count+1)}}))))}function M(e){return i.createElement(i.Fragment,null,i.createElement("span",{className:"cui-text-capital cui-inline-block"},e.type),i.createElement("div",{className:"cui-flex cui-middle cui-margin-small-top"},i.createElement("div",{className:"cui-flex-grow"},i.createElement(y,{value:e.value,actions:e.actions,onSelect:function(t){e.onUpdate(t,e.type)},name:e.name,id:e.id})),i.createElement("button",{className:"cui-icon-button","cui-icon":"close",onClick:function(){e.onUpdate(null,"cooldown")}})))}var B=n("EhjR");function K(e){return function(e){if(Array.isArray(e))return H(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||X(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?W(Object(n),!0).forEach((function(t){z(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Q(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],i=!0,c=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(i=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==o.return||o.return()}finally{if(c)throw r}}return n}(e,t)||X(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function J(e){var t=Q(i.useState({currentIndex:-1,currentCount:0,currentRound:null}),2),n=t[0],c=t[1],r=Q(i.useState({actions:[]}),2),u=r[0],m=r[1];function d(t,i){c(Y(Y({},n),{},{currentIndex:i,currentRound:t,currentCount:e.training&&e.training.rounds?e.training.rounds.length:0})),window.$cui.get("#edit-round-dialog").emit("open")}function f(t,n){var i=K(e.training.rounds);i.splice(n,1),g(i)}function b(t,n){g(Object(l.l)(e.training.rounds,n,n+1))}function p(t,n){g(Object(l.l)(e.training.rounds,n,n-1))}function E(t,n){var i=n+1,c=Object(a.b)(t);g(Object(l.k)(e.training.rounds,i,c))}function v(t,n){var i=[];return n>-1?(i=K(e.training.rounds))[n]=t:i=[].concat(K(e.training.rounds),[t]),i}function g(t){e.onUpdate(Y(Y({},e.training),{},{rounds:t}))}function w(t){var n=t.target.name;["name","description"].includes(n)&&e.onUpdate(Y(Y({},e.training),{},z({},n,t.target.value)))}function y(e){m({actions:[].concat(K(s.b),K(e))})}return i.useEffect((function(){var e=window.$actionsFlow.subscribe(o.a.GET_ALL,{finish:y});return window.$actionsFlow.perform(o.a.GET_ALL),c(Y({},n)),function(){window.$actionsFlow.unsubscribe(o.a.GET_ALL,e.id)}}),[e.training]),i.createElement(i.Fragment,null,i.createElement("div",{className:"cui-container stopwatch-content-width cui-flex-grid cui-child-width-1-1 cui-child-width-1-2--m"},i.createElement("div",{className:"cui-padding-small-right"},i.createElement("div",{className:"cui-form"},i.createElement("label",{htmlFor:"",className:"cui-form-label"},"Name"),i.createElement("input",{type:"text",className:"cui-input stopwatch-input-width",placeholder:"Name",name:"name",value:e.training.name,onChange:w})),i.createElement("div",{className:"cui-form cui-margin-top"},i.createElement("label",{htmlFor:"",className:"cui-form-label"},"Description"),i.createElement("textarea",{className:"cui-textarea stopwatch-input-width stopwatch-text-area",placeholder:"Description",name:"description",rows:5,value:e.training.description,onChange:w}))),i.createElement("div",{className:"cui-padding-small-left"},i.createElement("ul",{className:"cui-list"},e.training&&e.training.rounds.map((function(e,t,n){return i.createElement("li",{key:t,className:"animation-fade-in"},i.createElement(R,{index:t,round:e,onEdit:d,onDelete:f,onMoveUp:p,onMoveDown:b,onClone:E,isFirst:0===t,isLast:t===n.length-1}))})),i.createElement("li",null,i.createElement("div",{className:"cui-flex-grid cui-center cui-child-width-1-2--m"},i.createElement("div",{className:""},i.createElement("button",{className:"cui-button cui-default cui-icon cui-icon-margin cui-width-1-1","cui-icon":"plus",onClick:function(){d(null,-1)}},"Add Round")),i.createElement("div",null,i.createElement("button",{className:"cui-button cui-accent cui-icon cui-icon-margin cui-width-1-1","cui-icon":"bolt",onClick:function(){window.$cui.get("#quick-round-create").emit("open")}},"Quick Round"))))))),i.createElement(I,{index:n.currentIndex,round:n.currentRound,onSave:function(e,t){g(v(e,t)),window.$cui.get("#edit-round-dialog").emit("close")},currentCount:n.currentCount,definedActions:u.actions}),i.createElement(G,{id:"quick-round-create",actions:u.actions,onSave:function(e){g(v(e,-1)),window.$cui.get("#quick-round-create").emit("close")}}))}t.default=Object(c.i)((function(e){var t,n=Q(i.useState(!1),2),o=n[0],s=n[1],p=Q(i.useState({training:{name:"",rounds:[],state:u.c.NEW}}),2),v=p[0],g=p[1],w=Q(i.useState(!1),2),y=w[0],h=w[1],N=Object(c.h)().id;function O(e){e?(Object(l.q)("Saved"),j()):Object(l.p)("Fail","Training was not saved")}function j(){e.history&&e.history.goBack()}function x(e){s(!1),e?(Object(l.o)("Edit "+e.name),g({training:Y({},e)})):h(!0)}function C(e){s(!1),e&&!Object(a.e)(e.id)&&g({training:Y({},e)})}function k(){var e=(new m.d).validate(v.training);e.status?window.$flow.perform(r.a.UPDATE_TRAINING,v.training):Object(l.p)("Training not valid",e.errors.join(", "))}function A(){var e,t;Object(a.e)(v.training.id)&&v.training.state===u.c.PUBLISH?(e=v.training.name,t=S,window.$cui.alert("delete-training-dialog","YesNoCancel",{title:"Delete training",message:"Do you really want to delete training: "+e+"?",onYes:t})):(Object(l.q)("Draft removed"),window.$flow.perform(r.a.CLEAR_DRAFT),j())}function S(){window.$flow.perform("DELETE_TRAINING",v.training.id)}function D(e){Object(l.q)("Removed"),j()}return i.useEffect((function(){Object(l.o)("Edit training"),Object(l.n)("Edit training");var e=window.$flow.subscribe("UPDATE_TRAINING",{finish:O}),t=window.$flow.subscribe(r.a.GET_FOR_EDIT,{finish:x}),n=window.$flow.subscribe("GET_DRAFT",{finish:C}),i=window.$flow.subscribe("DELETE_TRAINING",{finish:D});return s(!0),N?window.$flow.perform(r.a.GET_FOR_EDIT,N):window.$flow.perform(r.a.GET_DRAFT),function(){window.$flow.unsubscribe("UPDATE_TRAINING",e.id),window.$flow.unsubscribe(r.a.GET_FOR_EDIT,t.id),window.$flow.unsubscribe("DELETE_TRAINING",i.id),window.$flow.unsubscribe("GET_DRAFT",n.id)}}),[v.training.id]),o?i.createElement(B.a,null):y?i.createElement(f.a,{message:"The training you looking for could not be found",classes:""}):v.training?i.createElement(i.Fragment,null,i.createElement("div",{className:"edit-container"},i.createElement("div",{className:"edit-container-content cui-overflow-y-auto"},i.createElement(b.a,{title:Object(a.e)(v.training)&&Object(a.e)(v.training.name)?"Update ".concat(v.training.state===u.c.DRAFT?"draft":"training"," ").concat(v.training.name):"Define training",description:"Customize your training settings",icon:"dumbbell"}),i.createElement(J,{training:v.training,onUpdate:function(e){!function(e){window.$flow.perform(r.a.SET_DRAFT,e),g({training:Y(Y({},e),{},{state:u.c.DRAFT})})}(e)},onCancel:j})),i.createElement("div",{className:"edit-container-bottom cui-padding-small-vertical cui-border-top cui-border-remove--l cui-flex stopwatch-content-width"},i.createElement("div",{className:"stopwatch-content-width cui-flex cui-middle cui-center"},i.createElement(E,{items:(t=[],Object(a.e)(v.training.id)&&t.push({icon:"media_play",label:"Run",onClick:function(){e.history.push(d.a.renderUrl("perform",{id:v.training.id}))}}),v.training.state!==u.c.NEW&&t.push({icon:"trash",label:"Delete",onClick:function(){A()}}),t.push({icon:"checkmark",label:"Save",onClick:k,modifiers:"cui-success"}),t)}))))):i.createElement("span",null)}))},vlay:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n("q1tI");function c(e){var t;return i.createElement("span",{className:"cui-icon "+(null!==(t=e.className)&&void 0!==t?t:""),"cui-icon":"stopwatch_".concat(e.type)})}},yC2Q:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n("q1tI");function c(e){return i.createElement("span",{className:"cui-margin-small-left cui-unhidden--m"},e.label)}}}]);
//# sourceMappingURL=stopwatch.chunk.3.3.57b8198c1db5cefee896.js.map