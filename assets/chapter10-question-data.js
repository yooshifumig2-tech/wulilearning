(function(){
  "use strict";

  const D=window.FUMI_CH10||(window.FUMI_CH10={});
  const A=i=>String.fromCharCode(65+i);
  const step=(title,text,formula="",important=false)=>({title,text,formula,important});
  const imageFor=id=>`assets/ch10/${id.slice(0,3)}/${id}.png`;
  const answerLabel=(type,answer)=>type==="multiple"?answer.map(A).join("、"):A(answer);
  function make(data){
    const q={
      id:data.id,
      section:data.section,
      point:data.point,
      dimension:data.dimension,
      difficulty:data.difficulty,
      type:data.type||"single",
      prompt:data.prompt,
      options:data.options,
      answer:data.answer,
      answerText:data.answerText||answerLabel(data.type||"single",data.answer),
      source:data.source,
      imageAlt:data.imageAlt||`${data.section} ${data.point}原题图`,
      diagram:data.diagram||"energy",
      diagramData:data.diagramData||{},
      steps:data.steps,
      mistake:data.mistake
    };
    if(data.image!==false) q.image=data.image||imageFor(data.id);
    return q;
  }
  const questions={};
  const add=items=>items.forEach(item=>{questions[item.id]=make(item)});

  add([
    {
      id:"101q1",section:"10.1",point:"静电力做功与路径无关",dimension:"能量模型",difficulty:"基础",type:"multiple",
      prompt:"如图，在向右的匀强电场中，同一电荷从A点分别沿路径1、2、3运动到B点。下列说法正确的是（　　）",
      options:["同一电荷沿三条路径从A到B，静电力做功相同。","电荷在A点的电势能一定比在B点的电势能大。","正电荷从A运动到B，静电力做正功；负电荷从A运动到B，静电力做负功。","无论正、负电荷，静电力做负功时其电势能一定增加。"],
      answer:[0,2,3],source:"10.1专题训练·考点1第3题",diagram:"energy",diagramData:{charge:"±q",labels:["A","B","路径1","路径2","路径3","E","Δx"]},
      steps:[
        step("只比较初末位置","三条路径形状与长度不同，但A、B相同；在匀强场中每条路径沿场强方向的总投影都是同一个Δx。","W=qEΔx",true),
        step("核对A项","静电力是保守力，功只由初、末位置决定，因此三条路径的静电力功相同，A正确。","W₁=W₂=W₃"),
        step("把电性带入","图中φ_A>φ_B。正电荷的力向右，从A到B做正功；负电荷受力向左，做负功。C正确，而电势能高低不能脱离q的正负判断，B错误。","E_p=qφ"),
        step("用功能关系收尾","由W_AB=-ΔE_p，只要静电力做负功，就有ΔE_p>0，与电荷正负无关，D正确。","W_AB=E_pA-E_pB=-ΔE_p",true)
      ],
      mistake:"把路径长度当成位移，或不看电荷正负就直接比较两点电势能。"
    },
    {
      id:"101q2",section:"10.1",point:"点电荷场中的E与φ",dimension:"空间关系",difficulty:"基础",
      prompt:"如图为某一点电荷产生的电场线，A、B、C点的场强大小分别为2E、E、E。下列说法正确的是（　　）",
      options:["该点电荷为正电荷。","B、C两点电场强度相同。","B、C两点电势一定相等。","电子在A点的电势能比在B点的电势能小。"],
      answer:2,source:"10.1专题训练·考点2第6题",diagram:"equipotential",diagramData:{sourceCharge:"negative",labels:["A","B","C","E_B","E_C"]},
      steps:[
        step("由箭头判断场源","电场线箭头指向左侧场源，电场线终止于负电荷，所以场源带负电，A错误。","电场线：正电荷出发，负电荷终止",true),
        step("区分大小与矢量","B、C的场强大小都为E，但方向分别沿各自电场线的切线，方向不同，不能说电场强度相同，B错误。","E_B≠E_C（矢量）"),
        step("用点电荷场规律","同一场源下E=k|Q|/r²。B、C场强大小相等说明到场源距离相等，位于同一球形等势面上，因此φ_B=φ_C，C正确。","E=k|Q|/r²，φ=kQ/r",true),
        step("核对电子电势能","A更靠近负电荷，φ_A<φ_B；电子q=-e，乘负号后E_pA>E_pB，所以D错误。","E_p=(-e)φ")
      ],
      mistake:"把“场强大小相等”误写成“电场强度相同”，或忘记电子带负电。"
    },
    {
      id:"101q3",section:"10.1",point:"电场的对称性",dimension:"空间关系",difficulty:"基础",
      prompt:"图甲为点电荷电场，图乙为等量异种电荷的电场，图中标出a、b、c等点。下列说法正确的是（　　）",
      options:["图甲中与点电荷等距的a、b两点电场强度相同。","图甲中与点电荷等距的a、b两点电势不同。","图乙中两等量异种电荷连线的中垂线上、关于连线对称的a、b两点电场强度相同。","图乙中b点电势低于c点电势。"],
      answer:2,source:"10.1专题训练·考点7第29题",image:"assets/ch10/101/101q3.svg",imageAlt:"严格按题意重绘的点电荷等距点与等量异种电荷对称点示意",diagram:"equipotential",diagramData:{scenes:["point-charge","dipole"],labels:["a","b","c","E_+","E_-"]},
      steps:[
        step("先看图甲的距离","a、b到正点电荷距离相同，故场强大小相等、电势相等。可是两处场强径向方向不同，因此A、B都错误。","|E_a|=|E_b|，φ_a=φ_b"),
        step("拆分图乙场强","在a点分别画正、负场源产生的分场；在b点作镜像分场。对应的竖直分量抵消规律相同，水平分量相加。","E=E_++E_-",true),
        step("比较合场矢量","a、b关于电荷连线对称，合场的大小、方向均相同，所以C正确。这里必须比较完整矢量，而不只是大小。","E_a=E_b"),
        step("沿场线判电势","等量异种电荷的场线由正指向负，沿箭头电势降低；图中b比c更靠高电势侧，故φ_b>φ_c，D错误。","沿E方向φ降低")
      ],
      mistake:"只写“由对称性”而不把两个分场合成；或把等距点的场强方向也当成相同。"
    },
    {
      id:"101q4",section:"10.1",point:"场线、等势面与探矿",dimension:"图像理解",difficulty:"基础",
      prompt:"探矿时在大地表面放置正、负电极，得到如图电场分布。A、B、C、D为四点，其中C、D在同一等势面上。下列说法正确的是（　　）",
      options:["A点的电势高于C点的电势。","A、B、C、D四点中，B点电势最高。","A点的电场强度大于B点的电场强度。","电子在C点的电势能比在D点时大。"],
      answer:0,source:"10.1专题训练·考点7第30题",diagram:"equipotential",diagramData:{labels:["正极","负极","A","B","C","D"],compareDensity:true},
      steps:[
        step("沿场线排电势","电场线由右侧正极指向左侧负极，沿箭头电势降低；C、D位于两电极连线的中垂等势面，可排出φ_A>φ_C=φ_D>φ_B。","φ_A>φ_C=φ_D>φ_B",true),
        step("核对电势选项","A点电势高于C点，A正确；四点中B更靠负极一侧，电势最低而非最高，所以B错误。","φ_A>φ_C；φ_B最低"),
        step("用局部疏密比场强","在相同宽度的小区域内，B附近场线比A附近更密，表示E_B>E_A，所以C错误。","E_B>E_A"),
        step("等势即同一电势能","C、D电势相等，同一电子的E_p=qφ也相等，D错误。","E_pC=E_pD")
      ],
      mistake:"用整幅图的场线总条数定量比较场强；或忘记同一等势面上电势相等。"
    },
    {
      id:"101q5",section:"10.1",point:"等量异种电荷的叠加",dimension:"空间关系",difficulty:"低中档",
      prompt:"如图，D是等边三角形ABC底边BC的中点。将等量异种电荷分别置于AB边和AC边的中点（已按题图校正）。下列说法正确的是（　　）",
      options:["A、D两点的电场强度相同，B、C两点的电势不相同。","B、C两点的电场强度相同，A、D两点的电势不相同。","A、D两点的电场强度不相同，B、C两点的电势相同。","B、C两点的电场强度不相同，A、D两点的电势不相同。"],
      answer:0,source:"10.1专题训练·考点11第48题（题干与解析已校正）",diagram:"equipotential",diagramData:{charges:["+Q","-Q"],labels:["A","B","C","D","AD零等势线"]},
      steps:[
        step("先校正题源","源文字误写为AB、BC边中点；题图与原答案对应的是AB、AC边中点。两电荷连线水平，AD是其垂直平分线。","电荷位置：AB中点、AC中点",true),
        step("判断AD上的电势","A、D到+Q、-Q等距，两项电势大小相等、符号相反，故φ_A=φ_D=0。零等势线是AD，不是两电荷的连线。","φ_A=φ_D=0",true),
        step("合成A、D处场强","A、D到两电荷距离都等于半边长；两个分场的竖直分量抵消、水平分量相加，合场均向同一侧且大小相等。","E_A=E_D"),
        step("比较B、C电势","B、C关于AD对称，但反射会交换正、负场源，故φ_B=-φ_C且均非零，二者电势不同，A正确。","φ_B=-φ_C≠0")
      ],
      mistake:"把电荷连线误当作等势线；正确的是异号等量电荷连线的垂直平分线为零等势线。"
    },
    {
      id:"101q6",section:"10.1",point:"等势线、轨迹与场强",dimension:"图像理解",difficulty:"低中档",
      prompt:"如图，三条虚线是某点电荷电场的等势线，一带电粒子仅受电场力沿实线路径运动，A、B、C、D、G为轨迹与等势面的交点。下列说法正确的是（　　）",
      options:["场源电荷带正电。","运动带电粒子带正电。","A点电场强度大于B点电场强度。","带电粒子在D点的加速度大于在G点的加速度。"],
      answer:3,source:"10.1专题训练·考点14第57题",diagram:"graph",diagramData:{axis:"φ / 位置",labels:["5 V","0 V","-5 V","A","B","C","D","G"]},
      steps:[
        step("先由等势值定E","电场垂直等势线并由5 V侧指向0 V、-5 V侧，即指向低电势。结合等势线趋向场源，可判断场源为负，A错误。","E⊥等势线；沿E方向φ降低",true),
        step("再由轨迹凹向定力","轨迹的凹向指示合力方向。该力与当地E相反，所以运动粒子带负电，B错误。","F_e=qE"),
        step("只比较等差线疏密","相邻等势线电势差相等时，越密处场强越大。B附近比A密，故E_B>E_A，C错误。","E≈Δφ/Δd"),
        step("比较D、G加速度","D附近等差等势线比G附近密，E_D>E_G；同一粒子a=|q|E/m，所以a_D>a_G，D正确。","a_D>a_G",true)
      ],
      mistake:"把轨迹切线当成受力方向；或未确认相邻等势差相等就直接用线距比较场强。"
    },
    {
      id:"101c1",section:"10.1",point:"二维匀强电场分解",dimension:"空间关系",difficulty:"中等",
      prompt:"在平行纸面的匀强电场中有圆心O、半径R的圆，AB、CD是夹角60°的两条直径。正电粒子从A进入；从B射出时动能增加2E<sub>k</sub>，从D射出时动能增加3E<sub>k</sub>/2。粒子仅受静电力，下列说法正确的是（　　）",
      options:["A点电势低于C点电势。","匀强电场方向与CD平行。","若粒子从C点射出，其动能增加E<sub>k</sub>/2。","若粒子从BD中点射出，静电力做功为√3E<sub>k</sub>。"],
      answer:2,source:"10.1专题训练·考点1第2题",diagram:"circle-field",diagramData:{labels:["O","A","B","C","D","R","60°","E_x","E_y"]},
      steps:[
        step("建立无歧义坐标","沿CD向右建x轴、过O向下建y轴，将E分解为E_x、E_y。坐标只在提交后出现。","E=E_x i+E_y j"),
        step("写A到B的功—能式","A→B的位移分量是(2Rcos60°, 2Rsin60°)，静电力功等于动能增加2E_k。","qE_x·2Rcos60°+qE_y·2Rsin60°=2E_k",true),
        step("写A到D并联立","A→D的分量为(R+Rcos60°, Rsin60°)。联立两式得qE_xR=E_k/2、qE_yR=√3E_k/2，故合场沿AB。","E_y/E_x=√3",true),
        step("逐项检验","A→C分量为(-R/2,√3R/2)，代入W=q(E_xΔx+E_yΔy)=E_k/2，C正确；其余结论与所得E方向或计算不符。","W_AC=E_k/2")
      ],
      mistake:"未先建立坐标就凭图猜场强方向，或把路径长度代入匀强场做功。"
    },
    {
      id:"101c2",section:"10.1",point:"带电摆球与电势能",dimension:"能量模型",difficulty:"中等",
      prompt:"1 m绝缘细线拴质量0.2 kg、电荷量+2.0×10<sup>-6</sup> C的小球；水平向右匀强电场中平衡时细线与竖直成37°。取g=10 m/s²，sin37°=0.6，cos37°=0.8。把小球移到同半径、细线在竖直另一侧成53°的B点。正确的一组结论是（　　）",
      options:["T=2.5 N，E=7.5×10<sup>5</sup> N/C；A到B静电力做功-2.1 J，电势能增加2.1 J。","T=2.5 N，E=7.5×10<sup>5</sup> N/C；A到B静电力做正功，电势能减少2.1 J。","T=1.6 N，E=1.0×10<sup>6</sup> N/C；A、B等高，所以电势能不变。","T=2.0 N，E=7.5×10<sup>5</sup> N/C；A到B电势能增加1.4 J。"],
      answer:0,source:"10.1专题训练·考点5第19题",diagram:"force",diagramData:{object:"+q",force:"qE",constraint:"T",gravity:true},
      steps:[
        step("只画实际受力","A点平衡时小球受拉力T、重力mg和水平向右的电场力qE；不要把速度或场强另画成力。","ΣF=0"),
        step("分解平衡方程","竖直方向Tcos37°=mg，水平方向Tsin37°=qE，得T=2.5 N、E=7.5×10⁵ N/C。","T=mg/cos37°；E=Tsin37°/q",true),
        step("求有符号水平位移","A到B与电场反向，沿场投影Δx=-[1·sin37°+1·sin53°]=-1.4 m。","Δx=-1.4 m"),
        step("由功判电势能","W=qEΔx=-2.1 J，因此ΔE_p=-W=+2.1 J，选择A。等高只能判断重力势能，不能判断电势能。","ΔE_p=+2.1 J",true)
      ],
      mistake:"把“等高”误当作“等势”，或漏掉A、B分处竖直线两侧造成的两段水平投影。"
    },
    {
      id:"101c3",section:"10.1",point:"E_p-x图像与运动",dimension:"图像理解",difficulty:"低中档",
      prompt:"带正电粒子在电场中由静止释放，仅受静电力沿直线由A到B。其电势能E<sub>p</sub>随位移x单调下降，曲线逐渐变平。下列相应图像最合理的是（　　）",
      options:["加速度a为恒定正值。","电势φ随x作线性下降。","速度v随x作线性上升。","动能E<sub>k</sub>随x上升且曲线斜率逐渐减小。"],
      answer:3,source:"10.1专题训练·考点15第61题",diagram:"graph",diagramData:{axis:"E_p / E_k",charge:"+q"},
      steps:[
        step("由E_p斜率读力","一维运动中F_x=-dE_p/dx。曲线下降且逐渐变平，说明正向力仍存在但逐渐减小。","F_x=-dE_p/dx",true),
        step("判断加速度","同一粒子a=F/m也逐渐减小，不是恒定值，A错误。","a↓"),
        step("判断φ和v图像","正电荷φ=E_p/q，与E_p-x同形而不是直线；加速度变化，v-x也不可能是直线，B、C错误。","φ=E_p/q"),
        step("能量守恒检验","只有静电力做功时E_k+E_p为常量，因此E_k=常量-E_p，随x上升且斜率逐渐减小，D正确。","E_k+E_p=常量",true)
      ],
      mistake:"把曲线的纵坐标高低当成场强大小；场强来自斜率的负值。"
    }
  ]);

  add([
    {
      id:"102q1",section:"10.2",point:"E、U、φ与E_p串联",dimension:"符号规范",difficulty:"基础",
      prompt:"某点电荷的电场中，A、B在同一条电场线上。q=+4×10<sup>-8</sup> C的电荷在A点受力F<sub>A</sub>=8×10<sup>-4</sup> N；由A移到B时静电力做功W<sub>AB</sub>=1.2×10<sup>-6</sup> J。取φ<sub>A</sub>=0，完整结论正确的是（　　）",
      options:["E_A=2×10<sup>4</sup> N/C且由A指向B；U_AB=30 V；φ_B=-30 V；E_pB=-1.2×10<sup>-6</sup> J。","E_A=2×10<sup>4</sup> N/C且由B指向A；U_AB=-30 V；φ_B=30 V；E_pB=1.2×10<sup>-6</sup> J。","E_A=3×10<sup>4</sup> N/C且由A指向B；U_AB=20 V；φ_B=-20 V；E_pB=-8.0×10<sup>-7</sup> J。","E_A=2×10<sup>-4</sup> N/C且由A指向B；U_AB=30 V；φ_B=30 V；E_pB=1.2×10<sup>-6</sup> J。"],
      answer:0,source:"10.2专题训练·考点1第5题（开放题改长文本选择）",diagram:"potential",diagramData:{charge:"+q",labels:["A","B","F_A","E_A","φ_A=0"]},
      steps:[
        step("由受力求场强","研究对象是正电荷，E_A=F_A/q=2×10⁴ N/C；正电荷受力与E同向。","E_A=8×10⁻⁴/(4×10⁻⁸)=2×10⁴ N/C",true),
        step("由正功确定方向","正电荷从A到B时静电力做正功，且A、B在同一场线上，所以E由A指向B，电势沿此方向降低。","φ_A>φ_B"),
        step("保留角标求电势差","U_AB=W_AB/q=30 V。角标AB固定表示φ_A-φ_B，不可反写。","U_AB=φ_A-φ_B=30 V",true),
        step("代零点求φ与E_p","φ_A=0，因此φ_B=-30 V；E_pB=qφ_B=-1.2×10⁻⁶ J。四项均与A一致。","E_pB=(4×10⁻⁸)(-30)=-1.2×10⁻⁶ J")
      ],
      mistake:"把U_AB写成φ_B-φ_A，或求出负电势后漏掉电荷的正号。"
    },
    {
      id:"102q2",section:"10.2",point:"做功只由电势差决定",dimension:"能量模型",difficulty:"基础",
      prompt:"三幅图表示形状不同的电场，A、B分别位于20 V和40 V等势线上。把+1 μC电荷从A移到B，三种情况下静电力功为WⅠ、WⅡ、WⅢ，则（　　）",
      options:["WⅠ最大。","WⅡ最大。","WⅢ最大。","WⅠ=WⅡ<WⅢ。","WⅠ=WⅡ=WⅢ。"],
      answer:4,source:"10.2专题训练·考点2第9题",diagram:"equipotential",diagramData:{cases:3,labels:["20 V","40 V","A","B"]},
      steps:[
        step("忽略曲线形状","三图的场线、等势线形状虽不同，但A、B的电势值都分别为20 V和40 V。","U_AB=φ_A-φ_B"),
        step("计算共同电势差","三种情况下U_AB=20-40=-20 V，电势差只由初末点决定。","U_AB=-20 V",true),
        step("带入电荷量","W=qU=(1×10⁻⁶)(-20)=-2.0×10⁻⁵ J=-20 μJ。","W=-20 μJ"),
        step("比较三种场","三张“电势账单”完全相同，所以WⅠ=WⅡ=WⅢ，选E。路径或曲线长短不参与计算。","WⅠ=WⅡ=WⅢ",true)
      ],
      mistake:"看到场形状不同就比较路径长度；静电力功只看q与两点电势差。"
    },
    {
      id:"102q3",section:"10.2",point:"负电荷、多路径与角标",dimension:"符号规范",difficulty:"基础",
      prompt:"在场强为E的匀强电场中，A、B相距l，AB与E夹角为θ。将电荷量为-q（q>0）的试探电荷分别沿直线AB、折线ACB、曲线ADB由A移到B。下列说法正确的是（　　）",
      options:["三条路径对应的电势能变化不同。","试探电荷从A到B，静电力做负功。","A、B两点电势差U_AB<0。","沿ACB运动时，E_pB<E_pC。"],
      answer:1,source:"10.2专题训练·考点4第21题",diagram:"potential",diagramData:{charge:"-q",paths:3,labels:["A","B","C","D","E向左"]},
      steps:[
        step("先固定初末点","静电力功和电势能变化与路径无关，三条路径从A到B的结果相同，A错误。","W_AB=qU_AB"),
        step("判断U_AB符号","图中E向左，A到B的沿场投影也向左，所以φ_A>φ_B，U_AB>0，C错误。","U_AB=φ_A-φ_B>0",true),
        step("带入负电荷","试探电荷为-q，故W_AB=(-q)U_AB<0，B正确。","W_AB<0",true),
        step("比较C、B电势能","AC垂直于E，故φ_A=φ_C；C到B沿E，φ_C>φ_B。乘负电荷后E_pB>E_pC，D错误。","φ_A=φ_C>φ_B；E_pB>E_pC")
      ],
      mistake:"忘记q为负值，或把A、C的等势关系误写成大小关系。"
    },
    {
      id:"102q4",section:"10.2",point:"由做功确定电场方向",dimension:"符号规范",difficulty:"低中档",
      prompt:"匀强电场中，q=-6×10<sup>-6</sup> C从A到B，W_AB=-2.4×10<sup>-5</sup> J；再从B到C，W_BC=1.2×10<sup>-5</sup> J。若φ_B=0，下列哪组“电势差—三点电势—作图依据”全部正确？",
      options:["U_AB=4 V、U_BC=-2 V；φ_A=4 V、φ_B=0、φ_C=2 V；AB中点与C等势，连接后作垂线并由高电势侧指向低电势侧。","U_AB=-4 V、U_BC=2 V；φ_A=-4 V、φ_B=0、φ_C=-2 V；连接A、C作为等势线。","U_AB=4 V、U_BC=2 V；φ_A=4 V、φ_B=0、φ_C=-2 V；把BC直接作为电场线。","U_AB=-4 V、U_BC=-2 V；φ_A=-4 V、φ_B=0、φ_C=2 V；把AB中点与C连线作为电场线。"],
      answer:0,source:"10.2专题训练·考点5第23题（开放题改长文本选择）",diagram:"equipotential",diagramData:{labels:["A 4 V","B 0 V","C 2 V","AB中点 2 V"],uniform:true},
      steps:[
        step("先算两个有角标的U","分别用W=qU：U_AB=(-2.4×10⁻⁵)/(-6×10⁻⁶)=4 V；U_BC=(1.2×10⁻⁵)/(-6×10⁻⁶)=-2 V。","U_AB=4 V；U_BC=-2 V",true),
        step("由φ_B=0还原三点电势","U_AB=φ_A-φ_B，得φ_A=4 V；U_BC=φ_B-φ_C=-2 V，得φ_C=2 V。","φ_A=4 V，φ_B=0，φ_C=2 V"),
        step("找同势点","匀强场中线段上电势线性变化，AB中点电势为2 V，恰与C等势，二者连线是一条等势线。","φ_AB中点=φ_C=2 V",true),
        step("画场线并定方向","电场线垂直等势线，并由高电势一侧指向低电势一侧。只有A完整保留了角标、符号与作图顺序。","E⊥等势线；高φ→低φ")
      ],
      mistake:"一次计算里交换U的角标，或把等势线本身画成带箭头的电场线。"
    },
    {
      id:"102q5",section:"10.2",point:"正三角形中寻找场强方向",dimension:"空间关系",difficulty:"低中档",image:false,
      prompt:"a、b、c是匀强电场中正三角形的三个顶点，φ_a=10 V、φ_b=0 V、φ_c=5 V。正三角形与电场方向共面，选择可能的场强方向图（　　）",
      options:["<img src=\"assets/ch10/102/102q5a.png\" alt=\"选项A：场强方向图\"><span>选项A</span>","<img src=\"assets/ch10/102/102q5b.png\" alt=\"选项B：场强方向图\"><span>选项B</span>","<img src=\"assets/ch10/102/102q5c.png\" alt=\"选项C：场强水平由a侧指向b侧\"><span>选项C</span>","<img src=\"assets/ch10/102/102q5d.png\" alt=\"选项D：场强方向图\"><span>选项D</span>"],
      answer:2,source:"10.2专题训练·考点6第30题",diagram:"equipotential",diagramData:{labels:["a 10 V","b 0 V","c 5 V","ab中点 5 V"]},
      steps:[
        step("利用中点电势","匀强电场中沿线段电势线性变化，ab中点电势为(10+0)/2=5 V。","φ_ab中点=5 V"),
        step("找到等势线","c点也是5 V，因此c与ab中点的连线是等势线。等势线本身不画箭头。","φ_c=φ_ab中点",true),
        step("作垂线","电场方向必与这条等势线垂直，所以只能沿ab方向。","E⊥等势线"),
        step("由高到低定箭头","a侧10 V、b侧0 V，E从a侧指向b侧，对应选项C。","10 V→0 V",true)
      ],
      mistake:"只看三角形对称性猜方向，或把正确选项图单独放在题干中提前泄露答案。"
    },
    {
      id:"102q6",section:"10.2",point:"同轴电缆的场与等势线",dimension:"图像理解",difficulty:"基础",
      prompt:"同轴电缆横截面图中实线、虚线分别表示电场线与等势线；相邻虚线圆的径向间距相等，a、b、c为图示点。下列说法正确的是（　　）",
      options:["实线代表等势线，虚线代表电场线。","a、c间电势差是b、c间电势差的两倍。","a点场强与b点场强不相同。","正电荷在a点的电势能一定小于在b点的电势能。"],
      answer:2,source:"10.2专题训练·考点6第31题",diagram:"equipotential",diagramData:{coaxial:true,labels:["a","b","c","电场线","等势线"]},
      steps:[
        step("识别两类曲线","径向延伸且不闭合的实线是电场线；同心闭合虚线是等势线，A错误。","E⊥等势线"),
        step("判断是否匀强","同轴结构的场强随半径变化，并非匀强；越靠内导体场线越密，故E_a>E_b，C正确。","E_a>E_b",true),
        step("相等距离不等于相等U","相邻虚线圆径向间距相等，但平均场强不同，所以对应电势差并不相等，B错误。","U=∫E·dl"),
        step("不擅自添加电性","原题没有给场线箭头，不能确定内外导体谁电势高，因而不能断言正电荷在a、b的电势能高低，D错误。","E_p=qφ",true)
      ],
      mistake:"把同心圆场误当作匀强场，或在题图没给箭头时擅自判断内导体正负。"
    },
    {
      id:"102c1",section:"10.2",point:"由场强方向反找场源",dimension:"空间关系",difficulty:"中等",
      prompt:"点电荷电场中a、b两点场强大小均为E，两处场强方向与ab延长线夹角均为30°，c为ab中点，ab=√3L。把-q₁由a移到b时静电力累计功的最大值为W。正确结论是（　　）",
      options:["场源位于两条E矢量反向延长线交点，带正电，Q=EL²/k；a、b等势，U_bc=-W/q₁。","场源位于c点，带负电，Q=3EL²/k；U_bc=W/q₁。","场源位于a、b之间，带正电，Q=EL²/(3k)；U_bc=0。","场源位置无法确定，U_bc也不能由W求出。"],
      answer:0,source:"10.2专题训练·考点3第13题",diagram:"equipotential",diagramData:{sourceCharge:"positive",labels:["a","b","c","Q","30°","L"]},
      steps:[
        step("反向延长E矢量","点电荷场强沿半径。将a、b处E矢量反向延长，交点即场源；E背离交点，故Q为正。","场源：E反向延长线交点",true),
        step("由几何求Q","几何关系给Qa=Qb=L，代E=kQ/L²得Q=EL²/k。","Q=EL²/k"),
        step("找功的极值位置","a、b等距，φ_a=φ_b；沿a→b电势先到c处极值再回到相同值，所以累计功最大值对应a→c。","W=(-q₁)U_ac"),
        step("转换为U_bc","U_ac=-W/q₁；又U_bc=φ_b-φ_c=φ_a-φ_c=U_ac，所以U_bc=-W/q₁，选A。","U_bc=-W/q₁",true)
      ],
      mistake:"把E矢量正向延长找场源，或忘记a、b等势导致U_bc与U_ac相同。"
    },
    {
      id:"102c2",section:"10.2",point:"库仑力、重力与电势差",dimension:"能量模型",difficulty:"中等",
      prompt:"正电荷Q固定于O正下方A点；质量m、正电荷q的小球由OB绝缘线悬挂，平衡时线与水平成30°，OA=OB且Q≫q。剪线后小球第一次到达与A同高的C点时速率为v。正确结果是（　　）",
      options:["F=mg，r=√(kQq/mg)，U_BC=mv²/(2q)-[mg/(2q)]√(kQq/mg)。","F=mg/2，r=√(2kQq/mg)，U_BC=mv²/(2q)+mgr/q。","F=√3mg，r=√(kQq/(√3mg))，U_BC=-mv²/(2q)。","只能由平衡求F，不能求r和电势差。"],
      answer:0,source:"10.2专题训练·考点3第14题",diagram:"force",diagramData:{object:"+q",force:"库仑力F",constraint:"T",gravity:true},
      steps:[
        step("补全几何关系","OA=OB且线与水平成30°，可得△OAB为等边三角形，库仑力沿AB并与水平成30°。","OA=OB=AB=r"),
        step("由三力平衡求F","水平分量Tcos30°=Fcos30°，得T=F；竖直分量Tsin30°+Fsin30°=mg，故F=mg。","F=mg",true),
        step("由库仑定律求距离","F=kQq/r²=mg，得r=√(kQq/mg)。","r=√(kQq/mg)"),
        step("剪线后使用动能定理","B到C下降r/2：qU_BC+mg(r/2)=mv²/2。代入r整理即选项A。","U_BC=mv²/(2q)-mgr/(2q)",true)
      ],
      mistake:"受力图漏掉拉力，或剪线后只算静电力功而漏掉重力功。"
    },
    {
      id:"102c3",section:"10.2",point:"零等势圆",dimension:"空间关系",difficulty:"中等",type:"multiple",
      prompt:"点电荷q₁>0、q₂<0及a、b共线，且q₂=-2q₁。取无穷远为零电势，φ=kq/r。把另一正电荷q从a沿图示圆周经c移到b，则（　　）",
      options:["静电力先做正功后做负功。","静电力先做负功后做正功。","圆周最高点c电势为零。","静电力对q始终不做功。"],
      answer:[2,3],source:"10.2专题训练·考点6第29题",diagram:"equipotential",diagramData:{charges:["q₁","-2q₁"],locus:"r₂=2r₁",labels:["a","b","c","p"]},
      steps:[
        step("抓住圆的距离比","对圆上任一点p，源图几何给出到两场源的距离始终满足r₂=2r₁。","r₂=2r₁",true),
        step("叠加两项电势","φ_p=kq₁/r₁+k(-2q₁)/r₂；代r₂=2r₁后两项等大反号。","φ_p=0",true),
        step("识别零等势圆","圆上所有点电势均为0，故最高点c电势为0，C正确。圆是二维等势线，不是场线。","φ_a=φ_c=φ_b=0"),
        step("判断静电力功","正电荷沿同一等势线移动，U=0，W=qU=0，整个过程静电力始终不做功，D正确。","W=0")
      ],
      mistake:"只验证a、b两点而未证明圆上任一点都满足距离比，或把零电势误解为零场强。"
    }
  ]);

  D.questions={...(D.questions||{}),...questions};
})();
