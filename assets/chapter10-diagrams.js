(function(){
  "use strict";
  const C={ink:"#173a53",blue:"#2878d4",blueSoft:"#eaf3ff",orange:"#e56b31",green:"#25875e",red:"#c44536",gold:"#d3a642",muted:"#6b7884",line:"#bfd0dc",paper:"#fbfdff"};
  const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  function defs(){return`<defs><marker id="ch10-arr-o" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${C.orange}"/></marker><marker id="ch10-arr-b" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${C.blue}"/></marker><marker id="ch10-arr-g" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${C.green}"/></marker><linearGradient id="ch10-energy" x1="0" x2="1"><stop offset="0" stop-color="#2878d4"/><stop offset="1" stop-color="#e56b31"/></linearGradient></defs>`}
  function text(x,y,t,o={}){return`<text x="${x}" y="${y}" fill="${o.c||C.ink}" font-size="${o.z||16}" font-weight="${o.w||650}" text-anchor="${o.a||"start"}" dominant-baseline="middle">${esc(t)}</text>`}
  function line(x1,y1,x2,y2,o={}){return`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c||C.ink}" stroke-width="${o.w||3}" ${o.d?`stroke-dasharray="${o.d}"`:""} ${o.arrow?`marker-end="url(#ch10-arr-${o.arrow})"`:""}/>`}
  function circle(x,y,r,o={}){return`<circle cx="${x}" cy="${y}" r="${r}" fill="${o.f||"#fff"}" stroke="${o.c||C.ink}" stroke-width="${o.w||3}"/>`}
  function base(title,body,caption="解析图在提交后出现；箭头与标注随步骤逐层显现"){return`<svg class="ch10-diagram" viewBox="0 0 760 390" role="img" aria-label="${esc(title)}">${defs()}<rect width="760" height="390" rx="22" fill="${C.paper}"/>${text(24,27,title,{z:15,w:850})}${body}<rect x="20" y="351" width="720" height="24" rx="12" fill="#eef4f8"/>${text(380,363,caption,{z:11,c:C.muted,a:"middle",w:600})}</svg>`}
  const show=(step,min)=>step>=min?1:0;

  function lesson(id,s={}){
    if(id==="101"){
      const sign=s.sign==="negative"?-1:1,path=s.path||"curve",dx=Number(s.dx||4),q=sign>0?"+q":"−q",W=sign*dx;
      const curve=path==="straight"?`M145 218 L600 218`:path==="broken"?`M145 218 L300 105 L460 285 L600 218`:`M145 218 C260 65 430 330 600 218`;
      return base("10.1 多路径做功实验",`${text(70,77,"匀强电场 E",{c:C.orange,w:850})}${line(70,100,205,100,{c:C.orange,w:4,arrow:"o"})}${text(224,100,"电势降低方向",{c:C.muted,z:12})}<path d="${curve}" fill="none" stroke="${C.blue}" stroke-width="5" stroke-linecap="round"/><circle cx="145" cy="218" r="25" fill="#fff" stroke="${C.ink}" stroke-width="3"/>${text(145,218,q,{a:"middle",z:18,w:900})}${circle(600,218,8,{f:C.orange,c:C.orange})}${text(130,260,"A",{z:18,w:850})}${text(593,260,"B",{z:18,w:850})}${line(145,309,600,309,{c:C.green,w:3,arrow:"g"})}${text(372,293,`沿场方向投影 Δx = ${dx} 格`,{a:"middle",c:C.green,z:14})}${text(380,338,`W_AB = qEΔx → 归一化结果 ${W>0?"+":""}${W}`,{a:"middle",z:19,w:900,c:W>=0?C.green:C.red})}`,"改变路径不改变初末位置；静电力做功只由q、E和沿场方向的位移投影决定");
    }
    if(id==="102"){
      const a=Number(s.phiA??80),b=Number(s.phiB??20),q=Number(s.charge??1),u=a-b,w=q*u;
      return base("10.2 电势差与功的正负",`${line(100,255,655,255,{c:C.ink,w:3,arrow:"b"})}${text(665,255,"位置",{z:12,c:C.muted})}${line(130,90,130,300,{c:C.line,w:2,d:"6 6"})}${line(610,90,610,300,{c:C.line,w:2,d:"6 6"})}${circle(130,205,23,{f:"#fff",c:C.blue})}${circle(610,205,23,{f:"#fff",c:C.orange})}${text(130,205,"A",{a:"middle",w:900})}${text(610,205,"B",{a:"middle",w:900})}${text(130,125,`φA=${a} V`,{a:"middle",c:C.blue,z:18,w:900})}${text(610,125,`φB=${b} V`,{a:"middle",c:C.orange,z:18,w:900})}${line(162,205,572,205,{c:u>=0?C.green:C.red,w:5,arrow:u>=0?"g":"o"})}${text(370,183,`UAB=φA−φB=${u} V`,{a:"middle",c:C.green,z:18,w:900})}${text(370,315,`q=${q>0?"+":""}${q}（归一化）　WAB=qUAB=${w}`,{a:"middle",z:17,w:850})}`,"交换A、B后电势差变号；更换零电势参考点不会改变UAB");
    }
    if(id==="103"){
      const deg=Number(s.angle??35),L=4,rad=deg*Math.PI/180,d=L*Math.cos(rad),x2=190+320*Math.cos(rad),y2=235-180*Math.sin(rad);
      return base("10.3 投影距离 d=Lcosθ",`${text(72,76,"E",{c:C.orange,w:900,z:19})}${line(102,76,255,76,{c:C.orange,w:5,arrow:"o"})}${line(190,235,x2,y2,{c:C.blue,w:5})}${circle(190,235,9,{f:C.blue,c:C.blue})}${circle(x2,y2,9,{f:C.orange,c:C.orange})}${text(169,260,"A",{z:18,w:900})}${text(x2+12,y2-6,"B",{z:18,w:900})}${line(190,286,x2,286,{c:C.green,w:4,arrow:"g"})}${line(x2,y2,x2,286,{c:C.line,w:2,d:"6 6"})}<path d="M250 235 A60 60 0 0 0 ${190+60*Math.cos(rad)} ${235-60*Math.sin(rad)}" fill="none" stroke="${C.gold}" stroke-width="3"/>${text(255,216,`θ=${deg}°`,{c:C.gold,w:850})}${text(350,310,`L=${L}，d=${d.toFixed(2)}`,{a:"middle",z:18,w:900})}${text(350,337,`UAB=Ed；d不是斜线AB的长度`,{a:"middle",c:C.red,z:15,w:900})}`,"只有沿电场方向的投影距离进入U=Ed；垂直于E移动时d=0");
    }
    if(id==="104"){
      const area=Number(s.area??5),gap=Number(s.gap??4),mode=s.mode||"voltage",Crel=area/gap,Q=mode==="voltage"?Crel:1,U=mode==="voltage"?1:1/Crel,E=U/gap;
      const half=70+area*23,y1=205-gap*11,y2=205+gap*11;
      let charges="";for(let i=0;i<Math.max(3,Math.round(area*1.4));i++){const x=380-half+25+i*(2*half-50)/(Math.max(3,Math.round(area*1.4))-1);charges+=text(x,y1-14,"+",{a:"middle",c:C.red,w:900})+text(x,y2+17,"−",{a:"middle",c:C.blue,w:900})}
      return base("10.4 平行板电容器动态实验",`${line(380-half,y1,380+half,y1,{c:C.red,w:8})}${line(380-half,y2,380+half,y2,{c:C.blue,w:8})}${charges}${line(300,y1+8,300,y2-8,{c:C.orange,w:2,arrow:"o"})}${line(380,y1+8,380,y2-8,{c:C.orange,w:2,arrow:"o"})}${line(460,y1+8,460,y2-8,{c:C.orange,w:2,arrow:"o"})}${text(380,81,mode==="voltage"?"仍连接理想电源：U不变":"已断开且无泄漏：Q不变",{a:"middle",z:18,w:900,c:mode==="voltage"?C.green:C.orange})}${text(380,304,`C∝S/d=${Crel.toFixed(2)}　Q=${Q.toFixed(2)}　U=${U.toFixed(2)}　E=U/d=${E.toFixed(2)}`,{a:"middle",z:16,w:850})}${text(380,331,"分析顺序：先定不变量 → C → Q或U → E",{a:"middle",z:14,c:C.muted,w:750})}`,"数值为归一化演示；理想平行板模型忽略边缘效应与漏电");
    }
    const u1=Number(s.u1??4),u2=Number(s.u2??2),def=48*u2/u1,dir=u2>=0?1:-1;
    return base("10.5 加速—偏转—打屏",`${line(90,88,90,285,{c:C.blue,w:7})}${line(145,88,145,285,{c:C.orange,w:7})}${text(117,67,"加速区 U₁",{a:"middle",z:14,w:850})}${line(230,105,540,105,{c:C.red,w:7})}${line(230,265,540,265,{c:C.blue,w:7})}${text(385,80,"偏转区 U₂",{a:"middle",z:14,w:850})}${line(680,72,680,305,{c:C.ink,w:8})}${text(680,50,"荧光屏",{a:"middle",z:13,w:850})}<path d="M55 185 L230 185 Q390 185 540 ${185+dir*def} L680 ${185+dir*def*1.7}" fill="none" stroke="${C.green}" stroke-width="5"/>${circle(55,185,8,{f:C.green,c:C.green})}${line(72,185,145,185,{c:C.green,w:3,arrow:"g"})}${text(374,319,`v₀∝√U₁；屏上偏移 Y∝U₂/U₁ = ${(u2/u1).toFixed(2)}`,{a:"middle",z:17,w:900})}${text(374,343,Math.abs(def)>74?"当前参数：粒子可能撞板，应先检查边界":"当前参数：粒子能够从极板间飞出",{a:"middle",z:13,w:850,c:Math.abs(def)>74?C.red:C.green})}`,"电子带负电时受力方向与电场方向相反；动画轨迹方向按所选极性计算");
  }

  function energyDiagram(q,step){return base("功—电势能—动能关系图",`${text(78,82,"A",{z:20,w:900})}${circle(110,82,22,{f:"#fff",c:C.blue})}${text(110,82,q.diagramData?.charge||"+q",{a:"middle",w:900})}${text(624,82,"B",{z:20,w:900})}${circle(650,82,8,{f:C.orange,c:C.orange})}${line(142,82,610,82,{c:C.orange,w:4,arrow:"o"})}${text(375,61,"电场力做功 WAB",{a:"middle",c:C.orange,w:850})}<g opacity="${show(step,1)}">${line(198,150,560,150,{c:C.green,w:4,arrow:"g"})}${text(379,132,"WAB=qUAB",{a:"middle",c:C.green,z:18,w:900})}</g><g opacity="${show(step,2)}"><rect x="160" y="220" width="160" height="72" rx="12" fill="#eaf3ff"/><rect x="440" y="220" width="160" height="72" rx="12" fill="#fff0e6"/>${text(240,246,"电势能",{a:"middle",c:C.blue,w:850})}${text(240,274,"ΔEp=−WAB",{a:"middle",c:C.blue,z:18,w:900})}${text(520,246,"动能",{a:"middle",c:C.orange,w:850})}${text(520,274,"仅受电场力：ΔEk=WAB",{a:"middle",c:C.orange,z:16,w:900})}${line(328,256,432,256,{c:C.green,w:4,arrow:"g"})}</g>`,"先判断电场力功的正负，再判断电势能与动能变化");}
  function potentialDiagram(q,step){return base("电势、电势差与等势关系",`${line(90,280,680,280,{c:C.ink,w:3,arrow:"b"})}${text(690,280,"x",{c:C.muted})}${line(110,310,110,60,{c:C.ink,w:3,arrow:"b"})}${text(110,47,"φ",{c:C.muted})}<path d="M130 105 L640 250" fill="none" stroke="${C.blue}" stroke-width="5"/><g opacity="${show(step,1)}">${line(240,82,240,298,{c:C.line,w:2,d:"6 6"})}${line(520,82,520,298,{c:C.line,w:2,d:"6 6"})}${circle(240,136,8,{f:C.orange,c:C.orange})}${circle(520,216,8,{f:C.green,c:C.green})}${text(225,115,"A",{c:C.orange,w:900})}${text(531,203,"B",{c:C.green,w:900})}</g><g opacity="${show(step,2)}">${line(240,330,520,330,{c:C.orange,w:4,arrow:"o"})}${text(380,313,"UAB=φA−φB",{a:"middle",c:C.orange,z:18,w:900})}${text(380,354,"图线下降方向为电势降低方向；斜率为负",{a:"middle",z:13,c:C.muted})}</g>`,"电势差与零电势参考点无关，但与A、B次序有关");}
  function equipotentialDiagram(q,step){return base("等势线与电场线",`${circle(270,195,25,{f:"#fff",c:C.orange})}${text(270,195,"+Q",{a:"middle",c:C.orange,w:900})}<circle cx="270" cy="195" r="65" fill="none" stroke="${C.line}" stroke-width="2"/><circle cx="270" cy="195" r="115" fill="none" stroke="${C.line}" stroke-width="2"/><circle cx="270" cy="195" r="165" fill="none" stroke="${C.line}" stroke-width="2"/><g opacity="${show(step,1)}">${line(270,170,270,42,{c:C.orange,w:4,arrow:"o"})}${line(295,195,430,195,{c:C.orange,w:4,arrow:"o"})}${line(252,215,150,320,{c:C.orange,w:4,arrow:"o"})}${text(455,195,"E沿半径向外",{c:C.orange,w:850})}</g><g opacity="${show(step,2)}">${line(540,92,540,298,{c:C.blue,w:5})}${line(650,92,650,298,{c:C.red,w:5})}${line(555,140,635,140,{c:C.orange,w:3,arrow:"o"})}${line(555,195,635,195,{c:C.orange,w:3,arrow:"o"})}${line(555,250,635,250,{c:C.orange,w:3,arrow:"o"})}${text(595,322,"匀强场等势面与E垂直",{a:"middle",z:13,w:850})}</g>`,"三维点电荷的等势面是球面；网页平面图显示的是圆形截线");}
  function projectionDiagram(q,step){return base("U=Ed中的投影距离",`${text(78,83,"E",{c:C.orange,z:20,w:900})}${line(112,83,270,83,{c:C.orange,w:5,arrow:"o"})}${circle(180,245,9,{f:C.blue,c:C.blue})}${circle(550,105,9,{f:C.orange,c:C.orange})}${line(180,245,550,105,{c:C.blue,w:5})}${text(160,268,"A",{w:900})}${text(563,96,"B",{w:900})}<g opacity="${show(step,1)}">${line(180,295,550,295,{c:C.green,w:4,arrow:"g"})}${line(550,105,550,295,{c:C.line,w:2,d:"6 6"})}${text(365,318,"d=Lcosθ",{a:"middle",c:C.green,z:19,w:900})}</g><g opacity="${show(step,2)}">${text(365,351,"UAB=Ed；不能把斜边L直接代入",{a:"middle",c:C.red,z:16,w:900})}</g>`,"d是A、B沿场强方向的有符号投影距离");}
  function capacitorDiagram(q,step){return base("电容器状态—不变量—因果链",`${line(180,115,580,115,{c:C.red,w:8})}${line(180,265,580,265,{c:C.blue,w:8})}${text(380,83,"＋ ＋ ＋ ＋ ＋",{a:"middle",c:C.red,z:23,w:900})}${text(380,298,"− − − − −",{a:"middle",c:C.blue,z:23,w:900})}${line(280,130,280,250,{c:C.orange,w:3,arrow:"o"})}${line(380,130,380,250,{c:C.orange,w:3,arrow:"o"})}${line(480,130,480,250,{c:C.orange,w:3,arrow:"o"})}<g opacity="${show(step,1)}"><rect x="35" y="125" width="112" height="116" rx="14" fill="#eaf3ff"/>${text(91,153,"第一步",{a:"middle",c:C.blue,w:900})}${text(91,183,q.diagramData?.mode==="charge"?"断开：Q不变":"连接：U不变",{a:"middle",z:14,w:850})}${text(91,213,"先定不变量",{a:"middle",z:12,c:C.muted})}</g><g opacity="${show(step,2)}"><rect x="613" y="112" width="115" height="142" rx="14" fill="#fff0e6"/>${text(670,139,"因果链",{a:"middle",c:C.orange,w:900})}${text(670,169,"C → Q/U",{a:"middle",z:14,w:850})}${text(670,196,"→ E → F",{a:"middle",z:14,w:850})}${text(670,224,"→ φ、Ep",{a:"middle",z:14,w:850})}</g>`,"理想模型：忽略边缘效应；断开时还需无漏电、无其他放电通路");}
  function particleDiagram(q,step){return base("带电粒子的受力与运动分解",`${line(125,80,125,310,{c:C.red,w:8})}${line(625,80,625,310,{c:C.blue,w:8})}${text(125,55,"＋板",{a:"middle",c:C.red,w:900})}${text(625,55,"−板",{a:"middle",c:C.blue,w:900})}${line(165,120,585,120,{c:C.orange,w:3,arrow:"o"})}${line(165,190,585,190,{c:C.orange,w:3,arrow:"o"})}${line(165,260,585,260,{c:C.orange,w:3,arrow:"o"})}${text(375,96,"E",{a:"middle",c:C.orange,w:900})}${circle(245,215,16,{f:"#fff",c:C.green})}${text(245,215,q.diagramData?.charge||"+q",{a:"middle",z:13,w:900})}<g opacity="${show(step,1)}">${line(245,215,390,215,{c:C.green,w:5,arrow:"g"})}${text(318,195,"qE / a",{a:"middle",c:C.green,w:900})}</g><g opacity="${show(step,2)}"><path d="M245 215 Q430 215 585 145" fill="none" stroke="${C.blue}" stroke-width="5"/>${line(585,145,690,98,{c:C.blue,w:4,arrow:"b"})}${text(618,116,"v",{c:C.blue,w:900})}${line(585,145,690,145,{c:C.green,w:3,arrow:"g"})}${text(638,163,"vx",{a:"middle",c:C.green,w:850})}${line(585,145,585,73,{c:C.orange,w:3,arrow:"o"})}${text(601,90,"vy",{c:C.orange,w:850})}</g>`,"若粒子为电子，电场力方向与E相反；每题须先核对电荷正负");}
  function graphDiagram(q,step){return base("图像读取：斜率、面积与方向",`${line(105,302,675,302,{c:C.ink,w:3,arrow:"b"})}${line(105,326,105,65,{c:C.ink,w:3,arrow:"b"})}${text(690,302,"x",{c:C.muted})}${text(105,45,q.diagramData?.axis||"φ / E",{a:"middle",c:C.muted})}<path d="M125 105 C260 112 330 175 420 220 S590 266 650 278" fill="none" stroke="${C.blue}" stroke-width="5"/><g opacity="${show(step,1)}">${line(270,145,430,235,{c:C.orange,w:4,arrow:"o"})}${text(335,171,"切线斜率",{c:C.orange,w:850})}</g><g opacity="${show(step,2)}"><path d="M125 302 L125 105 C260 112 330 175 420 220 S590 266 650 278 L650 302 Z" fill="${C.green}" fill-opacity=".18" stroke="none"/>${text(510,322,"带符号面积 / 势差",{a:"middle",c:C.green,z:14,w:850})}</g>`,"φ-x图像用负斜率判断E；E-x图像用带符号面积判断电势差");}
  function circleFieldDiagram(q,step){return base("圆形区域中的场强分解",`<circle cx="360" cy="194" r="128" fill="none" stroke="#24bff2" stroke-width="3" stroke-dasharray="7 5"/>${line(297,76,423,312,{c:C.blue,w:3,d:"6 5"})}${line(232,194,488,194,{c:C.blue,w:3,d:"6 5"})}${circle(360,194,5,{f:C.ink,c:C.ink})}${text(360,178,"O",{a:"middle",z:18,w:900})}${text(286,64,"A",{w:900})}${text(427,327,"B",{w:900})}${text(212,194,"C",{a:"end",w:900})}${text(507,194,"D",{w:900})}${text(400,222,"60°",{w:850})}<g opacity="${show(step,1)}">${line(360,194,520,194,{c:C.ink,w:3,arrow:"b"})}${line(360,194,360,337,{c:C.ink,w:3,arrow:"b"})}${text(536,194,"x",{c:C.ink,w:900})}${text(360,352,"y",{a:"middle",c:C.ink,w:900})}</g><g opacity="${show(step,2)}">${line(360,194,490,194,{c:C.orange,w:5,arrow:"o"})}${line(360,194,360,310,{c:C.blue,w:5,arrow:"b"})}${text(500,214,"Eₓ",{c:C.orange,w:900})}${text(377,299,"Eᵧ",{c:C.blue,w:900})}</g><g opacity="${show(step,3)}">${line(360,194,445,342,{c:C.green,w:5,arrow:"g"})}${text(466,325,"E∥AB",{c:C.green,w:900})}</g>`,"先建立坐标并把E正交分解，再分别用两个已知过程列功—能方程");}
  function forceDiagram(q,step){const gravity=q.diagramData?.gravity!==false;return base("研究对象与作用力图",`${circle(380,190,25,{f:"#fff",c:C.ink})}${text(380,190,q.diagramData?.object||"q",{a:"middle",w:900})}${gravity?line(380,218,380,327,{c:C.orange,w:5,arrow:"o"})+text(395,298,"mg",{c:C.orange,w:900}):""}${line(405,190,555,190,{c:C.green,w:5,arrow:"g"})}${text(480,168,q.diagramData?.force||"qE",{a:"middle",c:C.green,w:900})}<g opacity="${show(step,1)}">${line(355,175,250,88,{c:C.blue,w:5,arrow:"b"})}${text(280,110,q.diagramData?.constraint||"T / N",{c:C.blue,w:900})}</g><g opacity="${show(step,2)}">${line(86,320,700,320,{c:C.line,w:2,d:"7 6"})}${text(380,344,"按选定坐标轴分别列平衡、运动或能量方程",{a:"middle",c:C.muted,z:13,w:850})}</g>`,"图中只画研究对象实际受到的力，不把速度、场强或运动方向当成力");}

  /*
   * The source image remains above each answer.  These SVGs are therefore
   * solution overlays, not replacements for the original drawing.  Where a
   * source question depends on geometry or polarity we use an id-specific
   * overlay instead of the generic chapter illustration.  `step` controls
   * when each construction becomes fully opaque.
   */
  const layer=(step,min,body)=>`<g opacity="${show(step,min)}">${body}</g>`;
  const dot=(x,y,label,o={})=>`${circle(x,y,o.r||7,{f:o.f||C.ink,c:o.c||C.ink,w:o.w||2})}${label?text(x+(o.dx??0),y+(o.dy??-20),label,{a:o.a||"middle",z:o.z||15,w:900,c:o.tc||C.ink}):""}`;
  const charge=(x,y,label,color)=>`${circle(x,y,22,{f:"#fff",c:color,w:4})}${text(x,y,label,{a:"middle",c:color,z:17,w:950})}`;
  const formulaBox=(x,y,w,label,o={})=>`<rect x="${x}" y="${y}" width="${w}" height="${o.h||42}" rx="12" fill="${o.f||"#eef4f8"}" stroke="${o.c||C.line}" stroke-width="1.5"/>${text(x+w/2,y+(o.h||42)/2,label,{a:"middle",z:o.z||14,w:900,c:o.tc||C.ink})}`;

  function pathsWorkDiagram(q,step){
    return base("三条路径，只认同一个沿场投影",`${text(82,78,"E",{c:C.orange,z:20,w:900})}${line(112,78,245,78,{c:C.orange,w:5,arrow:"o"})}${dot(145,237,"A",{dy:28})}${dot(615,237,"B",{dy:28,f:C.orange,c:C.orange})}<path d="M145 237 C250 72 500 75 615 237" fill="none" stroke="${C.blue}" stroke-width="4"/><path d="M145 237 L615 237" fill="none" stroke="${C.green}" stroke-width="4"/><path d="M145 237 L615 112 L615 237" fill="none" stroke="${C.gold}" stroke-width="4"/>${text(350,110,"路径1",{c:C.blue,z:13})}${text(355,219,"路径2",{c:C.green,z:13})}${text(545,125,"路径3",{c:C.gold,z:13})}${layer(step,1,`${line(145,305,615,305,{c:C.orange,w:4,arrow:"o"})}${text(380,286,"三条路径的 Δx 相同",{a:"middle",c:C.orange,w:900})}`)}${layer(step,2,`${formulaBox(213,318,334,"W₁=W₂=W₃=qEΔx",{h:34,f:"#e8f7ef",c:C.green,tc:C.green,z:16})}`)}`,"路径长度不同不改变静电力功；负功必对应电势能增加");
  }

  function negativeSourceDiagram(q,step){
    const rays=[[630,90],[650,190],[620,300]];
    let body=charge(90,195,"−Q",C.blue);
    rays.forEach(([x,y])=>{body+=line(x,y,118,195,{c:C.orange,w:3,arrow:"o"})});
    body+=`<circle cx="90" cy="195" r="178" fill="none" stroke="${C.line}" stroke-width="2" stroke-dasharray="7 6"/>`;
    body+=dot(235,195,"A",{dy:28,f:C.red,c:C.red})+dot(390,103,"B",{dy:-24,f:C.green,c:C.green})+dot(390,287,"C",{dy:27,f:C.green,c:C.green});
    body+=layer(step,1,`${line(390,103,322,143,{c:C.green,w:5,arrow:"g"})}${text(350,102,"E_B",{c:C.green,w:900})}${line(390,287,322,247,{c:C.green,w:5,arrow:"g"})}${text(350,300,"E_C",{c:C.green,w:900})}`);
    body+=layer(step,2,`${text(510,150,"|E_B|=|E_C|",{a:"middle",c:C.green,w:900})}${text(510,181,"但方向不同",{a:"middle",c:C.red,w:900})}${text(510,232,"r_B=r_C",{a:"middle",c:C.blue,w:900})}${text(510,263,"φ_B=φ_C",{a:"middle",c:C.blue,w:900})}`);
    return base("负点电荷：场强是矢量，电势是标量",body,"箭头指向场源说明场源带负电；等半径点等势但场强方向不同");
  }

  function symmetryDiagram(q,step){
    if(q.id==="101q5"){
      const p={A:[380,65],B:[175,300],C:[585,300],D:[380,300],P:[280,180],N:[480,180]};
      let body=`<path d="M380 65 L175 300 L585 300 Z" fill="none" stroke="${C.ink}" stroke-width="3"/>${line(380,65,380,318,{c:C.line,w:2,d:"7 6"})}${charge(...p.P,"+Q",C.red)}${charge(...p.N,"−Q",C.blue)}${dot(...p.A,"A",{dy:-24})}${dot(...p.B,"B",{dx:-12,dy:22})}${dot(...p.C,"C",{dx:14,dy:22})}${dot(...p.D,"D",{dy:-18})}`;
      body+=layer(step,1,`${text(380,39,"φ_A=0",{a:"middle",c:C.green,w:900})}${text(380,338,"φ_D=0（AD为零等势线）",{a:"middle",c:C.green,w:900})}`);
      body+=layer(step,2,`${line(380,65,444,28,{c:C.red,w:3,arrow:"o"})}${line(380,65,444,102,{c:C.blue,w:3,arrow:"b"})}${line(380,65,490,65,{c:C.green,w:5,arrow:"g"})}${line(380,300,444,337,{c:C.red,w:3,arrow:"o"})}${line(380,300,444,263,{c:C.blue,w:3,arrow:"b"})}${line(380,300,490,300,{c:C.green,w:5,arrow:"g"})}${text(507,65,"E_A",{c:C.green,w:900})}${text(507,300,"E_D",{c:C.green,w:900})}`);
      body+=layer(step,3,`${formulaBox(519,142,190,"E_A = E_D",{f:"#e8f7ef",c:C.green,tc:C.green})}${formulaBox(519,195,190,"φ_B = −φ_C ≠ 0",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:13})}`);
      return base("等量异种电荷：先找零等势线，再合成场强",body,"已校正：电荷分别位于AB、AC边中点；电荷连线不是零等势线");
    }
    let body=`${text(202,56,"甲：单个 +Q",{a:"middle",w:900})}${charge(202,188,"+Q",C.red)}<circle cx="202" cy="188" r="115" fill="none" stroke="${C.line}" stroke-width="2" stroke-dasharray="6 6"/>${dot(277,101,"a",{dx:14,dy:-6,f:C.orange,c:C.orange})}${dot(277,275,"b",{dx:15,dy:8,f:C.orange,c:C.orange})}${line(202,188,277,101,{c:C.orange,w:3,arrow:"o"})}${line(202,188,277,275,{c:C.orange,w:3,arrow:"o"})}${text(202,328,"|E_a|=|E_b|，方向不同；φ_a=φ_b",{a:"middle",z:12,c:C.muted,w:800})}${text(650,56,"乙：等量异种",{a:"middle",w:900})}${charge(480,188,"−Q",C.blue)}${charge(650,188,"+Q",C.red)}${dot(565,92,"a",{dx:14,dy:-4,f:C.green,c:C.green})}${dot(565,284,"b",{dx:14,dy:7,f:C.green,c:C.green})}${dot(540,216,"c",{dx:-16,dy:14,f:C.gold,c:C.gold})}`;
    body+=layer(step,1,`${line(565,92,520,138,{c:C.blue,w:3,arrow:"b"})}${line(565,92,523,44,{c:C.red,w:3,arrow:"o"})}${line(565,284,520,238,{c:C.blue,w:3,arrow:"b"})}${line(565,284,523,332,{c:C.red,w:3,arrow:"o"})}`);
    body+=layer(step,2,`${line(565,92,445,92,{c:C.green,w:5,arrow:"g"})}${line(565,284,445,284,{c:C.green,w:5,arrow:"g"})}${text(423,92,"E_a",{a:"end",c:C.green,w:900})}${text(423,284,"E_b",{a:"end",c:C.green,w:900})}${text(650,337,"E_a = E_b",{a:"middle",c:C.green,z:17,w:900})}`);
    return base("对称性必须落实到分场矢量",body,"镜像点的两个分场先分解、再合成，才能比较完整的场强矢量");
  }

  function electrodeMapDiagram(q,step){
    let body=`${charge(150,105,"−",C.blue)}${charge(610,105,"+",C.red)}${text(150,70,"负极",{a:"middle",c:C.blue,w:900})}${text(610,70,"正极",{a:"middle",c:C.red,w:900})}`;
    [0,1,2,3].forEach(i=>{const y=105+i*48;body+=`<path d="M584 ${y} Q380 ${130+i*48} 176 ${y}" fill="none" stroke="${C.orange}" stroke-width="${i===1?4:3}" marker-end="url(#ch10-arr-o)"/>`});
    body+=line(380,72,380,325,{c:C.green,w:3,d:"7 6"})+dot(500,205,"A",{dx:16,dy:-5,f:C.red,c:C.red})+dot(255,205,"B",{dx:-16,dy:-5,f:C.blue,c:C.blue})+dot(380,170,"C",{dx:17,dy:-5,f:C.green,c:C.green})+dot(380,265,"D",{dx:17,dy:4,f:C.green,c:C.green});
    body+=layer(step,1,`${text(380,338,"φ_A > φ_C = φ_D > φ_B",{a:"middle",c:C.green,z:17,w:950})}`);
    body+=layer(step,2,`${text(500,244,"A附近较疏",{a:"middle",z:12,c:C.muted})}${text(255,244,"B附近较密",{a:"middle",z:12,c:C.muted})}${formulaBox(272,291,216,"|E_B| > |E_A|",{h:34,f:"#fff0e6",c:C.orange,tc:C.orange,z:16})}`);
    return base("场线方向排电势，局部疏密比场强",body,"电场线从正极指向负极；C、D在同一等势面，电子在两点电势能相同");
  }

  function trajectoryEquipotentialDiagram(q,step){
    let body=`<path d="M80 320 Q160 145 255 80" fill="none" stroke="#18aee6" stroke-width="4" stroke-dasharray="8 7"/><path d="M225 335 Q300 150 390 78" fill="none" stroke="#18aee6" stroke-width="4" stroke-dasharray="8 7"/><path d="M380 338 Q430 176 520 88" fill="none" stroke="#18aee6" stroke-width="4" stroke-dasharray="8 7"/>${text(93,85,"5 V",{c:C.blue,w:900})}${text(273,85,"0 V",{c:C.blue,w:900})}${text(430,85,"−5 V",{c:C.blue,w:900})}<path d="M105 302 Q275 175 640 232" fill="none" stroke="#c83f83" stroke-width="6"/>${dot(105,302,"A",{dy:27,f:"#c83f83",c:"#c83f83"})}${dot(238,213,"B",{dy:27,f:"#c83f83",c:"#c83f83"})}${dot(350,181,"C",{dy:-24,f:"#c83f83",c:"#c83f83"})}${dot(455,190,"D",{dy:-24,f:"#c83f83",c:"#c83f83"})}${dot(640,232,"G",{dy:28,f:"#c83f83",c:"#c83f83"})}`;
    body+=layer(step,1,`${line(238,213,300,155,{c:C.orange,w:4,arrow:"o"})}${text(294,137,"E：高φ→低φ",{c:C.orange,w:900})}`);
    body+=layer(step,2,`${line(350,181,290,245,{c:C.green,w:4,arrow:"g"})}${text(274,260,"轨迹凹向≈F",{a:"middle",c:C.green,z:13,w:900})}${text(466,306,"F与E反向 ⇒ 粒子带负电",{a:"middle",c:C.red,z:14,w:900})}`);
    body+=layer(step,3,`${formulaBox(485,112,215,"等势线越密 ⇒ |E|越大",{f:"#e8f7ef",c:C.green,tc:C.green,z:13})}${formulaBox(485,160,215,"a_D > a_G",{f:"#fff0e6",c:C.orange,tc:C.orange,z:16})}`);
    return base("等势线 + 轨迹：方向、疏密、凹向三次判读",body,"轨迹切线是速度方向，不是受力方向；只有等势差相等时才用疏密比较场强");
  }

  function pendulumDiagram(q,step){
    let body=`${dot(380,62,"O",{dy:-23})}${line(380,62,480,195,{c:C.ink,w:4})}${circle(480,195,20,{f:"#fff",c:C.ink})}${text(480,195,"+q",{a:"middle",z:13,w:900})}${line(55,105,180,105,{c:C.orange,w:4,arrow:"o"})}${text(39,105,"E",{a:"end",c:C.orange,w:900})}<path d="M380 118 A55 55 0 0 1 413 106" fill="none" stroke="${C.gold}" stroke-width="3"/>${text(421,114,"37°",{c:C.gold,w:900})}`;
    body+=layer(step,1,`${line(480,195,404,94,{c:C.blue,w:5,arrow:"b"})}${text(421,126,"T",{c:C.blue,w:900})}${line(480,195,480,323,{c:C.orange,w:5,arrow:"o"})}${text(496,297,"mg",{c:C.orange,w:900})}${line(480,195,625,195,{c:C.green,w:5,arrow:"g"})}${text(550,174,"qE",{c:C.green,w:900})}`);
    body+=layer(step,2,`${formulaBox(70,180,240,"Tcos37°=mg",{f:"#eaf3ff",c:C.blue,tc:C.blue})}${formulaBox(70,232,240,"Tsin37°=qE",{f:"#e8f7ef",c:C.green,tc:C.green})}`);
    body+=layer(step,3,`${line(480,321,230,321,{c:C.orange,w:4,arrow:"o"})}${text(355,303,"A→B：Δx=−1.4 m",{a:"middle",c:C.orange,w:900})}${text(610,319,"W=−2.1 J",{a:"middle",c:C.red,w:900})}`);
    return base("带电摆球：受力图与有符号位移分开画",body,"T沿细线指向悬点，mg竖直向下，正电荷所受qE与电场同向");
  }

  function energyCurveDiagram(q,step){
    let body=`${line(90,302,690,302,{c:C.ink,w:3,arrow:"b"})}${line(90,325,90,65,{c:C.ink,w:3,arrow:"b"})}${text(705,302,"x",{c:C.muted})}${text(90,48,"能量",{a:"middle",c:C.muted})}<path d="M115 92 C230 148 315 218 650 266" fill="none" stroke="${C.blue}" stroke-width="5"/>${text(180,105,"E_p(x)",{c:C.blue,w:900})}`;
    body+=layer(step,1,`${line(250,163,390,224,{c:C.orange,w:4,arrow:"o"})}${text(282,144,"斜率<0且绝对值减小",{c:C.orange,z:13,w:850})}${formulaBox(450,77,230,"F_x=−dE_p/dx >0",{f:"#fff0e6",c:C.orange,tc:C.orange})}`);
    body+=layer(step,2,`<path d="M115 278 C230 222 315 152 650 104" fill="none" stroke="${C.green}" stroke-width="5"/>${text(573,126,"E_k(x)",{c:C.green,w:900})}${formulaBox(440,184,230,"E_k + E_p = 常量",{f:"#e8f7ef",c:C.green,tc:C.green})}`);
    body+=layer(step,3,`${text(380,338,"a随x减小；φ与E_p同形（q>0）",{a:"middle",c:C.red,z:14,w:900})}`);
    return base("从E_p-x斜率读力，再用能量守恒画E_k",body,"曲线的高度表示电势能；场强和受力来自斜率，不来自纵坐标本身");
  }

  function potentialChainDiagram(q,step){
    let body=`${dot(165,190,"A",{dy:-27,f:C.blue,c:C.blue})}${dot(600,190,"B",{dy:-27,f:C.orange,c:C.orange})}${line(165,190,600,190,{c:C.orange,w:4,arrow:"o"})}${text(380,165,"E、F（+q）",{a:"middle",c:C.orange,w:900})}${text(165,228,"φ_A=0",{a:"middle",c:C.blue,w:900})}${text(600,228,"φ_B=−30 V",{a:"middle",c:C.orange,w:900})}`;
    body+=layer(step,1,`${formulaBox(66,74,250,"E_A=F_A/q=2×10⁴ N/C",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:13})}`);
    body+=layer(step,2,`${formulaBox(340,74,184,"W_AB>0 ⇒ φ_A>φ_B",{f:"#e8f7ef",c:C.green,tc:C.green,z:13})}`);
    body+=layer(step,3,`${formulaBox(540,74,160,"U_AB=W/q=30 V",{f:"#fff0e6",c:C.orange,tc:C.orange,z:13})}${text(380,303,"E_pB=qφ_B=−1.2×10⁻⁶ J",{a:"middle",c:C.red,z:17,w:950})}`);
    return base("E → W → U → φ → E_p：角标全程不变",body,"正电荷受力与E同向；U_AB始终等于φ_A−φ_B");
  }

  function equalWorkPanels(q,step){
    let body="";
    [0,1,2].forEach((i)=>{const x=78+i*225;body+=`<rect x="${x}" y="76" width="190" height="188" rx="16" fill="#f6f9fc" stroke="${C.line}"/><path d="M${x+28} ${135+i*12} Q${x+95} ${100+i*42} ${x+162} ${139-i*8}" fill="none" stroke="${C.blue}" stroke-width="4"/><path d="M${x+28} ${214-i*9} Q${x+96} ${245-i*38} ${x+162} ${210+i*9}" fill="none" stroke="${C.orange}" stroke-width="4"/>${text(x+26,112,"20 V",{c:C.blue,z:12,w:900})}${text(x+140,235,"40 V",{c:C.orange,z:12,w:900})}${dot(x+58,157,"A",{dy:-19,f:C.blue,c:C.blue})}${dot(x+136,193,"B",{dy:21,f:C.orange,c:C.orange})}${text(x+95,284,["Ⅰ","Ⅱ","Ⅲ"][i],{a:"middle",z:18,w:900})}`});
    body+=layer(step,1,`${text(380,315,"每幅图：U_AB=20−40=−20 V",{a:"middle",c:C.red,z:16,w:900})}`);
    body+=layer(step,2,`${formulaBox(220,324,320,"WⅠ=WⅡ=WⅢ=−20 μJ",{h:30,f:"#e8f7ef",c:C.green,tc:C.green,z:16})}`);
    return base("三种电场形状，同一张电势账单",body,"曲线形状和路径长度不同，不改变相同q、相同初末电势对应的静电力功");
  }

  function negativePathsDiagram(q,step){
    let body=`${text(700,72,"E",{a:"end",c:C.orange,w:900})}${line(670,72,535,72,{c:C.orange,w:5,arrow:"o"})}${dot(600,115,"A",{dy:-23,f:C.blue,c:C.blue})}${dot(180,275,"B",{dy:26,f:C.orange,c:C.orange})}${dot(600,275,"C",{dy:25})}${dot(355,115,"D",{dy:-22})}<path d="M600 115 L180 275" fill="none" stroke="${C.green}" stroke-width="4"/><path d="M600 115 L600 275 L180 275" fill="none" stroke="${C.blue}" stroke-width="4"/><path d="M600 115 C430 55 280 320 180 275" fill="none" stroke="${C.gold}" stroke-width="4"/>`;
    body+=layer(step,1,`${line(600,322,180,322,{c:C.orange,w:4,arrow:"o"})}${text(390,304,"沿E的投影相同",{a:"middle",c:C.orange,w:900})}`);
    body+=layer(step,2,`${line(390,210,500,210,{c:C.red,w:5,arrow:"o"})}${text(445,188,"F_e（−q）与E反向",{a:"middle",c:C.red,z:13,w:900})}`);
    body+=layer(step,3,`${formulaBox(230,82,230,"U_AB>0，W_AB=(−q)U_AB<0",{f:"#fff0e6",c:C.orange,tc:C.red,z:12})}${text(390,345,"φ_A=φ_C>φ_B，但E_pB>E_pC",{a:"middle",c:C.green,z:14,w:900})}`);
    return base("负电荷走三条路径：先判U，再乘带符号的q",body,"场强向左而负电荷受力向右；切勿把−q当作正数代入");
  }

  function rightTrianglePotentialDiagram(q,step){
    const A0=[180,80],B0=[570,80],C0=[570,290],M=[375,80];
    let body=`<path d="M${A0[0]} ${A0[1]} L${B0[0]} ${B0[1]} L${C0[0]} ${C0[1]} Z" fill="none" stroke="${C.ink}" stroke-width="4"/>${dot(...A0,"A  4 V",{dx:-24,dy:-23,f:C.red,c:C.red})}${dot(...B0,"B  0 V",{dx:30,dy:-23,f:C.blue,c:C.blue})}${dot(...C0,"C  2 V",{dx:31,dy:21,f:C.green,c:C.green})}${dot(...M,"M  2 V",{dy:-23,f:C.green,c:C.green})}`;
    body+=layer(step,1,`${formulaBox(48,142,255,"U_AB=4 V；U_BC=−2 V",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:13})}`);
    body+=layer(step,2,`${line(M[0],M[1],C0[0],C0[1],{c:C.green,w:5,d:"7 6"})}${text(480,180,"MC：2 V等势线",{c:C.green,w:900,z:13})}`);
    body+=layer(step,3,`${line(330,240,480,100,{c:C.orange,w:5,arrow:"o"})}${text(330,265,"高电势侧",{a:"middle",c:C.red,z:13,w:900})}${text(500,105,"低电势侧",{c:C.blue,z:13,w:900})}${text(400,332,"E ⟂ MC，且由高φ指向低φ",{a:"middle",c:C.orange,w:900})}`);
    return base("先标三点电势，再找等势线、作垂线",body,"AB中点M与C同为2 V；MC是等势线，不是电场线");
  }

  function equilateralPotentialDiagram(q,step){
    let body=`<path d="M180 290 L580 290 L380 76 Z" fill="none" stroke="${C.ink}" stroke-width="4"/>${dot(180,290,"a  10 V",{dx:-19,dy:27,f:C.red,c:C.red})}${dot(580,290,"b  0 V",{dx:24,dy:27,f:C.blue,c:C.blue})}${dot(380,76,"c  5 V",{dy:-24,f:C.green,c:C.green})}${dot(380,290,"M  5 V",{dy:27,f:C.green,c:C.green})}`;
    body+=layer(step,1,`${text(380,341,"φ_M=(φ_a+φ_b)/2=5 V",{a:"middle",c:C.green,w:900})}`);
    body+=layer(step,2,`${line(380,76,380,290,{c:C.green,w:5,d:"7 6"})}${text(397,180,"cM等势线",{c:C.green,z:13,w:900})}`);
    body+=layer(step,3,`${line(205,205,555,205,{c:C.orange,w:5,arrow:"o"})}${text(380,182,"E：10 V → 0 V",{a:"middle",c:C.orange,w:900})}`);
    return base("正三角形：中点法找5 V等势线",body,"匀强场中线段电势线性变化；E与cM垂直并由a侧指向b侧");
  }

  function coaxialDiagram(q,step){
    let body=`${circle(315,190,42,{f:"#dce5eb",c:C.ink,w:4})}<circle cx="315" cy="190" r="92" fill="none" stroke="${C.blue}" stroke-width="3" stroke-dasharray="7 6"/><circle cx="315" cy="190" r="142" fill="none" stroke="${C.blue}" stroke-width="3" stroke-dasharray="7 6"/><circle cx="315" cy="190" r="178" fill="none" stroke="${C.ink}" stroke-width="10"/>${line(315,48,315,332,{c:C.line,w:2})}${line(173,190,457,190,{c:C.line,w:2})}${dot(315,98,"a",{dx:14,dy:0,f:C.orange,c:C.orange})}${dot(315,48,"b",{dx:14,dy:3,f:C.green,c:C.green})}${dot(415,90,"c",{dx:16,dy:-2,f:C.gold,c:C.gold})}${text(315,190,"内导体",{a:"middle",z:12,w:850})}${text(315,338,"外导体",{a:"middle",z:12,w:850})}`;
    body+=layer(step,1,`${text(575,108,"实线：径向场线",{a:"middle",c:C.ink,w:900})}${text(575,145,"虚线圆：等势线",{a:"middle",c:C.blue,w:900})}`);
    body+=layer(step,2,`${line(510,220,620,220,{c:C.orange,w:7})}${line(510,266,565,266,{c:C.green,w:7})}${text(640,220,"|E_a|",{c:C.orange,w:900})}${text(585,266,"|E_b|",{c:C.green,w:900})}${text(575,302,"|E_a|>|E_b|",{a:"middle",c:C.red,w:900})}`);
    body+=layer(step,3,`${text(575,340,"未给箭头：不判内外导体电势高低",{a:"middle",c:C.muted,z:12,w:850})}`);
    return base("同轴电缆：径向场线与同心等势线",body,"径向间距相等不代表电势差相等；场强随半径变化而非匀强");
  }

  function locateSourceDiagram(q,step){
    const Q=[380,165],a=[240,246],b=[520,246],c=[380,246];
    let body=`${dot(...a,"a",{dx:-15,dy:20})}${dot(...b,"b",{dx:15,dy:20})}${dot(...c,"c",{dy:22,f:C.gold,c:C.gold})}${line(a[0],a[1],b[0],b[1],{c:C.ink,w:3})}${line(a[0],a[1],145,301,{c:C.green,w:5,arrow:"g"})}${line(b[0],b[1],615,301,{c:C.green,w:5,arrow:"g"})}${text(160,315,"E_a",{c:C.green,w:900})}${text(600,315,"E_b",{a:"end",c:C.green,w:900})}${text(198,280,"30°",{c:C.gold,w:900})}${text(545,280,"30°",{c:C.gold,w:900})}`;
    body+=layer(step,1,`${line(a[0],a[1],Q[0],Q[1],{c:C.blue,w:3,d:"7 6"})}${line(b[0],b[1],Q[0],Q[1],{c:C.blue,w:3,d:"7 6"})}${charge(...Q,"+Q",C.red)}${text(380,120,"E反向延长线交点",{a:"middle",c:C.blue,w:900})}`);
    body+=layer(step,2,`${text(380,61,"Qa=Qb=L；ab=√3L",{a:"middle",c:C.green,w:900})}${formulaBox(270,322,220,"Q=EL²/k",{h:30,f:"#e8f7ef",c:C.green,tc:C.green,z:16})}`);
    body+=layer(step,3,`${text(380,104,"a、b等势；c处电势极值",{a:"middle",c:C.orange,z:13,w:900})}`);
    return base("反向延长场强矢量，定位正点电荷",body,"点电荷E沿半径；场强背离交点，所以场源为正");
  }

  function chargedPendulumGeometryDiagram(q,step){
    const O=[220,80],A=[220,260],B=[530,170],C0=[620,260];
    let body=`${dot(...O,"O",{dy:-22})}${charge(...A,"+Q",C.red)}${circle(B[0],B[1],20,{f:"#fff",c:C.green})}${text(B[0],B[1],"+q",{a:"middle",z:13,w:900})}${dot(...C0,"C",{dy:23})}${line(...O,...B,{c:C.ink,w:4})}${line(...A,...B,{c:C.line,w:3,d:"7 6"})}${line(...A,...O,{c:C.line,w:2,d:"7 6"})}${line(...A,...C0,{c:C.line,w:2,d:"7 6"})}${text(370,110,"OB=r",{c:C.muted,z:13})}${text(365,236,"AB=r",{c:C.muted,z:13})}`;
    body+=layer(step,1,`${line(B[0],B[1],390,130,{c:C.blue,w:5,arrow:"b"})}${text(415,113,"T",{c:C.blue,w:900})}${line(B[0],B[1],650,135,{c:C.green,w:5,arrow:"g"})}${text(610,118,"F",{c:C.green,w:900})}${line(B[0],B[1],B[0],315,{c:C.orange,w:5,arrow:"o"})}${text(546,290,"mg",{c:C.orange,w:900})}`);
    body+=layer(step,2,`${formulaBox(55,118,220,"Tcos30°=Fcos30°",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:12})}${formulaBox(55,169,220,"Tsin30°+Fsin30°=mg",{f:"#fff0e6",c:C.orange,tc:C.orange,z:11})}${text(165,222,"⇒ T=F=mg",{a:"middle",c:C.green,w:900})}`);
    body+=layer(step,3,`${line(B[0],B[1],C0[0],C0[1],{c:C.green,w:4,d:"6 5"})}${text(565,218,"下降 r/2",{c:C.green,z:13,w:900})}${text(430,338,"qU_BC+mg(r/2)=mv²/2",{a:"middle",c:C.red,z:16,w:900})}`);
    return base("悬线未剪：三力平衡；剪线后：功能关系",body,"库仑力沿AB由Q指向q，拉力沿BO指向悬点，重力竖直向下");
  }

  function zeroPotentialCircleDiagram(q,step){
    const q1=[350,235],q2=[560,235],p=[280,95];
    let body=`<circle cx="280" cy="235" r="140" fill="none" stroke="#22aee4" stroke-width="4" stroke-dasharray="8 7"/>${charge(...q1,"+q₁",C.blue)}${charge(...q2,"−2q₁",C.red)}${dot(140,235,"b",{dx:-14,dy:18})}${dot(420,235,"a",{dx:0,dy:22})}${dot(...p,"p",{dy:-22})}${line(...p,...q1,{c:C.blue,w:3,d:"6 5"})}${line(...p,...q2,{c:C.orange,w:3,d:"6 5"})}${text(330,142,"r₁",{c:C.blue,w:900})}${text(447,123,"r₂=2r₁",{c:C.orange,w:900})}`;
    body+=layer(step,1,`${formulaBox(465,66,238,"φ_p=kq₁/r₁−2kq₁/r₂",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:12})}`);
    body+=layer(step,2,`${formulaBox(486,115,195,"r₂=2r₁ ⇒ φ_p=0",{f:"#e8f7ef",c:C.green,tc:C.green,z:13})}${text(270,337,"整圆均为零等势线",{a:"middle",c:C.green,w:900})}`);
    body+=layer(step,3,`${text(555,305,"沿圆周：U=0，W=qU=0",{a:"middle",c:C.red,z:15,w:900})}`);
    return base("零等势圆：用任一点的距离比证明",body,"零电势不等于零场强；圆周是等势线，不是电场线");
  }

  function twoParticlePlatesDiagram(q,step){
    let body=`${line(110,82,650,82,{c:C.red,w:8})}${line(110,292,650,292,{c:C.blue,w:8})}${text(675,82,"＋板",{c:C.red,w:900})}${text(675,292,"−板",{c:C.blue,w:900})}${line(190,110,190,260,{c:C.orange,w:3,arrow:"o"})}${line(380,110,380,260,{c:C.orange,w:3,arrow:"o"})}${line(570,110,570,260,{c:C.orange,w:3,arrow:"o"})}${text(610,184,"E、a",{c:C.orange,w:900})}${dot(110,187,"粒子1",{dx:-9,dy:-23,f:C.green,c:C.green,a:"end"})}${line(125,187,246,187,{c:C.green,w:5,arrow:"g"})}${text(178,166,"v₁",{a:"middle",c:C.green,w:900})}${dot(380,82,"粒子2",{dy:-24,f:C.gold,c:C.gold})}${line(380,101,380,169,{c:C.gold,w:5,arrow:"o"})}${text(399,136,"v₂",{c:C.gold,w:900})}${dot(380,292,"O",{dy:26,f:C.ink,c:C.ink})}<path d="M110 187 Q260 187 380 292" fill="none" stroke="${C.green}" stroke-width="4"/><path d="M380 82 L380 292" fill="none" stroke="${C.gold}" stroke-width="4" stroke-dasharray="7 6"/>`;
    body+=layer(step,1,`${formulaBox(475,103,190,"E=2U/L；a=2qU/(mL)",{f:"#fff0e6",c:C.orange,tc:C.orange,z:11})}`);
    body+=layer(step,2,`${formulaBox(98,316,250,"粒子1：L/4=½at²",{h:30,f:"#e8f7ef",c:C.green,tc:C.green,z:13})}${text(226,279,"x=L/2=v₁t",{a:"middle",c:C.green,z:13,w:900})}`);
    body+=layer(step,3,`${formulaBox(385,316,280,"粒子2：L/2=v₂t+½at²",{h:30,f:"#fff8df",c:C.gold,tc:C.gold,z:13})}`);
    body+=layer(step,4,`${formulaBox(48,42,238,"粒子1末速：v=√(vₓ²+vᵧ²)",{h:32,f:"#fff0f0",c:C.red,tc:C.red,z:12})}`);
    return base("两粒子共用同一竖直加速度，分别拆分运动",body,"正电荷受力与E同向向下；粒子1是类平抛，粒子2是竖直匀加速");
  }

  function electronAccelerationDiagram(q,step){
    let body=`${line(150,80,150,305,{c:C.blue,w:9})}${line(610,80,610,305,{c:C.red,w:9})}${text(150,54,"−极板",{a:"middle",c:C.blue,w:900})}${text(610,54,"＋极板",{a:"middle",c:C.red,w:900})}${line(570,112,190,112,{c:C.orange,w:4,arrow:"o"})}${text(380,89,"E：由＋指向−",{a:"middle",c:C.orange,w:900})}${charge(220,205,"e⁻",C.blue)}${line(243,205,430,205,{c:C.green,w:5,arrow:"g"})}${text(335,183,"Fₑ、a、v",{a:"middle",c:C.green,w:900})}${text(380,246,"电子受力与E反向，向正极板加速",{a:"middle",c:C.red,z:14,w:900})}`;
    body+=layer(step,1,`${formulaBox(54,314,185,"Q=CU=1.35×10⁻⁹ C",{h:30,f:"#eaf3ff",c:C.blue,tc:C.blue,z:11})}`);
    body+=layer(step,2,`${formulaBox(247,314,164,"E=U/d=900 V/m",{h:30,f:"#fff0e6",c:C.orange,tc:C.orange,z:11})}`);
    body+=layer(step,3,`${formulaBox(419,314,146,"a=eE/m=1.6×10¹⁴",{h:30,f:"#e8f7ef",c:C.green,tc:C.green,z:11})}`);
    body+=layer(step,4,`${formulaBox(573,314,145,"Eₖ=eU=1.44×10⁻¹⁸ J",{h:30,f:"#fff0f0",c:C.red,tc:C.red,z:9})}`);
    return base("电子直线加速：方向用箭头，大小保持非负",body,"d=1.0 cm必须先换成1.0×10⁻² m；电子受力方向与场强相反");
  }

  function screenRangeDiagram(q,step){
    let body=`${line(80,180,690,180,{c:C.line,w:2,d:"7 6"})}${text(55,180,"O",{a:"end",w:900})}${text(705,180,"O′",{w:900})}${line(190,82,470,82,{c:C.red,w:8})}${line(190,278,470,278,{c:C.blue,w:8})}${text(330,55,"偏转板长 L",{a:"middle",w:900})}${line(610,278,710,278,{c:C.ink,w:9})}${text(660,309,"荧光屏 L/2",{a:"middle",w:900})}<path d="M80 180 L190 180 Q350 180 470 228 L610 278" fill="none" stroke="${C.green}" stroke-width="5"/>${dot(470,228,"出口",{dy:-22,f:C.green,c:C.green})}`;
    body+=layer(step,1,`${formulaBox(47,73,200,"eU₁=½mv²",{f:"#eaf3ff",c:C.blue,tc:C.blue})}${formulaBox(487,73,220,"a=eU₂/(md)，t=L/v",{f:"#fff0e6",c:C.orange,tc:C.orange,z:12})}`);
    body+=layer(step,2,`${line(330,180,330,306,{c:C.blue,w:3,d:"6 5"})}${line(330,180,610,278,{c:C.blue,w:3,d:"6 5"})}${text(330,329,"虚拟中点",{a:"middle",c:C.blue,z:12,w:900})}${text(520,248,"出口切线",{c:C.blue,z:12,w:900})}`);
    body+=layer(step,3,`${line(470,180,470,228,{c:C.orange,w:4,arrow:"o"})}${text(488,205,"y",{c:C.orange,w:900})}${text(560,141,"tanθ=2y/L",{a:"middle",c:C.green,w:900})}`);
    body+=layer(step,4,`${formulaBox(114,315,240,"左端：y=d/2 ⇒ U₁,min",{h:30,f:"#fff8df",c:C.gold,tc:C.gold,z:12})}${formulaBox(405,315,240,"右端：y=d/3 ⇒ U₁,max",{h:30,f:"#e8f7ef",c:C.green,tc:C.green,z:12})}`);
    return base("先画板内抛物线，再画出口切线和有限屏幕",body,"U₁增大使速度增大、侧移减小；两个屏端对应两个不同的出口侧移");
  }

  function driftTubeDiagram(q,step){
    const xs=[90,185,295,425,575],ws=[55,68,82,98,114];
    let body=`${line(55,190,705,190,{c:C.line,w:2,d:"7 6"})}${dot(56,190,"e⁻",{dx:-8,dy:-22,f:C.blue,c:C.blue,a:"end"})}`;
    xs.forEach((x,i)=>{body+=`<rect x="${x}" y="145" width="${ws[i]}" height="90" rx="18" fill="#eef4f8" stroke="${C.ink}" stroke-width="3"/>${text(x+ws[i]/2,190,String(i+1),{a:"middle",z:17,w:900})}${text(x+ws[i]/2,255,`L${i+1}`,{a:"middle",z:12,c:C.muted,w:800})}`});
    body+=layer(step,1,`${text(380,84,"漂移管内：E≈0，电子匀速",{a:"middle",c:C.blue,w:900})}${text(380,112,"狭缝：电场方向同步翻转，电子每次增加eU",{a:"middle",c:C.orange,z:13,w:900})}${line(158,190,178,190,{c:C.orange,w:4,arrow:"o"})}${line(263,190,287,190,{c:C.orange,w:4,arrow:"o"})}${line(392,190,417,190,{c:C.orange,w:4,arrow:"o"})}${line(543,190,567,190,{c:C.orange,w:4,arrow:"o"})}`);
    body+=layer(step,2,`${formulaBox(80,294,190,"½mvₙ²=neU",{f:"#e8f7ef",c:C.green,tc:C.green})}${formulaBox(285,294,190,"t_管=T/2",{f:"#fff8df",c:C.gold,tc:C.gold})}${formulaBox(490,294,190,"Lₙ=(T/2)√(2neU/m)",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:11})}`);
    body+=layer(step,3,`${text(380,340,"vₙ∝√n，故管长按√n逐级增大",{a:"middle",c:C.red,z:15,w:900})}`);
    return base("多级直线加速器：缝隙加速，管内等待半周期",body,"电压翻转的半周期对应漂移管内飞行时间，不是缝隙内加速时间");
  }

  function oscilloscopeDiagram(q,step){
    let body=`<path d="M55 180 L130 180" fill="none" stroke="${C.green}" stroke-width="5" marker-end="url(#ch10-arr-g)"/>${text(68,153,"电子枪",{c:C.ink,w:900})}${line(150,110,150,250,{c:C.blue,w:7})}${line(205,110,205,250,{c:C.red,w:7})}${text(177,87,"加速区",{a:"middle",z:13,w:900})}${line(285,115,450,115,{c:C.red,w:7})}${line(285,245,450,245,{c:C.blue,w:7})}${text(367,88,"一对偏转板",{a:"middle",z:13,w:900})}${line(670,75,670,290,{c:C.ink,w:10})}${text(670,53,"荧光屏",{a:"middle",z:13,w:900})}<path d="M205 180 L285 180 Q370 180 450 130 L670 80" fill="none" stroke="${C.green}" stroke-width="5"/>`;
    body+=layer(step,1,`${line(330,135,330,220,{c:C.orange,w:4,arrow:"o"})}${text(347,178,"E",{c:C.orange,w:900})}${line(382,180,382,112,{c:C.blue,w:4,arrow:"b"})}${text(400,130,"Fₑ=-eE",{c:C.blue,w:900})}`);
    body+=layer(step,2,`${line(300,288,440,288,{c:C.green,w:5,arrow:"g"})}${text(370,270,"vₓ不变",{a:"middle",c:C.green,w:900})}${formulaBox(490,220,150,"t=L/vₓ",{f:"#e8f7ef",c:C.green,tc:C.green})}`);
    body+=layer(step,3,`${line(450,130,540,130,{c:C.green,w:3,arrow:"g"})}${line(450,130,450,72,{c:C.orange,w:3,arrow:"o"})}${text(500,150,"vₓ",{a:"middle",c:C.green,w:900})}${text(467,88,"vᵧ",{c:C.orange,w:900})}${text(545,330,"偏转场可做功，末动能不只由U加速决定",{a:"middle",c:C.red,z:12,w:900})}`);
    return base("示波管：沿板长匀速，偏转方向匀加速",body,"图示极性仅用于说明方向：电子受力始终与局部E相反");
  }

  function scanDiagram(q,step){
    let body=`${line(75,165,330,165,{c:C.ink,w:3,arrow:"b"})}${line(75,280,75,55,{c:C.ink,w:3,arrow:"b"})}${text(344,165,"t",{c:C.muted})}${text(75,42,"U_X",{a:"middle",c:C.muted})}<path d="M88 215 C130 90 190 90 230 165 S290 245 320 165" fill="none" stroke="${C.blue}" stroke-width="5"/>${circle(555,190,120,{f:"#f7fbfd",c:C.ink,w:4})}${line(420,190,690,190,{c:C.line,w:2,d:"6 5"})}${line(555,55,555,325,{c:C.line,w:2,d:"6 5"})}${dot(555,190,"O",{dy:23,f:C.ink,c:C.ink})}`;
    body+=layer(step,1,`${text(200,308,"x(t)∝U_X(t)，y(t)=0",{a:"middle",c:C.blue,w:900})}`);
    body+=layer(step,2,`${line(445,190,665,190,{c:C.green,w:7})}${line(445,190,655,190,{c:C.green,w:2,arrow:"g"})}${text(555,340,"不同时刻落点集合：水平亮线",{a:"middle",c:C.green,z:13,w:900})}`);
    body+=layer(step,3,`${text(555,83,"不是单个电子沿屏面滑动",{a:"middle",c:C.red,z:13,w:900})}`);
    return base("只给XX′周期电压：横坐标变化、纵坐标为零",body,"扫描锯齿波用于匀速展开时间；其他周期横向电压也会形成水平落点集合");
  }

  function lissajousCircleDiagram(q,step){
    let body=`${line(90,190,680,190,{c:C.ink,w:3,arrow:"b"})}${line(380,325,380,55,{c:C.ink,w:3,arrow:"b"})}${text(696,190,"x",{c:C.muted})}${text(380,42,"y",{a:"middle",c:C.muted})}<circle cx="380" cy="190" r="125" fill="none" stroke="${C.blue}" stroke-width="6"/>${dot(380,65,"t=0",{dx:30,dy:0,f:C.orange,c:C.orange})}`;
    body+=layer(step,1,`${formulaBox(55,70,230,"x=r sinωt",{f:"#eaf3ff",c:C.blue,tc:C.blue})}${formulaBox(475,70,230,"y=r cosωt",{f:"#fff0e6",c:C.orange,tc:C.orange})}`);
    body+=layer(step,2,`${formulaBox(267,300,226,"x²+y²=r²",{f:"#e8f7ef",c:C.green,tc:C.green,z:18})}`);
    body+=layer(step,3,`${pathArrow(380,65,430,78,C.orange)}${text(474,97,"t略增：向右下",{c:C.orange,z:13,w:900})}`);
    return base("正交同频、等振幅、相差π/2：屏上描圆",body,"圆是各时刻落点的参数曲线，不表示单个电子在管内做圆周运动");
  }

  function pathArrow(x1,y1,x2,y2,color){return line(x1,y1,x2,y2,{c:color,w:4,arrow:color===C.orange?"o":"g"})}

  function hexagonFieldDiagram(q,step){
    if(q.id==="103q1"){
      const A0=[530,195],B0=[455,65],C0=[305,65],D0=[230,195],E0=[305,325],F0=[455,325],G=[417.5,260];
      let body=`<path d="M530 195 L455 65 L305 65 L230 195 L305 325 L455 325 Z" fill="none" stroke="${C.ink}" stroke-width="4"/>${dot(...A0,"A 4√3 V",{dx:55,dy:-3,f:C.red,c:C.red})}${dot(...B0,"B",{dy:-22})}${dot(...C0,"C 2√3 V",{dx:-38,dy:-24,f:C.green,c:C.green})}${dot(...D0,"D",{dx:-18,dy:2})}${dot(...E0,"E 0 V",{dx:-38,dy:-18,f:C.blue,c:C.blue})}${dot(...F0,"F",{dx:20,dy:4})}`;
      body+=layer(step,1,`${dot(...G,"G 2√3 V",{dx:48,dy:18,f:C.green,c:C.green})}${line(...A0,...E0,{c:C.line,w:2,d:"6 5"})}${text(490,277,"G为AE中点",{c:C.green,z:12,w:900})}`);
      body+=layer(step,2,`${line(...C0,...G,{c:C.green,w:5,d:"7 6"})}${text(330,161,"CG等势线",{c:C.green,z:13,w:900})}`);
      body+=layer(step,3,`${line(...D0,...E0,{c:C.blue,w:5,d:"7 6"})}${text(205,284,"DE∥CG",{a:"middle",c:C.blue,z:12,w:900})}${text(350,337,"φ_D=φ_E=0",{a:"middle",c:C.blue,z:14,w:900})}`);
      body+=layer(step,4,`${line(700,190,560,271,{c:C.orange,w:5,arrow:"o"})}${text(686,164,"E⊥CG",{c:C.orange,w:900})}${formulaBox(500,90,190,"E=100 V/m",{f:"#fff0e6",c:C.orange,tc:C.orange,z:16})}`);
      return base("正六边形等分法：中点同势 → 平行方向零投影",body,"CG和DE均沿等势方向；场强垂直等势线，d取沿E方向的投影");
    }
    const A0=[305,65],B0=[455,65],C0=[530,195],D0=[455,325],E0=[305,325],F0=[230,195],M=[380,195],N=[492.5,130];
    let body=`<path d="M305 65 L455 65 L530 195 L455 325 L305 325 L230 195 Z" fill="none" stroke="${C.ink}" stroke-width="4"/>${dot(...A0,"A −1 V",{dx:-35,dy:-23,f:C.blue,c:C.blue})}${dot(...B0,"B 1 V",{dx:28,dy:-23})}${dot(...C0,"C 5 V",{dx:35,dy:1,f:C.red,c:C.red})}${dot(...D0,"D 7 V",{dx:34,dy:22,f:C.red,c:C.red})}${dot(...E0,"E",{dy:22})}${dot(...F0,"F",{dx:-17,dy:3})}`;
    body+=layer(step,1,`${formulaBox(66,80,190,"φ_D−φ_A=2(φ_C−φ_B)",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:11})}${text(160,136,"⇒ φ_D=7 V",{a:"middle",c:C.red,w:900})}`);
    body+=layer(step,2,`${dot(...M,"M 3 V",{dx:-34,dy:20,f:C.green,c:C.green})}${dot(...N,"N 3 V",{dx:34,dy:-3,f:C.green,c:C.green})}${line(...M,...N,{c:C.green,w:5,d:"7 6"})}${text(435,176,"MN等势线",{c:C.green,z:12,w:900})}`);
    body+=layer(step,3,`${line(500,300,365,115,{c:C.orange,w:5,arrow:"o"})}${text(507,104,"E：高φ→低φ",{c:C.orange,z:13,w:900})}`);
    return base("正六边形作图：同向位移定电势，中点连等势线",body,"MN没有方向箭头；电场线与MN垂直并由C、D高势侧指向A、B低势侧");
  }

  function rectangleFieldDiagram(q,step){
    const A0=[170,78],B0=[570,78],C0=[570,298],D0=[170,298],O=[345,78],H=[492,244];
    let body=`<rect x="170" y="78" width="400" height="220" fill="none" stroke="${C.ink}" stroke-width="4"/>${dot(...A0,"A 9 V",{dx:-30,dy:-24,f:C.blue,c:C.blue})}${dot(...B0,"B 25 V",{dx:31,dy:-24,f:C.red,c:C.red})}${dot(...C0,"C 16 V",{dx:34,dy:22,f:C.green,c:C.green})}${dot(...D0,"D 0 V",{dx:-30,dy:22,f:C.blue,c:C.blue})}`;
    body+=layer(step,1,`${text(198,337,"AB与DC同位移 ⇒ φ_D=0 V",{c:C.blue,w:900})}`);
    body+=layer(step,2,`${dot(...O,"O 16 V",{dy:-23,f:C.green,c:C.green})}${line(...O,...C0,{c:C.green,w:5,d:"7 6"})}${text(442,172,"OC：16 V等势线",{c:C.green,z:13,w:900})}`);
    body+=layer(step,3,`${line(...B0,...H,{c:C.gold,w:4,d:"5 5"})}${text(538,169,"d⊥=3.6 cm",{c:C.gold,z:12,w:900})}${line(540,154,438,227,{c:C.orange,w:5,arrow:"o"})}${text(551,143,"E",{c:C.orange,w:900})}`);
    body+=layer(step,4,`${formulaBox(225,315,310,"E=9/0.036=250 V/m；U板=E·0.30=75 V",{h:30,f:"#fff0e6",c:C.orange,tc:C.orange,z:12})}`);
    return base("矩形电势刻度：构造同势点，再量垂距",body,"E=U/d中的d是B到等势线OC的垂直距离，不是BO或BC");
  }

  function coordinateFieldDiagram(q,step){
    const O=[150,290],A0=[450,290],B0=[150,203.4],C0=[300,290],D0=[187.5,225.1];
    let body=`${line(105,290,680,290,{c:C.ink,w:3,arrow:"b"})}${line(150,325,150,58,{c:C.ink,w:3,arrow:"b"})}${text(695,290,"x/cm",{c:C.muted})}${text(150,43,"y/cm",{a:"middle",c:C.muted})}${dot(...O,"O 0 V",{dx:-18,dy:24})}${dot(...A0,"A(6,0) 8 V",{dx:47,dy:23,f:C.red,c:C.red})}${dot(...B0,"B(0,√3) 4 V",{dx:-55,dy:-3,f:C.green,c:C.green})}${dot(...C0,"C(3,0) 4 V",{dx:35,dy:23,f:C.green,c:C.green})}`;
    body+=layer(step,1,`${text(300,332,"C为OA中点 ⇒ φ_C=4 V",{a:"middle",c:C.green,w:900})}`);
    body+=layer(step,2,`${line(...B0,...C0,{c:C.green,w:5,d:"7 6"})}${text(255,225,"BC：4 V等势线",{c:C.green,z:12,w:900})}`);
    body+=layer(step,3,`${line(...O,...D0,{c:C.gold,w:4,d:"5 5"})}${dot(...D0,"D",{dx:16,dy:-3,f:C.gold,c:C.gold})}${text(198,260,"OD=1.5 cm",{c:C.gold,z:12,w:900})}${line(260,166,185,222,{c:C.orange,w:5,arrow:"o"})}${text(278,153,"E：4 V侧→0 V侧",{c:C.orange,z:13,w:900})}`);
    body+=layer(step,4,`${formulaBox(445,112,225,"E=4/(1.5×10⁻²)=266.7 V/m",{f:"#fff0e6",c:C.orange,tc:C.orange,z:12})}`);
    return base("坐标图中先连同势点，再作真正的垂距",body,"OC、OB都不是d；d是O到4 V等势线BC的垂直距离OD");
  }

  function rightTriangleInverseDiagram(q,step){
    const A0=[469,159],B0=[370,60],C0=[172,258],D0=[320.5,109.5],P=[271,159];
    let body=`<path d="M469 159 L370 60 L172 258 Z" fill="none" stroke="${C.ink}" stroke-width="4"/>${dot(...A0,"A",{dx:18,dy:-7})}${dot(...B0,"B",{dy:-23})}${dot(...C0,"C",{dx:-17,dy:20})}${dot(...D0,"D",{dx:-18,dy:-9,f:C.gold,c:C.gold})}${text(268,96,"BD:DC=1:3",{a:"middle",c:C.gold,z:12,w:900})}`;
    body+=layer(step,1,`${formulaBox(35,70,230,"q₁<0：φ_A−φ_C=30 V",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:11})}${formulaBox(35,278,270,"外力克服 ⇒ W_AD<0；φ_D−φ_A=15 V",{f:"#fff0e6",c:C.orange,tc:C.orange,z:10})}`);
    body+=layer(step,2,`${text(245,344,"BC线性外推：U_BC=60 V",{a:"middle",c:C.red,w:900})}`);
    body+=layer(step,3,`${dot(...P,"P",{dx:-16,dy:13,f:C.green,c:C.green})}${line(...A0,...P,{c:C.green,w:5,d:"7 6"})}${text(394,185,"AP等势线",{c:C.green,z:13,w:900})}`);
    body+=layer(step,4,`${line(370,60,370,159,{c:C.gold,w:4,d:"5 5"})}${text(384,111,"d⊥=10√2 cm",{c:C.gold,z:11,w:900})}${line(650,130,650,285,{c:C.orange,w:5,arrow:"o"})}${text(626,309,"E：垂直AP向下",{a:"middle",c:C.orange,w:900})}${formulaBox(505,72,210,"E=150√2 V/m",{f:"#fff0e6",c:C.orange,tc:C.orange,z:14})}`);
    return base("二维反演：功的符号 → 电势刻度 → 等势线 → 垂距",body,"负电荷与“克服静电力做功”必须先保留符号；AP是等势线不是电场线");
  }

  function equilateralWorkDiagram(q,step){
    const A0=[380,68],B0=[160,305],C0=[600,305],D0=[270,186.5];
    let body=`<path d="M380 68 L160 305 L600 305 Z" fill="none" stroke="${C.ink}" stroke-width="4"/>${dot(...A0,"A 0 V",{dy:-24,f:C.red,c:C.red})}${dot(...B0,"B −4 V",{dx:-35,dy:22,f:C.blue,c:C.blue})}${dot(...C0,"C −2 V",{dx:37,dy:22,f:C.green,c:C.green})}${text(380,330,"边长1 cm；移动电荷 q<0",{a:"middle",c:C.muted,z:12,w:800})}`;
    body+=layer(step,1,`${formulaBox(54,95,210,"U_AB=W_AB/q=4 V",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:13})}${formulaBox(496,95,210,"U_BC=W_BC/q=−2 V",{f:"#fff0e6",c:C.orange,tc:C.orange,z:12})}`);
    body+=layer(step,2,`${dot(...D0,"D −2 V",{dx:-40,dy:-3,f:C.green,c:C.green})}${line(...D0,...C0,{c:C.green,w:5,d:"7 6"})}${text(445,224,"DC等势线",{c:C.green,z:13,w:900})}`);
    body+=layer(step,3,`${line(...A0,...B0,{c:C.orange,w:5,arrow:"o"})}${text(242,170,"E∥AB：0 V→−4 V",{a:"middle",c:C.orange,z:12,w:900})}`);
    body+=layer(step,4,`${formulaBox(278,267,204,"E=4/0.01=400 V/m",{h:30,f:"#fff0e6",c:C.orange,tc:C.orange,z:14})}`);
    return base("负电荷做功：带符号求U，再用同势点画场",body,"DC为等势线且不带箭头；电场沿AB由A的0 V指向B的−4 V");
  }

  function circlePotentialAngleDiagram(q,step){
    const O=[235,200],H=[365,125],L=[105,275];
    let body=`${circle(...O,150,{f:"none",c:C.line,w:3})}${line(...O,410,200,{c:C.ink,w:2,arrow:"b"})}${text(425,200,"x",{c:C.muted})}${dot(...H,"φmax",{dx:35,dy:-5,f:C.red,c:C.red})}${dot(...L,"φmin",{dx:-37,dy:4,f:C.blue,c:C.blue})}${line(...H,...L,{c:C.line,w:3,d:"7 6"})}${text(312,140,"θ=π/6",{c:C.red,z:12,w:900})}${text(88,300,"θ=7π/6",{a:"middle",c:C.blue,z:12,w:900})}`;
    body+=layer(step,1,`${line(...O,...L,{c:C.orange,w:5,arrow:"o"})}${text(140,218,"E方向210°",{a:"middle",c:C.orange,w:900})}`);
    body+=layer(step,2,`${formulaBox(460,66,235,"φ₁+φ₂=2ER",{f:"#fff0e6",c:C.orange,tc:C.orange,z:16})}${formulaBox(460,118,235,"φ_O=(φ₁−φ₂)/2",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:15})}`);
    body+=layer(step,3,`${line(465,284,695,284,{c:C.ink,w:2,arrow:"b"})}${line(465,308,465,184,{c:C.ink,w:2,arrow:"b"})}<path d="M475 214 C525 175 570 335 620 284 S670 235 690 255" fill="none" stroke="${C.green}" stroke-width="4"/>${text(580,327,"φ(θ)为余弦型",{a:"middle",c:C.green,z:12,w:900})}`);
    body+=layer(step,4,`${text(580,160,"U_ae=√3(φ₁+φ₂)/2",{a:"middle",c:C.red,z:14,w:900})}`);
    return base("把φ-θ极值放回圆上：E由最高势指向最低势",body,"最大与最小电势位于一条直径两端；沿E方向电势降低");
  }

  function capacitanceGraphsDiagram(q,step){
    function axes(x,y,xlab,ylab){return`${line(x,y,x+170,y,{c:C.ink,w:2,arrow:"b"})}${line(x,y+12,x,y-135,{c:C.ink,w:2,arrow:"b"})}${text(x+182,y,xlab,{c:C.muted,z:12})}${text(x,y-151,ylab,{a:"middle",c:C.muted,z:12})}`}
    let body=`${axes(72,275,"U","Q")}<path d="M72 275 L222 112" fill="none" stroke="${C.green}" stroke-width="5"/>${text(152,174,"Q=CU",{a:"middle",c:C.green,w:900})}${axes(295,275,"U","C")}${line(305,150,445,150,{c:C.blue,w:5})}${text(375,132,"C不变",{a:"middle",c:C.blue,w:900})}${axes(518,275,"Q","C")}${line(528,150,668,150,{c:C.orange,w:5})}${text(598,132,"C不变",{a:"middle",c:C.orange,w:900})}`;
    body+=layer(step,1,`${formulaBox(268,64,224,"同一个理想线性电容器：结构、介质不变",{f:"#eef4f8",c:C.line,tc:C.ink,z:11})}`);
    body+=layer(step,2,`${text(150,315,"Q-U斜率 ΔQ/ΔU=C",{a:"middle",c:C.green,z:12,w:900})}`);
    body+=layer(step,3,`${text(486,330,"C不是随Q或U变化的量",{a:"middle",c:C.red,z:13,w:900})}`);
    return base("电容定义图像：Q-U过原点，斜率就是C",body,"先读清横纵轴；给定理想线性电容器的C由结构和介质决定");
  }

  function chargeDischargeDiagram(q,step){
    let body=`${line(80,200,690,200,{c:C.ink,w:3,arrow:"b"})}${line(100,320,100,55,{c:C.ink,w:3,arrow:"b"})}${text(705,200,"t",{c:C.muted})}${text(100,42,"i",{a:"middle",c:C.muted})}<path d="M105 82 C180 110 220 160 300 195" fill="none" stroke="${C.green}" stroke-width="5"/><path d="M320 315 C420 280 500 225 675 203" fill="none" stroke="${C.blue}" stroke-width="5"/>${text(175,101,"充电 i>0",{c:C.green,w:900})}${text(440,292,"放电 i<0",{c:C.blue,w:900})}`;
    body+=layer(step,1,`<path d="M105 200 L105 82 C180 110 220 160 300 195 L300 200 Z" fill="${C.green}" fill-opacity=".20"/><path d="M320 200 L320 315 C420 280 500 225 675 203 L675 200 Z" fill="${C.blue}" fill-opacity=".18"/>${text(220,230,"S₁=+Q",{a:"middle",c:C.green,w:900})}${text(500,175,"S₂=−Q",{a:"middle",c:C.blue,w:900})}`);
    body+=layer(step,2,`${formulaBox(210,62,340,"|S₁|=|S₂|=Q，带符号面积=电荷变化",{f:"#e8f7ef",c:C.green,tc:C.green,z:12})}`);
    body+=layer(step,3,`${formulaBox(235,322,290,"1203 mA·s=1.203 C；C=Q/8≈0.150 F",{h:28,f:"#fff0e6",c:C.orange,tc:C.orange,z:11})}`);
    return base("充放电i-t图：面积不是“图形大小”，而是转移电荷量",body,"充电和完全放电的面积绝对值相等、符号相反；mA必须换成A");
  }

  function keyboardCapacitorDiagram(q,step){
    let body=`${line(170,95,590,95,{c:C.red,w:9})}${line(170,285,590,285,{c:C.blue,w:9})}${text(380,62,"活动金属片（按下）",{a:"middle",w:900})}${text(380,318,"固定金属片",{a:"middle",w:900})}${line(645,95,645,285,{c:C.green,w:4,d:"7 6"})}${text(662,190,"d↓",{c:C.green,w:900})}${line(300,118,300,260,{c:C.orange,w:3,arrow:"o"})}${line(380,118,380,260,{c:C.orange,w:3,arrow:"o"})}${line(460,118,460,260,{c:C.orange,w:3,arrow:"o"})}`;
    body+=layer(step,1,`${formulaBox(54,80,180,"仍接电源：U不变",{f:"#e8f7ef",c:C.green,tc:C.green})}`);
    body+=layer(step,2,`${formulaBox(54,138,180,"d↓ ⇒ C=εS/d ↑",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:13})}`);
    body+=layer(step,3,`${formulaBox(54,196,180,"Q=CU ↑；E=U/d ↑",{f:"#fff0e6",c:C.orange,tc:C.orange,z:13})}`);
    body+=layer(step,4,`${line(90,275,200,275,{c:C.red,w:4,arrow:"o"})}${text(145,254,"规定电流 b→a",{a:"middle",c:C.red,z:12,w:900})}${text(145,298,"电子方向相反",{a:"middle",c:C.muted,z:11,w:800})}`);
    return base("电容式键盘：先认“接电源”，再沿因果链",body,"U固定时减小d：C、Q、E均增大；规定电流与电子定向移动方向相反");
  }

  function controlVariableCapacitorDiagram(q,step){
    let body=`${line(250,100,250,290,{c:C.red,w:9})}${line(510,100,510,290,{c:C.blue,w:9})}${line(280,137,480,137,{c:C.orange,w:3,arrow:"o"})}${line(280,195,480,195,{c:C.orange,w:3,arrow:"o"})}${line(280,253,480,253,{c:C.orange,w:3,arrow:"o"})}${text(380,70,"理想平行板电容器",{a:"middle",w:900})}${line(250,325,510,325,{c:C.green,w:4,arrow:"g"})}${text(380,307,"板间距 d",{a:"middle",c:C.green,w:900})}`;
    body+=layer(step,1,`${formulaBox(55,77,160,"正对面积 S ↑ ⇒ C ↑",{f:"#e8f7ef",c:C.green,tc:C.green,z:12})}${formulaBox(545,77,160,"距离 d ↑ ⇒ C ↓",{f:"#fff0e6",c:C.orange,tc:C.orange,z:12})}`);
    body+=layer(step,2,`<rect x="340" y="102" width="80" height="186" fill="${C.gold}" fill-opacity=".25" stroke="${C.gold}" stroke-width="2"/>${text(380,195,"介质 εᵣ",{a:"middle",c:C.gold,w:900})}${text(380,219,"εᵣ↑ ⇒ C↑",{a:"middle",c:C.gold,z:12,w:900})}`);
    body+=layer(step,3,`${formulaBox(230,335,300,"C=ε₀εᵣS/d（不含Q、U与极板金属种类）",{h:28,f:"#eaf3ff",c:C.blue,tc:C.blue,z:11})}`);
    return base("控制变量：S、d、εᵣ决定C",body,"断开电源使Q近似不变只是测量条件，不表示Q决定电容");
  }

  function switchMetalDiagram(q,step){
    let body=`${line(260,90,260,300,{c:C.red,w:9})}${line(540,90,540,300,{c:C.blue,w:9})}${text(260,63,"A",{a:"middle",c:C.red,w:900})}${text(540,63,"B",{a:"middle",c:C.blue,w:900})}${line(290,120,510,120,{c:C.orange,w:3,arrow:"o"})}${line(290,195,510,195,{c:C.orange,w:3,arrow:"o"})}${line(290,270,510,270,{c:C.orange,w:3,arrow:"o"})}`;
    body+=layer(step,1,`${formulaBox(45,80,175,"S闭合：U不变",{f:"#e8f7ef",c:C.green,tc:C.green})}${text(132,138,"d↓⇒E↑",{a:"middle",c:C.green,w:900})}${text(132,170,"d↑⇒C↓⇒Q↓",{a:"middle",c:C.green,z:12,w:900})}`);
    body+=layer(step,2,`${formulaBox(45,218,175,"S断开：Q不变",{f:"#fff8df",c:C.gold,tc:C.gold})}${text(132,273,"d↑⇒C↓⇒U↑",{a:"middle",c:C.gold,z:12,w:900})}`);
    body+=layer(step,3,`<rect x="355" y="102" width="72" height="186" rx="5" fill="#cbd2d8" stroke="${C.ink}" stroke-width="3"/>${text(391,195,"金属板",{a:"middle",z:13,w:900})}${text(391,220,"内部E=0",{a:"middle",z:11,c:C.muted,w:800})}${line(325,320,477,320,{c:C.blue,w:4,arrow:"b"})}${text(401,302,"d_eff=d−t",{a:"middle",c:C.blue,w:900})}`);
    body+=layer(step,4,`${formulaBox(530,320,175,"C↑，U=Q/C↓，张角↓",{h:28,f:"#eaf3ff",c:C.blue,tc:C.blue,z:10})}`);
    return base("同一题先分开关状态；插金属后只在非金属区降势",body,"闭合时U定，断开后Q定；金属内E=0使有效场区距离变为d−t");
  }

  function rcDischargeDiagram(q,step){
    let body=`${line(90,300,690,300,{c:C.ink,w:3,arrow:"b"})}${line(90,325,90,55,{c:C.ink,w:3,arrow:"b"})}${text(705,300,"t",{c:C.muted})}${text(90,42,"i",{a:"middle",c:C.muted})}<path d="M100 75 C155 145 205 265 360 295" fill="none" stroke="${C.orange}" stroke-width="5"/><path d="M100 150 C230 198 400 270 665 295" fill="none" stroke="${C.blue}" stroke-width="5"/>${text(195,103,"R小：高、窄、快",{c:C.orange,w:900})}${text(425,204,"R大：低、宽、慢",{c:C.blue,w:900})}`;
    body+=layer(step,1,`${formulaBox(475,72,185,"I₀=U₀/R；τ=RC",{f:"#fff0e6",c:C.orange,tc:C.orange,z:13})}`);
    body+=layer(step,2,`<path d="M100 300 L100 75 C155 145 205 265 360 295 L360 300 Z" fill="${C.orange}" fill-opacity=".13"/><path d="M100 300 L100 150 C230 198 400 270 665 295 L665 300 Z" fill="${C.blue}" fill-opacity=".11"/>${text(515,250,"两条完整面积均为Q₀",{a:"middle",c:C.green,w:900})}`);
    body+=layer(step,3,`${formulaBox(210,315,340,"40×0.2×10⁻³×0.4=3.2×10⁻³ C=3.2 mC",{h:28,f:"#e8f7ef",c:C.green,tc:C.green,z:11})}`);
    return base("RC放电：时间尺度随R，完整面积不随R",body,"R减小使放电更快但不改变同一初始Q₀；电流面积单位A·s就是C");
  }

  function thermalCapacitorDiagram(q,step){
    let body=`${line(190,80,580,80,{c:C.blue,w:9})}${line(190,278,580,278,{c:C.red,w:9})}${text(610,80,"M固定（−）",{c:C.blue,w:900})}${text(610,278,"N带正电",{c:C.red,w:900})}<path d="M190 285 L580 285 L550 330 L220 330 Z" fill="#f4d083" stroke="${C.gold}" stroke-width="3"/>${text(385,350,"温敏材料热胀",{a:"middle",c:C.gold,w:900})}${line(270,250,270,110,{c:C.orange,w:3,arrow:"o"})}${line(500,250,500,110,{c:C.orange,w:3,arrow:"o"})}${text(517,176,"E↑",{c:C.orange,w:900})}${circle(385,180,18,{f:"#fff",c:C.ink})}${text(385,180,"q",{a:"middle",z:13,w:900})}`;
    body+=layer(step,1,`${line(640,290,640,225,{c:C.green,w:5,arrow:"g"})}${text(657,255,"N上移，d↓",{c:C.green,w:900})}`);
    body+=layer(step,2,`${formulaBox(45,85,200,"断电：Q不变；C=ε₀S/d↑",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:12})}`);
    body+=layer(step,3,`${line(385,160,385,105,{c:C.green,w:5,arrow:"g"})}${text(404,126,"qE",{c:C.green,w:900})}${line(385,200,385,260,{c:C.orange,w:5,arrow:"o"})}${text(403,239,"mg",{c:C.orange,w:900})}${formulaBox(480,135,220,"E=Q/(ε₀S)不变",{f:"#e8f7ef",c:C.green,tc:C.green,z:13})}`);
    body+=layer(step,4,`${text(385,310,"qE=mg仍成立 ⇒ 微粒仍静止",{a:"middle",c:C.red,z:14,w:900})}`);
    return base("断电恒荷：板距改变但理想场强不变",body,"下板受热向上；正下板到负上板的E向上，图中qE与mg继续平衡");
  }

  function groundedPlateDiagram(q,step){
    let body=`${line(180,82,590,82,{c:C.red,w:9})}${line(180,292,590,292,{c:C.blue,w:9})}${text(620,82,"上板a",{c:C.red,w:900})}${text(620,292,"下板b：φ_b=0",{c:C.blue,w:900})}${circle(385,182,18,{f:"#fff",c:C.ink})}${text(385,182,"P",{a:"middle",w:900})}${line(300,110,300,260,{c:C.orange,w:3,arrow:"o"})}${text(317,185,"E",{c:C.orange,w:900})}`;
    body+=layer(step,1,`${formulaBox(45,78,210,"断开S：隔离板Q不变；b仍接地",{f:"#eaf3ff",c:C.blue,tc:C.blue,z:11})}`);
    body+=layer(step,2,`${line(650,292,650,240,{c:C.green,w:5,arrow:"g"})}${text(667,263,"b上移",{c:C.green,w:900})}${text(530,332,"d↓⇒C↑⇒U↓",{a:"middle",c:C.green,w:900})}`);
    body+=layer(step,3,`${line(385,164,385,113,{c:C.blue,w:5,arrow:"b"})}${text(402,130,"qE",{c:C.blue,w:900})}${line(385,200,385,260,{c:C.orange,w:5,arrow:"o"})}${text(402,239,"mg",{c:C.orange,w:900})}${text(158,230,"E=Q/(ε₀S)不变",{a:"middle",c:C.red,z:13,w:900})}`);
    body+=layer(step,4,`${line(455,182,455,292,{c:C.gold,w:4,d:"6 5"})}${text(470,238,"h↓",{c:C.gold,w:900})}${formulaBox(500,140,190,"φ_P=Eh↓",{f:"#fff8df",c:C.gold,tc:C.gold,z:16})}`);
    return base("接地固定零势面：E不变不代表固定点φ不变",body,"b上移使P到零势板距离h减小，故φ_P降低；油滴受力仍平衡");
  }

  const special={
    "101q1":pathsWorkDiagram,"101q2":negativeSourceDiagram,"101q3":symmetryDiagram,
    "101q4":electrodeMapDiagram,"101q5":symmetryDiagram,"101q6":trajectoryEquipotentialDiagram,
    "101c1":circleFieldDiagram,"101c2":pendulumDiagram,"101c3":energyCurveDiagram,
    "102q1":potentialChainDiagram,"102q2":equalWorkPanels,"102q3":negativePathsDiagram,
    "102q4":rightTrianglePotentialDiagram,"102q5":equilateralPotentialDiagram,"102q6":coaxialDiagram,
    "102c1":locateSourceDiagram,"102c2":chargedPendulumGeometryDiagram,"102c3":zeroPotentialCircleDiagram,
    "103q1":hexagonFieldDiagram,"103q2":rectangleFieldDiagram,"103q3":hexagonFieldDiagram,
    "103q4":coordinateFieldDiagram,"103q5":rightTriangleInverseDiagram,"103q6":equilateralWorkDiagram,
    "103c1":rightTriangleInverseDiagram,"103c2":circlePotentialAngleDiagram,"103c3":equilateralWorkDiagram,
    "104q1":capacitanceGraphsDiagram,"104q2":chargeDischargeDiagram,"104q3":keyboardCapacitorDiagram,
    "104q4":controlVariableCapacitorDiagram,"104q5":switchMetalDiagram,"104q6":rcDischargeDiagram,
    "104c1":thermalCapacitorDiagram,"104c2":groundedPlateDiagram,"104c3":rcDischargeDiagram,
    "105q1":twoParticlePlatesDiagram,"105q2":electronAccelerationDiagram,
    "105q3":screenRangeDiagram,"105q4":driftTubeDiagram,"105q5":oscilloscopeDiagram,
    "105q6":scanDiagram,"105c1":driftTubeDiagram,"105c2":screenRangeDiagram,"105c3":lissajousCircleDiagram
  };

  function solution(q,step=0){if(special[q.id])return special[q.id](q,step);const kind=q.diagram||"energy";if(kind==="potential")return potentialDiagram(q,step);if(kind==="equipotential")return equipotentialDiagram(q,step);if(kind==="projection")return projectionDiagram(q,step);if(kind==="capacitor")return capacitorDiagram(q,step);if(kind==="particle")return particleDiagram(q,step);if(kind==="graph")return graphDiagram(q,step);if(kind==="circle-field")return circleFieldDiagram(q,step);if(kind==="force")return forceDiagram(q,step);return energyDiagram(q,step)}
  window.FUMI_CH10_DIAGRAMS={lesson,solution};
})();
