'use strict';
// ЗАЕЗД В ОДИНЦОВО 3D — three.js r128, процедурные текстуры, без внешних ассетов
const $=s=>document.querySelector(s),R=Math.random,PI=Math.PI,HW=6,L=8,N=50,cl=(v,a,b)=>Math.max(a,Math.min(b,v)),O=$('#ov');
const SK=[{n:'Серый',p:0,a:'#8a909c',b:'#5d6370'},{n:'Ралли',p:400,a:'#eeeeee',b:'#d8421c'},{n:'Неон',p:900,a:'#12d6ff',b:'#ff2bd6'},{n:'Лёд',p:1200,a:'#bfe6ff',b:'#ffffff'},{n:'Золото',p:3000,a:'#ffcf33',b:'#b8860b'},{n:'Пантера «КОЧ» (мем)',p:1500,a:'#15151b',b:'#2e2e3a',txt:'КОЧ'}];
const TI=[{n:'Обычные',p:0,g:1,s:1,d:1,t:'база'},{n:'Шипованные',p:600,g:1.25,s:1,d:1,t:'+сцепление'},{n:'Спорт',p:1200,g:1.1,s:1.06,d:1,t:'+скорость'},{n:'Дрифтовые',p:1800,g:.9,s:1,d:2,t:'×2 очки за дрифт'}];
const GU=[{n:'Обрез',p:0,m:2,rl:1.8,sp:22,t:'2 патрона'},{n:'Помповое',p:900,m:4,rl:1.5,sp:26,t:'4 патрона, шире разброс'},{n:'Золотой «Одинцовец»',p:2500,m:6,rl:1.1,sp:34,t:'6 патронов, быстрая перезарядка'}];
const TR=[{n:'Чёрный',p:0,c:i=>'#050507'},{n:'Неон',p:500,c:i=>i%2?'#00ffff':'#ff00ff'},{n:'Огонь',p:1000,c:i=>i%3?'#ff6a00':'#ffd200'},{n:'Радуга',p:2000,c:i=>`hsl(${i*37%360},100%,60%)`},{n:'Звёздная пыль',p:2500,c:i=>i%2?'#ffffff':'#9fd8ff'}];
const NI=[{n:'Электро-синий',p:0,c:[0x00ccff,0xff00ff,0xffffff],s:'0,204,255'},{n:'Токсик',p:700,c:[0x39ff14,0xcaff00,0xffffff],s:'57,255,20'},{n:'Инферно',p:1200,c:[0xff3300,0xff9900,0xffee00],s:'255,120,0'},{n:'Сакура',p:1800,c:[0xff6ec7,0xffb3e6,0xffffff],s:'255,110,199'},{n:'Радуга',p:2600,c:[0xff0000,0xffff00,0x00ff00,0x00ffff,0xff00ff],s:'255,255,255'},{n:'Золотой джет',p:3500,c:[0xffd700,0xfff2a0,0xff9a00],s:'255,215,0'}];
const BI=[{n:'Зима · Одинцово',gnd:'#d4e2f2',spk:['#fff','#9fb8d8','#b8cce6'],tree:'#10302c',tip:'#eef6ff',mt:'#8da0bd',con:1,fx:0xffffff,fs:.35,fv:4},{n:'Золотая осень',gnd:'#6b4a22',spk:['#a0551a','#d89020','#3a2810'],tree:'#c9661a',tip:'#e0a020',mt:'#6a4a3a',fx:0xff8a20,fs:.6,fv:2},{n:'Лето · лес',gnd:'#3d7a35',spk:['#2a5a25','#5aa04a','#8acb6a'],tree:'#1f6a2a',tip:'#3a9a3a',mt:'#4a6a8a',fx:0xffee66,fs:.3,fv:.15},{n:'Весна · сакура',gnd:'#7fae5a',spk:['#5a8a3a','#a0d070','#ffc0d8'],tree:'#f2a7c3',tip:'#ffd0e0',mt:'#7a8ab0',fx:0xffb7d5,fs:.5,fv:1.5},
{n:'Minecraft · Блоки',st:1,gnd:'#5d9b3a',spk:['#4e8a2e','#6bb04a','#58a038','#3d7a28'],tree:'#2f7d2a',tip:'#4fa83f',mt:'#7a8f6a',rd:'#777777',ln:'#f0c020',fx:0xffffff,fs:.25,fv:.3},
{n:'Mirage · Пустыня',st:2,hh:10,gnd:'#cdb283',spk:['#b89a68','#e0c898','#a8885a'],tree:'#d6b47c',tip:'#b8955a',acc:'#3b6fa8',mt:'#a88a5a',neon:['#223','#112'],rd:'#8a7a60',ln:'#efe2b8',fx:0xe8c890,fs:.3,fv:.5},
{n:'GTA VI · Vice City',st:3,gnd:'#e8c9a0',spk:['#d8b88a','#f0d8b0','#c9a878'],tree:'#2f9a52',tip:'#ffb0d8',mt:'#ff7ab8',neon:['#ff4fd8','#37e8ff','#ffd24a'],win:1,skt:0x5a1f6e,rd:'#2a2630',ln:'#ff5ad0',lamp:0xff4fd8,post:0xff4fd8,fx:0xffd0f0,fs:.35,fv:.15},
{n:'Cyberpunk · Night City',st:2,hh:40,win:1,wet:1,gnd:'#14141c',spk:['#222233','#2d2d44','#101018'],tree:'#1a1a26',tip:'#2c2c44',acc:'#00e5ff',mt:'#15151f',neon:['#ff2bd6','#00f0ff','#ffe600','#ff3b3b'],skt:0x1a0a33,rd:'#18181f',ln:'#00f0ff',lamp:0x00e5ff,post:0xff2bd6,fx:0x66ccff,fs:.12,fv:26}];
const TM=[{n:'Ночь',sky:0x060b18,fog:.011,sun:0x6f8cff,si:.55,hemi:.5,hc:0x6a7fb0,hg:0x101828,head:1,sd:0xdde8ff},{n:'Закат',sky:0xe0783a,fog:.006,sun:0xff9a50,si:1.8,hemi:.9,hc:0xffc090,hg:0x402030,head:.3,sd:0xffd080},{n:'Туманное утро',sky:0xa9bcc8,fog:.012,sun:0xfff0e0,si:1.2,hemi:1,hc:0xd0e0f0,hg:0x405060,head:.2,sd:0xffffff},{n:'День',sky:0x8fc6ff,fog:.004,sun:0xfff2d0,si:2.4,hemi:1.1,hc:0xcfe6ff,hg:0x506040,head:0,sd:0xfff8d0}];
const UP=[['eng','Двигатель','+6% макс. скорость'],['hnd','Управление','+8% поворот'],['rel','Перезарядка','−8% времени']];
const DB={skin:SK,tire:TI,gun:GU,trail:TR,nit:NI,loc:BI,tm:TM};
const MS=['Ты у меня на прицеле.','Подрежу тебя на повороте!','Одинцово тебя не забудет.','Дрифтуй, пока можешь.'];
let S;try{S=JSON.parse(localStorage.odin3)}catch(e){}
S=S||{coins:0,best:0,own:{skin:[0],tire:[0],gun:[0],trail:[0],nit:[0],loc:[0,1,2,3],tm:[0,1,2,3]},eq:{skin:0,tire:0,gun:0,trail:0,nit:0,loc:0,tm:0},up:{eng:0,hnd:0,rel:0}};
S.own.nit=S.own.nit||[0];S.eq.nit=S.eq.nit||0;S.own.loc=BI.map((_,i)=>i);S.own.tm=TM.map((_,i)=>i);
const save=()=>{try{localStorage.odin3=JSON.stringify(S)}catch(e){}};
const cx=z=>Math.sin(z*.006)*40+Math.sin(z*.0017+2)*70,ck=z=>-(.00144*Math.sin(z*.006)+.0002*Math.sin(z*.0017+2)),tg=z=>Math.atan2(cx(z+1)-cx(z-1),2);
const mx=()=>70*(1+.06*S.up.eng)*TI[S.eq.tire].s*(nitOn?1.35:1);
// ---------- three.js ----------
const rd=new THREE.WebGLRenderer({antialias:false,powerPreference:'high-performance'});rd.setPixelRatio(Math.min(devicePixelRatio,/Mobi|Android/i.test(navigator.userAgent)?1.5:2));document.body.prepend(rd.domElement);
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(70,1,.1,600);cam.rotation.order='YXZ';scene.add(cam);
const hemi=new THREE.HemisphereLight(0xffffff,0x223344,1),sun=new THREE.DirectionalLight(0xffffff,1);scene.add(hemi,sun,sun.target);const MOB=/Mobi|Android/i.test(navigator.userAgent);rd.shadowMap.enabled=true;rd.shadowMap.type=THREE.PCFSoftShadowMap;sun.castShadow=true;sun.shadow.mapSize.set(MOB?1024:2048,MOB?1024:2048);Object.assign(sun.shadow.camera,{left:-45,right:45,top:45,bottom:-45,near:1,far:240});sun.shadow.bias=-.0004;
const fx=$('#fx'),fc=fx.getContext('2d');
let bp=null,fxp=null,cp=null,envT=null,HDR=false,SKY=0;
const FXS={uniforms:{tDiffuse:{value:null},t:{value:0},s:{value:0}},vertexShader:'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`uniform sampler2D tDiffuse;uniform float t,s;varying vec2 v;
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){vec2 d=v-.5;float r=dot(d,d);vec2 o=d*r*(.012+s*.06);vec3 c=vec3(texture2D(tDiffuse,v+o).r,texture2D(tDiffuse,v).g,texture2D(tDiffuse,v-o).b);
c=aces(c*1.15);c=mix(c,c*c*(3.-2.*c),.35);c*=vec3(1.04,1.,.96)+vec3(-.04,0.,.06)*(1.-c);c*=1.-r*(1.1+s*.9);
float g=fract(sin(dot(v+fract(t),vec2(12.9898,78.233)))*43758.5453);c+=(g-.5)*.035;gl_FragColor=vec4(pow(c,vec3(1./2.2)),1.);}`};
try{const w2=rd.capabilities.isWebGL2;HDR=!!(w2&&rd.extensions.get('EXT_color_buffer_float'));const rt0=w2?new THREE.WebGLMultisampleRenderTarget(2,2,HDR?{type:THREE.HalfFloatType}:{}):new THREE.WebGLRenderTarget(2,2,{});
 cp=new THREE.EffectComposer(rd,rt0);cp.addPass(new THREE.RenderPass(scene,cam));bp=new THREE.UnrealBloomPass(new THREE.Vector2(512,512),.75,.55,1);cp.addPass(bp);fxp=new THREE.ShaderPass(FXS);cp.addPass(fxp)}
catch(e){cp=null;rd.toneMapping=THREE.ACESFilmicToneMapping;rd.outputEncoding=THREE.sRGBEncoding;window.showErr&&showErr('post-fx off: '+e)}
const pm=new THREE.PMREMGenerator(rd);
function setEnv(){const c=document.createElement('canvas');c.width=256;c.height=128;const x=c.getContext('2d'),g=x.createLinearGradient(0,0,0,128),h=n=>'#'+new THREE.Color(n).getHexString();g.addColorStop(0,h(T.hc));g.addColorStop(.49,h(SKY));g.addColorStop(.5,h(T.hg));g.addColorStop(1,h(T.hg));x.fillStyle=g;x.fillRect(0,0,256,128);x.fillStyle=h(T.sd);x.beginPath();x.arc(128,40,9,0,7);x.fill();
 const t=new THREE.CanvasTexture(c);t.mapping=THREE.EquirectangularReflectionMapping;t.encoding=THREE.sRGBEncoding;if(envT)envT.dispose();envT=pm.fromEquirectangular(t).texture;scene.environment=envT;t.dispose();if(bp)bp.threshold=HDR?(T.head>.5?1:1.15):.9}
function rs(){rd.setSize(innerWidth,innerHeight);cp&&cp.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();fx.width=innerWidth/2|0;fx.height=innerHeight/2|0}addEventListener('resize',rs);rs();
function tex(w,fn,rep){const c=document.createElement('canvas');c.width=c.height=w;fn(c.getContext('2d'),w);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(rep)t.repeat.set(rep,rep);t.anisotropy=8;t.encoding=THREE.sRGBEncoding;return t}
const nz=(x,w,n,cs)=>{for(let i=0;i<n;i++){x.fillStyle=cs[R()*cs.length|0];x.globalAlpha=.1+R()*.35;const s=1+R()*5;x.fillRect(R()*w,R()*w,s,s)}x.globalAlpha=1};
let W3,segs,lyr,rk,pst,lmp,lmh,lmg,cv2=new THREE.Color(),TN=N*5,dm=new THREE.Object3D(),gnd,mts,B,T,mkP=[],mkI=0,wx,wP=[];
function buildWorld(){if(W3)scene.remove(W3);W3=new THREE.Group();scene.add(W3);B=BI[S.eq.loc];T=TM[S.eq.tm];SKY=B.skt&&T.head>.5?B.skt:T.sky;
 scene.background=new THREE.Color(SKY);scene.fog=new THREE.FogExp2(SKY,T.fog);hemi.color.set(T.hc);hemi.groundColor.set(T.hg);hemi.intensity=T.hemi*.45;sun.color.set(T.sun);sun.intensity=T.si;
 const gt=tex(256,(x,w)=>{x.fillStyle=B.gnd;x.fillRect(0,0,w,w);if(B.st==1){for(let i=0;i<16;i++)for(let j=0;j<16;j++){x.fillStyle=B.spk[R()*B.spk.length|0];x.globalAlpha=.75;x.fillRect(i*16,j*16,16,16)}x.globalAlpha=1}else nz(x,w,5000,B.spk)},B.st==1?25:70);if(B.st==1)gt.magFilter=gt.minFilter=THREE.NearestFilter;
 gnd=new THREE.Mesh(new THREE.PlaneGeometry(400,400).rotateX(-PI/2),new THREE.MeshStandardMaterial({map:gt,roughness:B.wet?.3:1,metalness:B.wet?.3:0}));gnd.position.y=-.06;gnd.receiveShadow=true;W3.add(gnd);
 const rt=tex(256,(x,w)=>{x.fillStyle=B.gnd;x.fillRect(0,0,w,w);nz(x,w,4000,B.spk);x.fillStyle=B.rd||'#2b2d35';x.fillRect(32,0,192,w);if(B.st==1)for(let i=4;i<28;i++)for(let j=0;j<32;j++){x.fillStyle=['#7a7a7a','#6a6a6a','#888','#5e5e5e'][R()*4|0];x.fillRect(i*8,j*8,8,8)}x.save();x.beginPath();x.rect(32,0,192,w);x.clip();nz(x,w,9000,['#444','#1a1a1f','#555','#222']);x.restore();x.fillStyle=B.ln||'#d8d8d8';x.globalAlpha=.9;x.fillRect(40,0,5,w);x.fillRect(211,0,5,w);x.fillRect(125,0,6,w/2);x.globalAlpha=1});
 if(B.st==1)rt.magFilter=rt.minFilter=THREE.NearestFilter;const rm=new THREE.MeshStandardMaterial({map:rt,roughness:B.wet?.12:.5,metalness:B.wet?.45:.15}),rg=new THREE.PlaneGeometry(HW*2+4,L*1.15).rotateX(-PI/2);segs=[];
 for(let i=0;i<N;i++){const m=new THREE.Mesh(rg,rm);m.receiveShadow=true;m.userData={i,z:(i-2)*L};W3.add(m);segs.push(m)}
 const sy=B.st||0,bxg=new THREE.BoxGeometry(1,1,1),cg=sy?(sy==3?new THREE.IcosahedronGeometry(1,1):bxg):B.con?new THREE.ConeGeometry(2.1,3.2,7):new THREE.IcosahedronGeometry(2.1,1);lyr=[];
 const wt=B.win?tex(64,(x,w)=>{x.fillStyle='#000';x.fillRect(0,0,w,w);for(let i=0;i<9;i++)for(let j=0;j<9;j++)if(R()<.35){x.fillStyle=B.neon[R()*B.neon.length|0];x.fillRect(i*7+1,j*7+1,5,5)}}):null;if(wt)wt.repeat.set(3,6);
 const lc=[[0x3a2616,B.tree,B.tree,B.tip],[0x6b4a2a,B.tree,B.tree,B.tip],[B.tree,B.tip,B.acc,0xffffff],[0x5a4020,B.tree,B.tree,B.tip]][sy];
 for(let l=0;l<4;l++){const nb=sy==2&&l==3,m=new THREE.InstancedMesh(l?cg:(sy==1||sy==2)?bxg:new THREE.CylinderGeometry(.25,.35,1,6),nb?new THREE.MeshBasicMaterial({color:new THREE.Color(0xffffff).multiplyScalar(3)}):new THREE.MeshStandardMaterial(Object.assign({color:lc[l],roughness:sy==1?1:.9,flatShading:true},l==0&&sy==2&&wt?{emissiveMap:wt,emissive:0xffffff,emissiveIntensity:1.4}:{})),TN);m.frustumCulled=false;m.castShadow=!nb;W3.add(m);lyr.push(m)}
 pst=new THREE.InstancedMesh(new THREE.BoxGeometry(.14,1,.14),new THREE.MeshStandardMaterial({color:0x222222,emissive:B.post||0xff9a30,emissiveIntensity:2.5}),N*2);
 lmp=new THREE.InstancedMesh(new THREE.CylinderGeometry(.1,.15,9,6),new THREE.MeshStandardMaterial({color:0x2a2a30}),N);
 lmh=new THREE.InstancedMesh(new THREE.SphereGeometry(.5,10,8),new THREE.MeshBasicMaterial({color:new THREE.Color(B.lamp||0xffd08a).multiplyScalar(4)}),N);
 lmg=new THREE.InstancedMesh(new THREE.CircleGeometry(6,20).rotateX(-PI/2),new THREE.MeshBasicMaterial({color:B.lamp||0xffb060,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false}),N);
 rk=new THREE.InstancedMesh(sy==1?bxg:new THREE.DodecahedronGeometry(1),new THREE.MeshStandardMaterial({color:B.mt,roughness:1,flatShading:true}),N*3);rk.castShadow=true;[pst,lmp,lmh,lmg,rk].forEach(o=>{o.frustumCulled=false;W3.add(o)});lmp.visible=lmh.visible=lmg.visible=T.head>.25||!!B.win;
 segs.forEach(placeSeg);
 mts=new THREE.Group();for(let i=0;i<24;i++){const a=i/24*PI*2,h=70+R()*90,m=new THREE.Mesh(sy>=2?new THREE.BoxGeometry(30+R()*50,h*(B.hh?2.2:.9),30+R()*50):sy==1?new THREE.BoxGeometry(60+R()*40,h*.7,60+R()*40):new THREE.ConeGeometry(50+R()*50,h,6),new THREE.MeshStandardMaterial({color:B.mt,roughness:1,flatShading:true,emissiveMap:wt,emissive:wt?0xffffff:0,emissiveIntensity:wt?1.6:0}));m.position.set(Math.cos(a)*330,h/2-8,Math.sin(a)*330);mts.add(m)}
 const sd=new THREE.Mesh(new THREE.SphereGeometry(14,16,16),new THREE.MeshBasicMaterial({color:new THREE.Color(T.sd).multiplyScalar(3),fog:false}));sd.position.set(0,110,300);mts.add(sd);{const sc=new THREE.Color(SKY),dc=document.createElement('canvas');dc.width=2;dc.height=256;const x=dc.getContext('2d'),gr=x.createLinearGradient(0,0,0,256),hx=c=>'#'+c.getHexString();
 gr.addColorStop(0,hx(sc.clone().multiplyScalar(.3)));gr.addColorStop(.45,hx(sc));gr.addColorStop(.5,hx(sc.clone().lerp(new THREE.Color(1,1,1),.35)));gr.addColorStop(.56,hx(sc));gr.addColorStop(1,hx(sc));x.fillStyle=gr;x.fillRect(0,0,2,256);
 const dt2=new THREE.CanvasTexture(dc);dt2.encoding=THREE.sRGBEncoding;const dome=new THREE.Mesh(new THREE.SphereGeometry(520,24,16),new THREE.MeshBasicMaterial({map:dt2,side:THREE.BackSide,fog:false,depthWrite:false}));dome.renderOrder=-2;mts.add(dome);
 if(T.head>.9){const sg=new THREE.BufferGeometry(),sa=new Float32Array(900);for(let i=0;i<300;i++){const a=R()*6.28,b=R()*1.3+.08;sa.set([Math.cos(a)*Math.cos(b)*480,Math.sin(b)*480,Math.sin(a)*Math.cos(b)*480],i*3)}sg.setAttribute('position',new THREE.BufferAttribute(sa,3));mts.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xcfe0ff,size:2.2,sizeAttenuation:false,fog:false,transparent:true,depthWrite:false})))}}
 W3.add(mts);
 const wg=new THREE.BufferGeometry();wP=[];const pa=new Float32Array(500*3);for(let i=0;i<500;i++){wP.push({x:R()*80-40,y:R()*22,z:R()*80-20,s:R()*6});}wg.setAttribute('position',new THREE.BufferAttribute(pa,3));
 wx=new THREE.Points(wg,new THREE.PointsMaterial({color:B.fx,size:B.fs,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending}));wx.frustumCulled=false;W3.add(wx);setEnv()}
function placeSeg(m){const z=m.userData.z,i=m.userData.i;m.position.set(cx(z+L/2),0,z+L/2);m.rotation.y=Math.atan2(cx(z+L)-cx(z),L);
 const sy=B.st||0;
 for(let t=0;t<5;t++){const tv=.65+R()*.7,j=i*5+t,zz=z+R()*L,side=t%2?1:-1,s=1.4+R()*1.6,bw=5+R()*6,h=8+R()*(B.hh||16),x=cx(zz)+side*(sy==2?HW+9+R()*(t<2?8:26)+bw/2:HW+4+R()*(t<2?8:24)),
  e=(l,y,sx,sy2,sz,ox)=>{dm.position.set(x+(ox||0),y,zz);dm.scale.set(sx,sy2,sz);dm.updateMatrix();lyr[l].setMatrixAt(j,dm.matrix);lyr[l].setColorAt(j,l==3&&sy==2?cv2.set(B.neon[R()*B.neon.length|0]):cv2.setScalar(tv))};
  dm.rotation.set(0,sy==1?0:sy==2?tg(zz):R()*6,0);
  if(sy==0){e(0,.9*s,s*.5,s*1.8,s*.5);for(let l=1;l<4;l++){const k=s*(1-(l-1)*.22);e(l,(1.8+(l-1)*1.9)*s+1.6*k,k,k,k)}}
  else if(sy==1){e(0,1.5*s,.6*s,3*s,.6*s);e(1,3.6*s,3.2*s,1.2*s,3.2*s);e(2,4.8*s,2.2*s,1.2*s,2.2*s);e(3,5.8*s,1.2*s,.9*s,1.2*s)}
  else if(sy==2){e(0,h/2,bw,h,bw*.9);e(1,h+.3,bw+.6,.6,bw*.9+.6);e(2,2,.3,3.6,2.6,-side*bw/2);e(3,h*.55,.3,1+R()*3,1.5+R()*3,-side*(bw/2+.1))}
  else{e(0,3.5*s,.3*s,7*s,.3*s);e(1,7.2*s,3.4*s,.9*s,3.4*s);e(2,7.6*s,2.4*s,.8*s,2.4*s);e(3,6.9*s,.5*s,.5*s,.5*s)}}
 dm.rotation.set(0,0,0);for(const sd of[-1,1]){dm.scale.set(1,1,1);dm.position.set(cx(z+L/2)+sd*(HW+.6),.5,z+L/2);dm.updateMatrix();pst.setMatrixAt(i*2+(sd>0?1:0),dm.matrix)}
 const lm=i%3==0,lx=cx(z+L/2)+(i%6==0?1:-1)*(HW+1.6),zc=z+L/2;
 dm.scale.setScalar(lm?1:.0001);dm.position.set(lx,4.5,zc);dm.updateMatrix();lmp.setMatrixAt(i,dm.matrix);dm.position.set(lx,9,zc);dm.updateMatrix();lmh.setMatrixAt(i,dm.matrix);dm.position.set(cx(zc),.12,zc);dm.updateMatrix();lmg.setMatrixAt(i,dm.matrix);
 for(let q=0;q<3;q++){const zr=z+R()*L,s=.3+R()*.9;dm.rotation.set(R()*3,R()*3,R()*3);dm.position.set(cx(zr)+(R()<.5?-1:1)*(HW+2+R()*9),s*.3,zr);dm.scale.set(s*(1+R()),s*.7,s*(1+R()));dm.updateMatrix();rk.setMatrixAt(i*3+q,dm.matrix)}
 [pst,lmp,lmh,lmg,rk].forEach(o=>o.instanceMatrix.needsUpdate=true);lyr.forEach(l=>{l.instanceMatrix.needsUpdate=true;if(l.instanceColor)l.instanceColor.needsUpdate=true})}
// ---------- машины ----------
const mkT=c0=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'#fff');g.addColorStop(.3,c0);g.addColorStop(1,'#0000');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)},glowT=mkT('#f44'),whT=mkT('#fff');
function mkCar(sk,pl){const g=new THREE.Group(),ms=[],me=[],wh=[],M=(c,o)=>{const m=new THREE.MeshPhysicalMaterial(Object.assign({color:c,roughness:.22,metalness:.75,clearcoat:1,clearcoatRoughness:.05},o));ms.push(m);return m},
 A=(geo,mat,x,y,z,rx)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);if(rx)m.rotation.x=rx;m.castShadow=true;g.add(m);me.push(m);return m},
 ex=(pts,d,bv)=>{const e=new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(p=>new THREE.Vector2(p[0],p[1]))),{depth:d,bevelEnabled:true,bevelSize:bv||.07,bevelThickness:bv||.07,bevelSegments:3,curveSegments:6});e.translate(0,0,-d/2);return e.rotateY(-PI/2)},
 glow=c=>{const m=new THREE.MeshBasicMaterial({color:c});m.color.multiplyScalar(3);return m},Bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),
 dk=M(0x0b0b0e,{roughness:.5,metalness:.3,clearcoat:.3}),cf=M(0x15161a,{roughness:.35,metalness:.4}),pa=M(sk.a),pb=M(sk.b,{roughness:.4}),gl=M(0x04070b,{roughness:.03,metalness:1,clearcoat:0}),ch=M(0xb8bcc6,{roughness:.2,metalness:1});
 A(ex([[-2.25,.34],[-2.32,.72],[-2.05,.92],[-1.25,.99],[-.75,1.27],[-.2,1.4],[.5,1.38],[1,1.06],[1.9,.82],[2.35,.6],[2.32,.34]],1.95),pa,0,0,0);
 A(ex([[-.55,1.04],[-.3,1.36],[.45,1.36],[.95,1.08]],2.12,.03),gl,0,0,0);
 A(new THREE.PlaneGeometry(1.7,.64),gl,0,1.265,.79,-.98);
 A(Bx(2.0,.05,.5),cf,0,.3,2.3);A(Bx(1.7,.14,.5),cf,0,.36,-2.3);A(Bx(1.1,.14,.05),dk,0,.5,2.44);A(Bx(.5,.12,.02),M(0xeeeeee,{roughness:.6,metalness:0,clearcoat:0}),0,.62,-2.42);
 A(Bx(1.9,.05,.5),pb,0,1.4,-2.2);for(const sx of[-1,1]){A(Bx(.05,.26,.5),pb,sx*.95,1.3,-2.2);A(Bx(.05,.3,.1),cf,sx*.5,1.2,-2.2);A(Bx(.06,.12,2.6),dk,sx*1.02,.3,.1);A(Bx(.04,.2,.6),dk,sx*1.05,.62,.35);A(Bx(.35,.02,.5),dk,sx*.45,1.0,1.35);
  A(new THREE.CylinderGeometry(.09,.09,.25,14),ch,sx*.55,.42,-2.4,PI/2);A(Bx(.2,.12,.14),pa,sx*1.12,1.08,.5);A(Bx(.04,.05,.18),dk,sx*1.06,1.02,.45);
  A(Bx(.62,.07,.05),glow(0xfff4d0),sx*.68,.72,2.42);A(Bx(.5,.03,.04),glow(0x9fd8ff),sx*.68,.8,2.4);A(Bx(.3,.16,.05),glow(0xff2010),sx*.8,.74,-2.4);
  const s2=new THREE.Sprite(new THREE.SpriteMaterial({map:glowT,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));s2.scale.set(1.9,1.9,1);s2.position.set(sx*.7,.84,-2.5);g.add(s2);
  for(const sz of[-1,1]){A(Bx(.16,.08,1.0),pa,sx*1.1,.84,sz*1.4);A(Bx(.07,.18,.22),M(0xd01010,{metalness:.2}),sx*.8,.52,sz*1.4);
   const w=new THREE.Group();w.position.set(sx*.98,.43,sz*1.4);const t=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.34,26).rotateZ(PI/2),M(0x070707,{roughness:.95,metalness:0,clearcoat:0})),r=new THREE.Mesh(new THREE.CylinderGeometry(.31,.31,.35,16).rotateZ(PI/2),ch),h=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.38,10).rotateZ(PI/2),dk);w.add(t,r,h);me.push(t,r,h);
   for(let k=0;k<5;k++){const sp3=new THREE.Mesh(Bx(.37,.07,.58),dk);sp3.rotation.x=k*PI/5;w.add(sp3);me.push(sp3)}t.castShadow=true;g.add(w);wh.push(w)}}
 A(Bx(1.75,.08,.05),glow(0xff1008),0,.86,-2.4);
 if(sk.txt){const t=tex(128,(x,w)=>{x.fillStyle='#ffd400';x.font='bold 54px monospace';x.textAlign='center';x.fillText(sk.txt,w/2,w/2+18)}),dec=(z,y,r)=>{const p=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.9).rotateX(-PI/2).rotateY(r),new THREE.MeshBasicMaterial({map:t,transparent:true}));p.position.set(0,y,z);g.add(p);me.push(p)};dec(-1.6,1.05,PI);dec(1.5,1.0,0)}
 else for(const[z,y,l]of[[1.5,1.0,.9],[-1.6,1.05,.7],[.1,1.48,1.1]]){const p=new THREE.Mesh(new THREE.PlaneGeometry(.5,l).rotateX(-PI/2),pb);p.position.set(0,y,z);g.add(p);me.push(p)}
 if(pl){const ug=new THREE.Mesh(new THREE.PlaneGeometry(3.4,6.4).rotateX(-PI/2),new THREE.MeshBasicMaterial({map:whT,color:TR[S.eq.trail].c(1),transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));ug.position.y=.08;g.add(ug);
  for(const sx of[-1,1]){const s=new THREE.SpotLight(0xfff0d0,4*T.head+.5,110,.5,.6,1.2);s.position.set(sx*.7,.9,2);s.target.position.set(sx*.7,0,40);g.add(s,s.target);
   if(T.head>.1){const bm=new THREE.Mesh(new THREE.ConeGeometry(3.4,18,20,1,true).translate(0,-9,0).rotateX(-PI/2),new THREE.MeshBasicMaterial({color:0xfff0c0,transparent:true,opacity:.05+.05*T.head,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));bm.position.set(sx*.7,.8,2.3);g.add(bm)}}}
 g.userData={ms,me,wh};scene.add(g);return g}
// ---------- состояние ----------
let st='menu',fp=false,keys={},ui={steer:0,brk:0,nit:0},pg,bots=[],pz,off,sp,da,stv,combo,score,kills,held,ammo,rel,kick,dead,time,msgT,markT,nit,nitOn,shake,tt=0,mxs;
const P=[],PG=new THREE.BufferGeometry(),PA=new Float32Array(900*3),PC=new Float32Array(900*3);PG.setAttribute('position',new THREE.BufferAttribute(PA,3));PG.setAttribute('color',new THREE.BufferAttribute(PC,3));
const PT=new THREE.Points(PG,new THREE.PointsMaterial({size:.9,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));PT.frustumCulled=false;scene.add(PT);
const bl=new THREE.PointLight(0xff8830,0,60);scene.add(bl);
function spawn(x,y,z,n,sp2,life,cols,up){for(let i=0;i<n&&P.length<900;i++){const a=R()*6.28,b=R()*3.14-1.2;P.push({x,y,z,vx:Math.cos(a)*Math.cos(b)*sp2,vy:Math.sin(b)*sp2+(up||0),vz:Math.sin(a)*Math.cos(b)*sp2,l:life*(.5+R()*.5),m:life,c:new THREE.Color(cols[R()*cols.length|0])})}}
for(let i=0;i<160;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(.35,1.4).rotateX(-PI/2),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false}));m.visible=false;m.userData.l=0;scene.add(m);mkP.push(m)}
function mark(x,z,yaw,c){for(const s of[-1,1]){const m=mkP[mkI++%160],cr=Math.cos(yaw),sr=Math.sin(yaw);m.position.set(x+s*.95*cr,.05,z-s*.95*sr);m.rotation.y=yaw;m.material.color.set(c);m.userData.l=1;m.visible=true}}
function reset(){if(pg)scene.remove(pg);bots.forEach(b=>scene.remove(b.g));pz=0;off=0;sp=0;da=0;stv=0;combo=1;score=0;kills=0;held=false;rel=0;ammo=GU[S.eq.gun].m;kick=dead=time=msgT=markT=shake=0;nit=.3;nitOn=false;P.length=0;mkP.forEach(m=>m.visible=false);
 pg=mkCar(SK[S.eq.skin],1);bots=Array.from({length:8},()=>({g:mkCar(SK[R()*5|0],0)}));bots.forEach(b=>respawn(b,1))}
function respawn(b,first){b.k=.6+R()*.55*Math.min(1.6,1+time/120);const back=!first&&b.k>1&&R()<.6;b.z=pz+(back?-45:(first?50:140)+R()*(first?250:260));b.off=[-.55,0,.55][R()*3|0];b.tx=b.off;b.t=R()*3;b.v=Math.max(22,sp*b.k);b.burn=0;b.cut=R()<.45;
 b.g.userData.ms.forEach(m=>{if(m.emissive)m.emissive.set(0)})}
const bx=b=>cx(b.z)-b.off*HW;
function pop(t,c){const d=document.createElement('div');d.className='pop';d.textContent=t;if(c)d.style.color=c;document.body.appendChild(d);setTimeout(()=>d.remove(),900)}
const vib=n=>navigator.vibrate&&navigator.vibrate(n);
function startReload(){if(!held||rel>0||ammo>=GU[S.eq.gun].m)return;rel=GU[S.eq.gun].rl*(1-.08*S.up.rel)}
function fire(nx,ny){if(st!='play'||!fp||!held||rel>0||ammo<1)return;ammo--;kick=1;shake=.5;noise(.25,1800,.5);vib(25);const r0=GU[S.eq.gun].sp*.004,a=innerWidth/innerHeight;cam.updateMatrixWorld();
 for(const b of bots){const dz=b.z-pz;if(b.burn>0||dz<6||dz>130)continue;const v=new THREE.Vector3(bx(b),1,b.z).project(cam);if(v.z>1)continue;
  if(Math.hypot((v.x-nx)*a,v.y-ny)<r0+7/dz){b.burn=1.5;b.sx=(R()-.5)*1.2;score+=100;pop('ПОПАЛ +100','#fff');b.g.userData.ms.forEach(m=>{if(m.emissive){m.emissive.set(0xff3300);m.emissiveIntensity=.7}})}}
 if(ammo<1)startReload()}
function boom(b){const x=bx(b),z=b.z;spawn(x,1.2,z,90,16,1.2,[0xffffff,0xffd23a,0xff7a00,0xcc2200],6);spawn(x,1.2,z,30,8,2,[0x333333,0x555555]);bl.position.set(x,3,z);bl.intensity=40;shake=1.2;noise(.9,500,.9);vib([30,20,60]);
 score+=500;kills++;nit=Math.min(1,nit+.25);pop('ВЗРЫВ! +500','#f93');respawn(b)}
function crash(){if(st=='play'){st='dead';dead=0;vib(200);noise(.5,300,.5)}}
let AC,eng,ge;function aud(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)();eng=AC.createOscillator();eng.type='sawtooth';const f=AC.createBiquadFilter();f.frequency.value=420;ge=AC.createGain();ge.gain.value=0;eng.connect(f);f.connect(ge);ge.connect(AC.destination);eng.start()}catch(e){}}
function noise(d,fq,v){if(!AC)return;const b=AC.createBuffer(1,AC.sampleRate*d,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(R()*2-1)*Math.pow(1-i/a.length,2);const s=AC.createBufferSource();s.buffer=b;const f=AC.createBiquadFilter();f.frequency.value=fq;const g=AC.createGain();g.gain.value=v;s.connect(f);f.connect(g);g.connect(AC.destination);s.start()}
// ---------- салон ----------
const cab=new THREE.Group(),dk=c=>new THREE.MeshStandardMaterial({color:c,roughness:.8}),CB=(w,h,d,m,x,y,z,g)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);(g||cab).add(o);return o};
CB(2.2,.6,1.2,dk(0x0b0c10),.45,-.9,-1.1);CB(2.2,.08,1.5,dk(0x08090b),.45,.5,-.9);CB(.13,1,.13,dk(0x0a0b0e),-.5,.05,-.85).rotation.z=.35;CB(.13,1,.13,dk(0x0a0b0e),1.4,.05,-.85).rotation.z=-.35;CB(.4,.12,.05,dk(0x111111),.45,.38,-.8);
const whl=new THREE.Group();whl.position.set(0,-.45,-.8);whl.rotation.x=-.5;whl.add(new THREE.Mesh(new THREE.TorusGeometry(.24,.03,8,22),dk(0x1c1d24)));CB(.12,.02,.02,new THREE.MeshBasicMaterial({color:0xd33}),0,.24,0,whl);cab.add(whl);whl.position.x=0;
const ndl=CB(.012,.07,.005,new THREE.MeshBasicMaterial({color:0xff3030}),.5,-.58,-.74);
const gh=new THREE.Group();gh.position.set(1.05,.3,-.9);gh.rotation.y=.35;CB(.06,.06,.75,dk(0x4a4f58),0,0,0,gh);CB(.07,.1,.3,dk(0x5a3a1e),0,-.03,.4,gh);CB(.015,.15,.015,dk(0x222222),0,.1,.2,gh);cab.add(gh);
const gu=new THREE.Group();gu.position.set(.6,-.5,-.7);CB(.05,.05,.9,dk(0x555a63),0,0,-.2,gu);CB(.06,.09,.3,dk(0x5a3a1e),0,-.04,.35,gu);CB(.07,.07,.2,dk(0x4a3018),0,-.03,-.1,gu);const mf=new THREE.PointLight(0xffc050,0,12);mf.position.set(0,0,-.8);gu.add(mf);cab.add(gu);
const dl=new THREE.PointLight(0xff9050,.5,3);dl.position.set(.45,-.3,-.4);cab.add(dl);cab.visible=false;cam.add(cab);
// ---------- обновление ----------
function update(dt){tt+=dt;
 for(let i=P.length;i--;){const p=P[i];p.l-=dt;if(p.l<=0){P.splice(i,1);continue}p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;p.vy-=6*dt;p.vx*=1-dt;p.vz*=1-dt}
 PA.fill(-999);for(let i=0;i<P.length;i++){const p=P[i],f=p.l/p.m;PA.set([p.x,p.y,p.z],i*3);PC.set([p.c.r*f,p.c.g*f,p.c.b*f],i*3)}PG.attributes.position.needsUpdate=PG.attributes.color.needsUpdate=true;
 bl.intensity=Math.max(0,bl.intensity-dt*60);kick=Math.max(0,kick-dt*5);shake=Math.max(0,shake-dt*3);msgT-=dt;
 for(const m of mkP)if(m.visible){m.userData.l-=dt*.3;m.material.opacity=Math.max(0,m.userData.l);if(m.userData.l<=0)m.visible=false}
 if(rel>0){rel-=dt;if(rel<=0){rel=0;ammo=GU[S.eq.gun].m}}
 mxs=mx();
 if(st=='dead'){dead+=dt;sp*=Math.max(0,1-4*dt);pz+=sp*dt;pg.userData.ms.forEach(m=>{m.wireframe=true;m.color.set(0x00ff55);m.transparent=true;m.opacity=Math.max(0,1-dead/2.2)});if(dead>2.6)over();return}
 if(st!='play')return;
 const tire=TI[S.eq.tire],grip=tire.g*(1+.08*S.up.hnd);
 const sg=cl((keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0)+ui.steer+(ui.r?1:0)-(ui.l?1:0),-1,1),brk=keys.arrowdown||keys.s||ui.brk;
 stv+=(sg-stv)*Math.min(1,dt*9);nitOn=(keys.shift||ui.nit)&&nit>0;if(nitOn)nit=Math.max(0,nit-dt*.3);
 if(brk)sp-=55*dt;else sp+=(nitOn?50:24)*dt;sp-=4*dt;if(Math.abs(off)>1.05)sp*=1-1.4*dt;sp=cl(sp,0,mxs);
 const f=sp/mxs,dri=Math.abs(stv)>.55&&f>.55;
 da+=(stv*(dri?.5:.12)-da)*Math.min(1,dt*6);
 off+=stv*dt*(.3+f*1.3)*grip*1.3*(dri?1.15:1)+ck(pz+10)*sp*sp*dt*.06/HW*(dri?.6:1);
 pz+=sp*dt;score+=dt*sp*.2;
 if(dri){combo=Math.min(8,combo+dt*1.5);score+=dt*sp*.7*combo*tire.d;nit=Math.min(1,nit+dt*.12);spawn(cx(pz)-off*HW,.4,pz-1.8,3,3,.8,[0x9aa0b0,0xc0c8d8],1.5);if(R()<.4)spawn(cx(pz)-off*HW,.3,pz-2,2,5,.3,[0xffa030,0xffe080],2);markT-=dt;if(markT<=0){markT=.04;mark(cx(pz),pz-1.2,tg(pz)-da,TR[S.eq.trail].c(tt*30|0));if(combo>2.9&&combo-dt*1.5<2.9)pop('ДРИФТ x3 🔥','#fa3')}}else combo=Math.max(1,combo-dt*3);
 if(nitOn){const nc=NI[S.eq.nit].c;for(const sx of[-.55,.55])spawn(cx(pz)-off*HW+sx,.5,pz-2.5,3,6,.45,nc,0)}
 ui.bc=(ui.bc||0)-dt;if(Math.abs(off)>1.4){if(sp>34||Math.abs(off)>1.75&&sp>16)crash();else{off=Math.sign(off)*1.38;sp*=.6;if(ui.bc<=0){ui.bc=.5;shake=.8;vib(40);pop('УДАР','#f55');noise(.3,400,.5);spawn(cx(pz)-off*HW,.8,pz,25,10,.5,[0xffffff,0xffb050],3)}}}
 if(time>8&&msgT<=0&&R()<dt*.06){msgT=2.2;pop(MS[R()*MS.length|0],'#fff')}
 time+=dt;
 for(const b of bots){b.z+=b.v*dt;
  if(b.burn>0){b.burn-=dt;b.off+=b.sx*dt*.5;b.v*=1-.6*dt;spawn(bx(b),1.3,b.z,2,3,.7,[0xff7a00,0xffd23a,0x444444],3);if(b.burn<=0){boom(b);continue}}
  else{b.v+=(Math.max(22,sp*b.k)-b.v)*dt*.5;b.t-=dt;if(b.t<=0){b.t=2+R()*3;const d=b.z-pz;b.tx=b.cut&&d>10&&d<60?off:[-.55,0,.55][R()*3|0]}b.off+=(cl(b.tx,-.85,.85)-b.off)*dt*1.2}
  const dz=b.z-pz;if(dz<-120||dz>420){respawn(b);continue}
  if(Math.abs(dz)<4.3&&Math.abs(b.off-off)*HW<1.95){const sg2=b.off>=off?1:-1,ovl=(1.95/HW-Math.abs(b.off-off))*.5,rv=sp-b.v;off-=sg2*ovl;b.off+=sg2*ovl;b.tx=b.off;
   if(dz>0&&rv>0){sp-=rv*.35;b.v+=rv*.5;if(rv>18&&b.burn<=0){b.burn=1.2;b.sx=-sg2*1.5;score+=300;nit=Math.min(1,nit+.2);pop('ТАРАН! +300','#fa3')}}
   if(ui.bc<=0){ui.bc=.4;shake=.5;vib(25);noise(.2,900,.4);spawn(bx(b),1,b.z,20,8,.4,[0xffffff,0xffc060],2)}}}}
function over(){st='over';S.coins+=score|0;S.best=Math.max(S.best,score|0);save();
 ov(`<div class="lg r">МАТРИЦА ТЕБЯ ПОГЛОТИЛА</div><p>очки: <b>${score|0}</b> · взорвано: ${kills}<br>рекорд: ${S.best} · в кошельке: ${S.coins} ⛁</p><button onclick="start()">↻ ЕЩЁ РАЗ</button><button onclick="shop()">ГАРАЖ</button>`)}
function render(dt){
 const px=cx(pz)-off*HW,tn=tg(pz),yaw=tn-da,pgp=pg.position;pgp.set(px,0,pz);pg.rotation.y=yaw;pg.rotation.z=-stv*.03*sp/mxs;
 pg.userData.me.forEach(m=>m.visible=!fp);if(st=='play'){const sw=(g,v)=>g.userData.wh.forEach(w=>w.rotation.x+=v*dt/.42);sw(pg,sp);bots.forEach(b=>sw(b.g,b.v))}
 bots.forEach(b=>{const x=bx(b);b.g.position.set(x,0,b.z);b.g.rotation.y=tg(b.z)+(b.burn>0?b.sx*2*(1.5-b.burn):0)})
 const f=sp/mxs,sk=(shake*.25)*(R()-.5);
 let fov=68+f*22+(nitOn?14:0);
 if(st=='menu'||st=='over'){const a=tt*(gar?.5:.25),rr=gar?6.2:8.5;cam.position.set(px+Math.sin(a)*rr,(gar?1.7:2.4)+Math.sin(tt*.2)*.4,pz+Math.cos(a)*rr);cam.lookAt(px,.9,pz);if(cam.aspect>1){if(st=='menu')cam.translateX(-rr*.28)}else cam.translateY(-rr*.3);fov=gar?42:50}
 else if(fp){const c=Math.cos(yaw),s=Math.sin(yaw);cam.position.set(px-.45*c+.2*s,1.3,pz+.45*s+.2*c);cam.rotation.set(0,yaw+PI,-stv*.04);}
 else{const fw=new THREE.Vector3(Math.sin(tn-da*.5),0,Math.cos(tn-da*.5)),d=new THREE.Vector3(px,3.3,pz).addScaledVector(fw,-8.5-(nitOn?1.5:0));cam.position.lerp(d,1-Math.exp(-dt*9));cam.lookAt(px+fw.x*12,1.2,pz+fw.z*12);cam.rotateZ(-stv*.05)}
 if(cam.aspect<1)fov*=1.5;cam.position.x+=sk;cam.position.y+=sk;cam.fov+=(fov-cam.fov)*Math.min(1,dt*5);cam.updateProjectionMatrix();
 cab.visible=fp&&(st=='play'||st=='dead');whl.rotation.z=-stv*.9;ndl.rotation.z=2.5-f*5;gh.visible=!held;gu.visible=held;gu.position.z=-.7+kick*.12;gu.rotation.x=kick*.15;mf.intensity=kick>.7?8:0;
 $('#hint').style.display=fp&&!held&&st=='play'?'block':'none';
 sun.position.set(px-50,80,pz+60);sun.target.position.set(px,0,pz);
 gnd.position.x=px;gnd.position.z=pz;const TT=400/gnd.material.map.repeat.x;gnd.material.map.offset.set(px/TT,-pz/TT);mts.position.set(px,0,pz);
 for(const m of segs)if(m.userData.z<pz-3*L){m.userData.z+=N*L;placeSeg(m)}
 const wa=wx.geometry.attributes.position.array;wP.forEach((p,i)=>{p.y-=B.fv*dt;p.x+=Math.sin(tt+p.s)*dt*(B.fv>.5?1.5:.5)-.0*dt;p.z+=Math.cos(tt*.7+p.s)*dt*.5;
  if(p.y<0){p.y+=22}const X=cam.position.x,Z=cam.position.z;if(p.x-X>40)p.x-=80;if(p.x-X<-40)p.x+=80;if(p.z-Z>60)p.z-=80;if(p.z-Z<-20)p.z+=80;wa[i*3]=p.x;wa[i*3+1]=p.y;wa[i*3+2]=p.z});wx.geometry.attributes.position.needsUpdate=true;
 if(ge){ge.gain.value=st=='play'?.05:0;eng.frequency.value=38+sp*2.6+(nitOn?25:0)}
 if(cp){fxp.uniforms.t.value=tt;fxp.uniforms.s.value=st=='play'?Math.max(0,f-.5)+(nitOn?.5:0):0;cp.render(dt)}else rd.render(scene,cam);
 // 2D эффекты: скоростные линии / матрица
 fc.clearRect(0,0,fx.width,fx.height);const w=fx.width,h=fx.height;
 if(st=='dead'||st=='over'){const a=st=='over'?3:dead;fc.fillStyle=`rgba(0,12,0,${Math.min(.85,a*.45)})`;fc.fillRect(0,0,w,h);fc.font='14px monospace';const C='ｱｲｳｴｵｶｷｸｹｺ0123456789';
  for(let i=0;i<Math.min(w/12,a*w/24);i++){const y=(i*97+tt*(90+i%7*40))%(h+120);for(let j=0;j<9;j++){fc.fillStyle=j?`rgba(0,255,70,${1-j/9})`:'#d8ffd8';fc.fillText(C[(i+j+(tt*8|0))%C.length],i*12,y-j*14)}}}
 else if(st=='play'&&(f>.6||nitOn)){const a=Math.min(.55,(f-.55)*1.2+(nitOn?.3:0));fc.strokeStyle=nitOn?`rgba(${NI[S.eq.nit].s},${a})`:`rgba(255,255,255,${a*.6})`;fc.lineWidth=1;for(let i=0;i<46;i++){const an=R()*6.28,r1=h*(.38+R()*.25),r2=r1+h*(.12+R()*.3);fc.beginPath();fc.moveTo(w/2+Math.cos(an)*r1*1.3,h/2+Math.sin(an)*r1);fc.lineTo(w/2+Math.cos(an)*r2*1.3,h/2+Math.sin(an)*r2);fc.stroke()}}
 if(st=='play'||st=='dead'){$('#sc').textContent=score|0;$('#kh').textContent=(sp*3.6|0)+' КМ/Ч';$('#cb').textContent=combo>1.5?'ДРИФТ x'+combo.toFixed(1):'';$('#nf').style.width=nit*100+'%';$('#am').textContent=held?'●'.repeat(ammo)+(rel>0?' ПЕРЕЗАРЯДКА':''):''}}
// ---------- UI ----------
function ov(h){O.innerHTML='<div class="pn">'+h+'</div>';O.style.display='flex'}
function menu(){gar=false;buildWorld();reset();st='menu';ov(`<div class="lg">ЗАЕЗД<br>В ОДИНЦОВО<i>REMASTERED</i></div><div class="sub">${BI[S.eq.loc].n} · ${TM[S.eq.tm].n}</div><button class="pri" onclick="start()">▶ ЕХАТЬ</button><button onclick="shop()">🔧 ГАРАЖ</button><div class="stt"><span><b>${S.best}</b>рекорд</span><span><b>${S.coins}</b>очки ⛁</span></div><small>ПК: ←→ руль · S тормоз · Shift нитро · C вид · G дробовик · ЛКМ/пробел огонь · R перезарядка<br>Телефон (горизонтально): ◀ ▶ или свайп слева, тап справа — дробовик/выстрел</small>`)}
function start(){gar=false;aud();const de=document.documentElement;try{de.requestFullscreen&&de.requestFullscreen().catch(()=>0);0}catch(e){}AC&&AC.resume();reset();st='play';O.style.display='none'}
const TABS=[['skin','Скины'],['tire','Шины'],['gun','Дробовик'],['trail','След'],['nit','Нитро'],['loc','Карта'],['tm','Время'],['up','Прокачка']];
function shop(tab='skin'){gar=true;
 let h=`<div class="hd">ГАРАЖ<b>${S.coins|0} ⛁</b></div><div class="tabs">${TABS.map(t=>`<button class="${t[0]==tab?'on':''}" onclick="shop('${t[0]}')">${t[1]}</button>`).join('')}</div><div class="list">`;
 if(tab=='up')UP.forEach(u=>{const l=S.up[u[0]],c=300*Math.pow(l+1,1.6)|0;h+=`<div class="it"><span><b>${u[1]}</b> ур.${l}/5<br><small>${u[2]}</small></span><button ${l>=5?'disabled':''} onclick="upg('${u[0]}',${c})">${l>=5?'МАКС':'⛁ '+c}</button></div>`});
 else DB[tab].forEach((it,i)=>{const own=S.own[tab].includes(i),eq=S.eq[tab]==i;
  h+=`<div class="it"><span>${tab=='skin'?`<i class="sw" style="background:linear-gradient(${it.a} 50%,${it.b} 50%)"></i>`:tab=='nit'?`<i class="sw" style="background:rgb(${it.s});box-shadow:0 0 12px rgb(${it.s})"></i>`:''}<b>${it.n}</b>${it.t?`<br><small>${it.t}</small>`:''}</span><button class="${eq?'on':''}" onclick="buy('${tab}',${i})">${eq?'✔ ВЫБРАНО':own?'ВЫБРАТЬ':'⛁ '+it.p}</button></div>`});
 ov(h+`</div><button onclick="menu()">← НАЗАД</button>`)}
function buy(c,i){const it=DB[c][i];if(!S.own[c].includes(i)){if(S.coins<it.p)return;S.coins-=it.p;S.own[c].push(i)}S.eq[c]=i;save();if(c=='loc'||c=='tm')buildWorld();if(c=='skin'||c=='gun'||c=='loc'||c=='tm')reset();shop(c)}
function upg(k,c){if(S.coins<c||S.up[k]>=5)return;S.coins-=c;S.up[k]++;save();shop('up')}
// ---------- ввод ----------
let sid=null,sx0=0,gar=false;
addEventListener('pointerdown',e=>{if(st!='play'||e.target.closest('.b'))return;if(e.clientX<innerWidth/2){sid=e.pointerId;sx0=e.clientX}else if(fp){const nx=e.clientX/innerWidth*2-1,ny=-e.clientY/innerHeight*2+1;if(!held){if(nx>0&&ny>.05){held=true;ammo=GU[S.eq.gun].m}}else fire(nx,ny)}});
addEventListener('pointermove',e=>{if(e.pointerId==sid)ui.steer=cl((e.clientX-sx0)/45,-1,1)});
['pointerup','pointercancel'].forEach(t=>addEventListener(t,e=>{if(e.pointerId==sid){sid=null;ui.steer=0}}));
[['brk','brk'],['nit','nit'],['bl','l'],['br','r']].forEach(([id,k])=>{const el=$('#'+id);el.onpointerdown=e=>{ui[k]=1;e.preventDefault()};['pointerup','pointercancel','pointerleave'].forEach(ev=>el['on'+ev]=()=>ui[k]=0)});
$('#vw').onclick=()=>{fp=!fp};$('#rl').onclick=startReload;
onkeydown=e=>{const k=e.key.toLowerCase();keys[k]=1;if(k=='c')fp=!fp;if(k=='g'&&fp&&st=='play')held=true;if(k=='r')startReload();if(k==' '){fire(0,0);e.preventDefault()}};onkeyup=e=>keys[e.key.toLowerCase()]=0;
addEventListener('mousedown',e=>{if(st=='play'&&fp&&held&&e.button==0)fire(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1)});
let lt=0;function loop(t){const dt=Math.min(.05,(t-lt)/1000||0);lt=t;update(dt);render(dt);if(document.body.className!=st)document.body.className=st;requestAnimationFrame(loop)}
menu();requestAnimationFrame(loop);
