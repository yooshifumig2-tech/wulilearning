(function(){"use strict";
const old=window.FUMI_ANALYSIS||{}, DETAILS=old.details||{};
const C={ink:"#173b59",blue:"#2b7de9",orange:"#ef7137",green:"#23966a",red:"#d9475f",muted:"#8aa4b8",pale:"#f5f9fd",gold:"#f6c85f"};
const E=s=>String(s).replace(/[&<>\"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function t(x,y,s,o={}){return `<text x="${x}" y="${y}" fill="${o.c||C.ink}" font-size="${o.z||15}" font-weight="${o.w||600}" text-anchor="${o.a||"start"}">${E(s)}</text>`}
function ln(x1,y1,x2,y2,o={}){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c||C.ink}" stroke-width="${o.w||2.5}" ${o.d?'stroke-dasharray="7 6"':''} ${o.arrow?'marker-end="url(#'+(o.marker||'arr')+')"':''}/>`}
function vec(x,y,dx,dy,label,o={}){const ex=x+dx,ey=y+dy;return `<g class="force-vector">${ln(x,y,ex,ey,{c:o.c||C.orange,w:o.w||3.5,arrow:true,marker:o.marker||"arr"})}${t(ex+(o.tx??6),ey+(o.ty??-7),label,{c:o.c||C.orange,z:o.z||15,w:800,a:o.a})}</g>`}
function ball(x,y,label="",fill=C.gold,r=15){return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${C.ink}" stroke-width="2.5"/>${label?t(x,y+5,label,{z:14,w:800,a:"middle"}):""}`}
function charge(x,y,sign,fill){return ball(x,y,sign,fill||(sign==="+"?"#ffd8c8":"#cfeaff"),18)}
function panel(x,y,w,h,title,body){return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#fff" stroke="#d8e6f1" stroke-width="2"/>${t(x+16,y+26,title,{c:C.blue,z:14,w:800})}${body}</g>`}
function axes(x,y,angle=0){return `<g transform="rotate(${angle} ${x} ${y})" opacity=".72">${ln(x-46,y,x+60,y,{c:C.muted,w:1.5,arrow:true,marker:"arrGrey"})}${ln(x,y+48,x,y-60,{c:C.muted,w:1.5,arrow:true,marker:"arrGrey"})}${t(x+63,y+4,"x",{c:C.muted,z:12})}${t(x+5,y-64,"y",{c:C.muted,z:12})}</g>`}
function fbd(x,y,forces,opt={}){return `${axes(x,y,opt.axis||0)}${ball(x,y,opt.label||"物体","#fff",10)}${forces.map(f=>vec(x,y,f[0],f[1],f[2],{c:f[3],tx:f[4],ty:f[5],a:f[6]})).join("")}`}
function defs(){return `<defs><marker id="arr" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="context-stroke"/></marker><marker id="arrGrey" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${C.muted}"/></marker></defs>`}
function legend(){return `<g transform="translate(500 315)">${ln(0,0,34,0,{c:C.orange,w:3,arrow:true})}${t(41,5,"实际力/场矢量",{c:C.orange,z:12})}${ln(122,0,156,0,{c:C.muted,w:2,d:true})}${t(163,5,"辅助线",{c:C.muted,z:12})}</g>`}
function pairScene(mode="repel"){
 const inward=mode==="attract";
 return panel(14,42,334,252,"① 情境与作用线",`${charge(92,155,"+")}${charge(270,155,inward?"−":"+")}${ln(112,155,250,155,{c:C.muted,w:2,d:true})}${vec(92,155,inward?72:-58,0,"F₁",{c:C.green,tx:inward?4:-28,ty:-10})}${vec(270,155,inward?-72:58,0,"F₂",{c:C.green,tx:inward?-28:4,ty:-10})}${t(181,142,"r",{c:C.muted,a:"middle"})}${t(181,220,inward?"异号：沿连线相吸":"同号：沿连线相斥",{a:"middle",z:14})}`)+panel(362,42,344,252,"② 隔离其中一个电荷",`${fbd(525,166,[[0,82,"mg",C.orange,7,0],[-92,0,"F_c",C.green,-31,-10],[0,-82,"N",C.blue,7,-6]],{label:"q"})}${t(525,268,"箭头均从研究对象中心出发",{a:"middle",c:C.muted,z:13})}`);
}
function inclineScene(horizontal=false){
 const apparatus=`<path d="M45 245 L318 108 L318 245 Z" fill="#edf4fa" stroke="${C.ink}" stroke-width="3"/>${ball(218,159,"q")}${ln(218,159,95,221,{c:C.muted,w:2,d:true})}${t(65,239,"θ",{z:15})}`;
 const forces=horizontal?[[0,88,"mg",C.orange,7,0],[-42,-83,"N",C.blue,-33,-6],[92,0,"F_c",C.green,6,-8],[-77,39,"T",C.red,-35,21]]:[[0,88,"mg",C.orange,7,0],[-42,-83,"N",C.blue,-33,-6],[-86,43,"F_c",C.green,-37,22]];
 return panel(14,42,334,252,"① 斜面与研究对象",apparatus)+panel(362,42,344,252,"② 隔离小球后的受力图",`${fbd(528,164,forces,{label:"B",axis:-26})}${t(528,272,"分解重力，不把分力重复当作新力",{a:"middle",c:C.muted,z:13})}`);
}
function pendulumScene(two=false){
 const app=two?`${ln(55,68,145,68,{w:3})}${ln(237,68,327,68,{w:3})}${ln(100,68,145,178,{w:3})}${ln(282,68,237,178,{w:3})}${ball(145,178,"P")}${ball(237,178,"Q")}${ln(161,178,221,178,{c:C.muted,w:2,d:true})}`:`${ln(76,67,280,67,{w:3})}${ln(178,67,246,181,{w:3})}${ball(246,181,"q")}${ln(246,181,246,245,{c:C.muted,w:1.5,d:true})}${t(205,101,"θ",{z:14})}`;
 const forces=two?[[0,78,"mg",C.orange,6,0],[-42,-79,"T",C.blue,-28,-7],[82,0,"F_c / qE",C.green,5,-9]]:[[0,82,"mg",C.orange,6,0],[-48,-78,"T",C.blue,-30,-8],[86,0,"qE",C.green,6,-9]];
 return panel(14,42,334,252,"① 悬挂情境",app)+panel(362,42,344,252,"② 质点受力图",`${fbd(525,165,forces,{label:two?"P":"q"})}${t(525,270,"T沿绳指向悬点；mg始终竖直向下",{a:"middle",c:C.muted,z:13})}`);
}
function radialScene(){
 return panel(14,42,334,252,"① 圆弧几何关系",`<path d="M45 225 Q181 55 317 225" fill="none" stroke="${C.ink}" stroke-width="3"/>${ball(116,151,"A")}${ball(246,151,"B")}${ln(181,78,116,151,{c:C.muted,w:2,d:true})}${ln(181,78,246,151,{c:C.muted,w:2,d:true})}${t(181,69,"O",{a:"middle",z:16})}${t(181,245,"先由弦长求两球间距",{a:"middle",c:C.muted,z:13})}`)+panel(362,42,344,252,"② 隔离A球",`${fbd(524,164,[[0,88,"mg",C.orange,7,0],[64,-72,"N",C.blue,7,-6],[-94,0,"F_c",C.green,-35,-9]],{label:"A"})}${ln(524,164,588,92,{c:C.muted,w:2,d:true})}${t(524,273,"N沿半径指向圆心；F_c沿AB",{a:"middle",c:C.muted,z:13})}`);
}
function fieldScene(kind="superpose"){
 let left="",right="";
 if(kind==="induction"){
  left=`${charge(74,164,"+")}${ln(108,164,185,164,{c:C.muted,w:2,d:true})}<rect x="188" y="128" width="128" height="72" rx="28" fill="#edf4fa" stroke="${C.ink}" stroke-width="2.5"/>${t(214,157,"− −",{c:C.blue,z:17})}${t(266,157,"+ +",{c:C.red,z:17})}${vec(274,182,-57,0,"e⁻",{c:C.blue,tx:-10,ty:19})}${t(181,242,"电子逆外电场移动",{a:"middle",c:C.muted,z:13})}`;
  right=`${charge(500,166,"+")}${vec(500,166,102,0,"E",{c:C.blue})}${vec(500,166,-82,0,"F（q<0）",{c:C.green,tx:-72,ty:-10})}${t(534,247,"先定E，再由电荷正负定F",{a:"middle",c:C.muted,z:13})}`;
 }else if(kind==="ground"){
  left=`${charge(74,152,"−")}${ln(106,152,174,152,{c:C.muted,w:2,d:true})}<rect x="176" y="119" width="140" height="66" rx="26" fill="#edf4fa" stroke="${C.ink}" stroke-width="2.5"/>${t(199,158,"+ +   − −",{z:17})}${vec(250,185,0,62,"e⁻",{c:C.blue,tx:8,ty:0})}${ln(218,249,282,249,{w:2})}${ln(229,258,271,258,{w:2})}${ln(241,267,259,267,{w:2})}`;
  right=`${t(528,93,"操作顺序",{a:"middle",z:16,w:800})}${t(528,128,"① 靠近",{a:"middle",c:C.blue})}${vec(528,138,0,26,"",{c:C.muted})}${t(528,184,"② 接地",{a:"middle",c:C.blue})}${vec(528,194,0,26,"",{c:C.muted})}${t(528,240,"③ 先断地，再移开",{a:"middle",c:C.red})}`;
 }else{
  left=`${charge(80,166,"+")}${charge(278,166,"−")}${ball(180,166,"P","#fff",8)}${vec(180,166,0,-78,"E₁",{c:C.blue})}${vec(180,166,78,0,"E₂",{c:C.green})}${ln(180,88,258,88,{c:C.muted,w:2,d:true})}${ln(258,88,258,166,{c:C.muted,w:2,d:true})}${vec(180,166,78,-78,"E",{c:C.orange,tx:7,ty:-2})}`;
  right=`${ball(516,166,"P","#fff",9)}${vec(516,166,-88,-56,"E₁",{c:C.blue,tx:-28,ty:-5})}${vec(516,166,-88,56,"E₂",{c:C.green,tx:-30,ty:18})}${vec(516,166,-126,0,"E合",{c:C.orange,tx:-36,ty:-10})}${t(535,247,"分场→分量→合场，方向逐层核验",{a:"middle",c:C.muted,z:13})}`;
 }
 return panel(14,42,334,252,"① 场源与作用过程",left)+panel(362,42,344,252,"② 矢量/过程分析",right);
}
function contactScene(){return panel(14,42,334,252,"① 接触前：保留正负号",`${charge(102,151,"−")}${charge(252,151,"+")}${t(102,205,"−2Q",{a:"middle",z:16})}${t(252,205,"+4Q",{a:"middle",z:16})}${t(177,245,"Q总=−2Q+4Q=+2Q",{a:"middle",c:C.red,z:14,w:800})}`)+panel(362,42,344,252,"② 相同金属球接触后",`${charge(456,151,"+")}${charge(612,151,"+")}${vec(456,151,-62,0,"F",{c:C.green,tx:-22,ty:-10})}${vec(612,151,62,0,"F",{c:C.green,tx:6,ty:-10})}${t(534,209,"每球 +Q",{a:"middle",z:16,w:800})}${t(534,245,"再用库仑定律比较前后",{a:"middle",c:C.muted,z:13})}`)}
function processScene(type){
 if(type==="shield")return panel(14,42,334,252,"① 导体中的电场抵消",`${ln(44,168,316,168,{c:C.blue,w:3,arrow:true})}${t(52,148,"E₀",{c:C.blue})}${ln(306,195,68,195,{c:C.green,w:3,arrow:true})}${t(285,219,"E′",{c:C.green})}<rect x="112" y="105" width="140" height="124" rx="18" fill="#edf4fa99" stroke="${C.ink}" stroke-width="3"/>${t(182,177,"E内=0",{a:"middle",c:C.red,z:19,w:800})}`)+panel(362,42,344,252,"② 静电平衡结论",`${t(534,107,"自由电子停止定向移动",{a:"middle",z:15})}${t(534,150,"导体内部：E=0",{a:"middle",c:C.red,z:18,w:800})}${t(534,190,"导体整体：等势体",{a:"middle",c:C.blue,z:18,w:800})}${t(534,231,"净电荷：只分布在表面",{a:"middle",c:C.green,z:16,w:800})}`);
 if(type==="dust")return panel(14,42,334,252,"① 带电尘粒的运动",`${charge(78,158,"−")}${t(78,211,"放电极",{a:"middle",z:13})}${charge(286,158,"+")}${t(286,211,"集尘极",{a:"middle",z:13})}${ball(177,158,"−","#c9d7df",10)}${vec(177,158,78,0,"qE",{c:C.green})}${vec(177,158,0,70,"mg",{c:C.orange})}`)+panel(362,42,344,252,"② 隔离尘粒",`${fbd(529,162,[[92,0,"qE",C.green,7,-9],[0,84,"mg",C.orange,7,0],[-61,0,"f",C.red,-22,-9]],{label:"尘粒"})}${t(529,270,"若讨论运动，空气阻力方向与速度相反",{a:"middle",c:C.muted,z:13})}`);
 return fieldScene("induction");
}
function choose(id){
 if(["92v2","92v6","r16"].includes(id))return inclineScene(false);
 if(id==="r17")return inclineScene(true);
 if(["92v1","92v3"].includes(id))return radialScene();
 if(["r6","r13"].includes(id))return pendulumScene(true);
 if(["r8","r10","r18"].includes(id))return pendulumScene(false);
 if(["check-92","92v5","r4"].includes(id))return pairScene(id==="92v5"?"attract":"repel");
 if(["92v4","r14","r15"].includes(id))return contactScene();
 if(["check-91","91v1"].includes(id))return fieldScene("induction");
 if(["91v2","91v3"].includes(id))return fieldScene("ground");
 if(["check-94","94v1","94v2","r9","r12"].includes(id))return processScene("shield");
 if(id==="r7")return processScene("dust");
 if(id==="r11")return pendulumScene(false);
 return fieldScene("superpose");
}
function diagram(id){return `<svg class="physics-diagram-pro" viewBox="0 0 720 340" role="img" aria-label="本题情境与受力分析图">${defs()}<rect width="720" height="340" rx="22" fill="${C.pale}"/>${t(20,25,"先隔离研究对象，再画从中心出发的实际力；辅助线不计作新力",{c:C.ink,z:14,w:800})}${choose(id)}${legend()}</svg>`}
function render(id,baseSteps=[],mistake=""){
 const details=DETAILS[id]||[];
 return `<section class="analysis-full analysis-pro"><div class="analysis-title"><span>PRO FORCE-DIAGRAM LOGIC</span><h3>情境建模与规范受力分析</h3></div><div class="analysis-svg">${diagram(id)}</div><div class="force-legend-text"><b>读图规则：</b>彩色实线箭头表示实际力或场矢量；灰色虚线只表示坐标轴、距离、分量与几何辅助线。分力不会再次计入受力个数。</div><div class="analysis-grid">${details.map((x,i)=>`<article class="analysis-step"><b>${["① 隔离研究对象","② 画全实际作用","③ 建立方程 / 矢量关系","④ 回到原题核验"][i]||`步骤${i+1}`}</b><p>${x}</p></article>`).join("")}</div>${baseSteps.length?`<div class="source-analysis"><h3>资料原解析 · 分步展开</h3>${baseSteps.map((s,i)=>`<div class="source-step"><strong>STEP ${i+1}</strong><p>${s}</p></div>`).join("")}</div>`:""}${mistake?`<div class="analysis-warning"><b>⚠ 典型错误</b><p>${mistake}</p></div>`:""}</section>`;
}
window.FUMI_ANALYSIS={render,svg:diagram,details:DETAILS};
})();
