var Sh=Object.defineProperty;var yh=(n,e,t)=>e in n?Sh(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var el=(n,e,t)=>yh(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Mh="modulepreload",_h=function(n){return"/"+n},tl={},Eh=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(t.map(l=>{if(l=_h(l),l in tl)return;tl[l]=!0;const u=l.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${c}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Mh,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ci="160",Ni={ROTATE:0,DOLLY:1,PAN:2},Fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Th=0,nl=1,bh=2,du=1,pu=2,Bn=3,Sn=0,_t=1,At=2,Yt=0,ur=1,il=2,rl=3,sl=4,wh=5,Ti=100,Ah=101,Rh=102,al=103,ol=104,Ch=200,Ph=201,Dh=202,Lh=203,fo=204,po=205,Ih=206,Uh=207,Nh=208,Fh=209,Bh=210,Oh=211,zh=212,Hh=213,Gh=214,Vh=0,mu=1,kh=2,Hs=3,Wh=4,Xh=5,Yh=6,qh=7,gu=0,Kh=1,Zh=2,si=0,jh=1,Qh=2,Jh=3,vu=4,$h=5,ef=6,xu=300,dr=301,pr=302,mo=303,go=304,Ks=306,Wn=1e3,vn=1001,vo=1002,st=1003,ll=1004,la=1005,nt=1006,tf=1007,Or=1008,Gt=1009,nf=1010,rf=1011,No=1012,Su=1013,Tn=1014,Hn=1015,Gn=1016,yu=1017,Mu=1018,ai=1020,sf=1021,Pt=1023,af=1024,of=1025,Ci=1026,Ii=1027,_u=1028,Eu=1029,lf=1030,Tu=1031,bu=1033,ca=33776,ua=33777,ha=33778,fa=33779,cl=35840,ul=35841,hl=35842,fl=35843,wu=36196,dl=37492,pl=37496,ml=37808,gl=37809,vl=37810,xl=37811,Sl=37812,yl=37813,Ml=37814,_l=37815,El=37816,Tl=37817,bl=37818,wl=37819,Al=37820,Rl=37821,da=36492,Cl=36494,Pl=36495,cf=36283,Dl=36284,Ll=36285,Il=36286,Au=3e3,Pi=3001,Hr=3200,uf=3201,Ru=0,hf=1,Ht="",Ke="srgb",Jt="srgb-linear",Fo="display-p3",Zs="display-p3-linear",Gs="linear",rt="srgb",Vs="rec709",ks="p3",Bi=7680,Ul=519,ff=512,df=513,pf=514,Cu=515,mf=516,gf=517,vf=518,xf=519,Nl=35044,Fl="300 es",xo=1035,Vn=2e3,Ws=2001;class An{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Us=Math.PI/180,So=180/Math.PI;function Gr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]).toLowerCase()}function Ft(n,e,t){return Math.max(e,Math.min(t,n))}function Sf(n,e){return(n%e+e)%e}function pa(n,e,t){return(1-t)*n+t*e}function Bl(n){return(n&n-1)===0&&n!==0}function yo(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function xr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Wt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const yf={DEG2RAD:Us};class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,i,r,s,o,a,l,u){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,u)}set(e,t,i,r,s,o,a,l,u){const c=this.elements;return c[0]=e,c[1]=r,c[2]=a,c[3]=t,c[4]=s,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],c=i[4],h=i[7],f=i[2],p=i[5],v=i[8],x=r[0],m=r[3],d=r[6],y=r[1],g=r[4],S=r[7],_=r[2],T=r[5],E=r[8];return s[0]=o*x+a*y+l*_,s[3]=o*m+a*g+l*T,s[6]=o*d+a*S+l*E,s[1]=u*x+c*y+h*_,s[4]=u*m+c*g+h*T,s[7]=u*d+c*S+h*E,s[2]=f*x+p*y+v*_,s[5]=f*m+p*g+v*T,s[8]=f*d+p*S+v*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8];return t*o*c-t*a*u-i*s*c+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],h=c*o-a*u,f=a*l-c*s,p=u*s-o*l,v=t*h+i*f+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=h*x,e[1]=(r*u-c*i)*x,e[2]=(a*i-r*o)*x,e[3]=f*x,e[4]=(c*t-r*l)*x,e[5]=(r*s-a*t)*x,e[6]=p*x,e[7]=(i*l-u*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ma.makeScale(e,t)),this}rotate(e){return this.premultiply(ma.makeRotation(-e)),this}translate(e,t){return this.premultiply(ma.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new ke;function Pu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function zr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Mf(){const n=zr("canvas");return n.style.display="block",n}const Ol={};function Ir(n){n in Ol||(Ol[n]=!0,console.warn(n))}const zl=new ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Hl=new ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Wr={[Jt]:{transfer:Gs,primaries:Vs,toReference:n=>n,fromReference:n=>n},[Ke]:{transfer:rt,primaries:Vs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Zs]:{transfer:Gs,primaries:ks,toReference:n=>n.applyMatrix3(Hl),fromReference:n=>n.applyMatrix3(zl)},[Fo]:{transfer:rt,primaries:ks,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Hl),fromReference:n=>n.applyMatrix3(zl).convertLinearToSRGB()}},_f=new Set([Jt,Zs]),et={enabled:!0,_workingColorSpace:Jt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!_f.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Wr[e].toReference,r=Wr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Wr[n].primaries},getTransfer:function(n){return n===Ht?Gs:Wr[n].transfer}};function hr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ga(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Oi;class Du{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Oi===void 0&&(Oi=zr("canvas")),Oi.width=e.width,Oi.height=e.height;const i=Oi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Oi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=hr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(hr(t[i]/255)*255):t[i]=hr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ef=0;class Lu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=Gr(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(va(r[o].image)):s.push(va(r[o]))}else s=va(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function va(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Du.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Tf=0;class Lt extends An{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,i=vn,r=vn,s=nt,o=Or,a=Pt,l=Gt,u=Lt.DEFAULT_ANISOTROPY,c=Ht){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Gr(),this.name="",this.source=new Lu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(Ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===Pi?Ke:Ht),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wn:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wn:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ke?Pi:Au}set encoding(e){Ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Pi?Ke:Ht}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=xu;Lt.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,i=0,r=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,u=l[0],c=l[4],h=l[8],f=l[1],p=l[5],v=l[9],x=l[2],m=l[6],d=l[10];if(Math.abs(c-f)<.01&&Math.abs(h-x)<.01&&Math.abs(v-m)<.01){if(Math.abs(c+f)<.1&&Math.abs(h+x)<.1&&Math.abs(v+m)<.1&&Math.abs(u+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const g=(u+1)/2,S=(p+1)/2,_=(d+1)/2,T=(c+f)/4,E=(h+x)/4,P=(v+m)/4;return g>S&&g>_?g<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(g),r=T/i,s=E/i):S>_?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=T/r,s=P/r):_<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(_),i=E/s,r=P/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-v)*(m-v)+(h-x)*(h-x)+(f-c)*(f-c));return Math.abs(y)<.001&&(y=1),this.x=(m-v)/y,this.y=(h-x)/y,this.z=(f-c)/y,this.w=Math.acos((u+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bf extends An{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Ir("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Pi?Ke:Ht),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Lt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Lu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ut extends bf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Iu extends Lt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=st,this.minFilter=st,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wf extends Lt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=st,this.minFilter=st,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ui{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],u=i[r+1],c=i[r+2],h=i[r+3];const f=s[o+0],p=s[o+1],v=s[o+2],x=s[o+3];if(a===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=v,e[t+3]=x;return}if(h!==x||l!==f||u!==p||c!==v){let m=1-a;const d=l*f+u*p+c*v+h*x,y=d>=0?1:-1,g=1-d*d;if(g>Number.EPSILON){const _=Math.sqrt(g),T=Math.atan2(_,d*y);m=Math.sin(m*T)/_,a=Math.sin(a*T)/_}const S=a*y;if(l=l*m+f*S,u=u*m+p*S,c=c*m+v*S,h=h*m+x*S,m===1-a){const _=1/Math.sqrt(l*l+u*u+c*c+h*h);l*=_,u*=_,c*=_,h*=_}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],c=i[r+3],h=s[o],f=s[o+1],p=s[o+2],v=s[o+3];return e[t]=a*v+c*h+l*p-u*f,e[t+1]=l*v+c*f+u*h-a*p,e[t+2]=u*v+c*p+a*f-l*h,e[t+3]=c*v-a*h-l*f-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),c=a(r/2),h=a(s/2),f=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=f*c*h+u*p*v,this._y=u*p*h-f*c*v,this._z=u*c*v+f*p*h,this._w=u*c*h-f*p*v;break;case"YXZ":this._x=f*c*h+u*p*v,this._y=u*p*h-f*c*v,this._z=u*c*v-f*p*h,this._w=u*c*h+f*p*v;break;case"ZXY":this._x=f*c*h-u*p*v,this._y=u*p*h+f*c*v,this._z=u*c*v+f*p*h,this._w=u*c*h-f*p*v;break;case"ZYX":this._x=f*c*h-u*p*v,this._y=u*p*h+f*c*v,this._z=u*c*v-f*p*h,this._w=u*c*h+f*p*v;break;case"YZX":this._x=f*c*h+u*p*v,this._y=u*p*h+f*c*v,this._z=u*c*v-f*p*h,this._w=u*c*h-f*p*v;break;case"XZY":this._x=f*c*h-u*p*v,this._y=u*p*h-f*c*v,this._z=u*c*v+f*p*h,this._w=u*c*h+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],u=t[2],c=t[6],h=t[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(c-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,u=t._z,c=t._w;return this._x=i*c+o*a+r*u-s*l,this._y=r*c+o*l+s*a-i*u,this._z=s*c+o*u+i*l-r*a,this._w=o*c-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,a),h=Math.sin((1-t)*c)/u,f=Math.sin(t*c)/u;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),c=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*u+o*h-a*c,this.y=i+l*c+a*u-s*h,this.z=r+l*h+s*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xa.copy(this).projectOnVector(e),this.sub(xa)}reflect(e){return this.sub(xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xa=new U,Gl=new Ui;class Vt{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,fn):fn.fromBufferAttribute(s,o),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xr.copy(i.boundingBox)),Xr.applyMatrix4(e.matrixWorld),this.union(Xr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sr),Yr.subVectors(this.max,Sr),zi.subVectors(e.a,Sr),Hi.subVectors(e.b,Sr),Gi.subVectors(e.c,Sr),Yn.subVectors(Hi,zi),qn.subVectors(Gi,Hi),di.subVectors(zi,Gi);let t=[0,-Yn.z,Yn.y,0,-qn.z,qn.y,0,-di.z,di.y,Yn.z,0,-Yn.x,qn.z,0,-qn.x,di.z,0,-di.x,-Yn.y,Yn.x,0,-qn.y,qn.x,0,-di.y,di.x,0];return!Sa(t,zi,Hi,Gi,Yr)||(t=[1,0,0,0,1,0,0,0,1],!Sa(t,zi,Hi,Gi,Yr))?!1:(qr.crossVectors(Yn,qn),t=[qr.x,qr.y,qr.z],Sa(t,zi,Hi,Gi,Yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Cn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Cn=[new U,new U,new U,new U,new U,new U,new U,new U],fn=new U,Xr=new Vt,zi=new U,Hi=new U,Gi=new U,Yn=new U,qn=new U,di=new U,Sr=new U,Yr=new U,qr=new U,pi=new U;function Sa(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){pi.fromArray(n,s);const a=r.x*Math.abs(pi.x)+r.y*Math.abs(pi.y)+r.z*Math.abs(pi.z),l=e.dot(pi),u=t.dot(pi),c=i.dot(pi);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const Af=new Vt,yr=new U,ya=new U;class js{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Af.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yr.subVectors(e,this.center);const t=yr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(yr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ya.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yr.copy(e.center).add(ya)),this.expandByPoint(yr.copy(e.center).sub(ya))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pn=new U,Ma=new U,Kr=new U,Kn=new U,_a=new U,Zr=new U,Ea=new U;class Qs{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Pn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pn.copy(this.origin).addScaledVector(this.direction,t),Pn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ma.copy(e).add(t).multiplyScalar(.5),Kr.copy(t).sub(e).normalize(),Kn.copy(this.origin).sub(Ma);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Kr),a=Kn.dot(this.direction),l=-Kn.dot(Kr),u=Kn.lengthSq(),c=Math.abs(1-o*o);let h,f,p,v;if(c>0)if(h=o*l-a,f=o*a-l,v=s*c,h>=0)if(f>=-v)if(f<=v){const x=1/c;h*=x,f*=x,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+u}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+u;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+u;else f<=-v?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+u):f<=v?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+u):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+u);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ma).addScaledVector(Kr,f),p}intersectSphere(e,t){Pn.subVectors(e.center,this.origin);const i=Pn.dot(this.direction),r=Pn.dot(Pn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,f=this.origin;return u>=0?(i=(e.min.x-f.x)*u,r=(e.max.x-f.x)*u):(i=(e.max.x-f.x)*u,r=(e.min.x-f.x)*u),c>=0?(s=(e.min.y-f.y)*c,o=(e.max.y-f.y)*c):(s=(e.max.y-f.y)*c,o=(e.min.y-f.y)*c),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Pn)!==null}intersectTriangle(e,t,i,r,s){_a.subVectors(t,e),Zr.subVectors(i,e),Ea.crossVectors(_a,Zr);let o=this.direction.dot(Ea),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kn.subVectors(this.origin,e);const l=a*this.direction.dot(Zr.crossVectors(Kn,Zr));if(l<0)return null;const u=a*this.direction.dot(_a.cross(Kn));if(u<0||l+u>o)return null;const c=-a*Kn.dot(Ea);return c<0?null:this.at(c/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(e,t,i,r,s,o,a,l,u,c,h,f,p,v,x,m){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,u,c,h,f,p,v,x,m)}set(e,t,i,r,s,o,a,l,u,c,h,f,p,v,x,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=u,d[6]=c,d[10]=h,d[14]=f,d[3]=p,d[7]=v,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Vi.setFromMatrixColumn(e,0).length(),s=1/Vi.setFromMatrixColumn(e,1).length(),o=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*c,p=o*h,v=a*c,x=a*h;t[0]=l*c,t[4]=-l*h,t[8]=u,t[1]=p+v*u,t[5]=f-x*u,t[9]=-a*l,t[2]=x-f*u,t[6]=v+p*u,t[10]=o*l}else if(e.order==="YXZ"){const f=l*c,p=l*h,v=u*c,x=u*h;t[0]=f+x*a,t[4]=v*a-p,t[8]=o*u,t[1]=o*h,t[5]=o*c,t[9]=-a,t[2]=p*a-v,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*c,p=l*h,v=u*c,x=u*h;t[0]=f-x*a,t[4]=-o*h,t[8]=v+p*a,t[1]=p+v*a,t[5]=o*c,t[9]=x-f*a,t[2]=-o*u,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*c,p=o*h,v=a*c,x=a*h;t[0]=l*c,t[4]=v*u-p,t[8]=f*u+x,t[1]=l*h,t[5]=x*u+f,t[9]=p*u-v,t[2]=-u,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*u,v=a*l,x=a*u;t[0]=l*c,t[4]=x-f*h,t[8]=v*h+p,t[1]=h,t[5]=o*c,t[9]=-a*c,t[2]=-u*c,t[6]=p*h+v,t[10]=f-x*h}else if(e.order==="XZY"){const f=o*l,p=o*u,v=a*l,x=a*u;t[0]=l*c,t[4]=-h,t[8]=u*c,t[1]=f*h+x,t[5]=o*c,t[9]=p*h-v,t[2]=v*h-p,t[6]=a*c,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rf,e,Cf)}lookAt(e,t,i){const r=this.elements;return Kt.subVectors(e,t),Kt.lengthSq()===0&&(Kt.z=1),Kt.normalize(),Zn.crossVectors(i,Kt),Zn.lengthSq()===0&&(Math.abs(i.z)===1?Kt.x+=1e-4:Kt.z+=1e-4,Kt.normalize(),Zn.crossVectors(i,Kt)),Zn.normalize(),jr.crossVectors(Kt,Zn),r[0]=Zn.x,r[4]=jr.x,r[8]=Kt.x,r[1]=Zn.y,r[5]=jr.y,r[9]=Kt.y,r[2]=Zn.z,r[6]=jr.z,r[10]=Kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],c=i[1],h=i[5],f=i[9],p=i[13],v=i[2],x=i[6],m=i[10],d=i[14],y=i[3],g=i[7],S=i[11],_=i[15],T=r[0],E=r[4],P=r[8],M=r[12],b=r[1],I=r[5],L=r[9],O=r[13],C=r[2],B=r[6],N=r[10],k=r[14],q=r[3],K=r[7],j=r[11],ee=r[15];return s[0]=o*T+a*b+l*C+u*q,s[4]=o*E+a*I+l*B+u*K,s[8]=o*P+a*L+l*N+u*j,s[12]=o*M+a*O+l*k+u*ee,s[1]=c*T+h*b+f*C+p*q,s[5]=c*E+h*I+f*B+p*K,s[9]=c*P+h*L+f*N+p*j,s[13]=c*M+h*O+f*k+p*ee,s[2]=v*T+x*b+m*C+d*q,s[6]=v*E+x*I+m*B+d*K,s[10]=v*P+x*L+m*N+d*j,s[14]=v*M+x*O+m*k+d*ee,s[3]=y*T+g*b+S*C+_*q,s[7]=y*E+g*I+S*B+_*K,s[11]=y*P+g*L+S*N+_*j,s[15]=y*M+g*O+S*k+_*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],c=e[2],h=e[6],f=e[10],p=e[14],v=e[3],x=e[7],m=e[11],d=e[15];return v*(+s*l*h-r*u*h-s*a*f+i*u*f+r*a*p-i*l*p)+x*(+t*l*p-t*u*f+s*o*f-r*o*p+r*u*c-s*l*c)+m*(+t*u*h-t*a*p-s*o*h+i*o*p+s*a*c-i*u*c)+d*(-r*a*c-t*l*h+t*a*f+r*o*h-i*o*f+i*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],h=e[9],f=e[10],p=e[11],v=e[12],x=e[13],m=e[14],d=e[15],y=h*m*u-x*f*u+x*l*p-a*m*p-h*l*d+a*f*d,g=v*f*u-c*m*u-v*l*p+o*m*p+c*l*d-o*f*d,S=c*x*u-v*h*u+v*a*p-o*x*p-c*a*d+o*h*d,_=v*h*l-c*x*l-v*a*f+o*x*f+c*a*m-o*h*m,T=t*y+i*g+r*S+s*_;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return e[0]=y*E,e[1]=(x*f*s-h*m*s-x*r*p+i*m*p+h*r*d-i*f*d)*E,e[2]=(a*m*s-x*l*s+x*r*u-i*m*u-a*r*d+i*l*d)*E,e[3]=(h*l*s-a*f*s-h*r*u+i*f*u+a*r*p-i*l*p)*E,e[4]=g*E,e[5]=(c*m*s-v*f*s+v*r*p-t*m*p-c*r*d+t*f*d)*E,e[6]=(v*l*s-o*m*s-v*r*u+t*m*u+o*r*d-t*l*d)*E,e[7]=(o*f*s-c*l*s+c*r*u-t*f*u-o*r*p+t*l*p)*E,e[8]=S*E,e[9]=(v*h*s-c*x*s-v*i*p+t*x*p+c*i*d-t*h*d)*E,e[10]=(o*x*s-v*a*s+v*i*u-t*x*u-o*i*d+t*a*d)*E,e[11]=(c*a*s-o*h*s-c*i*u+t*h*u+o*i*p-t*a*p)*E,e[12]=_*E,e[13]=(c*x*r-v*h*r+v*i*f-t*x*f-c*i*m+t*h*m)*E,e[14]=(v*a*r-o*x*r-v*i*l+t*x*l+o*i*m-t*a*m)*E,e[15]=(o*h*r-c*a*r+c*i*l-t*h*l-o*i*f+t*a*f)*E,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,c=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,c*a+i,c*l-r*o,0,u*l-r*a,c*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,u=s+s,c=o+o,h=a+a,f=s*u,p=s*c,v=s*h,x=o*c,m=o*h,d=a*h,y=l*u,g=l*c,S=l*h,_=i.x,T=i.y,E=i.z;return r[0]=(1-(x+d))*_,r[1]=(p+S)*_,r[2]=(v-g)*_,r[3]=0,r[4]=(p-S)*T,r[5]=(1-(f+d))*T,r[6]=(m+y)*T,r[7]=0,r[8]=(v+g)*E,r[9]=(m-y)*E,r[10]=(1-(f+x))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Vi.set(r[0],r[1],r[2]).length();const o=Vi.set(r[4],r[5],r[6]).length(),a=Vi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],dn.copy(this);const u=1/s,c=1/o,h=1/a;return dn.elements[0]*=u,dn.elements[1]*=u,dn.elements[2]*=u,dn.elements[4]*=c,dn.elements[5]*=c,dn.elements[6]*=c,dn.elements[8]*=h,dn.elements[9]*=h,dn.elements[10]*=h,t.setFromRotationMatrix(dn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Vn){const l=this.elements,u=2*s/(t-e),c=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let p,v;if(a===Vn)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Ws)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=c,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Vn){const l=this.elements,u=1/(t-e),c=1/(i-r),h=1/(o-s),f=(t+e)*u,p=(i+r)*c;let v,x;if(a===Vn)v=(o+s)*h,x=-2*h;else if(a===Ws)v=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Vi=new U,dn=new Pe,Rf=new U(0,0,0),Cf=new U(1,1,1),Zn=new U,jr=new U,Kt=new U,Vl=new Pe,kl=new Ui;class Js{constructor(e=0,t=0,i=0,r=Js.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],c=r[9],h=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Vl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kl.setFromEuler(this),this.setFromQuaternion(kl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Js.DEFAULT_ORDER="XYZ";class Uu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Pf=0;const Wl=new U,ki=new Ui,Dn=new Pe,Qr=new U,Mr=new U,Df=new U,Lf=new Ui,Xl=new U(1,0,0),Yl=new U(0,1,0),ql=new U(0,0,1),If={type:"added"},Uf={type:"removed"};class Bt extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new U,t=new Js,i=new Ui,r=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pe},normalMatrix:{value:new ke}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ki.setFromAxisAngle(e,t),this.quaternion.multiply(ki),this}rotateOnWorldAxis(e,t){return ki.setFromAxisAngle(e,t),this.quaternion.premultiply(ki),this}rotateX(e){return this.rotateOnAxis(Xl,e)}rotateY(e){return this.rotateOnAxis(Yl,e)}rotateZ(e){return this.rotateOnAxis(ql,e)}translateOnAxis(e,t){return Wl.copy(e).applyQuaternion(this.quaternion),this.position.add(Wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xl,e)}translateY(e){return this.translateOnAxis(Yl,e)}translateZ(e){return this.translateOnAxis(ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Qr.copy(e):Qr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(Mr,Qr,this.up):Dn.lookAt(Qr,Mr,this.up),this.quaternion.setFromRotationMatrix(Dn),r&&(Dn.extractRotation(r.matrixWorld),ki.setFromRotationMatrix(Dn),this.quaternion.premultiply(ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(If)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Uf)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Dn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,Df),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Lf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const h=l[u];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Bt.DEFAULT_UP=new U(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pn=new U,Ln=new U,Ta=new U,In=new U,Wi=new U,Xi=new U,Kl=new U,ba=new U,wa=new U,Aa=new U;let Jr=!1;class at{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),pn.subVectors(e,t),r.cross(pn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){pn.subVectors(r,t),Ln.subVectors(i,t),Ta.subVectors(e,t);const o=pn.dot(pn),a=pn.dot(Ln),l=pn.dot(Ta),u=Ln.dot(Ln),c=Ln.dot(Ta),h=o*u-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(u*l-a*c)*f,v=(o*c-a*l)*f;return s.set(1-p-v,v,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getUV(e,t,i,r,s,o,a,l){return Jr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Jr=!0),this.getInterpolation(e,t,i,r,s,o,a,l)}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,In.x),l.addScaledVector(o,In.y),l.addScaledVector(a,In.z),l)}static isFrontFacing(e,t,i,r){return pn.subVectors(i,t),Ln.subVectors(e,t),pn.cross(Ln).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),pn.cross(Ln).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return at.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return at.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Jr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Jr=!0),at.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return at.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return at.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return at.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Wi.subVectors(r,i),Xi.subVectors(s,i),ba.subVectors(e,i);const l=Wi.dot(ba),u=Xi.dot(ba);if(l<=0&&u<=0)return t.copy(i);wa.subVectors(e,r);const c=Wi.dot(wa),h=Xi.dot(wa);if(c>=0&&h<=c)return t.copy(r);const f=l*h-c*u;if(f<=0&&l>=0&&c<=0)return o=l/(l-c),t.copy(i).addScaledVector(Wi,o);Aa.subVectors(e,s);const p=Wi.dot(Aa),v=Xi.dot(Aa);if(v>=0&&p<=v)return t.copy(s);const x=p*u-l*v;if(x<=0&&u>=0&&v<=0)return a=u/(u-v),t.copy(i).addScaledVector(Xi,a);const m=c*v-p*h;if(m<=0&&h-c>=0&&p-v>=0)return Kl.subVectors(s,r),a=(h-c)/(h-c+(p-v)),t.copy(r).addScaledVector(Kl,a);const d=1/(m+x+f);return o=x*d,a=f*d,t.copy(i).addScaledVector(Wi,o).addScaledVector(Xi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},$r={h:0,s:0,l:0};function Ra(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Fe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ke){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=Sf(e,1),t=Ft(t,0,1),i=Ft(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Ra(o,s,e+1/3),this.g=Ra(o,s,e),this.b=Ra(o,s,e-1/3)}return et.toWorkingColorSpace(this,r),this}setStyle(e,t=Ke){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ke){const i=Nu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}copyLinearToSRGB(e){return this.r=ga(e.r),this.g=ga(e.g),this.b=ga(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ke){return et.fromWorkingColorSpace(Nt.copy(this),e),Math.round(Ft(Nt.r*255,0,255))*65536+Math.round(Ft(Nt.g*255,0,255))*256+Math.round(Ft(Nt.b*255,0,255))}getHexString(e=Ke){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Nt.copy(this),t);const i=Nt.r,r=Nt.g,s=Nt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const h=o-a;switch(u=c<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=Ke){et.fromWorkingColorSpace(Nt.copy(this),e);const t=Nt.r,i=Nt.g,r=Nt.b;return e!==Ke?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL($r);const i=pa(jn.h,$r.h,t),r=pa(jn.s,$r.s,t),s=pa(jn.l,$r.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new Fe;Fe.NAMES=Nu;let Nf=0;class yn extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Gr(),this.name="",this.type="Material",this.blending=ur,this.side=Sn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fo,this.blendDst=po,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(i.blending=this.blending),this.side!==Sn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==fo&&(i.blendSrc=this.blendSrc),this.blendDst!==po&&(i.blendDst=this.blendDst),this.blendEquation!==Ti&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Hs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ul&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class oi extends yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=gu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const St=new U,es=new le;class ht{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Nl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)es.fromBufferAttribute(this,t),es.applyMatrix3(e),this.setXY(t,es.x,es.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=xr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array),r=Wt(r,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Nl&&(e.usage=this.usage),e}}class Fu extends ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Bu extends ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Dt extends ht{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Ff=0;const tn=new Pe,Ca=new Bt,Yi=new U,Zt=new Vt,_r=new Vt,wt=new U;class $t extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Gr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pu(e)?Bu:Fu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return tn.makeRotationFromQuaternion(e),this.applyMatrix4(tn),this}rotateX(e){return tn.makeRotationX(e),this.applyMatrix4(tn),this}rotateY(e){return tn.makeRotationY(e),this.applyMatrix4(tn),this}rotateZ(e){return tn.makeRotationZ(e),this.applyMatrix4(tn),this}translate(e,t,i){return tn.makeTranslation(e,t,i),this.applyMatrix4(tn),this}scale(e,t,i){return tn.makeScale(e,t,i),this.applyMatrix4(tn),this}lookAt(e){return Ca.lookAt(e),Ca.updateMatrix(),this.applyMatrix4(Ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Zt.setFromBufferAttribute(s),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new js);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];_r.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(Zt.min,_r.min),Zt.expandByPoint(wt),wt.addVectors(Zt.max,_r.max),Zt.expandByPoint(wt)):(Zt.expandByPoint(_r.min),Zt.expandByPoint(_r.max))}Zt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)wt.fromBufferAttribute(a,u),l&&(Yi.fromBufferAttribute(e,u),wt.add(Yi)),r=Math.max(r,i.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ht(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,u=[],c=[];for(let b=0;b<a;b++)u[b]=new U,c[b]=new U;const h=new U,f=new U,p=new U,v=new le,x=new le,m=new le,d=new U,y=new U;function g(b,I,L){h.fromArray(r,b*3),f.fromArray(r,I*3),p.fromArray(r,L*3),v.fromArray(o,b*2),x.fromArray(o,I*2),m.fromArray(o,L*2),f.sub(h),p.sub(h),x.sub(v),m.sub(v);const O=1/(x.x*m.y-m.x*x.y);isFinite(O)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-x.y).multiplyScalar(O),y.copy(p).multiplyScalar(x.x).addScaledVector(f,-m.x).multiplyScalar(O),u[b].add(d),u[I].add(d),u[L].add(d),c[b].add(y),c[I].add(y),c[L].add(y))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let b=0,I=S.length;b<I;++b){const L=S[b],O=L.start,C=L.count;for(let B=O,N=O+C;B<N;B+=3)g(i[B+0],i[B+1],i[B+2])}const _=new U,T=new U,E=new U,P=new U;function M(b){E.fromArray(s,b*3),P.copy(E);const I=u[b];_.copy(I),_.sub(E.multiplyScalar(E.dot(I))).normalize(),T.crossVectors(P,I);const O=T.dot(c[b])<0?-1:1;l[b*4]=_.x,l[b*4+1]=_.y,l[b*4+2]=_.z,l[b*4+3]=O}for(let b=0,I=S.length;b<I;++b){const L=S[b],O=L.start,C=L.count;for(let B=O,N=O+C;B<N;B+=3)M(i[B+0]),M(i[B+1]),M(i[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new U,s=new U,o=new U,a=new U,l=new U,u=new U,c=new U,h=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),c.subVectors(o,s),h.subVectors(r,s),c.cross(h),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),u.fromBufferAttribute(i,m),a.add(c),l.add(c),u.add(c),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,u.x,u.y,u.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),c.subVectors(o,s),h.subVectors(r,s),c.cross(h),i.setXYZ(f+0,c.x,c.y,c.z),i.setXYZ(f+1,c.x,c.y,c.z),i.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,l){const u=a.array,c=a.itemSize,h=a.normalized,f=new u.constructor(l.length*c);let p=0,v=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*c;for(let d=0;d<c;d++)f[v++]=u[p++]}return new ht(f,c,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new $t,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);t.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let c=0,h=u.length;c<h;c++){const f=u[c],p=e(f,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let h=0,f=u.length;h<f;h++){const p=u[h];c.push(p.toJSON(e.data))}c.length>0&&(r[l]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const u in r){const c=r[u];this.setAttribute(u,c.clone(t))}const s=e.morphAttributes;for(const u in s){const c=[],h=s[u];for(let f=0,p=h.length;f<p;f++)c.push(h[f].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,c=o.length;u<c;u++){const h=o[u];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zl=new Pe,mi=new Qs,ts=new js,jl=new U,qi=new U,Ki=new U,Zi=new U,Pa=new U,ns=new U,is=new le,rs=new le,ss=new le,Ql=new U,Jl=new U,$l=new U,as=new U,os=new U;class $e extends Bt{constructor(e=new $t,t=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ns.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const c=a[l],h=s[l];c!==0&&(Pa.fromBufferAttribute(h,e),o?ns.addScaledVector(Pa,c):ns.addScaledVector(Pa.sub(t),c))}t.add(ns)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ts.copy(i.boundingSphere),ts.applyMatrix4(s),mi.copy(e.ray).recast(e.near),!(ts.containsPoint(mi.origin)===!1&&(mi.intersectSphere(ts,jl)===null||mi.origin.distanceToSquared(jl)>(e.far-e.near)**2))&&(Zl.copy(s).invert(),mi.copy(e.ray).applyMatrix4(Zl),!(i.boundingBox!==null&&mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,mi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,c=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){const m=f[v],d=o[m.materialIndex],y=Math.max(m.start,p.start),g=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,_=g;S<_;S+=3){const T=a.getX(S),E=a.getX(S+1),P=a.getX(S+2);r=ls(this,d,e,i,u,c,h,T,E,P),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=v,d=x;m<d;m+=3){const y=a.getX(m),g=a.getX(m+1),S=a.getX(m+2);r=ls(this,o,e,i,u,c,h,y,g,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){const m=f[v],d=o[m.materialIndex],y=Math.max(m.start,p.start),g=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,_=g;S<_;S+=3){const T=S,E=S+1,P=S+2;r=ls(this,d,e,i,u,c,h,T,E,P),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=v,d=x;m<d;m+=3){const y=m,g=m+1,S=m+2;r=ls(this,o,e,i,u,c,h,y,g,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Bf(n,e,t,i,r,s,o,a){let l;if(e.side===_t?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Sn,a),l===null)return null;os.copy(a),os.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(os);return u<t.near||u>t.far?null:{distance:u,point:os.clone(),object:n}}function ls(n,e,t,i,r,s,o,a,l,u){n.getVertexPosition(a,qi),n.getVertexPosition(l,Ki),n.getVertexPosition(u,Zi);const c=Bf(n,e,t,i,qi,Ki,Zi,as);if(c){r&&(is.fromBufferAttribute(r,a),rs.fromBufferAttribute(r,l),ss.fromBufferAttribute(r,u),c.uv=at.getInterpolation(as,qi,Ki,Zi,is,rs,ss,new le)),s&&(is.fromBufferAttribute(s,a),rs.fromBufferAttribute(s,l),ss.fromBufferAttribute(s,u),c.uv1=at.getInterpolation(as,qi,Ki,Zi,is,rs,ss,new le),c.uv2=c.uv1),o&&(Ql.fromBufferAttribute(o,a),Jl.fromBufferAttribute(o,l),$l.fromBufferAttribute(o,u),c.normal=at.getInterpolation(as,qi,Ki,Zi,Ql,Jl,$l,new U),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const h={a,b:l,c:u,normal:new U,materialIndex:0};at.getNormal(qi,Ki,Zi,h.normal),c.face=h}return c}class Mn extends $t{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],c=[],h=[];let f=0,p=0;v("z","y","x",-1,-1,i,t,e,o,s,0),v("z","y","x",1,-1,i,t,-e,o,s,1),v("x","z","y",1,1,e,i,t,r,o,2),v("x","z","y",1,-1,e,i,-t,r,o,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Dt(u,3)),this.setAttribute("normal",new Dt(c,3)),this.setAttribute("uv",new Dt(h,2));function v(x,m,d,y,g,S,_,T,E,P,M){const b=S/E,I=_/P,L=S/2,O=_/2,C=T/2,B=E+1,N=P+1;let k=0,q=0;const K=new U;for(let j=0;j<N;j++){const ee=j*I-O;for(let ie=0;ie<B;ie++){const Y=ie*b-L;K[x]=Y*y,K[m]=ee*g,K[d]=C,u.push(K.x,K.y,K.z),K[x]=0,K[m]=0,K[d]=T>0?1:-1,c.push(K.x,K.y,K.z),h.push(ie/E),h.push(1-j/P),k+=1}}for(let j=0;j<P;j++)for(let ee=0;ee<E;ee++){const ie=f+ee+B*j,Y=f+ee+B*(j+1),Z=f+(ee+1)+B*(j+1),ae=f+(ee+1)+B*j;l.push(ie,Y,ae),l.push(Y,Z,ae),q+=6}a.addGroup(p,q,M),p+=q,f+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function mr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function zt(n){const e={};for(let t=0;t<n.length;t++){const i=mr(n[t]);for(const r in i)e[r]=i[r]}return e}function Of(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ou(n){return n.getRenderTarget()===null?n.outputColorSpace:et.workingColorSpace}const zf={clone:mr,merge:zt};var Hf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class lt extends yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hf,this.fragmentShader=Gf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mr(e.uniforms),this.uniformsGroups=Of(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class zu extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=Vn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class jt extends zu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=So*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Us*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return So*2*Math.atan(Math.tan(Us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Us*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ji=-90,Qi=1;class Vf extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jt(ji,Qi,e,t);r.layers=this.layers,this.add(r);const s=new jt(ji,Qi,e,t);s.layers=this.layers,this.add(s);const o=new jt(ji,Qi,e,t);o.layers=this.layers,this.add(o);const a=new jt(ji,Qi,e,t);a.layers=this.layers,this.add(a);const l=new jt(ji,Qi,e,t);l.layers=this.layers,this.add(l);const u=new jt(ji,Qi,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const u of t)this.remove(u);if(e===Vn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ws)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,c]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,u),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,c),e.setRenderTarget(h,f,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Hu extends Lt{constructor(e,t,i,r,s,o,a,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:dr,super(e,t,i,r,s,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class kf extends ut{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Ir("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Pi?Ke:Ht),this.texture=new Hu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:nt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Mn(5,5,5),s=new lt({name:"CubemapFromEquirect",uniforms:mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_t,blending:Yt});s.uniforms.tEquirect.value=t;const o=new $e(r,s),a=t.minFilter;return t.minFilter===Or&&(t.minFilter=nt),new Vf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Da=new U,Wf=new U,Xf=new ke;class gn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Da.subVectors(i,t).cross(Wf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Da),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Xf.getNormalMatrix(e),r=this.coplanarPoint(Da).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new js,cs=new U;class Bo{constructor(e=new gn,t=new gn,i=new gn,r=new gn,s=new gn,o=new gn){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Vn){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],u=r[4],c=r[5],h=r[6],f=r[7],p=r[8],v=r[9],x=r[10],m=r[11],d=r[12],y=r[13],g=r[14],S=r[15];if(i[0].setComponents(l-s,f-u,m-p,S-d).normalize(),i[1].setComponents(l+s,f+u,m+p,S+d).normalize(),i[2].setComponents(l+o,f+c,m+v,S+y).normalize(),i[3].setComponents(l-o,f-c,m-v,S-y).normalize(),i[4].setComponents(l-a,f-h,m-x,S-g).normalize(),t===Vn)i[5].setComponents(l+a,f+h,m+x,S+g).normalize();else if(t===Ws)i[5].setComponents(a,h,x,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(e){return gi.center.set(0,0,0),gi.radius=.7071067811865476,gi.applyMatrix4(e.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(cs.x=r.normal.x>0?e.max.x:e.min.x,cs.y=r.normal.y>0?e.max.y:e.min.y,cs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(cs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gu(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Yf(n,e){const t=e.isWebGL2,i=new WeakMap;function r(u,c){const h=u.array,f=u.usage,p=h.byteLength,v=n.createBuffer();n.bindBuffer(c,v),n.bufferData(c,h,f),u.onUploadCallback();let x;if(h instanceof Float32Array)x=n.FLOAT;else if(h instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=n.SHORT;else if(h instanceof Uint32Array)x=n.UNSIGNED_INT;else if(h instanceof Int32Array)x=n.INT;else if(h instanceof Int8Array)x=n.BYTE;else if(h instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:u.version,size:p}}function s(u,c,h){const f=c.array,p=c._updateRange,v=c.updateRanges;if(n.bindBuffer(h,u),p.count===-1&&v.length===0&&n.bufferSubData(h,0,f),v.length!==0){for(let x=0,m=v.length;x<m;x++){const d=v[x];t?n.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):n.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}c.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):n.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function o(u){return u.isInterleavedBufferAttribute&&(u=u.data),i.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const c=i.get(u);c&&(n.deleteBuffer(c.buffer),i.delete(u))}function l(u,c){if(u.isGLBufferAttribute){const f=i.get(u);(!f||f.version<u.version)&&i.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const h=i.get(u);if(h===void 0)i.set(u,r(u,c));else if(h.version<u.version){if(h.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,u,c),h.version=u.version}}return{get:o,remove:a,update:l}}class yt extends $t{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),u=a+1,c=l+1,h=e/a,f=t/l,p=[],v=[],x=[],m=[];for(let d=0;d<c;d++){const y=d*f-o;for(let g=0;g<u;g++){const S=g*h-s;v.push(S,-y,0),x.push(0,0,1),m.push(g/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<a;y++){const g=y+u*d,S=y+u*(d+1),_=y+1+u*(d+1),T=y+1+u*d;p.push(g,S,T),p.push(S,_,T)}this.setIndex(p),this.setAttribute("position",new Dt(v,3)),this.setAttribute("normal",new Dt(x,3)),this.setAttribute("uv",new Dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yt(e.width,e.height,e.widthSegments,e.heightSegments)}}var qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Zf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Jf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$f=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ed=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,td=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,nd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ad=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,od=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,md=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,gd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Md=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_d=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ed="gl_FragColor = linearToOutputTexel( gl_FragColor );",Td=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,bd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,wd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ad=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ud=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Nd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Fd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,$d=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ep=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,np=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ip=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ap=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,op=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,lp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,up=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_p=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ap=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Dp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ip=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Up=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Np=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Op=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$p=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,em=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,am=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ym=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_m=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Em=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Tm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:qf,alphahash_pars_fragment:Kf,alphamap_fragment:Zf,alphamap_pars_fragment:jf,alphatest_fragment:Qf,alphatest_pars_fragment:Jf,aomap_fragment:$f,aomap_pars_fragment:ed,batching_pars_vertex:td,batching_vertex:nd,begin_vertex:id,beginnormal_vertex:rd,bsdfs:sd,iridescence_fragment:ad,bumpmap_pars_fragment:od,clipping_planes_fragment:ld,clipping_planes_pars_fragment:cd,clipping_planes_pars_vertex:ud,clipping_planes_vertex:hd,color_fragment:fd,color_pars_fragment:dd,color_pars_vertex:pd,color_vertex:md,common:gd,cube_uv_reflection_fragment:vd,defaultnormal_vertex:xd,displacementmap_pars_vertex:Sd,displacementmap_vertex:yd,emissivemap_fragment:Md,emissivemap_pars_fragment:_d,colorspace_fragment:Ed,colorspace_pars_fragment:Td,envmap_fragment:bd,envmap_common_pars_fragment:wd,envmap_pars_fragment:Ad,envmap_pars_vertex:Rd,envmap_physical_pars_fragment:Hd,envmap_vertex:Cd,fog_vertex:Pd,fog_pars_vertex:Dd,fog_fragment:Ld,fog_pars_fragment:Id,gradientmap_pars_fragment:Ud,lightmap_fragment:Nd,lightmap_pars_fragment:Fd,lights_lambert_fragment:Bd,lights_lambert_pars_fragment:Od,lights_pars_begin:zd,lights_toon_fragment:Gd,lights_toon_pars_fragment:Vd,lights_phong_fragment:kd,lights_phong_pars_fragment:Wd,lights_physical_fragment:Xd,lights_physical_pars_fragment:Yd,lights_fragment_begin:qd,lights_fragment_maps:Kd,lights_fragment_end:Zd,logdepthbuf_fragment:jd,logdepthbuf_pars_fragment:Qd,logdepthbuf_pars_vertex:Jd,logdepthbuf_vertex:$d,map_fragment:ep,map_pars_fragment:tp,map_particle_fragment:np,map_particle_pars_fragment:ip,metalnessmap_fragment:rp,metalnessmap_pars_fragment:sp,morphcolor_vertex:ap,morphnormal_vertex:op,morphtarget_pars_vertex:lp,morphtarget_vertex:cp,normal_fragment_begin:up,normal_fragment_maps:hp,normal_pars_fragment:fp,normal_pars_vertex:dp,normal_vertex:pp,normalmap_pars_fragment:mp,clearcoat_normal_fragment_begin:gp,clearcoat_normal_fragment_maps:vp,clearcoat_pars_fragment:xp,iridescence_pars_fragment:Sp,opaque_fragment:yp,packing:Mp,premultiplied_alpha_fragment:_p,project_vertex:Ep,dithering_fragment:Tp,dithering_pars_fragment:bp,roughnessmap_fragment:wp,roughnessmap_pars_fragment:Ap,shadowmap_pars_fragment:Rp,shadowmap_pars_vertex:Cp,shadowmap_vertex:Pp,shadowmask_pars_fragment:Dp,skinbase_vertex:Lp,skinning_pars_vertex:Ip,skinning_vertex:Up,skinnormal_vertex:Np,specularmap_fragment:Fp,specularmap_pars_fragment:Bp,tonemapping_fragment:Op,tonemapping_pars_fragment:zp,transmission_fragment:Hp,transmission_pars_fragment:Gp,uv_pars_fragment:Vp,uv_pars_vertex:kp,uv_vertex:Wp,worldpos_vertex:Xp,background_vert:Yp,background_frag:qp,backgroundCube_vert:Kp,backgroundCube_frag:Zp,cube_vert:jp,cube_frag:Qp,depth_vert:Jp,depth_frag:$p,distanceRGBA_vert:em,distanceRGBA_frag:tm,equirect_vert:nm,equirect_frag:im,linedashed_vert:rm,linedashed_frag:sm,meshbasic_vert:am,meshbasic_frag:om,meshlambert_vert:lm,meshlambert_frag:cm,meshmatcap_vert:um,meshmatcap_frag:hm,meshnormal_vert:fm,meshnormal_frag:dm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:vm,meshtoon_vert:xm,meshtoon_frag:Sm,points_vert:ym,points_frag:Mm,shadow_vert:_m,shadow_frag:Em,sprite_vert:Tm,sprite_frag:bm},oe={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},En={basic:{uniforms:zt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:zt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:zt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:zt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:zt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:zt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:zt([oe.points,oe.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:zt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:zt([oe.common,oe.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:zt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:zt([oe.sprite,oe.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:zt([oe.common,oe.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:zt([oe.lights,oe.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};En.physical={uniforms:zt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const us={r:0,b:0,g:0};function wm(n,e,t,i,r,s,o){const a=new Fe(0);let l=s===!0?0:1,u,c,h=null,f=0,p=null;function v(m,d){let y=!1,g=d.isScene===!0?d.background:null;g&&g.isTexture&&(g=(d.backgroundBlurriness>0?t:e).get(g)),g===null?x(a,l):g&&g.isColor&&(x(g,1),y=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Ks)?(c===void 0&&(c=new $e(new Mn(1,1,1),new lt({name:"BackgroundCubeMaterial",uniforms:mr(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:_t,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),c.material.uniforms.envMap.value=g,c.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=et.getTransfer(g.colorSpace)!==rt,(h!==g||f!==g.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=g,f=g.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):g&&g.isTexture&&(u===void 0&&(u=new $e(new yt(2,2),new lt({name:"BackgroundMaterial",uniforms:mr(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=g,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=et.getTransfer(g.colorSpace)!==rt,g.matrixAutoUpdate===!0&&g.updateMatrix(),u.material.uniforms.uvTransform.value.copy(g.matrix),(h!==g||f!==g.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=g,f=g.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null))}function x(m,d){m.getRGB(us,Ou(n)),i.buffers.color.setClear(us.r,us.g,us.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(m,d=1){a.set(m),l=d,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(a,l)},render:v}}function Am(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let u=l,c=!1;function h(C,B,N,k,q){let K=!1;if(o){const j=x(k,N,B);u!==j&&(u=j,p(u.object)),K=d(C,k,N,q),K&&y(C,k,N,q)}else{const j=B.wireframe===!0;(u.geometry!==k.id||u.program!==N.id||u.wireframe!==j)&&(u.geometry=k.id,u.program=N.id,u.wireframe=j,K=!0)}q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),(K||c)&&(c=!1,P(C,B,N,k),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function f(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function p(C){return i.isWebGL2?n.bindVertexArray(C):s.bindVertexArrayOES(C)}function v(C){return i.isWebGL2?n.deleteVertexArray(C):s.deleteVertexArrayOES(C)}function x(C,B,N){const k=N.wireframe===!0;let q=a[C.id];q===void 0&&(q={},a[C.id]=q);let K=q[B.id];K===void 0&&(K={},q[B.id]=K);let j=K[k];return j===void 0&&(j=m(f()),K[k]=j),j}function m(C){const B=[],N=[],k=[];for(let q=0;q<r;q++)B[q]=0,N[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:N,attributeDivisors:k,object:C,attributes:{},index:null}}function d(C,B,N,k){const q=u.attributes,K=B.attributes;let j=0;const ee=N.getAttributes();for(const ie in ee)if(ee[ie].location>=0){const Z=q[ie];let ae=K[ie];if(ae===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(ae=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(ae=C.instanceColor)),Z===void 0||Z.attribute!==ae||ae&&Z.data!==ae.data)return!0;j++}return u.attributesNum!==j||u.index!==k}function y(C,B,N,k){const q={},K=B.attributes;let j=0;const ee=N.getAttributes();for(const ie in ee)if(ee[ie].location>=0){let Z=K[ie];Z===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(Z=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(Z=C.instanceColor));const ae={};ae.attribute=Z,Z&&Z.data&&(ae.data=Z.data),q[ie]=ae,j++}u.attributes=q,u.attributesNum=j,u.index=k}function g(){const C=u.newAttributes;for(let B=0,N=C.length;B<N;B++)C[B]=0}function S(C){_(C,0)}function _(C,B){const N=u.newAttributes,k=u.enabledAttributes,q=u.attributeDivisors;N[C]=1,k[C]===0&&(n.enableVertexAttribArray(C),k[C]=1),q[C]!==B&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,B),q[C]=B)}function T(){const C=u.newAttributes,B=u.enabledAttributes;for(let N=0,k=B.length;N<k;N++)B[N]!==C[N]&&(n.disableVertexAttribArray(N),B[N]=0)}function E(C,B,N,k,q,K,j){j===!0?n.vertexAttribIPointer(C,B,N,q,K):n.vertexAttribPointer(C,B,N,k,q,K)}function P(C,B,N,k){if(i.isWebGL2===!1&&(C.isInstancedMesh||k.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const q=k.attributes,K=N.getAttributes(),j=B.defaultAttributeValues;for(const ee in K){const ie=K[ee];if(ie.location>=0){let Y=q[ee];if(Y===void 0&&(ee==="instanceMatrix"&&C.instanceMatrix&&(Y=C.instanceMatrix),ee==="instanceColor"&&C.instanceColor&&(Y=C.instanceColor)),Y!==void 0){const Z=Y.normalized,ae=Y.itemSize,de=t.get(Y);if(de===void 0)continue;const ge=de.buffer,Re=de.type,Ce=de.bytesPerElement,_e=i.isWebGL2===!0&&(Re===n.INT||Re===n.UNSIGNED_INT||Y.gpuType===Su);if(Y.isInterleavedBufferAttribute){const Ue=Y.data,H=Ue.stride,Rt=Y.offset;if(Ue.isInstancedInterleavedBuffer){for(let Ee=0;Ee<ie.locationSize;Ee++)_(ie.location+Ee,Ue.meshPerAttribute);C.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Ue.meshPerAttribute*Ue.count)}else for(let Ee=0;Ee<ie.locationSize;Ee++)S(ie.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Ee=0;Ee<ie.locationSize;Ee++)E(ie.location+Ee,ae/ie.locationSize,Re,Z,H*Ce,(Rt+ae/ie.locationSize*Ee)*Ce,_e)}else{if(Y.isInstancedBufferAttribute){for(let Ue=0;Ue<ie.locationSize;Ue++)_(ie.location+Ue,Y.meshPerAttribute);C.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Ue=0;Ue<ie.locationSize;Ue++)S(ie.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Ue=0;Ue<ie.locationSize;Ue++)E(ie.location+Ue,ae/ie.locationSize,Re,Z,ae*Ce,ae/ie.locationSize*Ue*Ce,_e)}}else if(j!==void 0){const Z=j[ee];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(ie.location,Z);break;case 3:n.vertexAttrib3fv(ie.location,Z);break;case 4:n.vertexAttrib4fv(ie.location,Z);break;default:n.vertexAttrib1fv(ie.location,Z)}}}}T()}function M(){L();for(const C in a){const B=a[C];for(const N in B){const k=B[N];for(const q in k)v(k[q].object),delete k[q];delete B[N]}delete a[C]}}function b(C){if(a[C.id]===void 0)return;const B=a[C.id];for(const N in B){const k=B[N];for(const q in k)v(k[q].object),delete k[q];delete B[N]}delete a[C.id]}function I(C){for(const B in a){const N=a[B];if(N[C.id]===void 0)continue;const k=N[C.id];for(const q in k)v(k[q].object),delete k[q];delete N[C.id]}}function L(){O(),c=!0,u!==l&&(u=l,p(u.object))}function O(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:L,resetDefaultState:O,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfProgram:I,initAttributes:g,enableAttribute:S,disableUnusedAttributes:T}}function Rm(n,e,t,i){const r=i.isWebGL2;let s;function o(c){s=c}function a(c,h){n.drawArrays(s,c,h),t.update(h,s,1)}function l(c,h,f){if(f===0)return;let p,v;if(r)p=n,v="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[v](s,c,h,f),t.update(h,s,f)}function u(c,h,f){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<f;v++)this.render(c[v],h[v]);else{p.multiDrawArraysWEBGL(s,c,0,h,0,f);let v=0;for(let x=0;x<f;x++)v+=h[x];t.update(v,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=u}function Cm(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const u=o||e.has("WEBGL_draw_buffers"),c=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),d=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),g=f>0,S=o||e.has("OES_texture_float"),_=g&&S,T=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:u,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:c,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:y,vertexTextures:g,floatFragmentTextures:S,floatVertexTextures:_,maxSamples:T}}function Pm(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new gn,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=c(h,f,0)},this.setState=function(h,f,p){const v=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!r||v===null||v.length===0||s&&!m)s?c(null):u();else{const y=s?0:i,g=y*4;let S=d.clippingState||null;l.value=S,S=c(v,f,g,p);for(let _=0;_!==g;++_)S[_]=t[_];d.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(h,f,p,v){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,v!==!0||m===null){const d=p+x*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let g=0,S=p;g!==x;++g,S+=4)o.copy(h[g]).applyMatrix4(y,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Dm(n){let e=new WeakMap;function t(o,a){return a===mo?o.mapping=dr:a===go&&(o.mapping=pr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===mo||a===go)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new kf(l.height/2);return u.fromEquirectangularTexture(n,o),e.set(o,u),o.addEventListener("dispose",r),t(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class $s extends zu{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ar=4,ec=[.125,.215,.35,.446,.526,.582],bi=20,La=new $s,tc=new Fe;let Ia=null,Ua=0,Na=0;const Ei=(1+Math.sqrt(5))/2,Ji=1/Ei,nc=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Ei,Ji),new U(0,Ei,-Ji),new U(Ji,0,Ei),new U(-Ji,0,Ei),new U(Ei,Ji,0),new U(-Ei,Ji,0)];class Mo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ia=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ia,Ua,Na),e.scissorTest=!1,hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===dr||e.mapping===pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ia=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:nt,minFilter:nt,generateMipmaps:!1,type:Gn,format:Pt,colorSpace:Jt,depthBuffer:!1},r=ic(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ic(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lm(s)),this._blurMaterial=Im(s,e,t)}return r}_compileMaterial(e){const t=new $e(this._lodPlanes[0],e);this._renderer.compile(t,La)}_sceneToCubeUV(e,t,i,r){const a=new jt(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,f=c.toneMapping;c.getClearColor(tc),c.toneMapping=si,c.autoClear=!1;const p=new oi({name:"PMREM.Background",side:_t,depthWrite:!1,depthTest:!1}),v=new $e(new Mn,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(tc),x=!0);for(let d=0;d<6;d++){const y=d%3;y===0?(a.up.set(0,l[d],0),a.lookAt(u[d],0,0)):y===1?(a.up.set(0,0,l[d]),a.lookAt(0,u[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,u[d]));const g=this._cubeSize;hs(r,y*g,d>2?g:0,g,g),c.setRenderTarget(r),x&&c.render(v,a),c.render(e,a)}v.geometry.dispose(),v.material.dispose(),c.toneMapping=f,c.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===dr||e.mapping===pr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rc());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new $e(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;hs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,La)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=nc[(r-1)%nc.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,h=new $e(this._lodPlanes[r],u),f=u.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*bi-1),x=s/v,m=isFinite(s)?1+Math.floor(c*x):bi;m>bi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bi}`);const d=[];let y=0;for(let E=0;E<bi;++E){const P=E/x,M=Math.exp(-P*P/2);d.push(M),E===0?y+=M:E<m&&(y+=2*M)}for(let E=0;E<d.length;E++)d[E]=d[E]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:g}=this;f.dTheta.value=v,f.mipInt.value=g-i;const S=this._sizeLods[r],_=3*S*(r>g-ar?r-g+ar:0),T=4*(this._cubeSize-S);hs(t,_,T,3*S,2*S),l.setRenderTarget(t),l.render(h,La)}}function Lm(n){const e=[],t=[],i=[];let r=n;const s=n-ar+1+ec.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ar?l=ec[o-n+ar-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),c=-u,h=1+u,f=[c,c,h,c,h,h,c,c,h,h,c,h],p=6,v=6,x=3,m=2,d=1,y=new Float32Array(x*v*p),g=new Float32Array(m*v*p),S=new Float32Array(d*v*p);for(let T=0;T<p;T++){const E=T%3*2/3-1,P=T>2?0:-1,M=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];y.set(M,x*v*T),g.set(f,m*v*T);const b=[T,T,T,T,T,T];S.set(b,d*v*T)}const _=new $t;_.setAttribute("position",new ht(y,x)),_.setAttribute("uv",new ht(g,m)),_.setAttribute("faceIndex",new ht(S,d)),e.push(_),r>ar&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function ic(n,e,t){const i=new ut(n,e,t);return i.texture.mapping=Ks,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function hs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Im(n,e,t){const i=new Float32Array(bi),r=new U(0,1,0);return new lt({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yt,depthTest:!1,depthWrite:!1})}function rc(){return new lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yt,depthTest:!1,depthWrite:!1})}function sc(){return new lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yt,depthTest:!1,depthWrite:!1})}function Oo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Um(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===mo||l===go,c=l===dr||l===pr;if(u||c)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new Mo(n)),h=u?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(u&&h&&h.height>0||c&&h&&r(h)){t===null&&(t=new Mo(n));const f=u?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function r(a){let l=0;const u=6;for(let c=0;c<u;c++)a[c]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Nm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Fm(n,e,t,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);for(const v in f.morphAttributes){const x=f.morphAttributes[v];for(let m=0,d=x.length;m<d;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const v in f)e.update(f[v],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const v in p){const x=p[v];for(let m=0,d=x.length;m<d;m++)e.update(x[m],n.ARRAY_BUFFER)}}function u(h){const f=[],p=h.index,v=h.attributes.position;let x=0;if(p!==null){const y=p.array;x=p.version;for(let g=0,S=y.length;g<S;g+=3){const _=y[g+0],T=y[g+1],E=y[g+2];f.push(_,T,T,E,E,_)}}else if(v!==void 0){const y=v.array;x=v.version;for(let g=0,S=y.length/3-1;g<S;g+=3){const _=g+0,T=g+1,E=g+2;f.push(_,T,T,E,E,_)}}else return;const m=new(Pu(f)?Bu:Fu)(f,1);m.version=x;const d=s.get(h);d&&e.remove(d),s.set(h,m)}function c(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&u(h)}else u(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:c}}function Bm(n,e,t,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function u(p){a=p.type,l=p.bytesPerElement}function c(p,v){n.drawElements(s,v,a,p*l),t.update(v,s,1)}function h(p,v,x){if(x===0)return;let m,d;if(r)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](s,v,a,p*l,x),t.update(v,s,x)}function f(p,v,x){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<x;d++)this.render(p[d]/l,v[d]);else{m.multiDrawElementsWEBGL(s,v,0,a,p,0,x);let d=0;for(let y=0;y<x;y++)d+=v[y];t.update(d,s,1)}}this.setMode=o,this.setIndex=u,this.render=c,this.renderInstances=h,this.renderMultiDraw=f}function Om(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function zm(n,e){return n[0]-e[0]}function Hm(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Gm(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new tt,a=[];for(let u=0;u<8;u++)a[u]=[u,0];function l(u,c,h){const f=u.morphTargetInfluences;if(e.isWebGL2===!0){const v=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,x=v!==void 0?v.length:0;let m=s.get(c);if(m===void 0||m.count!==x){let B=function(){O.dispose(),s.delete(c),c.removeEventListener("dispose",B)};var p=B;m!==void 0&&m.texture.dispose();const g=c.morphAttributes.position!==void 0,S=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,T=c.morphAttributes.position||[],E=c.morphAttributes.normal||[],P=c.morphAttributes.color||[];let M=0;g===!0&&(M=1),S===!0&&(M=2),_===!0&&(M=3);let b=c.attributes.position.count*M,I=1;b>e.maxTextureSize&&(I=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const L=new Float32Array(b*I*4*x),O=new Iu(L,b,I,x);O.type=Hn,O.needsUpdate=!0;const C=M*4;for(let N=0;N<x;N++){const k=T[N],q=E[N],K=P[N],j=b*I*4*N;for(let ee=0;ee<k.count;ee++){const ie=ee*C;g===!0&&(o.fromBufferAttribute(k,ee),L[j+ie+0]=o.x,L[j+ie+1]=o.y,L[j+ie+2]=o.z,L[j+ie+3]=0),S===!0&&(o.fromBufferAttribute(q,ee),L[j+ie+4]=o.x,L[j+ie+5]=o.y,L[j+ie+6]=o.z,L[j+ie+7]=0),_===!0&&(o.fromBufferAttribute(K,ee),L[j+ie+8]=o.x,L[j+ie+9]=o.y,L[j+ie+10]=o.z,L[j+ie+11]=K.itemSize===4?o.w:1)}}m={count:x,texture:O,size:new le(b,I)},s.set(c,m),c.addEventListener("dispose",B)}let d=0;for(let g=0;g<f.length;g++)d+=f[g];const y=c.morphTargetsRelative?1:1-d;h.getUniforms().setValue(n,"morphTargetBaseInfluence",y),h.getUniforms().setValue(n,"morphTargetInfluences",f),h.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const v=f===void 0?0:f.length;let x=i[c.id];if(x===void 0||x.length!==v){x=[];for(let S=0;S<v;S++)x[S]=[S,0];i[c.id]=x}for(let S=0;S<v;S++){const _=x[S];_[0]=S,_[1]=f[S]}x.sort(Hm);for(let S=0;S<8;S++)S<v&&x[S][1]?(a[S][0]=x[S][0],a[S][1]=x[S][1]):(a[S][0]=Number.MAX_SAFE_INTEGER,a[S][1]=0);a.sort(zm);const m=c.morphAttributes.position,d=c.morphAttributes.normal;let y=0;for(let S=0;S<8;S++){const _=a[S],T=_[0],E=_[1];T!==Number.MAX_SAFE_INTEGER&&E?(m&&c.getAttribute("morphTarget"+S)!==m[T]&&c.setAttribute("morphTarget"+S,m[T]),d&&c.getAttribute("morphNormal"+S)!==d[T]&&c.setAttribute("morphNormal"+S,d[T]),r[S]=E,y+=E):(m&&c.hasAttribute("morphTarget"+S)===!0&&c.deleteAttribute("morphTarget"+S),d&&c.hasAttribute("morphNormal"+S)===!0&&c.deleteAttribute("morphNormal"+S),r[S]=0)}const g=c.morphTargetsRelative?1:1-y;h.getUniforms().setValue(n,"morphTargetBaseInfluence",g),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function Vm(n,e,t,i){let r=new WeakMap;function s(l){const u=i.render.frame,c=l.geometry,h=e.get(l,c);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}class ea extends Lt{constructor(e,t,i,r,s,o,a,l,u,c){if(c=c!==void 0?c:Ci,c!==Ci&&c!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===Ci&&(i=Tn),i===void 0&&c===Ii&&(i=ai),super(null,r,s,o,a,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:st,this.minFilter=l!==void 0?l:st,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Vu=new Lt,ku=new ea(1,1);ku.compareFunction=Cu;const Wu=new Iu,Xu=new wf,Yu=new Hu,ac=[],oc=[],lc=new Float32Array(16),cc=new Float32Array(9),uc=new Float32Array(4);function gr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=ac[r];if(s===void 0&&(s=new Float32Array(r),ac[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ta(n,e){let t=oc[e];t===void 0&&(t=new Int32Array(e),oc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function km(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Wm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function Xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function Ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function qm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;uc.set(i),n.uniformMatrix2fv(this.addr,!1,uc),Tt(t,i)}}function Km(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;cc.set(i),n.uniformMatrix3fv(this.addr,!1,cc),Tt(t,i)}}function Zm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;lc.set(i),n.uniformMatrix4fv(this.addr,!1,lc),Tt(t,i)}}function jm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function Jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function eg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function tg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function ig(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function rg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?ku:Vu;t.setTexture2D(e||s,r)}function sg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Xu,r)}function ag(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Yu,r)}function og(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Wu,r)}function lg(n){switch(n){case 5126:return km;case 35664:return Wm;case 35665:return Xm;case 35666:return Ym;case 35674:return qm;case 35675:return Km;case 35676:return Zm;case 5124:case 35670:return jm;case 35667:case 35671:return Qm;case 35668:case 35672:return Jm;case 35669:case 35673:return $m;case 5125:return eg;case 36294:return tg;case 36295:return ng;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return og}}function cg(n,e){n.uniform1fv(this.addr,e)}function ug(n,e){const t=gr(e,this.size,2);n.uniform2fv(this.addr,t)}function hg(n,e){const t=gr(e,this.size,3);n.uniform3fv(this.addr,t)}function fg(n,e){const t=gr(e,this.size,4);n.uniform4fv(this.addr,t)}function dg(n,e){const t=gr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function pg(n,e){const t=gr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function mg(n,e){const t=gr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function gg(n,e){n.uniform1iv(this.addr,e)}function vg(n,e){n.uniform2iv(this.addr,e)}function xg(n,e){n.uniform3iv(this.addr,e)}function Sg(n,e){n.uniform4iv(this.addr,e)}function yg(n,e){n.uniform1uiv(this.addr,e)}function Mg(n,e){n.uniform2uiv(this.addr,e)}function _g(n,e){n.uniform3uiv(this.addr,e)}function Eg(n,e){n.uniform4uiv(this.addr,e)}function Tg(n,e,t){const i=this.cache,r=e.length,s=ta(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Vu,s[o])}function bg(n,e,t){const i=this.cache,r=e.length,s=ta(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Xu,s[o])}function wg(n,e,t){const i=this.cache,r=e.length,s=ta(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Yu,s[o])}function Ag(n,e,t){const i=this.cache,r=e.length,s=ta(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Wu,s[o])}function Rg(n){switch(n){case 5126:return cg;case 35664:return ug;case 35665:return hg;case 35666:return fg;case 35674:return dg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return vg;case 35668:case 35672:return xg;case 35669:case 35673:return Sg;case 5125:return yg;case 36294:return Mg;case 36295:return _g;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return Tg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return wg;case 36289:case 36303:case 36311:case 36292:return Ag}}class Cg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=lg(t.type)}}class Pg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Rg(t.type)}}class Dg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Fa=/(\w+)(\])?(\[|\.)?/g;function hc(n,e){n.seq.push(e),n.map[e.id]=e}function Lg(n,e,t){const i=n.name,r=i.length;for(Fa.lastIndex=0;;){const s=Fa.exec(i),o=Fa.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){hc(t,u===void 0?new Cg(a,n,e):new Pg(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new Dg(a),hc(t,h)),t=h}}}class Ns{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Lg(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function fc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ig=37297;let Ug=0;function Ng(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Fg(n){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(n);let i;switch(e===t?i="":e===ks&&t===Vs?i="LinearDisplayP3ToLinearSRGB":e===Vs&&t===ks&&(i="LinearSRGBToLinearDisplayP3"),n){case Jt:case Zs:return[i,"LinearTransferOETF"];case Ke:case Fo:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function dc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Ng(n.getShaderSource(e),o)}else return r}function Bg(n,e){const t=Fg(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Og(n,e){let t;switch(e){case jh:t="Linear";break;case Qh:t="Reinhard";break;case Jh:t="OptimizedCineon";break;case vu:t="ACESFilmic";break;case ef:t="AgX";break;case $h:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function zg(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(or).join(`
`)}function Hg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(or).join(`
`)}function Gg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Vg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function or(n){return n!==""}function pc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function _o(n){return n.replace(kg,Xg)}const Wg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Xg(n,e){let t=He[e];if(t===void 0){const i=Wg.get(e);if(i!==void 0)t=He[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return _o(t)}const Yg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gc(n){return n.replace(Yg,qg)}function qg(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function vc(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Kg(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===du?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===pu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Bn&&(e="SHADOWMAP_TYPE_VSM"),e}function Zg(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case dr:case pr:e="ENVMAP_TYPE_CUBE";break;case Ks:e="ENVMAP_TYPE_CUBE_UV";break}return e}function jg(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case pr:e="ENVMAP_MODE_REFRACTION";break}return e}function Qg(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case gu:e="ENVMAP_BLENDING_MULTIPLY";break;case Kh:e="ENVMAP_BLENDING_MIX";break;case Zh:e="ENVMAP_BLENDING_ADD";break}return e}function Jg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function $g(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Kg(t),u=Zg(t),c=jg(t),h=Qg(t),f=Jg(t),p=t.isWebGL2?"":zg(t),v=Hg(t),x=Gg(s),m=r.createProgram();let d,y,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(or).join(`
`),d.length>0&&(d+=`
`),y=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(or).join(`
`),y.length>0&&(y+=`
`)):(d=[vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(or).join(`
`),y=[p,vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?He.tonemapping_pars_fragment:"",t.toneMapping!==si?Og("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Bg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(or).join(`
`)),o=_o(o),o=pc(o,t),o=mc(o,t),a=_o(a),a=pc(a,t),a=mc(a,t),o=gc(o),a=gc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,d=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const S=g+d+o,_=g+y+a,T=fc(r,r.VERTEX_SHADER,S),E=fc(r,r.FRAGMENT_SHADER,_);r.attachShader(m,T),r.attachShader(m,E),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function P(L){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(m).trim(),C=r.getShaderInfoLog(T).trim(),B=r.getShaderInfoLog(E).trim();let N=!0,k=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,T,E);else{const q=dc(r,T,"vertex"),K=dc(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+O+`
`+q+`
`+K)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(C===""||B==="")&&(k=!1);k&&(L.diagnostics={runnable:N,programLog:O,vertexShader:{log:C,prefix:d},fragmentShader:{log:B,prefix:y}})}r.deleteShader(T),r.deleteShader(E),M=new Ns(r,m),b=Vg(r,m)}let M;this.getUniforms=function(){return M===void 0&&P(this),M};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(m,Ig)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ug++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=E,this}let ev=0;class tv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new nv(e),t.set(e,i)),i}}class nv{constructor(e){this.id=ev++,this.code=e,this.usedTimes=0}}function iv(n,e,t,i,r,s,o){const a=new Uu,l=new tv,u=[],c=r.isWebGL2,h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function m(M,b,I,L,O){const C=L.fog,B=O.geometry,N=M.isMeshStandardMaterial?L.environment:null,k=(M.isMeshStandardMaterial?t:e).get(M.envMap||N),q=k&&k.mapping===Ks?k.image.height:null,K=v[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const j=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ee=j!==void 0?j.length:0;let ie=0;B.morphAttributes.position!==void 0&&(ie=1),B.morphAttributes.normal!==void 0&&(ie=2),B.morphAttributes.color!==void 0&&(ie=3);let Y,Z,ae,de;if(K){const mt=En[K];Y=mt.vertexShader,Z=mt.fragmentShader}else Y=M.vertexShader,Z=M.fragmentShader,l.update(M),ae=l.getVertexShaderID(M),de=l.getFragmentShaderID(M);const ge=n.getRenderTarget(),Re=O.isInstancedMesh===!0,Ce=O.isBatchedMesh===!0,_e=!!M.map,Ue=!!M.matcap,H=!!k,Rt=!!M.aoMap,Ee=!!M.lightMap,De=!!M.bumpMap,ve=!!M.normalMap,it=!!M.displacementMap,Be=!!M.emissiveMap,R=!!M.metalnessMap,w=!!M.roughnessMap,G=M.anisotropy>0,te=M.clearcoat>0,J=M.iridescence>0,ne=M.sheen>0,xe=M.transmission>0,ue=G&&!!M.anisotropyMap,me=te&&!!M.clearcoatMap,be=te&&!!M.clearcoatNormalMap,Oe=te&&!!M.clearcoatRoughnessMap,Q=J&&!!M.iridescenceMap,Qe=J&&!!M.iridescenceThicknessMap,Ge=ne&&!!M.sheenColorMap,Le=ne&&!!M.sheenRoughnessMap,Me=!!M.specularMap,he=!!M.specularColorMap,D=!!M.specularIntensityMap,re=xe&&!!M.transmissionMap,Se=xe&&!!M.thicknessMap,pe=!!M.gradientMap,$=!!M.alphaMap,F=M.alphaTest>0,se=!!M.alphaHash,ce=!!M.extensions,we=!!B.attributes.uv1,Te=!!B.attributes.uv2,Xe=!!B.attributes.uv3;let Ye=si;return M.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Ye=n.toneMapping),{isWebGL2:c,shaderID:K,shaderType:M.type,shaderName:M.name,vertexShader:Y,fragmentShader:Z,defines:M.defines,customVertexShaderID:ae,customFragmentShaderID:de,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ce,instancing:Re,instancingColor:Re&&O.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ge===null?n.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Jt,map:_e,matcap:Ue,envMap:H,envMapMode:H&&k.mapping,envMapCubeUVHeight:q,aoMap:Rt,lightMap:Ee,bumpMap:De,normalMap:ve,displacementMap:f&&it,emissiveMap:Be,normalMapObjectSpace:ve&&M.normalMapType===hf,normalMapTangentSpace:ve&&M.normalMapType===Ru,metalnessMap:R,roughnessMap:w,anisotropy:G,anisotropyMap:ue,clearcoat:te,clearcoatMap:me,clearcoatNormalMap:be,clearcoatRoughnessMap:Oe,iridescence:J,iridescenceMap:Q,iridescenceThicknessMap:Qe,sheen:ne,sheenColorMap:Ge,sheenRoughnessMap:Le,specularMap:Me,specularColorMap:he,specularIntensityMap:D,transmission:xe,transmissionMap:re,thicknessMap:Se,gradientMap:pe,opaque:M.transparent===!1&&M.blending===ur,alphaMap:$,alphaTest:F,alphaHash:se,combine:M.combine,mapUv:_e&&x(M.map.channel),aoMapUv:Rt&&x(M.aoMap.channel),lightMapUv:Ee&&x(M.lightMap.channel),bumpMapUv:De&&x(M.bumpMap.channel),normalMapUv:ve&&x(M.normalMap.channel),displacementMapUv:it&&x(M.displacementMap.channel),emissiveMapUv:Be&&x(M.emissiveMap.channel),metalnessMapUv:R&&x(M.metalnessMap.channel),roughnessMapUv:w&&x(M.roughnessMap.channel),anisotropyMapUv:ue&&x(M.anisotropyMap.channel),clearcoatMapUv:me&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:be&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Qe&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Le&&x(M.sheenRoughnessMap.channel),specularMapUv:Me&&x(M.specularMap.channel),specularColorMapUv:he&&x(M.specularColorMap.channel),specularIntensityMapUv:D&&x(M.specularIntensityMap.channel),transmissionMapUv:re&&x(M.transmissionMap.channel),thicknessMapUv:Se&&x(M.thicknessMap.channel),alphaMapUv:$&&x(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ve||G),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:Te,vertexUv3s:Xe,pointsUvs:O.isPoints===!0&&!!B.attributes.uv&&(_e||$),fog:!!C,useFog:M.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:O.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ie,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ye,useLegacyLights:n._useLegacyLights,decodeVideoTexture:_e&&M.map.isVideoTexture===!0&&et.getTransfer(M.map.colorSpace)===rt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===At,flipSided:M.side===_t,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ce&&M.extensions.derivatives===!0,extensionFragDepth:ce&&M.extensions.fragDepth===!0,extensionDrawBuffers:ce&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ce&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:c||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){const b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(const I in M.defines)b.push(I),b.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(y(b,M),g(b,M),b.push(n.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function y(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function g(M,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function S(M){const b=v[M.type];let I;if(b){const L=En[b];I=zf.clone(L.uniforms)}else I=M.uniforms;return I}function _(M,b){let I;for(let L=0,O=u.length;L<O;L++){const C=u[L];if(C.cacheKey===b){I=C,++I.usedTimes;break}}return I===void 0&&(I=new $g(n,b,M,s),u.push(I)),I}function T(M){if(--M.usedTimes===0){const b=u.indexOf(M);u[b]=u[u.length-1],u.pop(),M.destroy()}}function E(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:_,releaseProgram:T,releaseShaderCache:E,programs:u,dispose:P}}function rv(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function sv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function xc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Sc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,f,p,v,x,m){let d=n[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:v,renderOrder:h.renderOrder,z:x,group:m},n[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=v,d.renderOrder=h.renderOrder,d.z=x,d.group=m),e++,d}function a(h,f,p,v,x,m){const d=o(h,f,p,v,x,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(h,f,p,v,x,m){const d=o(h,f,p,v,x,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function u(h,f){t.length>1&&t.sort(h||sv),i.length>1&&i.sort(f||xc),r.length>1&&r.sort(f||xc)}function c(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:c,sort:u}}function av(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Sc,n.set(i,[o])):r>=s.length?(o=new Sc,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function ov(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Fe};break;case"SpotLight":t={position:new U,direction:new U,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function lv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let cv=0;function uv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function hv(n,e){const t=new ov,i=lv(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new U);const s=new U,o=new Pe,a=new Pe;function l(c,h){let f=0,p=0,v=0;for(let L=0;L<9;L++)r.probe[L].set(0,0,0);let x=0,m=0,d=0,y=0,g=0,S=0,_=0,T=0,E=0,P=0,M=0;c.sort(uv);const b=h===!0?Math.PI:1;for(let L=0,O=c.length;L<O;L++){const C=c[L],B=C.color,N=C.intensity,k=C.distance,q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)f+=B.r*N*b,p+=B.g*N*b,v+=B.b*N*b;else if(C.isLightProbe){for(let K=0;K<9;K++)r.probe[K].addScaledVector(C.sh.coefficients[K],N);M++}else if(C.isDirectionalLight){const K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity*b),C.castShadow){const j=C.shadow,ee=i.get(C);ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,r.directionalShadow[x]=ee,r.directionalShadowMap[x]=q,r.directionalShadowMatrix[x]=C.shadow.matrix,S++}r.directional[x]=K,x++}else if(C.isSpotLight){const K=t.get(C);K.position.setFromMatrixPosition(C.matrixWorld),K.color.copy(B).multiplyScalar(N*b),K.distance=k,K.coneCos=Math.cos(C.angle),K.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),K.decay=C.decay,r.spot[d]=K;const j=C.shadow;if(C.map&&(r.spotLightMap[E]=C.map,E++,j.updateMatrices(C),C.castShadow&&P++),r.spotLightMatrix[d]=j.matrix,C.castShadow){const ee=i.get(C);ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,r.spotShadow[d]=ee,r.spotShadowMap[d]=q,T++}d++}else if(C.isRectAreaLight){const K=t.get(C);K.color.copy(B).multiplyScalar(N),K.halfWidth.set(C.width*.5,0,0),K.halfHeight.set(0,C.height*.5,0),r.rectArea[y]=K,y++}else if(C.isPointLight){const K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity*b),K.distance=C.distance,K.decay=C.decay,C.castShadow){const j=C.shadow,ee=i.get(C);ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,ee.shadowCameraNear=j.camera.near,ee.shadowCameraFar=j.camera.far,r.pointShadow[m]=ee,r.pointShadowMap[m]=q,r.pointShadowMatrix[m]=C.shadow.matrix,_++}r.point[m]=K,m++}else if(C.isHemisphereLight){const K=t.get(C);K.skyColor.copy(C.color).multiplyScalar(N*b),K.groundColor.copy(C.groundColor).multiplyScalar(N*b),r.hemi[g]=K,g++}}y>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=p,r.ambient[2]=v;const I=r.hash;(I.directionalLength!==x||I.pointLength!==m||I.spotLength!==d||I.rectAreaLength!==y||I.hemiLength!==g||I.numDirectionalShadows!==S||I.numPointShadows!==_||I.numSpotShadows!==T||I.numSpotMaps!==E||I.numLightProbes!==M)&&(r.directional.length=x,r.spot.length=d,r.rectArea.length=y,r.point.length=m,r.hemi.length=g,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=_,r.pointShadowMap.length=_,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=_,r.spotLightMatrix.length=T+E-P,r.spotLightMap.length=E,r.numSpotLightShadowsWithMaps=P,r.numLightProbes=M,I.directionalLength=x,I.pointLength=m,I.spotLength=d,I.rectAreaLength=y,I.hemiLength=g,I.numDirectionalShadows=S,I.numPointShadows=_,I.numSpotShadows=T,I.numSpotMaps=E,I.numLightProbes=M,r.version=cv++)}function u(c,h){let f=0,p=0,v=0,x=0,m=0;const d=h.matrixWorldInverse;for(let y=0,g=c.length;y<g;y++){const S=c[y];if(S.isDirectionalLight){const _=r.directional[f];_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(d),f++}else if(S.isSpotLight){const _=r.spot[v];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(d),_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(d),v++}else if(S.isRectAreaLight){const _=r.rectArea[x];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(d),a.identity(),o.copy(S.matrixWorld),o.premultiply(d),a.extractRotation(o),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){const _=r.point[p];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(d),p++}else if(S.isHemisphereLight){const _=r.hemi[m];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(d),m++}}}return{setup:l,setupView:u,state:r}}function yc(n,e){const t=new hv(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(h){i.push(h)}function a(h){r.push(h)}function l(h){t.setup(i,h)}function u(h){t.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a}}function fv(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new yc(n,e),t.set(s,[l])):o>=a.length?(l=new yc(n,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class dv extends yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class pv extends yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const mv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vv(n,e,t){let i=new Bo;const r=new le,s=new le,o=new tt,a=new dv({depthPacking:uf}),l=new pv,u={},c=t.maxTextureSize,h={[Sn]:_t,[_t]:Sn,[At]:At},f=new lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:mv,fragmentShader:gv}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new $t;v.setAttribute("position",new ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new $e(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=du;let d=this.type;this.render=function(T,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const M=n.getRenderTarget(),b=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Yt),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const O=d!==Bn&&this.type===Bn,C=d===Bn&&this.type!==Bn;for(let B=0,N=T.length;B<N;B++){const k=T[B],q=k.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",k,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const K=q.getFrameExtents();if(r.multiply(K),s.copy(q.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/K.x),r.x=s.x*K.x,q.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/K.y),r.y=s.y*K.y,q.mapSize.y=s.y)),q.map===null||O===!0||C===!0){const ee=this.type!==Bn?{minFilter:st,magFilter:st}:{};q.map!==null&&q.map.dispose(),q.map=new ut(r.x,r.y,ee),q.map.texture.name=k.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const j=q.getViewportCount();for(let ee=0;ee<j;ee++){const ie=q.getViewport(ee);o.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),L.viewport(o),q.updateMatrices(k,ee),i=q.getFrustum(),S(E,P,q.camera,k,this.type)}q.isPointLightShadow!==!0&&this.type===Bn&&y(q,P),q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(M,b,I)};function y(T,E){const P=e.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ut(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(E,null,P,f,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(E,null,P,p,x,null)}function g(T,E,P,M){let b=null;const I=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)b=I;else if(b=P.isPointLight===!0?l:a,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const L=b.uuid,O=E.uuid;let C=u[L];C===void 0&&(C={},u[L]=C);let B=C[O];B===void 0&&(B=b.clone(),C[O]=B,E.addEventListener("dispose",_)),b=B}if(b.visible=E.visible,b.wireframe=E.wireframe,M===Bn?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:h[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const L=n.properties.get(b);L.light=P}return b}function S(T,E,P,M,b){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===Bn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const O=e.update(T),C=T.material;if(Array.isArray(C)){const B=O.groups;for(let N=0,k=B.length;N<k;N++){const q=B[N],K=C[q.materialIndex];if(K&&K.visible){const j=g(T,K,M,b);T.onBeforeShadow(n,T,E,P,O,j,q),n.renderBufferDirect(P,null,O,j,T,q),T.onAfterShadow(n,T,E,P,O,j,q)}}}else if(C.visible){const B=g(T,C,M,b);T.onBeforeShadow(n,T,E,P,O,B,null),n.renderBufferDirect(P,null,O,B,T,null),T.onAfterShadow(n,T,E,P,O,B,null)}}const L=T.children;for(let O=0,C=L.length;O<C;O++)S(L[O],E,P,M,b)}function _(T){T.target.removeEventListener("dispose",_);for(const P in u){const M=u[P],b=T.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}function xv(n,e,t){const i=t.isWebGL2;function r(){let F=!1;const se=new tt;let ce=null;const we=new tt(0,0,0,0);return{setMask:function(Te){ce!==Te&&!F&&(n.colorMask(Te,Te,Te,Te),ce=Te)},setLocked:function(Te){F=Te},setClear:function(Te,Xe,Ye,ft,mt){mt===!0&&(Te*=ft,Xe*=ft,Ye*=ft),se.set(Te,Xe,Ye,ft),we.equals(se)===!1&&(n.clearColor(Te,Xe,Ye,ft),we.copy(se))},reset:function(){F=!1,ce=null,we.set(-1,0,0,0)}}}function s(){let F=!1,se=null,ce=null,we=null;return{setTest:function(Te){Te?Ce(n.DEPTH_TEST):_e(n.DEPTH_TEST)},setMask:function(Te){se!==Te&&!F&&(n.depthMask(Te),se=Te)},setFunc:function(Te){if(ce!==Te){switch(Te){case Vh:n.depthFunc(n.NEVER);break;case mu:n.depthFunc(n.ALWAYS);break;case kh:n.depthFunc(n.LESS);break;case Hs:n.depthFunc(n.LEQUAL);break;case Wh:n.depthFunc(n.EQUAL);break;case Xh:n.depthFunc(n.GEQUAL);break;case Yh:n.depthFunc(n.GREATER);break;case qh:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=Te}},setLocked:function(Te){F=Te},setClear:function(Te){we!==Te&&(n.clearDepth(Te),we=Te)},reset:function(){F=!1,se=null,ce=null,we=null}}}function o(){let F=!1,se=null,ce=null,we=null,Te=null,Xe=null,Ye=null,ft=null,mt=null;return{setTest:function(Ze){F||(Ze?Ce(n.STENCIL_TEST):_e(n.STENCIL_TEST))},setMask:function(Ze){se!==Ze&&!F&&(n.stencilMask(Ze),se=Ze)},setFunc:function(Ze,xt,_n){(ce!==Ze||we!==xt||Te!==_n)&&(n.stencilFunc(Ze,xt,_n),ce=Ze,we=xt,Te=_n)},setOp:function(Ze,xt,_n){(Xe!==Ze||Ye!==xt||ft!==_n)&&(n.stencilOp(Ze,xt,_n),Xe=Ze,Ye=xt,ft=_n)},setLocked:function(Ze){F=Ze},setClear:function(Ze){mt!==Ze&&(n.clearStencil(Ze),mt=Ze)},reset:function(){F=!1,se=null,ce=null,we=null,Te=null,Xe=null,Ye=null,ft=null,mt=null}}}const a=new r,l=new s,u=new o,c=new WeakMap,h=new WeakMap;let f={},p={},v=new WeakMap,x=[],m=null,d=!1,y=null,g=null,S=null,_=null,T=null,E=null,P=null,M=new Fe(0,0,0),b=0,I=!1,L=null,O=null,C=null,B=null,N=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,K=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(j)[1]),q=K>=1):j.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),q=K>=2);let ee=null,ie={};const Y=n.getParameter(n.SCISSOR_BOX),Z=n.getParameter(n.VIEWPORT),ae=new tt().fromArray(Y),de=new tt().fromArray(Z);function ge(F,se,ce,we){const Te=new Uint8Array(4),Xe=n.createTexture();n.bindTexture(F,Xe),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ye=0;Ye<ce;Ye++)i&&(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)?n.texImage3D(se,0,n.RGBA,1,1,we,0,n.RGBA,n.UNSIGNED_BYTE,Te):n.texImage2D(se+Ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Te);return Xe}const Re={};Re[n.TEXTURE_2D]=ge(n.TEXTURE_2D,n.TEXTURE_2D,1),Re[n.TEXTURE_CUBE_MAP]=ge(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Re[n.TEXTURE_2D_ARRAY]=ge(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Re[n.TEXTURE_3D]=ge(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),u.setClear(0),Ce(n.DEPTH_TEST),l.setFunc(Hs),Be(!1),R(nl),Ce(n.CULL_FACE),ve(Yt);function Ce(F){f[F]!==!0&&(n.enable(F),f[F]=!0)}function _e(F){f[F]!==!1&&(n.disable(F),f[F]=!1)}function Ue(F,se){return p[F]!==se?(n.bindFramebuffer(F,se),p[F]=se,i&&(F===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=se),F===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=se)),!0):!1}function H(F,se){let ce=x,we=!1;if(F)if(ce=v.get(se),ce===void 0&&(ce=[],v.set(se,ce)),F.isWebGLMultipleRenderTargets){const Te=F.texture;if(ce.length!==Te.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let Xe=0,Ye=Te.length;Xe<Ye;Xe++)ce[Xe]=n.COLOR_ATTACHMENT0+Xe;ce.length=Te.length,we=!0}}else ce[0]!==n.COLOR_ATTACHMENT0&&(ce[0]=n.COLOR_ATTACHMENT0,we=!0);else ce[0]!==n.BACK&&(ce[0]=n.BACK,we=!0);we&&(t.isWebGL2?n.drawBuffers(ce):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ce))}function Rt(F){return m!==F?(n.useProgram(F),m=F,!0):!1}const Ee={[Ti]:n.FUNC_ADD,[Ah]:n.FUNC_SUBTRACT,[Rh]:n.FUNC_REVERSE_SUBTRACT};if(i)Ee[al]=n.MIN,Ee[ol]=n.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(Ee[al]=F.MIN_EXT,Ee[ol]=F.MAX_EXT)}const De={[Ch]:n.ZERO,[Ph]:n.ONE,[Dh]:n.SRC_COLOR,[fo]:n.SRC_ALPHA,[Bh]:n.SRC_ALPHA_SATURATE,[Nh]:n.DST_COLOR,[Ih]:n.DST_ALPHA,[Lh]:n.ONE_MINUS_SRC_COLOR,[po]:n.ONE_MINUS_SRC_ALPHA,[Fh]:n.ONE_MINUS_DST_COLOR,[Uh]:n.ONE_MINUS_DST_ALPHA,[Oh]:n.CONSTANT_COLOR,[zh]:n.ONE_MINUS_CONSTANT_COLOR,[Hh]:n.CONSTANT_ALPHA,[Gh]:n.ONE_MINUS_CONSTANT_ALPHA};function ve(F,se,ce,we,Te,Xe,Ye,ft,mt,Ze){if(F===Yt){d===!0&&(_e(n.BLEND),d=!1);return}if(d===!1&&(Ce(n.BLEND),d=!0),F!==wh){if(F!==y||Ze!==I){if((g!==Ti||T!==Ti)&&(n.blendEquation(n.FUNC_ADD),g=Ti,T=Ti),Ze)switch(F){case ur:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case il:n.blendFunc(n.ONE,n.ONE);break;case rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case sl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case ur:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case il:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case sl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}S=null,_=null,E=null,P=null,M.set(0,0,0),b=0,y=F,I=Ze}return}Te=Te||se,Xe=Xe||ce,Ye=Ye||we,(se!==g||Te!==T)&&(n.blendEquationSeparate(Ee[se],Ee[Te]),g=se,T=Te),(ce!==S||we!==_||Xe!==E||Ye!==P)&&(n.blendFuncSeparate(De[ce],De[we],De[Xe],De[Ye]),S=ce,_=we,E=Xe,P=Ye),(ft.equals(M)===!1||mt!==b)&&(n.blendColor(ft.r,ft.g,ft.b,mt),M.copy(ft),b=mt),y=F,I=!1}function it(F,se){F.side===At?_e(n.CULL_FACE):Ce(n.CULL_FACE);let ce=F.side===_t;se&&(ce=!ce),Be(ce),F.blending===ur&&F.transparent===!1?ve(Yt):ve(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),a.setMask(F.colorWrite);const we=F.stencilWrite;u.setTest(we),we&&(u.setMask(F.stencilWriteMask),u.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),u.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),G(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Ce(n.SAMPLE_ALPHA_TO_COVERAGE):_e(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(F){L!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),L=F)}function R(F){F!==Th?(Ce(n.CULL_FACE),F!==O&&(F===nl?n.cullFace(n.BACK):F===bh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):_e(n.CULL_FACE),O=F}function w(F){F!==C&&(q&&n.lineWidth(F),C=F)}function G(F,se,ce){F?(Ce(n.POLYGON_OFFSET_FILL),(B!==se||N!==ce)&&(n.polygonOffset(se,ce),B=se,N=ce)):_e(n.POLYGON_OFFSET_FILL)}function te(F){F?Ce(n.SCISSOR_TEST):_e(n.SCISSOR_TEST)}function J(F){F===void 0&&(F=n.TEXTURE0+k-1),ee!==F&&(n.activeTexture(F),ee=F)}function ne(F,se,ce){ce===void 0&&(ee===null?ce=n.TEXTURE0+k-1:ce=ee);let we=ie[ce];we===void 0&&(we={type:void 0,texture:void 0},ie[ce]=we),(we.type!==F||we.texture!==se)&&(ee!==ce&&(n.activeTexture(ce),ee=ce),n.bindTexture(F,se||Re[F]),we.type=F,we.texture=se)}function xe(){const F=ie[ee];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ue(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Oe(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Qe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ge(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Le(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Me(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function he(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function D(F){ae.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),ae.copy(F))}function re(F){de.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),de.copy(F))}function Se(F,se){let ce=h.get(se);ce===void 0&&(ce=new WeakMap,h.set(se,ce));let we=ce.get(F);we===void 0&&(we=n.getUniformBlockIndex(se,F.name),ce.set(F,we))}function pe(F,se){const we=h.get(se).get(F);c.get(se)!==we&&(n.uniformBlockBinding(se,we,F.__bindingPointIndex),c.set(se,we))}function $(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},ee=null,ie={},p={},v=new WeakMap,x=[],m=null,d=!1,y=null,g=null,S=null,_=null,T=null,E=null,P=null,M=new Fe(0,0,0),b=0,I=!1,L=null,O=null,C=null,B=null,N=null,ae.set(0,0,n.canvas.width,n.canvas.height),de.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),u.reset()}return{buffers:{color:a,depth:l,stencil:u},enable:Ce,disable:_e,bindFramebuffer:Ue,drawBuffers:H,useProgram:Rt,setBlending:ve,setMaterial:it,setFlipSided:Be,setCullFace:R,setLineWidth:w,setPolygonOffset:G,setScissorTest:te,activeTexture:J,bindTexture:ne,unbindTexture:xe,compressedTexImage2D:ue,compressedTexImage3D:me,texImage2D:Me,texImage3D:he,updateUBOMapping:Se,uniformBlockBinding:pe,texStorage2D:Ge,texStorage3D:Le,texSubImage2D:be,texSubImage3D:Oe,compressedTexSubImage2D:Q,compressedTexSubImage3D:Qe,scissor:D,viewport:re,reset:$}}function Sv(n,e,t,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,w){return p?new OffscreenCanvas(R,w):zr("canvas")}function x(R,w,G,te){let J=1;if((R.width>te||R.height>te)&&(J=te/Math.max(R.width,R.height)),J<1||w===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const ne=w?yo:Math.floor,xe=ne(J*R.width),ue=ne(J*R.height);h===void 0&&(h=v(xe,ue));const me=G?v(xe,ue):h;return me.width=xe,me.height=ue,me.getContext("2d").drawImage(R,0,0,xe,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+xe+"x"+ue+")."),me}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return Bl(R.width)&&Bl(R.height)}function d(R){return a?!1:R.wrapS!==vn||R.wrapT!==vn||R.minFilter!==st&&R.minFilter!==nt}function y(R,w){return R.generateMipmaps&&w&&R.minFilter!==st&&R.minFilter!==nt}function g(R){n.generateMipmap(R)}function S(R,w,G,te,J=!1){if(a===!1)return w;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ne=w;if(w===n.RED&&(G===n.FLOAT&&(ne=n.R32F),G===n.HALF_FLOAT&&(ne=n.R16F),G===n.UNSIGNED_BYTE&&(ne=n.R8)),w===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(ne=n.R8UI),G===n.UNSIGNED_SHORT&&(ne=n.R16UI),G===n.UNSIGNED_INT&&(ne=n.R32UI),G===n.BYTE&&(ne=n.R8I),G===n.SHORT&&(ne=n.R16I),G===n.INT&&(ne=n.R32I)),w===n.RG&&(G===n.FLOAT&&(ne=n.RG32F),G===n.HALF_FLOAT&&(ne=n.RG16F),G===n.UNSIGNED_BYTE&&(ne=n.RG8)),w===n.RGBA){const xe=J?Gs:et.getTransfer(te);G===n.FLOAT&&(ne=n.RGBA32F),G===n.HALF_FLOAT&&(ne=n.RGBA16F),G===n.UNSIGNED_BYTE&&(ne=xe===rt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(ne=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(ne=n.RGB5_A1)}return(ne===n.R16F||ne===n.R32F||ne===n.RG16F||ne===n.RG32F||ne===n.RGBA16F||ne===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function _(R,w,G){return y(R,G)===!0||R.isFramebufferTexture&&R.minFilter!==st&&R.minFilter!==nt?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function T(R){return R===st||R===ll||R===la?n.NEAREST:n.LINEAR}function E(R){const w=R.target;w.removeEventListener("dispose",E),M(w),w.isVideoTexture&&c.delete(w)}function P(R){const w=R.target;w.removeEventListener("dispose",P),I(w)}function M(R){const w=i.get(R);if(w.__webglInit===void 0)return;const G=R.source,te=f.get(G);if(te){const J=te[w.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(R),Object.keys(te).length===0&&f.delete(G)}i.remove(R)}function b(R){const w=i.get(R);n.deleteTexture(w.__webglTexture);const G=R.source,te=f.get(G);delete te[w.__cacheKey],o.memory.textures--}function I(R){const w=R.texture,G=i.get(R),te=i.get(w);if(te.__webglTexture!==void 0&&(n.deleteTexture(te.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(G.__webglFramebuffer[J]))for(let ne=0;ne<G.__webglFramebuffer[J].length;ne++)n.deleteFramebuffer(G.__webglFramebuffer[J][ne]);else n.deleteFramebuffer(G.__webglFramebuffer[J]);G.__webglDepthbuffer&&n.deleteRenderbuffer(G.__webglDepthbuffer[J])}else{if(Array.isArray(G.__webglFramebuffer))for(let J=0;J<G.__webglFramebuffer.length;J++)n.deleteFramebuffer(G.__webglFramebuffer[J]);else n.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&n.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&n.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let J=0;J<G.__webglColorRenderbuffer.length;J++)G.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(G.__webglColorRenderbuffer[J]);G.__webglDepthRenderbuffer&&n.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let J=0,ne=w.length;J<ne;J++){const xe=i.get(w[J]);xe.__webglTexture&&(n.deleteTexture(xe.__webglTexture),o.memory.textures--),i.remove(w[J])}i.remove(w),i.remove(R)}let L=0;function O(){L=0}function C(){const R=L;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),L+=1,R}function B(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function N(R,w){const G=i.get(R);if(R.isVideoTexture&&it(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const te=R.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(G,R,w);return}}t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+w)}function k(R,w){const G=i.get(R);if(R.version>0&&G.__version!==R.version){ae(G,R,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+w)}function q(R,w){const G=i.get(R);if(R.version>0&&G.__version!==R.version){ae(G,R,w);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+w)}function K(R,w){const G=i.get(R);if(R.version>0&&G.__version!==R.version){de(G,R,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+w)}const j={[Wn]:n.REPEAT,[vn]:n.CLAMP_TO_EDGE,[vo]:n.MIRRORED_REPEAT},ee={[st]:n.NEAREST,[ll]:n.NEAREST_MIPMAP_NEAREST,[la]:n.NEAREST_MIPMAP_LINEAR,[nt]:n.LINEAR,[tf]:n.LINEAR_MIPMAP_NEAREST,[Or]:n.LINEAR_MIPMAP_LINEAR},ie={[ff]:n.NEVER,[xf]:n.ALWAYS,[df]:n.LESS,[Cu]:n.LEQUAL,[pf]:n.EQUAL,[vf]:n.GEQUAL,[mf]:n.GREATER,[gf]:n.NOTEQUAL};function Y(R,w,G){if(G?(n.texParameteri(R,n.TEXTURE_WRAP_S,j[w.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,j[w.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,j[w.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,ee[w.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,ee[w.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(w.wrapS!==vn||w.wrapT!==vn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,T(w.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,T(w.minFilter)),w.minFilter!==st&&w.minFilter!==nt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ie[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===st||w.minFilter!==la&&w.minFilter!==Or||w.type===Hn&&e.has("OES_texture_float_linear")===!1||a===!1&&w.type===Gn&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||i.get(w).__currentAnisotropy)&&(n.texParameterf(R,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy)}}function Z(R,w){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",E));const te=w.source;let J=f.get(te);J===void 0&&(J={},f.set(te,J));const ne=B(w);if(ne!==R.__cacheKey){J[ne]===void 0&&(J[ne]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),J[ne].usedTimes++;const xe=J[R.__cacheKey];xe!==void 0&&(J[R.__cacheKey].usedTimes--,xe.usedTimes===0&&b(w)),R.__cacheKey=ne,R.__webglTexture=J[ne].texture}return G}function ae(R,w,G){let te=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(te=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(te=n.TEXTURE_3D);const J=Z(R,w),ne=w.source;t.bindTexture(te,R.__webglTexture,n.TEXTURE0+G);const xe=i.get(ne);if(ne.version!==xe.__version||J===!0){t.activeTexture(n.TEXTURE0+G);const ue=et.getPrimaries(et.workingColorSpace),me=w.colorSpace===Ht?null:et.getPrimaries(w.colorSpace),be=w.colorSpace===Ht||ue===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Oe=d(w)&&m(w.image)===!1;let Q=x(w.image,Oe,!1,r.maxTextureSize);Q=Be(w,Q);const Qe=m(Q)||a,Ge=s.convert(w.format,w.colorSpace);let Le=s.convert(w.type),Me=S(w.internalFormat,Ge,Le,w.colorSpace,w.isVideoTexture);Y(te,w,Qe);let he;const D=w.mipmaps,re=a&&w.isVideoTexture!==!0&&Me!==wu,Se=xe.__version===void 0||J===!0,pe=_(w,Q,Qe);if(w.isDepthTexture)Me=n.DEPTH_COMPONENT,a?w.type===Hn?Me=n.DEPTH_COMPONENT32F:w.type===Tn?Me=n.DEPTH_COMPONENT24:w.type===ai?Me=n.DEPTH24_STENCIL8:Me=n.DEPTH_COMPONENT16:w.type===Hn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===Ci&&Me===n.DEPTH_COMPONENT&&w.type!==No&&w.type!==Tn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Tn,Le=s.convert(w.type)),w.format===Ii&&Me===n.DEPTH_COMPONENT&&(Me=n.DEPTH_STENCIL,w.type!==ai&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=ai,Le=s.convert(w.type))),Se&&(re?t.texStorage2D(n.TEXTURE_2D,1,Me,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,Me,Q.width,Q.height,0,Ge,Le,null));else if(w.isDataTexture)if(D.length>0&&Qe){re&&Se&&t.texStorage2D(n.TEXTURE_2D,pe,Me,D[0].width,D[0].height);for(let $=0,F=D.length;$<F;$++)he=D[$],re?t.texSubImage2D(n.TEXTURE_2D,$,0,0,he.width,he.height,Ge,Le,he.data):t.texImage2D(n.TEXTURE_2D,$,Me,he.width,he.height,0,Ge,Le,he.data);w.generateMipmaps=!1}else re?(Se&&t.texStorage2D(n.TEXTURE_2D,pe,Me,Q.width,Q.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Q.width,Q.height,Ge,Le,Q.data)):t.texImage2D(n.TEXTURE_2D,0,Me,Q.width,Q.height,0,Ge,Le,Q.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){re&&Se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,Me,D[0].width,D[0].height,Q.depth);for(let $=0,F=D.length;$<F;$++)he=D[$],w.format!==Pt?Ge!==null?re?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,he.width,he.height,Q.depth,Ge,he.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,Me,he.width,he.height,Q.depth,0,he.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,he.width,he.height,Q.depth,Ge,Le,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,Me,he.width,he.height,Q.depth,0,Ge,Le,he.data)}else{re&&Se&&t.texStorage2D(n.TEXTURE_2D,pe,Me,D[0].width,D[0].height);for(let $=0,F=D.length;$<F;$++)he=D[$],w.format!==Pt?Ge!==null?re?t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,he.width,he.height,Ge,he.data):t.compressedTexImage2D(n.TEXTURE_2D,$,Me,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?t.texSubImage2D(n.TEXTURE_2D,$,0,0,he.width,he.height,Ge,Le,he.data):t.texImage2D(n.TEXTURE_2D,$,Me,he.width,he.height,0,Ge,Le,he.data)}else if(w.isDataArrayTexture)re?(Se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,Me,Q.width,Q.height,Q.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Ge,Le,Q.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,Q.width,Q.height,Q.depth,0,Ge,Le,Q.data);else if(w.isData3DTexture)re?(Se&&t.texStorage3D(n.TEXTURE_3D,pe,Me,Q.width,Q.height,Q.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Ge,Le,Q.data)):t.texImage3D(n.TEXTURE_3D,0,Me,Q.width,Q.height,Q.depth,0,Ge,Le,Q.data);else if(w.isFramebufferTexture){if(Se)if(re)t.texStorage2D(n.TEXTURE_2D,pe,Me,Q.width,Q.height);else{let $=Q.width,F=Q.height;for(let se=0;se<pe;se++)t.texImage2D(n.TEXTURE_2D,se,Me,$,F,0,Ge,Le,null),$>>=1,F>>=1}}else if(D.length>0&&Qe){re&&Se&&t.texStorage2D(n.TEXTURE_2D,pe,Me,D[0].width,D[0].height);for(let $=0,F=D.length;$<F;$++)he=D[$],re?t.texSubImage2D(n.TEXTURE_2D,$,0,0,Ge,Le,he):t.texImage2D(n.TEXTURE_2D,$,Me,Ge,Le,he);w.generateMipmaps=!1}else re?(Se&&t.texStorage2D(n.TEXTURE_2D,pe,Me,Q.width,Q.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ge,Le,Q)):t.texImage2D(n.TEXTURE_2D,0,Me,Ge,Le,Q);y(w,Qe)&&g(te),xe.__version=ne.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function de(R,w,G){if(w.image.length!==6)return;const te=Z(R,w),J=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+G);const ne=i.get(J);if(J.version!==ne.__version||te===!0){t.activeTexture(n.TEXTURE0+G);const xe=et.getPrimaries(et.workingColorSpace),ue=w.colorSpace===Ht?null:et.getPrimaries(w.colorSpace),me=w.colorSpace===Ht||xe===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const be=w.isCompressedTexture||w.image[0].isCompressedTexture,Oe=w.image[0]&&w.image[0].isDataTexture,Q=[];for(let $=0;$<6;$++)!be&&!Oe?Q[$]=x(w.image[$],!1,!0,r.maxCubemapSize):Q[$]=Oe?w.image[$].image:w.image[$],Q[$]=Be(w,Q[$]);const Qe=Q[0],Ge=m(Qe)||a,Le=s.convert(w.format,w.colorSpace),Me=s.convert(w.type),he=S(w.internalFormat,Le,Me,w.colorSpace),D=a&&w.isVideoTexture!==!0,re=ne.__version===void 0||te===!0;let Se=_(w,Qe,Ge);Y(n.TEXTURE_CUBE_MAP,w,Ge);let pe;if(be){D&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,he,Qe.width,Qe.height);for(let $=0;$<6;$++){pe=Q[$].mipmaps;for(let F=0;F<pe.length;F++){const se=pe[F];w.format!==Pt?Le!==null?D?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,F,0,0,se.width,se.height,Le,se.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,F,he,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,F,0,0,se.width,se.height,Le,Me,se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,F,he,se.width,se.height,0,Le,Me,se.data)}}}else{pe=w.mipmaps,D&&re&&(pe.length>0&&Se++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,he,Q[0].width,Q[0].height));for(let $=0;$<6;$++)if(Oe){D?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Q[$].width,Q[$].height,Le,Me,Q[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,he,Q[$].width,Q[$].height,0,Le,Me,Q[$].data);for(let F=0;F<pe.length;F++){const ce=pe[F].image[$].image;D?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,F+1,0,0,ce.width,ce.height,Le,Me,ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,F+1,he,ce.width,ce.height,0,Le,Me,ce.data)}}else{D?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Le,Me,Q[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,he,Le,Me,Q[$]);for(let F=0;F<pe.length;F++){const se=pe[F];D?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,F+1,0,0,Le,Me,se.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,F+1,he,Le,Me,se.image[$])}}}y(w,Ge)&&g(n.TEXTURE_CUBE_MAP),ne.__version=J.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function ge(R,w,G,te,J,ne){const xe=s.convert(G.format,G.colorSpace),ue=s.convert(G.type),me=S(G.internalFormat,xe,ue,G.colorSpace);if(!i.get(w).__hasExternalTextures){const Oe=Math.max(1,w.width>>ne),Q=Math.max(1,w.height>>ne);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,ne,me,Oe,Q,w.depth,0,xe,ue,null):t.texImage2D(J,ne,me,Oe,Q,0,xe,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),ve(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,J,i.get(G).__webglTexture,0,De(w)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,te,J,i.get(G).__webglTexture,ne),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(R,w,G){if(n.bindRenderbuffer(n.RENDERBUFFER,R),w.depthBuffer&&!w.stencilBuffer){let te=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(G||ve(w)){const J=w.depthTexture;J&&J.isDepthTexture&&(J.type===Hn?te=n.DEPTH_COMPONENT32F:J.type===Tn&&(te=n.DEPTH_COMPONENT24));const ne=De(w);ve(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,te,w.width,w.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,te,w.width,w.height)}else n.renderbufferStorage(n.RENDERBUFFER,te,w.width,w.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(w.depthBuffer&&w.stencilBuffer){const te=De(w);G&&ve(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,te,n.DEPTH24_STENCIL8,w.width,w.height):ve(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,n.DEPTH24_STENCIL8,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{const te=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let J=0;J<te.length;J++){const ne=te[J],xe=s.convert(ne.format,ne.colorSpace),ue=s.convert(ne.type),me=S(ne.internalFormat,xe,ue,ne.colorSpace),be=De(w);G&&ve(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,be,me,w.width,w.height):ve(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be,me,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,me,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ce(R,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),N(w.depthTexture,0);const te=i.get(w.depthTexture).__webglTexture,J=De(w);if(w.depthTexture.format===Ci)ve(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0);else if(w.depthTexture.format===Ii)ve(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function _e(R){const w=i.get(R),G=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Ce(w.__webglFramebuffer,R)}else if(G){w.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[te]),w.__webglDepthbuffer[te]=n.createRenderbuffer(),Re(w.__webglDepthbuffer[te],R,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=n.createRenderbuffer(),Re(w.__webglDepthbuffer,R,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ue(R,w,G){const te=i.get(R);w!==void 0&&ge(te.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&_e(R)}function H(R){const w=R.texture,G=i.get(R),te=i.get(w);R.addEventListener("dispose",P),R.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture()),te.__version=w.version,o.memory.textures++);const J=R.isWebGLCubeRenderTarget===!0,ne=R.isWebGLMultipleRenderTargets===!0,xe=m(R)||a;if(J){G.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(a&&w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[ue]=[];for(let me=0;me<w.mipmaps.length;me++)G.__webglFramebuffer[ue][me]=n.createFramebuffer()}else G.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(a&&w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let ue=0;ue<w.mipmaps.length;ue++)G.__webglFramebuffer[ue]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(ne)if(r.drawBuffers){const ue=R.texture;for(let me=0,be=ue.length;me<be;me++){const Oe=i.get(ue[me]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&ve(R)===!1){const ue=ne?w:[w];G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let me=0;me<ue.length;me++){const be=ue[me];G.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[me]);const Oe=s.convert(be.format,be.colorSpace),Q=s.convert(be.type),Qe=S(be.internalFormat,Oe,Q,be.colorSpace,R.isXRRenderTarget===!0),Ge=De(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,Qe,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,G.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),Re(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),Y(n.TEXTURE_CUBE_MAP,w,xe);for(let ue=0;ue<6;ue++)if(a&&w.mipmaps&&w.mipmaps.length>0)for(let me=0;me<w.mipmaps.length;me++)ge(G.__webglFramebuffer[ue][me],R,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,me);else ge(G.__webglFramebuffer[ue],R,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);y(w,xe)&&g(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){const ue=R.texture;for(let me=0,be=ue.length;me<be;me++){const Oe=ue[me],Q=i.get(Oe);t.bindTexture(n.TEXTURE_2D,Q.__webglTexture),Y(n.TEXTURE_2D,Oe,xe),ge(G.__webglFramebuffer,R,Oe,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,0),y(Oe,xe)&&g(n.TEXTURE_2D)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?ue=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,te.__webglTexture),Y(ue,w,xe),a&&w.mipmaps&&w.mipmaps.length>0)for(let me=0;me<w.mipmaps.length;me++)ge(G.__webglFramebuffer[me],R,w,n.COLOR_ATTACHMENT0,ue,me);else ge(G.__webglFramebuffer,R,w,n.COLOR_ATTACHMENT0,ue,0);y(w,xe)&&g(ue),t.unbindTexture()}R.depthBuffer&&_e(R)}function Rt(R){const w=m(R)||a,G=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let te=0,J=G.length;te<J;te++){const ne=G[te];if(y(ne,w)){const xe=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ue=i.get(ne).__webglTexture;t.bindTexture(xe,ue),g(xe),t.unbindTexture()}}}function Ee(R){if(a&&R.samples>0&&ve(R)===!1){const w=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],G=R.width,te=R.height;let J=n.COLOR_BUFFER_BIT;const ne=[],xe=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(R),me=R.isWebGLMultipleRenderTargets===!0;if(me)for(let be=0;be<w.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let be=0;be<w.length;be++){ne.push(n.COLOR_ATTACHMENT0+be),R.depthBuffer&&ne.push(xe);const Oe=ue.__ignoreDepthValues!==void 0?ue.__ignoreDepthValues:!1;if(Oe===!1&&(R.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),me&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[be]),Oe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[xe]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[xe])),me){const Q=i.get(w[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Q,0)}n.blitFramebuffer(0,0,G,te,0,0,G,te,J,n.NEAREST),u&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let be=0;be<w.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,ue.__webglColorRenderbuffer[be]);const Oe=i.get(w[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,Oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}}function De(R){return Math.min(r.maxSamples,R.samples)}function ve(R){const w=i.get(R);return a&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function it(R){const w=o.render.frame;c.get(R)!==w&&(c.set(R,w),R.update())}function Be(R,w){const G=R.colorSpace,te=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===xo||G!==Jt&&G!==Ht&&(et.getTransfer(G)===rt?a===!1?e.has("EXT_sRGB")===!0&&te===Pt?(R.format=xo,R.minFilter=nt,R.generateMipmaps=!1):w=Du.sRGBToLinear(w):(te!==Pt||J!==Gt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}this.allocateTextureUnit=C,this.resetTextureUnits=O,this.setTexture2D=N,this.setTexture2DArray=k,this.setTexture3D=q,this.setTextureCube=K,this.rebindTextures=Ue,this.setupRenderTarget=H,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=ve}function yv(n,e,t){const i=t.isWebGL2;function r(s,o=Ht){let a;const l=et.getTransfer(o);if(s===Gt)return n.UNSIGNED_BYTE;if(s===yu)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Mu)return n.UNSIGNED_SHORT_5_5_5_1;if(s===nf)return n.BYTE;if(s===rf)return n.SHORT;if(s===No)return n.UNSIGNED_SHORT;if(s===Su)return n.INT;if(s===Tn)return n.UNSIGNED_INT;if(s===Hn)return n.FLOAT;if(s===Gn)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===sf)return n.ALPHA;if(s===Pt)return n.RGBA;if(s===af)return n.LUMINANCE;if(s===of)return n.LUMINANCE_ALPHA;if(s===Ci)return n.DEPTH_COMPONENT;if(s===Ii)return n.DEPTH_STENCIL;if(s===xo)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===_u)return n.RED;if(s===Eu)return n.RED_INTEGER;if(s===lf)return n.RG;if(s===Tu)return n.RG_INTEGER;if(s===bu)return n.RGBA_INTEGER;if(s===ca||s===ua||s===ha||s===fa)if(l===rt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===ca)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ua)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ha)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===fa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===ca)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ua)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ha)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===fa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===cl||s===ul||s===hl||s===fl)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===cl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ul)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===hl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===fl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===wu)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===dl||s===pl)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===dl)return l===rt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===pl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ml||s===gl||s===vl||s===xl||s===Sl||s===yl||s===Ml||s===_l||s===El||s===Tl||s===bl||s===wl||s===Al||s===Rl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===ml)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===gl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===vl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===xl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Sl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===yl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ml)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===_l)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===El)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Tl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===bl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===wl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Al)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Rl)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===da||s===Cl||s===Pl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===da)return l===rt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Cl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Pl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===cf||s===Dl||s===Ll||s===Il)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===da)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Dl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ll)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Il)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ai?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Mv extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ri extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _v={type:"move"};class Ba{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),d=this._getHandJoint(u,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const c=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],f=c.position.distanceTo(h.position),p=.02,v=.005;u.inputState.pinching&&f>p+v?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&f<=p-v&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_v)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ri;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Ev extends An{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,c=null,h=null,f=null,p=null,v=null;const x=t.getContextAttributes();let m=null,d=null;const y=[],g=[],S=new le;let _=null;const T=new jt;T.layers.enable(1),T.viewport=new tt;const E=new jt;E.layers.enable(2),E.viewport=new tt;const P=[T,E],M=new Mv;M.layers.enable(1),M.layers.enable(2);let b=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=y[Y];return Z===void 0&&(Z=new Ba,y[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=y[Y];return Z===void 0&&(Z=new Ba,y[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=y[Y];return Z===void 0&&(Z=new Ba,y[Y]=Z),Z.getHandSpace()};function L(Y){const Z=g.indexOf(Y.inputSource);if(Z===-1)return;const ae=y[Z];ae!==void 0&&(ae.update(Y.inputSource,Y.frame,u||o),ae.dispatchEvent({type:Y.type,data:Y.inputSource}))}function O(){r.removeEventListener("select",L),r.removeEventListener("selectstart",L),r.removeEventListener("selectend",L),r.removeEventListener("squeeze",L),r.removeEventListener("squeezestart",L),r.removeEventListener("squeezeend",L),r.removeEventListener("end",O),r.removeEventListener("inputsourceschange",C);for(let Y=0;Y<y.length;Y++){const Z=g[Y];Z!==null&&(g[Y]=null,y[Y].disconnect(Z))}b=null,I=null,e.setRenderTarget(m),p=null,f=null,h=null,r=null,d=null,ie.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(Y){u=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",L),r.addEventListener("selectstart",L),r.addEventListener("selectend",L),r.addEventListener("squeeze",L),r.addEventListener("squeezestart",L),r.addEventListener("squeezeend",L),r.addEventListener("end",O),r.addEventListener("inputsourceschange",C),x.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new ut(p.framebufferWidth,p.framebufferHeight,{format:Pt,type:Gt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let Z=null,ae=null,de=null;x.depth&&(de=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=x.stencil?Ii:Ci,ae=x.stencil?ai:Tn);const ge={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(ge),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new ut(f.textureWidth,f.textureHeight,{format:Pt,type:Gt,depthTexture:new ea(f.textureWidth,f.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Re=e.properties.get(d);Re.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function C(Y){for(let Z=0;Z<Y.removed.length;Z++){const ae=Y.removed[Z],de=g.indexOf(ae);de>=0&&(g[de]=null,y[de].disconnect(ae))}for(let Z=0;Z<Y.added.length;Z++){const ae=Y.added[Z];let de=g.indexOf(ae);if(de===-1){for(let Re=0;Re<y.length;Re++)if(Re>=g.length){g.push(ae),de=Re;break}else if(g[Re]===null){g[Re]=ae,de=Re;break}if(de===-1)break}const ge=y[de];ge&&ge.connect(ae)}}const B=new U,N=new U;function k(Y,Z,ae){B.setFromMatrixPosition(Z.matrixWorld),N.setFromMatrixPosition(ae.matrixWorld);const de=B.distanceTo(N),ge=Z.projectionMatrix.elements,Re=ae.projectionMatrix.elements,Ce=ge[14]/(ge[10]-1),_e=ge[14]/(ge[10]+1),Ue=(ge[9]+1)/ge[5],H=(ge[9]-1)/ge[5],Rt=(ge[8]-1)/ge[0],Ee=(Re[8]+1)/Re[0],De=Ce*Rt,ve=Ce*Ee,it=de/(-Rt+Ee),Be=it*-Rt;Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Be),Y.translateZ(it),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const R=Ce+it,w=_e+it,G=De-Be,te=ve+(de-Be),J=Ue*_e/w*R,ne=H*_e/w*R;Y.projectionMatrix.makePerspective(G,te,J,ne,R,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function q(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;M.near=E.near=T.near=Y.near,M.far=E.far=T.far=Y.far,(b!==M.near||I!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),b=M.near,I=M.far);const Z=Y.parent,ae=M.cameras;q(M,Z);for(let de=0;de<ae.length;de++)q(ae[de],Z);ae.length===2?k(M,T,E):M.projectionMatrix.copy(T.projectionMatrix),K(Y,M,Z)};function K(Y,Z,ae){ae===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(ae.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=So*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)};let j=null;function ee(Y,Z){if(c=Z.getViewerPose(u||o),v=Z,c!==null){const ae=c.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let de=!1;ae.length!==M.cameras.length&&(M.cameras.length=0,de=!0);for(let ge=0;ge<ae.length;ge++){const Re=ae[ge];let Ce=null;if(p!==null)Ce=p.getViewport(Re);else{const Ue=h.getViewSubImage(f,Re);Ce=Ue.viewport,ge===0&&(e.setRenderTargetTextures(d,Ue.colorTexture,f.ignoreDepthValues?void 0:Ue.depthStencilTexture),e.setRenderTarget(d))}let _e=P[ge];_e===void 0&&(_e=new jt,_e.layers.enable(ge),_e.viewport=new tt,P[ge]=_e),_e.matrix.fromArray(Re.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(Re.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),ge===0&&(M.matrix.copy(_e.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),de===!0&&M.cameras.push(_e)}}for(let ae=0;ae<y.length;ae++){const de=g[ae],ge=y[ae];de!==null&&ge!==void 0&&ge.update(de,Z,u||o)}j&&j(Y,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),v=null}const ie=new Gu;ie.setAnimationLoop(ee),this.setAnimationLoop=function(Y){j=Y},this.dispose=function(){}}}function Tv(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Ou(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,y,g,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),c(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(s(m,d),v(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),x(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,y,g):d.isSpriteMaterial?u(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===_t&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===_t&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=e.get(d).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const g=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*g,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,g){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=g*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===_t&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const y=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function bv(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,g){const S=g.program;i.uniformBlockBinding(y,S)}function u(y,g){let S=r[y.id];S===void 0&&(v(y),S=c(y),r[y.id]=S,y.addEventListener("dispose",m));const _=g.program;i.updateUBOMapping(y,_);const T=e.render.frame;s[y.id]!==T&&(f(y),s[y.id]=T)}function c(y){const g=h();y.__bindingPointIndex=g;const S=n.createBuffer(),_=y.__size,T=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,_,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,g,S),S}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const g=r[y.id],S=y.uniforms,_=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,g);for(let T=0,E=S.length;T<E;T++){const P=Array.isArray(S[T])?S[T]:[S[T]];for(let M=0,b=P.length;M<b;M++){const I=P[M];if(p(I,T,M,_)===!0){const L=I.__offset,O=Array.isArray(I.value)?I.value:[I.value];let C=0;for(let B=0;B<O.length;B++){const N=O[B],k=x(N);typeof N=="number"||typeof N=="boolean"?(I.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,L+C,I.__data)):N.isMatrix3?(I.__data[0]=N.elements[0],I.__data[1]=N.elements[1],I.__data[2]=N.elements[2],I.__data[3]=0,I.__data[4]=N.elements[3],I.__data[5]=N.elements[4],I.__data[6]=N.elements[5],I.__data[7]=0,I.__data[8]=N.elements[6],I.__data[9]=N.elements[7],I.__data[10]=N.elements[8],I.__data[11]=0):(N.toArray(I.__data,C),C+=k.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,g,S,_){const T=y.value,E=g+"_"+S;if(_[E]===void 0)return typeof T=="number"||typeof T=="boolean"?_[E]=T:_[E]=T.clone(),!0;{const P=_[E];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return _[E]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function v(y){const g=y.uniforms;let S=0;const _=16;for(let E=0,P=g.length;E<P;E++){const M=Array.isArray(g[E])?g[E]:[g[E]];for(let b=0,I=M.length;b<I;b++){const L=M[b],O=Array.isArray(L.value)?L.value:[L.value];for(let C=0,B=O.length;C<B;C++){const N=O[C],k=x(N),q=S%_;q!==0&&_-q<k.boundary&&(S+=_-q),L.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=S,S+=k.storage}}}const T=S%_;return T>0&&(S+=_-T),y.__size=S,y.__cache={},this}function x(y){const g={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(g.boundary=4,g.storage=4):y.isVector2?(g.boundary=8,g.storage=8):y.isVector3||y.isColor?(g.boundary=16,g.storage=12):y.isVector4?(g.boundary=16,g.storage=16):y.isMatrix3?(g.boundary=48,g.storage=48):y.isMatrix4?(g.boundary=64,g.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),g}function m(y){const g=y.target;g.removeEventListener("dispose",m);const S=o.indexOf(g.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function d(){for(const y in r)n.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:l,update:u,dispose:d}}class qu{constructor(e={}){const{canvas:t=Mf(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=o;const p=new Uint32Array(4),v=new Int32Array(4);let x=null,m=null;const d=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ke,this._useLegacyLights=!1,this.toneMapping=si,this.toneMappingExposure=1;const g=this;let S=!1,_=0,T=0,E=null,P=-1,M=null;const b=new tt,I=new tt;let L=null;const O=new Fe(0);let C=0,B=t.width,N=t.height,k=1,q=null,K=null;const j=new tt(0,0,B,N),ee=new tt(0,0,B,N);let ie=!1;const Y=new Bo;let Z=!1,ae=!1,de=null;const ge=new Pe,Re=new le,Ce=new U,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ue(){return E===null?k:1}let H=i;function Rt(A,z){for(let W=0;W<A.length;W++){const X=A[W],V=t.getContext(X,z);if(V!==null)return V}return null}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ci}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",se,!1),H===null){const z=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&z.shift(),H=Rt(z,A),H===null)throw Rt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Ee,De,ve,it,Be,R,w,G,te,J,ne,xe,ue,me,be,Oe,Q,Qe,Ge,Le,Me,he,D,re;function Se(){Ee=new Nm(H),De=new Cm(H,Ee,e),Ee.init(De),he=new yv(H,Ee,De),ve=new xv(H,Ee,De),it=new Om(H),Be=new rv,R=new Sv(H,Ee,ve,Be,De,he,it),w=new Dm(g),G=new Um(g),te=new Yf(H,De),D=new Am(H,Ee,te,De),J=new Fm(H,te,it,D),ne=new Vm(H,J,te,it),Ge=new Gm(H,De,R),Oe=new Pm(Be),xe=new iv(g,w,G,Ee,De,D,Oe),ue=new Tv(g,Be),me=new av,be=new fv(Ee,De),Qe=new wm(g,w,G,ve,ne,f,l),Q=new vv(g,ne,De),re=new bv(H,it,De,ve),Le=new Rm(H,Ee,it,De),Me=new Bm(H,Ee,it,De),it.programs=xe.programs,g.capabilities=De,g.extensions=Ee,g.properties=Be,g.renderLists=me,g.shadowMap=Q,g.state=ve,g.info=it}Se();const pe=new Ev(g,H);this.xr=pe,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const A=Ee.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ee.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(A){A!==void 0&&(k=A,this.setSize(B,N,!1))},this.getSize=function(A){return A.set(B,N)},this.setSize=function(A,z,W=!0){if(pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=A,N=z,t.width=Math.floor(A*k),t.height=Math.floor(z*k),W===!0&&(t.style.width=A+"px",t.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(B*k,N*k).floor()},this.setDrawingBufferSize=function(A,z,W){B=A,N=z,k=W,t.width=Math.floor(A*W),t.height=Math.floor(z*W),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(b)},this.getViewport=function(A){return A.copy(j)},this.setViewport=function(A,z,W,X){A.isVector4?j.set(A.x,A.y,A.z,A.w):j.set(A,z,W,X),ve.viewport(b.copy(j).multiplyScalar(k).floor())},this.getScissor=function(A){return A.copy(ee)},this.setScissor=function(A,z,W,X){A.isVector4?ee.set(A.x,A.y,A.z,A.w):ee.set(A,z,W,X),ve.scissor(I.copy(ee).multiplyScalar(k).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(A){ve.setScissorTest(ie=A)},this.setOpaqueSort=function(A){q=A},this.setTransparentSort=function(A){K=A},this.getClearColor=function(A){return A.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor.apply(Qe,arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha.apply(Qe,arguments)},this.clear=function(A=!0,z=!0,W=!0){let X=0;if(A){let V=!1;if(E!==null){const fe=E.texture.format;V=fe===bu||fe===Tu||fe===Eu}if(V){const fe=E.texture.type,ye=fe===Gt||fe===Tn||fe===No||fe===ai||fe===yu||fe===Mu,Ae=Qe.getClearColor(),Ie=Qe.getClearAlpha(),Ve=Ae.r,Ne=Ae.g,ze=Ae.b;ye?(p[0]=Ve,p[1]=Ne,p[2]=ze,p[3]=Ie,H.clearBufferuiv(H.COLOR,0,p)):(v[0]=Ve,v[1]=Ne,v[2]=ze,v[3]=Ie,H.clearBufferiv(H.COLOR,0,v))}else X|=H.COLOR_BUFFER_BIT}z&&(X|=H.DEPTH_BUFFER_BIT),W&&(X|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",se,!1),me.dispose(),be.dispose(),Be.dispose(),w.dispose(),G.dispose(),ne.dispose(),D.dispose(),re.dispose(),xe.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",mt),pe.removeEventListener("sessionend",Ze),de&&(de.dispose(),de=null),xt.stop()};function $(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const A=it.autoReset,z=Q.enabled,W=Q.autoUpdate,X=Q.needsUpdate,V=Q.type;Se(),it.autoReset=A,Q.enabled=z,Q.autoUpdate=W,Q.needsUpdate=X,Q.type=V}function se(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ce(A){const z=A.target;z.removeEventListener("dispose",ce),we(z)}function we(A){Te(A),Be.remove(A)}function Te(A){const z=Be.get(A).programs;z!==void 0&&(z.forEach(function(W){xe.releaseProgram(W)}),A.isShaderMaterial&&xe.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,W,X,V,fe){z===null&&(z=_e);const ye=V.isMesh&&V.matrixWorld.determinant()<0,Ae=mh(A,z,W,X,V);ve.setMaterial(X,ye);let Ie=W.index,Ve=1;if(X.wireframe===!0){if(Ie=J.getWireframeAttribute(W),Ie===void 0)return;Ve=2}const Ne=W.drawRange,ze=W.attributes.position;let gt=Ne.start*Ve,qt=(Ne.start+Ne.count)*Ve;fe!==null&&(gt=Math.max(gt,fe.start*Ve),qt=Math.min(qt,(fe.start+fe.count)*Ve)),Ie!==null?(gt=Math.max(gt,0),qt=Math.min(qt,Ie.count)):ze!=null&&(gt=Math.max(gt,0),qt=Math.min(qt,ze.count));const bt=qt-gt;if(bt<0||bt===1/0)return;D.setup(V,X,Ae,W,Ie);let Rn,ct=Le;if(Ie!==null&&(Rn=te.get(Ie),ct=Me,ct.setIndex(Rn)),V.isMesh)X.wireframe===!0?(ve.setLineWidth(X.wireframeLinewidth*Ue()),ct.setMode(H.LINES)):ct.setMode(H.TRIANGLES);else if(V.isLine){let We=X.linewidth;We===void 0&&(We=1),ve.setLineWidth(We*Ue()),V.isLineSegments?ct.setMode(H.LINES):V.isLineLoop?ct.setMode(H.LINE_LOOP):ct.setMode(H.LINE_STRIP)}else V.isPoints?ct.setMode(H.POINTS):V.isSprite&&ct.setMode(H.TRIANGLES);if(V.isBatchedMesh)ct.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)ct.renderInstances(gt,bt,V.count);else if(W.isInstancedBufferGeometry){const We=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ra=Math.min(W.instanceCount,We);ct.renderInstances(gt,bt,ra)}else ct.render(gt,bt)};function Xe(A,z,W){A.transparent===!0&&A.side===At&&A.forceSinglePass===!1?(A.side=_t,A.needsUpdate=!0,kr(A,z,W),A.side=Sn,A.needsUpdate=!0,kr(A,z,W),A.side=At):kr(A,z,W)}this.compile=function(A,z,W=null){W===null&&(W=A),m=be.get(W),m.init(),y.push(m),W.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),A!==W&&A.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),m.setupLights(g._useLegacyLights);const X=new Set;return A.traverse(function(V){const fe=V.material;if(fe)if(Array.isArray(fe))for(let ye=0;ye<fe.length;ye++){const Ae=fe[ye];Xe(Ae,W,V),X.add(Ae)}else Xe(fe,W,V),X.add(fe)}),y.pop(),m=null,X},this.compileAsync=function(A,z,W=null){const X=this.compile(A,z,W);return new Promise(V=>{function fe(){if(X.forEach(function(ye){Be.get(ye).currentProgram.isReady()&&X.delete(ye)}),X.size===0){V(A);return}setTimeout(fe,10)}Ee.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let Ye=null;function ft(A){Ye&&Ye(A)}function mt(){xt.stop()}function Ze(){xt.start()}const xt=new Gu;xt.setAnimationLoop(ft),typeof self<"u"&&xt.setContext(self),this.setAnimationLoop=function(A){Ye=A,pe.setAnimationLoop(A),A===null?xt.stop():xt.start()},pe.addEventListener("sessionstart",mt),pe.addEventListener("sessionend",Ze),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(z),z=pe.getCamera()),A.isScene===!0&&A.onBeforeRender(g,A,z,E),m=be.get(A,y.length),m.init(),y.push(m),ge.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Y.setFromProjectionMatrix(ge),ae=this.localClippingEnabled,Z=Oe.init(this.clippingPlanes,ae),x=me.get(A,d.length),x.init(),d.push(x),_n(A,z,0,g.sortObjects),x.finish(),g.sortObjects===!0&&x.sort(q,K),this.info.render.frame++,Z===!0&&Oe.beginShadows();const W=m.state.shadowsArray;if(Q.render(W,A,z),Z===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Qe.render(x,A),m.setupLights(g._useLegacyLights),z.isArrayCamera){const X=z.cameras;for(let V=0,fe=X.length;V<fe;V++){const ye=X[V];Ko(x,A,ye,ye.viewport)}}else Ko(x,A,z);E!==null&&(R.updateMultisampleRenderTarget(E),R.updateRenderTargetMipmap(E)),A.isScene===!0&&A.onAfterRender(g,A,z),D.resetDefaultState(),P=-1,M=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function _n(A,z,W,X){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Y.intersectsSprite(A)){X&&Ce.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ge);const ye=ne.update(A),Ae=A.material;Ae.visible&&x.push(A,ye,Ae,W,Ce.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Y.intersectsObject(A))){const ye=ne.update(A),Ae=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ce.copy(A.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ce.copy(ye.boundingSphere.center)),Ce.applyMatrix4(A.matrixWorld).applyMatrix4(ge)),Array.isArray(Ae)){const Ie=ye.groups;for(let Ve=0,Ne=Ie.length;Ve<Ne;Ve++){const ze=Ie[Ve],gt=Ae[ze.materialIndex];gt&&gt.visible&&x.push(A,ye,gt,W,Ce.z,ze)}}else Ae.visible&&x.push(A,ye,Ae,W,Ce.z,null)}}const fe=A.children;for(let ye=0,Ae=fe.length;ye<Ae;ye++)_n(fe[ye],z,W,X)}function Ko(A,z,W,X){const V=A.opaque,fe=A.transmissive,ye=A.transparent;m.setupLightsView(W),Z===!0&&Oe.setGlobalState(g.clippingPlanes,W),fe.length>0&&ph(V,fe,z,W),X&&ve.viewport(b.copy(X)),V.length>0&&Vr(V,z,W),fe.length>0&&Vr(fe,z,W),ye.length>0&&Vr(ye,z,W),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function ph(A,z,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;const fe=De.isWebGL2;de===null&&(de=new ut(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?Gn:Gt,minFilter:Or,samples:fe?4:0})),g.getDrawingBufferSize(Re),fe?de.setSize(Re.x,Re.y):de.setSize(yo(Re.x),yo(Re.y));const ye=g.getRenderTarget();g.setRenderTarget(de),g.getClearColor(O),C=g.getClearAlpha(),C<1&&g.setClearColor(16777215,.5),g.clear();const Ae=g.toneMapping;g.toneMapping=si,Vr(A,W,X),R.updateMultisampleRenderTarget(de),R.updateRenderTargetMipmap(de);let Ie=!1;for(let Ve=0,Ne=z.length;Ve<Ne;Ve++){const ze=z[Ve],gt=ze.object,qt=ze.geometry,bt=ze.material,Rn=ze.group;if(bt.side===At&&gt.layers.test(X.layers)){const ct=bt.side;bt.side=_t,bt.needsUpdate=!0,Zo(gt,W,X,qt,bt,Rn),bt.side=ct,bt.needsUpdate=!0,Ie=!0}}Ie===!0&&(R.updateMultisampleRenderTarget(de),R.updateRenderTargetMipmap(de)),g.setRenderTarget(ye),g.setClearColor(O,C),g.toneMapping=Ae}function Vr(A,z,W){const X=z.isScene===!0?z.overrideMaterial:null;for(let V=0,fe=A.length;V<fe;V++){const ye=A[V],Ae=ye.object,Ie=ye.geometry,Ve=X===null?ye.material:X,Ne=ye.group;Ae.layers.test(W.layers)&&Zo(Ae,z,W,Ie,Ve,Ne)}}function Zo(A,z,W,X,V,fe){A.onBeforeRender(g,z,W,X,V,fe),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),V.onBeforeRender(g,z,W,X,A,fe),V.transparent===!0&&V.side===At&&V.forceSinglePass===!1?(V.side=_t,V.needsUpdate=!0,g.renderBufferDirect(W,z,X,V,A,fe),V.side=Sn,V.needsUpdate=!0,g.renderBufferDirect(W,z,X,V,A,fe),V.side=At):g.renderBufferDirect(W,z,X,V,A,fe),A.onAfterRender(g,z,W,X,V,fe)}function kr(A,z,W){z.isScene!==!0&&(z=_e);const X=Be.get(A),V=m.state.lights,fe=m.state.shadowsArray,ye=V.state.version,Ae=xe.getParameters(A,V.state,fe,z,W),Ie=xe.getProgramCacheKey(Ae);let Ve=X.programs;X.environment=A.isMeshStandardMaterial?z.environment:null,X.fog=z.fog,X.envMap=(A.isMeshStandardMaterial?G:w).get(A.envMap||X.environment),Ve===void 0&&(A.addEventListener("dispose",ce),Ve=new Map,X.programs=Ve);let Ne=Ve.get(Ie);if(Ne!==void 0){if(X.currentProgram===Ne&&X.lightsStateVersion===ye)return Qo(A,Ae),Ne}else Ae.uniforms=xe.getUniforms(A),A.onBuild(W,Ae,g),A.onBeforeCompile(Ae,g),Ne=xe.acquireProgram(Ae,Ie),Ve.set(Ie,Ne),X.uniforms=Ae.uniforms;const ze=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(ze.clippingPlanes=Oe.uniform),Qo(A,Ae),X.needsLights=vh(A),X.lightsStateVersion=ye,X.needsLights&&(ze.ambientLightColor.value=V.state.ambient,ze.lightProbe.value=V.state.probe,ze.directionalLights.value=V.state.directional,ze.directionalLightShadows.value=V.state.directionalShadow,ze.spotLights.value=V.state.spot,ze.spotLightShadows.value=V.state.spotShadow,ze.rectAreaLights.value=V.state.rectArea,ze.ltc_1.value=V.state.rectAreaLTC1,ze.ltc_2.value=V.state.rectAreaLTC2,ze.pointLights.value=V.state.point,ze.pointLightShadows.value=V.state.pointShadow,ze.hemisphereLights.value=V.state.hemi,ze.directionalShadowMap.value=V.state.directionalShadowMap,ze.directionalShadowMatrix.value=V.state.directionalShadowMatrix,ze.spotShadowMap.value=V.state.spotShadowMap,ze.spotLightMatrix.value=V.state.spotLightMatrix,ze.spotLightMap.value=V.state.spotLightMap,ze.pointShadowMap.value=V.state.pointShadowMap,ze.pointShadowMatrix.value=V.state.pointShadowMatrix),X.currentProgram=Ne,X.uniformsList=null,Ne}function jo(A){if(A.uniformsList===null){const z=A.currentProgram.getUniforms();A.uniformsList=Ns.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function Qo(A,z){const W=Be.get(A);W.outputColorSpace=z.outputColorSpace,W.batching=z.batching,W.instancing=z.instancing,W.instancingColor=z.instancingColor,W.skinning=z.skinning,W.morphTargets=z.morphTargets,W.morphNormals=z.morphNormals,W.morphColors=z.morphColors,W.morphTargetsCount=z.morphTargetsCount,W.numClippingPlanes=z.numClippingPlanes,W.numIntersection=z.numClipIntersection,W.vertexAlphas=z.vertexAlphas,W.vertexTangents=z.vertexTangents,W.toneMapping=z.toneMapping}function mh(A,z,W,X,V){z.isScene!==!0&&(z=_e),R.resetTextureUnits();const fe=z.fog,ye=X.isMeshStandardMaterial?z.environment:null,Ae=E===null?g.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Jt,Ie=(X.isMeshStandardMaterial?G:w).get(X.envMap||ye),Ve=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ne=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),ze=!!W.morphAttributes.position,gt=!!W.morphAttributes.normal,qt=!!W.morphAttributes.color;let bt=si;X.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(bt=g.toneMapping);const Rn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ct=Rn!==void 0?Rn.length:0,We=Be.get(X),ra=m.state.lights;if(Z===!0&&(ae===!0||A!==M)){const en=A===M&&X.id===P;Oe.setState(X,A,en)}let dt=!1;X.version===We.__version?(We.needsLights&&We.lightsStateVersion!==ra.state.version||We.outputColorSpace!==Ae||V.isBatchedMesh&&We.batching===!1||!V.isBatchedMesh&&We.batching===!0||V.isInstancedMesh&&We.instancing===!1||!V.isInstancedMesh&&We.instancing===!0||V.isSkinnedMesh&&We.skinning===!1||!V.isSkinnedMesh&&We.skinning===!0||V.isInstancedMesh&&We.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&We.instancingColor===!1&&V.instanceColor!==null||We.envMap!==Ie||X.fog===!0&&We.fog!==fe||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==Oe.numPlanes||We.numIntersection!==Oe.numIntersection)||We.vertexAlphas!==Ve||We.vertexTangents!==Ne||We.morphTargets!==ze||We.morphNormals!==gt||We.morphColors!==qt||We.toneMapping!==bt||De.isWebGL2===!0&&We.morphTargetsCount!==ct)&&(dt=!0):(dt=!0,We.__version=X.version);let hi=We.currentProgram;dt===!0&&(hi=kr(X,z,V));let Jo=!1,vr=!1,sa=!1;const It=hi.getUniforms(),fi=We.uniforms;if(ve.useProgram(hi.program)&&(Jo=!0,vr=!0,sa=!0),X.id!==P&&(P=X.id,vr=!0),Jo||M!==A){It.setValue(H,"projectionMatrix",A.projectionMatrix),It.setValue(H,"viewMatrix",A.matrixWorldInverse);const en=It.map.cameraPosition;en!==void 0&&en.setValue(H,Ce.setFromMatrixPosition(A.matrixWorld)),De.logarithmicDepthBuffer&&It.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&It.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),M!==A&&(M=A,vr=!0,sa=!0)}if(V.isSkinnedMesh){It.setOptional(H,V,"bindMatrix"),It.setOptional(H,V,"bindMatrixInverse");const en=V.skeleton;en&&(De.floatVertexTextures?(en.boneTexture===null&&en.computeBoneTexture(),It.setValue(H,"boneTexture",en.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(It.setOptional(H,V,"batchingTexture"),It.setValue(H,"batchingTexture",V._matricesTexture,R));const aa=W.morphAttributes;if((aa.position!==void 0||aa.normal!==void 0||aa.color!==void 0&&De.isWebGL2===!0)&&Ge.update(V,W,hi),(vr||We.receiveShadow!==V.receiveShadow)&&(We.receiveShadow=V.receiveShadow,It.setValue(H,"receiveShadow",V.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(fi.envMap.value=Ie,fi.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),vr&&(It.setValue(H,"toneMappingExposure",g.toneMappingExposure),We.needsLights&&gh(fi,sa),fe&&X.fog===!0&&ue.refreshFogUniforms(fi,fe),ue.refreshMaterialUniforms(fi,X,k,N,de),Ns.upload(H,jo(We),fi,R)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ns.upload(H,jo(We),fi,R),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&It.setValue(H,"center",V.center),It.setValue(H,"modelViewMatrix",V.modelViewMatrix),It.setValue(H,"normalMatrix",V.normalMatrix),It.setValue(H,"modelMatrix",V.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const en=X.uniformsGroups;for(let oa=0,xh=en.length;oa<xh;oa++)if(De.isWebGL2){const $o=en[oa];re.update($o,hi),re.bind($o,hi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return hi}function gh(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function vh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(A,z,W){Be.get(A.texture).__webglTexture=z,Be.get(A.depthTexture).__webglTexture=W;const X=Be.get(A);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,z){const W=Be.get(A);W.__webglFramebuffer=z,W.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(A,z=0,W=0){E=A,_=z,T=W;let X=!0,V=null,fe=!1,ye=!1;if(A){const Ie=Be.get(A);Ie.__useDefaultFramebuffer!==void 0?(ve.bindFramebuffer(H.FRAMEBUFFER,null),X=!1):Ie.__webglFramebuffer===void 0?R.setupRenderTarget(A):Ie.__hasExternalTextures&&R.rebindTextures(A,Be.get(A.texture).__webglTexture,Be.get(A.depthTexture).__webglTexture);const Ve=A.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ye=!0);const Ne=Be.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ne[z])?V=Ne[z][W]:V=Ne[z],fe=!0):De.isWebGL2&&A.samples>0&&R.useMultisampledRTT(A)===!1?V=Be.get(A).__webglMultisampledFramebuffer:Array.isArray(Ne)?V=Ne[W]:V=Ne,b.copy(A.viewport),I.copy(A.scissor),L=A.scissorTest}else b.copy(j).multiplyScalar(k).floor(),I.copy(ee).multiplyScalar(k).floor(),L=ie;if(ve.bindFramebuffer(H.FRAMEBUFFER,V)&&De.drawBuffers&&X&&ve.drawBuffers(A,V),ve.viewport(b),ve.scissor(I),ve.setScissorTest(L),fe){const Ie=Be.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ie.__webglTexture,W)}else if(ye){const Ie=Be.get(A.texture),Ve=z||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ie.__webglTexture,W||0,Ve)}P=-1},this.readRenderTargetPixels=function(A,z,W,X,V,fe,ye){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=Be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae){ve.bindFramebuffer(H.FRAMEBUFFER,Ae);try{const Ie=A.texture,Ve=Ie.format,Ne=Ie.type;if(Ve!==Pt&&he.convert(Ve)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ze=Ne===Gn&&(Ee.has("EXT_color_buffer_half_float")||De.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(Ne!==Gt&&he.convert(Ne)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===Hn&&(De.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!ze){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-X&&W>=0&&W<=A.height-V&&H.readPixels(z,W,X,V,he.convert(Ve),he.convert(Ne),fe)}finally{const Ie=E!==null?Be.get(E).__webglFramebuffer:null;ve.bindFramebuffer(H.FRAMEBUFFER,Ie)}}},this.copyFramebufferToTexture=function(A,z,W=0){const X=Math.pow(2,-W),V=Math.floor(z.image.width*X),fe=Math.floor(z.image.height*X);R.setTexture2D(z,0),H.copyTexSubImage2D(H.TEXTURE_2D,W,0,0,A.x,A.y,V,fe),ve.unbindTexture()},this.copyTextureToTexture=function(A,z,W,X=0){const V=z.image.width,fe=z.image.height,ye=he.convert(W.format),Ae=he.convert(W.type);R.setTexture2D(W,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,W.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,W.unpackAlignment),z.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,X,A.x,A.y,V,fe,ye,Ae,z.image.data):z.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,X,A.x,A.y,z.mipmaps[0].width,z.mipmaps[0].height,ye,z.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,X,A.x,A.y,ye,Ae,z.image),X===0&&W.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(A,z,W,X,V=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fe=A.max.x-A.min.x+1,ye=A.max.y-A.min.y+1,Ae=A.max.z-A.min.z+1,Ie=he.convert(X.format),Ve=he.convert(X.type);let Ne;if(X.isData3DTexture)R.setTexture3D(X,0),Ne=H.TEXTURE_3D;else if(X.isDataArrayTexture||X.isCompressedArrayTexture)R.setTexture2DArray(X,0),Ne=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,X.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,X.unpackAlignment);const ze=H.getParameter(H.UNPACK_ROW_LENGTH),gt=H.getParameter(H.UNPACK_IMAGE_HEIGHT),qt=H.getParameter(H.UNPACK_SKIP_PIXELS),bt=H.getParameter(H.UNPACK_SKIP_ROWS),Rn=H.getParameter(H.UNPACK_SKIP_IMAGES),ct=W.isCompressedTexture?W.mipmaps[V]:W.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,ct.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ct.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,A.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,A.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,A.min.z),W.isDataTexture||W.isData3DTexture?H.texSubImage3D(Ne,V,z.x,z.y,z.z,fe,ye,Ae,Ie,Ve,ct.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(Ne,V,z.x,z.y,z.z,fe,ye,Ae,Ie,ct.data)):H.texSubImage3D(Ne,V,z.x,z.y,z.z,fe,ye,Ae,Ie,Ve,ct),H.pixelStorei(H.UNPACK_ROW_LENGTH,ze),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,gt),H.pixelStorei(H.UNPACK_SKIP_PIXELS,qt),H.pixelStorei(H.UNPACK_SKIP_ROWS,bt),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Rn),V===0&&X.generateMipmaps&&H.generateMipmap(Ne),ve.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),ve.unbindTexture()},this.resetState=function(){_=0,T=0,E=null,ve.reset(),D.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Fo?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===Zs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ke?Pi:Au}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Pi?Ke:Jt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class wv extends qu{}wv.prototype.isWebGL1Renderer=!0;class Xs extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Av extends Lt{constructor(e=null,t=1,i=1,r,s,o,a,l,u=st,c=st,h,f){super(null,o,a,l,u,c,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zo extends $t{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],u=new U,c=new le;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const p=i+h/t*r;u.x=e*Math.cos(p),u.y=e*Math.sin(p),o.push(u.x,u.y,u.z),a.push(0,0,1),c.x=(o[f]/e+1)/2,c.y=(o[f+1]/e+1)/2,l.push(c.x,c.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Dt(o,3)),this.setAttribute("normal",new Dt(a,3)),this.setAttribute("uv",new Dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ho extends $t{constructor(e=.5,t=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],u=[],c=[];let h=e;const f=(t-e)/r,p=new U,v=new le;for(let x=0;x<=r;x++){for(let m=0;m<=i;m++){const d=s+m/i*o;p.x=h*Math.cos(d),p.y=h*Math.sin(d),l.push(p.x,p.y,p.z),u.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,c.push(v.x,v.y)}h+=f}for(let x=0;x<r;x++){const m=x*(i+1);for(let d=0;d<i;d++){const y=d+m,g=y,S=y+i+1,_=y+i+2,T=y+1;a.push(g,S,T),a.push(S,_,T)}}this.setIndex(a),this.setAttribute("position",new Dt(l,3)),this.setAttribute("normal",new Dt(u,3)),this.setAttribute("uv",new Dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ho(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class lr extends yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ru,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Mc={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Rv{constructor(e,t,i){const r=this;let s=!1,o=0,a=0,l;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(c){a++,s===!1&&r.onStart!==void 0&&r.onStart(c,o,a),s=!0},this.itemEnd=function(c){o++,r.onProgress!==void 0&&r.onProgress(c,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(c){r.onError!==void 0&&r.onError(c)},this.resolveURL=function(c){return l?l(c):c},this.setURLModifier=function(c){return l=c,this},this.addHandler=function(c,h){return u.push(c,h),this},this.removeHandler=function(c){const h=u.indexOf(c);return h!==-1&&u.splice(h,2),this},this.getHandler=function(c){for(let h=0,f=u.length;h<f;h+=2){const p=u[h],v=u[h+1];if(p.global&&(p.lastIndex=0),p.test(c))return v}return null}}}const Cv=new Rv;class Go{constructor(e){this.manager=e!==void 0?e:Cv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Go.DEFAULT_MATERIAL_NAME="__DEFAULT";class Pv extends Go{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Mc.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=zr("img");function l(){c(),Mc.add(e,this),t&&t(this),s.manager.itemEnd(e)}function u(h){c(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function c(){a.removeEventListener("load",l,!1),a.removeEventListener("error",u,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class Ku extends Go{constructor(e){super(e)}load(e,t,i,r){const s=new Lt,o=new Pv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class Dv extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Oa=new Pe,_c=new U,Ec=new U;class Lv{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bo,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;_c.setFromMatrixPosition(e.matrixWorld),t.position.copy(_c),Ec.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ec),t.updateMatrixWorld(),Oa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Oa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Iv extends Lv{constructor(){super(new $s(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Uv extends Dv{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new Iv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Je{constructor(e){this.value=e}clone(){return new Je(this.value.clone===void 0?this.value:this.value.clone())}}class Tc{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const bc=new U,fs=new U;class cn{constructor(e=new U,t=new U){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){bc.subVectors(e,this.start),fs.subVectors(this.end,this.start);const i=fs.dot(fs);let s=fs.dot(bc)/i;return t&&(s=Ft(s,0,1)),s}closestPointToPoint(e,t,i){const r=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ci}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ci);const wc={type:"change"},za={type:"start"},Ac={type:"end"},ds=new Qs,Rc=new gn,Nv=Math.cos(70*yf.DEG2RAD);class Fv extends An{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ni.ROTATE,MIDDLE:Ni.DOLLY,RIGHT:Ni.PAN},this.touches={ONE:Fi.ROTATE,TWO:Fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(D){D.addEventListener("keydown",be),this._domElementKeyEvents=D},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",be),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(wc),i.update(),s=r.NONE},this.update=function(){const D=new U,re=new Ui().setFromUnitVectors(e.up,new U(0,1,0)),Se=re.clone().invert(),pe=new U,$=new Ui,F=new U,se=2*Math.PI;return function(we=null){const Te=i.object.position;D.copy(Te).sub(i.target),D.applyQuaternion(re),a.setFromVector3(D),i.autoRotate&&s===r.NONE&&L(b(we)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Xe=i.minAzimuthAngle,Ye=i.maxAzimuthAngle;isFinite(Xe)&&isFinite(Ye)&&(Xe<-Math.PI?Xe+=se:Xe>Math.PI&&(Xe-=se),Ye<-Math.PI?Ye+=se:Ye>Math.PI&&(Ye-=se),Xe<=Ye?a.theta=Math.max(Xe,Math.min(Ye,a.theta)):a.theta=a.theta>(Xe+Ye)/2?Math.max(Xe,a.theta):Math.min(Ye,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(c,i.dampingFactor):i.target.add(c),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&T||i.object.isOrthographicCamera?a.radius=j(a.radius):a.radius=j(a.radius*u),D.setFromSpherical(a),D.applyQuaternion(Se),Te.copy(i.target).add(D),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,c.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),c.set(0,0,0));let ft=!1;if(i.zoomToCursor&&T){let mt=null;if(i.object.isPerspectiveCamera){const Ze=D.length();mt=j(Ze*u);const xt=Ze-mt;i.object.position.addScaledVector(S,xt),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Ze=new U(_.x,_.y,0);Ze.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/u)),i.object.updateProjectionMatrix(),ft=!0;const xt=new U(_.x,_.y,0);xt.unproject(i.object),i.object.position.sub(xt).add(Ze),i.object.updateMatrixWorld(),mt=D.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;mt!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(mt).add(i.object.position):(ds.origin.copy(i.object.position),ds.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(ds.direction))<Nv?e.lookAt(i.target):(Rc.setFromNormalAndCoplanarPoint(i.object.up,i.target),ds.intersectPlane(Rc,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/u)),i.object.updateProjectionMatrix(),ft=!0);return u=1,T=!1,ft||pe.distanceToSquared(i.object.position)>o||8*(1-$.dot(i.object.quaternion))>o||F.distanceToSquared(i.target)>0?(i.dispatchEvent(wc),pe.copy(i.object.position),$.copy(i.object.quaternion),F.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Qe),i.domElement.removeEventListener("pointerdown",R),i.domElement.removeEventListener("pointercancel",G),i.domElement.removeEventListener("wheel",ne),i.domElement.removeEventListener("pointermove",w),i.domElement.removeEventListener("pointerup",G),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",be),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new Tc,l=new Tc;let u=1;const c=new U,h=new le,f=new le,p=new le,v=new le,x=new le,m=new le,d=new le,y=new le,g=new le,S=new U,_=new le;let T=!1;const E=[],P={};let M=!1;function b(D){return D!==null?2*Math.PI/60*i.autoRotateSpeed*D:2*Math.PI/60/60*i.autoRotateSpeed}function I(D){const re=Math.abs(D*.01);return Math.pow(.95,i.zoomSpeed*re)}function L(D){l.theta-=D}function O(D){l.phi-=D}const C=function(){const D=new U;return function(Se,pe){D.setFromMatrixColumn(pe,0),D.multiplyScalar(-Se),c.add(D)}}(),B=function(){const D=new U;return function(Se,pe){i.screenSpacePanning===!0?D.setFromMatrixColumn(pe,1):(D.setFromMatrixColumn(pe,0),D.crossVectors(i.object.up,D)),D.multiplyScalar(Se),c.add(D)}}(),N=function(){const D=new U;return function(Se,pe){const $=i.domElement;if(i.object.isPerspectiveCamera){const F=i.object.position;D.copy(F).sub(i.target);let se=D.length();se*=Math.tan(i.object.fov/2*Math.PI/180),C(2*Se*se/$.clientHeight,i.object.matrix),B(2*pe*se/$.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(C(Se*(i.object.right-i.object.left)/i.object.zoom/$.clientWidth,i.object.matrix),B(pe*(i.object.top-i.object.bottom)/i.object.zoom/$.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function k(D){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?u/=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function q(D){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?u*=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function K(D,re){if(!i.zoomToCursor)return;T=!0;const Se=i.domElement.getBoundingClientRect(),pe=D-Se.left,$=re-Se.top,F=Se.width,se=Se.height;_.x=pe/F*2-1,_.y=-($/se)*2+1,S.set(_.x,_.y,1).unproject(i.object).sub(i.object.position).normalize()}function j(D){return Math.max(i.minDistance,Math.min(i.maxDistance,D))}function ee(D){h.set(D.clientX,D.clientY)}function ie(D){K(D.clientX,D.clientX),d.set(D.clientX,D.clientY)}function Y(D){v.set(D.clientX,D.clientY)}function Z(D){f.set(D.clientX,D.clientY),p.subVectors(f,h).multiplyScalar(i.rotateSpeed);const re=i.domElement;L(2*Math.PI*p.x/re.clientHeight),O(2*Math.PI*p.y/re.clientHeight),h.copy(f),i.update()}function ae(D){y.set(D.clientX,D.clientY),g.subVectors(y,d),g.y>0?k(I(g.y)):g.y<0&&q(I(g.y)),d.copy(y),i.update()}function de(D){x.set(D.clientX,D.clientY),m.subVectors(x,v).multiplyScalar(i.panSpeed),N(m.x,m.y),v.copy(x),i.update()}function ge(D){K(D.clientX,D.clientY),D.deltaY<0?q(I(D.deltaY)):D.deltaY>0&&k(I(D.deltaY)),i.update()}function Re(D){let re=!1;switch(D.code){case i.keys.UP:D.ctrlKey||D.metaKey||D.shiftKey?O(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,i.keyPanSpeed),re=!0;break;case i.keys.BOTTOM:D.ctrlKey||D.metaKey||D.shiftKey?O(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,-i.keyPanSpeed),re=!0;break;case i.keys.LEFT:D.ctrlKey||D.metaKey||D.shiftKey?L(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(i.keyPanSpeed,0),re=!0;break;case i.keys.RIGHT:D.ctrlKey||D.metaKey||D.shiftKey?L(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(-i.keyPanSpeed,0),re=!0;break}re&&(D.preventDefault(),i.update())}function Ce(D){if(E.length===1)h.set(D.pageX,D.pageY);else{const re=he(D),Se=.5*(D.pageX+re.x),pe=.5*(D.pageY+re.y);h.set(Se,pe)}}function _e(D){if(E.length===1)v.set(D.pageX,D.pageY);else{const re=he(D),Se=.5*(D.pageX+re.x),pe=.5*(D.pageY+re.y);v.set(Se,pe)}}function Ue(D){const re=he(D),Se=D.pageX-re.x,pe=D.pageY-re.y,$=Math.sqrt(Se*Se+pe*pe);d.set(0,$)}function H(D){i.enableZoom&&Ue(D),i.enablePan&&_e(D)}function Rt(D){i.enableZoom&&Ue(D),i.enableRotate&&Ce(D)}function Ee(D){if(E.length==1)f.set(D.pageX,D.pageY);else{const Se=he(D),pe=.5*(D.pageX+Se.x),$=.5*(D.pageY+Se.y);f.set(pe,$)}p.subVectors(f,h).multiplyScalar(i.rotateSpeed);const re=i.domElement;L(2*Math.PI*p.x/re.clientHeight),O(2*Math.PI*p.y/re.clientHeight),h.copy(f)}function De(D){if(E.length===1)x.set(D.pageX,D.pageY);else{const re=he(D),Se=.5*(D.pageX+re.x),pe=.5*(D.pageY+re.y);x.set(Se,pe)}m.subVectors(x,v).multiplyScalar(i.panSpeed),N(m.x,m.y),v.copy(x)}function ve(D){const re=he(D),Se=D.pageX-re.x,pe=D.pageY-re.y,$=Math.sqrt(Se*Se+pe*pe);y.set(0,$),g.set(0,Math.pow(y.y/d.y,i.zoomSpeed)),k(g.y),d.copy(y);const F=(D.pageX+re.x)*.5,se=(D.pageY+re.y)*.5;K(F,se)}function it(D){i.enableZoom&&ve(D),i.enablePan&&De(D)}function Be(D){i.enableZoom&&ve(D),i.enableRotate&&Ee(D)}function R(D){i.enabled!==!1&&(E.length===0&&(i.domElement.setPointerCapture(D.pointerId),i.domElement.addEventListener("pointermove",w),i.domElement.addEventListener("pointerup",G)),Ge(D),D.pointerType==="touch"?Oe(D):te(D))}function w(D){i.enabled!==!1&&(D.pointerType==="touch"?Q(D):J(D))}function G(D){Le(D),E.length===0&&(i.domElement.releasePointerCapture(D.pointerId),i.domElement.removeEventListener("pointermove",w),i.domElement.removeEventListener("pointerup",G)),i.dispatchEvent(Ac),s=r.NONE}function te(D){let re;switch(D.button){case 0:re=i.mouseButtons.LEFT;break;case 1:re=i.mouseButtons.MIDDLE;break;case 2:re=i.mouseButtons.RIGHT;break;default:re=-1}switch(re){case Ni.DOLLY:if(i.enableZoom===!1)return;ie(D),s=r.DOLLY;break;case Ni.ROTATE:if(D.ctrlKey||D.metaKey||D.shiftKey){if(i.enablePan===!1)return;Y(D),s=r.PAN}else{if(i.enableRotate===!1)return;ee(D),s=r.ROTATE}break;case Ni.PAN:if(D.ctrlKey||D.metaKey||D.shiftKey){if(i.enableRotate===!1)return;ee(D),s=r.ROTATE}else{if(i.enablePan===!1)return;Y(D),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(za)}function J(D){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;Z(D);break;case r.DOLLY:if(i.enableZoom===!1)return;ae(D);break;case r.PAN:if(i.enablePan===!1)return;de(D);break}}function ne(D){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(D.preventDefault(),i.dispatchEvent(za),ge(xe(D)),i.dispatchEvent(Ac))}function xe(D){const re=D.deltaMode,Se={clientX:D.clientX,clientY:D.clientY,deltaY:D.deltaY};switch(re){case 1:Se.deltaY*=16;break;case 2:Se.deltaY*=100;break}return D.ctrlKey&&!M&&(Se.deltaY*=10),Se}function ue(D){D.key==="Control"&&(M=!0,document.addEventListener("keyup",me,{passive:!0,capture:!0}))}function me(D){D.key==="Control"&&(M=!1,document.removeEventListener("keyup",me,{passive:!0,capture:!0}))}function be(D){i.enabled===!1||i.enablePan===!1||Re(D)}function Oe(D){switch(Me(D),E.length){case 1:switch(i.touches.ONE){case Fi.ROTATE:if(i.enableRotate===!1)return;Ce(D),s=r.TOUCH_ROTATE;break;case Fi.PAN:if(i.enablePan===!1)return;_e(D),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Fi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;H(D),s=r.TOUCH_DOLLY_PAN;break;case Fi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Rt(D),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(za)}function Q(D){switch(Me(D),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ee(D),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;De(D),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;it(D),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Be(D),i.update();break;default:s=r.NONE}}function Qe(D){i.enabled!==!1&&D.preventDefault()}function Ge(D){E.push(D.pointerId)}function Le(D){delete P[D.pointerId];for(let re=0;re<E.length;re++)if(E[re]==D.pointerId){E.splice(re,1);return}}function Me(D){let re=P[D.pointerId];re===void 0&&(re=new le,P[D.pointerId]=re),re.set(D.pageX,D.pageY)}function he(D){const re=D.pointerId===E[0]?E[1]:E[0];return P[re]}i.domElement.addEventListener("contextmenu",Qe),i.domElement.addEventListener("pointerdown",R),i.domElement.addEventListener("pointercancel",G),i.domElement.addEventListener("wheel",ne,{passive:!1}),document.addEventListener("keydown",ue,{passive:!0,capture:!0}),this.update()}}/**
 * postprocessing v6.38.0 build Sat Nov 08 2025
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2025 Raoul van Rüschen
 * @license Zlib
 */var Ha=1/1e3,Bv=1e3,Ov=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(n){typeof document<"u"&&document.hidden!==void 0&&(n?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=n)}get delta(){return this._delta*Ha}get fixedDelta(){return this._fixedDelta*Ha}set fixedDelta(n){this._fixedDelta=n*Bv}get elapsed(){return this._elapsed*Ha}update(n){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(n!==void 0?n:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(n){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},zv=(()=>{const n=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new $t;return t.setAttribute("position",new ht(n,3)),t.setAttribute("uv",new ht(e,2)),t})(),hn=class Eo{static get fullscreenGeometry(){return zv}constructor(e="Pass",t=new Xs,i=new $s){this.name=e,this.renderer=null,this.scene=t,this.camera=i,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){const t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new $e(Eo.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new Xs),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=Hr){}render(e,t,i,r,s){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,i){}dispose(){for(const e of Object.keys(this)){const t=this[e];(t instanceof ut||t instanceof yn||t instanceof Lt||t instanceof Eo)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},Hv=class extends hn{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(n,e,t,i,r){const s=n.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},Gv=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,Zu="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",ju=class extends lt{constructor(){super({name:"CopyMaterial",defines:{DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new Je(null),depthBuffer:new Je(null),channelWeights:new Je(null),opacity:new Je(1)},blending:Yt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Gv,vertexShader:Zu}),this.depthFunc=mu}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(n){const e=n!==null;this.colorWrite!==e&&(e?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=e,this.needsUpdate=!0),this.uniforms.inputBuffer.value=n}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(n){const e=n!==null;this.depthWrite!==e&&(e?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=e,this.depthWrite=e,this.needsUpdate=!0),this.uniforms.depthBuffer.value=n}set depthPacking(n){this.defines.DEPTH_PACKING=n.toFixed(0),this.needsUpdate=!0}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(n){n!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=n):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(n){this.uniforms.inputBuffer.value=n}getOpacity(n){return this.uniforms.opacity.value}setOpacity(n){this.uniforms.opacity.value=n}},Vv=class extends hn{constructor(n,e=!0){super("CopyPass"),this.fullscreenMaterial=new ju,this.needsSwap=!1,this.renderTarget=n,n===void 0&&(this.renderTarget=new ut(1,1,{minFilter:nt,magFilter:nt,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(n){this.autoResize=n}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(n){this.autoResize=n}render(n,e,t,i,r){this.fullscreenMaterial.inputBuffer=e.texture,n.setRenderTarget(this.renderToScreen?null:this.renderTarget),n.render(this.scene,this.camera)}setSize(n,e){this.autoResize&&this.renderTarget.setSize(n,e)}initialize(n,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==Gt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":n!==null&&n.outputColorSpace===Ke&&(this.renderTarget.texture.colorSpace=Ke))}},Cc=new Fe,Qu=class extends hn{constructor(n=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=n,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(n,e,t){this.color=n,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(n){this.overrideClearColor=n}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(n){this.overrideClearAlpha=n}render(n,e,t,i,r){const s=this.overrideClearColor,o=this.overrideClearAlpha,a=n.getClearAlpha(),l=s!==null,u=o>=0;l?(n.getClearColor(Cc),n.setClearColor(s,u?o:a)):u&&n.setClearAlpha(o),n.setRenderTarget(this.renderToScreen?null:e),n.clear(this.color,this.depth,this.stencil),l?n.setClearColor(Cc,a):u&&n.setClearAlpha(a)}},kv=class extends hn{constructor(n,e){super("MaskPass",n,e),this.needsSwap=!1,this.clearPass=new Qu(!1,!1,!0),this.inverse=!1}set mainScene(n){this.scene=n}set mainCamera(n){this.camera=n}get inverted(){return this.inverse}set inverted(n){this.inverse=n}get clear(){return this.clearPass.enabled}set clear(n){this.clearPass.enabled=n}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(n){this.inverted=n}render(n,e,t,i,r){const s=n.getContext(),o=n.state.buffers,a=this.scene,l=this.camera,u=this.clearPass,c=this.inverted?0:1,h=1-c;o.color.setMask(!1),o.depth.setMask(!1),o.color.setLocked(!0),o.depth.setLocked(!0),o.stencil.setTest(!0),o.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),o.stencil.setFunc(s.ALWAYS,c,4294967295),o.stencil.setClear(h),o.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?u.render(n,null):(u.render(n,e),u.render(n,t))),this.renderToScreen?(n.setRenderTarget(null),n.render(a,l)):(n.setRenderTarget(e),n.render(a,l),n.setRenderTarget(t),n.render(a,l)),o.color.setLocked(!1),o.depth.setLocked(!1),o.stencil.setLocked(!1),o.stencil.setFunc(s.EQUAL,1,4294967295),o.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),o.stencil.setLocked(!0)}},Wv=class{constructor(n=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:i=0,frameBufferType:r}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,r,i),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new Vv,this.depthTexture=null,this.passes=[],this.timer=new Ov,this.autoRenderToScreen=!0,this.setRenderer(n)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(n){const e=this.inputBuffer,t=this.multisampling;t>0&&n>0?(this.inputBuffer.samples=n,this.outputBuffer.samples=n,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==n&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,n),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(n){if(this.renderer=n,n!==null){const e=n.getSize(new le),t=n.getContext().getContextAttributes().alpha,i=this.inputBuffer.texture.type;i===Gt&&n.outputColorSpace===Ke&&(this.inputBuffer.texture.colorSpace=Ke,this.outputBuffer.texture.colorSpace=Ke,this.inputBuffer.dispose(),this.outputBuffer.dispose()),n.autoClear=!1,this.setSize(e.width,e.height);for(const r of this.passes)r.initialize(n,t,i)}}replaceRenderer(n,e=!0){const t=this.renderer,i=t.domElement.parentNode;return this.setRenderer(n),e&&i!==null&&(i.removeChild(t.domElement),i.appendChild(n.domElement)),t}createDepthTexture(){const n=this.depthTexture=new ea;return this.inputBuffer.depthTexture=n,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(n.format=Ii,n.type=ai):n.type=Tn,n}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const n of this.passes)n.setDepthTexture(null)}}createBuffer(n,e,t,i){const r=this.renderer,s=r===null?new le:r.getDrawingBufferSize(new le),o={minFilter:nt,magFilter:nt,stencilBuffer:e,depthBuffer:n,type:t},a=new ut(s.width,s.height,o);return i>0&&(a.samples=i),t===Gt&&r!==null&&r.outputColorSpace===Ke&&(a.texture.colorSpace=Ke),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(n){for(const e of this.passes)e.mainScene=n}setMainCamera(n){for(const e of this.passes)e.mainCamera=n}addPass(n,e){const t=this.passes,i=this.renderer,r=i.getDrawingBufferSize(new le),s=i.getContext().getContextAttributes().alpha,o=this.inputBuffer.texture.type;if(n.setRenderer(i),n.setSize(r.width,r.height),n.initialize(i,s,o),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),n.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,n):t.push(n),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),n.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const a=this.createDepthTexture();for(n of t)n.setDepthTexture(a)}else n.setDepthTexture(this.depthTexture)}removePass(n){const e=this.passes,t=e.indexOf(n);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){const s=(a,l)=>a||l.needsDepthTexture;e.reduce(s,!1)||(n.getDepthTexture()===this.depthTexture&&n.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(n.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const n=this.passes;this.deleteDepthTexture(),n.length>0&&(this.autoRenderToScreen&&(n[n.length-1].renderToScreen=!1),this.passes=[])}render(n){const e=this.renderer,t=this.copyPass;let i=this.inputBuffer,r=this.outputBuffer,s=!1,o,a,l;n===void 0&&(this.timer.update(),n=this.timer.getDelta());for(const u of this.passes)u.enabled&&(u.render(e,i,r,n,s),u.needsSwap&&(s&&(t.renderToScreen=u.renderToScreen,o=e.getContext(),a=e.state.buffers.stencil,a.setFunc(o.NOTEQUAL,1,4294967295),t.render(e,i,r,n,s),a.setFunc(o.EQUAL,1,4294967295)),l=i,i=r,r=l),u instanceof kv?s=!0:u instanceof Hv&&(s=!1))}setSize(n,e,t){const i=this.renderer,r=i.getSize(new le);(n===void 0||e===void 0)&&(n=r.width,e=r.height),(r.width!==n||r.height!==e)&&i.setSize(n,e,t);const s=i.getDrawingBufferSize(new le);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height);for(const o of this.passes)o.setSize(s.width,s.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const n of this.passes)n.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),hn.fullscreenGeometry.dispose()}},Di={NONE:0,DEPTH:1,CONVOLUTION:2},je={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},Xv=class{constructor(){this.shaderParts=new Map([[je.FRAGMENT_HEAD,null],[je.FRAGMENT_MAIN_UV,null],[je.FRAGMENT_MAIN_IMAGE,null],[je.VERTEX_HEAD,null],[je.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=Di.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Jt}},Ga=!1,Pc=class{constructor(n=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(n),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case At:t=this.materialsFlatShadedDoubleSide;break;case _t:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case At:t=this.materialsDoubleSide;break;case _t:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(n){if(!(n instanceof lt))return n.clone();const e=n.uniforms,t=new Map;for(const r in e){const s=e[r].value;s.isRenderTargetTexture&&(e[r].value=null,t.set(r,s))}const i=n.clone();for(const r of t)e[r[0]].value=r[1],i.uniforms[r[0]].value=r[1];return i}setMaterial(n){if(this.disposeMaterials(),this.material=n,n!==null){const e=this.materials=[this.cloneMaterial(n),this.cloneMaterial(n),this.cloneMaterial(n)];for(const t of e)t.uniforms=Object.assign({},n.uniforms),t.side=Sn;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.side=_t,i}),this.materialsDoubleSide=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.side=At,i}),this.materialsFlatShaded=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.flatShading=!0,i}),this.materialsFlatShadedBackSide=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.flatShading=!0,i.side=_t,i}),this.materialsFlatShadedDoubleSide=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.flatShading=!0,i.side=At,i})}}render(n,e,t){const i=n.shadowMap.enabled;if(n.shadowMap.enabled=!1,Ga){const r=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),n.render(e,t);for(const s of r)s[0].material=s[1];this.meshCount!==r.size&&r.clear()}else{const r=e.overrideMaterial;e.overrideMaterial=this.material,n.render(e,t),e.overrideMaterial=r}n.shadowMap.enabled=i}disposeMaterials(){if(this.material!==null){const n=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const e of n)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Ga}static set workaroundEnabled(n){Ga=n}},Qn=-1,bn=class extends An{constructor(n,e=Qn,t=Qn,i=1){super(),this.resizable=n,this.baseSize=new le(1,1),this.preferredSize=new le(e,t),this.target=this.preferredSize,this.s=i,this.effectiveSize=new le,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const n=this.baseSize,e=this.preferredSize,t=this.effectiveSize,i=this.scale;e.width!==Qn?t.width=e.width:e.height!==Qn?t.width=Math.round(e.height*(n.width/Math.max(n.height,1))):t.width=Math.round(n.width*i),e.height!==Qn?t.height=e.height:e.width!==Qn?t.height=Math.round(e.width/Math.max(n.width/Math.max(n.height,1),1)):t.height=Math.round(n.height*i)}get width(){return this.effectiveSize.width}set width(n){this.preferredWidth=n}get height(){return this.effectiveSize.height}set height(n){this.preferredHeight=n}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(n){this.s!==n&&(this.s=n,this.preferredSize.setScalar(Qn),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(n){this.scale=n}get baseWidth(){return this.baseSize.width}set baseWidth(n){this.baseSize.width!==n&&(this.baseSize.width=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(n){this.baseWidth=n}get baseHeight(){return this.baseSize.height}set baseHeight(n){this.baseSize.height!==n&&(this.baseSize.height=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(n){this.baseHeight=n}setBaseSize(n,e){(this.baseSize.width!==n||this.baseSize.height!==e)&&(this.baseSize.set(n,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(n){this.preferredSize.width!==n&&(this.preferredSize.width=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(n){this.preferredWidth=n}get preferredHeight(){return this.preferredSize.height}set preferredHeight(n){this.preferredSize.height!==n&&(this.preferredSize.height=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(n){this.preferredHeight=n}setPreferredSize(n,e){(this.preferredSize.width!==n||this.preferredSize.height!==e)&&(this.preferredSize.set(n,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(n){this.s=n.scale,this.baseSize.set(n.baseWidth,n.baseHeight),this.preferredSize.set(n.preferredWidth,n.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return Qn}},qe={ADD:0,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},Yv="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb,y.a),y.a*opacity);}",qv="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb)*0.5,y.a),y.a*opacity);}",Kv="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.xy,xHSL.z));return mix(x,vec4(z,y.a),y.a*opacity);}",Zv="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/b)),vec3(1.0),step(1.0,a));return mix(x,vec4(z,y.a),y.a*opacity);}",jv="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(x,vec4(z,y.a),y.a*opacity);}",Qv="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb,y.rgb),y.a),y.a*opacity);}",Jv="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(abs(x.rgb-y.rgb),y.a),y.a*opacity);}",$v="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb/max(y.rgb,1e-12),y.a),y.a*opacity);}",e0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb-2.0*x.rgb*y.rgb),y.a),y.a*opacity);}",t0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=min(x.rgb,1.0);vec3 b=min(y.rgb,1.0);vec3 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(x,vec4(z,y.a),y.a*opacity);}",n0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(step(1.0,x.rgb+y.rgb),y.a),y.a*opacity);}",i0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.x,xHSL.yz));return mix(x,vec4(z,y.a),y.a*opacity);}",r0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-y.rgb,y.a),y.a*opacity);}",s0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(y.rgb*(1.0-x.rgb),y.a),y.a*opacity);}",a0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb,y.rgb),y.a),y.a*opacity);}",o0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(y.rgb+x.rgb-1.0,0.0,1.0),y.a),y.a*opacity);}",l0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb+y.rgb,1.0),y.a),y.a*opacity);}",c0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(2.0*y.rgb+x.rgb-1.0,0.0,1.0),y.a),y.a*opacity);}",u0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.xy,yHSL.z));return mix(x,vec4(z,y.a),y.a*opacity);}",h0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb*y.rgb,y.a),y.a*opacity);}",f0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-abs(1.0-x.rgb-y.rgb),y.a),y.a*opacity);}",d0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,y.a*opacity);}",p0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(2.0*y.rgb*x.rgb,1.0-2.0*(1.0-y.rgb)*(1.0-x.rgb),step(0.5,x.rgb));return mix(x,vec4(z,y.a),y.a*opacity);}",m0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 y2=2.0*y.rgb;vec3 z=mix(mix(y2,x.rgb,step(0.5*x.rgb,y.rgb)),max(y2-1.0,vec3(0.0)),step(x.rgb,y2-1.0));return mix(x,vec4(z,y.a),y.a*opacity);}",g0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(min(x.rgb*x.rgb/max(1.0-y.rgb,1e-12),1.0),y.rgb,step(1.0,y.rgb));return mix(x,vec4(z,y.a),y.a*opacity);}",v0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.x,yHSL.y,xHSL.z));return mix(x,vec4(z,y.a),y.a*opacity);}",x0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb-min(x.rgb*y.rgb,1.0),y.a),y.a*opacity);}",S0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb;vec3 b=y.rgb;vec3 y2=2.0*b;vec3 w=step(0.5,b);vec3 c=a-(1.0-y2)*a*(1.0-a);vec3 d=mix(a+(y2-1.0)*(sqrt(a)-a),a+(y2-1.0)*a*((16.0*a-12.0)*a+3.0),w*(1.0-step(0.25,a)));vec3 z=mix(c,d,w);return mix(x,vec4(z,y.a),y.a*opacity);}",y0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",M0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb+y.rgb-1.0,0.0),y.a),y.a*opacity);}",_0="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(max(1.0-min((1.0-x.rgb)/(2.0*y.rgb),1.0),0.0),min(x.rgb/(2.0*(1.0-y.rgb)),1.0),step(0.5,y.rgb));return mix(x,vec4(z,y.a),y.a*opacity);}",E0=new Map([[qe.ADD,Yv],[qe.AVERAGE,qv],[qe.COLOR,Kv],[qe.COLOR_BURN,Zv],[qe.COLOR_DODGE,jv],[qe.DARKEN,Qv],[qe.DIFFERENCE,Jv],[qe.DIVIDE,$v],[qe.DST,null],[qe.EXCLUSION,e0],[qe.HARD_LIGHT,t0],[qe.HARD_MIX,n0],[qe.HUE,i0],[qe.INVERT,r0],[qe.INVERT_RGB,s0],[qe.LIGHTEN,a0],[qe.LINEAR_BURN,o0],[qe.LINEAR_DODGE,l0],[qe.LINEAR_LIGHT,c0],[qe.LUMINOSITY,u0],[qe.MULTIPLY,h0],[qe.NEGATION,f0],[qe.NORMAL,d0],[qe.OVERLAY,p0],[qe.PIN_LIGHT,m0],[qe.REFLECT,g0],[qe.SATURATION,v0],[qe.SCREEN,x0],[qe.SOFT_LIGHT,S0],[qe.SRC,y0],[qe.SUBTRACT,M0],[qe.VIVID_LIGHT,_0]]),T0=class extends An{constructor(n,e=1){super(),this._blendFunction=n,this.opacity=new Je(e)}getOpacity(){return this.opacity.value}setOpacity(n){this.opacity.value=n}get blendFunction(){return this._blendFunction}set blendFunction(n){this._blendFunction=n,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(n){this.blendFunction=n}getShaderCode(){return E0.get(this.blendFunction)}},b0=class extends An{constructor(n,e,{attributes:t=Di.NONE,blendFunction:i=qe.NORMAL,defines:r=new Map,uniforms:s=new Map,extensions:o=null,vertexShader:a=null}={}){super(),this.name=n,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=a,this.defines=r,this.uniforms=s,this.extensions=o,this.blendMode=new T0(i),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=Jt,this._outputColorSpace=Ht}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(n){this._inputColorSpace=n,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n,this.setChanged()}set mainScene(n){}set mainCamera(n){}getName(){return this.name}setRenderer(n){this.renderer=n}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(n){this.attributes=n,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(n){this.fragmentShader=n,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(n){this.vertexShader=n,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(n,e=Hr){}update(n,e,t){}setSize(n,e){}initialize(n,e,t){}dispose(){for(const n of Object.keys(this)){const e=this[n];(e instanceof ut||e instanceof yn||e instanceof Lt||e instanceof hn)&&this[n].dispose()}}},Vo={MEDIUM:2,LARGE:3},w0=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,A0="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",R0=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],C0=class extends lt{constructor(n=new tt){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new Je(null),texelSize:new Je(new tt),scale:new Je(1),kernel:new Je(0)},blending:Yt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:w0,vertexShader:A0}),this.setTexelSize(n.x,n.y),this.kernelSize=Vo.MEDIUM}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.inputBuffer=n}get kernelSequence(){return R0[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(n){this.uniforms.scale.value=n}getScale(){return this.uniforms.scale.value}setScale(n){this.uniforms.scale.value=n}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(n){this.uniforms.kernel.value=n}setKernel(n){this.kernel=n}setTexelSize(n,e){this.uniforms.texelSize.value.set(n,e,n*.5,e*.5)}setSize(n,e){const t=1/n,i=1/e;this.uniforms.texelSize.value.set(t,i,t*.5,i*.5)}},P0=class extends hn{constructor({kernelSize:n=Vo.MEDIUM,resolutionScale:e=.5,width:t=bn.AUTO_SIZE,height:i=bn.AUTO_SIZE,resolutionX:r=t,resolutionY:s=i}={}){super("KawaseBlurPass"),this.renderTargetA=new ut(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const o=this.resolution=new bn(this,r,s,e);o.addEventListener("change",a=>this.setSize(o.baseWidth,o.baseHeight)),this._blurMaterial=new C0,this._blurMaterial.kernelSize=n,this.copyMaterial=new ju}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(n){this._blurMaterial=n}get dithering(){return this.copyMaterial.dithering}set dithering(n){this.copyMaterial.dithering=n}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(n){this.blurMaterial.kernelSize=n}get width(){return this.resolution.width}set width(n){this.resolution.preferredWidth=n}get height(){return this.resolution.height}set height(n){this.resolution.preferredHeight=n}get scale(){return this.blurMaterial.scale}set scale(n){this.blurMaterial.scale=n}getScale(){return this.blurMaterial.scale}setScale(n){this.blurMaterial.scale=n}getKernelSize(){return this.kernelSize}setKernelSize(n){this.kernelSize=n}getResolutionScale(){return this.resolution.scale}setResolutionScale(n){this.resolution.scale=n}render(n,e,t,i,r){const s=this.scene,o=this.camera,a=this.renderTargetA,l=this.renderTargetB,u=this.blurMaterial,c=u.kernelSequence;let h=e;this.fullscreenMaterial=u;for(let f=0,p=c.length;f<p;++f){const v=f&1?l:a;u.kernel=c[f],u.inputBuffer=h.texture,n.setRenderTarget(v),n.render(s,o),h=v}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=h.texture,n.setRenderTarget(this.renderToScreen?null:t),n.render(s,o)}setSize(n,e){const t=this.resolution;t.setBaseSize(n,e);const i=t.width,r=t.height;this.renderTargetA.setSize(i,r),this.renderTargetB.setSize(i,r),this.blurMaterial.setSize(n,e)}initialize(n,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==Gt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):n!==null&&n.outputColorSpace===Ke&&(this.renderTargetA.texture.colorSpace=Ke,this.renderTargetB.texture.colorSpace=Ke))}static get AUTO_SIZE(){return bn.AUTO_SIZE}},D0=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,L0=class extends lt{constructor(n=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:ci.replace(/\D+/g,"")},uniforms:{inputBuffer:new Je(null),threshold:new Je(0),smoothing:new Je(1),range:new Je(null)},blending:Yt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:D0,vertexShader:Zu}),this.colorOutput=n,this.luminanceRange=e}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.uniforms.inputBuffer.value=n}get threshold(){return this.uniforms.threshold.value}set threshold(n){this.smoothing>0||n>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=n}getThreshold(){return this.threshold}setThreshold(n){this.threshold=n}get smoothing(){return this.uniforms.smoothing.value}set smoothing(n){this.threshold>0||n>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=n}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(n){this.smoothing=n}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(n){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(n){n?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(n){return this.colorOutput}setColorOutputEnabled(n){this.colorOutput=n}get useRange(){return this.luminanceRange!==null}set useRange(n){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(n){n!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=n,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(n){this.luminanceRange=n}},I0=class extends hn{constructor({renderTarget:n,luminanceRange:e,colorOutput:t,resolutionScale:i=1,width:r=bn.AUTO_SIZE,height:s=bn.AUTO_SIZE,resolutionX:o=r,resolutionY:a=s}={}){super("LuminancePass"),this.fullscreenMaterial=new L0(t,e),this.needsSwap=!1,this.renderTarget=n,this.renderTarget===void 0&&(this.renderTarget=new ut(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const l=this.resolution=new bn(this,o,a,i);l.addEventListener("change",u=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(n,e,t,i,r){const s=this.fullscreenMaterial;s.inputBuffer=e.texture,n.setRenderTarget(this.renderToScreen?null:this.renderTarget),n.render(this.scene,this.camera)}setSize(n,e){const t=this.resolution;t.setBaseSize(n,e),this.renderTarget.setSize(t.width,t.height)}initialize(n,e,t){t!==void 0&&t!==Gt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},U0=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,N0="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",F0=class extends lt{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new Je(null),texelSize:new Je(new le)},blending:Yt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:U0,vertexShader:N0})}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setSize(n,e){this.uniforms.texelSize.value.set(1/n,1/e)}},B0=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,O0="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",z0=class extends lt{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new Je(null),supportBuffer:new Je(null),texelSize:new Je(new le),radius:new Je(.85)},blending:Yt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:B0,vertexShader:O0})}set inputBuffer(n){this.uniforms.inputBuffer.value=n}set supportBuffer(n){this.uniforms.supportBuffer.value=n}get radius(){return this.uniforms.radius.value}set radius(n){this.uniforms.radius.value=n}setSize(n,e){this.uniforms.texelSize.value.set(1/n,1/e)}},H0=class extends hn{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new ut(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new F0,this.upsamplingMaterial=new z0,this.resolution=new le}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(n){if(this.levels!==n){const e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<n;++t){const i=e.clone();i.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(i)}this.upsamplingMipmaps.push(e);for(let t=1,i=n-1;t<i;++t){const r=e.clone();r.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(n){this.upsamplingMaterial.radius=n}render(n,e,t,i,r){const{scene:s,camera:o}=this,{downsamplingMaterial:a,upsamplingMaterial:l}=this,{downsamplingMipmaps:u,upsamplingMipmaps:c}=this;let h=e;this.fullscreenMaterial=a;for(let f=0,p=u.length;f<p;++f){const v=u[f];a.setSize(h.width,h.height),a.inputBuffer=h.texture,n.setRenderTarget(v),n.render(s,o),h=v}this.fullscreenMaterial=l;for(let f=c.length-1;f>=0;--f){const p=c[f];l.setSize(h.width,h.height),l.inputBuffer=h.texture,l.supportBuffer=u[f].texture,n.setRenderTarget(p),n.render(s,o),h=p}}setSize(n,e){const t=this.resolution;t.set(n,e);let i=t.width,r=t.height;for(let s=0,o=this.downsamplingMipmaps.length;s<o;++s)i=Math.round(i*.5),r=Math.round(r*.5),this.downsamplingMipmaps[s].setSize(i,r),s<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[s].setSize(i,r)}initialize(n,e,t){if(t!==void 0){const i=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const r of i)r.texture.type=t;if(t!==Gt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(n!==null&&n.outputColorSpace===Ke)for(const r of i)r.texture.colorSpace=Ke}}dispose(){super.dispose();for(const n of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))n.dispose()}},G0=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 texel=texture2D(map,uv);outputColor=vec4(texel.rgb*intensity,max(inputColor.a,texel.a));}`,V0=class extends b0{constructor({blendFunction:n=qe.SCREEN,luminanceThreshold:e=1,luminanceSmoothing:t=.03,mipmapBlur:i=!0,intensity:r=1,radius:s=.85,levels:o=8,kernelSize:a=Vo.LARGE,resolutionScale:l=.5,width:u=bn.AUTO_SIZE,height:c=bn.AUTO_SIZE,resolutionX:h=u,resolutionY:f=c}={}){super("BloomEffect",G0,{blendFunction:n,uniforms:new Map([["map",new Je(null)],["intensity",new Je(r)]])}),this.renderTarget=new ut(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new P0({kernelSize:a}),this.luminancePass=new I0({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new H0,this.mipmapBlurPass.enabled=i,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=o,this.uniforms.get("map").value=i?this.mipmapBlurPass.texture:this.renderTarget.texture;const p=this.resolution=new bn(this,h,f,l);p.addEventListener("change",v=>this.setSize(p.baseWidth,p.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(n){this.resolution.preferredWidth=n}get height(){return this.resolution.height}set height(n){this.resolution.preferredHeight=n}get dithering(){return this.blurPass.dithering}set dithering(n){this.blurPass.dithering=n}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(n){this.blurPass.kernelSize=n}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(n){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(n){this.uniforms.get("intensity").value=n}getIntensity(){return this.intensity}setIntensity(n){this.intensity=n}getResolutionScale(){return this.resolution.scale}setResolutionScale(n){this.resolution.scale=n}update(n,e,t){const i=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(n,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(n,r.renderTarget):this.blurPass.render(n,r.renderTarget,i)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(n,e):this.blurPass.render(n,e,i)}setSize(n,e){const t=this.resolution;t.setBaseSize(n,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(n,e),this.mipmapBlurPass.setSize(n,e)}initialize(n,e,t){this.blurPass.initialize(n,e,t),this.luminancePass.initialize(n,e,t),this.mipmapBlurPass.initialize(n,e,t),t!==void 0&&(this.renderTarget.texture.type=t,n!==null&&n.outputColorSpace===Ke&&(this.renderTarget.texture.colorSpace=Ke))}},k0=class extends hn{constructor(n,e,t=null){super("RenderPass",n,e),this.needsSwap=!1,this.clearPass=new Qu,this.overrideMaterialManager=t===null?null:new Pc(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(n){this.scene=n}set mainCamera(n){this.camera=n}get renderToScreen(){return super.renderToScreen}set renderToScreen(n){super.renderToScreen=n,this.clearPass.renderToScreen=n}get overrideMaterial(){const n=this.overrideMaterialManager;return n!==null?n.material:null}set overrideMaterial(n){const e=this.overrideMaterialManager;n!==null?e!==null?e.setMaterial(n):this.overrideMaterialManager=new Pc(n):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(n){this.overrideMaterial=n}get clear(){return this.clearPass.enabled}set clear(n){this.clearPass.enabled=n}getSelection(){return this.selection}setSelection(n){this.selection=n}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(n){this.ignoreBackground=n}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(n){this.skipShadowMapUpdate=n}getClearPass(){return this.clearPass}render(n,e,t,i,r){const s=this.scene,o=this.camera,a=this.selection,l=o.layers.mask,u=s.background,c=n.shadowMap.autoUpdate,h=this.renderToScreen?null:e;a!==null&&o.layers.set(a.getLayer()),this.skipShadowMapUpdate&&(n.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(n,e),n.setRenderTarget(h),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(n,s,o):n.render(s,o),o.layers.mask=l,s.background=u,n.shadowMap.autoUpdate=c}},W0=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,X0="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",Y0=class extends lt{constructor(n,e,t,i,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:ci.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new Je(null),depthBuffer:new Je(null),resolution:new Je(new le),texelSize:new Je(new le),cameraNear:new Je(.3),cameraFar:new Je(1e3),aspect:new Je(1),time:new Je(0)},blending:Yt,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:r}),n&&this.setShaderParts(n),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(i)}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.uniforms.inputBuffer.value=n}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(n){this.uniforms.depthBuffer.value=n}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(n){this.defines.DEPTH_PACKING=n.toFixed(0),this.needsUpdate=!0}setDepthBuffer(n,e=Hr){this.depthBuffer=n,this.depthPacking=e}setShaderData(n){this.setShaderParts(n.shaderParts),this.setDefines(n.defines),this.setUniforms(n.uniforms),this.setExtensions(n.extensions)}setShaderParts(n){return this.fragmentShader=W0.replace(je.FRAGMENT_HEAD,n.get(je.FRAGMENT_HEAD)||"").replace(je.FRAGMENT_MAIN_UV,n.get(je.FRAGMENT_MAIN_UV)||"").replace(je.FRAGMENT_MAIN_IMAGE,n.get(je.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=X0.replace(je.VERTEX_HEAD,n.get(je.VERTEX_HEAD)||"").replace(je.VERTEX_MAIN_SUPPORT,n.get(je.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(n){for(const e of n.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(n){for(const e of n.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(n){this.extensions={};for(const e of n)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(n){this.encodeOutput!==n&&(n?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(n){return this.encodeOutput}setOutputEncodingEnabled(n){this.encodeOutput=n}get time(){return this.uniforms.time.value}set time(n){this.uniforms.time.value=n}setDeltaTime(n){this.uniforms.time.value+=n}adoptCameraSettings(n){this.copyCameraSettings(n)}copyCameraSettings(n){n&&(this.uniforms.cameraNear.value=n.near,this.uniforms.cameraFar.value=n.far,n instanceof jt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(n,e){const t=this.uniforms;t.resolution.value.set(n,e),t.texelSize.value.set(1/n,1/e),t.aspect.value=n/e}static get Section(){return je}};function Dc(n,e,t){for(const i of e){const r="$1"+n+i.charAt(0).toUpperCase()+i.slice(1),s=new RegExp("([^\\.])(\\b"+i+"\\b)","g");for(const o of t.entries())o[1]!==null&&t.set(o[0],o[1].replace(s,r))}}function q0(n,e,t){let i=e.getFragmentShader(),r=e.getVertexShader();const s=i!==void 0&&/mainImage/.test(i),o=i!==void 0&&/mainUv/.test(i);if(t.attributes|=e.getAttributes(),i===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(o&&t.attributes&Di.CONVOLUTION)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!s&&!o)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{const a=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=t.shaderParts;let u=l.get(je.FRAGMENT_HEAD)||"",c=l.get(je.FRAGMENT_MAIN_UV)||"",h=l.get(je.FRAGMENT_MAIN_IMAGE)||"",f=l.get(je.VERTEX_HEAD)||"",p=l.get(je.VERTEX_MAIN_SUPPORT)||"";const v=new Set,x=new Set;if(o&&(c+=`	${n}MainUv(UV);
`,t.uvTransformation=!0),r!==null&&/mainSupport/.test(r)){const y=/mainSupport *\([\w\s]*?uv\s*?\)/.test(r);p+=`	${n}MainSupport(`,p+=y?`vUv);
`:`);
`;for(const g of r.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const S of g[1].split(/\s*,\s*/))t.varyings.add(S),v.add(S),x.add(S);for(const g of r.matchAll(a))x.add(g[1])}for(const y of i.matchAll(a))x.add(y[1]);for(const y of e.defines.keys())x.add(y.replace(/\([\w\s,]*\)/g,""));for(const y of e.uniforms.keys())x.add(y);x.delete("while"),x.delete("for"),x.delete("if"),e.uniforms.forEach((y,g)=>t.uniforms.set(n+g.charAt(0).toUpperCase()+g.slice(1),y)),e.defines.forEach((y,g)=>t.defines.set(n+g.charAt(0).toUpperCase()+g.slice(1),y));const m=new Map([["fragment",i],["vertex",r]]);Dc(n,x,t.defines),Dc(n,x,m),i=m.get("fragment"),r=m.get("vertex");const d=e.blendMode;if(t.blendModes.set(d.blendFunction,d),s){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(h+=e.inputColorSpace===Ke?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==Ht?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);const y=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;h+=`${n}MainImage(color0, UV, `,t.attributes&Di.DEPTH&&y.test(i)&&(h+="depth, ",t.readDepth=!0),h+=`color1);
	`;const g=n+"BlendOpacity";t.uniforms.set(g,d.opacity),h+=`color0 = blend${d.blendFunction}(color0, color1, ${g});

	`,u+=`uniform float ${g};

`}if(u+=i+`
`,r!==null&&(f+=r+`
`),l.set(je.FRAGMENT_HEAD,u),l.set(je.FRAGMENT_MAIN_UV,c),l.set(je.FRAGMENT_MAIN_IMAGE,h),l.set(je.VERTEX_HEAD,f),l.set(je.VERTEX_MAIN_SUPPORT,p),e.extensions!==null)for(const y of e.extensions)t.extensions.add(y)}}var K0=class extends hn{constructor(n,...e){super("EffectPass"),this.fullscreenMaterial=new Y0(null,null,null,n),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(n){for(const e of this.effects)e.mainScene=n}set mainCamera(n){this.fullscreenMaterial.copyCameraSettings(n);for(const e of this.effects)e.mainCamera=n}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(n){this.fullscreenMaterial.encodeOutput=n}get dithering(){return this.fullscreenMaterial.dithering}set dithering(n){const e=this.fullscreenMaterial;e.dithering=n,e.needsUpdate=!0}setEffects(n){for(const e of this.effects)e.removeEventListener("change",this.listener);this.effects=n.sort((e,t)=>t.attributes-e.attributes);for(const e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){const n=new Xv;let e=0;for(const o of this.effects)if(o.blendMode.blendFunction===qe.DST)n.attributes|=o.getAttributes()&Di.DEPTH;else{if(n.attributes&o.getAttributes()&Di.CONVOLUTION)throw new Error(`Convolution effects cannot be merged (${o.name})`);q0("e"+e++,o,n)}let t=n.shaderParts.get(je.FRAGMENT_HEAD),i=n.shaderParts.get(je.FRAGMENT_MAIN_IMAGE),r=n.shaderParts.get(je.FRAGMENT_MAIN_UV);const s=/\bblend\b/g;for(const o of n.blendModes.values())t+=o.getShaderCode().replace(s,`blend${o.blendFunction}`)+`
`;n.attributes&Di.DEPTH?(n.readDepth&&(i=`float depth = readDepth(UV);

	`+i),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,n.colorSpace===Ke&&(i+=`color0 = sRGBToLinear(color0);
	`),n.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,n.defines.set("UV","transformedUv")):n.defines.set("UV","vUv"),n.shaderParts.set(je.FRAGMENT_HEAD,t),n.shaderParts.set(je.FRAGMENT_MAIN_IMAGE,i),n.shaderParts.set(je.FRAGMENT_MAIN_UV,r);for(const[o,a]of n.shaderParts)a!==null&&n.shaderParts.set(o,a.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(n)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(n,e=Hr){this.fullscreenMaterial.depthBuffer=n,this.fullscreenMaterial.depthPacking=e;for(const t of this.effects)t.setDepthTexture(n,e)}render(n,e,t,i,r){for(const s of this.effects)s.update(n,e,i);if(!this.skipRendering||this.renderToScreen){const s=this.fullscreenMaterial;s.inputBuffer=e.texture,s.time+=i*this.timeScale,n.setRenderTarget(this.renderToScreen?null:t),n.render(this.scene,this.camera)}}setSize(n,e){this.fullscreenMaterial.setSize(n,e);for(const t of this.effects)t.setSize(n,e)}initialize(n,e,t){this.renderer=n;for(const i of this.effects)i.initialize(n,e,t);this.updateMaterial(),t!==void 0&&t!==Gt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const n of this.effects)n.removeEventListener("change",this.listener),n.dispose()}handleEvent(n){switch(n.type){case"change":this.recompile();break}}};class Z0 extends $t{constructor(){super();el(this,"boundingSphere",new js);this.setAttribute("position",new ht(new Float32Array([-1,-1,3,-1,-1,3]),2)),this.setAttribute("uv",new ht(new Float32Array([0,0,2,0,0,2]),2))}computeBoundingSphere(){}}const j0=new Z0,Q0=new $s;class vi{constructor(e){this._mesh=new $e(j0,e),this._mesh.frustumCulled=!1}render(e){e.render(this._mesh,Q0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}dispose(){this._mesh.material.dispose(),this._mesh.geometry.dispose()}}const J0={uniforms:{sceneDiffuse:{value:null},sceneDepth:{value:null},sceneNormal:{value:null},projMat:{value:new Pe},viewMat:{value:new Pe},projViewMat:{value:new Pe},projectionMatrixInv:{value:new Pe},viewMatrixInv:{value:new Pe},cameraPos:{value:new U},resolution:{value:new le},biasAdjustment:{value:new le},time:{value:0},samples:{value:[]},bluenoise:{value:null},distanceFalloff:{value:1},radius:{value:5},near:{value:.1},far:{value:1e3},ortho:{value:!1},screenSpaceRadius:{value:!1},frame:{value:0}},depthWrite:!1,depthTest:!1,vertexShader:`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1);
}`,fragmentShader:`
    #define SAMPLES 16
    #define FSAMPLES 16.0
uniform sampler2D sceneDiffuse;
uniform highp sampler2D sceneNormal;
uniform highp sampler2D sceneDepth;
uniform mat4 projectionMatrixInv;
uniform mat4 viewMatrixInv;
uniform mat4 projMat;
uniform mat4 viewMat;
uniform mat4 projViewMat;
uniform vec3 cameraPos;
uniform vec2 resolution;
uniform vec2 biasAdjustment;
uniform float time;
uniform vec3[SAMPLES] samples;
uniform float radius;
uniform float distanceFalloff;
uniform float near;
uniform float far;
uniform float frame;
uniform bool ortho;
uniform bool screenSpaceRadius;
uniform sampler2D bluenoise;
    varying vec2 vUv;
    highp float linearize_depth(highp float d, highp float zNear,highp float zFar)
    {
        return (zFar * zNear) / (zFar - d * (zFar - zNear));
    }
    highp float linearize_depth_ortho(highp float d, highp float nearZ, highp float farZ) {
      return nearZ + (farZ - nearZ) * d;
    }
    highp float linearize_depth_log(highp float d, highp float nearZ,highp float farZ) {
      float depth = pow(2.0, d * log2(farZ + 1.0)) - 1.0;
      float a = farZ / (farZ - nearZ);
      float b = farZ * nearZ / (nearZ - farZ);
      float linDepth = a + b / depth;
      /*return ortho ? linearize_depth_ortho(
        linDepth,
        nearZ,
        farZ
      ) :linearize_depth(linDepth, nearZ, farZ);*/
       #ifdef ORTHO

       return linearize_depth_ortho(d, nearZ, farZ);

        #else
        return linearize_depth(linDepth, nearZ, farZ);
        #endif
    }

    vec3 getWorldPosLog(vec3 posS) {
      vec2 uv = posS.xy;
      float z = posS.z;
      float nearZ =near;
      float farZ = far;
      float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;
      float a = farZ / (farZ - nearZ);
      float b = farZ * nearZ / (nearZ - farZ);
      float linDepth = a + b / depth;
      vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;
      vec4 wpos = projectionMatrixInv * clipVec;
      return wpos.xyz / wpos.w;
    }
    vec3 getWorldPos(float depth, vec2 coord) {
      #ifdef LOGDEPTH
        #ifndef ORTHO
          return getWorldPosLog(vec3(coord, depth));
        #endif
      #endif
      float z = depth * 2.0 - 1.0;
      vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);
      vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;
      // Perspective division
     vec4 worldSpacePosition = viewSpacePosition;
     worldSpacePosition.xyz /= worldSpacePosition.w;
      return worldSpacePosition.xyz;
  }

  vec3 computeNormal(vec3 worldPos, vec2 vUv) {
    ivec2 p = ivec2(vUv * resolution);
    #ifdef REVERSEDEPTH
    float c0 = 1.0 - texelFetch(sceneDepth, p, 0).x;
    float l2 = 1.0 - texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;
    float l1 = 1.0 - texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;
    float r1 = 1.0 - texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;
    float r2 = 1.0 - texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;
    float b2 = 1.0 - texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;
    float b1 = 1.0 - texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;
    float t1 = 1.0 - texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;
    float t2 = 1.0 - texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;
    #else
    float c0 = texelFetch(sceneDepth, p, 0).x;
    float l2 = texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;
    float l1 = texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;
    float r1 = texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;
    float r2 = texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;
    float b2 = texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;
    float b1 = texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;
    float t1 = texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;
    float t2 = texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;
    #endif

    float dl = abs((2.0 * l1 - l2) - c0);
    float dr = abs((2.0 * r1 - r2) - c0);
    float db = abs((2.0 * b1 - b2) - c0);
    float dt = abs((2.0 * t1 - t2) - c0);

    vec3 ce = getWorldPos(c0, vUv).xyz;

    vec3 dpdx = (dl < dr) ? ce - getWorldPos(l1, (vUv - vec2(1.0 / resolution.x, 0.0))).xyz
                          : -ce + getWorldPos(r1, (vUv + vec2(1.0 / resolution.x, 0.0))).xyz;
    vec3 dpdy = (db < dt) ? ce - getWorldPos(b1, (vUv - vec2(0.0, 1.0 / resolution.y))).xyz
                          : -ce + getWorldPos(t1, (vUv + vec2(0.0, 1.0 / resolution.y))).xyz;

    return normalize(cross(dpdx, dpdy));
}

mat3 makeRotationZ(float theta) {
	float c = cos(theta);
	float s = sin(theta);
	return mat3(c, - s, 0,
			s,  c, 0,
			0,  0, 1);
  }

void main() {
      vec4 diffuse = texture2D(sceneDiffuse, vUv);
      #ifdef REVERSEDEPTH
      float depth = 1.0 - texture2D(sceneDepth, vUv).x;
      #else
      float depth = texture2D(sceneDepth, vUv).x;
      #endif
      if (depth == 1.0) {
        gl_FragColor = vec4(vec3(1.0), 1.0);
        return;
      }
      vec3 worldPos = getWorldPos(depth, vUv);
      #ifdef HALFRES
        vec3 normal = texture2D(sceneNormal, vUv).rgb;
      #else
        vec3 normal = computeNormal(worldPos, vUv);
      #endif
      vec4 noise = texture2D(bluenoise, gl_FragCoord.xy / 128.0);
      vec2 harmoniousNumbers = vec2(
        1.618033988749895,
        1.324717957244746
      );
      noise.rg += harmoniousNumbers * frame;
      noise.rg = fract(noise.rg);
        vec3 helperVec = vec3(0.0, 1.0, 0.0);
        if (dot(helperVec, normal) > 0.99) {
          helperVec = vec3(1.0, 0.0, 0.0);
        }
        vec3 tangent = normalize(cross(helperVec, normal));
        vec3 bitangent = cross(normal, tangent);
        mediump mat3 tbn = mat3(tangent, bitangent, normal) *  makeRotationZ( noise.r * 3.1415962 * 2.0) ;

      mediump float occluded = 0.0;
      mediump float totalWeight = 0.0;
      float radiusToUse = screenSpaceRadius ? distance(
        worldPos,
        getWorldPos(depth, vUv +
          vec2(radius, 0.0) / resolution)
      ) : radius;
      float distanceFalloffToUse =screenSpaceRadius ?
          radiusToUse * distanceFalloff
      : radiusToUse * distanceFalloff * 0.2;
      float bias = (min(
        0.1,
        distanceFalloffToUse * 0.1
      ) / near) * fwidth(distance(worldPos, cameraPos)) / radiusToUse;
      bias = biasAdjustment.x + biasAdjustment.y * bias;
      mediump float offsetMove = noise.g;
      mediump float offsetMoveInv = 1.0 / FSAMPLES;
      float farTimesNear = far * near;
      float farMinusNear = far - near;
      
      for(int i = 0; i < SAMPLES; i++) {
        mediump vec3 sampleDirection = tbn * samples[i];

        float moveAmt = fract(offsetMove);
        offsetMove += offsetMoveInv;
        vec3 samplePos = worldPos + radiusToUse * moveAmt * sampleDirection;
        vec4 offset = projMat * vec4(samplePos, 1.0);
        offset.xyz /= offset.w;
        offset.xyz = offset.xyz * 0.5 + 0.5;
        
        if (all(greaterThan(offset.xyz * (1.0 - offset.xyz), vec3(0.0)))) {
          #ifdef REVERSEDEPTH
          float sampleDepth = 1.0 - textureLod(sceneDepth, offset.xy, 0.0).x;
          #else
          float sampleDepth = textureLod(sceneDepth, offset.xy, 0.0).x;
          #endif

          /*#ifdef LOGDEPTH
          float distSample = linearize_depth_log(sampleDepth, near, far);
      #else
          #ifdef ORTHO
              float distSample = near + farMinusNear * sampleDepth;
          #else
              float distSample = (farTimesNear) / (far - sampleDepth * farMinusNear);
          #endif
      #endif*/
      #ifdef ORTHO
          float distSample = near + sampleDepth * farMinusNear;
      #else
          #ifdef LOGDEPTH
              float distSample = linearize_depth_log(sampleDepth, near, far);
          #else
              float distSample = (farTimesNear) / (far - sampleDepth * farMinusNear);
          #endif
      #endif
      
      #ifdef ORTHO
          float distWorld = near + offset.z * farMinusNear;
      #else
          float distWorld = (farTimesNear) / (far - offset.z * farMinusNear);
      #endif
          
          mediump float rangeCheck = smoothstep(0.0, 1.0, distanceFalloffToUse / (abs(distSample - distWorld)));
          vec2 diff = gl_FragCoord.xy - floor(offset.xy * resolution);
          occluded += rangeCheck * float(distSample != distWorld) * float(sampleDepth != depth) * step(distSample + bias, distWorld) * step(
            1.0,
            dot(diff, diff)
          );
          
          totalWeight ++;
        }
      }
      float occ = clamp(1.0 - occluded / (totalWeight == 0.0 ? 1.0 : totalWeight), 0.0, 1.0);
      gl_FragColor = vec4(occ, 0.5 + 0.5 * normal);
}`},$0={uniforms:{sceneDiffuse:{value:null},sceneDepth:{value:null},tDiffuse:{value:null},transparencyDWFalse:{value:null},transparencyDWTrue:{value:null},transparencyDWTrueDepth:{value:null},transparencyAware:{value:!1},projMat:{value:new Pe},viewMat:{value:new Pe},projectionMatrixInv:{value:new Pe},viewMatrixInv:{value:new Pe},cameraPos:{value:new U},resolution:{value:new le},color:{value:new U(0,0,0)},blueNoise:{value:null},downsampledDepth:{value:null},time:{value:0},intensity:{value:10},renderMode:{value:0},gammaCorrection:{value:!1},ortho:{value:!1},near:{value:.1},far:{value:1e3},screenSpaceRadius:{value:!1},radius:{value:0},distanceFalloff:{value:1},fog:{value:!1},fogExp:{value:!1},fogDensity:{value:0},fogNear:{value:1/0},fogFar:{value:1/0},colorMultiply:{value:!0},aoTones:{value:0}},depthWrite:!1,depthTest:!1,vertexShader:`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1);
		}`,fragmentShader:`
		uniform sampler2D sceneDiffuse;
    uniform highp sampler2D sceneDepth;
    uniform highp sampler2D downsampledDepth;
    uniform highp sampler2D transparencyDWFalse;
    uniform highp sampler2D transparencyDWTrue;
    uniform highp sampler2D transparencyDWTrueDepth;
    uniform sampler2D tDiffuse;
    uniform sampler2D blueNoise;
    uniform vec2 resolution;
    uniform vec3 color;
    uniform mat4 projectionMatrixInv;
    uniform mat4 viewMatrixInv;
    uniform float intensity;
    uniform float renderMode;
    uniform float near;
    uniform float far;
    uniform float aoTones;
    uniform bool gammaCorrection;
    uniform bool ortho;
    uniform bool screenSpaceRadius;
    uniform bool fog;
    uniform bool fogExp;
    uniform bool colorMultiply;
    uniform bool transparencyAware;
    uniform float fogDensity;
    uniform float fogNear;
    uniform float fogFar;
    uniform float radius;
    uniform float distanceFalloff;
    uniform vec3 cameraPos;
    varying vec2 vUv;
    highp float linearize_depth(highp float d, highp float zNear,highp float zFar)
    {
        return (zFar * zNear) / (zFar - d * (zFar - zNear));
    }
    highp float linearize_depth_ortho(highp float d, highp float nearZ, highp float farZ) {
      return nearZ + (farZ - nearZ) * d;
    }
    highp float linearize_depth_log(highp float d, highp float nearZ,highp float farZ) {
      float depth = pow(2.0, d * log2(farZ + 1.0)) - 1.0;
      float a = farZ / (farZ - nearZ);
      float b = farZ * nearZ / (nearZ - farZ);
      float linDepth = a + b / depth;
      return ortho ? linearize_depth_ortho(
        linDepth,
        nearZ,
        farZ
      ) :linearize_depth(linDepth, nearZ, farZ);
    }
    vec3 getWorldPosLog(vec3 posS) {
        vec2 uv = posS.xy;
        float z = posS.z;
        float nearZ =near;
        float farZ = far;
        float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;
        float a = farZ / (farZ - nearZ);
        float b = farZ * nearZ / (nearZ - farZ);
        float linDepth = a + b / depth;
        vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;
        vec4 wpos = projectionMatrixInv * clipVec;
        return wpos.xyz / wpos.w;
      }
      vec3 getWorldPos(float depth, vec2 coord) {
        #ifdef LOGDEPTH
          #ifndef ORTHO
            return getWorldPosLog(vec3(coord, depth));
          #endif
        #endif
      //  }
        float z = depth * 2.0 - 1.0;
        vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);
        vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;
        // Perspective division
       vec4 worldSpacePosition = viewSpacePosition;
       worldSpacePosition.xyz /= worldSpacePosition.w;
        return worldSpacePosition.xyz;
    }
  
    vec3 computeNormal(vec3 worldPos, vec2 vUv) {
      ivec2 p = ivec2(vUv * resolution);
      #ifdef REVERSEDEPTH
      float c0 = 1.0 - texelFetch(sceneDepth, p, 0).x;
      float l2 = 1.0 - texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;
      float l1 = 1.0 - texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;
      float r1 = 1.0 - texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;
      float r2 = 1.0 - texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;
      float b2 = 1.0 - texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;
      float b1 = 1.0 - texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;
      float t1 = 1.0 - texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;
      float t2 = 1.0 - texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;
      #else
      float c0 = texelFetch(sceneDepth, p, 0).x;
      float l2 = texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;
      float l1 = texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;
      float r1 = texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;
      float r2 = texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;
      float b2 = texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;
      float b1 = texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;
      float t1 = texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;
      float t2 = texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;
      #endif
  
      float dl = abs((2.0 * l1 - l2) - c0);
      float dr = abs((2.0 * r1 - r2) - c0);
      float db = abs((2.0 * b1 - b2) - c0);
      float dt = abs((2.0 * t1 - t2) - c0);
  
      vec3 ce = getWorldPos(c0, vUv).xyz;
  
      vec3 dpdx = (dl < dr) ? ce - getWorldPos(l1, (vUv - vec2(1.0 / resolution.x, 0.0))).xyz
                            : -ce + getWorldPos(r1, (vUv + vec2(1.0 / resolution.x, 0.0))).xyz;
      vec3 dpdy = (db < dt) ? ce - getWorldPos(b1, (vUv - vec2(0.0, 1.0 / resolution.y))).xyz
                            : -ce + getWorldPos(t1, (vUv + vec2(0.0, 1.0 / resolution.y))).xyz;
  
      return normalize(cross(dpdx, dpdy));
  }

    #include <common>
    #include <dithering_pars_fragment>
    void main() {
        //vec4 texel = texture2D(tDiffuse, vUv);//vec3(0.0);
        vec4 sceneTexel = texture2D(sceneDiffuse, vUv);
        #ifdef REVERSEDEPTH
        float depth = 1.0 - texture2D(sceneDepth, vUv).x;
        #else
        float depth = texture2D(sceneDepth, vUv).x;
        #endif
        #ifdef HALFRES 
        vec4 texel;
        if (depth == 1.0) {
            texel = vec4(0.0, 0.0, 0.0, 1.0);
        } else {
        vec3 worldPos = getWorldPos(depth, vUv);
        vec3 normal = computeNormal(getWorldPos(depth, vUv), vUv);
       // vec4 texel = texture2D(tDiffuse, vUv);
       // Find closest depth;
       float totalWeight = 0.0;
       float radiusToUse = screenSpaceRadius ? distance(
        worldPos,
        getWorldPos(depth, vUv +
          vec2(radius, 0.0) / resolution)
      ) : radius;
      float distanceFalloffToUse =screenSpaceRadius ?
          radiusToUse * distanceFalloff
      : distanceFalloff;
        for(float x = -1.0; x <= 1.0; x++) {
            for(float y = -1.0; y <= 1.0; y++) {
                vec2 offset = vec2(x, y);
                ivec2 p = ivec2(
                    (vUv * resolution * 0.5) + offset
                );
                vec2 pUv = vec2(p) / (resolution * 0.5);
                float sampleDepth = texelFetch(downsampledDepth,p, 0).x;
                vec4 sampleInfo = texelFetch(tDiffuse, p, 0);
                vec3 normalSample = sampleInfo.gba * 2.0 - 1.0;
                vec3 worldPosSample = getWorldPos(sampleDepth, pUv);
                float tangentPlaneDist = abs(dot(worldPosSample - worldPos, normal));
                float rangeCheck = exp(-1.0 * tangentPlaneDist * (1.0 / distanceFalloffToUse)) * max(dot(normal, normalSample), 0.0);
                float weight = rangeCheck;
                totalWeight += weight;
                texel += sampleInfo * weight;
            }
        }
        if (totalWeight == 0.0) {
            texel = texture2D(tDiffuse, vUv);
        } else {
            texel /= totalWeight;
        }
    }
        #else
        vec4 texel = texture2D(tDiffuse, vUv);
        #endif

        #ifdef LOGDEPTH
        texel.r = clamp(texel.r, 0.0, 1.0);
        if (texel.r == 0.0) {
          texel.r = 1.0;
        }
        #endif
     
        float finalAo = pow(texel.r, intensity);
        if (aoTones > 0.0) {
            finalAo = ceil(finalAo * aoTones) / aoTones;
        }
        float fogFactor;
        float fogDepth = distance(
            cameraPos,
            getWorldPos(depth, vUv)
        );
        if (fog) {
            if (fogExp) {
                fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
            } else {
                fogFactor = smoothstep( fogNear, fogFar, fogDepth );
            }
        }
        if (transparencyAware) {
            float transparencyDWOff = texture2D(transparencyDWFalse, vUv).a;
            float transparencyDWOn = texture2D(transparencyDWTrue, vUv).a;
            float adjustmentFactorOff = transparencyDWOff;
            #ifdef REVERSEDEPTH
            float depthSample = 1.0 - texture2D(sceneDepth, vUv).r;
            float trueDepthSample = 1.0 - texture2D(transparencyDWTrueDepth, vUv).r;
            #else
            float depthSample = texture2D(sceneDepth, vUv).r;
            float trueDepthSample = texture2D(transparencyDWTrueDepth, vUv).r;
            #endif
            float adjustmentFactorOn = (1.0 - transparencyDWOn) * (
                trueDepthSample == depthSample ? 1.0 : 0.0
            );
            float adjustmentFactor = max(adjustmentFactorOff, adjustmentFactorOn);
            finalAo = mix(finalAo, 1.0, adjustmentFactor);
        }
        finalAo = mix(finalAo, 1.0, fogFactor);
        vec3 aoApplied = color * mix(vec3(1.0), sceneTexel.rgb, float(colorMultiply));
        if (renderMode == 0.0) {
            gl_FragColor = vec4( mix(sceneTexel.rgb, aoApplied, 1.0 - finalAo), sceneTexel.a);
        } else if (renderMode == 1.0) {
            gl_FragColor = vec4( mix(vec3(1.0), aoApplied, 1.0 - finalAo), sceneTexel.a);
        } else if (renderMode == 2.0) {
            gl_FragColor = vec4( sceneTexel.rgb, sceneTexel.a);
        } else if (renderMode == 3.0) {
            if (vUv.x < 0.5) {
                gl_FragColor = vec4( sceneTexel.rgb, sceneTexel.a);
            } else if (abs(vUv.x - 0.5) < 1.0 / resolution.x) {
                gl_FragColor = vec4(1.0);
            } else {
                gl_FragColor = vec4( mix(sceneTexel.rgb, aoApplied, 1.0 - finalAo), sceneTexel.a);
            }
        } else if (renderMode == 4.0) {
            if (vUv.x < 0.5) {
                gl_FragColor = vec4( sceneTexel.rgb, sceneTexel.a);
            } else if (abs(vUv.x - 0.5) < 1.0 / resolution.x) {
                gl_FragColor = vec4(1.0);
            } else {
                gl_FragColor = vec4( mix(vec3(1.0), aoApplied, 1.0 - finalAo), sceneTexel.a);
            }
        }
        #include <dithering_fragment>
        if (gammaCorrection) {
            gl_FragColor = sRGBTransferOETF(gl_FragColor);
        }
    }
    `},ex={uniforms:{sceneDiffuse:{value:null},sceneDepth:{value:null},tDiffuse:{value:null},projMat:{value:new Pe},viewMat:{value:new Pe},projectionMatrixInv:{value:new Pe},viewMatrixInv:{value:new Pe},cameraPos:{value:new U},resolution:{value:new le},time:{value:0},r:{value:5},blueNoise:{value:null},radius:{value:12},worldRadius:{value:5},index:{value:0},poissonDisk:{value:[]},distanceFalloff:{value:1},near:{value:.1},far:{value:1e3},screenSpaceRadius:{value:!1}},depthWrite:!1,depthTest:!1,vertexShader:`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}`,fragmentShader:`
		uniform sampler2D sceneDiffuse;
    uniform highp sampler2D sceneDepth;
    uniform sampler2D tDiffuse;
    uniform sampler2D blueNoise;
    uniform mat4 projectionMatrixInv;
    uniform mat4 viewMatrixInv;
    uniform vec2 resolution;
    uniform float r;
    uniform float radius;
     uniform float worldRadius;
    uniform float index;
     uniform float near;
     uniform float far;
     uniform float distanceFalloff;
     uniform bool screenSpaceRadius;
    varying vec2 vUv;

    highp float linearize_depth(highp float d, highp float zNear,highp float zFar)
    {
        highp float z_n = 2.0 * d - 1.0;
        return 2.0 * zNear * zFar / (zFar + zNear - z_n * (zFar - zNear));
    }
    highp float linearize_depth_log(highp float d, highp float nearZ,highp float farZ) {
     float depth = pow(2.0, d * log2(farZ + 1.0)) - 1.0;
     float a = farZ / (farZ - nearZ);
     float b = farZ * nearZ / (nearZ - farZ);
     float linDepth = a + b / depth;
     return linearize_depth(linDepth, nearZ, farZ);
   }
   highp float linearize_depth_ortho(highp float d, highp float nearZ, highp float farZ) {
     return nearZ + (farZ - nearZ) * d;
   }
   vec3 getWorldPosLog(vec3 posS) {
     vec2 uv = posS.xy;
     float z = posS.z;
     float nearZ =near;
     float farZ = far;
     float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;
     float a = farZ / (farZ - nearZ);
     float b = farZ * nearZ / (nearZ - farZ);
     float linDepth = a + b / depth;
     vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;
     vec4 wpos = projectionMatrixInv * clipVec;
     return wpos.xyz / wpos.w;
   }
    vec3 getWorldPos(float depth, vec2 coord) {
     #ifdef LOGDEPTH
      #ifndef ORTHO
          return getWorldPosLog(vec3(coord, depth));
      #endif
     #endif
        
        float z = depth * 2.0 - 1.0;
        vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);
        vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;
        // Perspective division
       vec4 worldSpacePosition = viewSpacePosition;
       worldSpacePosition.xyz /= worldSpacePosition.w;
        return worldSpacePosition.xyz;
    }
    #include <common>
    #define NUM_SAMPLES 16
    uniform vec2 poissonDisk[NUM_SAMPLES];
    void main() {
        const float pi = 3.14159;
        vec2 texelSize = vec2(1.0 / resolution.x, 1.0 / resolution.y);
        vec2 uv = vUv;
        vec4 data = texture2D(tDiffuse, vUv);
        float occlusion = data.r;
        float baseOcc = data.r;
        vec3 normal = data.gba * 2.0 - 1.0;
        float count = 1.0;
        float d = texture2D(sceneDepth, vUv).x;
        if (d == 1.0) {
          gl_FragColor = data;
          return;
        }
        vec3 worldPos = getWorldPos(d, vUv);
        float size = radius;
        float angle;
        if (index == 0.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).w * PI2;
        } else if (index == 1.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).z * PI2;
        } else if (index == 2.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).y * PI2;
        } else {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).x * PI2;
        }

        mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        float radiusToUse = screenSpaceRadius ? distance(
          worldPos,
          getWorldPos(d, vUv +
            vec2(worldRadius, 0.0) / resolution)
        ) : worldRadius;
        float distanceFalloffToUse =screenSpaceRadius ?
        radiusToUse * distanceFalloff
    : radiusToUse * distanceFalloff * 0.2;

        float invDistance = (1.0 / distanceFalloffToUse);
        for(int i = 0; i < NUM_SAMPLES; i++) {
            vec2 offset = (rotationMatrix * poissonDisk[i]) * texelSize * size;
            vec4 dataSample = texture2D(tDiffuse, uv + offset);
            float occSample = dataSample.r;
            vec3 normalSample = dataSample.gba * 2.0 - 1.0;
            float dSample = texture2D(sceneDepth, uv + offset).x;
            vec3 worldPosSample = getWorldPos(dSample, uv + offset);
            float tangentPlaneDist = abs(dot(worldPosSample - worldPos, normal));
            float rangeCheck = float(dSample != 1.0) * exp(-1.0 * tangentPlaneDist * invDistance ) * max(dot(normal, normalSample), 0.0);
            occlusion += occSample * rangeCheck;
            count += rangeCheck;
        }
        if (count > 0.0) {
          occlusion /= count;
        }
        occlusion = clamp(occlusion, 0.0, 1.0);
        if (occlusion == 0.0) {
          occlusion = 1.0;
        }
        gl_FragColor = vec4(occlusion, 0.5 + 0.5 * normal);
    }
    `},tx={uniforms:{sceneDepth:{value:null},resolution:{value:new le},near:{value:.1},far:{value:1e3},viewMatrixInv:{value:new Pe},projectionMatrixInv:{value:new Pe},logDepth:{value:!1},ortho:{value:!1}},depthWrite:!1,depthTest:!1,vertexShader:`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1);
    }`,fragmentShader:`
    uniform highp sampler2D sceneDepth;
    uniform vec2 resolution;
    uniform float near;
    uniform float far;
    uniform bool logDepth;
    uniform bool ortho;
    uniform mat4 viewMatrixInv;
    uniform mat4 projectionMatrixInv;
    varying vec2 vUv;
    layout(location = 1) out vec4 gNormal;
    vec3 getWorldPosLog(vec3 posS) {
        vec2 uv = posS.xy;
        float z = posS.z;
        float nearZ =near;
        float farZ = far;
        float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;
        float a = farZ / (farZ - nearZ);
        float b = farZ * nearZ / (nearZ - farZ);
        float linDepth = a + b / depth;
        vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;
        vec4 wpos = projectionMatrixInv * clipVec;
        return wpos.xyz / wpos.w;
      }
      vec3 getWorldPos(float depth, vec2 coord) {
        if (logDepth && !ortho) {
          return getWorldPosLog(vec3(coord, depth));
        }
        float z = depth * 2.0 - 1.0;
        vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);
        vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;
        // Perspective division
       vec4 worldSpacePosition = viewSpacePosition;
       worldSpacePosition.xyz /= worldSpacePosition.w;
        return worldSpacePosition.xyz;
    }
  
    vec3 computeNormal(vec3 worldPos, vec2 vUv) {
      ivec2 p = ivec2(vUv * resolution);
      #ifdef REVERSEDEPTH
      float c0 = 1.0 - texelFetch(sceneDepth, p, 0).x;
      float l2 = 1.0 - texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;
      float l1 = 1.0 - texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;
      float r1 = 1.0 - texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;
      float r2 = 1.0 - texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;
      float b2 = 1.0 - texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;
      float b1 = 1.0 - texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;
      float t1 = 1.0 - texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;
      float t2 = 1.0 - texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;
      #else
      float c0 = texelFetch(sceneDepth, p, 0).x;
      float l2 = texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;
      float l1 = texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;
      float r1 = texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;
      float r2 = texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;
      float b2 = texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;
      float b1 = texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;
      float t1 = texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;
      float t2 = texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;
      #endif
  
      float dl = abs((2.0 * l1 - l2) - c0);
      float dr = abs((2.0 * r1 - r2) - c0);
      float db = abs((2.0 * b1 - b2) - c0);
      float dt = abs((2.0 * t1 - t2) - c0);
  
      vec3 ce = getWorldPos(c0, vUv).xyz;
  
      vec3 dpdx = (dl < dr) ? ce - getWorldPos(l1, (vUv - vec2(1.0 / resolution.x, 0.0))).xyz
                            : -ce + getWorldPos(r1, (vUv + vec2(1.0 / resolution.x, 0.0))).xyz;
      vec3 dpdy = (db < dt) ? ce - getWorldPos(b1, (vUv - vec2(0.0, 1.0 / resolution.y))).xyz
                            : -ce + getWorldPos(t1, (vUv + vec2(0.0, 1.0 / resolution.y))).xyz;
  
      return normalize(cross(dpdx, dpdy));
  }
    void main() {
        vec2 uv = vUv - vec2(0.5) / resolution;
        vec2 pixelSize = vec2(1.0) / resolution;
        highp vec2[4] uvSamples;
        uvSamples[0] = uv;
        uvSamples[1] = uv + vec2(pixelSize.x, 0.0);
        uvSamples[2] = uv + vec2(0.0, pixelSize.y);
        uvSamples[3] = uv + pixelSize;
        #ifdef REVERSEDEPTH
        float depth00 = 1.0 - texture2D(sceneDepth, uvSamples[0]).r;
        float depth10 = 1.0 - texture2D(sceneDepth, uvSamples[1]).r;
        float depth01 = 1.0 - texture2D(sceneDepth, uvSamples[2]).r;
        float depth11 = 1.0 - texture2D(sceneDepth, uvSamples[3]).r;
        #else
        float depth00 = texture2D(sceneDepth, uvSamples[0]).r;
        float depth10 = texture2D(sceneDepth, uvSamples[1]).r;
        float depth01 = texture2D(sceneDepth, uvSamples[2]).r;
        float depth11 = texture2D(sceneDepth, uvSamples[3]).r;
        #endif
        float minDepth = min(min(depth00, depth10), min(depth01, depth11));
        float maxDepth = max(max(depth00, depth10), max(depth01, depth11));
        float targetDepth = minDepth;
        // Checkerboard pattern to avoid artifacts
        if (mod(gl_FragCoord.x + gl_FragCoord.y, 2.0) > 0.5) { 
            targetDepth = maxDepth;
        }
        int chosenIndex = 0;
        float[4] samples;
        samples[0] = depth00;
        samples[1] = depth10;
        samples[2] = depth01;
        samples[3] = depth11;
        for(int i = 0; i < 4; ++i) {
            if (samples[i] == targetDepth) {
                chosenIndex = i;
                break;
            }
        }
        gl_FragColor = vec4(samples[chosenIndex], 0.0, 0.0, 1.0);
        gNormal = vec4(computeNormal(
            getWorldPos(samples[chosenIndex], uvSamples[chosenIndex]), uvSamples[chosenIndex]
        ), 0.0);
    }`},nx="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",ix=Uint8Array.from(atob(nx),n=>n.charCodeAt(0));var rx=ix;const sx=parseInt(ci.replace(/\D+/g,"")),ax=sx>=162?class extends ut{constructor(n=1,e=1,t=1,i={}){super(n,e,{...i,count:t}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}:class extends ut{constructor(n=1,e=1,t=1,i={}){super(n,e,i),this.isWebGLMultipleRenderTargets=!0;const r=this.texture;this.texture=[];for(let s=0;s<t;s++)this.texture[s]=r.clone(),this.texture[s].isRenderTargetTexture=!0}setSize(n,e,t=1){if(this.width!==n||this.height!==e||this.depth!==t){this.width=n,this.height=e,this.depth=t;for(let i=0,r=this.texture.length;i<r;i++)this.texture[i].image.width=n,this.texture[i].image.height=e,this.texture[i].image.depth=t;this.dispose()}this.viewport.set(0,0,n,e),this.scissor.set(0,0,n,e)}copy(n){this.dispose(),this.width=n.width,this.height=n.height,this.depth=n.depth,this.scissor.copy(n.scissor),this.scissorTest=n.scissorTest,this.viewport.copy(n.viewport),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,n.depthTexture!==null&&(this.depthTexture=n.depthTexture.clone()),this.texture.length=0;for(let e=0,t=n.texture.length;e<t;e++)this.texture[e]=n.texture[e].clone(),this.texture[e].isRenderTargetTexture=!0;return this}};function Ju(n,e,t){if(e.getQueryParameter(n,e.QUERY_RESULT_AVAILABLE)){const s=e.getQueryParameter(n,e.QUERY_RESULT)/1e6;t.lastTime=t.lastTime===0?s:t.timeRollingAverage*t.lastTime+(1-t.timeRollingAverage)*s}else setTimeout(()=>{Ju(n,e,t)},1)}class ox extends hn{constructor(e,t,i=512,r=512){super(),this.width=i,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.autosetGamma=!0,this.configuration=new Proxy({aoSamples:16,aoRadius:5,aoTones:0,denoiseSamples:8,denoiseRadius:12,distanceFalloff:1,intensity:5,denoiseIterations:2,renderMode:0,biasOffset:0,biasMultiplier:0,color:new Fe(0,0,0),gammaCorrection:!0,depthBufferType:Ct.Default,screenSpaceRadius:!1,halfRes:!1,depthAwareUpsampling:!0,colorMultiply:!0,transparencyAware:!1,accumulate:!1},{set:(s,o,a)=>{const l=s[o];return s[o]=a,a.equals?a.equals(l)||this.firstFrame():l!==a&&this.firstFrame(),o==="aoSamples"&&l!==a&&this.configureAOPass(this.configuration.depthBufferType,this.camera.isOrthographicCamera),o==="denoiseSamples"&&l!==a&&this.configureDenoisePass(this.configuration.depthBufferType,this.camera.isOrthographicCamera),o==="halfRes"&&l!==a&&(this.configureAOPass(this.configuration.depthBufferType,this.camera.isOrthographicCamera),this.configureHalfResTargets(),this.configureEffectCompositer(this.configuration.depthBufferType,this.camera.isOrthographicCamera),this.setSize(this.width,this.height)),o==="depthAwareUpsampling"&&l!==a&&this.configureEffectCompositer(this.configuration.depthBufferType,this.camera.isOrthographicCamera),o==="gammaCorrection"&&(this.autosetGamma=!1),o==="transparencyAware"&&l!==a&&(this.autoDetectTransparency=!1,this.configureTransparencyTarget()),!0}}),this.samples=[],this.samplesDenoise=[],this.autoDetectTransparency=!0,this.frames=0,this.lastViewMatrix=new Pe,this.lastProjectionMatrix=new Pe,this.configureEffectCompositer(this.configuration.depthBufferType),this.configureSampleDependentPasses(),this.configureHalfResTargets(),this.detectTransparency(),this.configureTransparencyTarget(),this.copyQuad=new vi(new lt({uniforms:{tDiffuse:{value:null}},depthWrite:!1,vertexShader:`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1);
            }
            `,fragmentShader:`
            uniform sampler2D tDiffuse;
            varying vec2 vUv;
            void main() {
                gl_FragColor = texture2D(tDiffuse, vUv);
            }
            `})),this.writeTargetInternal=new ut(this.width,this.height,{minFilter:nt,magFilter:nt,depthBuffer:!1,format:Pt}),this.readTargetInternal=new ut(this.width,this.height,{minFilter:nt,magFilter:nt,depthBuffer:!1,format:Pt}),this.outputTargetInternal=new ut(this.width,this.height,{minFilter:nt,magFilter:nt,depthBuffer:!1}),this.accumulationRenderTarget=new ut(this.width,this.height,{minFilter:nt,magFilter:nt,depthBuffer:!1,format:Pt,type:Gn,stencilBuffer:!1,depthBuffer:!1,alpha:!0}),this.accumulationQuad=new vi(new lt({uniforms:{frame:{value:0},tDiffuse:{value:null}},transparent:!0,opacity:1,vertexShader:`
             varying vec2 vUv;
             void main() {
                 vUv = uv;
                 gl_Position = vec4(position, 1);
             }`,fragmentShader:`
             uniform sampler2D tDiffuse;
             uniform float frame;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tDiffuse, vUv);
                    gl_FragColor = vec4(color.rgb, 1.0 / (frame + 1.0));
                }
                `})),this.bluenoise=new Av(rx,128,128),this.bluenoise.colorSpace=Ht,this.bluenoise.wrapS=Wn,this.bluenoise.wrapT=Wn,this.bluenoise.minFilter=st,this.bluenoise.magFilter=st,this.bluenoise.needsUpdate=!0,this.lastTime=0,this.timeRollingAverage=.99,this.needsDepthTexture=!0,this.needsSwap=!0,this._r=new le,this._c=new Fe}configureHalfResTargets(){this.firstFrame(),this.configuration.halfRes?(this.depthDownsampleTarget=new ax(this.width/2,this.height/2,2),this.depthDownsampleTarget.textures=this.depthDownsampleTarget.texture,this.depthDownsampleTarget.textures[0].format=_u,this.depthDownsampleTarget.textures[0].type=Hn,this.depthDownsampleTarget.textures[0].minFilter=st,this.depthDownsampleTarget.textures[0].magFilter=st,this.depthDownsampleTarget.textures[0].depthBuffer=!1,this.depthDownsampleTarget.textures[1].format=Pt,this.depthDownsampleTarget.textures[1].type=Gn,this.depthDownsampleTarget.textures[1].minFilter=st,this.depthDownsampleTarget.textures[1].magFilter=st,this.depthDownsampleTarget.textures[1].depthBuffer=!1,this.depthDownsampleQuad=new vi(new lt(tx))):(this.depthDownsampleTarget&&(this.depthDownsampleTarget.dispose(),this.depthDownsampleTarget=null),this.depthDownsampleQuad&&(this.depthDownsampleQuad.dispose(),this.depthDownsampleQuad=null))}detectTransparency(){if(this.autoDetectTransparency){let e=!1;this.scene.traverse(t=>{t.material&&t.material.transparent&&(e=!0)}),e&&(this.configuration.transparencyAware=!0)}}configureTransparencyTarget(){this.configuration.transparencyAware?(this.transparencyRenderTargetDWFalse=new ut(this.width,this.height,{minFilter:nt,magFilter:st,type:Gn,format:Pt}),this.transparencyRenderTargetDWTrue=new ut(this.width,this.height,{minFilter:nt,magFilter:st,type:Gn,format:Pt}),this.transparencyRenderTargetDWTrue.depthTexture=new ea(this.width,this.height,Tn),this.depthCopyPass=new vi(new lt({uniforms:{depthTexture:{value:this.depthTexture},reverseDepthBuffer:{value:this.configuration.depthBufferType===Ct.Reverse}},vertexShader:`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1);
            }`,fragmentShader:`
            uniform sampler2D depthTexture;
            uniform bool reverseDepthBuffer;
            varying vec2 vUv;
            void main() {
                if (reverseDepthBuffer) {
               float d = 1.0 - texture2D(depthTexture, vUv).r;
           
               d += 0.00001;
               gl_FragDepth = 1.0 - d;
            } else {
                float d = texture2D(depthTexture, vUv).r;
                d += 0.00001;
                gl_FragDepth = d;
            }
               gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            }
            `}))):(this.transparencyRenderTargetDWFalse&&(this.transparencyRenderTargetDWFalse.dispose(),this.transparencyRenderTargetDWFalse=null),this.transparencyRenderTargetDWTrue&&(this.transparencyRenderTargetDWTrue.dispose(),this.transparencyRenderTargetDWTrue=null),this.depthCopyPass&&(this.depthCopyPass.dispose(),this.depthCopyPass=null))}renderTransparency(e){const t=this.scene.background,i=e.getClearColor(new Fe),r=e.getClearAlpha(),s=new Map,o=e.autoClearDepth;this.scene.traverse(a=>{s.set(a,a.visible)}),this.scene.background=null,e.autoClearDepth=!1,e.setClearColor(new Fe(0,0,0),0),this.depthCopyPass.material.uniforms.depthTexture.value=this.depthTexture,this.depthCopyPass.material.uniforms.reverseDepthBuffer.value=this.configuration.depthBufferType===Ct.Reverse,e.setRenderTarget(this.transparencyRenderTargetDWFalse),this.scene.traverse(a=>{a.material&&(a.visible=s.get(a)&&(a.material.transparent&&!a.material.depthWrite&&!a.userData.treatAsOpaque||!!a.userData.cannotReceiveAO))}),e.clear(!0,!0,!0),this.depthCopyPass.render(e),e.render(this.scene,this.camera),e.setRenderTarget(this.transparencyRenderTargetDWTrue),this.scene.traverse(a=>{a.material&&(a.visible=s.get(a)&&a.material.transparent&&a.material.depthWrite&&!a.userData.treatAsOpaque)}),e.clear(!0,!0,!0),this.depthCopyPass.render(e),e.render(this.scene,this.camera),this.scene.traverse(a=>{a.visible=s.get(a)}),e.setClearColor(i,r),this.scene.background=t,e.autoClearDepth=o}configureSampleDependentPasses(){this.configureAOPass(this.configuration.depthBufferType,this.camera.isOrthographicCamera),this.configureDenoisePass(this.configuration.depthBufferType,this.camera.isOrthographicCamera)}configureAOPass(e=Ct.Default,t=!1){this.firstFrame(),this.samples=this.generateHemisphereSamples(this.configuration.aoSamples);const i={...J0};i.fragmentShader=i.fragmentShader.replace("16",this.configuration.aoSamples).replace("16.0",this.configuration.aoSamples+".0"),e===Ct.Log?i.fragmentShader=`#define LOGDEPTH
`+i.fragmentShader:e===Ct.Reverse&&(i.fragmentShader=`#define REVERSEDEPTH
`+i.fragmentShader),t&&(i.fragmentShader=`#define ORTHO
`+i.fragmentShader),this.configuration.halfRes&&(i.fragmentShader=`#define HALFRES
`+i.fragmentShader),this.effectShaderQuad?(this.effectShaderQuad.material.dispose(),this.effectShaderQuad.material=new lt(i)):this.effectShaderQuad=new vi(new lt(i))}configureDenoisePass(e=Ct.Default,t=!1){this.firstFrame(),this.samplesDenoise=this.generateDenoiseSamples(this.configuration.denoiseSamples,11);const i={...ex};i.fragmentShader=i.fragmentShader.replace("16",this.configuration.denoiseSamples),e===Ct.Log?i.fragmentShader=`#define LOGDEPTH
`+i.fragmentShader:e===Ct.Reverse&&(i.fragmentShader=`#define REVERSEDEPTH
`+i.fragmentShader),t&&(i.fragmentShader=`#define ORTHO
`+i.fragmentShader),this.poissonBlurQuad?(this.poissonBlurQuad.material.dispose(),this.poissonBlurQuad.material=new lt(i)):this.poissonBlurQuad=new vi(new lt(i))}configureEffectCompositer(e=Ct.Default,t=!1){this.firstFrame();const i={...$0};e===Ct.Log?i.fragmentShader=`#define LOGDEPTH
`+i.fragmentShader:e===Ct.Reverse&&(i.fragmentShader=`#define REVERSEDEPTH
`+i.fragmentShader),t&&(i.fragmentShader=`#define ORTHO
`+i.fragmentShader),this.configuration.halfRes&&this.configuration.depthAwareUpsampling&&(i.fragmentShader=`#define HALFRES
`+i.fragmentShader),this.effectCompositerQuad?(this.effectCompositerQuad.material.dispose(),this.effectCompositerQuad.material=new lt(i)):this.effectCompositerQuad=new vi(new lt(i))}generateHemisphereSamples(e){const t=[];for(let i=0;i<e;i++){const r=2.399963*i,s=Math.sqrt(i+.5)/Math.sqrt(e),o=s*Math.cos(r),a=s*Math.sin(r),l=Math.sqrt(1-(o*o+a*a));t.push(new U(o,a,l))}return t}generateDenoiseSamples(e,t){const i=2*Math.PI*t/e,r=1/e,s=r,o=[];let a=r,l=0;for(let u=0;u<e;u++)o.push(new le(Math.cos(l),Math.sin(l)).multiplyScalar(Math.pow(a,.75))),a+=s,l+=i;return o}setSize(e,t){this.firstFrame(),this.width=e,this.height=t;const i=this.configuration.halfRes?.5:1;this.writeTargetInternal.setSize(e*i,t*i),this.readTargetInternal.setSize(e*i,t*i),this.accumulationRenderTarget.setSize(e*i,t*i),this.configuration.halfRes&&this.depthDownsampleTarget.setSize(e*i,t*i),this.configuration.transparencyAware&&(this.transparencyRenderTargetDWFalse.setSize(e,t),this.transparencyRenderTargetDWTrue.setSize(e,t)),this.outputTargetInternal.setSize(e,t)}setDepthTexture(e){this.depthTexture=e}firstFrame(){this.needsFrame=!0}render(e,t,i){const r=e.xr.enabled;e.xr.enabled=!1,(e.capabilities.logarithmicDepthBuffer&&this.configuration.depthBufferType!==Ct.Log||e.capabilities.reverseDepthBuffer&&this.configuration.depthBufferType!==Ct.Reverse)&&(this.configuration.depthBufferType=e.capabilities.logarithmicDepthBuffer?Ct.Log:e.capabilities.reverseDepthBuffer?Ct.Reverse:Ct.Default,this.configureAOPass(this.configuration.depthBufferType,this.camera.isOrthographicCamera),this.configureDenoisePass(this.configuration.depthBufferType,this.camera.isOrthographicCamera),this.configureEffectCompositer(this.configuration.depthBufferType,this.camera.isOrthographicCamera)),this.detectTransparency(),(t.texture.type!==this.outputTargetInternal.texture.type||t.texture.format!==this.outputTargetInternal.texture.format)&&(this.outputTargetInternal.texture.type=t.texture.type,this.outputTargetInternal.texture.format=t.texture.format,this.outputTargetInternal.texture.needsUpdate=!0),this.camera.updateMatrixWorld(),this.lastViewMatrix.equals(this.camera.matrixWorldInverse)&&this.lastProjectionMatrix.equals(this.camera.projectionMatrix)&&this.configuration.accumulate&&!this.needsFrame?this.frame++:(this.configuration.accumulate&&(e.setRenderTarget(this.accumulationRenderTarget),e.clear(!0,!0,!0)),this.frame=0,this.needsFrame=!1),this.lastViewMatrix.copy(this.camera.matrixWorldInverse),this.lastProjectionMatrix.copy(this.camera.projectionMatrix);let s,o,a;this.debugMode&&(s=e.getContext(),o=s.getExtension("EXT_disjoint_timer_query_webgl2"),o===null&&(console.error("EXT_disjoint_timer_query_webgl2 not available, disabling debug mode."),this.debugMode=!1)),this.debugMode&&(a=s.createQuery(),s.beginQuery(o.TIME_ELAPSED_EXT,a)),this.configuration.transparencyAware&&this.renderTransparency(e),this._r.set(this.width,this.height);let l=this.configuration.aoRadius;if(this.configuration.halfRes&&this.configuration.screenSpaceRadius&&(l*=.5),this.frame<1024/this.configuration.aoSamples){this.configuration.halfRes&&(e.setRenderTarget(this.depthDownsampleTarget),this.depthDownsampleQuad.material.uniforms.sceneDepth.value=this.depthTexture,this.depthDownsampleQuad.material.uniforms.resolution.value=this._r,this.depthDownsampleQuad.material.uniforms.near.value=this.camera.near,this.depthDownsampleQuad.material.uniforms.far.value=this.camera.far,this.depthDownsampleQuad.material.uniforms.projectionMatrixInv.value=this.camera.projectionMatrixInverse,this.depthDownsampleQuad.material.uniforms.viewMatrixInv.value=this.camera.matrixWorld,this.depthDownsampleQuad.material.uniforms.logDepth.value=this.configuration.logarithmicDepthBuffer,this.depthDownsampleQuad.material.uniforms.ortho.value=this.camera.isOrthographicCamera,this.depthDownsampleQuad.render(e)),this.effectShaderQuad.material.uniforms.sceneDiffuse.value=t.texture,this.effectShaderQuad.material.uniforms.sceneDepth.value=this.configuration.halfRes?this.depthDownsampleTarget.textures[0]:this.depthTexture,this.effectShaderQuad.material.uniforms.sceneNormal.value=this.configuration.halfRes?this.depthDownsampleTarget.textures[1]:null,this.effectShaderQuad.material.uniforms.projMat.value=this.camera.projectionMatrix,this.effectShaderQuad.material.uniforms.viewMat.value=this.camera.matrixWorldInverse,this.effectShaderQuad.material.uniforms.projViewMat.value=this.camera.projectionMatrix.clone().multiply(this.camera.matrixWorldInverse.clone()),this.effectShaderQuad.material.uniforms.projectionMatrixInv.value=this.camera.projectionMatrixInverse,this.effectShaderQuad.material.uniforms.viewMatrixInv.value=this.camera.matrixWorld,this.effectShaderQuad.material.uniforms.cameraPos.value=this.camera.getWorldPosition(new U),this.effectShaderQuad.material.uniforms.biasAdjustment.value=new le(this.configuration.biasOffset,this.configuration.biasMultiplier),this.effectShaderQuad.material.uniforms.resolution.value=this.configuration.halfRes?this._r.clone().multiplyScalar(.5).floor():this._r,this.effectShaderQuad.material.uniforms.time.value=performance.now()/1e3,this.effectShaderQuad.material.uniforms.samples.value=this.samples,this.effectShaderQuad.material.uniforms.bluenoise.value=this.bluenoise,this.effectShaderQuad.material.uniforms.radius.value=l,this.effectShaderQuad.material.uniforms.distanceFalloff.value=this.configuration.distanceFalloff,this.effectShaderQuad.material.uniforms.near.value=this.camera.near,this.effectShaderQuad.material.uniforms.far.value=this.camera.far,this.effectShaderQuad.material.uniforms.ortho.value=this.camera.isOrthographicCamera,this.effectShaderQuad.material.uniforms.screenSpaceRadius.value=this.configuration.screenSpaceRadius,this.effectShaderQuad.material.uniforms.frame.value=this.frame,e.setRenderTarget(this.writeTargetInternal),this.effectShaderQuad.render(e);for(let c=0;c<this.configuration.denoiseIterations;c++)[this.writeTargetInternal,this.readTargetInternal]=[this.readTargetInternal,this.writeTargetInternal],this.poissonBlurQuad.material.uniforms.tDiffuse.value=this.readTargetInternal.texture,this.poissonBlurQuad.material.uniforms.sceneDepth.value=this.configuration.halfRes?this.depthDownsampleTarget.textures[0]:this.depthTexture,this.poissonBlurQuad.material.uniforms.projMat.value=this.camera.projectionMatrix,this.poissonBlurQuad.material.uniforms.viewMat.value=this.camera.matrixWorldInverse,this.poissonBlurQuad.material.uniforms.projectionMatrixInv.value=this.camera.projectionMatrixInverse,this.poissonBlurQuad.material.uniforms.viewMatrixInv.value=this.camera.matrixWorld,this.poissonBlurQuad.material.uniforms.cameraPos.value=this.camera.getWorldPosition(new U),this.poissonBlurQuad.material.uniforms.resolution.value=this.configuration.halfRes?this._r.clone().multiplyScalar(.5).floor():this._r,this.poissonBlurQuad.material.uniforms.time.value=performance.now()/1e3,this.poissonBlurQuad.material.uniforms.blueNoise.value=this.bluenoise,this.poissonBlurQuad.material.uniforms.radius.value=this.configuration.denoiseRadius*(this.configuration.halfRes?.5:1),this.poissonBlurQuad.material.uniforms.worldRadius.value=l,this.poissonBlurQuad.material.uniforms.distanceFalloff.value=this.configuration.distanceFalloff,this.poissonBlurQuad.material.uniforms.index.value=c,this.poissonBlurQuad.material.uniforms.poissonDisk.value=this.samplesDenoise,this.poissonBlurQuad.material.uniforms.near.value=this.camera.near,this.poissonBlurQuad.material.uniforms.far.value=this.camera.far,this.poissonBlurQuad.material.uniforms.screenSpaceRadius.value=this.configuration.screenSpaceRadius,e.setRenderTarget(this.writeTargetInternal),this.poissonBlurQuad.render(e);e.setRenderTarget(this.accumulationRenderTarget);const u=e.autoClear;e.autoClear=!1,this.accumulationQuad.material.uniforms.tDiffuse.value=this.writeTargetInternal.texture,this.accumulationQuad.material.uniforms.frame.value=this.frame,this.accumulationQuad.render(e),e.autoClear=u}this.configuration.transparencyAware&&(this.effectCompositerQuad.material.uniforms.transparencyDWFalse.value=this.transparencyRenderTargetDWFalse.texture,this.effectCompositerQuad.material.uniforms.transparencyDWTrue.value=this.transparencyRenderTargetDWTrue.texture,this.effectCompositerQuad.material.uniforms.transparencyDWTrueDepth.value=this.transparencyRenderTargetDWTrue.depthTexture,this.effectCompositerQuad.material.uniforms.transparencyAware.value=!0),this.effectCompositerQuad.material.uniforms.sceneDiffuse.value=t.texture,this.effectCompositerQuad.material.uniforms.sceneDepth.value=this.depthTexture,this.effectCompositerQuad.material.uniforms.aoTones.value=this.configuration.aoTones,this.effectCompositerQuad.material.uniforms.near.value=this.camera.near,this.effectCompositerQuad.material.uniforms.far.value=this.camera.far,this.effectCompositerQuad.material.uniforms.projectionMatrixInv.value=this.camera.projectionMatrixInverse,this.effectCompositerQuad.material.uniforms.viewMatrixInv.value=this.camera.matrixWorld,this.effectCompositerQuad.material.uniforms.ortho.value=this.camera.isOrthographicCamera,this.effectCompositerQuad.material.uniforms.downsampledDepth.value=this.configuration.halfRes?this.depthDownsampleTarget.textures[0]:this.depthTexture,this.effectCompositerQuad.material.uniforms.resolution.value=this._r,this.effectCompositerQuad.material.uniforms.blueNoise.value=this.bluenoise,this.effectCompositerQuad.material.uniforms.intensity.value=this.configuration.intensity,this.effectCompositerQuad.material.uniforms.renderMode.value=this.configuration.renderMode,this.effectCompositerQuad.material.uniforms.screenSpaceRadius.value=this.configuration.screenSpaceRadius,this.effectCompositerQuad.material.uniforms.radius.value=l,this.effectCompositerQuad.material.uniforms.distanceFalloff.value=this.configuration.distanceFalloff,this.effectCompositerQuad.material.uniforms.gammaCorrection.value=this.autosetGamma?this.renderToScreen:this.configuration.gammaCorrection,this.effectCompositerQuad.material.uniforms.tDiffuse.value=this.accumulationRenderTarget.texture,this.effectCompositerQuad.material.uniforms.color.value=this._c.copy(this.configuration.color).convertSRGBToLinear(),this.effectCompositerQuad.material.uniforms.colorMultiply.value=this.configuration.colorMultiply,this.effectCompositerQuad.material.uniforms.cameraPos.value=this.camera.getWorldPosition(new U),this.effectCompositerQuad.material.uniforms.fog.value=!!this.scene.fog,this.scene.fog&&(this.scene.fog.isFog?(this.effectCompositerQuad.material.uniforms.fogExp.value=!1,this.effectCompositerQuad.material.uniforms.fogNear.value=this.scene.fog.near,this.effectCompositerQuad.material.uniforms.fogFar.value=this.scene.fog.far):this.scene.fog.isFogExp2?(this.effectCompositerQuad.material.uniforms.fogExp.value=!0,this.effectCompositerQuad.material.uniforms.fogDensity.value=this.scene.fog.density):console.error(`Unsupported fog type ${this.scene.fog.constructor.name} in SSAOPass.`)),e.setRenderTarget(this.outputTargetInternal),this.effectCompositerQuad.render(e),e.setRenderTarget(this.renderToScreen?null:i),this.copyQuad.material.uniforms.tDiffuse.value=this.outputTargetInternal.texture,this.copyQuad.render(e),this.debugMode&&(s.endQuery(o.TIME_ELAPSED_EXT),Ju(a,s,this)),e.xr.enabled=r}enableDebugMode(){this.debugMode=!0}disableDebugMode(){this.debugMode=!1}setDisplayMode(e){this.configuration.renderMode=["Combined","AO","No AO","Split","Split AO"].indexOf(e)}setQualityMode(e){e==="Performance"?(this.configuration.aoSamples=8,this.configuration.denoiseSamples=4,this.configuration.denoiseRadius=12):e==="Low"?(this.configuration.aoSamples=16,this.configuration.denoiseSamples=4,this.configuration.denoiseRadius=12):e==="Medium"?(this.configuration.aoSamples=16,this.configuration.denoiseSamples=8,this.configuration.denoiseRadius=12):e==="High"?(this.configuration.aoSamples=64,this.configuration.denoiseSamples=8,this.configuration.denoiseRadius=6):e==="Ultra"&&(this.configuration.aoSamples=64,this.configuration.denoiseSamples=16,this.configuration.denoiseRadius=6)}}const Ct={Default:1,Log:2,Reverse:3};class lx{constructor(e){if(this.animationId=null,this.handleContextLost=a=>{a.preventDefault(),console.error("WebGL context lost. Pausing rendering..."),this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null)},this.handleContextRestored=()=>{console.log("WebGL context restored. Resuming rendering..."),this.animationId===null&&this.animate()},this.animate=()=>{this.animationId=requestAnimationFrame(this.animate),this.controls.update(),this.composer.render()},this.handleResize=()=>{const a=window.innerWidth-320,l=window.innerHeight;this.camera.aspect=a/l,this.camera.updateProjectionMatrix(),this.setSafeSize(a,l)},!window.WebGLRenderingContext)throw new Error("WebGL is not supported by your browser");this.scene=new Xs,this.scene.background=new Fe(16777215),this.camera=new jt(45,(window.innerWidth-320)/window.innerHeight,.1,1e3),this.camera.position.set(15,15,15),this.camera.lookAt(0,0,0),this.renderer=new qu({antialias:!1,alpha:!1,powerPreference:"high-performance",stencil:!1,depth:!1}),this.renderer.toneMapping=vu,this.renderer.toneMappingExposure=1.5,this.renderer.outputColorSpace=Ke,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=pu,this.setSafeSize(window.innerWidth-320,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.appendChild(this.renderer.domElement),this.canvas=this.renderer.domElement,this.canvas.addEventListener("webglcontextlost",this.handleContextLost.bind(this)),this.canvas.addEventListener("webglcontextrestored",this.handleContextRestored.bind(this)),this.controls=new Fv(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.target.set(0,0,0),this.controls.update();const t=new Uv(16777215,1);t.position.set(-5,10,5),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.bias=-1e-4,t.shadow.radius=4,this.scene.add(t),this.generateEnvironment(),this.composer=new Wv(this.renderer);const i=new k0(this.scene,this.camera);this.composer.addPass(i);const r=new ox(this.scene,this.camera,window.innerWidth-320,window.innerHeight);r.configuration.aoRadius=3,r.configuration.intensity=7,this.composer.addPass(r);const s=new V0({luminanceThreshold:1,intensity:1,mipmapBlur:!0,levels:7}),o=new K0(this.camera,s);this.composer.addPass(o),window.addEventListener("resize",this.handleResize.bind(this)),this.animate()}generateEnvironment(){const e=new Mo(this.renderer);e.compileEquirectangularShader();const t=new Xs;t.background=new Fe("#444");const i=(u,c,h,f,p,v)=>{const x=new oi({color:new Fe(c),side:At});x.color.multiplyScalar(h);const m=new $e(u,x);m.position.set(...f),m.rotation.set(...p),m.scale.set(...v),t.add(m)},r=new yt(1,1),s=new zo(1,32),o=new Ho(.8,1,32);i(r,16777215,.75,[0,5,-9],[Math.PI/2,0,0],[10,10,1]),[2,0,2,0,2,0,2,0].forEach((u,c)=>{i(s,16777215,2,[u,4,c*4-10],[Math.PI/2,0,0],[3,1,1])}),i(r,16777215,4,[-5,1,-1],[0,Math.PI/2,0],[20,.1,1]),i(r,16777215,1,[-5,-1,-1],[0,Math.PI/2,0],[20,.5,1]),i(r,16777215,1,[10,1,0],[0,-Math.PI/2,0],[20,1,1]),i(o,"red",1,[-15,4,-18],[0,0,0],[10,10,1]);const l=e.fromScene(t).texture;this.scene.environment=l,e.dispose()}setSafeSize(e,t){const i=this.renderer.capabilities.maxTextureSize,r=Math.min(e,i),s=Math.min(t,i);this.renderer.setSize(r,s),this.composer&&this.composer.setSize(r,s),(e>i||t>i)&&console.warn(`Canvas size clamped from ${e}x${t} to ${r}x${s} (GPU limit: ${i})`)}getScene(){return this.scene}getCamera(){return this.camera}getRenderer(){return this.renderer}dispose(){this.animationId!==null&&cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.handleResize),this.canvas.removeEventListener("webglcontextlost",this.handleContextLost),this.canvas.removeEventListener("webglcontextrestored",this.handleContextRestored),this.controls.dispose(),this.composer.dispose(),this.scene.traverse(e=>{e instanceof $e&&(e.geometry.dispose(),e.material instanceof yn&&e.material.dispose())}),this.renderer.dispose()}}class To{static calculateRowSpecs(e,t,i){const r=t+i,s=Math.floor(e/r),o=r/e,a=s*t+(s-1)*i;return{rowHeight:r,totalRows:s,completionPerRow:o,actualWallHeight:a}}static getVisibleRows(e,t){const i=Math.max(0,Math.min(1,t));return Math.floor(e*i)}static getCompletedHeight(e,t,i,r){const s=this.getVisibleRows(e.totalRows,t);return s===0?0:s*i+(s-1)*r}static getRowCompletionPercentage(e,t){return t===0?0:(e+1)/t}static createRow(e,t,i,r,s,o){const a=new Ri,l=t/2,u=Math.round(t/(r+o)),c=e.createBlockGeometry(r,s,i,o),h=[e.getBrickMaterial(),e.getCementMaterial()];for(let _=0;_<u;_++){const T=_*(r+o)-l+r/2,E=new $e(c,h);E.position.set(T,o/2,0),E.castShadow=!0,E.receiveShadow=!0,a.add(E)}const f=new yt(i,s),p=new yt(i,o),v=0,x=s/2+o/2,m=new $e(f,h[0]);m.rotation.y=-Math.PI/2,m.position.set(-l,v,0),m.castShadow=!0,m.receiveShadow=!0,m.name="LeftBrickCap",a.add(m);const d=new $e(p,h[1]);d.rotation.y=-Math.PI/2,d.position.set(-l,x,0),d.castShadow=!0,d.receiveShadow=!0,d.name="LeftCementCap",a.add(d);const y=u*(r+o)-l,g=new $e(f,h[0]);g.rotation.y=Math.PI/2,g.position.set(y,v,0),g.castShadow=!0,g.receiveShadow=!0,g.name="RightBrickCap",a.add(g);const S=new $e(p,h[1]);return S.rotation.y=Math.PI/2,S.position.set(y,x,0),S.castShadow=!0,S.receiveShadow=!0,S.name="RightCementCap",a.add(S),a}}class bo{static setWireframeMode(e,t){e.traverse(i=>{i instanceof $e&&i.material&&(Array.isArray(i.material)?i.material.forEach(r=>{r instanceof yn&&(r.wireframe=t)}):i.material instanceof yn&&(i.material.wireframe=t))}),t?e.background=new Fe(16777215):e.background=new Fe(16119285)}static setBackgroundColor(e,t){e.background=new Fe(t)}static getMeshCount(e){let t=0;return e.traverse(i=>{i instanceof $e&&t++}),t}static getObjectsByType(e,t){const i=[];return e.traverse(r=>{r instanceof t&&i.push(r)}),i}static createFloor(e,t,i=0){const r=new yt(e,t),s=new Ku,o="/textures/floor/",a=s.load(o+"DefaultMaterial_baseColor.png"),l=s.load(o+"DefaultMaterial_normal.png"),u=s.load(o+"DefaultMaterial_occlusionRoughnessMetallic.png");[a,l,u].forEach(f=>{f.wrapS=Wn,f.wrapT=Wn,f.repeat.set(4,4),f.colorSpace=Ke}),l.colorSpace=Jt,u.colorSpace=Jt;const c=new lr({map:a,normalMap:l,roughnessMap:u,metalnessMap:u,aoMap:u,roughness:1,metalness:1,color:16777215,side:At}),h=new $e(r,c);return h.rotation.x=-Math.PI/2,h.position.y=i,h.receiveShadow=!0,h}static createViewModeVisualization(e,t,i){const r=new Ri;switch(r.name=`ViewMode_${e}`,e){case"block":const s=t.createBlockGeometry(i.blockWidth,i.blockHeight,i.wallLength,i.cementThickness),o=[t.getBrickMaterial(),t.getCementMaterial()],a=new $e(s,o);a.castShadow=!0,a.receiveShadow=!0,a.name="SingleBlock",r.add(a);break;case"row":const l=i.actualWallWidth||i.blockWidth*8+i.cementThickness*7,u=To.createRow(t,l,i.wallLength,i.blockWidth,i.blockHeight,i.cementThickness);u.name="SingleRow",r.add(u);break;case"wall":r.name="ViewMode_wall_placeholder";break}return r}}class cx{constructor(e,t){this.openings=[],this.visualizationMode="red";const i=document.getElementById(e);if(!i)throw new Error(`Container with id "${e}" not found`);this.container=i,this.onUpdate=t,this.createVisualizationControl()}createVisualizationControl(){const e=document.createElement("div");e.className="control-group visualization-control",e.style.marginBottom="15px",e.style.padding="10px",e.style.backgroundColor="#f5f5f5",e.style.borderRadius="4px";const t=document.createElement("label");t.textContent="Opening Visualization: ",t.style.marginRight="10px",e.appendChild(t);const i=document.createElement("select");[{value:"red",text:"Red Placeholder"},{value:"wireframe",text:"Wireframe"},{value:"none",text:"None"}].forEach(s=>{const o=document.createElement("option");o.value=s.value,o.textContent=s.text,s.value===this.visualizationMode&&(o.selected=!0),i.appendChild(o)}),i.addEventListener("change",()=>{this.visualizationMode=i.value,this.onUpdate(this.openings)}),e.appendChild(i),this.container.insertBefore(e,this.container.firstChild)}getVisualizationMode(){return this.visualizationMode}addOpening(e){const i={id:`opening-${Date.now()}`,x:(e==null?void 0:e.x)??0,y:(e==null?void 0:e.y)??0,z:(e==null?void 0:e.z)??0,width:(e==null?void 0:e.width)??1,height:(e==null?void 0:e.height)??1,length:(e==null?void 0:e.length)??1};this.openings.push(i),this.renderOpening(i),this.onUpdate(this.openings)}renderOpening(e){const t=document.createElement("div");t.className="subsection opening-subsection",t.id=e.id;const i=document.createElement("div");i.className="subsection-title",i.textContent=`Opening ${this.openings.indexOf(e)+1}`;const r=document.createElement("span");r.className="remove-opening",r.textContent="×",r.title="Remove Opening",r.onclick=s=>{s.stopPropagation(),this.removeOpening(e.id)},i.appendChild(r),t.appendChild(i),this.createInputGroup(t,e,"x","x (Position)",.1),this.createInputGroup(t,e,"y","y (Position)",.1),this.createInputGroup(t,e,"z","z (Position)",.1),this.createInputGroup(t,e,"width","w (Width)",.1,.1),this.createInputGroup(t,e,"height","h (Height)",.1,.1),this.createInputGroup(t,e,"length","l (Length)",.1,.1),this.container.appendChild(t)}createInputGroup(e,t,i,r,s,o){const a=document.createElement("div");a.className="control-group";const l=document.createElement("label");l.textContent=r,a.appendChild(l);const u=document.createElement("input");u.type="number",u.step=s.toString(),u.value=t[i].toString(),o!==void 0&&(u.min=o.toString()),u.addEventListener("input",()=>{t[i]=parseFloat(u.value)||0,this.onUpdate(this.openings)}),a.appendChild(u),e.appendChild(a)}removeOpening(e){const t=this.openings.findIndex(i=>i.id===e);if(t!==-1){this.openings.splice(t,1);const i=document.getElementById(e);i&&i.remove(),this.updateTitles(),this.onUpdate(this.openings)}}updateTitles(){this.openings.forEach((e,t)=>{const i=document.getElementById(e.id);if(i){const r=i.querySelector(".subsection-title");if(r){const s=r.querySelector(".remove-opening");r.textContent=`Opening ${t+1}`,s&&r.appendChild(s)}}})}getOpenings(){return this.openings}clearAll(){this.openings.forEach(e=>{const t=document.getElementById(e.id);t&&t.remove()}),this.openings=[],this.onUpdate(this.openings)}}function fr(n,e,t){return{parent:null,position:{x:n,y:e,z:t},direction:{yaw:0}}}function ux(){return[]}function hx(n=3){const t=-n/2+1.05;return[{placement:fr(0,t,0),size:{l:.9,w:1,h:2.1}}]}function fx(){return[{placement:fr(0,0,0),size:{l:1.2,w:1,h:1}}]}function dx(n=3){const t=n/2-.5;return[{placement:fr(0,t,0),size:{l:1,w:1,h:1}}]}function px(n=3){const t=-n/2+1.05;return[{placement:fr(-1.2,t,0),size:{l:.9,w:1,h:2.1}},{placement:fr(.5,0,0),size:{l:1,w:1,h:1}},{placement:fr(1.35,n/2-.65,0),size:{l:.8,w:1,h:1}}]}function mx(n,e=3){switch(n){case 1:return{name:"Test 1: No Openings",description:"Simple wall without doors or windows",openings:ux()};case 2:return{name:"Test 2: Door",description:"Wall with standard door (0.9m × 2.1m) at ground level",openings:hx(e)};case 3:return{name:"Test 3: Window at Center",description:"Wall with window in center (requires lintel)",openings:fx()};case 4:return{name:"Test 4: Window at Top",description:"Wall with window touching top (no lintel needed)",openings:dx(e)};case 5:return{name:"Test 5: Multiple Openings",description:"1 door + 2 windows (complex scenario)",openings:px(e)};default:return{name:"Unknown Test",description:"",openings:[]}}}class gx{constructor(e,t){this.defaults={blockWidth:.39,blockHeight:.14,cementThickness:.02,wallWidth:4,wallHeight:3,wallLength:.2,positionX:0,positionY:1.5,positionZ:0,yawDegrees:0,completionPercentage:100},this.onUpdate=e,this.openingUI=new cx("openings-container",i=>{console.log("Openings updated:",i),this.onUpdate()}),this.wireframeToggle=document.getElementById("wireframe-toggle"),this.labelWireframe=document.getElementById("label-wireframe"),this.placeholderToggle=document.getElementById("placeholder-toggle"),this.labelPlaceholder=document.getElementById("label-placeholder"),this.actualWallToggle=document.getElementById("actual-wall-toggle"),this.labelActualWall=document.getElementById("label-actual-wall"),this.blockWidthInput=document.getElementById("block-width"),this.blockHeightInput=document.getElementById("block-height"),this.cementThicknessInput=document.getElementById("cement-thickness"),this.wallWidthInput=document.getElementById("wall-width"),this.wallHeightInput=document.getElementById("wall-height"),this.wallLengthInput=document.getElementById("wall-length"),this.positionXInput=document.getElementById("position-x"),this.positionYInput=document.getElementById("position-y"),this.positionZInput=document.getElementById("position-z"),this.rotationYawInput=document.getElementById("rotation-yaw"),this.completionInput=document.getElementById("completion"),this.testButtons=document.querySelectorAll(".test-button"),this.testDescription=document.getElementById("test-description"),this.wallParamsTitle=document.getElementById("wall-params-title"),this.addOpeningBtn=document.getElementById("add-opening-btn"),this.viewModeSelect=document.getElementById("view-mode-select"),this.attachListeners(t)}attachListeners(e){this.wireframeToggle&&this.wireframeToggle.addEventListener("change",()=>{const i=this.wireframeToggle.checked;bo.setWireframeMode(e,i),this.labelWireframe&&(i?(this.labelWireframe.style.fontWeight="bold",this.labelWireframe.style.color="#333"):(this.labelWireframe.style.fontWeight="normal",this.labelWireframe.style.color="#666"))}),this.placeholderToggle&&this.placeholderToggle.addEventListener("change",()=>{const i=this.placeholderToggle.checked;this.labelPlaceholder&&(i?(this.labelPlaceholder.style.fontWeight="bold",this.labelPlaceholder.style.color="#333"):(this.labelPlaceholder.style.fontWeight="normal",this.labelPlaceholder.style.color="#666")),this.onUpdate()}),this.actualWallToggle&&this.actualWallToggle.addEventListener("change",()=>{const i=this.actualWallToggle.checked;this.labelActualWall&&(i?(this.labelActualWall.style.fontWeight="bold",this.labelActualWall.style.color="#333"):(this.labelActualWall.style.fontWeight="normal",this.labelActualWall.style.color="#666")),this.onUpdate()}),[this.blockWidthInput,this.blockHeightInput,this.cementThicknessInput,this.wallWidthInput,this.wallHeightInput,this.wallLengthInput,this.positionXInput,this.positionYInput,this.positionZInput,this.rotationYawInput,this.completionInput].forEach(i=>{i==null||i.addEventListener("input",()=>this.onUpdate())}),this.addOpeningBtn&&this.addOpeningBtn.addEventListener("click",()=>{this.openingUI.addOpening()}),this.wallParamsTitle&&this.wallParamsTitle.addEventListener("click",()=>{const i=this.wallParamsTitle.closest(".control-section");i&&i.classList.toggle("collapsed")}),this.testButtons.forEach(i=>{i.addEventListener("click",()=>{const r=i.getAttribute("data-test");r==="clear"?this.clearTest():r&&this.loadTestScenario(parseInt(r))})}),this.viewModeSelect&&this.viewModeSelect.addEventListener("change",()=>{this.onUpdate()})}setActiveTestButton(e){this.testButtons.forEach(t=>{const i=t,r=i.getAttribute("data-test");r&&r!=="clear"&&(parseInt(r)===e?i.classList.add("active"):i.classList.remove("active"))})}loadTestScenario(e){var r;const t=parseFloat(((r=this.wallHeightInput)==null?void 0:r.value)||"0")||this.defaults.wallHeight,i=mx(e,t);this.testDescription&&(this.testDescription.innerHTML=`<strong>${i.name}</strong><br>${i.description}`),this.openingUI.clearAll(),i.openings.forEach(s=>{this.openingUI.addOpening({x:s.placement.position.x,y:s.placement.position.y,z:s.placement.position.z,width:s.size.l,height:s.size.h,length:s.size.w})}),this.setActiveTestButton(e),this.onUpdate()}clearTest(){this.openingUI.clearAll(),this.setActiveTestButton(null),this.testDescription&&(this.testDescription.innerHTML=""),this.onUpdate()}getWallParams(){var t,i,r,s,o,a,l,u,c,h,f;const e={blockWidth:parseFloat(((t=this.blockWidthInput)==null?void 0:t.value)||"0")||this.defaults.blockWidth,blockHeight:parseFloat(((i=this.blockHeightInput)==null?void 0:i.value)||"0")||this.defaults.blockHeight,cementThickness:parseFloat(((r=this.cementThicknessInput)==null?void 0:r.value)||"0")||this.defaults.cementThickness,wallWidth:parseFloat(((s=this.wallWidthInput)==null?void 0:s.value)||"0")||this.defaults.wallWidth,wallHeight:parseFloat(((o=this.wallHeightInput)==null?void 0:o.value)||"0")||this.defaults.wallHeight,wallLength:parseFloat(((a=this.wallLengthInput)==null?void 0:a.value)||"0")||this.defaults.wallLength,positionX:parseFloat(((l=this.positionXInput)==null?void 0:l.value)||"0")||this.defaults.positionX,positionY:parseFloat(((u=this.positionYInput)==null?void 0:u.value)||"0")||this.defaults.positionY,positionZ:parseFloat(((c=this.positionZInput)==null?void 0:c.value)||"0")||this.defaults.positionZ,yawDegrees:parseFloat(((h=this.rotationYawInput)==null?void 0:h.value)||"0")||this.defaults.yawDegrees,completionPercentage:parseFloat(((f=this.completionInput)==null?void 0:f.value)||"0")||this.defaults.completionPercentage};return console.log("UIController Params:",e),e}getOpenings(){return this.openingUI.getOpenings()}getVisualizationMode(){return this.openingUI.getVisualizationMode()}getShowPlaceholder(){return this.placeholderToggle?this.placeholderToggle.checked:!0}getShowActualWall(){return this.actualWallToggle?this.actualWallToggle.checked:!1}getViewMode(){var e;return((e=this.viewModeSelect)==null?void 0:e.value)||"wall"}}function vx(n){return n*(Math.PI/180)}function xx(n,e,t){n.position.set(e.x,e.y,e.z),n.rotation.set(0,0,0),n.rotation.y=vx(t)}class kn{constructor(){this.infillMaterial=null,this.lintelMaterial=null,this.brickMaterial=null,this.cementMaterial=null,this.baseColorTexture=null,this.normalTexture=null,this.ormTexture=null,this.textureLoader=new Ku}static getInstance(){return kn.instance||(kn.instance=new kn),kn.instance}getInfillMaterial(){return this.infillMaterial||(this.infillMaterial=new lr({color:5592405,roughness:.9,metalness:.1})),this.infillMaterial}getLintelMaterial(){return this.lintelMaterial||(this.lintelMaterial=new lr({color:15066597,roughness:.8,metalness:.1})),this.lintelMaterial}getBrickMaterial(){return this.brickMaterial||(this.baseColorTexture||(this.baseColorTexture=this.textureLoader.load("/textures/masonry/brick_baseColor.png"),this.normalTexture=this.textureLoader.load("/textures/masonry/brick_normal.png"),this.ormTexture=this.textureLoader.load("/textures/masonry/brick_occlusionRoughnessMetallic.png"),[this.baseColorTexture,this.normalTexture,this.ormTexture].forEach(e=>{e&&(e.wrapS=Wn,e.wrapT=Wn,e.repeat.set(1,1))})),this.brickMaterial=new lr({map:this.baseColorTexture,normalMap:this.normalTexture,aoMap:this.ormTexture,roughnessMap:this.ormTexture,metalnessMap:this.ormTexture,roughness:.8,metalness:.2})),this.brickMaterial}getCementMaterial(){return this.cementMaterial||(this.cementMaterial=new lr({color:13421772,roughness:.9,metalness:.1})),this.cementMaterial}dispose(){this.infillMaterial&&(this.infillMaterial.dispose(),this.infillMaterial=null),this.lintelMaterial&&(this.lintelMaterial.dispose(),this.lintelMaterial=null),this.brickMaterial&&(this.brickMaterial.dispose(),this.brickMaterial=null),this.cementMaterial&&(this.cementMaterial.dispose(),this.cementMaterial=null),this.baseColorTexture&&(this.baseColorTexture.dispose(),this.baseColorTexture=null),this.normalTexture&&(this.normalTexture.dispose(),this.normalTexture=null),this.ormTexture&&(this.ormTexture.dispose(),this.ormTexture=null)}}function Sx(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new $t;let u=0;for(let c=0;c<n.length;++c){const h=n[c];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(h.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(h.morphAttributes[p])}if(e){let p;if(t)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(u,p,c),u+=p}}if(t){let c=0;const h=[];for(let f=0;f<n.length;++f){const p=n[f].index;for(let v=0;v<p.count;++v)h.push(p.getX(v)+c);c+=n[f].attributes.position.count}l.setIndex(h)}for(const c in s){const h=Lc(s[c]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,h)}for(const c in o){const h=o[c][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let f=0;f<h;++f){const p=[];for(let x=0;x<o[c].length;++x)p.push(o[c][x][f]);const v=Lc(p);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(v)}}return l}function Lc(n){let e,t,i,r=-1,s=0;for(let u=0;u<n.length;++u){const c=n[u];if(c.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=c.array.constructor),e!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=c.itemSize),t!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=c.normalized),i!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=c.gpuType),r!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=c.array.length}const o=new e(s);let a=0;for(let u=0;u<n.length;++u)o.set(n[u].array,a),a+=n[u].array.length;const l=new ht(o,t,i);return r!==void 0&&(l.gpuType=r),l}function yx(n,e=1e-4){e=Math.max(e,Number.EPSILON);const t={},i=n.getIndex(),r=n.getAttribute("position"),s=i?i.count:r.count;let o=0;const a=Object.keys(n.attributes),l={},u={},c=[],h=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let y=0,g=a.length;y<g;y++){const S=a[y],_=n.attributes[S];l[S]=new ht(new _.array.constructor(_.count*_.itemSize),_.itemSize,_.normalized);const T=n.morphAttributes[S];T&&(u[S]=new ht(new T.array.constructor(T.count*T.itemSize),T.itemSize,T.normalized))}const p=e*.5,v=Math.log10(1/e),x=Math.pow(10,v),m=p*x;for(let y=0;y<s;y++){const g=i?i.getX(y):y;let S="";for(let _=0,T=a.length;_<T;_++){const E=a[_],P=n.getAttribute(E),M=P.itemSize;for(let b=0;b<M;b++)S+=`${~~(P[h[b]](g)*x+m)},`}if(S in t)c.push(t[S]);else{for(let _=0,T=a.length;_<T;_++){const E=a[_],P=n.getAttribute(E),M=n.morphAttributes[E],b=P.itemSize,I=l[E],L=u[E];for(let O=0;O<b;O++){const C=h[O],B=f[O];if(I[B](o,P[C](g)),M)for(let N=0,k=M.length;N<k;N++)L[N][B](o,M[N][C](g))}}t[S]=o,c.push(o),o++}}const d=n.clone();for(const y in n.attributes){const g=l[y];if(d.setAttribute(y,new ht(g.array.slice(0,o*g.itemSize),g.itemSize,g.normalized)),y in u)for(let S=0;S<u[y].length;S++){const _=u[y][S];d.morphAttributes[y][S]=new ht(_.array.slice(0,o*_.itemSize),_.itemSize,_.normalized)}}return d.setIndex(c),d}class $u{constructor(){}createBlockGeometry(e,t,i,r=0){const s=e/2,o=i/2,l=(t+r)/2,u=t/2,c=-l,h=-l+t,f=l,p=s,v=[],x=new yt(e,t);x.translate(0,c+u,o),v.push(x);const m=new yt(e,t);m.rotateY(Math.PI),m.translate(0,c+u,-o),v.push(m);const d=new yt(e,i);d.rotateX(Math.PI/2),d.translate(0,c,0),v.push(d);const y=[];if(r>0){const E=new yt(e,r);E.translate(0,h+r/2,o),y.push(E);const P=new yt(e,r);P.rotateY(Math.PI),P.translate(0,h+r/2,-o),y.push(P);const M=new yt(e,i);M.rotateX(-Math.PI/2),M.translate(0,f,0),y.push(M);const b=new yt(r,t);b.translate(p+r/2,c+u,o),y.push(b);const I=new yt(r,t);I.rotateY(Math.PI),I.translate(p+r/2,c+u,-o),y.push(I);const L=new yt(r,r);L.translate(p+r/2,h+r/2,o),y.push(L);const O=new yt(r,r);O.rotateY(Math.PI),O.translate(p+r/2,h+r/2,-o),y.push(O);const C=new yt(r,i);C.rotateX(-Math.PI/2),C.translate(p+r/2,f,0),y.push(C)}[...v,...y].forEach(E=>{E.attributes.uv2||E.setAttribute("uv2",E.attributes.uv)});const g=v.reduce((E,P)=>{var M;return E+(((M=P.index)==null?void 0:M.count)||0)},0),S=y.reduce((E,P)=>{var M;return E+(((M=P.index)==null?void 0:M.count)||0)},0),_=Sx([...v,...y]);if(!_)throw new Error("Failed to merge block geometries");const T=yx(_);return T.clearGroups(),T.addGroup(0,g,0),T.addGroup(g,S,1),T}getBrickMaterial(){return kn.getInstance().getBrickMaterial()}getCementMaterial(){return kn.getInstance().getCementMaterial()}dispose(){}}const Mx=Object.freeze(Object.defineProperty({__proto__:null,BlockGenerator:$u},Symbol.toStringTag,{value:"Module"}));class _x{constructor(){this.scene=null,this.wallGroup=null,this.blockGenerator=new $u}createWall(e,t,i,r,s,o,a,l=0,u=0,c=0,h=0,f=1){this.scene=a,this.clearWall(),this.wallGroup=this.generateWallGroup(e,t,i,r,s,o,l,u,c,h,f),this.scene.add(this.wallGroup)}generateWallGroup(e,t,i,r,s,o,a=0,l=0,u=0,c=0,h=1){const f=new Ri;this.wallGroup=f;const p=Math.floor(e/(r+o)),v=Math.floor(t/(s+o)),x=To.getVisibleRows(v,h);console.log("WallManager:",{wallWidth:e,wallHeight:t,blockHeight:s,cementThickness:o,blocksVertical:v,completion:h,rowsToShow:x});const m=p>0?p*r+(p-1)*o:0,d=x>0?x*s+(x-1)*o:0,y=[];for(let P=0;P<x;P++){const M=-t/2+P*(s+o)+s/2;To.createRow(this.blockGenerator,m,i,r,s,o).children.forEach(I=>{if(I instanceof $e){const L=I.geometry.clone();I.updateMatrix(),L.applyMatrix4(I.matrix),L.translate(0,M,0),y.push(L)}})}const g=y.filter(P=>P.attributes.position&&P.attributes.position.count>0),S=new $t;if(g.length>0){const P=[],M=[],b=[],I=[],L=[],O=[];let C=0;g.forEach(N=>{var ie,Y;const k=N.attributes.position,q=N.attributes.normal,K=N.attributes.uv,j=N.attributes.uv2;for(let Z=0;Z<k.count;Z++)P.push(k.getX(Z),k.getY(Z),k.getZ(Z)),M.push(q.getX(Z),q.getY(Z),q.getZ(Z)),b.push(K.getX(Z),K.getY(Z)),j?I.push(j.getX(Z),j.getY(Z)):I.push(K.getX(Z),K.getY(Z));const ee=N.index;if(ee){const Z=ee.array,ae=N.groups;if(ae.length===0)for(let de=0;de<ee.count;de++)L.push(Z[de]+C);else ae.forEach(de=>{const ge=de.start,Re=de.count,_e=de.materialIndex===0?L:O;for(let Ue=ge;Ue<ge+Re;Ue++)_e.push(Z[Ue]+C)})}C+=k.count,g.indexOf(N)<3&&console.log(`Row ${g.indexOf(N)}:`,{vertices:k.count,groups:N.groups.length,blockIndices:((ie=N.groups.find(Z=>Z.materialIndex===0))==null?void 0:ie.count)||0,cementIndices:((Y=N.groups.find(Z=>Z.materialIndex===1))==null?void 0:Y.count)||0})}),console.log("Final Merge Stats:",{totalVertices:P.length/3,totalBlockIndices:L.length,totalCementIndices:O.length,vertexOffset:C}),S.setAttribute("position",new Dt(P,3)),S.setAttribute("normal",new Dt(M,3)),S.setAttribute("uv",new Dt(b,2)),S.setAttribute("uv2",new Dt(I,2));const B=[...L,...O];S.setIndex(B),S.addGroup(0,L.length,0),S.addGroup(L.length,O.length,1)}const _=this.blockGenerator.getBrickMaterial(),T=this.blockGenerator.getCementMaterial(),E=new $e(S,[_,T]);return E.castShadow=!0,E.receiveShadow=!0,E.name="WallMesh",f.add(E),xx(f,{x:a,y:l,z:u},c),f.userData.actualWallWidth=m,f.userData.actualWallHeight=d,f}addWallCaps(e,t,i,r,s){const o=-s/2,a=o+i,l=new yt(t,r);l.attributes.uv2||l.setAttribute("uv2",l.attributes.uv),l.rotateX(-Math.PI/2),l.translate(0,a,-r/2),e.push(l);const u=new yt(t,r);u.attributes.uv2||u.setAttribute("uv2",u.attributes.uv),u.rotateX(Math.PI/2),u.translate(0,o,-r/2),e.push(u)}updateWall(e,t,i,r,s,o,a=0,l=0,u=0,c=0,h=1){this.scene&&this.createWall(e,t,i,r,s,o,this.scene,a,l,u,c,h)}clearWall(){this.scene&&this.wallGroup&&(this.scene.remove(this.wallGroup),this.wallGroup.traverse(e=>{e instanceof $e&&e.geometry.dispose()}),this.wallGroup=null)}dispose(){this.clearWall(),this.blockGenerator.dispose()}}class Ex{constructor(){this.material=new oi({color:16711680})}createOpeningMesh(e){const{size:t,placement:i}=e,r=new Mn(t.l,t.h,t.w);new $e(r,this.material);const s=new Mn(e.size.l,e.size.h,e.size.w);s.attributes.uv2||s.setAttribute("uv2",s.attributes.uv.clone());const o=s.toNonIndexed(),a=new $e(o,this.material);return a.position.set(i.position.x,i.position.y,i.position.z),a}dispose(){this.material.dispose()}}class Tx{constructor(){}createTopInfill(e,t,i,r,s){const o=Math.floor(t/(r+s)),a=o*r+(o-1)*s,l=t-a;if(l<=0)return null;const u=new Mn(e,l,i),c=new $e(u,kn.getInstance().getInfillMaterial());return c.position.set(0,t/2-l/2,0),c.castShadow=!0,c.receiveShadow=!0,c.name="TopInfill",console.log(`Added top infill: height=${l.toFixed(3)}m at y=${c.position.y.toFixed(3)}`),c}dispose(){}}class bx{constructor(){}createLintel(e,t,i,r,s,o){const a=e.size.h,l=e.size.l,c=e.placement.position.y+a/2,h=t/2,f=-t/2+o;if(c>=h-.001||f<=c)return null;const p=r/2,v=l+s,x=i,m=new Mn(v,p,x);m.attributes.uv2||m.setAttribute("uv2",m.attributes.uv);const d=new $e(m,kn.getInstance().getLintelMaterial()),y=c+p/2;return d.position.set(e.placement.position.x,y,e.placement.position.z),d.castShadow=!0,d.receiveShadow=!0,d.name="Lintel",d}dispose(){}}const eh=0,wx=1,Ax=2,Ic=2,Va=1.25,Uc=1,Ur=6*4+4+4,na=65535,Rx=Math.pow(2,-24),ka=Symbol("SKIP_GENERATION");function Cx(n){return n.index?n.index.count:n.attributes.position.count}function ui(n){return Cx(n)/3}function Px(n,e=ArrayBuffer){return n>65535?new Uint32Array(new e(4*n)):new Uint16Array(new e(2*n))}function Dx(n,e){if(!n.index){const t=n.attributes.position.count,i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=Px(t,i);n.setIndex(new ht(r,1));for(let s=0;s<t;s++)r[s]=s}}function th(n,e){const t=ui(n),i=e||n.drawRange,r=i.start/3,s=(i.start+i.count)/3,o=Math.max(0,r),a=Math.min(t,s)-o;return[{offset:Math.floor(o),count:Math.floor(a)}]}function nh(n,e){if(!n.groups||!n.groups.length)return th(n,e);const t=[],i=new Set,r=e||n.drawRange,s=r.start/3,o=(r.start+r.count)/3;for(const l of n.groups){const u=l.start/3,c=(l.start+l.count)/3;i.add(Math.max(s,u)),i.add(Math.min(o,c))}const a=Array.from(i.values()).sort((l,u)=>l-u);for(let l=0;l<a.length-1;l++){const u=a[l],c=a[l+1];t.push({offset:Math.floor(u),count:Math.floor(c-u)})}return t}function Lx(n,e){const t=ui(n),i=nh(n,e).sort((o,a)=>o.offset-a.offset),r=i[i.length-1];r.count=Math.min(t-r.offset,r.count);let s=0;return i.forEach(({count:o})=>s+=o),t!==s}function Wa(n,e,t,i,r){let s=1/0,o=1/0,a=1/0,l=-1/0,u=-1/0,c=-1/0,h=1/0,f=1/0,p=1/0,v=-1/0,x=-1/0,m=-1/0;for(let d=e*6,y=(e+t)*6;d<y;d+=6){const g=n[d+0],S=n[d+1],_=g-S,T=g+S;_<s&&(s=_),T>l&&(l=T),g<h&&(h=g),g>v&&(v=g);const E=n[d+2],P=n[d+3],M=E-P,b=E+P;M<o&&(o=M),b>u&&(u=b),E<f&&(f=E),E>x&&(x=E);const I=n[d+4],L=n[d+5],O=I-L,C=I+L;O<a&&(a=O),C>c&&(c=C),I<p&&(p=I),I>m&&(m=I)}i[0]=s,i[1]=o,i[2]=a,i[3]=l,i[4]=u,i[5]=c,r[0]=h,r[1]=f,r[2]=p,r[3]=v,r[4]=x,r[5]=m}function Ix(n,e=null,t=null,i=null){const r=n.attributes.position,s=n.index?n.index.array:null,o=ui(n),a=r.normalized;let l;e===null?l=new Float32Array(o*6):l=e,t=t||0,i=i||o;const u=r.array,c=r.offset||0;let h=3;r.isInterleavedBufferAttribute&&(h=r.data.stride);const f=["getX","getY","getZ"];for(let p=t;p<t+i;p++){const v=p*3,x=p*6;let m=v+0,d=v+1,y=v+2;s&&(m=s[m],d=s[d],y=s[y]),a||(m=m*h+c,d=d*h+c,y=y*h+c);for(let g=0;g<3;g++){let S,_,T;a?(S=r[f[g]](m),_=r[f[g]](d),T=r[f[g]](y)):(S=u[m+g],_=u[d+g],T=u[y+g]);let E=S;_<E&&(E=_),T<E&&(E=T);let P=S;_>P&&(P=_),T>P&&(P=T);const M=(P-E)/2,b=g*2;l[x+b+0]=E+M,l[x+b+1]=M+(Math.abs(E)+M)*Rx}}return l}function pt(n,e,t){return t.min.x=e[n],t.min.y=e[n+1],t.min.z=e[n+2],t.max.x=e[n+3],t.max.y=e[n+4],t.max.z=e[n+5],t}function Nc(n){let e=-1,t=-1/0;for(let i=0;i<3;i++){const r=n[i+3]-n[i];r>t&&(t=r,e=i)}return e}function Fc(n,e){e.set(n)}function Bc(n,e,t){let i,r;for(let s=0;s<3;s++){const o=s+3;i=n[s],r=e[s],t[s]=i<r?i:r,i=n[o],r=e[o],t[o]=i>r?i:r}}function ps(n,e,t){for(let i=0;i<3;i++){const r=e[n+2*i],s=e[n+2*i+1],o=r-s,a=r+s;o<t[i]&&(t[i]=o),a>t[i+3]&&(t[i+3]=a)}}function Er(n){const e=n[3]-n[0],t=n[4]-n[1],i=n[5]-n[2];return 2*(e*t+t*i+i*e)}const On=32,Ux=(n,e)=>n.candidate-e.candidate,Jn=new Array(On).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),ms=new Float32Array(6);function Nx(n,e,t,i,r,s){let o=-1,a=0;if(s===eh)o=Nc(e),o!==-1&&(a=(e[o]+e[o+3])/2);else if(s===wx)o=Nc(n),o!==-1&&(a=Fx(t,i,r,o));else if(s===Ax){const l=Er(n);let u=Va*r;const c=i*6,h=(i+r)*6;for(let f=0;f<3;f++){const p=e[f],m=(e[f+3]-p)/On;if(r<On/4){const d=[...Jn];d.length=r;let y=0;for(let S=c;S<h;S+=6,y++){const _=d[y];_.candidate=t[S+2*f],_.count=0;const{bounds:T,leftCacheBounds:E,rightCacheBounds:P}=_;for(let M=0;M<3;M++)P[M]=1/0,P[M+3]=-1/0,E[M]=1/0,E[M+3]=-1/0,T[M]=1/0,T[M+3]=-1/0;ps(S,t,T)}d.sort(Ux);let g=r;for(let S=0;S<g;S++){const _=d[S];for(;S+1<g&&d[S+1].candidate===_.candidate;)d.splice(S+1,1),g--}for(let S=c;S<h;S+=6){const _=t[S+2*f];for(let T=0;T<g;T++){const E=d[T];_>=E.candidate?ps(S,t,E.rightCacheBounds):(ps(S,t,E.leftCacheBounds),E.count++)}}for(let S=0;S<g;S++){const _=d[S],T=_.count,E=r-_.count,P=_.leftCacheBounds,M=_.rightCacheBounds;let b=0;T!==0&&(b=Er(P)/l);let I=0;E!==0&&(I=Er(M)/l);const L=Uc+Va*(b*T+I*E);L<u&&(o=f,u=L,a=_.candidate)}}else{for(let g=0;g<On;g++){const S=Jn[g];S.count=0,S.candidate=p+m+g*m;const _=S.bounds;for(let T=0;T<3;T++)_[T]=1/0,_[T+3]=-1/0}for(let g=c;g<h;g+=6){let T=~~((t[g+2*f]-p)/m);T>=On&&(T=On-1);const E=Jn[T];E.count++,ps(g,t,E.bounds)}const d=Jn[On-1];Fc(d.bounds,d.rightCacheBounds);for(let g=On-2;g>=0;g--){const S=Jn[g],_=Jn[g+1];Bc(S.bounds,_.rightCacheBounds,S.rightCacheBounds)}let y=0;for(let g=0;g<On-1;g++){const S=Jn[g],_=S.count,T=S.bounds,P=Jn[g+1].rightCacheBounds;_!==0&&(y===0?Fc(T,ms):Bc(T,ms,ms)),y+=_;let M=0,b=0;y!==0&&(M=Er(ms)/l);const I=r-y;I!==0&&(b=Er(P)/l);const L=Uc+Va*(M*y+b*I);L<u&&(o=f,u=L,a=S.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${s} used.`);return{axis:o,pos:a}}function Fx(n,e,t,i){let r=0;for(let s=e,o=e+t;s<o;s++)r+=n[s*6+i*2];return r/t}class Xa{constructor(){this.boundingData=new Float32Array(6)}}function Bx(n,e,t,i,r,s){let o=i,a=i+r-1;const l=s.pos,u=s.axis*2;for(;;){for(;o<=a&&t[o*6+u]<l;)o++;for(;o<=a&&t[a*6+u]>=l;)a--;if(o<a){for(let c=0;c<3;c++){let h=e[o*3+c];e[o*3+c]=e[a*3+c],e[a*3+c]=h}for(let c=0;c<6;c++){let h=t[o*6+c];t[o*6+c]=t[a*6+c],t[a*6+c]=h}o++,a--}else return o}}function Ox(n,e,t,i,r,s){let o=i,a=i+r-1;const l=s.pos,u=s.axis*2;for(;;){for(;o<=a&&t[o*6+u]<l;)o++;for(;o<=a&&t[a*6+u]>=l;)a--;if(o<a){let c=n[o];n[o]=n[a],n[a]=c;for(let h=0;h<6;h++){let f=t[o*6+h];t[o*6+h]=t[a*6+h],t[a*6+h]=f}o++,a--}else return o}}function Xt(n,e){return e[n+15]===65535}function Qt(n,e){return e[n+6]}function sn(n,e){return e[n+14]}function an(n){return n+8}function on(n,e){return e[n+6]}function ih(n,e){return e[n+7]}let rh,Dr,Fs,sh;const zx=Math.pow(2,32);function wo(n){return"count"in n?1:1+wo(n.left)+wo(n.right)}function Hx(n,e,t){return rh=new Float32Array(t),Dr=new Uint32Array(t),Fs=new Uint16Array(t),sh=new Uint8Array(t),Ao(n,e)}function Ao(n,e){const t=n/4,i=n/2,r="count"in e,s=e.boundingData;for(let o=0;o<6;o++)rh[t+o]=s[o];if(r)if(e.buffer){const o=e.buffer;sh.set(new Uint8Array(o),n);for(let a=n,l=n+o.byteLength;a<l;a+=Ur){const u=a/2;Xt(u,Fs)||(Dr[a/4+6]+=t)}return n+o.byteLength}else{const o=e.offset,a=e.count;return Dr[t+6]=o,Fs[i+14]=a,Fs[i+15]=na,n+Ur}else{const o=e.left,a=e.right,l=e.splitAxis;let u;if(u=Ao(n+Ur,o),u/4>zx)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return Dr[t+6]=u/4,u=Ao(u,a),Dr[t+7]=l,u}}function Gx(n,e){const t=(n.index?n.index.count:n.attributes.position.count)/3,i=t>2**16,r=i?4:2,s=e?new SharedArrayBuffer(t*r):new ArrayBuffer(t*r),o=i?new Uint32Array(s):new Uint16Array(s);for(let a=0,l=o.length;a<l;a++)o[a]=a;return o}function Vx(n,e,t,i,r){const{maxDepth:s,verbose:o,maxLeafTris:a,strategy:l,onProgress:u,indirect:c}=r,h=n._indirectBuffer,f=n.geometry,p=f.index?f.index.array:null,v=c?Ox:Bx,x=ui(f),m=new Float32Array(6);let d=!1;const y=new Xa;return Wa(e,t,i,y.boundingData,m),S(y,t,i,m),y;function g(_){u&&u(_/x)}function S(_,T,E,P=null,M=0){if(!d&&M>=s&&(d=!0,o&&(console.warn(`MeshBVH: Max depth of ${s} reached when generating BVH. Consider increasing maxDepth.`),console.warn(f))),E<=a||M>=s)return g(T+E),_.offset=T,_.count=E,_;const b=Nx(_.boundingData,P,e,T,E,l);if(b.axis===-1)return g(T+E),_.offset=T,_.count=E,_;const I=v(h,p,e,T,E,b);if(I===T||I===T+E)g(T+E),_.offset=T,_.count=E;else{_.splitAxis=b.axis;const L=new Xa,O=T,C=I-T;_.left=L,Wa(e,O,C,L.boundingData,m),S(L,O,C,m,M+1);const B=new Xa,N=I,k=E-C;_.right=B,Wa(e,N,k,B.boundingData,m),S(B,N,k,m,M+1)}return _}}function kx(n,e){const t=n.geometry;e.indirect&&(n._indirectBuffer=Gx(t,e.useSharedArrayBuffer),Lx(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),n._indirectBuffer||Dx(t,e);const i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=th(t,e.range),s=Ix(t,null,r[0].offset,r[0].count),o=e.indirect?r:nh(t,e.range);n._roots=o.map(a=>{const l=Vx(n,s,a.offset,a.count,e),u=wo(l),c=new i(Ur*u);return Hx(0,l,c),c})}class Xn{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let i=1/0,r=-1/0;for(let s=0,o=e.length;s<o;s++){const l=e[s][t];i=l<i?l:i,r=l>r?l:r}this.min=i,this.max=r}setFromPoints(e,t){let i=1/0,r=-1/0;for(let s=0,o=t.length;s<o;s++){const a=t[s],l=e.dot(a);i=l<i?l:i,r=l>r?l:r}this.min=i,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}}Xn.prototype.setFromBox=function(){const n=new U;return function(t,i){const r=i.min,s=i.max;let o=1/0,a=-1/0;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let c=0;c<=1;c++){n.x=r.x*l+s.x*(1-l),n.y=r.y*u+s.y*(1-u),n.z=r.z*c+s.z*(1-c);const h=t.dot(n);o=Math.min(h,o),a=Math.max(h,a)}this.min=o,this.max=a}}();const Wx=function(){const n=new U,e=new U,t=new U;return function(r,s,o){const a=r.start,l=n,u=s.start,c=e;t.subVectors(a,u),n.subVectors(r.end,r.start),e.subVectors(s.end,s.start);const h=t.dot(c),f=c.dot(l),p=c.dot(c),v=t.dot(l),m=l.dot(l)*p-f*f;let d,y;m!==0?d=(h*f-v*p)/m:d=0,y=(h+d*f)/p,o.x=d,o.y=y}}(),ko=function(){const n=new le,e=new U,t=new U;return function(r,s,o,a){Wx(r,s,n);let l=n.x,u=n.y;if(l>=0&&l<=1&&u>=0&&u<=1){r.at(l,o),s.at(u,a);return}else if(l>=0&&l<=1){u<0?s.at(0,a):s.at(1,a),r.closestPointToPoint(a,!0,o);return}else if(u>=0&&u<=1){l<0?r.at(0,o):r.at(1,o),s.closestPointToPoint(o,!0,a);return}else{let c;l<0?c=r.start:c=r.end;let h;u<0?h=s.start:h=s.end;const f=e,p=t;if(r.closestPointToPoint(h,!0,e),s.closestPointToPoint(c,!0,t),f.distanceToSquared(h)<=p.distanceToSquared(c)){o.copy(f),a.copy(h);return}else{o.copy(c),a.copy(p);return}}}}(),Xx=function(){const n=new U,e=new U,t=new gn,i=new cn;return function(s,o){const{radius:a,center:l}=s,{a:u,b:c,c:h}=o;if(i.start=u,i.end=c,i.closestPointToPoint(l,!0,n).distanceTo(l)<=a||(i.start=u,i.end=h,i.closestPointToPoint(l,!0,n).distanceTo(l)<=a)||(i.start=c,i.end=h,i.closestPointToPoint(l,!0,n).distanceTo(l)<=a))return!0;const x=o.getPlane(t);if(Math.abs(x.distanceToPoint(l))<=a){const d=x.projectPoint(l,e);if(o.containsPoint(d))return!0}return!1}}(),Yx=["x","y","z"],zn=1e-15,Oc=zn*zn;function nn(n){return Math.abs(n)<zn}class un extends at{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new U),this.satBounds=new Array(4).fill().map(()=>new Xn),this.points=[this.a,this.b,this.c],this.plane=new gn,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new cn,this.needsUpdate=!0}intersectsSphere(e){return Xx(e,this)}update(){const e=this.a,t=this.b,i=this.c,r=this.points,s=this.satAxes,o=this.satBounds,a=s[0],l=o[0];this.getNormal(a),l.setFromPoints(a,r);const u=s[1],c=o[1];u.subVectors(e,t),c.setFromPoints(u,r);const h=s[2],f=o[2];h.subVectors(t,i),f.setFromPoints(h,r);const p=s[3],v=o[3];p.subVectors(i,e),v.setFromPoints(p,r);const x=u.length(),m=h.length(),d=p.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,x<zn?m<zn||d<zn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(i)):m<zn?d<zn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):d<zn&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(i),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(a,e),this.needsUpdate=!1}}un.prototype.closestPointToSegment=function(){const n=new U,e=new U,t=new cn;return function(r,s=null,o=null){const{start:a,end:l}=r,u=this.points;let c,h=1/0;for(let f=0;f<3;f++){const p=(f+1)%3;t.start.copy(u[f]),t.end.copy(u[p]),ko(t,r,n,e),c=n.distanceToSquared(e),c<h&&(h=c,s&&s.copy(n),o&&o.copy(e))}return this.closestPointToPoint(a,n),c=a.distanceToSquared(n),c<h&&(h=c,s&&s.copy(n),o&&o.copy(a)),this.closestPointToPoint(l,n),c=l.distanceToSquared(n),c<h&&(h=c,s&&s.copy(n),o&&o.copy(l)),Math.sqrt(h)}}();un.prototype.intersectsTriangle=function(){const n=new un,e=new Xn,t=new Xn,i=new U,r=new U,s=new U,o=new U,a=new cn,l=new cn,u=new U,c=new le,h=new le;function f(g,S,_,T){const E=i;!g.isDegenerateIntoPoint&&!g.isDegenerateIntoSegment?E.copy(g.plane.normal):E.copy(S.plane.normal);const P=g.satBounds,M=g.satAxes;for(let L=1;L<4;L++){const O=P[L],C=M[L];if(e.setFromPoints(C,S.points),O.isSeparated(e)||(o.copy(E).cross(C),e.setFromPoints(o,g.points),t.setFromPoints(o,S.points),e.isSeparated(t)))return!1}const b=S.satBounds,I=S.satAxes;for(let L=1;L<4;L++){const O=b[L],C=I[L];if(e.setFromPoints(C,g.points),O.isSeparated(e)||(o.crossVectors(E,C),e.setFromPoints(o,g.points),t.setFromPoints(o,S.points),e.isSeparated(t)))return!1}return _&&(T||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),_.start.set(0,0,0),_.end.set(0,0,0)),!0}function p(g,S,_,T,E,P,M,b,I,L,O){let C=M/(M-b);L.x=T+(E-T)*C,O.start.subVectors(S,g).multiplyScalar(C).add(g),C=M/(M-I),L.y=T+(P-T)*C,O.end.subVectors(_,g).multiplyScalar(C).add(g)}function v(g,S,_,T,E,P,M,b,I,L,O){if(E>0)p(g.c,g.a,g.b,T,S,_,I,M,b,L,O);else if(P>0)p(g.b,g.a,g.c,_,S,T,b,M,I,L,O);else if(b*I>0||M!=0)p(g.a,g.b,g.c,S,_,T,M,b,I,L,O);else if(b!=0)p(g.b,g.a,g.c,_,S,T,b,M,I,L,O);else if(I!=0)p(g.c,g.a,g.b,T,S,_,I,M,b,L,O);else return!0;return!1}function x(g,S,_,T){const E=S.degenerateSegment,P=g.plane.distanceToPoint(E.start),M=g.plane.distanceToPoint(E.end);return nn(P)?nn(M)?f(g,S,_,T):(_&&(_.start.copy(E.start),_.end.copy(E.start)),g.containsPoint(E.start)):nn(M)?(_&&(_.start.copy(E.end),_.end.copy(E.end)),g.containsPoint(E.end)):g.plane.intersectLine(E,i)!=null?(_&&(_.start.copy(i),_.end.copy(i)),g.containsPoint(i)):!1}function m(g,S,_){const T=S.a;return nn(g.plane.distanceToPoint(T))&&g.containsPoint(T)?(_&&(_.start.copy(T),_.end.copy(T)),!0):!1}function d(g,S,_){const T=g.degenerateSegment,E=S.a;return T.closestPointToPoint(E,!0,i),E.distanceToSquared(i)<Oc?(_&&(_.start.copy(E),_.end.copy(E)),!0):!1}function y(g,S,_,T){if(g.isDegenerateIntoSegment)if(S.isDegenerateIntoSegment){const E=g.degenerateSegment,P=S.degenerateSegment,M=r,b=s;E.delta(M),P.delta(b);const I=i.subVectors(P.start,E.start),L=M.x*b.y-M.y*b.x;if(nn(L))return!1;const O=(I.x*b.y-I.y*b.x)/L,C=-(M.x*I.y-M.y*I.x)/L;if(O<0||O>1||C<0||C>1)return!1;const B=E.start.z+M.z*O,N=P.start.z+b.z*C;return nn(B-N)?(_&&(_.start.copy(E.start).addScaledVector(M,O),_.end.copy(E.start).addScaledVector(M,O)),!0):!1}else return S.isDegenerateIntoPoint?d(g,S,_):x(S,g,_,T);else{if(g.isDegenerateIntoPoint)return S.isDegenerateIntoPoint?S.a.distanceToSquared(g.a)<Oc?(_&&(_.start.copy(g.a),_.end.copy(g.a)),!0):!1:S.isDegenerateIntoSegment?d(S,g,_):m(S,g,_);if(S.isDegenerateIntoPoint)return m(g,S,_);if(S.isDegenerateIntoSegment)return x(g,S,_,T)}}return function(S,_=null,T=!1){this.needsUpdate&&this.update(),S.isExtendedTriangle?S.needsUpdate&&S.update():(n.copy(S),n.update(),S=n);const E=y(this,S,_,T);if(E!==void 0)return E;const P=this.plane,M=S.plane;let b=M.distanceToPoint(this.a),I=M.distanceToPoint(this.b),L=M.distanceToPoint(this.c);nn(b)&&(b=0),nn(I)&&(I=0),nn(L)&&(L=0);const O=b*I,C=b*L;if(O>0&&C>0)return!1;let B=P.distanceToPoint(S.a),N=P.distanceToPoint(S.b),k=P.distanceToPoint(S.c);nn(B)&&(B=0),nn(N)&&(N=0),nn(k)&&(k=0);const q=B*N,K=B*k;if(q>0&&K>0)return!1;r.copy(P.normal),s.copy(M.normal);const j=r.cross(s);let ee=0,ie=Math.abs(j.x);const Y=Math.abs(j.y);Y>ie&&(ie=Y,ee=1),Math.abs(j.z)>ie&&(ee=2);const ae=Yx[ee],de=this.a[ae],ge=this.b[ae],Re=this.c[ae],Ce=S.a[ae],_e=S.b[ae],Ue=S.c[ae];if(v(this,de,ge,Re,O,C,b,I,L,c,a))return f(this,S,_,T);if(v(S,Ce,_e,Ue,q,K,B,N,k,h,l))return f(this,S,_,T);if(c.y<c.x){const H=c.y;c.y=c.x,c.x=H,u.copy(a.start),a.start.copy(a.end),a.end.copy(u)}if(h.y<h.x){const H=h.y;h.y=h.x,h.x=H,u.copy(l.start),l.start.copy(l.end),l.end.copy(u)}return c.y<h.x||h.y<c.x?!1:(_&&(h.x>c.x?_.start.copy(l.start):_.start.copy(a.start),h.y<c.y?_.end.copy(l.end):_.end.copy(a.end)),!0)}}();un.prototype.distanceToPoint=function(){const n=new U;return function(t){return this.closestPointToPoint(t,n),t.distanceTo(n)}}();un.prototype.distanceToTriangle=function(){const n=new U,e=new U,t=["a","b","c"],i=new cn,r=new cn;return function(o,a=null,l=null){const u=a||l?i:null;if(this.intersectsTriangle(o,u))return(a||l)&&(a&&u.getCenter(a),l&&u.getCenter(l)),0;let c=1/0;for(let h=0;h<3;h++){let f;const p=t[h],v=o[p];this.closestPointToPoint(v,n),f=v.distanceToSquared(n),f<c&&(c=f,a&&a.copy(n),l&&l.copy(v));const x=this[p];o.closestPointToPoint(x,n),f=x.distanceToSquared(n),f<c&&(c=f,a&&a.copy(x),l&&l.copy(n))}for(let h=0;h<3;h++){const f=t[h],p=t[(h+1)%3];i.set(this[f],this[p]);for(let v=0;v<3;v++){const x=t[v],m=t[(v+1)%3];r.set(o[x],o[m]),ko(i,r,n,e);const d=n.distanceToSquared(e);d<c&&(c=d,a&&a.copy(n),l&&l.copy(e))}}return Math.sqrt(c)}}();class kt{constructor(e,t,i){this.isOrientedBox=!0,this.min=new U,this.max=new U,this.matrix=new Pe,this.invMatrix=new Pe,this.points=new Array(8).fill().map(()=>new U),this.satAxes=new Array(3).fill().map(()=>new U),this.satBounds=new Array(3).fill().map(()=>new Xn),this.alignedSatBounds=new Array(3).fill().map(()=>new Xn),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),i&&this.matrix.copy(i)}set(e,t,i){this.min.copy(e),this.max.copy(t),this.matrix.copy(i),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}kt.prototype.update=function(){return function(){const e=this.matrix,t=this.min,i=this.max,r=this.points;for(let u=0;u<=1;u++)for(let c=0;c<=1;c++)for(let h=0;h<=1;h++){const f=1*u|2*c|4*h,p=r[f];p.x=u?i.x:t.x,p.y=c?i.y:t.y,p.z=h?i.z:t.z,p.applyMatrix4(e)}const s=this.satBounds,o=this.satAxes,a=r[0];for(let u=0;u<3;u++){const c=o[u],h=s[u],f=1<<u,p=r[f];c.subVectors(a,p),h.setFromPoints(c,r)}const l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();kt.prototype.intersectsBox=function(){const n=new Xn;return function(t){this.needsUpdate&&this.update();const i=t.min,r=t.max,s=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(n.min=i.x,n.max=r.x,a[0].isSeparated(n)||(n.min=i.y,n.max=r.y,a[1].isSeparated(n))||(n.min=i.z,n.max=r.z,a[2].isSeparated(n)))return!1;for(let l=0;l<3;l++){const u=o[l],c=s[l];if(n.setFromBox(u,t),c.isSeparated(n))return!1}return!0}}();kt.prototype.intersectsTriangle=function(){const n=new un,e=new Array(3),t=new Xn,i=new Xn,r=new U;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(n.copy(o),n.update(),o=n);const a=this.satBounds,l=this.satAxes;e[0]=o.a,e[1]=o.b,e[2]=o.c;for(let f=0;f<3;f++){const p=a[f],v=l[f];if(t.setFromPoints(v,e),p.isSeparated(t))return!1}const u=o.satBounds,c=o.satAxes,h=this.points;for(let f=0;f<3;f++){const p=u[f],v=c[f];if(t.setFromPoints(v,h),p.isSeparated(t))return!1}for(let f=0;f<3;f++){const p=l[f];for(let v=0;v<4;v++){const x=c[v];if(r.crossVectors(p,x),t.setFromPoints(r,e),i.setFromPoints(r,h),t.isSeparated(i))return!1}}return!0}}();kt.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();kt.prototype.distanceToPoint=function(){const n=new U;return function(t){return this.closestPointToPoint(t,n),t.distanceTo(n)}}();kt.prototype.distanceToBox=function(){const n=["x","y","z"],e=new Array(12).fill().map(()=>new cn),t=new Array(12).fill().map(()=>new cn),i=new U,r=new U;return function(o,a=0,l=null,u=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(l||u)&&(o.getCenter(r),this.closestPointToPoint(r,i),o.closestPointToPoint(i,r),l&&l.copy(i),u&&u.copy(r)),0;const c=a*a,h=o.min,f=o.max,p=this.points;let v=1/0;for(let m=0;m<8;m++){const d=p[m];r.copy(d).clamp(h,f);const y=d.distanceToSquared(r);if(y<v&&(v=y,l&&l.copy(d),u&&u.copy(r),y<c))return Math.sqrt(y)}let x=0;for(let m=0;m<3;m++)for(let d=0;d<=1;d++)for(let y=0;y<=1;y++){const g=(m+1)%3,S=(m+2)%3,_=d<<g|y<<S,T=1<<m|d<<g|y<<S,E=p[_],P=p[T];e[x].set(E,P);const b=n[m],I=n[g],L=n[S],O=t[x],C=O.start,B=O.end;C[b]=h[b],C[I]=d?h[I]:f[I],C[L]=y?h[L]:f[I],B[b]=f[b],B[I]=d?h[I]:f[I],B[L]=y?h[L]:f[I],x++}for(let m=0;m<=1;m++)for(let d=0;d<=1;d++)for(let y=0;y<=1;y++){r.x=m?f.x:h.x,r.y=d?f.y:h.y,r.z=y?f.z:h.z,this.closestPointToPoint(r,i);const g=r.distanceToSquared(i);if(g<v&&(v=g,l&&l.copy(i),u&&u.copy(r),g<c))return Math.sqrt(g)}for(let m=0;m<12;m++){const d=e[m];for(let y=0;y<12;y++){const g=t[y];ko(d,g,i,r);const S=i.distanceToSquared(r);if(S<v&&(v=S,l&&l.copy(i),u&&u.copy(r),S<c))return Math.sqrt(S)}}return Math.sqrt(v)}}();class Wo{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){const e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}class qx extends Wo{constructor(){super(()=>new un)}}const ln=new qx;class Kx{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let t=null;this.setBuffer=i=>{t&&e.push(t),t=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}}const ot=new Kx;let ii,cr;const $i=[],gs=new Wo(()=>new Vt);function Zx(n,e,t,i,r,s){ii=gs.getPrimitive(),cr=gs.getPrimitive(),$i.push(ii,cr),ot.setBuffer(n._roots[e]);const o=Ro(0,n.geometry,t,i,r,s);ot.clearBuffer(),gs.releasePrimitive(ii),gs.releasePrimitive(cr),$i.pop(),$i.pop();const a=$i.length;return a>0&&(cr=$i[a-1],ii=$i[a-2]),o}function Ro(n,e,t,i,r=null,s=0,o=0){const{float32Array:a,uint16Array:l,uint32Array:u}=ot;let c=n*2;if(Xt(c,l)){const v=Qt(n,u),x=sn(c,l);return pt(n,a,ii),i(v,x,!1,o,s+n,ii)}else{let L=function(C){const{uint16Array:B,uint32Array:N}=ot;let k=C*2;for(;!Xt(k,B);)C=an(C),k=C*2;return Qt(C,N)},O=function(C){const{uint16Array:B,uint32Array:N}=ot;let k=C*2;for(;!Xt(k,B);)C=on(C,N),k=C*2;return Qt(C,N)+sn(k,B)};var f=L,p=O;const v=an(n),x=on(n,u);let m=v,d=x,y,g,S,_;if(r&&(S=ii,_=cr,pt(m,a,S),pt(d,a,_),y=r(S),g=r(_),g<y)){m=x,d=v;const C=y;y=g,g=C,S=_}S||(S=ii,pt(m,a,S));const T=Xt(m*2,l),E=t(S,T,y,o+1,s+m);let P;if(E===Ic){const C=L(m),N=O(m)-C;P=i(C,N,!0,o+1,s+m,S)}else P=E&&Ro(m,e,t,i,r,s,o+1);if(P)return!0;_=cr,pt(d,a,_);const M=Xt(d*2,l),b=t(_,M,g,o+1,s+d);let I;if(b===Ic){const C=L(d),N=O(d)-C;I=i(C,N,!0,o+1,s+d,_)}else I=b&&Ro(d,e,t,i,r,s,o+1);return!!I}}const Tr=new U,Ya=new U;function jx(n,e,t={},i=0,r=1/0){const s=i*i,o=r*r;let a=1/0,l=null;if(n.shapecast({boundsTraverseOrder:c=>(Tr.copy(e).clamp(c.min,c.max),Tr.distanceToSquared(e)),intersectsBounds:(c,h,f)=>f<a&&f<o,intersectsTriangle:(c,h)=>{c.closestPointToPoint(e,Tr);const f=e.distanceToSquared(Tr);return f<a&&(Ya.copy(Tr),a=f,l=h),f<s}}),a===1/0)return null;const u=Math.sqrt(a);return t.point?t.point.copy(Ya):t.point=Ya.clone(),t.distance=u,t.faceIndex=l,t}const vs=parseInt(ci)>=169,Qx=parseInt(ci)<=161,xi=new U,Si=new U,yi=new U,xs=new le,Ss=new le,ys=new le,zc=new U,Hc=new U,Gc=new U,br=new U;function Jx(n,e,t,i,r,s,o,a){let l;if(s===_t?l=n.intersectTriangle(i,t,e,!0,r):l=n.intersectTriangle(e,t,i,s!==At,r),l===null)return null;const u=n.origin.distanceTo(r);return u<o||u>a?null:{distance:u,point:r.clone()}}function $x(n,e,t,i,r,s,o,a,l,u,c){xi.fromBufferAttribute(e,s),Si.fromBufferAttribute(e,o),yi.fromBufferAttribute(e,a);const h=Jx(n,xi,Si,yi,br,l,u,c);if(h){if(i){xs.fromBufferAttribute(i,s),Ss.fromBufferAttribute(i,o),ys.fromBufferAttribute(i,a),h.uv=new le;const p=at.getInterpolation(br,xi,Si,yi,xs,Ss,ys,h.uv);vs||(h.uv=p)}if(r){xs.fromBufferAttribute(r,s),Ss.fromBufferAttribute(r,o),ys.fromBufferAttribute(r,a),h.uv1=new le;const p=at.getInterpolation(br,xi,Si,yi,xs,Ss,ys,h.uv1);vs||(h.uv1=p),Qx&&(h.uv2=h.uv1)}if(t){zc.fromBufferAttribute(t,s),Hc.fromBufferAttribute(t,o),Gc.fromBufferAttribute(t,a),h.normal=new U;const p=at.getInterpolation(br,xi,Si,yi,zc,Hc,Gc,h.normal);h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1),vs||(h.normal=p)}const f={a:s,b:o,c:a,normal:new U,materialIndex:0};if(at.getNormal(xi,Si,yi,f.normal),h.face=f,h.faceIndex=s,vs){const p=new U;at.getBarycoord(br,xi,Si,yi,p),h.barycoord=p}}return h}function ia(n,e,t,i,r,s,o){const a=i*3;let l=a+0,u=a+1,c=a+2;const h=n.index;n.index&&(l=h.getX(l),u=h.getX(u),c=h.getX(c));const{position:f,normal:p,uv:v,uv1:x}=n.attributes,m=$x(t,f,p,v,x,l,u,c,e,s,o);return m?(m.faceIndex=i,r&&r.push(m),m):null}function Mt(n,e,t,i){const r=n.a,s=n.b,o=n.c;let a=e,l=e+1,u=e+2;t&&(a=t.getX(a),l=t.getX(l),u=t.getX(u)),r.x=i.getX(a),r.y=i.getY(a),r.z=i.getZ(a),s.x=i.getX(l),s.y=i.getY(l),s.z=i.getZ(l),o.x=i.getX(u),o.y=i.getY(u),o.z=i.getZ(u)}function eS(n,e,t,i,r,s,o,a){const{geometry:l,_indirectBuffer:u}=n;for(let c=i,h=i+r;c<h;c++)ia(l,e,t,c,s,o,a)}function tS(n,e,t,i,r,s,o){const{geometry:a,_indirectBuffer:l}=n;let u=1/0,c=null;for(let h=i,f=i+r;h<f;h++){let p;p=ia(a,e,t,h,null,s,o),p&&p.distance<u&&(c=p,u=p.distance)}return c}function nS(n,e,t,i,r,s,o){const{geometry:a}=t,{index:l}=a,u=a.attributes.position;for(let c=n,h=e+n;c<h;c++){let f;if(f=c,Mt(o,f*3,l,u),o.needsUpdate=!0,i(o,f,r,s))return!0}return!1}function iS(n,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=n.geometry,i=t.index?t.index.array:null,r=t.attributes.position;let s,o,a,l,u=0;const c=n._roots;for(let f=0,p=c.length;f<p;f++)s=c[f],o=new Uint32Array(s),a=new Uint16Array(s),l=new Float32Array(s),h(0,u),u+=s.byteLength;function h(f,p,v=!1){const x=f*2;if(a[x+15]===na){const d=o[f+6],y=a[x+14];let g=1/0,S=1/0,_=1/0,T=-1/0,E=-1/0,P=-1/0;for(let M=3*d,b=3*(d+y);M<b;M++){let I=i[M];const L=r.getX(I),O=r.getY(I),C=r.getZ(I);L<g&&(g=L),L>T&&(T=L),O<S&&(S=O),O>E&&(E=O),C<_&&(_=C),C>P&&(P=C)}return l[f+0]!==g||l[f+1]!==S||l[f+2]!==_||l[f+3]!==T||l[f+4]!==E||l[f+5]!==P?(l[f+0]=g,l[f+1]=S,l[f+2]=_,l[f+3]=T,l[f+4]=E,l[f+5]=P,!0):!1}else{const d=f+8,y=o[f+6],g=d+p,S=y+p;let _=v,T=!1,E=!1;e?_||(T=e.has(g),E=e.has(S),_=!T&&!E):(T=!0,E=!0);const P=_||T,M=_||E;let b=!1;P&&(b=h(d,p,_));let I=!1;M&&(I=h(y,p,_));const L=b||I;if(L)for(let O=0;O<3;O++){const C=d+O,B=y+O,N=l[C],k=l[C+3],q=l[B],K=l[B+3];l[f+O]=N<q?N:q,l[f+O+3]=k>K?k:K}return L}}}function li(n,e,t,i,r){let s,o,a,l,u,c;const h=1/t.direction.x,f=1/t.direction.y,p=1/t.direction.z,v=t.origin.x,x=t.origin.y,m=t.origin.z;let d=e[n],y=e[n+3],g=e[n+1],S=e[n+3+1],_=e[n+2],T=e[n+3+2];return h>=0?(s=(d-v)*h,o=(y-v)*h):(s=(y-v)*h,o=(d-v)*h),f>=0?(a=(g-x)*f,l=(S-x)*f):(a=(S-x)*f,l=(g-x)*f),s>l||a>o||((a>s||isNaN(s))&&(s=a),(l<o||isNaN(o))&&(o=l),p>=0?(u=(_-m)*p,c=(T-m)*p):(u=(T-m)*p,c=(_-m)*p),s>c||u>o)?!1:((u>s||s!==s)&&(s=u),(c<o||o!==o)&&(o=c),s<=r&&o>=i)}function rS(n,e,t,i,r,s,o,a){const{geometry:l,_indirectBuffer:u}=n;for(let c=i,h=i+r;c<h;c++){let f=u?u[c]:c;ia(l,e,t,f,s,o,a)}}function sS(n,e,t,i,r,s,o){const{geometry:a,_indirectBuffer:l}=n;let u=1/0,c=null;for(let h=i,f=i+r;h<f;h++){let p;p=ia(a,e,t,l?l[h]:h,null,s,o),p&&p.distance<u&&(c=p,u=p.distance)}return c}function aS(n,e,t,i,r,s,o){const{geometry:a}=t,{index:l}=a,u=a.attributes.position;for(let c=n,h=e+n;c<h;c++){let f;if(f=t.resolveTriangleIndex(c),Mt(o,f*3,l,u),o.needsUpdate=!0,i(o,f,r,s))return!0}return!1}function oS(n,e,t,i,r,s,o){ot.setBuffer(n._roots[e]),Co(0,n,t,i,r,s,o),ot.clearBuffer()}function Co(n,e,t,i,r,s,o){const{float32Array:a,uint16Array:l,uint32Array:u}=ot,c=n*2;if(Xt(c,l)){const f=Qt(n,u),p=sn(c,l);eS(e,t,i,f,p,r,s,o)}else{const f=an(n);li(f,a,i,s,o)&&Co(f,e,t,i,r,s,o);const p=on(n,u);li(p,a,i,s,o)&&Co(p,e,t,i,r,s,o)}}const lS=["x","y","z"];function cS(n,e,t,i,r,s){ot.setBuffer(n._roots[e]);const o=Po(0,n,t,i,r,s);return ot.clearBuffer(),o}function Po(n,e,t,i,r,s){const{float32Array:o,uint16Array:a,uint32Array:l}=ot;let u=n*2;if(Xt(u,a)){const h=Qt(n,l),f=sn(u,a);return tS(e,t,i,h,f,r,s)}else{const h=ih(n,l),f=lS[h],v=i.direction[f]>=0;let x,m;v?(x=an(n),m=on(n,l)):(x=on(n,l),m=an(n));const y=li(x,o,i,r,s)?Po(x,e,t,i,r,s):null;if(y){const _=y.point[f];if(v?_<=o[m+h]:_>=o[m+h+3])return y}const S=li(m,o,i,r,s)?Po(m,e,t,i,r,s):null;return y&&S?y.distance<=S.distance?y:S:y||S||null}}const Ms=new Vt,er=new un,tr=new un,wr=new Pe,Vc=new kt,_s=new kt;function uS(n,e,t,i){ot.setBuffer(n._roots[e]);const r=Do(0,n,t,i);return ot.clearBuffer(),r}function Do(n,e,t,i,r=null){const{float32Array:s,uint16Array:o,uint32Array:a}=ot;let l=n*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),Vc.set(t.boundingBox.min,t.boundingBox.max,i),r=Vc),Xt(l,o)){const c=e.geometry,h=c.index,f=c.attributes.position,p=t.index,v=t.attributes.position,x=Qt(n,a),m=sn(l,o);if(wr.copy(i).invert(),t.boundsTree)return pt(n,s,_s),_s.matrix.copy(wr),_s.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:y=>_s.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(i),y.b.applyMatrix4(i),y.c.applyMatrix4(i),y.needsUpdate=!0;for(let g=x*3,S=(m+x)*3;g<S;g+=3)if(Mt(tr,g,h,f),tr.needsUpdate=!0,y.intersectsTriangle(tr))return!0;return!1}});{const d=ui(t);for(let y=x*3,g=(m+x)*3;y<g;y+=3){Mt(er,y,h,f),er.a.applyMatrix4(wr),er.b.applyMatrix4(wr),er.c.applyMatrix4(wr),er.needsUpdate=!0;for(let S=0,_=d*3;S<_;S+=3)if(Mt(tr,S,p,v),tr.needsUpdate=!0,er.intersectsTriangle(tr))return!0}}}else{const c=n+8,h=a[n+6];return pt(c,s,Ms),!!(r.intersectsBox(Ms)&&Do(c,e,t,i,r)||(pt(h,s,Ms),r.intersectsBox(Ms)&&Do(h,e,t,i,r)))}}const Es=new Pe,qa=new kt,Ar=new kt,hS=new U,fS=new U,dS=new U,pS=new U;function mS(n,e,t,i={},r={},s=0,o=1/0){e.boundingBox||e.computeBoundingBox(),qa.set(e.boundingBox.min,e.boundingBox.max,t),qa.needsUpdate=!0;const a=n.geometry,l=a.attributes.position,u=a.index,c=e.attributes.position,h=e.index,f=ln.getPrimitive(),p=ln.getPrimitive();let v=hS,x=fS,m=null,d=null;r&&(m=dS,d=pS);let y=1/0,g=null,S=null;return Es.copy(t).invert(),Ar.matrix.copy(Es),n.shapecast({boundsTraverseOrder:_=>qa.distanceToBox(_),intersectsBounds:(_,T,E)=>E<y&&E<o?(T&&(Ar.min.copy(_.min),Ar.max.copy(_.max),Ar.needsUpdate=!0),!0):!1,intersectsRange:(_,T)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:P=>Ar.distanceToBox(P),intersectsBounds:(P,M,b)=>b<y&&b<o,intersectsRange:(P,M)=>{for(let b=P,I=P+M;b<I;b++){Mt(p,3*b,h,c),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let L=_,O=_+T;L<O;L++){Mt(f,3*L,u,l),f.needsUpdate=!0;const C=f.distanceToTriangle(p,v,m);if(C<y&&(x.copy(v),d&&d.copy(m),y=C,g=L,S=b),C<s)return!0}}}});{const E=ui(e);for(let P=0,M=E;P<M;P++){Mt(p,3*P,h,c),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let b=_,I=_+T;b<I;b++){Mt(f,3*b,u,l),f.needsUpdate=!0;const L=f.distanceToTriangle(p,v,m);if(L<y&&(x.copy(v),d&&d.copy(m),y=L,g=b,S=P),L<s)return!0}}}}}),ln.releasePrimitive(f),ln.releasePrimitive(p),y===1/0?null:(i.point?i.point.copy(x):i.point=x.clone(),i.distance=y,i.faceIndex=g,r&&(r.point?r.point.copy(d):r.point=d.clone(),r.point.applyMatrix4(Es),x.applyMatrix4(Es),r.distance=x.sub(r.point).length(),r.faceIndex=S),i)}function gS(n,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=n.geometry,i=t.index?t.index.array:null,r=t.attributes.position;let s,o,a,l,u=0;const c=n._roots;for(let f=0,p=c.length;f<p;f++)s=c[f],o=new Uint32Array(s),a=new Uint16Array(s),l=new Float32Array(s),h(0,u),u+=s.byteLength;function h(f,p,v=!1){const x=f*2;if(a[x+15]===na){const d=o[f+6],y=a[x+14];let g=1/0,S=1/0,_=1/0,T=-1/0,E=-1/0,P=-1/0;for(let M=d,b=d+y;M<b;M++){const I=3*n.resolveTriangleIndex(M);for(let L=0;L<3;L++){let O=I+L;O=i?i[O]:O;const C=r.getX(O),B=r.getY(O),N=r.getZ(O);C<g&&(g=C),C>T&&(T=C),B<S&&(S=B),B>E&&(E=B),N<_&&(_=N),N>P&&(P=N)}}return l[f+0]!==g||l[f+1]!==S||l[f+2]!==_||l[f+3]!==T||l[f+4]!==E||l[f+5]!==P?(l[f+0]=g,l[f+1]=S,l[f+2]=_,l[f+3]=T,l[f+4]=E,l[f+5]=P,!0):!1}else{const d=f+8,y=o[f+6],g=d+p,S=y+p;let _=v,T=!1,E=!1;e?_||(T=e.has(g),E=e.has(S),_=!T&&!E):(T=!0,E=!0);const P=_||T,M=_||E;let b=!1;P&&(b=h(d,p,_));let I=!1;M&&(I=h(y,p,_));const L=b||I;if(L)for(let O=0;O<3;O++){const C=d+O,B=y+O,N=l[C],k=l[C+3],q=l[B],K=l[B+3];l[f+O]=N<q?N:q,l[f+O+3]=k>K?k:K}return L}}}function vS(n,e,t,i,r,s,o){ot.setBuffer(n._roots[e]),Lo(0,n,t,i,r,s,o),ot.clearBuffer()}function Lo(n,e,t,i,r,s,o){const{float32Array:a,uint16Array:l,uint32Array:u}=ot,c=n*2;if(Xt(c,l)){const f=Qt(n,u),p=sn(c,l);rS(e,t,i,f,p,r,s,o)}else{const f=an(n);li(f,a,i,s,o)&&Lo(f,e,t,i,r,s,o);const p=on(n,u);li(p,a,i,s,o)&&Lo(p,e,t,i,r,s,o)}}const xS=["x","y","z"];function SS(n,e,t,i,r,s){ot.setBuffer(n._roots[e]);const o=Io(0,n,t,i,r,s);return ot.clearBuffer(),o}function Io(n,e,t,i,r,s){const{float32Array:o,uint16Array:a,uint32Array:l}=ot;let u=n*2;if(Xt(u,a)){const h=Qt(n,l),f=sn(u,a);return sS(e,t,i,h,f,r,s)}else{const h=ih(n,l),f=xS[h],v=i.direction[f]>=0;let x,m;v?(x=an(n),m=on(n,l)):(x=on(n,l),m=an(n));const y=li(x,o,i,r,s)?Io(x,e,t,i,r,s):null;if(y){const _=y.point[f];if(v?_<=o[m+h]:_>=o[m+h+3])return y}const S=li(m,o,i,r,s)?Io(m,e,t,i,r,s):null;return y&&S?y.distance<=S.distance?y:S:y||S||null}}const Ts=new Vt,nr=new un,ir=new un,Rr=new Pe,kc=new kt,bs=new kt;function yS(n,e,t,i){ot.setBuffer(n._roots[e]);const r=Uo(0,n,t,i);return ot.clearBuffer(),r}function Uo(n,e,t,i,r=null){const{float32Array:s,uint16Array:o,uint32Array:a}=ot;let l=n*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),kc.set(t.boundingBox.min,t.boundingBox.max,i),r=kc),Xt(l,o)){const c=e.geometry,h=c.index,f=c.attributes.position,p=t.index,v=t.attributes.position,x=Qt(n,a),m=sn(l,o);if(Rr.copy(i).invert(),t.boundsTree)return pt(n,s,bs),bs.matrix.copy(Rr),bs.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:y=>bs.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(i),y.b.applyMatrix4(i),y.c.applyMatrix4(i),y.needsUpdate=!0;for(let g=x,S=m+x;g<S;g++)if(Mt(ir,3*e.resolveTriangleIndex(g),h,f),ir.needsUpdate=!0,y.intersectsTriangle(ir))return!0;return!1}});{const d=ui(t);for(let y=x,g=m+x;y<g;y++){const S=e.resolveTriangleIndex(y);Mt(nr,3*S,h,f),nr.a.applyMatrix4(Rr),nr.b.applyMatrix4(Rr),nr.c.applyMatrix4(Rr),nr.needsUpdate=!0;for(let _=0,T=d*3;_<T;_+=3)if(Mt(ir,_,p,v),ir.needsUpdate=!0,nr.intersectsTriangle(ir))return!0}}}else{const c=n+8,h=a[n+6];return pt(c,s,Ts),!!(r.intersectsBox(Ts)&&Uo(c,e,t,i,r)||(pt(h,s,Ts),r.intersectsBox(Ts)&&Uo(h,e,t,i,r)))}}const ws=new Pe,Ka=new kt,Cr=new kt,MS=new U,_S=new U,ES=new U,TS=new U;function bS(n,e,t,i={},r={},s=0,o=1/0){e.boundingBox||e.computeBoundingBox(),Ka.set(e.boundingBox.min,e.boundingBox.max,t),Ka.needsUpdate=!0;const a=n.geometry,l=a.attributes.position,u=a.index,c=e.attributes.position,h=e.index,f=ln.getPrimitive(),p=ln.getPrimitive();let v=MS,x=_S,m=null,d=null;r&&(m=ES,d=TS);let y=1/0,g=null,S=null;return ws.copy(t).invert(),Cr.matrix.copy(ws),n.shapecast({boundsTraverseOrder:_=>Ka.distanceToBox(_),intersectsBounds:(_,T,E)=>E<y&&E<o?(T&&(Cr.min.copy(_.min),Cr.max.copy(_.max),Cr.needsUpdate=!0),!0):!1,intersectsRange:(_,T)=>{if(e.boundsTree){const E=e.boundsTree;return E.shapecast({boundsTraverseOrder:P=>Cr.distanceToBox(P),intersectsBounds:(P,M,b)=>b<y&&b<o,intersectsRange:(P,M)=>{for(let b=P,I=P+M;b<I;b++){const L=E.resolveTriangleIndex(b);Mt(p,3*L,h,c),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let O=_,C=_+T;O<C;O++){const B=n.resolveTriangleIndex(O);Mt(f,3*B,u,l),f.needsUpdate=!0;const N=f.distanceToTriangle(p,v,m);if(N<y&&(x.copy(v),d&&d.copy(m),y=N,g=O,S=b),N<s)return!0}}}})}else{const E=ui(e);for(let P=0,M=E;P<M;P++){Mt(p,3*P,h,c),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let b=_,I=_+T;b<I;b++){const L=n.resolveTriangleIndex(b);Mt(f,3*L,u,l),f.needsUpdate=!0;const O=f.distanceToTriangle(p,v,m);if(O<y&&(x.copy(v),d&&d.copy(m),y=O,g=b,S=P),O<s)return!0}}}}}),ln.releasePrimitive(f),ln.releasePrimitive(p),y===1/0?null:(i.point?i.point.copy(x):i.point=x.clone(),i.distance=y,i.faceIndex=g,r&&(r.point?r.point.copy(d):r.point=d.clone(),r.point.applyMatrix4(ws),x.applyMatrix4(ws),r.distance=x.sub(r.point).length(),r.faceIndex=S),i)}function wS(){return typeof SharedArrayBuffer<"u"}const Nr=new ot.constructor,Ys=new ot.constructor,ti=new Wo(()=>new Vt),rr=new Vt,sr=new Vt,Za=new Vt,ja=new Vt;let Qa=!1;function AS(n,e,t,i){if(Qa)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Qa=!0;const r=n._roots,s=e._roots;let o,a=0,l=0;const u=new Pe().copy(t).invert();for(let c=0,h=r.length;c<h;c++){Nr.setBuffer(r[c]),l=0;const f=ti.getPrimitive();pt(0,Nr.float32Array,f),f.applyMatrix4(u);for(let p=0,v=s.length;p<v&&(Ys.setBuffer(s[p]),o=mn(0,0,t,u,i,a,l,0,0,f),Ys.clearBuffer(),l+=s[p].length,!o);p++);if(ti.releasePrimitive(f),Nr.clearBuffer(),a+=r[c].length,o)break}return Qa=!1,o}function mn(n,e,t,i,r,s=0,o=0,a=0,l=0,u=null,c=!1){let h,f;c?(h=Ys,f=Nr):(h=Nr,f=Ys);const p=h.float32Array,v=h.uint32Array,x=h.uint16Array,m=f.float32Array,d=f.uint32Array,y=f.uint16Array,g=n*2,S=e*2,_=Xt(g,x),T=Xt(S,y);let E=!1;if(T&&_)c?E=r(Qt(e,d),sn(e*2,y),Qt(n,v),sn(n*2,x),l,o+e,a,s+n):E=r(Qt(n,v),sn(n*2,x),Qt(e,d),sn(e*2,y),a,s+n,l,o+e);else if(T){const P=ti.getPrimitive();pt(e,m,P),P.applyMatrix4(t);const M=an(n),b=on(n,v);pt(M,p,rr),pt(b,p,sr);const I=P.intersectsBox(rr),L=P.intersectsBox(sr);E=I&&mn(e,M,i,t,r,o,s,l,a+1,P,!c)||L&&mn(e,b,i,t,r,o,s,l,a+1,P,!c),ti.releasePrimitive(P)}else{const P=an(e),M=on(e,d);pt(P,m,Za),pt(M,m,ja);const b=u.intersectsBox(Za),I=u.intersectsBox(ja);if(b&&I)E=mn(n,P,t,i,r,s,o,a,l+1,u,c)||mn(n,M,t,i,r,s,o,a,l+1,u,c);else if(b)if(_)E=mn(n,P,t,i,r,s,o,a,l+1,u,c);else{const L=ti.getPrimitive();L.copy(Za).applyMatrix4(t);const O=an(n),C=on(n,v);pt(O,p,rr),pt(C,p,sr);const B=L.intersectsBox(rr),N=L.intersectsBox(sr);E=B&&mn(P,O,i,t,r,o,s,l,a+1,L,!c)||N&&mn(P,C,i,t,r,o,s,l,a+1,L,!c),ti.releasePrimitive(L)}else if(I)if(_)E=mn(n,M,t,i,r,s,o,a,l+1,u,c);else{const L=ti.getPrimitive();L.copy(ja).applyMatrix4(t);const O=an(n),C=on(n,v);pt(O,p,rr),pt(C,p,sr);const B=L.intersectsBox(rr),N=L.intersectsBox(sr);E=B&&mn(M,O,i,t,r,o,s,l,a+1,L,!c)||N&&mn(M,C,i,t,r,o,s,l,a+1,L,!c),ti.releasePrimitive(L)}}return E}const As=new kt,Wc=new Vt,RS={strategy:eh,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class Xo{static serialize(e,t={}){t={cloneBuffers:!0,...t};const i=e.geometry,r=e._roots,s=e._indirectBuffer,o=i.getIndex();let a;return t.cloneBuffers?a={roots:r.map(l=>l.slice()),index:o?o.array.slice():null,indirectBuffer:s?s.slice():null}:a={roots:r,index:o?o.array:null,indirectBuffer:s},a}static deserialize(e,t,i={}){i={setIndex:!0,indirect:!!e.indirectBuffer,...i};const{index:r,roots:s,indirectBuffer:o}=e,a=new Xo(t,{...i,[ka]:!0});if(a._roots=s,a._indirectBuffer=o||null,i.setIndex){const l=t.getIndex();if(l===null){const u=new ht(e.index,1,!1);t.setIndex(u)}else l.array!==r&&(l.array.set(r),l.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...RS,[ka]:!1},t),t.useSharedArrayBuffer&&!wS())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[ka]||(kx(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new Vt))),this.resolveTriangleIndex=t.indirect?i=>this._indirectBuffer[i]:i=>i}refit(e=null){return(this.indirect?gS:iS)(this,e)}traverse(e,t=0){const i=this._roots[t],r=new Uint32Array(i),s=new Uint16Array(i);o(0);function o(a,l=0){const u=a*2,c=s[u+15]===na;if(c){const h=r[a+6],f=s[u+14];e(l,c,new Float32Array(i,a*4,6),h,f)}else{const h=a+Ur/4,f=r[a+6],p=r[a+7];e(l,c,new Float32Array(i,a*4,6),p)||(o(h,l+1),o(f,l+1))}}}raycast(e,t=Sn,i=0,r=1/0){const s=this._roots,o=this.geometry,a=[],l=t.isMaterial,u=Array.isArray(t),c=o.groups,h=l?t.side:t,f=this.indirect?vS:oS;for(let p=0,v=s.length;p<v;p++){const x=u?t[c[p].materialIndex].side:h,m=a.length;if(f(this,p,x,e,a,i,r),u){const d=c[p].materialIndex;for(let y=m,g=a.length;y<g;y++)a[y].face.materialIndex=d}}return a}raycastFirst(e,t=Sn,i=0,r=1/0){const s=this._roots,o=this.geometry,a=t.isMaterial,l=Array.isArray(t);let u=null;const c=o.groups,h=a?t.side:t,f=this.indirect?SS:cS;for(let p=0,v=s.length;p<v;p++){const x=l?t[c[p].materialIndex].side:h,m=f(this,p,x,e,i,r);m!=null&&(u==null||m.distance<u.distance)&&(u=m,l&&(m.face.materialIndex=c[p].materialIndex))}return u}intersectsGeometry(e,t){let i=!1;const r=this._roots,s=this.indirect?yS:uS;for(let o=0,a=r.length;o<a&&(i=s(this,o,e,t),!i);o++);return i}shapecast(e){const t=ln.getPrimitive(),i=this.indirect?aS:nS;let{boundsTraverseOrder:r,intersectsBounds:s,intersectsRange:o,intersectsTriangle:a}=e;if(o&&a){const h=o;o=(f,p,v,x,m)=>h(f,p,v,x,m)?!0:i(f,p,this,a,v,x,t)}else o||(a?o=(h,f,p,v)=>i(h,f,this,a,p,v,t):o=(h,f,p)=>p);let l=!1,u=0;const c=this._roots;for(let h=0,f=c.length;h<f;h++){const p=c[h];if(l=Zx(this,h,s,o,r,u),l)break;u+=p.byteLength}return ln.releasePrimitive(t),l}bvhcast(e,t,i){let{intersectsRanges:r,intersectsTriangles:s}=i;const o=ln.getPrimitive(),a=this.geometry.index,l=this.geometry.attributes.position,u=this.indirect?v=>{const x=this.resolveTriangleIndex(v);Mt(o,x*3,a,l)}:v=>{Mt(o,v*3,a,l)},c=ln.getPrimitive(),h=e.geometry.index,f=e.geometry.attributes.position,p=e.indirect?v=>{const x=e.resolveTriangleIndex(v);Mt(c,x*3,h,f)}:v=>{Mt(c,v*3,h,f)};if(s){const v=(x,m,d,y,g,S,_,T)=>{for(let E=d,P=d+y;E<P;E++){p(E),c.a.applyMatrix4(t),c.b.applyMatrix4(t),c.c.applyMatrix4(t),c.needsUpdate=!0;for(let M=x,b=x+m;M<b;M++)if(u(M),o.needsUpdate=!0,s(o,c,M,E,g,S,_,T))return!0}return!1};if(r){const x=r;r=function(m,d,y,g,S,_,T,E){return x(m,d,y,g,S,_,T,E)?!0:v(m,d,y,g,S,_,T,E)}}else r=v}return AS(this,e,t,r)}intersectsBox(e,t){return As.set(e.min,e.max,t),As.needsUpdate=!0,this.shapecast({intersectsBounds:i=>As.intersectsBox(i),intersectsTriangle:i=>As.intersectsTriangle(i)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,i={},r={},s=0,o=1/0){return(this.indirect?bS:mS)(this,e,t,i,r,s,o)}closestPointToPoint(e,t={},i=0,r=1/0){return jx(this,e,t,i,r)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(i=>{pt(0,new Float32Array(i),Wc),e.union(Wc)}),e}}const ah=1e-6,CS=ah*.5,oh=Math.pow(10,-Math.log10(ah)),PS=CS*oh;function wn(n){return~~(n*oh+PS)}function DS(n){return`${wn(n.x)},${wn(n.y)}`}function Xc(n){return`${wn(n.x)},${wn(n.y)},${wn(n.z)}`}function LS(n){return`${wn(n.x)},${wn(n.y)},${wn(n.z)},${wn(n.w)}`}function IS(n,e,t){t.direction.subVectors(e,n).normalize();const i=n.dot(t.direction);return t.origin.copy(n).addScaledVector(t.direction,-i),t}function lh(){return typeof SharedArrayBuffer<"u"}function US(n){if(n.buffer instanceof SharedArrayBuffer)return n;const e=n.constructor,t=n.buffer,i=new SharedArrayBuffer(t.byteLength),r=new Uint8Array(t);return new Uint8Array(i).set(r,0),new e(i)}function NS(n,e=ArrayBuffer){return n>65535?new Uint32Array(new e(4*n)):new Uint16Array(new e(2*n))}function FS(n,e){if(!n.index){const t=n.attributes.position.count,i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=NS(t,i);n.setIndex(new ht(r,1));for(let s=0;s<t;s++)r[s]=s}}function BS(n){return n.index?n.index.count:n.attributes.position.count}function Yo(n){return BS(n)/3}const OS=1e-8,zS=new U;function HS(n){return~~(n/3)}function GS(n){return n%3}function Yc(n,e){return n.start-e.start}function qc(n,e){return zS.subVectors(e,n.origin).dot(n.direction)}function VS(n,e,t,i=OS){n.sort(Yc),e.sort(Yc);for(let a=0;a<n.length;a++){const l=n[a];for(let u=0;u<e.length;u++){const c=e[u];if(!(c.start>l.end)){if(l.end<c.start||c.end<l.start)continue;if(l.start<=c.start&&l.end>=c.end)s(c.end,l.end)||n.splice(a+1,0,{start:c.end,end:l.end,index:l.index}),l.end=c.start,c.start=0,c.end=0;else if(l.start>=c.start&&l.end<=c.end)s(l.end,c.end)||e.splice(u+1,0,{start:l.end,end:c.end,index:c.index}),c.end=l.start,l.start=0,l.end=0;else if(l.start<=c.start&&l.end<=c.end){const h=l.end;l.end=c.start,c.start=h}else if(l.start>=c.start&&l.end>=c.end){const h=c.end;c.end=l.start,l.start=h}else throw new Error}if(t.has(l.index)||t.set(l.index,[]),t.has(c.index)||t.set(c.index,[]),t.get(l.index).push(c.index),t.get(c.index).push(l.index),o(c)&&(e.splice(u,1),u--),o(l)){n.splice(a,1),a--;break}}}r(n),r(e);function r(a){for(let l=0;l<a.length;l++)o(a[l])&&(a.splice(l,1),l--)}function s(a,l){return Math.abs(l-a)<i}function o(a){return Math.abs(a.end-a.start)<i}}const Kc=1e-5,Zc=1e-4;class kS{constructor(){this._rays=[]}addRay(e){this._rays.push(e)}findClosestRay(e){const t=this._rays,i=e.clone();i.direction.multiplyScalar(-1);let r=1/0,s=null;for(let l=0,u=t.length;l<u;l++){const c=t[l];if(o(c,e)&&o(c,i))continue;const h=a(c,e),f=a(c,i),p=Math.min(h,f);p<r&&(r=p,s=c)}return s;function o(l,u){const c=l.origin.distanceTo(u.origin)>Kc;return l.direction.angleTo(u.direction)>Zc||c}function a(l,u){const c=l.origin.distanceTo(u.origin),h=l.direction.angleTo(u.direction);return c/Kc+h/Zc}}}const Ja=new U,$a=new U,Rs=new Qs;function WS(n,e,t){const i=n.attributes,r=n.index,s=i.position,o=new Map,a=new Map,l=Array.from(e),u=new kS;for(let c=0,h=l.length;c<h;c++){const f=l[c],p=HS(f),v=GS(f);let x=3*p+v,m=3*p+(v+1)%3;r&&(x=r.getX(x),m=r.getX(m)),Ja.fromBufferAttribute(s,x),$a.fromBufferAttribute(s,m),IS(Ja,$a,Rs);let d,y=u.findClosestRay(Rs);y===null&&(y=Rs.clone(),u.addRay(y)),a.has(y)||a.set(y,{forward:[],reverse:[],ray:y}),d=a.get(y);let g=qc(y,Ja),S=qc(y,$a);g>S&&([g,S]=[S,g]),Rs.direction.dot(y.direction)<0?d.reverse.push({start:g,end:S,index:f}):d.forward.push({start:g,end:S,index:f})}return a.forEach(({forward:c,reverse:h},f)=>{VS(c,h,o,t),c.length===0&&h.length===0&&a.delete(f)}),{disjointConnectivityMap:o,fragmentMap:a}}const XS=new le,eo=new U,YS=new tt,to=["","",""];class qS{constructor(e=null){this.data=null,this.disjointConnections=null,this.unmatchedDisjointEdges=null,this.unmatchedEdges=-1,this.matchedEdges=-1,this.useDrawRange=!0,this.useAllAttributes=!1,this.matchDisjointEdges=!1,this.degenerateEpsilon=1e-8,e&&this.updateFrom(e)}getSiblingTriangleIndex(e,t){const i=this.data[e*3+t];return i===-1?-1:~~(i/3)}getSiblingEdgeIndex(e,t){const i=this.data[e*3+t];return i===-1?-1:i%3}getDisjointSiblingTriangleIndices(e,t){const i=e*3+t,r=this.disjointConnections.get(i);return r?r.map(s=>~~(s/3)):[]}getDisjointSiblingEdgeIndices(e,t){const i=e*3+t,r=this.disjointConnections.get(i);return r?r.map(s=>s%3):[]}isFullyConnected(){return this.unmatchedEdges===0}updateFrom(e){const{useAllAttributes:t,useDrawRange:i,matchDisjointEdges:r,degenerateEpsilon:s}=this,o=t?g:y,a=new Map,{attributes:l}=e,u=t?Object.keys(l):null,c=e.index,h=l.position;let f=Yo(e);const p=f;let v=0;i&&(v=e.drawRange.start,e.drawRange.count!==1/0&&(f=~~(e.drawRange.count/3)));let x=this.data;(!x||x.length<3*p)&&(x=new Int32Array(3*p)),x.fill(-1);let m=0,d=new Set;for(let S=v,_=f*3+v;S<_;S+=3){const T=S;for(let E=0;E<3;E++){let P=T+E;c&&(P=c.getX(P)),to[E]=o(P)}for(let E=0;E<3;E++){const P=(E+1)%3,M=to[E],b=to[P],I=`${b}_${M}`;if(a.has(I)){const L=T+E,O=a.get(I);x[L]=O,x[O]=L,a.delete(I),m+=2,d.delete(O)}else{const L=`${M}_${b}`,O=T+E;a.set(L,O),d.add(O)}}}if(r){const{fragmentMap:S,disjointConnectivityMap:_}=WS(e,d,s);d.clear(),S.forEach(({forward:T,reverse:E})=>{T.forEach(({index:P})=>d.add(P)),E.forEach(({index:P})=>d.add(P))}),this.unmatchedDisjointEdges=S,this.disjointConnections=_,m=f*3-d.size}this.matchedEdges=m,this.unmatchedEdges=d.size,this.data=x;function y(S){return eo.fromBufferAttribute(h,S),Xc(eo)}function g(S){let _="";for(let T=0,E=u.length;T<E;T++){const P=l[u[T]];let M;switch(P.itemSize){case 1:M=wn(P.getX(S));break;case 2:M=DS(XS.fromBufferAttribute(P,S));break;case 3:M=Xc(eo.fromBufferAttribute(P,S));break;case 4:M=LS(YS.fromBufferAttribute(P,S));break}_!==""&&(_+="|"),_+=M}return _}}}class Fr extends $e{constructor(...e){super(...e),this.isBrush=!0,this._previousMatrix=new Pe,this._previousMatrix.elements.fill(0)}markUpdated(){this._previousMatrix.copy(this.matrix)}isDirty(){const{matrix:e,_previousMatrix:t}=this,i=e.elements,r=t.elements;for(let s=0;s<16;s++)if(i[s]!==r[s])return!0;return!1}prepareGeometry(){const e=this.geometry,t=e.attributes,i=lh();if(i)for(const r in t){const s=t[r];if(s.isInterleavedBufferAttribute)throw new Error("Brush: InterleavedBufferAttributes are not supported.");s.array=US(s.array)}if(e.boundsTree||(FS(e,{useSharedArrayBuffer:i}),e.boundsTree=new Xo(e,{maxLeafTris:3,indirect:!0,useSharedArrayBuffer:i})),e.halfEdges||(e.halfEdges=new qS(e)),!e.groupIndices){const r=Yo(e),s=new Uint16Array(r),o=e.groups;for(let a=0,l=o.length;a<l;a++){const{start:u,count:c}=o[a];for(let h=u/3,f=(u+c)/3;h<f;h++)s[h]=a}e.groupIndices=s}}disposeCacheData(){const{geometry:e}=this;e.halfEdges=null,e.boundsTree=null,e.groupIndices=null}}const KS=1e-14,no=new U,jc=new U,Qc=new U;function ni(n,e=KS){no.subVectors(n.b,n.a),jc.subVectors(n.c,n.a),Qc.subVectors(n.b,n.c);const t=no.angleTo(jc),i=no.angleTo(Qc),r=Math.PI-t-i;return Math.abs(t)<e||Math.abs(i)<e||Math.abs(r)<e||n.a.distanceToSquared(n.b)<e||n.a.distanceToSquared(n.c)<e||n.b.distanceToSquared(n.c)<e}const io=1e-10,Pr=1e-10,ZS=1e-10,Un=new cn,vt=new cn,Nn=new U,ro=new U,Jc=new U,Cs=new gn,so=new un;class jS{constructor(){this._pool=[],this._index=0}getTriangle(){return this._index>=this._pool.length&&this._pool.push(new at),this._pool[this._index++]}clear(){this._index=0}reset(){this._pool.length=0,this._index=0}}class QS{constructor(){this.trianglePool=new jS,this.triangles=[],this.normal=new U,this.coplanarTriangleUsed=!1}initialize(e){this.reset();const{triangles:t,trianglePool:i,normal:r}=this;if(Array.isArray(e))for(let s=0,o=e.length;s<o;s++){const a=e[s];if(s===0)a.getNormal(r);else if(Math.abs(1-a.getNormal(Nn).dot(r))>io)throw new Error("Triangle Splitter: Cannot initialize with triangles that have different normals.");const l=i.getTriangle();l.copy(a),t.push(l)}else{e.getNormal(r);const s=i.getTriangle();s.copy(e),t.push(s)}}splitByTriangle(e){const{normal:t,triangles:i}=this;if(e.getNormal(ro).normalize(),Math.abs(1-Math.abs(ro.dot(t)))<ZS){this.coplanarTriangleUsed=!0;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.coplanarCount=0}const r=[e.a,e.b,e.c];for(let s=0;s<3;s++){const o=(s+1)%3,a=r[s],l=r[o];Nn.subVectors(l,a).normalize(),Jc.crossVectors(ro,Nn),Cs.setFromNormalAndCoplanarPoint(Jc,a),this.splitByPlane(Cs,e)}}else e.getPlane(Cs),this.splitByPlane(Cs,e)}splitByPlane(e,t){const{triangles:i,trianglePool:r}=this;so.copy(t),so.needsUpdate=!0;for(let s=0,o=i.length;s<o;s++){const a=i[s];if(!so.intersectsTriangle(a,Un,!0))continue;const{a:l,b:u,c}=a;let h=0,f=-1,p=!1,v=[],x=[];const m=[l,u,c];for(let d=0;d<3;d++){const y=(d+1)%3;Un.start.copy(m[d]),Un.end.copy(m[y]);const g=e.distanceToPoint(Un.start),S=e.distanceToPoint(Un.end);if(Math.abs(g)<Pr&&Math.abs(S)<Pr){p=!0;break}if(g>0?v.push(d):x.push(d),Math.abs(g)<Pr)continue;let _=!!e.intersectLine(Un,Nn);!_&&Math.abs(S)<Pr&&(Nn.copy(Un.end),_=!0),_&&!(Nn.distanceTo(Un.start)<io)&&(Nn.distanceTo(Un.end)<io&&(f=d),h===0?vt.start.copy(Nn):vt.end.copy(Nn),h++)}if(!p&&h===2&&vt.distance()>Pr)if(f!==-1){f=(f+1)%3;let d=0;d===f&&(d=(d+1)%3);let y=d+1;y===f&&(y=(y+1)%3);const g=r.getTriangle();g.a.copy(m[y]),g.b.copy(vt.end),g.c.copy(vt.start),ni(g)||i.push(g),a.a.copy(m[d]),a.b.copy(vt.start),a.c.copy(vt.end),ni(a)&&(i.splice(s,1),s--,o--)}else{const d=v.length>=2?x[0]:v[0];if(d===0){let T=vt.start;vt.start=vt.end,vt.end=T}const y=(d+1)%3,g=(d+2)%3,S=r.getTriangle(),_=r.getTriangle();m[y].distanceToSquared(vt.start)<m[g].distanceToSquared(vt.end)?(S.a.copy(m[y]),S.b.copy(vt.start),S.c.copy(vt.end),_.a.copy(m[y]),_.b.copy(m[g]),_.c.copy(vt.start)):(S.a.copy(m[g]),S.b.copy(vt.start),S.c.copy(vt.end),_.a.copy(m[y]),_.b.copy(m[g]),_.c.copy(vt.end)),a.a.copy(m[d]),a.b.copy(vt.end),a.c.copy(vt.start),ni(S)||i.push(S),ni(_)||i.push(_),ni(a)&&(i.splice(s,1),s--,o--)}else h===3&&console.warn("TriangleClipper: Coplanar clip not handled")}}reset(){this.triangles.length=0,this.trianglePool.clear(),this.coplanarTriangleUsed=!1}}function JS(n){return n=~~n,n+4-n%4}class $c{constructor(e,t=500){this.expansionFactor=1.5,this.type=e,this.length=0,this.array=null,this.setSize(t)}setType(e){if(this.length!==0)throw new Error("TypeBackedArray: Cannot change the type while there is used data in the buffer.");const t=this.array.buffer;this.array=new e(t),this.type=e}setSize(e){if(this.array&&e===this.array.length)return;const t=this.type,i=lh()?SharedArrayBuffer:ArrayBuffer,r=new t(new i(JS(e*t.BYTES_PER_ELEMENT)));this.array&&r.set(this.array,0),this.array=r}expand(){const{array:e,expansionFactor:t}=this;this.setSize(e.length*t)}push(...e){let{array:t,length:i}=this;i+e.length>t.length&&(this.expand(),t=this.array);for(let r=0,s=e.length;r<s;r++)t[i+r]=e[r];this.length+=e.length}clear(){this.length=0}}class $S{constructor(){this.groupAttributes=[{}],this.groupCount=0}getType(e){return this.groupAttributes[0][e].type}getItemSize(e){return this.groupAttributes[0][e].itemSize}getNormalized(e){return this.groupAttributes[0][e].normalized}getCount(e){if(this.groupCount<=e)return 0;const t=this.getGroupAttrArray("position",e);return t.length/t.itemSize}getTotalLength(e){const{groupCount:t,groupAttributes:i}=this;let r=0;for(let s=0;s<t;s++){const o=i[s];r+=o[e].length}return r}getGroupAttrSet(e=0){const{groupAttributes:t}=this;if(t[e])return this.groupCount=Math.max(this.groupCount,e+1),t[e];const i=t[0];for(this.groupCount=Math.max(this.groupCount,e+1);e>=t.length;){const r={};t.push(r);for(const s in i){const o=i[s],a=new $c(o.type);a.itemSize=o.itemSize,a.normalized=o.normalized,r[s]=a}}return t[e]}getGroupAttrArray(e,t=0){const{groupAttributes:i}=this;if(!i[0][e])throw new Error(`TypedAttributeData: Attribute with "${e}" has not been initialized`);return this.getGroupAttrSet(t)[e]}initializeArray(e,t,i,r){const{groupAttributes:s}=this,a=s[0][e];if(a){if(a.type!==t)for(let l=0,u=s.length;l<u;l++){const c=s[l][e];c.setType(t),c.itemSize=i,c.normalized=r}}else for(let l=0,u=s.length;l<u;l++){const c=new $c(t);c.itemSize=i,c.normalized=r,s[l][e]=c}}clear(){this.groupCount=0;const{groupAttributes:e}=this;e.forEach(t=>{for(const i in t)t[i].clear()})}delete(e){this.groupAttributes.forEach(t=>{delete t[e]})}reset(){this.groupAttributes=[],this.groupCount=0}}class eu{constructor(){this.intersectionSet={},this.ids=[]}add(e,t){const{intersectionSet:i,ids:r}=this;i[e]||(i[e]=[],r.push(e)),i[e].push(t)}}const Lr=0,ch=1,ey=2,ty=3,ny=4,uh=5,hh=6,rn=new Qs,tu=new Pe,Ot=new at,Fn=new U,nu=new tt,iu=new tt,ru=new tt,ao=new tt,Ps=new tt,Ds=new tt,su=new cn,oo=new U,lo=1e-8,iy=1e-15,wi=-1,Ai=1,Bs=-2,Os=2,Br=0,Mi=1,qo=2,ry=1e-14;let zs=null;function au(n){zs=n}function fh(n,e){n.getMidpoint(rn.origin),n.getNormal(rn.direction);const t=e.raycastFirst(rn,At);return!!(t&&rn.direction.dot(t.face.normal)>0)?wi:Ai}function sy(n,e){function t(){return Math.random()-.5}n.getNormal(oo),rn.direction.copy(oo),n.getMidpoint(rn.origin);const i=3;let r=0,s=1/0;for(let o=0;o<i;o++){rn.direction.x+=t()*lo,rn.direction.y+=t()*lo,rn.direction.z+=t()*lo,rn.direction.multiplyScalar(-1);const a=e.raycastFirst(rn,At);if(!!(a&&rn.direction.dot(a.face.normal)>0)&&r++,a!==null&&(s=Math.min(s,a.distance)),s<=iy)return a.face.normal.dot(oo)>0?Os:Bs;if(r/i>.5||(o-r+1)/i>.5)break}return r/i>.5?wi:Ai}function ay(n,e){const t=new eu,i=new eu;return tu.copy(n.matrixWorld).invert().multiply(e.matrixWorld),n.geometry.boundsTree.bvhcast(e.geometry.boundsTree,tu,{intersectsTriangles(r,s,o,a){if(!ni(r)&&!ni(s)){let l=r.intersectsTriangle(s,su,!0);if(!l){const u=r.plane,c=s.plane,h=u.normal,f=c.normal;h.dot(f)===1&&Math.abs(u.constant-c.constant)<ry&&(l=!0)}if(l){let u=n.geometry.boundsTree.resolveTriangleIndex(o),c=e.geometry.boundsTree.resolveTriangleIndex(a);t.add(u,c),i.add(c,u),zs&&(zs.addEdge(su),zs.addIntersectingTriangles(o,r,a,s))}}return!1}}),{aIntersections:t,bIntersections:i}}function oy(n,e,t,i,r,s,o=!1){const a=t.attributes,l=t.index,u=n*3,c=l.getX(u+0),h=l.getX(u+1),f=l.getX(u+2);for(const p in s){const v=a[p],x=s[p];if(!(p in a))throw new Error(`CSG Operations: Attribute ${p} not available on geometry.`);const m=v.itemSize;p==="position"?(Ot.a.fromBufferAttribute(v,c).applyMatrix4(i),Ot.b.fromBufferAttribute(v,h).applyMatrix4(i),Ot.c.fromBufferAttribute(v,f).applyMatrix4(i),co(Ot.a,Ot.b,Ot.c,e,3,x,o)):p==="normal"?(Ot.a.fromBufferAttribute(v,c).applyNormalMatrix(r),Ot.b.fromBufferAttribute(v,h).applyNormalMatrix(r),Ot.c.fromBufferAttribute(v,f).applyNormalMatrix(r),o&&(Ot.a.multiplyScalar(-1),Ot.b.multiplyScalar(-1),Ot.c.multiplyScalar(-1)),co(Ot.a,Ot.b,Ot.c,e,3,x,o,!0)):(nu.fromBufferAttribute(v,c),iu.fromBufferAttribute(v,h),ru.fromBufferAttribute(v,f),co(nu,iu,ru,e,m,x,o))}}function ly(n,e,t,i,r,s,o,a=!1){uo(n,i,r,s,o,a),uo(a?t:e,i,r,s,o,a),uo(a?e:t,i,r,s,o,a)}function dh(n,e,t=!1){switch(n){case Lr:if(e===Ai||e===Os&&!t)return Mi;break;case ch:if(t){if(e===wi)return Br}else if(e===Ai||e===Bs)return Mi;break;case ey:if(t){if(e===Ai||e===Bs)return Mi}else if(e===wi)return Br;break;case ny:if(e===wi)return Br;if(e===Ai)return Mi;break;case ty:if(e===wi||e===Os&&!t)return Mi;break;case uh:if(!t&&(e===Ai||e===Bs))return Mi;break;case hh:if(!t&&(e===wi||e===Os))return Mi;break;default:throw new Error(`Unrecognized CSG operation enum "${n}".`)}return qo}function co(n,e,t,i,r,s,o=!1,a=!1){const l=u=>{s.push(u.x),r>1&&s.push(u.y),r>2&&s.push(u.z),r>3&&s.push(u.w)};ao.set(0,0,0,0).addScaledVector(n,i.a.x).addScaledVector(e,i.a.y).addScaledVector(t,i.a.z),Ps.set(0,0,0,0).addScaledVector(n,i.b.x).addScaledVector(e,i.b.y).addScaledVector(t,i.b.z),Ds.set(0,0,0,0).addScaledVector(n,i.c.x).addScaledVector(e,i.c.y).addScaledVector(t,i.c.z),a&&(ao.normalize(),Ps.normalize(),Ds.normalize()),l(ao),o?(l(Ds),l(Ps)):(l(Ps),l(Ds))}function uo(n,e,t,i,r,s=!1){for(const o in r){const a=e[o],l=r[o];if(!(o in e))throw new Error(`CSG Operations: Attribute ${o} no available on geometry.`);const u=a.itemSize;o==="position"?(Fn.fromBufferAttribute(a,n).applyMatrix4(t),l.push(Fn.x,Fn.y,Fn.z)):o==="normal"?(Fn.fromBufferAttribute(a,n).applyNormalMatrix(i),s&&Fn.multiplyScalar(-1),l.push(Fn.x,Fn.y,Fn.z)):(l.push(a.getX(n)),u>1&&l.push(a.getY(n)),u>2&&l.push(a.getZ(n)),u>3&&l.push(a.getW(n)))}}class cy{constructor(e){this.triangle=new at().copy(e),this.intersects={}}addTriangle(e,t){this.intersects[e]=new at().copy(t)}getIntersectArray(){const e=[],{intersects:t}=this;for(const i in t)e.push(t[i]);return e}}class ou{constructor(){this.data={}}addTriangleIntersection(e,t,i,r){const{data:s}=this;s[e]||(s[e]=new cy(t)),s[e].addTriangle(i,r)}getTrianglesAsArray(e=null){const{data:t}=this,i=[];if(e!==null)e in t&&i.push(t[e].triangle);else for(const r in t)i.push(t[r].triangle);return i}getTriangleIndices(){return Object.keys(this.data).map(e=>parseInt(e))}getIntersectionIndices(e){const{data:t}=this;return t[e]?Object.keys(t[e].intersects).map(i=>parseInt(i)):[]}getIntersectionsAsArray(e=null,t=null){const{data:i}=this,r=new Set,s=[],o=a=>{if(i[a])if(t!==null)i[a].intersects[t]&&s.push(i[a].intersects[t]);else{const l=i[a].intersects;for(const u in l)r.has(u)||(r.add(u),s.push(l[u]))}};if(e!==null)o(e);else for(const a in i)o(a);return s}reset(){this.data={}}}class uy{constructor(){this.enabled=!1,this.triangleIntersectsA=new ou,this.triangleIntersectsB=new ou,this.intersectionEdges=[]}addIntersectingTriangles(e,t,i,r){const{triangleIntersectsA:s,triangleIntersectsB:o}=this;s.addTriangleIntersection(e,t,i,r),o.addTriangleIntersection(i,r,e,t)}addEdge(e){this.intersectionEdges.push(e.clone())}reset(){this.triangleIntersectsA.reset(),this.triangleIntersectsB.reset(),this.intersectionEdges=[]}init(){this.enabled&&(this.reset(),au(this))}complete(){this.enabled&&au(null)}}const ri=new Pe,qs=new ke,_i=new at,Ls=new at,$n=new at,Is=new at,xn=[],Li=[];function hy(n){for(const e of n)return e}function fy(n,e,t,i,r,s={}){const{useGroups:o=!0}=s,{aIntersections:a,bIntersections:l}=ay(n,e),u=[];let c=null,h;return h=o?0:-1,lu(n,e,a,t,!1,i,r,h),cu(n,e,a,t,!1,r,h),t.findIndex(p=>p!==hh&&p!==uh)!==-1&&(h=o?n.geometry.groups.length||1:-1,lu(e,n,l,t,!0,i,r,h),cu(e,n,l,t,!0,r,h)),xn.length=0,Li.length=0,{groups:u,materials:c}}function lu(n,e,t,i,r,s,o,a=0){const l=n.matrixWorld.determinant()<0;ri.copy(e.matrixWorld).invert().multiply(n.matrixWorld),qs.getNormalMatrix(n.matrixWorld).multiplyScalar(l?-1:1);const u=n.geometry.groupIndices,c=n.geometry.index,h=n.geometry.attributes.position,f=e.geometry.boundsTree,p=e.geometry.index,v=e.geometry.attributes.position,x=t.ids,m=t.intersectionSet;for(let d=0,y=x.length;d<y;d++){const g=x[d],S=a===-1?0:u[g]+a,_=3*g,T=c.getX(_+0),E=c.getX(_+1),P=c.getX(_+2);_i.a.fromBufferAttribute(h,T).applyMatrix4(ri),_i.b.fromBufferAttribute(h,E).applyMatrix4(ri),_i.c.fromBufferAttribute(h,P).applyMatrix4(ri),s.reset(),s.initialize(_i);const M=m[g];for(let I=0,L=M.length;I<L;I++){const O=3*M[I],C=p.getX(O+0),B=p.getX(O+1),N=p.getX(O+2);Ls.a.fromBufferAttribute(v,C),Ls.b.fromBufferAttribute(v,B),Ls.c.fromBufferAttribute(v,N),s.splitByTriangle(Ls)}const b=s.triangles;for(let I=0,L=b.length;I<L;I++){const O=b[I],C=s.coplanarTriangleUsed?sy(O,f):fh(O,f);xn.length=0,Li.length=0;for(let B=0,N=i.length;B<N;B++){const k=dh(i[B],C,r);k!==qo&&(Li.push(k),xn.push(o[B].getGroupAttrSet(S)))}if(xn.length!==0){_i.getBarycoord(O.a,Is.a),_i.getBarycoord(O.b,Is.b),_i.getBarycoord(O.c,Is.c);for(let B=0,N=xn.length;B<N;B++){const k=xn[B],K=Li[B]===Br;oy(g,Is,n.geometry,n.matrixWorld,qs,k,l!==K)}}}}return x.length}function cu(n,e,t,i,r,s,o=0){const a=n.matrixWorld.determinant()<0;ri.copy(e.matrixWorld).invert().multiply(n.matrixWorld),qs.getNormalMatrix(n.matrixWorld).multiplyScalar(a?-1:1);const l=e.geometry.boundsTree,u=n.geometry.groupIndices,c=n.geometry.index,h=n.geometry.attributes,f=h.position,p=[],v=n.geometry.halfEdges,x=new Set,m=Yo(n.geometry);for(let d=0,y=m;d<y;d++)d in t.intersectionSet||x.add(d);for(;x.size>0;){const d=hy(x);x.delete(d),p.push(d);const y=3*d,g=c.getX(y+0),S=c.getX(y+1),_=c.getX(y+2);$n.a.fromBufferAttribute(f,g).applyMatrix4(ri),$n.b.fromBufferAttribute(f,S).applyMatrix4(ri),$n.c.fromBufferAttribute(f,_).applyMatrix4(ri);const T=fh($n,l);Li.length=0,xn.length=0;for(let E=0,P=i.length;E<P;E++){const M=dh(i[E],T,r);M!==qo&&(Li.push(M),xn.push(s[E]))}for(;p.length>0;){const E=p.pop();for(let P=0;P<3;P++){const M=v.getSiblingTriangleIndex(E,P);M!==-1&&x.has(M)&&(p.push(M),x.delete(M))}if(xn.length!==0){const P=3*E,M=c.getX(P+0),b=c.getX(P+1),I=c.getX(P+2),L=o===-1?0:u[E]+o;if($n.a.fromBufferAttribute(f,M),$n.b.fromBufferAttribute(f,b),$n.c.fromBufferAttribute(f,I),!ni($n))for(let O=0,C=xn.length;O<C;O++){const B=Li[O],N=xn[O].getGroupAttrSet(L),k=B===Br;ly(M,b,I,h,n.matrixWorld,qs,N,k!==a)}}}}}function dy(n){for(let e=0;e<n.length-1;e++){const t=n[e],i=n[e+1];if(t.materialIndex===i.materialIndex){const r=t.start,s=i.start+i.count;i.start=r,i.count=s-r,n.splice(e,1),e--}}}function py(n,e,t,i){t.clear();const r=n.attributes;for(let s=0,o=i.length;s<o;s++){const a=i[s],l=r[a];t.initializeArray(a,l.array.constructor,l.itemSize,l.normalized)}for(const s in t.attributes)i.includes(s)||t.delete(s);for(const s in e.attributes)i.includes(s)||(e.deleteAttribute(s),e.dispose())}function my(n,e,t){let i=!1,r=-1;const s=n.attributes,o=e.groupAttributes[0];for(const l in o){const u=e.getTotalLength(l),c=e.getType(l),h=e.getItemSize(l),f=e.getNormalized(l);let p=s[l];(!p||p.array.length<u)&&(p=new ht(new c(u),h,f),n.setAttribute(l,p),i=!0);let v=0;for(let x=0,m=Math.min(t.length,e.groupCount);x<m;x++){const d=t[x].index,{array:y,type:g,length:S}=e.groupAttributes[d][l],_=new g(y.buffer,0,S);p.array.set(_,v),v+=_.length}p.needsUpdate=!0,r=u/p.itemSize}if(n.index){const l=n.index.array;if(l.length<r)n.index=null,i=!0;else for(let u=0,c=l.length;u<c;u++)l[u]=u}let a=0;n.clearGroups();for(let l=0,u=Math.min(t.length,e.groupCount);l<u;l++){const{index:c,materialIndex:h}=t[l],f=e.getCount(c);f!==0&&(n.addGroup(a,f,h),a+=f)}n.setDrawRange(0,r),n.boundsTree=null,i&&n.dispose()}function uu(n,e){let t=e;return Array.isArray(e)||(t=[],n.forEach(i=>{t[i.materialIndex]=e})),t}class gy{constructor(){this.triangleSplitter=new QS,this.attributeData=[],this.attributes=["position","uv","normal"],this.useGroups=!0,this.consolidateGroups=!0,this.debug=new uy}getGroupRanges(e){return!this.useGroups||e.groups.length===0?[{start:0,count:1/0,materialIndex:0}]:e.groups.map(t=>({...t}))}evaluate(e,t,i,r=new Fr){let s=!0;if(Array.isArray(i)||(i=[i]),Array.isArray(r)||(r=[r],s=!1),r.length!==i.length)throw new Error("Evaluator: operations and target array passed as different sizes.");e.prepareGeometry(),t.prepareGeometry();const{triangleSplitter:o,attributeData:a,attributes:l,useGroups:u,consolidateGroups:c,debug:h}=this;for(;a.length<r.length;)a.push(new $S);r.forEach((d,y)=>{py(e.geometry,d.geometry,a[y],l)}),h.init(),fy(e,t,i,o,a,{useGroups:u}),h.complete();const f=this.getGroupRanges(e.geometry),p=uu(f,e.material),v=this.getGroupRanges(t.geometry),x=uu(v,t.material);v.forEach(d=>d.materialIndex+=p.length);let m=[...f,...v].map((d,y)=>({...d,index:y}));if(u){const d=[...p,...x];c&&(m=m.map(g=>{const S=d[g.materialIndex];return g.materialIndex=d.indexOf(S),g}).sort((g,S)=>g.materialIndex-S.materialIndex));const y=[];for(let g=0,S=d.length;g<S;g++){let _=!1;for(let T=0,E=m.length;T<E;T++){const P=m[T];P.materialIndex===g&&(_=!0,P.materialIndex=y.length)}_&&y.push(d[g])}r.forEach(g=>{g.material=y})}else m=[{start:0,count:1/0,index:0,materialIndex:0}],r.forEach(d=>{d.material=p[0]});return r.forEach((d,y)=>{const g=d.geometry;my(g,a[y],m),c&&dy(g.groups)}),s?r:r[0]}evaluateHierarchy(e,t=new Fr){e.updateMatrixWorld(!0);const i=(s,o)=>{const a=s.children;for(let l=0,u=a.length;l<u;l++){const c=a[l];c.isOperationGroup?i(c,o):o(c)}},r=s=>{const o=s.children;let a=!1;for(let u=0,c=o.length;u<c;u++){const h=o[u];a=r(h)||a}const l=s.isDirty();if(l&&s.markUpdated(),a&&!s.isOperationGroup){let u;return i(s,c=>{u?u=this.evaluate(u,c,c.operation):u=this.evaluate(s,c,c.operation)}),s._cachedGeometry=u.geometry,s._cachedMaterials=u.material,!0}else return a||l};return r(e),t.geometry=e._cachedGeometry,t.material=e._cachedMaterials,t}reset(){this.triangleSplitter.reset()}}const vy=new _x;function xy(n){const{wall:e,openings:t,task:i}=n,r=e.size.w,s=e.size.h,o=e.size.l,a=e.blockSize.l,l=e.blockSize.h,u=e.cementThickness,c=e.placement.position.x,h=e.placement.position.y,f=e.placement.position.z,p=e.placement.direction.yaw*(180/Math.PI),v=vy.generateWallGroup(r,s,o,a,l,u,c,h,f,p,i.completion);if(i.completion>=1){const d=new Tx,y=v.userData.actualWallWidth||r,g=d.createTopInfill(y,s,o,l,u);g&&v.add(g)}const x=new Ex,m=new bx;if(t&&t.length>0){const d=new gy;d.attributes=["position","normal","uv","uv2"];const y=r/2,g=s/2,S=o/2;let _=null;if(t.forEach(T=>{const E=x.createOpeningMesh(T),P=T.size.l/2,M=T.size.h/2,b=T.size.w/2,I=T.placement.position.x,L=T.placement.position.y,O=T.placement.position.z;if(Math.abs(I)<y+P&&Math.abs(L)<g+M&&Math.abs(O)<S+b){const N=new Fr(E.geometry,E.material);N.position.copy(E.position),N.rotation.copy(E.rotation),N.scale.copy(E.scale),N.updateMatrixWorld(),_?_=d.evaluate(_,N,Lr):_=d.evaluate(N,N,Lr)}else console.warn("Opening is outside wall bounds, skipping CSG operation:",T.placement.position);if(n.visualization&&n.visualization!=="none"){const N=E.clone();n.visualization==="wireframe"?N.material=new oi({color:16711680,wireframe:!0}):N.material=new oi({color:16711680,transparent:!0,opacity:.5}),v.add(N)}const B=m.createLintel(T,s,o,l,a,v.userData.actualWallHeight||s);if(B){v.add(B);const N=new Fr(B.geometry,B.material);N.position.copy(B.position),N.rotation.copy(B.rotation),N.scale.copy(B.scale),N.updateMatrixWorld(),_?_=d.evaluate(_,N,Lr):_=d.evaluate(N,N,Lr)}}),_){const T=v.getObjectByName("WallMesh");if(T)try{console.log("Starting CSG Subtraction...");const E=T.geometry.clone(),P=new Fr(T.geometry,T.material);P.updateMatrixWorld();let M;Array.isArray(T.material)&&T.material.length>0?M=T.material[0]:T.material instanceof yn?M=T.material:M=new lr({color:8947848}),_.material=M,console.log("WallBrush Attributes:",Object.keys(P.geometry.attributes)),console.log("SubtractionBrush Attributes:",Object.keys(_.geometry.attributes)),P.geometry.attributes.position||console.error("WallBrush missing position!"),_.geometry.attributes.position||console.error("SubtractionBrush missing position!");const b=d.evaluate(P,_,ch);if(console.log("CSG Subtraction complete. Result geometry groups:",b.geometry.groups),!b||!b.geometry||b.geometry.attributes.position.count===0)console.error("CSG operation resulted in empty or invalid geometry. Restoring original wall."),T.geometry.dispose(),T.geometry=E;else{const I=b.geometry.groups&&b.geometry.groups.length>=2,L=b.geometry.groups.some(O=>O.materialIndex===1&&O.count>0);I&&L?(T.geometry.dispose(),T.geometry=b.geometry,console.log("CSG result applied successfully")):(console.warn("CSG result is corrupted (missing cement material group), restoring original geometry"),b.geometry.dispose()),T.geometry!==E&&E.dispose()}}catch(E){console.error("CSG Operation failed:",E)}else console.warn("WallMesh not found for CSG")}}return v.userData={...v.userData,objectType:"MasonryWall",wall:e,openings:t,task:{completion:i.completion}},v}class hu{static generateWall(e,t,i,r,s,o,a){const l=new Mn(e,t,i),u=new oi({color:16776960,transparent:!0,opacity:.5}),c=new $e(l,u);return c.position.set(r,s,o),c.rotation.y=a,c}static attachWall(e,t,i,r,s,o,a,l){const u=this.generateWall(t,i,r,0,0,0,0);e.add(u)}static generateActualWall(e,t,i,r,s,o,a){const l=new Mn(e,t,i),u=new oi({color:65280,transparent:!0,opacity:.5}),c=new $e(l,u);return c.position.set(r,s,o),c.rotation.y=a,c}static attachActualWall(e,t,i){const r=e.userData.actualWallWidth||0,s=e.userData.actualWallHeight||0;if(console.log("attachActualWall called:",{actualWidth:r,actualHeight:s,targetHeight:t,targetLength:i,userData:e.userData}),r===0||s===0){console.warn("Skipping actual wall placeholder: dimensions are 0");return}const o=-t/2+s/2;console.log("Creating actual wall placeholder with y offset:",o);const a=this.generateActualWall(r,s,i,0,o,0,0);e.add(a)}}let ho=null,ei=null;function Sy(){if(!ho){const n=document.getElementById("canvas-container");if(!n)throw new Error('Container element with id "canvas-container" not found');ho=new lx(n)}return ho}function fu(){const e=Sy().getScene();let t=null;const i=bo.createFloor(10,10,0);e.add(i),ei=new gx(()=>r(),e);function r(){if(!ei)return;const s=ei.getWallParams(),o=ei.getOpenings(),a=s.completionPercentage/100,l=ei.getViewMode();if(t&&(e.remove(t),t=null),l==="block"||l==="row"){Eh(async()=>{const{BlockGenerator:c}=await Promise.resolve().then(()=>Mx);return{BlockGenerator:c}},void 0).then(({BlockGenerator:c})=>{const h=new c;t=bo.createViewModeVisualization(l,h,{blockWidth:s.blockWidth,blockHeight:s.blockHeight,wallLength:s.wallLength,cementThickness:s.cementThickness}),t.position.set(0,s.blockHeight/2,0),e.add(t)});return}const u={wall:{size:{l:s.wallLength,w:s.wallWidth,h:s.wallHeight},blockSize:{l:s.blockWidth,w:0,h:s.blockHeight},cementThickness:s.cementThickness,placement:{parent:null,position:{x:s.positionX,y:s.positionY,z:s.positionZ},direction:{yaw:s.yawDegrees*(Math.PI/180)}},materials:{masonry:{albedo:"",metalness:0,roughness:0},lintel:{albedo:"",metalness:0,roughness:0},infill:{albedo:"",metalness:0,roughness:0}}},openings:o.map(c=>({placement:{parent:null,position:{x:c.x,y:c.y,z:c.z},direction:{yaw:0}},size:{l:c.width,w:c.length,h:c.height}})),task:{completion:a},visualization:ei.getVisualizationMode()};t=xy(u),ei.getShowPlaceholder()&&hu.attachWall(t,s.wallWidth,s.wallHeight,s.wallLength,s.positionX,s.positionY,s.positionZ,s.yawDegrees*(Math.PI/180)),ei.getShowActualWall()&&hu.attachActualWall(t,s.wallHeight,s.wallLength),e.add(t)}r()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fu):fu();
