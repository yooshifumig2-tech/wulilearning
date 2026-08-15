(function(){
  "use strict";

  const D=window.FUMI_CH10||(window.FUMI_CH10={});
  const A=i=>String.fromCharCode(65+i);
  const step=(title,text,formula="",important=false)=>({title,text,formula,important});
  const imageFor=id=>`assets/ch10/${id.slice(0,3)}/${id}.png`;
  const answerLabel=(type,answer)=>type==="multiple"?answer.map(A).join("、"):A(answer);
  function make(data){
    const type=data.type||"single";
    return{
      id:data.id,
      section:data.section,
      point:data.point,
      dimension:data.dimension,
      difficulty:data.difficulty,
      type,
      prompt:data.prompt,
      options:data.options,
      answer:data.answer,
      answerText:data.answerText||answerLabel(type,data.answer),
      source:data.source,
      image:data.image===false?null:(data.image||imageFor(data.id)),
      imageAlt:data.imageAlt||`${data.section} ${data.point}原题图`,
      diagram:data.diagram||"energy",
      diagramData:data.diagramData||{},
      steps:data.steps,
      mistake:data.mistake
    };
  }
  const questions={};
  const add=items=>items.forEach(item=>{questions[item.id]=make(item)});

  add([
  {
    id:"103q1",
    section:"10.3",
    point:"匀强电场中的等分法",
    dimension:"空间关系",
    difficulty:"基础",
    type:"single",
    prompt:"如图，A、B、C、D、E、F是边长4 cm的正六边形六个顶点，正六边形所在平面内存在匀强电场。已知φ<sub>A</sub>=4√3 V、φ<sub>C</sub>=2√3 V、φ<sub>E</sub>=0。关于D点电势及场强大小，下列完整结论正确的是（　　）",
    options:[
      "取AE中点G，可得φ<sub>G</sub>=2√3 V=φ<sub>C</sub>，故CG为等势线；由几何关系可得φ<sub>D</sub>=0，且E=100 V/m。",
      "取AE中点G，可得φ<sub>G</sub>=2√3 V，但中点电势不能用于判断等势线，因此φ<sub>D</sub>=2√3 V，E=50 V/m。",
      "因为E点电势为0，所以D点也必为0；直接用正六边形边长代入E=U/d，可得E=50 V/m。",
      "正六边形中心是几何对称点，因此中心电势必为0；据此可得φ<sub>D</sub>=4√3 V，E=200 V/m。"
    ],
    answer:0,
    answerText:"A。φ_D=0 V，E=100 V/m。",
    source:"10.3电势差与电场强度的关系·专题训练，考点1第9题（开放题改长文本选择）",
    image:"assets/ch10/103/103q1.png",
    imageAlt:"正六边形ABCDEF及A、C、E三点电势的原题图",
    diagram:"equipotential",
    diagramData:{shape:"regular-hexagon",sideCm:4,labels:["A 4√3 V","B","C 2√3 V","D","E 0 V","F","G：AE中点","CG：等势线","E"]},
    steps:[
      {title:"先找中点电势",text:"G是AE中点。匀强电场中，沿任一直线电势随位置线性变化，所以中点电势等于两端电势的平均值。",formula:"φ_G=(φ_A+φ_E)/2=2√3 V",important:true,mistake:"只在匀强电场中才能直接使用线段中点电势等于端点平均值。"},
      {title:"把同电势点连起来",text:"C、G两点电势都为2√3 V，因此直线CG是一条等势线。等势线本身不画箭头。",formula:"φ_C=φ_G ⇒ U_CG=0",important:true,mistake:"不要把CG画成带箭头的电场线；它是等势线。"},
      {title:"利用平行方向",text:"正六边形中DE∥CG。CG是等势线，电场方向与CG垂直；因此DE也与电场垂直，沿DE移动时沿场方向的投影距离为0。",formula:"DE∥CG，CG⊥E ⇒ U_DE=0 ⇒ φ_D=φ_E=0",important:true,mistake:"结论来自DE与CG平行、沿场方向投影为0；DE与CG并不等长，也不需要等长。"},
      {title:"确定沿场方向的距离",text:"电场线与CG垂直。正六边形几何关系给出AG垂直CG，因此AG就是A到G沿场强方向的距离。",formula:"AG=(√3/2)×4 cm=2√3 cm",important:false,mistake:"E=U/d中的d必须是沿场强方向的投影距离，不能直接取任意边长。"},
      {title:"计算并核对单位",text:"A到G的电势降低2√3 V，沿场距离为2√3 cm。将厘米换成米后计算场强。",formula:"E=|U_AG|/AG=2√3/(2√3×10⁻²)=100 V/m",important:true,mistake:"若漏掉cm到m的换算，会把答案错误地缩小100倍。"}
    ],
    mistake:"把正六边形边长直接当成投影距离，或把等势线误画成电场线。"
  },
  {
    id:"103q2",
    section:"10.3",
    point:"矩形中的等势线与极板电压",
    dimension:"空间关系",
    difficulty:"低中档",
    type:"single",
    prompt:"如图，长方形ABCD处在平行板电容器形成的匀强电场中，长方形所在平面与两极板垂直。AB=8 cm、BC=6 cm，两极板间距为30 cm；φ<sub>A</sub>=9 V、φ<sub>B</sub>=25 V、φ<sub>C</sub>=16 V。下列说法正确的是（　　）",
    options:["D点电势为18 V。","D点电势为32 V。","两平行板间的电势差大小为75 V。","两平行板间的电势差大小为100 V。"],
    answer:2,
    answerText:"C。φ_D=0 V，E=250 V/m，两极板间电势差大小为75 V。",
    source:"10.3电势差与电场强度的关系·专题训练，考点2第14题",
    image:"assets/ch10/103/103q2.png",
    imageAlt:"长方形ABCD位于平行板电容器中的原题图",
    diagram:"equipotential",
    diagramData:{shape:"rectangle",labels:["A 9 V","B 25 V","C 16 V","D 0 V","O 16 V","OC：等势线","d_⊥=3.6 cm","极板间距30 cm","E"]},
    steps:[
      {title:"先补出D点电势",text:"AB与DC是平行且相等的位移，匀强电场中二者对应的电势差相等。",formula:"φ_A-φ_B=φ_D-φ_C ⇒ φ_D=0 V",important:true,mistake:"不要使用φ_A+φ_B=φ_C+φ_D；正确的平行四边形关系是φ_A+φ_C=φ_B+φ_D。"},
      {title:"在AB上寻找16 V点",text:"在AB上取O，使φ_O=φ_C=16 V。AB上电势线性变化，因此可以按电势差比例分点。",formula:"AO/AB=(16-9)/(25-9)=7/16；AO=3.5 cm，BO=4.5 cm",important:false,mistake:"分点比例要同时使用位置顺序和电势变化方向，不能把AO、BO互换。"},
      {title:"构造等势线",text:"O、C电势相等，连接OC得到16 V等势线；电场方向与OC垂直，并由B侧的高电势指向D侧的低电势。",formula:"φ_O=φ_C=16 V；E⊥OC",important:true,mistake:"场强方向由高电势指向低电势，不能只画垂线而不定箭头。"},
      {title:"求B到等势线的垂距",text:"直角三角形BOC中，BO=4.5 cm、BC=6 cm、OC=7.5 cm，B到OC的垂直距离为3.6 cm。",formula:"d_⊥=BO·BC/OC=3.6 cm",important:false,mistake:"E=U/d中的d不是BO=4.5 cm，而是B到OC的垂直距离。"},
      {title:"求场强和极板电压",text:"B与OC间电势差为9 V，先求场强，再乘实际极板间距0.30 m。",formula:"E=9/0.036=250 V/m；U板=E×0.30=75 V",important:true,mistake:"最后使用的是30 cm极板间距，不是矩形的6 cm边长。"}
    ],
    mistake:"把线段长度直接代入U=Ed，或忽略d应为沿场方向的投影距离。"
  },
  {
    id:"103q3",
    section:"10.3",
    point:"正六边形中的等势作图",
    dimension:"图像理解",
    difficulty:"基础",
    type:"single",
    prompt:"如图，ABCDEF为匀强电场中正六边形的六个顶点，已知φ<sub>A</sub>=-1 V、φ<sub>B</sub>=1 V、φ<sub>C</sub>=5 V。关于D点电势以及等势线、电场线的作法，下列完整表述正确的是（　　）",
    options:[
      "φ_D=7 V。取AD中点M和BC中点N，二者电势均为3 V，连接MN为等势线；再作MN的垂线，并由C、D所在高电势侧指向A、B所在低电势侧。",
      "φ_D=3 V。连接A、C得到等势线，再沿B、D方向画电场线，箭头由B指向D。",
      "φ_D=-7 V。取AD和BC中点连线为电场线，并在这条线上标出电势不变。",
      "φ_D=7 V。因为A、D是一条对角线，所以AD本身是等势线，电场方向沿BC。"
    ],
    answer:0,
    answerText:"A。φ_D=7 V；AD与BC的中点连线是3 V等势线，电场垂直该线并由高势侧指向低势侧。",
    source:"10.3电势差与电场强度的关系·专题训练，考点2第20题（开放作图题改长文本选择）",
    image:"assets/ch10/103/103q3.png",
    imageAlt:"标有A至F及A、B、C三点电势的正六边形原题图",
    diagram:"equipotential",
    diagramData:{shape:"regular-hexagon",labels:["A -1 V","B 1 V","C 5 V","D 7 V","E","F","M：AD中点 3 V","N：BC中点 3 V","MN：等势线","E：高→低"]},
    steps:[
      {title:"比较平行位移",text:"正六边形中，AD与BC平行，且AD的长度是BC的2倍；匀强电场中同方向位移的电势差与位移成正比。",formula:"φ_D-φ_A=2(φ_C-φ_B)",important:true,mistake:"这里比较的是同方向位移，不是因为两线段处在同一图形中就直接套比例。"},
      {title:"算出D点电势",text:"代入A、B、C三点电势，先算φ_C-φ_B=4 V，再得到φ_D-φ_A=8 V。",formula:"φ_D=-1+8=7 V",important:true,mistake:"注意φ_D-φ_A与φ_C-φ_B方向一致，不能反写角标。"},
      {title:"寻找两个同势点",text:"M是AD中点，N是BC中点。匀强电场中的线性关系给出两点电势都为3 V。",formula:"φ_M=(-1+7)/2=3 V；φ_N=(1+5)/2=3 V",important:false,mistake:"中点电势取端点代数平均，负电势-1 V不能按绝对值参与。"},
      {title:"画等势线",text:"连接同电势的M、N，得到3 V等势线。等势线用虚线或无箭头实线表示，不添加方向箭头。",formula:"φ_M=φ_N ⇒ MN为等势线",important:true,mistake:"等势线没有方向；箭头属于电场线。"},
      {title:"画电场线并定向",text:"过任一点作MN的垂线，再比较两侧顶点电势：C、D一侧电势较高，A、B一侧较低，故E由高势侧指向低势侧。",formula:"E⊥MN，且沿E方向φ降低",important:true,mistake:"只画垂线不画箭头，仍没有完成电场方向判断。"}
    ],
    mistake:"把等势线与电场线混淆，或计算电势差时颠倒位移方向。"
  },
  {
    id:"103q4",
    section:"10.3",
    point:"坐标系中的等势线与场强",
    dimension:"空间关系",
    difficulty:"低中档",
    type:"single",
    prompt:"平面直角坐标系内存在方向平行于坐标平面的匀强电场。O(0,0)处电势为0，A(6 cm,0)处电势为8 V，B(0,√3 cm)处电势为4 V；C为OA中点。关于C点电势和场强大小，下列完整结论正确的是（　　）",
    options:[
      "φ_C=4 V。B、C同势，BC为等势线；O到BC的垂直距离为1.5 cm，所以E≈266.7 V/m，方向由BC的4 V侧指向O的0 V侧。",
      "φ_C=4 V。把OC=3 cm直接作为d代入E=U/d，得E≈133.3 V/m，方向沿x轴负方向。",
      "φ_C=2 V。连接B、C作为电场线，取BC长度计算可得E=200 V/m。",
      "φ_C=8 V。O、B构成等势线，故E垂直OB，大小为400 V/m。"
    ],
    answer:0,
    answerText:"A。φ_C=4 V，E=4/(1.5×10⁻²)≈266.7 V/m。",
    source:"10.3电势差与电场强度的关系·专题训练，考点3第29题（开放题改长文本选择）",
    image:"assets/ch10/103/103q4.png",
    imageAlt:"坐标系中O、A、B三点位置和电势的原题图",
    diagram:"equipotential",
    diagramData:{shape:"coordinate",unit:"cm",labels:["O(0,0) 0 V","A(6,0) 8 V","B(0,√3) 4 V","C(3,0) 4 V","D：垂足","BC：4 V等势线","OD=1.5 cm","E"]},
    steps:[
      {title:"利用OA中点",text:"C是OA中点。匀强电场中沿OA电势线性变化，因此C点电势是O、A电势的平均值。",formula:"φ_C=(φ_O+φ_A)/2=4 V",important:true,mistake:"中点关系来自匀强电场，不能推广到任意非匀强电场。"},
      {title:"确定等势线",text:"B、C两点电势同为4 V，连接BC即可得到一条4 V等势线。",formula:"φ_B=φ_C=4 V",important:true,mistake:"BC是等势线，不是电场线；不能在BC上加场强箭头。"},
      {title:"寻找真正的d",text:"过O作BC的垂线，垂足为D。OD才是O到4 V等势线沿场强方向的距离。",formula:"OD⊥BC",important:true,mistake:"不能把OC=3 cm或OB=√3 cm直接当作U=Ed中的d。"},
      {title:"完成几何计算",text:"直角三角形OBC中，OC=3 cm、OB=√3 cm，可得∠BCO=30°，从而OD=OC·sin30°。",formula:"OD=1.5 cm=1.5×10⁻² m",important:false,mistake:"场强计算前必须把厘米换算成米。"},
      {title:"求场强并定向",text:"BC是4 V等势线，O为0 V；场强由高电势侧指向低电势侧，所以沿D到O方向。",formula:"E=|4-0|/(1.5×10⁻²)≈266.7 V/m",important:true,mistake:"场强方向不是由低电势指向高电势。"}
    ],
    mistake:"把两点直线距离误当作沿场方向的投影距离。"
  },
  {
    id:"103q5",
    section:"10.3",
    point:"由两次做功反推二维场强",
    dimension:"符号规范",
    difficulty:"中等",
    type:"single",
    prompt:"直角三角形ABC处于匀强电场中，∠B=90°，AB=20 cm、BC=40 cm。D在BC上且CD=3BD。q₁=-2.0×10⁻⁹ C从C移到A，静电力做功6.0×10⁻⁸ J；q₂=+2.0×10⁻⁹ C从A移到D，外力克服静电力做功3.0×10⁻⁸ J。关于U<sub>BC</sub>及场强，下列完整结论正确的是（　　）",
    options:[
      "U_BC=60 V；取BC中点P可得φ_P=φ_A，AP为等势线；E=150√2 V/m，方向垂直AP，由B所在高势侧指向AP所在低势侧，即沿∠ABC内角平分线向下。",
      "U_BC=-60 V；AP是电场线；E=150√2 V/m，方向沿AP由A指向P。",
      "U_BC=45 V；把BC=0.40 m直接代入E=U/d，可得E=112.5 V/m，方向沿BC。",
      "U_BC=60 V；E=300 V/m。负电荷所受电场力方向与E相同，因此E指向C到A。"
    ],
    answer:0,
    answerText:"A。U_BC=60 V，E=150√2 V/m；E垂直AP，由B所在高势侧指向AP所在低势侧，即沿∠ABC内角平分线向下。",
    source:"10.3电势差与电场强度的关系·专题训练，考点1第13题（开放题改长文本选择）",
    image:"assets/ch10/103/103q5.png",
    imageAlt:"含D点的直角三角形ABC及两次电荷移动过程的原题图",
    diagram:"equipotential",
    diagramData:{shape:"right-triangle",labels:["A","B","C","D：CD=3BD","P：BC中点","AP：等势线","B到AP垂距10√2 cm","E：垂直AP，由B侧指向AP"]},
    steps:[
      {title:"处理负电荷的第一次功",text:"按U_CA=φ_C-φ_A保留角标。q₁为负，W_CA为正，因此U_CA为负。",formula:"U_CA=W_CA/q₁=-30 V ⇒ φ_A-φ_C=30 V",important:true,mistake:"不要先取q的绝对值；负号正是确定电势高低的关键信息。"},
      {title:"翻译“克服电场力做功”",text:"外力克服静电力做功3.0×10⁻⁸ J，表示静电力本身做功-3.0×10⁻⁸ J。",formula:"U_AD=W_AD/q₂=-15 V ⇒ φ_D-φ_A=15 V",important:true,mistake:"“克服电场力做功”不是静电力做正功，必须先把功的主体分清。"},
      {title:"利用BC上的线性变化",text:"BD=10 cm、DC=30 cm。由前两步得φ_D-φ_C=45 V，这45 V对应C到D的30 cm；再向B延伸10 cm，电势继续增加15 V。",formula:"φ_B-φ_C=45+15=60 V ⇒ U_BC=60 V",important:true,mistake:"U_BC=φ_B-φ_C，不是φ_C-φ_B。"},
      {title:"构造AP等势线",text:"P为BC中点，匀强场中φ_P=(φ_B+φ_C)/2=φ_C+30 V，而φ_A=φ_C+30 V，因此A、P同势。",formula:"φ_A=φ_P ⇒ AP为等势线",important:true,mistake:"AP是等势线，不是带有方向的场强线。"},
      {title:"用垂距求场强",text:"几何上B到AP的垂距为10√2 cm；B比P高30 V，所以E从B所在高势侧垂直AP指向AP所在低势侧，即沿∠ABC内角平分线向下。",formula:"E=30/(0.10√2)=150√2 V/m",important:true,mistake:"负电荷受力与E反向，但E的方向仍由高电势指向低电势。"}
    ],
    mistake:"忽略负电荷或“克服静电力做功”的负号，导致整条电势链反向。"
  },
  {
    id:"103q6",
    section:"10.3",
    point:"做功、电势与等势线",
    dimension:"符号规范",
    difficulty:"低中档",
    type:"single",
    prompt:"匀强电场中有边长1 cm的等边三角形ABC。将q=-6×10⁻⁶ C从A移到B，静电力做功-2.4×10⁻⁵ J；再从B移到C，静电力做功1.2×10⁻⁵ J。规定φ<sub>A</sub>=0。下列说法正确的是（　　）",
    options:["φ_B=4 V。","φ_C=-2 V。","电场强度E与AB垂直。","场强大小E=4 V/m。"],
    answer:1,
    answerText:"B。φ_B=-4 V，φ_C=-2 V；E沿AB方向，大小为400 V/m。",
    source:"10.3电势差与电场强度的关系·专题训练，考点3第24题",
    image:"assets/ch10/103/103q6.png",
    imageAlt:"等边三角形ABC及负电荷从A到B再到C的原题图",
    diagram:"equipotential",
    diagramData:{shape:"equilateral-triangle",sideCm:1,charge:"-6×10⁻⁶ C",labels:["A 0 V","B -4 V","C -2 V","D：AB中点 -2 V","DC：等势线","E∥AB"]},
    steps:[
      {title:"先算U_AB",text:"直接使用带符号的q，U_AB=W_AB/q。负功除以负电荷得到正电势差。",formula:"U_AB=(-2.4×10⁻⁵)/(-6×10⁻⁶)=4 V",important:true,mistake:"不要把q改成绝对值，否则会把φ_B的符号算反。"},
      {title:"由角标还原φ_B",text:"U_AB固定表示φ_A-φ_B。已知φ_A=0，所以φ_B=-4 V。",formula:"4=0-φ_B ⇒ φ_B=-4 V",important:true,mistake:"U_AB不是φ_B-φ_A。"},
      {title:"再求φ_C",text:"B到C的电势差同样由功除以电荷得到，再使用U_BC=φ_B-φ_C。",formula:"U_BC=(1.2×10⁻⁵)/(-6×10⁻⁶)=-2 V ⇒ φ_C=-2 V",important:true,mistake:"第二段不能继续使用U_AB的角标。"},
      {title:"找到等势线",text:"AB中点D的电势是0与-4 V的平均值，即-2 V，与C同势，所以DC为等势线。",formula:"φ_D=-2 V=φ_C ⇒ DC为等势线",important:false,mistake:"等势线DC不带箭头。"},
      {title:"定E方向和大小",text:"等边三角形中DC垂直AB，故E垂直DC、平行AB，并从A的0 V指向B的-4 V。AB正好沿场方向。",formula:"E=|U_AB|/AB=4/0.01=400 V/m",important:true,mistake:"选项D漏掉cm到m的换算，4 V/m相差100倍。"}
    ],
    mistake:"电势差角标、负电荷符号和厘米换米任一处出错，都会造成错误结论。"
  },
  {
    id:"103c1",
    section:"10.3",
    point:"二维场强反演",
    dimension:"符号规范",
    difficulty:"中等",
    type:"single",
    prompt:"【培优挑战】直角三角形ABC中∠B=90°、AB=20 cm、BC=40 cm，D在BC上且CD=3BD。q₁=-2.0×10⁻⁹ C从C到A时静电力做功6.0×10⁻⁸ J；q₂=+2.0×10⁻⁹ C从A到D时外力克服静电力做功3.0×10⁻⁸ J。哪一条推理链完整且正确（　　）",
    options:[
      "先保留q₁负号求φ_A-φ_C=30 V，再把“克服静电力做功”写成W_AD=-3.0×10⁻⁸ J，求φ_D-φ_A=15 V；沿BC线性外推得U_BC=60 V，取BC中点P构造AP等势线，最终E=150√2 V/m。",
      "两次功都取绝对值，得φ_A-φ_C=-30 V、φ_D-φ_A=-15 V；沿BC相加得U_BC=-45 V。",
      "直接将两次功相加后除以q₂，得U_BC=45 V；再用BC=0.40 m计算E=112.5 V/m。",
      "因q₁为负电荷，它受力方向就是场强方向；把CA画成场强线即可得E=300 V/m。"
    ],
    answer:0,
    answerText:"A。U_BC=60 V，E=150√2 V/m；AP是等势线，E垂直AP。",
    source:"10.3电势差与电场强度的关系·专题训练，考点1第13题（培优方法链）",
    image:"assets/ch10/103/103c1.png",
    imageAlt:"二维匀强电场中直角三角形、分点D及两次做功条件的原题图",
    diagram:"equipotential",
    diagramData:{shape:"right-triangle",challenge:true,labels:["q₁<0：C→A","q₂>0：A→D","P：BC中点","AP等势线","d_⊥=10√2 cm","E=150√2 V/m"]},
    steps:[
      {title:"负电荷不取绝对值",text:"第一次功必须把q₁=-2.0×10⁻⁹ C原样代入，才能得到正确电势高低。",formula:"U_CA=W_CA/q₁=-30 V；φ_A-φ_C=30 V",important:true,mistake:"把q₁换成|q₁|会使整条电势顺序倒置。"},
      {title:"分清外力功与静电力功",text:"“外力克服静电力做功”给的是外力正功，静电力功应取相反数。",formula:"W_AD=-3.0×10⁻⁸ J；U_AD=-15 V",important:true,mistake:"若把静电力功写成正值，φ_D与φ_A的关系会反向。"},
      {title:"建立BC电势刻度",text:"CD=30 cm、BD=10 cm；C到D升高45 V，匀强场中每10 cm升高15 V，故C到B共升高60 V。",formula:"U_BC=φ_B-φ_C=60 V",important:true,mistake:"这里的U_BC按B到C的角标定义，不能写成φ_C-φ_B。"},
      {title:"用中点造等势线",text:"BC中点P比C高30 V，恰与A同势，因此AP为等势线。",formula:"φ_P=φ_A",important:false,mistake:"AP只说明电势相同，不表示粒子会沿AP运动。"},
      {title:"用垂距而非斜距",text:"B到AP的垂距是10√2 cm，B到P电势降低30 V；由高到低画出E。",formula:"E=30/(0.10√2)=150√2 V/m",important:true,mistake:"场强箭头不是负电荷的受力箭头；二者方向相反。"}
    ],
    mistake:"本题的核心是连续处理三个符号：负电荷、克服静电力做功、电势差角标。"
  },
  {
    id:"103c2",
    section:"10.3",
    point:"圆周电势—角度图像",
    dimension:"图像理解",
    difficulty:"中等",
    type:"single",
    prompt:"【培优挑战】纸面内存在匀强电场。以O为圆心、R为半径，从x轴正向a点起逆时针将圆周八等分为a至h；圆上电势φ随方位角θ变化的图像显示：θ=π/6时电势最大为φ₁，θ=7π/6时最小为-φ₂（φ₁、φ₂>0）。下列说法正确的是（　　）",
    options:["E=(φ₁-φ₂)/(2R)。","φ_O=(φ₁+φ₂)/2。","U_ae=√3(φ₁+φ₂)/2。","从e到f电势一直降低，从g到h电势一直升高。"],
    answer:2,
    answerText:"C。2ER=φ₁+φ₂，φ_O=(φ₁-φ₂)/2，U_ae=√3(φ₁+φ₂)/2。",
    source:"10.3电势差与电场强度的关系·专题训练，考点2第17题",
    image:"assets/ch10/103/103c2.png",
    imageAlt:"圆周八等分位置图与圆周电势随方位角变化图",
    diagram:"graph",
    diagramData:{axis:"φ-θ",shape:"circle-angle",labels:["a—h","θ=π/6：φmax=φ₁","θ=7π/6：φmin=-φ₂","E方位角210°","U_ae"]},
    steps:[
      {title:"把极值点放回圆上",text:"圆周最高、最低电势点位于同一直径两端，这条直径与E平行；E从最高电势点指向最低电势点。",formula:"θ_E=7π/6=210°",important:true,mistake:"图像横轴是方位角，不是沿直线的位移，不能把曲线斜率直接当作-E。"},
      {title:"利用直径电势差",text:"最高点到最低点沿E方向的投影距离是2R，因此两点电势差为2ER。",formula:"φ₁-(-φ₂)=φ₁+φ₂=2ER",important:true,mistake:"极小值写成-φ₂，电势差应是φ₁+φ₂而不是φ₁-φ₂。"},
      {title:"求圆心电势",text:"O是最高、最低电势点连线的中点，匀强场中电势线性变化，所以取两端电势的代数平均。",formula:"φ_O=[φ₁+(-φ₂)]/2=(φ₁-φ₂)/2",important:true,mistake:"代数平均不是两个正量φ₁、φ₂的算术平均。"},
      {title:"求a到e的投影",text:"a、e是x轴直径两端，ae沿x轴；它与E所在直径夹角30°，沿E投影长度为2Rcos30°。",formula:"U_ae=E·2Rcos30°=√3(φ₁+φ₂)/2",important:true,mistake:"U_ae的符号还要结合a、e相对高低；本题源图方向给出a高于e。"},
      {title:"检验圆弧单调性",text:"圆上电势由位置在E方向上的投影决定，越过投影极值点后单调性会改变；e到f并非全程降低。",formula:"φ(θ)=φ_O-ER cos(θ-θ_E)",important:false,mistake:"不能沿着圆周字母顺序机械判断电势始终升高或降低。"}
    ],
    mistake:"忽略最低电势写作-φ₂，或把φ-θ曲线误当作φ-x直线图像。"
  },
  {
    id:"103c3",
    section:"10.3",
    point:"负电荷做功与等势作图",
    dimension:"符号规范",
    difficulty:"低中档",
    type:"single",
    prompt:"【培优挑战】边长1 cm的等边三角形ABC处在匀强电场中。q=-6×10⁻⁶ C从A到B时静电力做功-2.4×10⁻⁵ J，从B到C时做功1.2×10⁻⁵ J，规定φ_A=0。下列判断正确的是（　　）",
    options:["φ_B=4 V。","φ_C=-2 V。","E与AB垂直。","E=4 V/m。"],
    answer:1,
    answerText:"B。φ_B=-4 V，φ_C=-2 V；AB中点与C同势，E平行AB且大小为400 V/m。",
    source:"10.3电势差与电场强度的关系·专题训练，考点3第24题（培优符号检查）",
    image:"assets/ch10/103/103c3.png",
    imageAlt:"等边三角形内负电荷分两段移动并给出静电力功的原题图",
    diagram:"equipotential",
    diagramData:{shape:"equilateral-triangle",challenge:true,labels:["A 0 V","B -4 V","C -2 V","D：AB中点","DC等势线","E=400 V/m"]},
    steps:[
      {title:"保留q的负号",text:"由W=qU求A、B电势差，负功除以负电荷得到正的U_AB。",formula:"U_AB=4 V",important:true,mistake:"用|q|会导致U_AB=-4 V。"},
      {title:"按角标恢复电势",text:"U_AB=φ_A-φ_B且φ_A=0，所以φ_B=-4 V。",formula:"φ_B=-4 V",important:true,mistake:"不要把U_AB定义写成φ_B-φ_A。"},
      {title:"处理第二段",text:"U_BC=-2 V，再由φ_B-φ_C=-2 V求出C点电势。",formula:"φ_C=-2 V",important:true,mistake:"第二段的初点是B，角标必须换成BC。"},
      {title:"构造等势线",text:"AB中点D的电势为-2 V，与C同势，故DC为等势线。",formula:"φ_D=φ_C=-2 V",important:false,mistake:"DC没有箭头，且不是粒子的轨迹。"},
      {title:"求E并检查数量级",text:"E垂直DC、平行AB，由A指向B；1 cm=0.01 m。",formula:"E=4/0.01=400 V/m",important:true,mistake:"4 V/m是把1 cm误当成1 m造成的。"}
    ],
    mistake:"负号、角标和单位换算是本题三个连续检查点。"
  },
  {
    id:"104q1",
    section:"10.4",
    point:"电容的定义与Q-U图像",
    dimension:"图像理解",
    difficulty:"基础",
    type:"single",
    prompt:"四幅图分别表示给定理想线性电容器在充电过程中，带电量Q、两极板电压U和电容C之间的关系。下列图像正确的是（　　）",
    options:[
      "<img src=\"assets/ch10/104/104q1a.png\" alt=\"选项A：C-Q图像为过原点上升直线\"><span>A．C-Q图像为过原点上升直线。</span>",
      "<img src=\"assets/ch10/104/104q1b.png\" alt=\"选项B：C-U图像随U增大而下降\"><span>B．C-U图像随U增大而下降。</span>",
      "<img src=\"assets/ch10/104/104q1c.png\" alt=\"选项C：Q-U图像为过原点上升直线\"><span>C．Q-U图像为过原点上升直线。</span>",
      "<img src=\"assets/ch10/104/104q1d.png\" alt=\"选项D：Q-C图像为水平直线\"><span>D．Q-C图像为水平直线。</span>"
    ],
    answer:2,
    answerText:"C。对给定电容器，C不随Q、U改变；Q=CU，所以Q-U图像是过原点直线，斜率为C。",
    source:"10.4电容器的电容·专题训练，考点1第1题",
    image:false,
    imageAlt:"四幅Q、U、C关系图的原题组合图",
    diagram:"graph",
    diagramData:{axis:"Q-U / C-U / C-Q",multiGraphs:true,labels:["Q=CU","ΔQ/ΔU=C","C不变","横轴","纵轴"]},
    steps:[
      {title:"先固定研究对象",text:"题目讨论的是同一个给定的理想线性电容器，结构、极板面积、板间距和介质均不改变，所以它的电容C保持不变。",formula:"C=ε₀ε_rS/d=常量",important:true,mistake:"不要由C=Q/U反推“Q变大导致C变大”或“U变大导致C变小”。"},
      {title:"写出Q-U关系",text:"由电容定义式变形可得Q=CU。C为常量时，Q与U成正比。",formula:"Q=CU",important:true,mistake:"定义式可以用于计算比例，但Q、U不是决定电容大小的结构因素。"},
      {title:"读取正确坐标轴",text:"若横轴为U、纵轴为Q，图像应是经过原点的上升直线，其斜率ΔQ/ΔU等于C。",formula:"k_Q-U=ΔQ/ΔU=C",important:true,mistake:"斜率取决于横纵轴；交换坐标后斜率会变成1/C。"},
      {title:"排除A、B",text:"C-Q和C-U图中，C都应是一条水平线，而不是上升直线或下降曲线。",formula:"C(Q)=C(U)=常量",important:false,mistake:"电容器充电时Q、U变化，并不代表C随之变化。"},
      {title:"排除D并选择",text:"若横轴是C、纵轴是Q，给定电容器的C固定，图像应位于固定横坐标处而不是水平线；因此只有C图正确。",formula:"正确选项：C",important:true,mistake:"看图前必须逐一确认横轴、纵轴，不能只看线的形状。"}
    ],
    mistake:"把C=Q/U误读成Q、U决定C，或在图像中看反横纵轴。"
  },
  {
    id:"104q2",
    section:"10.4",
    point:"充放电电流图像与电荷量",
    dimension:"图像理解",
    difficulty:"基础",
    type:"single",
    prompt:"图甲中直流电源电动势E=8 V，实验前电容器不带电。先将开关S接1，充电结束后再接2直至放电完毕；计算机记录的i-t曲线如图乙。下列说法正确的是（　　）",
    options:["i-t图像与时间轴围成的面积表示电容器储存的能量。","充电和完全放电对应的阴影面积S₁、S₂大小一定不相等。","由初始电流大小可知R₁>R₂。","若充电区面积S₁=1203 mA·s，则电容约为0.15 F。"],
    answer:3,
    answerText:"D。i-t面积表示转移电荷量；1203 mA·s=1.203 C，所以C=Q/U≈0.150 F。",
    source:"10.4电容器的电容·专题训练，考点1第3题",
    image:"assets/ch10/104/104q2.png",
    imageAlt:"开关控制的电容器充放电电路及正负i-t曲线原题图",
    diagram:"graph",
    diagramData:{axis:"i-t",circuit:true,labels:["S接1：充电","S接2：放电","S₁=+Q","S₂=-Q","R₁","R₂","E=8 V"]},
    steps:[
      {title:"给面积正确含义",text:"电流是电荷量随时间的变化率，因此i-t图像的带符号面积表示通过导线截面的电荷量，不是能量。",formula:"ΔQ=∫i dt",important:true,mistake:"i-t面积单位是A·s=C；若是能量，单位应为J。"},
      {title:"比较充、放电面积",text:"理想情况下从不带电充到Q，再从Q完全放到0，转移电荷量的大小相同；电流方向相反，所以两块面积符号相反。",formula:"S₁=+Q，S₂=-Q，|S₁|=|S₂|",important:true,mistake:"“正负不同”不等于“面积大小不同”。"},
      {title:"由初始电流判断电阻",text:"刚开始充、放电时，电流大小由相应回路电压和电阻决定；源图中充电初始电流更大，因此充电支路电阻更小。",formula:"I₀=U/R ⇒ R₁<R₂",important:false,mistake:"比较的是同一图给出的初始电流，不能只凭曲线持续时间猜电阻。"},
      {title:"先做单位换算",text:"毫安乘秒要先换为库仑：1 mA·s=10⁻³ C。",formula:"1203 mA·s=1.203 A·s=1.203 C",important:true,mistake:"不能把1203 mA·s直接当成1203 C。"},
      {title:"由Q=CU求电容",text:"充电结束时电容器电压等于理想电源电压8 V，因此用总电荷量除以电压。",formula:"C=Q/U=1.203/8≈0.150 F",important:true,mistake:"面积已经给出Q，不要再乘一次电压。"}
    ],
    mistake:"混淆i-t面积的物理意义，或漏掉mA·s到C的换算。"
  },
  {
    id:"104q3",
    section:"10.4",
    point:"电容式键盘的恒压动态",
    dimension:"电容动态分析",
    difficulty:"基础",
    type:"single",
    prompt:"计算机电容式键盘的每个键由活动金属片和固定金属片构成平行板电容器，且始终与题图所示电源及检测电路相连。按下按键时两片间距d减小。下列说法正确的是（　　）",
    options:["电容器的电容减小。","电容器所带电荷量减小。","按题图规定电流方向，充电电流由a流向b。","两极板间电场强度增大。"],
    answer:3,
    answerText:"D。按下时d减小；连接电源使U不变，因此C↑、Q↑、E=U/d↑，源图规定电流方向为b→a。",
    source:"10.4电容器的电容·专题训练，考点2第8题",
    image:"assets/ch10/104/104q3.png",
    imageAlt:"电容式键盘活动片、固定片和电源检测电路原题图",
    diagram:"capacitor",
    diagramData:{mode:"voltage",device:"keyboard",labels:["活动金属片","固定金属片","d↓","U不变","C↑","Q↑","E↑","规定电流b→a","电子方向相反"]},
    steps:[
      {title:"先判断是否连接电源",text:"按键过程中电容器仍与理想电源相连，所以两极板间电压U保持不变。",formula:"U=常量",important:true,mistake:"不能见到极板移动就默认Q不变；只有断开电源且无泄漏时才近似Q不变。"},
      {title:"由结构判断C",text:"活动片下移使板间距d减小，正对面积和介质不变，因此电容增大。",formula:"C=ε₀ε_rS/d ⇒ d↓，C↑",important:true,mistake:"C与d成反比，不是正比。"},
      {title:"沿因果链判断Q",text:"U不变而C增大，由Q=CU可知极板电荷量增加，电源在短时间内继续给电容器充电。",formula:"Q=CU ⇒ Q↑",important:false,mistake:"极板靠近不意味着电荷自动减少；先看电源是否连接。"},
      {title:"按源图核对电流方向",text:"依据题图电源正负极与a、b位置，规定电流沿b→a；电子运动方向与规定电流相反。",formula:"I：b→a",important:false,mistake:"规定电流方向与电子定向移动方向相反，不能混为一条箭头。"},
      {title:"计算场强趋势",text:"在忽略边缘效应的匀强场模型中，U固定而d减小，因此场强增大。",formula:"E=U/d ⇒ E↑",important:true,mistake:"不要把断电恒荷时E近似不变的结论搬到本题。"}
    ],
    mistake:"没有先判断“接电源还是断电”，导致C、Q、U、E的因果链全部混乱。"
  },
  {
    id:"104q4",
    section:"10.4",
    point:"平行板电容器的决定因素",
    dimension:"电容动态分析",
    difficulty:"基础",
    type:"multiple",
    prompt:"图示装置用于探究影响平行板电容器电容的因素。左极板和静电计外壳接地，右极板与静电计金属球相连；电容器充电后与电源断开。决定理想平行板电容器电容大小的因素有（　　）",
    options:["两极板的正对面积S。","两板间距离d。","两板间介质的相对介电常数ε<sub>r</sub>。","极板由铜制成还是铝制成。"],
    answer:[0,1,2],
    answerText:"A、B、C。C=ε₀ε_rS/d；在理想导体模型中，极板材料不进入决定式。",
    source:"10.4电容器的电容·专题训练，考点3第18题",
    image:"assets/ch10/104/104q4.png",
    imageAlt:"平行板电容器与静电计组成的控制变量实验原题图",
    diagram:"capacitor",
    diagramData:{mode:"charge",experiment:"control-variable",labels:["S","d","ε_r","Q≈不变","静电计读U","一次只改一个变量"]},
    steps:[
      {title:"写清理想模型",text:"在两块足够大的平行导体板、忽略边缘效应的近似下，电容由几何结构和介质决定。",formula:"C=ε₀ε_rS/d",important:true,mistake:"公式的适用前提是理想平行板模型，不能不加条件推广到所有形状电容器。"},
      {title:"判断面积S",text:"正对面积越大，同一电压下能够分离并储存的异号电荷越多，所以C增大。",formula:"C∝S",important:false,mistake:"使用的是正对面积，不是单块极板的总面积。"},
      {title:"判断距离d",text:"其他条件不变时，板间距越大，电容越小。",formula:"C∝1/d",important:true,mistake:"不要把E=U/d中的关系与C随d变化的关系混为一谈。"},
      {title:"判断介质与材料",text:"插入相对介电常数更大的绝缘介质会使C增大；理想导体的具体金属种类不出现在决定式中。",formula:"C∝ε_r；与理想极板材料无关",important:true,mistake:"介质材料与极板材料是两个不同概念。"},
      {title:"解释断开电源的作用",text:"断开电源使实验过程中极板自由电荷量近似不变，借静电计观察U的变化来反推C；这不表示Q决定C。",formula:"Q≈常量，U=Q/C",important:false,mistake:"实验条件“Q不变”是测量方法，不是电容的决定因素。"}
    ],
    mistake:"把电荷量Q、电压U或极板金属材料误认为电容的结构决定因素。"
  },
  {
    id:"104q5",
    section:"10.4",
    point:"接电源与断电后的动态比较",
    dimension:"电容动态分析",
    difficulty:"低中档",
    type:"single",
    prompt:"A、B为平行板电容器两极板，闭合开关S后静电计G指针张开一定角度；忽略静电计引起的电荷量变化。下列说法正确的是（　　）",
    options:["S闭合时减小板距，板间场强减小。","S闭合时增大板距，电容器带电荷量增加。","断开S后增大板距，静电计张角减小。","断开S后，紧贴一侧极板插入厚度为t的金属板，静电计张角减小。"],
    answer:3,
    answerText:"D。断开后Q不变；金属板内E=0，使有效场区距离变为d-t，C增大、U减小，静电计张角减小。",
    source:"10.4电容器的电容·专题训练，考点4第22题",
    image:"assets/ch10/104/104q5.png",
    imageAlt:"平行板电容器、开关、静电计及插入金属板操作的原题图",
    diagram:"capacitor",
    diagramData:{mode:"charge",switchStates:true,metalPlate:true,labels:["S闭合：U不变","S断开：Q不变","d","t","d_eff=d-t","金属内E=0","静电计张角随U"]},
    steps:[
      {title:"把两种状态分开",text:"S闭合时电容器接理想电源，U不变；S断开且忽略漏电时，极板自由电荷量Q近似不变。",formula:"闭合：U定；断开：Q定",important:true,mistake:"同一道题中不能从头到尾只用一个“不变量”。"},
      {title:"检查闭合状态的A项",text:"U不变，减小d时场强E=U/d增大，所以A错误。",formula:"d↓，E↑",important:false,mistake:"断电恒荷情况下E近似不变，不适用于S闭合。"},
      {title:"检查闭合状态的B项",text:"U不变，增大d使C减小，于是Q=CU减小，所以B错误。",formula:"d↑ ⇒ C↓ ⇒ Q↓",important:false,mistake:"电源连接时电荷可以流回电源，Q不守恒。"},
      {title:"检查断开状态的C项",text:"Q不变，增大d使C减小，因此U=Q/C增大；静电计张角随电压增大而增大。",formula:"d↑ ⇒ C↓ ⇒ U↑ ⇒ 张角↑",important:true,mistake:"静电计测的是电势差，不是直接测电容大小。"},
      {title:"分析插入金属板",text:"金属板内部静电平衡时E=0，真正有电势降落的有效距离变为d-t；等效电容增大，Q不变时U减小。",formula:"d_eff=d-t；C↑；U=Q/C↓",important:true,mistake:"紧贴一极板插入金属板不是增加介质厚度；关键是金属内电势不降落。"}
    ],
    mistake:"未按开关状态先确定U或Q不变，导致动态判断次序错误。"
  },
  {
    id:"104q6",
    section:"10.4",
    point:"RC放电时间与i-t面积",
    dimension:"图像理解",
    difficulty:"中等",
    type:"single",
    prompt:"开关先接1给电容器C充电，充电结束后接2经电阻R放电，放电电流随时间变化的i-t曲线如图。放电过程中，下列说法正确的是（　　）",
    options:["电容器两极板电压逐渐增加。","把R换成更小阻值，放电所需时间变短。","R更小时，完整放电i-t曲线与时间轴围成的面积变小。","若图中阴影约40个小格，每小格为0.2 mA×0.4 s，则释放电荷量约为3.2 C。"],
    answer:1,
    answerText:"B。R减小时放电更快；完整放电的i-t面积仍为初始电荷量Q₀。40格对应3.2×10⁻³ C，不是3.2 C。",
    source:"10.4电容器的电容·专题训练，考点7第39题（按正确RC物理关系校正）",
    image:"assets/ch10/104/104q6.png",
    imageAlt:"电容器经电阻放电的开关电路与i-t衰减曲线原题图",
    diagram:"graph",
    diagramData:{axis:"i-t",rc:true,labels:["I₀","τ=RC（拓展）","面积=Q₀","R小：高而窄","R大：低而宽","0.2 mA×0.4 s"]},
    steps:[
      {title:"先判断基本变化",text:"放电时极板电荷逐渐减少，电压U=Q/C也随之降低，电流则从初值逐渐衰减到0。",formula:"Q↓，U↓，|i|↓",important:true,mistake:"“放电”意味着电势差消失，不会使电压逐渐增加。"},
      {title:"比较不同电阻的快慢",text:"相同初始电压下，R更小使初始电流更大，电荷转移更快；拓展表达中时间尺度τ=RC也随R减小而减小。",formula:"I₀=U₀/R；τ=RC",important:true,mistake:"源资料中若出现“放电时间与R无关”，应按正确RC关系校正。"},
      {title:"比较完整面积",text:"只要都是从同一初始电荷Q₀完全放到0，曲线形状虽不同，带符号面积的绝对值均为Q₀。",formula:"|∫i dt|=Q₀",important:true,mistake:"R小会使曲线更高、更窄，并不改变总转移电荷量。"},
      {title:"计算每一小格",text:"每格面积为0.2 mA×0.4 s，先将mA换成A。",formula:"0.2×10⁻³×0.4=8×10⁻⁵ C",important:false,mistake:"毫安漏乘10⁻³会造成1000倍误差。"},
      {title:"累计并判断选项",text:"40格对应40×8×10⁻⁵ C=3.2×10⁻³ C，远不是3.2 C；因此只有B正确。",formula:"Q≈3.2 mC=3.2×10⁻³ C",important:true,mistake:"3.2 mC与3.2 C相差1000倍。"}
    ],
    mistake:"把放电快慢与总放电量混为一谈，或漏掉mA到A的单位换算。"
  },
  {
    id:"104c1",
    section:"10.4",
    point:"断电后改变板距的场强",
    dimension:"电容动态分析",
    difficulty:"低中档",
    type:"single",
    prompt:"【培优挑战】水平平行板电容器的上极板M固定，下极板N放在绝缘温敏材料上。电容器充电后与电源断开，N板带正电；带电微粒原来静止在两板间P点。温度升高、温敏材料热胀时，下列说法正确的是（　　）",
    options:["N板下移，板间距增大。","电容器电容减小。","两极板间场强减小。","在理想大平行板、无漏电近似下，微粒仍保持静止。"],
    answer:3,
    answerText:"D。热胀使N上移、d减小、C增大；断电后Q不变，E=Q/(ε₀S)不随d改变，因此qE与mg仍平衡。",
    source:"10.4电容器的电容·专题训练，考点3第15题",
    image:"assets/ch10/104/104c1.png",
    imageAlt:"下极板置于温敏材料且板间有静止带电微粒的原题图",
    diagram:"capacitor",
    diagramData:{mode:"charge",thermal:true,particle:true,labels:["M固定","N带正电并上移","d↓","Q不变","E不变","qE↑方向","mg↓方向"]},
    steps:[
      {title:"先看机械变化",text:"温敏材料受热膨胀，托着下极板N向上移动，所以两板间距d减小。",formula:"d↓",important:false,mistake:"热胀发生在N板下方，方向是把N板向上顶，不是向下拉。"},
      {title:"判断电容变化",text:"正对面积和介质不变，板间距减小使平行板电容增大。",formula:"C=ε₀S/d ⇒ C↑",important:true,mistake:"C与d成反比。"},
      {title:"锁定断电不变量",text:"电容器已经与电源断开，并假设无漏电，所以极板自由电荷量Q近似不变。",formula:"Q=常量",important:true,mistake:"断电后不再保持U不变。"},
      {title:"化简场强关系",text:"由U=Q/C和C=ε₀S/d可得U=Qd/(ε₀S)，再除以d，场强与d约去。",formula:"E=U/d=Q/(ε₀S)=常量",important:true,mistake:"只看到E=U/d就断言d减小、E增大，漏掉了U也随d减小。"},
      {title:"回到受力平衡",text:"微粒原来满足电场力与重力等大反向；E不变、q和m不变，两力仍不变，因此仍静止。",formula:"|q|E=mg",important:true,mistake:"受力图只画实际力qE、mg，不把E或速度单独画成力。"}
    ],
    mistake:"断电恒荷时应沿Q不变→C→U→E分析，不能直接套接电源时的E=U/d趋势。"
  },
  {
    id:"104c2",
    section:"10.4",
    point:"接地极板移动与空间电势",
    dimension:"空间关系",
    difficulty:"中等",
    type:"single",
    prompt:"【培优挑战】水平平行板电容器下板b接地，P为两板间固定点且初始距两板相等。开关S闭合时带电油滴在P静止；断开S后，将b板缓慢向上移动一小段且未越过P。下列说法正确的是（　　）",
    options:["油滴将向下运动。","油滴将向上运动。","P点电势降低。","P点电势升高。"],
    answer:2,
    answerText:"C。断开后隔离极板电荷不变，理想场强不变，油滴仍静止；b接地保持0 V，P到b的距离减小，所以φ_P降低。",
    source:"10.4电容器的电容·专题训练，考点5第29题",
    image:"assets/ch10/104/104c2.png",
    imageAlt:"下极板b接地、P点有静止油滴并将b板上移的原题图",
    diagram:"capacitor",
    diagramData:{mode:"charge",groundedLower:true,particle:true,labels:["上板a","下板b：φ_b=0","P固定","b上移","P到b距离h↓","E不变","φ_P=Eh↓","qE与mg"]},
    steps:[
      {title:"区分电路与接地作用",text:"断开S后，上板与电源隔离，其自由电荷量保持；下板b接地则把b点电势固定为0。",formula:"Q_隔离板≈常量；φ_b=0",important:true,mistake:"“接地”固定的是电势，不等于电场中所有点电势都为0。"},
      {title:"判断板距和电容",text:"b板上移使两板间距减小，平行板电容增大，总板间电压相应减小。",formula:"d↓ ⇒ C↑ ⇒ U=Q/C↓",important:false,mistake:"断开S后不能继续使用U不变。"},
      {title:"判断板间场强",text:"在理想大平行板且忽略边缘效应的近似下，隔离板电荷量和面积不变，场强E不随板距改变。",formula:"E=Q/(ε₀S)=常量",important:true,mistake:"U减小并不代表E一定减小，因为d也同时减小。"},
      {title:"判断油滴运动",text:"油滴原来在P静止，说明qE和mg等大反向；E不变使两力仍平衡，所以油滴不会向上或向下运动。",formula:"ΣF=0",important:false,mistake:"点P的电势变化不会直接决定瞬时受力；受力由E决定。"},
      {title:"用接地板作零势面",text:"b板始终为0 V，P到b的距离h变小；场强方向由上板指向b时，P相对b的电势为Eh，因此φ_P降低。",formula:"φ_P-φ_b=Eh；h↓ ⇒ φ_P↓",important:true,mistake:"这里比较的是固定空间点P到接地板的新距离，不是整个板间电压直接等同φ_P。"}
    ],
    mistake:"把“场强不变”和“电势不变”混为一谈；场强不变时，参考零势面移动仍会改变固定点电势。"
  },
  {
    id:"104c3",
    section:"10.4",
    point:"RC放电曲线的时间尺度",
    dimension:"图像理解",
    difficulty:"中等",
    type:"single",
    prompt:"【培优挑战】电容器先经开关接1充电，再接2通过电阻R完全放电，i-t曲线如图。关于改变R及曲线面积，下列说法正确的是（　　）",
    options:["放电过程中电容器电压逐渐增加。","R减小时，放电电流衰减得更快，放电时间尺度变短。","R减小时，完整放电曲线的面积绝对值也按比例减小。","图中每格0.2 mA×0.4 s，40格对应3.2 C。"],
    answer:1,
    answerText:"B。τ=RC，R减小使放电更快；但完整面积|∫i dt|=Q₀不变，40格是3.2×10⁻³ C。",
    source:"10.4电容器的电容·专题训练，考点7第39题（培优图像比较；源结论已校正）",
    image:"assets/ch10/104/104c3.png",
    imageAlt:"RC放电电路及指数衰减电流曲线原题图",
    diagram:"graph",
    diagramData:{axis:"i-t",rc:true,challenge:true,labels:["R小：曲线高而窄","R大：曲线低而宽","τ=RC","两曲线面积均为Q₀","40格=3.2 mC"]},
    steps:[
      {title:"建立放电方向",text:"放电使Q、U和电流绝对值都逐渐减小；曲线在坐标轴上方或下方只取决于规定的电流正方向。",formula:"Q↓，U=Q/C↓",important:false,mistake:"不能从曲线位于负半轴就说电荷量为负；那只是电流方向约定。"},
      {title:"比较初始电流",text:"相同初始电压U₀下，R越小，放电初始电流越大。",formula:"I₀=U₀/R",important:true,mistake:"R小并不意味着全过程每一时刻都按同一比例增加，因为电压也在衰减。"},
      {title:"比较时间尺度",text:"拓展模型中i=I₀e^{-t/(RC)}，时间常数τ=RC；R减小，曲线衰减得更快。",formula:"τ=RC",important:true,mistake:"“总电荷量不变”不等于“放电时间与R无关”。"},
      {title:"比较完整曲线面积",text:"两次实验若初始Q₀相同且最终都完全放电，i-t面积绝对值都等于Q₀；R小的曲线更高但更窄。",formula:"|∫₀^∞i dt|=Q₀",important:true,mistake:"不能只看曲线宽度就判断面积变小。"},
      {title:"核对网格单位",text:"每格为8×10⁻⁵ C，40格为3.2×10⁻³ C=3.2 mC。",formula:"40×0.2×10⁻³×0.4=3.2×10⁻³ C",important:true,mistake:"mA必须乘10⁻³；3.2 mC不是3.2 C。"}
    ],
    mistake:"正确区分“放电更快”和“总转移电荷量不变”。"
  }
  ]);

  add([
    {
      id:"105q1",section:"10.5",point:"平行板中两粒子的分运动",dimension:"运动建模",difficulty:"低中档",type:"single",
      prompt:"长度均为 <i>L</i> 的两平行金属板水平放置，板间距 <i>d=L/2</i>，上板带正电、下板带负电，板间电压为 <i>U</i>。质量为 <i>m</i>、电荷量为 <i>+q</i> 的相同粒子1、2同时进入电场：粒子1由左侧正中央以平行极板的速度 <i>v</i><sub>1</sub> 射入；粒子2由上极板正中央以垂直极板向下的速度 <i>v</i><sub>2</sub> 射入；二者同时到达下极板正中央 <i>O</i>。忽略重力和粒子间相互作用。下列说法正确的是（　　）",
      options:["粒子1到达 <i>O</i> 时速率为 √(<i>qU/m</i>)。","粒子2入射速率 <i>v</i><sub>2</sub>=½√(<i>qU/m</i>)。","若把粒子1入射速度改为 2<i>v</i><sub>1</sub>，两粒子将在 <i>O</i> 上方相遇。","若把粒子1入射速度改为 2<i>v</i><sub>1</sub>，两粒子仍可同时到达 <i>O</i>。"],
      answer:1,source:"10.5专题训练·考点1第1题",imageAlt:"两粒子从平行板不同位置同时进入并到达O点的原题图",diagram:"particle",diagramData:{mode:"two-particles",labels:["+板","-板","粒子1","粒子2","O","L","d=L/2","v₁","v₂","E","qE"]},
      steps:[
        step("统一受力与加速度","板间电场由正极板指向负极板，两粒子均带正电，所受电场力和加速度都竖直向下。由 d=L/2 得 E=U/d=2U/L，因而 a=qE/m=2qU/(mL)。这一步先把两条运动共用的物理量确定下来。","E=2U/L；a=2qU/(mL)",true),
        step("用粒子1确定共同时间","粒子1的水平分运动为匀速，水平位移为 L/2，所以 L/2=v₁t；竖直方向初速度为零，从中心线到下板的位移为 L/4，故 L/4=½at²。由第二式得 t=(L/2)√(m/(qU))，再与水平式对应。","L/2=v₁t；L/4=½at²"),
        step("代入粒子2的竖直运动","粒子2从上板中央运动到下板中央，竖直位移为 L/2，并且初速度 v₂ 与加速度同向。写 L/2=v₂t+½at²；粒子1已经给出 ½at²=L/4，所以 v₂t=L/4，代入共同时间得到 v₂=½√(qU/m)，故B正确。","v₂=½√(qU/m)",true),
        step("核对粒子1的合速度","粒子1到O时水平速度仍为 v₁，而竖直速度为 at。由前述关系可得 v₁²=qU/m、(at)²=qU/m，合速度平方为二者平方和，所以速率是 √(2qU/m)，A漏掉了竖直分量。","v_O=√(v₁²+a²t²)=√(2qU/m)"),
        step("检验速度加倍后的相遇说法","若只把粒子1的水平初速度改为2v₁，它到达O正上方所需时间减半；此时两粒子的竖直位移必须分别按各自初速度重新计算。两者既不在同一点相遇，也不会仍在原时刻同时到O，因此C、D均错误。","t₁'=t/2；分别比较 y₁(t/2)、y₂(t/2)",true)
      ],
      mistake:"把曲线运动的末速度只当成竖直速度，或在改变 v₁ 后仍沿用原来的共同时间而不重新比较两粒子的位移。"
    },
    {
      id:"105q2",section:"10.5",point:"电容器中电子的直线加速",dimension:"能量模型",difficulty:"基础",type:"single",
      prompt:"真空中有一个平行板电容器，电容 <i>C</i>=1.5×10<sup>-10</sup> F，两极板间距 <i>d</i>=1.0 cm，两板间电压 <i>U</i>=9.0 V。电子由静止从负极板附近向正极板运动。已知电子电荷量大小 <i>e</i>=1.6×10<sup>-19</sup> C、质量 <i>m</i>=9.0×10<sup>-31</sup> kg，不计重力。下列哪组结果依次正确给出电容器带电量、板间场强、电子加速度大小和到达正极板时的动能？",
      options:["1.35×10<sup>-9</sup> C；900 V/m；1.6×10<sup>14</sup> m/s²；1.44×10<sup>-18</sup> J。","1.35×10<sup>-9</sup> C；9.0 V/m；1.6×10<sup>12</sup> m/s²；1.44×10<sup>-20</sup> J。","1.67×10<sup>-11</sup> C；900 V/m；1.6×10<sup>14</sup> m/s²；8.0×10<sup>-19</sup> J。","1.35×10<sup>-9</sup> C；900 V/m；1.6×10<sup>-14</sup> m/s²；1.44×10<sup>18</sup> J。"],
      answer:0,source:"10.5专题训练·考点1第4题（计算题改长文本选择）",image:"assets/ch10/105/105q2.svg",imageAlt:"平行板电容器的正负极板、电场和电子受力运动示意",diagram:"particle",diagramData:{mode:"acceleration",charge:"electron",labels:["负极板","正极板","E","Fₑ","v","U=9.0V","d=1.0cm"]},
      steps:[
        step("先求电容器的带电量","电容器的电容和板间电压已知，直接用 Q=CU。代入后 Q=(1.5×10⁻¹⁰)×9.0=1.35×10⁻⁹ C。这里的Q表示任一极板所带电量的绝对值。","Q=CU=1.35×10⁻⁹ C"),
        step("完成长度单位换算再求场强","板间距1.0 cm必须先写成1.0×10⁻² m。平行板内忽略边缘效应，E=U/d=9.0/(1.0×10⁻²)=900 V/m。","d=1.0×10⁻² m；E=U/d=900 V/m",true),
        step("只取电子受力和加速度的大小","电子带负电，所以受力方向与E相反、指向正极板；求大小时 F=eE。由 a=F/m 得 a=(1.6×10⁻¹⁹×900)/(9.0×10⁻³¹)=1.6×10¹⁴ m/s²。","a=eE/m=1.6×10¹⁴ m/s²"),
        step("用能量法求末动能","电子从静止跨越电势差大小U，电场力做正功 eU；由动能定理 Eₖ=eU=(1.6×10⁻¹⁹)×9.0=1.44×10⁻¹⁸ J。无需先算速度。","Eₖ=eU=1.44×10⁻¹⁸ J",true),
        step("用量纲和数量级反查","Q应为C，E可写V/m或N/C，a应为m/s²，动能应为J；四个结果的单位、指数均与A项一致。其他选项分别混淆了cm到m、C=Q/U以及正负指数。","Q、E、a、Eₖ 的单位逐项核对")
      ],
      mistake:"把1 cm直接当成1 m，或因电子带负电就把加速度“大小”写成负数；方向要用箭头说明，大小保持非负。"
    },
    {
      id:"105q3",section:"10.5",point:"先加速后偏转的临界打屏",dimension:"运动建模",difficulty:"低中档",type:"single",
      prompt:"偏转电场两平行金属板长为 <i>L</i>，板间距为 <i>d</i>。距极板右端 <i>L/2</i> 处有一块水平放置、长度为 <i>L/2</i> 的荧光屏，屏到极板中心线 <i>OO′</i> 的距离为 <i>d</i>。加速电压 <i>U</i><sub>1</sub> 可调，偏转电压 <i>U</i><sub>2</sub> 恒定。电子从静止经 <i>U</i><sub>1</sub> 加速后沿中心线进入偏转场，不计重力。下列哪组结论依次正确给出入射速率、离开极板时的偏移量以及能打到屏上的 <i>U</i><sub>1</sub> 范围？",
      options:["<i>v</i>=√(2<i>eU</i><sub>1</sub>/<i>m</i>)；<i>y</i>=<i>U</i><sub>2</sub><i>L</i>²/(4<i>U</i><sub>1</sub><i>d</i>)；<i>U</i><sub>2</sub><i>L</i>²/(2<i>d</i>²)≤<i>U</i><sub>1</sub>≤3<i>U</i><sub>2</sub><i>L</i>²/(4<i>d</i>²)。","<i>v</i>=√(<i>eU</i><sub>1</sub>/<i>m</i>)；<i>y</i>=<i>U</i><sub>2</sub><i>L</i>²/(2<i>U</i><sub>1</sub><i>d</i>)；3<i>U</i><sub>2</sub><i>L</i>²/(4<i>d</i>²)≤<i>U</i><sub>1</sub>≤<i>U</i><sub>2</sub><i>L</i>²/(2<i>d</i>²)。","<i>v</i>=√(2<i>eU</i><sub>1</sub>/<i>m</i>)；<i>y</i>=<i>U</i><sub>2</sub><i>L</i>/(4<i>U</i><sub>1</sub><i>d</i>)；0≤<i>U</i><sub>1</sub>≤<i>U</i><sub>2</sub><i>L</i>/<i>d</i>。","<i>v</i>=2<i>eU</i><sub>1</sub>/<i>m</i>；<i>y</i>=<i>eU</i><sub>2</sub><i>L</i>²/(4<i>mU</i><sub>1</sub><i>d</i>)；<i>U</i><sub>1</sub>≥3<i>U</i><sub>2</sub><i>L</i>²/(4<i>d</i>²)。"],
      answer:0,source:"10.5专题训练·考点1第5题（计算题改长文本选择）",imageAlt:"电子先加速后进入偏转板并打到下方荧光屏的原题图",diagram:"particle",diagramData:{mode:"screen-range",labels:["U₁","U₂","L","L/2","d","O","O′","y=d/2","y=d/3"]},
      steps:[
        step("加速阶段只做能量账","电子由静止跨越加速电压U₁，电场力做功eU₁全部转化为动能，故 eU₁=½mv²，入射速率 v=√(2eU₁/m)。这里U₁按加速电压的正值处理。","eU₁=½mv²；v=√(2eU₁/m)",true),
        step("板内按类平抛分解","水平方向没有电场力，t=L/v；竖直方向加速度大小a=eU₂/(md)。所以出口侧移 y=½at²。代入v²后，e、m消去，得到 y=U₂L²/(4U₁d)。","t=L/v；a=eU₂/(md)；y=U₂L²/(4U₁d)"),
        step("补出离场后的直线运动","离开极板后电子不再受电场力，沿出口速度方向做匀速直线运动。由类平抛几何，出口速度反向延长线通过板长的水平中点；这条性质把屏端点条件转化为出口侧移条件。","tanθ=v_y/v_x=2y/L",true),
        step("分别建立两个边界","电子恰打到屏幕左端时，几何关系给出口侧移 y=d/2；恰打到屏幕右端时，出口侧移 y=d/3。将这两个边界分别代入 y=U₂L²/(4U₁d)，得到U₁的下界和上界。","U₁,min=U₂L²/(2d²)；U₁,max=3U₂L²/(4d²)"),
        step("检查不等号方向","U₁越大，入射速度越大、在偏转场停留越短，偏移越小。因此打到更远的屏右端对应更大的U₁；最终写成闭区间，端点表示恰好打中屏的两端。","U₂L²/(2d²)≤U₁≤3U₂L²/(4d²)",true)
      ],
      mistake:"只画板内抛物线、不延长出口切线，或把“屏左端/右端”与 y=d/2、d/3 的对应关系颠倒。"
    },
    {
      id:"105q4",section:"10.5",point:"多级直线加速器",dimension:"运动建模",difficulty:"低中档",type:"single",
      prompt:"多个横截面相同的金属圆筒同轴排列，奇、偶数圆筒分别接交变电源两极。<i>t</i>=0时奇数筒相对偶数筒电势差为正，位于0号金属圆板中央的电子由静止开始加速。通过设计筒长，使电子经过任意两筒之间的缝隙时都被加速。电子质量为 <i>m</i>、电荷量大小为 <i>e</i>，电压绝对值为 <i>U</i>，周期为 <i>T</i>，忽略通过缝隙的时间。下列说法正确的是（　　）",
      options:["电子在金属圆筒内部也始终处于加速状态。","电子在每个金属圆筒中的运动时间均为 <i>T</i>。","电子出第 <i>n</i> 个圆筒瞬间的速率为 √(2<i>neUm</i>)。","第 <i>n</i> 个圆筒长度为 <i>T</i>√(2<i>neUm</i>)/(2<i>m</i>)，等价写成 (<i>T</i>/2)√(2<i>neU/m</i>)。"],
      answer:3,source:"10.5专题训练·考点2第6题（源时间表述已校正）",imageAlt:"多个漂移管连接交变电源的直线加速器原题图",diagram:"particle",diagramData:{mode:"drift-tube",labels:["0","1","2","3","缝隙","E","vₙ","T/2","U(t)"]},
      steps:[
        step("区分加速区与漂移区","金属圆筒在静电平衡近似下屏蔽外电场，筒内E≈0，电子在筒内做匀速直线运动；真正的加速发生在相邻圆筒之间的狭缝，A错误。","筒内E≈0；缝隙中qE≠0",true),
        step("确定同步时间","电子在一个圆筒内飞行期间，交变电压要恰好完成一次极性反转，使电子到达下一缝隙时仍受向前的力。因此忽略缝隙时间时，每根漂移管内的飞行时间是半周期T/2，而不是T，B错误。","t_筒=T/2"),
        step("由累计做功求第n级速度","每跨过一个缝隙，电子动能增加eU；经过n次加速后，neU=½mvₙ²，所以vₙ=√(2neU/m)。C把质量m乘进根号，量纲不是速度。","vₙ=√(2neU/m)",true),
        step("用匀速距离设计筒长","电子在第n筒内以vₙ近似匀速运动T/2，所以Lₙ=vₙT/2=(T/2)√(2neU/m)。将根号外的1/m移入也可写成题中D的形式。","Lₙ=(T/2)√(2neU/m)=T√(2neUm)/(2m)",true),
        step("检查增长规律","随n增加，vₙ∝√n、Lₙ∝√n，后面的漂移管应逐渐变长；若图或计算给出等长筒，就不能在固定频率下保持同步加速。","vₙ∝√n；Lₙ∝√n")
      ],
      mistake:"把“相等的半周期”误说成电子在各加速缝隙中的时间相等；同步设计控制的是漂移管内的飞行时间。"
    },
    {
      id:"105q5",section:"10.5",point:"示波管偏转板中的分运动",dimension:"运动建模",difficulty:"基础",type:"single",
      prompt:"示波管由电子枪、两对互相垂直的偏转电极和荧光屏组成。电子初速度视为零，经加速电压加速后进入偏转电场；两对偏转电极均不加电压时，电子打在屏幕中心。不计重力和电子间相互作用。下列说法正确的是（　　）",
      options:["电子进入偏转电场后做匀速圆周运动。","电子到达荧光屏的动能只由加速电压决定，与偏转电压一定无关。","只要两组偏转电压均非零，电子仍一定能击中屏幕中心。","电子垂直场强方向进入一对平行偏转板后，沿板长方向做匀速直线运动，所以通过该偏转区的时间与该对偏转板电压无关。"],
      answer:3,source:"10.5专题训练·考点8第37题（源解析表述已校正）",imageAlt:"电子枪、两对偏转板和荧光屏组成的示波管原题图",diagram:"particle",diagramData:{mode:"oscilloscope",labels:["电子枪","加速区","XX′","YY′","荧光屏","vₓ","vᵧ","Fₑ"]},
      steps:[
        step("先分清轨迹类型","偏转板间近似为匀强电场，电子所受电场力大小和方向恒定；但这个恒力通常与速度不共线，轨迹是类平抛的抛物线，不是需要向心力始终指向圆心的圆周运动，A错误。","Fₑ=-eE=常矢量；轨迹为抛物线",true),
        step("检查末动能的来源","加速电场先改变电子动能，偏转电场在偏转方向上也可能对电子做功，所以到达屏幕的末动能一般还会受到偏转电压影响。不能把“沿板长方向速度不变”误写成“总动能不变”，B错误。","ΔEₖ=W_加速+W_偏转"),
        step("用矢量叠加判断中心点","两对偏转板分别控制互相垂直的两个方向。只要任一方向存在非零净偏转，落点就偏离中心；不能仅由“两组电压均非零”推出两方向位移会抵消，C错误。","r_屏=(x_偏,y_偏)"),
        step("沿板长方向独立计时","电子垂直E进入某对偏转板，沿板长方向不受力，vₓ保持不变；通过板长L所需时间t=L/vₓ，与这一对板的偏转电压无关，D正确。","t=L/vₓ",true),
        step("澄清源解析中的文字错误","原资料B项解释把应讨论的“末动能”误写成“到达荧光屏的时间”。网站采用校正结论：总动能通常受偏转场做功影响，而沿板长方向的通过时间由vₓ和L决定。","动能问题与通过时间问题分开判断")
      ],
      mistake:"看到恒定电场力就判圆周运动，或把“一个方向速度不变”扩大为“速度大小和动能都不变”。"
    },
    {
      id:"105q6",section:"10.5",point:"扫描电压与屏上亮线",dimension:"图像理解",difficulty:"基础",type:"single",
      prompt:"示波管工作时，在 <i>XX′</i> 和 <i>YY′</i> 间均不加电压，屏幕中心有固定亮斑。题图(a)、(b)给出两种周期电压。下列说法正确的是（　　）",
      options:["应在 <i>YY′</i> 间加图(a)所示电压作为扫描电压。","应在 <i>XX′</i> 间加图(b)所示电压作为扫描电压。","若仅在 <i>YY′</i> 间加图(a)电压，屏幕中央仍为固定亮斑。","若仅在 <i>XX′</i> 间加图(b)电压，借助荧光余辉与视觉暂留，屏幕中央出现一条水平亮线。"],
      answer:3,source:"10.5专题训练·考点8第38题",imageAlt:"示波管XX和YY偏转板以及两种周期电压波形的原题图",diagram:"graph",diagramData:{mode:"scan",axis:"U-t / screen",labels:["XX′","YY′","图(a)","图(b)","水平亮线","竖直亮线"]},
      steps:[
        step("确定两对偏转板的职责","屏幕横坐标用于把时间展开，扫描电压应加在控制水平方向的XX′偏转板；被测信号通常加在控制竖直方向的YY′偏转板。仅凭板名不要猜，要结合题图的极板方向。","XX′→横向；YY′→纵向",true),
        step("识别扫描波形","理想扫描电压在一个周期内近似线性变化，再迅速回扫，即锯齿波。这样光点在屏上大部分时间以近似恒速由一侧扫到另一侧。","x∝U_X(t)"),
        step("判断只加YY′电压的图样","若仅在YY′施加周期电压，光点沿竖直方向往复；在荧光余辉和视觉暂留下形成竖直亮线或相应竖直图样，并非仍停在中心固定一点，因此C错误。","U_Y(t)≠0→y(t)变化"),
        step("判断只加XX′电压的图样","若仅在XX′施加图(b)所示横向周期电压，纵坐标保持为0，横坐标周期变化；许多电子在不同时刻的落点共同形成水平亮线，D正确。","y=0；x=x(t)→水平亮线",true),
        step("区分电子轨迹和屏上图形","屏上的整条亮线不是某一个电子在屏面上滑行的空间轨迹，而是连续电子在不同时刻击中不同位置形成的落点集合。这个时间叠加是理解示波图像的关键。","屏上图样={不同时刻的落点}",true)
      ],
      mistake:"把扫描电压接到YY′，或把屏幕上的亮线误认为单个电子沿屏面运动留下的轨迹。"
    },
    {
      id:"105c1",section:"10.5",point:"漂移管同步加速的完整设计",dimension:"运动建模",difficulty:"中等",type:"single",
      prompt:"一列同轴金属漂移管接周期为 <i>T</i>、缝隙电压大小为 <i>U</i> 的交变电源。电子由静止开始，每经过一个缝隙都恰好被加速，忽略缝隙宽度及电子在缝隙中的运动时间。关于进入第 <i>n</i> 根漂移管的速率、管内运动时间和第 <i>n</i> 根管长，哪一组完整结论正确？",
      options:["<i>v</i><sub>n</sub>=√(2<i>neU/m</i>)，每根管内飞行时间为 <i>T/2</i>，<i>L</i><sub>n</sub>=(<i>T/2</i>)√(2<i>neU/m</i>)，所以管长按√<i>n</i>增长。","<i>v</i><sub>n</sub>=2<i>neU/m</i>，每根管内飞行时间为 <i>T</i>，<i>L</i><sub>n</sub>=<i>nUT/m</i>，所以管长按<i>n</i>增长。","<i>v</i><sub>n</sub>=√(2<i>eU/m</i>)，速度与级数无关；所有漂移管应等长，管内也持续加速。","<i>v</i><sub>n</sub>=√(2<i>neUm</i>)，每根管内飞行时间为 <i>T/4</i>，<i>L</i><sub>n</sub>与<i>n</i>无关。"],
      answer:0,source:"10.5知识解读·典例1/变式1-3（时间表述已校正）",imageAlt:"长度递增的多级漂移管、电子位置与交变电压同步示意",diagram:"particle",diagramData:{mode:"drift-tube-sync",labels:["v₁","v₂","v₃","L₁","L₂","L₃","T/2","U(t)","筒内E≈0"]},
      steps:[
        step("画出真正的加速位置","金属管内部近似没有电场，电子在管内匀速；只有缝隙中存在轴向电场并给电子做正功。分析时把每个缝隙记为一次能量台阶。","ΔEₖ(每缝隙)=eU",true),
        step("累计n次能量增量","电子由静止出发，经过n个加速缝隙后的动能为neU。由½mvₙ²=neU得到vₙ=√(2neU/m)，速度随√n增长。","vₙ=√(2neU/m)"),
        step("把相位条件变成时间条件","电子进入金属管后电源需翻转极性，保证它抵达下一缝隙时电场仍向前。一次翻转需要半周期，所以每根漂移管内的飞行时间统一设计成T/2。","t_管=T/2",true),
        step("反推各级管长","筒内匀速，Lₙ=vₙ(T/2)=(T/2)√(2neU/m)。所以越往后速度越大，筒也按√n逐级加长。","Lₙ∝√n",true),
        step("说明模型边界","推导忽略了缝隙宽度与缝隙内飞行时间，也默认每次跨隙获得相同能量eU。若这些条件改变，就要重新做相位同步，不能直接套用Lₙ∝√n。","理想模型：窄缝、恒定|U|、忽略缝隙时间")
      ],
      mistake:"把电压的半周期误写成电子在加速缝隙内的时间；这里相等的是各漂移管内等待极性翻转的飞行时间。"
    },
    {
      id:"105c2",section:"10.5",point:"打屏临界条件的几何核对",dimension:"空间关系",difficulty:"中等",type:"single",
      prompt:"在“板长 <i>L</i>、屏距板右端 <i>L/2</i>、屏长 <i>L/2</i>、屏到中心线距离 <i>d</i>”的电子偏转装置中，设电子离开偏转板时的侧移为 <i>y</i>。利用出口速度反向延长线过板长中点的性质，下列对两个临界轨迹及加速电压范围的完整说明正确的是（　　）",
      options:["打到屏左端对应 <i>y=d/2</i>，打到屏右端对应 <i>y=d/3</i>；结合 <i>y=U</i><sub>2</sub><i>L</i>²/(4<i>U</i><sub>1</sub><i>d</i>) 得 <i>U</i><sub>2</sub><i>L</i>²/(2<i>d</i>²)≤<i>U</i><sub>1</sub>≤3<i>U</i><sub>2</sub><i>L</i>²/(4<i>d</i>²)。","打到屏左端对应 <i>y=d/3</i>，打到屏右端对应 <i>y=d/2</i>；范围与A相同。","两个屏端点都对应 <i>y=d/2</i>；只需满足 <i>U</i><sub>1</sub>≥<i>U</i><sub>2</sub><i>L</i>²/(2<i>d</i>²)。","只要电子能从偏转板右端飞出就一定打到屏上，不必再检查离场后的直线轨迹。"],
      answer:0,source:"10.5专题训练·考点1第5题·临界深化",imageAlt:"电子打到荧光屏左右端的两条临界轨迹原图",diagram:"particle",diagramData:{mode:"screen-boundaries",labels:["板内抛物线","出口切线","虚拟中点","屏左端","屏右端","y=d/2","y=d/3"]},
      steps:[
        step("先把三段几何放在同一坐标系","板内是抛物线，离板后是出口切线方向的直线，屏幕位于极板下方。出口速度反向延长线通过偏转板水平中点，因此不能只按板后距离做简单比例。","tanθ=2y/L",true),
        step("建立屏左端临界","屏左端距极板出口的水平距离为L/2。把出口切线反向延长到板中点后，用相似三角形比较竖直位移，得到出口侧移y=d/2。","左端临界：y=d/2"),
        step("建立屏右端临界","屏右端比屏左端再远L/2，即距极板出口为L。沿同一切线关系建立相似三角形，得到出口侧移y=d/3。","右端临界：y=d/3",true),
        step("把两个几何边界换成电压边界","代入y=U₂L²/(4U₁d)：y=d/2给出U₁,min=U₂L²/(2d²)；y=d/3给出U₁,max=3U₂L²/(4d²)。","U₁,min≤U₁≤U₁,max"),
        step("做单调性复核","U₁增大使入射速度增大、偏转减小，所以更大的U₁对应更远的屏右端；这个单调性与所得上下界一致，A正确。","U₁↑→v↑→y↓→落点更靠右",true)
      ],
      mistake:"把两个临界轨迹画在同一条线上，或仅检查“不撞板”就断言一定能落在有限长度的屏幕上。"
    },
    {
      id:"105c3",section:"10.5",point:"正交偏转电压合成图形",dimension:"图像理解",difficulty:"低中档",type:"single",
      prompt:"示波管两组互相垂直的偏转板使屏上光点的坐标满足 <i>x=r</i>sin<i>ωt</i>、<i>y=r</i>cos<i>ωt</i>。忽略回扫与余辉差异，一个周期内光点描出的图形是（　　）",
      options:["<img src=\"assets/ch10/105/105c3a.png\" alt=\"选项A：直线图形\"><span>选项A：直线</span>","<img src=\"assets/ch10/105/105c3b.png\" alt=\"选项B：圆形图形\"><span>选项B：圆</span>","<img src=\"assets/ch10/105/105c3c.png\" alt=\"选项C：抛物线图形\"><span>选项C：抛物线</span>","<img src=\"assets/ch10/105/105c3d.png\" alt=\"选项D：椭圆或其他图形\"><span>选项D：其他图形</span>"],
      answer:1,source:"10.5导学案·自我测评3",imageAlt:"两组正交简谐偏转电压与屏上候选轨迹图",diagram:"graph",diagramData:{mode:"lissajous",axis:"x-y",labels:["x=r sinωt","y=r cosωt","ωt","r","相差π/2"]},
      steps:[
        step("把两组电压映射成坐标","XX′和YY′两方向互相垂直，偏转位移分别与各自电压成正比；题目已把这两个位移写成x=r sinωt、y=r cosωt。","x=r sinωt；y=r cosωt"),
        step("消去共同参数t","分别平方后相加，利用sin²ωt+cos²ωt=1，得到x²+y²=r²。这个方程与时间无关。","x²+y²=r²",true),
        step("由方程识别轨迹","x²+y²=r²表示以屏幕中心为圆心、半径为r的圆；两个方向振幅相同且相位相差π/2，所以不是一般椭圆，选B。","圆心O，半径r",true),
        step("检查起点和运动方向","t=0时(x,y)=(0,r)；当t略增大，x>0、y略减小，光点由圆顶向右运动。方向检查与圆轨迹一致，也能防止把两个波形直接叠成直线。","t=0：(0,r)；t>0：向右下"),
        step("澄清屏上图样的含义","圆是连续电子在不同时刻的落点随时间描出的图样，并不是单个电子在真空管内绕屏幕中心做圆周运动；管内每个电子仍经历加速、偏转和直线飞行。","参数曲线描述落点集合",true)
      ],
      mistake:"只看两个电压“同频”就判直线；同频还要比较振幅和相位，本题相位差π/2且振幅相同，才得到圆。"
    }
  ]);

  D.questions={...(D.questions||{}),...questions};
})();
