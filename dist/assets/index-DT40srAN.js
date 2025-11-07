const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Hero-D7XdIMwP.js","./ui-Cn5rRrbM.js","./vendor-B5ZO-m6Q.js","./Menu-D4HR20zI.js","./firebase-JjijnVzV.js","./Cart-DYFSI1bA.js","./PaymentModal-CAmzGnT1.js","./OrderConfirmation-Ch_9Peqf.js","./AdminDashboard-DDSVcVEH.js","./AdminSignIn-BB-lU-vQ.js","./PrivacyPolicyModal-D8l5sAGv.js","./TermsOfServiceModal-D4sqQXa9.js"])))=>i.map(i=>d[i]);
import{j as f}from"./ui-Cn5rRrbM.js";import{a as qe,r as y,R as I}from"./vendor-B5ZO-m6Q.js";import{r as P,_ as O,C as D,a as M,E as ue,F as de,o as $e,L as Ge,g as fe,b as ze,d as Ue,i as Ke,c as X,e as He,v as Ye,f as We,h as Je,j as Xe,k as Qe,l as Ze,s as et}from"./firebase-JjijnVzV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();var pe,Q=qe;pe=Q.createRoot,Q.hydrateRoot;const tt="modulepreload",nt=function(e,t){return new URL(e,t).href},Z={},w=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){const o=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),c=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(n.map(l=>{if(l=nt(l,r),l in Z)return;Z[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(!!r)for(let T=o.length-1;T>=0;T--){const E=o[T];if(E.href===l&&(!u||E.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":tt,u||(h.as="script"),h.crossOrigin="",h.href=l,c&&h.setAttribute("nonce",c),document.head.appendChild(h),u)return new Promise((T,E)=>{h.addEventListener("load",T),h.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(o){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=o,window.dispatchEvent(s),!s.defaultPrevented)throw o}return i.then(o=>{for(const s of o||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},me="@firebase/installations",q="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he=1e4,ge=`w:${q}`,Ie="FIS_v2",it="https://firebaseinstallations.googleapis.com/v1",rt=60*60*1e3,at="installations",ot="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},_=new ue(at,ot,st);function ye(e){return e instanceof de&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we({projectId:e}){return`${it}/projects/${e}/installations`}function Te(e){return{token:e.token,requestStatus:2,expiresIn:lt(e.expiresIn),creationTime:Date.now()}}async function Ee(e,t){const r=(await t.json()).error;return _.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Ae({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function ct(e,{refreshToken:t}){const n=Ae(e);return n.append("Authorization",ut(t)),n}async function _e(e){const t=await e();return t.status>=500&&t.status<600?e():t}function lt(e){return Number(e.replace("s","000"))}function ut(e){return`${Ie} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dt({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=we(e),i=Ae(e),a=t.getImmediate({optional:!0});if(a){const l=await a.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const o={fid:n,authVersion:Ie,appId:e.appId,sdkVersion:ge},s={method:"POST",headers:i,body:JSON.stringify(o)},c=await _e(()=>fetch(r,s));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Te(l.authToken)}}else throw await Ee("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt=/^[cdef][\w-]{21}$/,B="";function mt(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=ht(e);return pt.test(n)?n:B}catch{return B}}function ht(e){return ft(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be=new Map;function ve(e,t){const n=F(e);Re(n,t),gt(n,t)}function Re(e,t){const n=be.get(e);if(n)for(const r of n)r(t)}function gt(e,t){const n=It();n&&n.postMessage({key:e,fid:t}),yt()}let A=null;function It(){return!A&&"BroadcastChannel"in self&&(A=new BroadcastChannel("[Firebase] FID Change"),A.onmessage=e=>{Re(e.data.key,e.data.fid)}),A}function yt(){be.size===0&&A&&(A.close(),A=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt="firebase-installations-database",Tt=1,S="firebase-installations-store";let L=null;function $(){return L||(L=$e(wt,Tt,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(S)}}})),L}async function k(e,t){const n=F(e),i=(await $()).transaction(S,"readwrite"),a=i.objectStore(S),o=await a.get(n);return await a.put(t,n),await i.done,(!o||o.fid!==t.fid)&&ve(e,t.fid),t}async function Ce(e){const t=F(e),r=(await $()).transaction(S,"readwrite");await r.objectStore(S).delete(t),await r.done}async function N(e,t){const n=F(e),i=(await $()).transaction(S,"readwrite"),a=i.objectStore(S),o=await a.get(n),s=t(o);return s===void 0?await a.delete(n):await a.put(s,n),await i.done,s&&(!o||o.fid!==s.fid)&&ve(e,s.fid),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G(e){let t;const n=await N(e.appConfig,r=>{const i=Et(r),a=At(e,i);return t=a.registrationPromise,a.installationEntry});return n.fid===B?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function Et(e){const t=e||{fid:mt(),registrationStatus:0};return Pe(t)}function At(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(_.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=_t(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:St(e)}:{installationEntry:t}}async function _t(e,t){try{const n=await dt(e,t);return k(e.appConfig,n)}catch(n){throw ye(n)&&n.customData.serverCode===409?await Ce(e.appConfig):await k(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function St(e){let t=await ee(e.appConfig);for(;t.registrationStatus===1;)await Se(100),t=await ee(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await G(e);return r||n}return t}function ee(e){return N(e,t=>{if(!t)throw _.create("installation-not-found");return Pe(t)})}function Pe(e){return bt(e)?{fid:e.fid,registrationStatus:0}:e}function bt(e){return e.registrationStatus===1&&e.registrationTime+he<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vt({appConfig:e,heartbeatServiceProvider:t},n){const r=Rt(e,n),i=ct(e,n),a=t.getImmediate({optional:!0});if(a){const l=await a.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const o={installation:{sdkVersion:ge,appId:e.appId}},s={method:"POST",headers:i,body:JSON.stringify(o)},c=await _e(()=>fetch(r,s));if(c.ok){const l=await c.json();return Te(l)}else throw await Ee("Generate Auth Token",c)}function Rt(e,{fid:t}){return`${we(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z(e,t=!1){let n;const r=await N(e.appConfig,a=>{if(!Oe(a))throw _.create("not-registered");const o=a.authToken;if(!t&&Ot(o))return a;if(o.requestStatus===1)return n=Ct(e,t),a;{if(!navigator.onLine)throw _.create("app-offline");const s=kt(a);return n=Pt(e,s),s}});return n?await n:r.authToken}async function Ct(e,t){let n=await te(e.appConfig);for(;n.authToken.requestStatus===1;)await Se(100),n=await te(e.appConfig);const r=n.authToken;return r.requestStatus===0?z(e,t):r}function te(e){return N(e,t=>{if(!Oe(t))throw _.create("not-registered");const n=t.authToken;return xt(n)?{...t,authToken:{requestStatus:0}}:t})}async function Pt(e,t){try{const n=await vt(e,t),r={...t,authToken:n};return await k(e.appConfig,r),n}catch(n){if(ye(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Ce(e.appConfig);else{const r={...t,authToken:{requestStatus:0}};await k(e.appConfig,r)}throw n}}function Oe(e){return e!==void 0&&e.registrationStatus===2}function Ot(e){return e.requestStatus===2&&!Dt(e)}function Dt(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+rt}function kt(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function xt(e){return e.requestStatus===1&&e.requestTime+he<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mt(e){const t=e,{installationEntry:n,registrationPromise:r}=await G(t);return r?r.catch(console.error):z(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ft(e,t=!1){const n=e;return await Nt(n),(await z(n,t)).token}async function Nt(e){const{registrationPromise:t}=await G(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(e){if(!e||!e.options)throw V("App Configuration");if(!e.name)throw V("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw V(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function V(e){return _.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="installations",Vt="installations-internal",jt=e=>{const t=e.getProvider("app").getImmediate(),n=Lt(t),r=M(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Bt=e=>{const t=e.getProvider("app").getImmediate(),n=M(t,De).getImmediate();return{getId:()=>Mt(n),getToken:i=>Ft(n,i)}};function qt(){O(new D(De,jt,"PUBLIC")),O(new D(Vt,Bt,"PRIVATE"))}qt();P(me,q);P(me,q,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x="analytics",$t="firebase_id",Gt="origin",zt=60*1e3,Ut="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",U="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=new Ge("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},g=new ue("analytics","Analytics",Kt);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(e){if(!e.startsWith(U)){const t=g.create("invalid-gtag-resource",{gtagURL:e});return p.warn(t.message),""}return e}function ke(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Yt(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Wt(e,t){const n=Yt("firebase-js-sdk-policy",{createScriptURL:Ht}),r=document.createElement("script"),i=`${U}?l=${e}&id=${t}`;r.src=n?n==null?void 0:n.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function Jt(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Xt(e,t,n,r,i,a){const o=r[i];try{if(o)await t[o];else{const c=(await ke(n)).find(l=>l.measurementId===i);c&&await t[c.appId]}}catch(s){p.error(s)}e("config",i,a)}async function Qt(e,t,n,r,i){try{let a=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const s=await ke(n);for(const c of o){const l=s.find(d=>d.measurementId===c),u=l&&t[l.appId];if(u)a.push(u);else{a=[];break}}}a.length===0&&(a=Object.values(t)),await Promise.all(a),e("event",r,i||{})}catch(a){p.error(a)}}function Zt(e,t,n,r){async function i(a,...o){try{if(a==="event"){const[s,c]=o;await Qt(e,t,n,s,c)}else if(a==="config"){const[s,c]=o;await Xt(e,t,n,r,s,c)}else if(a==="consent"){const[s,c]=o;e("consent",s,c)}else if(a==="get"){const[s,c,l]=o;e("get",s,c,l)}else if(a==="set"){const[s]=o;e("set",s)}else e(a,...o)}catch(s){p.error(s)}}return i}function en(e,t,n,r,i){let a=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(a=window[i]),window[i]=Zt(a,e,t,n),{gtagCore:a,wrappedGtag:window[i]}}function tn(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(U)&&n.src.includes(e))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn=30,rn=1e3;class an{constructor(t={},n=rn){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const xe=new an;function on(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function sn(e){var o;const{appId:t,apiKey:n}=e,r={method:"GET",headers:on(n)},i=Ut.replace("{app-id}",t),a=await fetch(i,r);if(a.status!==200&&a.status!==304){let s="";try{const c=await a.json();(o=c.error)!=null&&o.message&&(s=c.error.message)}catch{}throw g.create("config-fetch-failed",{httpStatus:a.status,responseMessage:s})}return a.json()}async function cn(e,t=xe,n){const{appId:r,apiKey:i,measurementId:a}=e.options;if(!r)throw g.create("no-app-id");if(!i){if(a)return{measurementId:a,appId:r};throw g.create("no-api-key")}const o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},s=new dn;return setTimeout(async()=>{s.abort()},zt),Me({appId:r,apiKey:i,measurementId:a},o,s,t)}async function Me(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=xe){var s;const{appId:a,measurementId:o}=e;try{await ln(r,t)}catch(c){if(o)return p.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:a,measurementId:o};throw c}try{const c=await sn(e);return i.deleteThrottleMetadata(a),c}catch(c){const l=c;if(!un(l)){if(i.deleteThrottleMetadata(a),o)return p.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:a,measurementId:o};throw c}const u=Number((s=l==null?void 0:l.customData)==null?void 0:s.httpStatus)===503?X(n,i.intervalMillis,nn):X(n,i.intervalMillis),d={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return i.setThrottleMetadata(a,d),p.debug(`Calling attemptFetch again in ${u} millis`),Me(e,d,r,i)}}function ln(e,t){return new Promise((n,r)=>{const i=Math.max(t-Date.now(),0),a=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(a),r(g.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function un(e){if(!(e instanceof de)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class dn{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function fn(e,t,n,r,i){if(i&&i.global){e("event",n,r);return}else{const a=await t,o={...r,send_to:a};e("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pn(){if(He())try{await Ye()}catch(e){return p.warn(g.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return p.warn(g.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function mn(e,t,n,r,i,a,o){const s=cn(e);s.then(m=>{n[m.measurementId]=m.appId,e.options.measurementId&&m.measurementId!==e.options.measurementId&&p.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>p.error(m)),t.push(s);const c=pn().then(m=>{if(m)return r.getId()}),[l,u]=await Promise.all([s,c]);tn(a)||Wt(a,l.measurementId),i("js",new Date);const d=(o==null?void 0:o.config)??{};return d[Gt]="firebase",d.update=!0,u!=null&&(d[$t]=u),i("config",l.measurementId,d),l.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(t){this.app=t}_delete(){return delete C[this.app.options.appId],Promise.resolve()}}let C={},ne=[];const ie={};let j="dataLayer",gn="gtag",re,Fe,ae=!1;function In(){const e=[];if(Ke()&&e.push("This is a browser extension environment."),We()||e.push("Cookies are not available."),e.length>0){const t=e.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=g.create("invalid-analytics-context",{errorInfo:t});p.warn(n.message)}}function yn(e,t,n){In();const r=e.options.appId;if(!r)throw g.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)p.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw g.create("no-api-key");if(C[r]!=null)throw g.create("already-exists",{id:r});if(!ae){Jt(j);const{wrappedGtag:a,gtagCore:o}=en(C,ne,ie,j,gn);Fe=a,re=o,ae=!0}return C[r]=mn(e,ne,ie,t,re,j,n),new hn(e)}function wn(e=ze()){e=fe(e);const t=M(e,x);return t.isInitialized()?t.getImmediate():Tn(e)}function Tn(e,t={}){const n=M(e,x);if(n.isInitialized()){const i=n.getImmediate();if(Ue(t,n.getOptions()))return i;throw g.create("already-initialized")}return n.initialize({options:t})}function En(e,t,n,r){e=fe(e),fn(Fe,C[e.app.options.appId],t,n,r).catch(i=>p.error(i))}const oe="@firebase/analytics",se="0.10.18";function An(){O(new D(x,(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return yn(r,i,n)},"PUBLIC")),O(new D("analytics-internal",e,"PRIVATE")),P(oe,se),P(oe,se,"esm2020");function e(t){try{const n=t.getProvider(x).getImmediate();return{logEvent:(r,i,a)=>En(n,r,i,a)}}catch(n){throw g.create("interop-component-reg-failed",{reason:n})}}}An();const _n={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,RAZORPAY_KEY_ID:"rzp_live_RYS8jZKMNTvoe6",RAZORPAY_KEY_SECRET:"7X1gyVYuayETVi7MBS4xO92f",SSR:!1,VITE_FIREBASE_API_KEY:"AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA",VITE_FIREBASE_APP_ID:"1:64082360151:web:ddf3b9107274aad5dff012",VITE_FIREBASE_AUTH_DOMAIN:"drcmovies-1dc9c.firebaseapp.com",VITE_FIREBASE_MEASUREMENT_ID:"G-GV5DXMVE7L",VITE_FIREBASE_MESSAGING_SENDER_ID:"64082360151",VITE_FIREBASE_PROJECT_ID:"drcmovies-1dc9c",VITE_FIREBASE_STORAGE_BUCKET:"drcmovies-1dc9c.firebasestorage.app"},R={apiKey:"AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA",authDomain:"drcmovies-1dc9c.firebaseapp.com",projectId:"drcmovies-1dc9c",storageBucket:"drcmovies-1dc9c.firebasestorage.app",messagingSenderId:"64082360151",appId:"1:64082360151:web:ddf3b9107274aad5dff012",measurementId:"G-GV5DXMVE7L"};console.log("🔧 Firebase Config Status:",{projectId:R.projectId||"Missing VITE_FIREBASE_PROJECT_ID",authDomain:R.authDomain||"Missing VITE_FIREBASE_AUTH_DOMAIN",hasApiKey:!!R.apiKey,hasAppId:!!R.appId,envMode:"production",envVariablesFound:{apiKey:!0,authDomain:!0,projectId:!0,storageBucket:!0,messagingSenderId:!0,appId:!0,measurementId:!0}});const Sn=["VITE_FIREBASE_API_KEY","VITE_FIREBASE_AUTH_DOMAIN","VITE_FIREBASE_PROJECT_ID","VITE_FIREBASE_STORAGE_BUCKET","VITE_FIREBASE_MESSAGING_SENDER_ID","VITE_FIREBASE_APP_ID"],ce=Sn.filter(e=>!_n[e]);ce.length>0&&(console.error("❌ Missing required Firebase environment variables:",ce),console.error("Please add these to your .env file and Netlify environment variables"));const K=Je(R);console.log("✅ Firebase App initialized");typeof window<"u"&&window.location.hostname!=="localhost"&&R.measurementId&&wn(K);const bn=Xe(K),le=Qe(K);console.log("🔥 Firestore instance:",bn);console.log("📊 Firestore app initialized");const vn=(e,t)=>{switch(t.type){case"ADD_ITEM":{const{item:n,quantity:r,selectedSize:i}=t.payload,a=e.items.findIndex(c=>c.id===n.id&&c.selectedSize===i);let o;if(a>-1)o=e.items.map((c,l)=>l===a?{...c,quantity:c.quantity+r}:c);else{const c={...n,quantity:r,selectedSize:i,price:i==="Large"&&n.maxPrice?n.maxPrice:n.price};o=[...e.items,c]}const s=o.reduce((c,l)=>c+l.price*l.quantity,0);return{...e,items:o,total:s}}case"REMOVE_ITEM":{const{id:n,selectedSize:r}=t.payload,i=e.items.filter(o=>!(o.id===n&&o.selectedSize===r)),a=i.reduce((o,s)=>o+s.price*s.quantity,0);return{...e,items:i,total:a}}case"UPDATE_QUANTITY":{const{id:n,quantity:r}=t.payload;if(r===0){const o=e.items.findIndex(s=>s.id===n);if(o>-1){const s=[...e.items];s.splice(o,1);const c=s.reduce((l,u)=>l+u.price*u.quantity,0);return{...e,items:s,total:c}}return e}const i=e.items.map(o=>o.id===n?{...o,quantity:r}:o),a=i.reduce((o,s)=>o+s.price*s.quantity,0);return{...e,items:i,total:a}}case"CLEAR_CART":return{...e,items:[],total:0};case"TOGGLE_CART":return{...e,isOpen:!e.isOpen};case"OPEN_CART":return{...e,isOpen:!0};case"CLOSE_CART":return{...e,isOpen:!1};default:return e}},Rn={items:[],isOpen:!1,total:0},Ne=y.createContext(void 0),Cn=({children:e})=>{const[t,n]=y.useReducer(vn,Rn),r=(u,d,m)=>{n({type:"ADD_ITEM",payload:{item:u,quantity:d,selectedSize:m}})},i=(u,d)=>{n({type:"REMOVE_ITEM",payload:{id:u,selectedSize:d}})},a=(u,d)=>{n({type:"UPDATE_QUANTITY",payload:{id:u,quantity:d}})},o=()=>{n({type:"CLEAR_CART"})},s=()=>{n({type:"TOGGLE_CART"})},c=()=>{n({type:"OPEN_CART"})},l=()=>{n({type:"CLOSE_CART"})};return f.jsx(Ne.Provider,{value:{state:t,addItem:r,removeItem:i,updateQuantity:a,clearCart:o,toggleCart:s,openCart:c,closeCart:l},children:e})},$n=()=>{const e=y.useContext(Ne);if(e===void 0)throw new Error("useCart must be used within a CartProvider");return e},Pn=I.lazy(()=>w(()=>import("./Hero-D7XdIMwP.js"),__vite__mapDeps([0,1,2]),import.meta.url)),On=I.lazy(()=>w(()=>import("./Menu-D4HR20zI.js"),__vite__mapDeps([3,1,2,4]),import.meta.url)),Dn=I.lazy(()=>w(()=>import("./Cart-DYFSI1bA.js"),__vite__mapDeps([5,1,2,4]),import.meta.url)),kn=I.lazy(()=>w(()=>import("./PaymentModal-CAmzGnT1.js"),__vite__mapDeps([6,1,2,4]),import.meta.url)),xn=I.lazy(()=>w(()=>import("./OrderConfirmation-Ch_9Peqf.js"),__vite__mapDeps([7,1,2,4]),import.meta.url)),Mn=I.lazy(()=>w(()=>import("./AdminDashboard-DDSVcVEH.js"),__vite__mapDeps([8,1,2,4]),import.meta.url)),Fn=I.lazy(()=>w(()=>import("./AdminSignIn-BB-lU-vQ.js"),__vite__mapDeps([9,1,2,4]),import.meta.url)),Nn=I.lazy(()=>w(()=>import("./PrivacyPolicyModal-D8l5sAGv.js"),__vite__mapDeps([10,1,2]),import.meta.url)),Ln=I.lazy(()=>w(()=>import("./TermsOfServiceModal-D4sqQXa9.js"),__vite__mapDeps([11,1,2]),import.meta.url));function Vn(){const[e,t]=y.useState("hero"),[n,r]=y.useState(!1),[i,a]=y.useState(!1),[o,s]=y.useState(!1),[c,l]=y.useState(!1),[u,d]=y.useState({seatNumber:null,rowSelection:null,screenNumber:null,customerName:null,customerPhone:null});I.useEffect(()=>{const b=Ze(le,v=>{l(!!v),v&&e==="admin-signin"?t("admin"):!v&&e==="admin"&&t("hero")});return()=>b()},[e]);const m=()=>{t("menu")},h=()=>{t("hero")},T=()=>{t(c?"admin":"admin-signin")},E=()=>{a(!0)},H=()=>{s(!0)},Le=()=>{t("admin")},Ve=async()=>{try{await et(le),t("hero")}catch(b){console.error("Sign out error:",b)}},je=()=>{r(!0)},Be=(b,v,Y,W,J)=>{console.log("🎉 Payment success callback triggered!"),console.log("📋 Order details received:",{seatNumber:b,rowSelection:v,screenNumber:Y,customerName:W,customerPhone:J}),d({seatNumber:b,rowSelection:v,screenNumber:Y,customerName:W,customerPhone:J}),console.log("💾 Order details saved to state"),r(!1),console.log("❌ Payment modal closed"),t("confirmation"),console.log("✅ Navigated to confirmation screen")};return f.jsx(Cn,{children:f.jsx(I.Suspense,{fallback:f.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950",children:f.jsxs("div",{className:"text-center",children:[f.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"}),f.jsx("p",{className:"text-neutral-300",children:"Loading..."})]})}),children:f.jsxs("div",{className:"min-h-screen",children:[e==="hero"&&f.jsx(Pn,{onStartOrdering:m,onGoToAdmin:T,onGoToPrivacyPolicy:E,onGoToTermsOfService:H}),e==="menu"&&f.jsx(On,{onBack:h}),e==="confirmation"&&f.jsx(xn,{onBackToHome:h,seatNumber:u.seatNumber,rowSelection:u.rowSelection,screenNumber:u.screenNumber,customerName:u.customerName,customerPhone:u.customerPhone}),e==="admin-signin"&&f.jsx(Fn,{onSignIn:Le,onBack:h}),e==="admin"&&f.jsx(Mn,{onBackToHome:h,onSignOut:Ve}),f.jsx(Dn,{onCheckout:je}),f.jsx(kn,{isOpen:n,onClose:()=>r(!1),onPaymentSuccess:Be,onGoToPrivacyPolicy:E,onGoToTermsOfService:H}),f.jsx(Nn,{isOpen:i,onClose:()=>a(!1)}),f.jsx(Ln,{isOpen:o,onClose:()=>s(!1)})]})})})}pe(document.getElementById("root")).render(f.jsx(y.StrictMode,{children:f.jsx(Vn,{})}));export{le as a,bn as f,$n as u};
