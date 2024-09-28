import{r as c,a as B,R as q}from"./vendor-C_gYsUBP.js";import{u as Y}from"./react-popper-tooltip-DVuQdy2k.js";import{c as O}from"./classnames-CayLnnqB.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var _={exports:{}},g={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z=c,H=Symbol.for("react.element"),J=Symbol.for("react.fragment"),Z=Object.prototype.hasOwnProperty,K=z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Q={key:!0,ref:!0,__self:!0,__source:!0};function I(e,n,t){var o,s={},i=null,a=null;t!==void 0&&(i=""+t),n.key!==void 0&&(i=""+n.key),n.ref!==void 0&&(a=n.ref);for(o in n)Z.call(n,o)&&!Q.hasOwnProperty(o)&&(s[o]=n[o]);if(e&&e.defaultProps)for(o in n=e.defaultProps,n)s[o]===void 0&&(s[o]=n[o]);return{$$typeof:H,type:e,key:i,ref:a,props:s,_owner:K.current}}g.Fragment=J;g.jsx=I;g.jsxs=I;_.exports=g;var r=_.exports,k,P=B;k=P.createRoot,P.hydrateRoot;function V(){return r.jsx("div",{className:"credits",children:r.jsxs("a",{href:"https://github.com/fmorenodesigns",target:"_blank",rel:"noreferrer",children:["Developed by ",r.jsx("i",{className:"fab fa-github"})," fmorenodesigns"]})})}function M({children:e,content:n,placement:t="auto",...o}){const{getArrowProps:s,getTooltipProps:i,setTooltipRef:a,setTriggerRef:p,visible:$}=Y({placement:t});return r.jsxs("span",{className:"tooltip-wrapper",children:[r.jsx("span",{ref:p,...o,children:e}),$&&r.jsxs("div",{ref:a,...i({className:"tooltip tooltip-container"}),children:[r.jsx("div",{...s({className:"tooltip tooltip-arrow"})}),n]})]})}async function X(e){const n=[new ClipboardItem({"text/plain":new Blob([e],{type:"text/plain"})})];let t=!1;return await navigator.clipboard.write(n).then(()=>{t=!0}),t}function ee({entries:e,setEntries:n}){const[t,o]=c.useState(!1),s=async()=>{const i=await X(window.location.href);o(i),window.setTimeout(()=>o(!1),2e3)};return r.jsxs("div",{className:"entries",children:[r.jsx("p",{className:"entries-title",children:"Entries"}),r.jsxs("div",{className:"textarea-container",children:[r.jsx("textarea",{name:"entries",cols:30,rows:3,value:e,onChange:i=>n(i.currentTarget.value)}),r.jsx(M,{placement:"left",content:t?"Link copied to clipboard.":"Save a link with these entries.",className:"share-button",onClick:s,children:r.jsx("i",{className:"far fa-copy"})})]})]})}function te(){return r.jsx("header",{className:"page-header",children:r.jsx("img",{className:"logo",src:"./logo.png",alt:"Spin wheel for decision-making",height:120})})}function ne(){return r.jsxs("div",{id:"instructions",children:[r.jsx("span",{children:"Separate entries by a comma(,) or a line-break. When spinning the roulette, it"})," ",r.jsx(M,{placement:"auto-end",content:`The roulette has been tested against the law of the large numbers:\r
          with 2 entries, each entry is expected to have a 50% chance of being\r
          chosen after spinning the wheel a large number of times.`,className:"tooltip-trigger",children:"randomly"})," ",r.jsx("span",{children:"picks one of the given entries."})]})}function re({setEntries:e}){return r.jsx("div",{id:"presets",children:r.jsx("div",{id:"preset-buttons",children:se.map(n=>r.jsx("button",{className:"preset",onClick:()=>e(n.presetOptions.join(", ")),children:n.buttonText},n.buttonText))})})}const se=[{buttonText:"Yep/Nope",presetOptions:["Yep","Nope"]},{buttonText:"What to do?",presetOptions:["Gaming","Movie","Series","Nap","Call a friend","Book","Draw","Exercise"]},{buttonText:"Movies",presetOptions:["Comedy","Romance","Action","Musical","Sci-Fi","Fantasy","Thriller","Horror"]},{buttonText:"Food",presetOptions:["Pizza","Hamburger","Sushi","Pasta","Salad","Soup","Sandwich"]},{buttonText:"Dessert",presetOptions:["Cake","Waffles","Brownies","Gelatine","Fruit","Ice cream","Yoghurt"]},{buttonText:"Exercise",presetOptions:["Stretch","Squats","Push-ups","Sit-ups","Rope skipping","Jogging","Short walk","Weight-lifting"]}];var h=(e=>(e[e.Purple=0]="Purple",e[e.Pink=1]="Pink",e[e.Orange=2]="Orange",e[e.Green=3]="Green",e))(h||{});const R=600,y=[{name:h.Purple,start:"#835687",end:"#3a2b40"},{name:h.Orange,start:"#f8f445",end:"#e27220"},{name:h.Pink,start:"#fe2392",end:"#82113e"},{name:h.Green,start:"#f2f23f",end:"#75991b"}],oe=y.length;function x(e,n){return Math.floor(Math.random()*(n-e+1)+e)}function T(e,n){return typeof n<"u"&&n!==e}function C(){return x(8e3,12e3)}function ie(e,n){return e.every(t=>n.includes(t))&&n.every(t=>e.includes(t))}function ae(e,n){const t=e*2,o=e*Math.cos(n*(Math.PI/180))+e,s=e*Math.sin(n*(Math.PI/180))+e;return n>=0&&n<=45?`${e} ${e}, ${t} ${e}, ${o} ${s}`:n>45&&n<=90?`${e} ${e}, ${t} ${e}, ${t} ${t}, ${o} ${s}`:n>90&&n<=135?`${e} ${e}, ${t} ${e}, ${t} ${t}, ${e} ${t}, ${o} ${s}`:n>135&&n<=180?`${e} ${e}, ${t} ${e}, ${t} ${t}, ${e} ${t}, 0 ${t}, ${o} ${s}`:n>180&&n<=225?`${e} ${e}, ${t} ${e}, ${t} ${t}, ${e} ${t}, 0 ${t}, 0 ${e}, ${o} ${s}`:n>225&&n<=270?`${e} ${e}, ${t} ${e}, ${t} ${t}, ${e} ${t}, 0 ${t}, 0 ${e}, 0 0, ${o} ${s}`:n>270&&n<=315?`${e} ${e}, ${t} ${e}, ${t} ${t}, ${e} ${t}, 0 ${t}, 0 ${e}, 0 0, ${e} 0, ${o} ${s}`:`${e} ${e}, ${t} ${e}, ${t} ${t}, ${e} ${t}, 0 ${t}, 0 ${e}, 0 0, ${e} 0, ${t} 0, ${o} ${s}`}function U(e){return`roulette-color-${e}`}function ce(){return r.jsx(r.Fragment,{children:y.map(e=>r.jsxs("linearGradient",{id:`${U(e.name)}`,children:[r.jsx("stop",{offset:"0%",stopColor:e.start}),r.jsx("stop",{offset:"55%",stopColor:e.end})]},e.name))})}function le(){return r.jsxs("svg",{className:"roulette-pointer",viewBox:"0 0 40 80",xmlns:"http://www.w3.org/2000/svg",children:[r.jsxs("linearGradient",{id:"pointer-gradient",children:[r.jsx("stop",{offset:"0%",stopColor:"#efd574"}),r.jsx("stop",{offset:"20%",stopColor:"#efd574"}),r.jsx("stop",{offset:"50%",stopColor:"#ede191"}),r.jsx("stop",{offset:"50%",stopColor:"#efd574"}),r.jsx("stop",{offset:"50%",stopColor:"#c59329"}),r.jsx("stop",{offset:"90%",stopColor:"#a96621"}),r.jsx("stop",{offset:"100%",stopColor:"#a96621"})]}),r.jsx("path",{d:"M0 12.6316L20 0L40 12.6316L20 80L0 12.6316Z",fill:"url('#pointer-gradient')"})]})}function ue({entries:e,strokeWidth:n=1}){const[t,o]=c.useState(e),[s,i]=c.useState(0),[a,p]=c.useState(),[$,w]=c.useState(!1),[E,F]=c.useState(C()),S=c.useRef(),b=()=>window.clearTimeout(S.current);ie(t,e)||(p(void 0),i(0),w(!1),b(),o(e));const m=c.useMemo(()=>{if(e.length<2)return;const l=[...e];for(;l.length<10;)l.push(...e);return l},[e]);if(typeof m>"u")return null;const N=m.length,f=360/N,v=R*2,A=()=>{if($)return;w(!0),p(void 0);const l=x(0,N-1),u=x(20,35),d=f*.05,j=x(d,f-d),W=l*f;i(L=>{const G=360-Math.abs(L%360);return L-G-(360*u+W+j)}),console.log("And the winner is..."),S.current=window.setTimeout(()=>{console.log(m[l]),p(l),w(!1),F(C()),b()},E-200)};return r.jsxs("div",{className:"roulette",style:{"--diameter":`${R}px`},children:[r.jsxs("div",{className:"roulette-rotating-part",style:{transform:`rotateZ(${s}deg)`,transitionDuration:$?`${E}ms`:"0ms"},children:[r.jsx("div",{className:"roulette-slices",children:r.jsxs("svg",{width:v,height:v,className:"roulette-slices-svg",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx(ce,{}),m.map((l,u)=>{const d=v/2+n/2,j=y[u%oe].name;return r.jsx("polygon",{className:O("roulette-slices-slice",T(u,a)&&"roulette--loser-slice"),points:ae(d,f),style:{transform:`rotate(${u/(1/f)}deg`,strokeWidth:n,fill:`url('#${U(j)}')`}},`slice-${u}-${l}`)})]})}),r.jsx("div",{className:"roulette-entry-names",children:m.map((l,u)=>{const d=u/(1/f)+f/2;return r.jsx("div",{className:O("roulette-entry-names-name",T(u,a)&&"roulette--loser-slice"),style:{transform:`rotate(${d}deg`},children:l},`slice-name-${u}-${l}`)})})]}),r.jsx("div",{className:"roulette-spin-button",onClick:A,children:r.jsx("div",{className:"roulette-spin-button-text",children:"SPIN"})}),r.jsx("div",{className:"roulette-shadow"}),r.jsx("div",{className:"roulette-outer-ring"}),r.jsx(le,{})]})}function pe(e){const n=window.location.search;return new URLSearchParams(n).get(e)}function fe(e,n){const t=new URL(window.location.href);t.searchParams.set(e,n);const o=decodeURIComponent(t.href);window.history.pushState({path:o},"",o)}function de(e){fe("entries",e.join(","))}function D(e){return e.replace(/\n/g,",").split(",").map(t=>t.trim()).filter(t=>t.length)}function me(){const e=pe("entries");return e?D(e).join(", "):null}const he=`Entry 1, Entry 2, Entry 3
Entry 4, Entry 5, Entry 6`;function $e(){const e=me()||he,[n,t]=c.useState(e),o=c.useMemo(()=>{const s=D(n);return de(s),s},[n]);return r.jsxs("div",{className:"page-container",children:[r.jsx(te,{}),r.jsx(ee,{entries:n,setEntries:t}),r.jsx(re,{setEntries:t}),r.jsx(ne,{}),r.jsx(ue,{entries:o}),r.jsx(V,{})]})}function xe(){const[e,n]=c.useState({pathname:window.location.pathname});return c.useEffect(()=>{const t=()=>n({pathname:window.location.pathname});return addEventListener("popstate",t),addEventListener("pushstate",t),addEventListener("replacestate",t),()=>{removeEventListener("popstate",t),removeEventListener("pushstate",t),removeEventListener("replacestate",t)}},[]),e}const ge=new CustomEvent("pushstate",{bubbles:!0,cancelable:!0}),we=new CustomEvent("replacestate",{bubbles:!0,cancelable:!0});function ve(){return(e,n=!1)=>{if(ye(e)){je(e,n);return}Ee(e,n)}}function je(e,n=!1){n?window.location.replace(e):window.location.href=e}function ye(e){try{const n=new URL(window.location.href),t=new URL(e,n);return n.hostname!==t.hostname}catch{return!0}}function Ee(e,n=!1){const{state:t}=window.history;n?(window.history.replaceState(t,"",e),window.dispatchEvent(we)):(window.history.pushState(t,"",e),window.dispatchEvent(ge))}function Se({routes:e}){const{pathname:n}=xe(),t=ve();for(const o of e){const{path:s,element:i,redirect:a}=o,p=new RegExp(`^${s}$`);if(n.match(p)){if(!a)return i;t(a,!0)}}throw new Error(`Missing route configuration for '${n}'`)}function be(){return r.jsx(Se,{routes:[{path:"/",element:r.jsx($e,{})}]})}const Ne=k(document.getElementById("root"));Ne.render(r.jsx(q.StrictMode,{children:r.jsx(be,{})}));