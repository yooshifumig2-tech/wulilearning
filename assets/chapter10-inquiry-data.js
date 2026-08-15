(function(){
  "use strict";
  const D=window.FUMI_CH10;
  if(!D)return;

  const inquirySets={
    "101":[
      {
        id:"101i1",dimension:"能量模型",title:"三条路径，功会不同吗？",
        prompt:"正电荷从 A 到 B 分别沿直线、折线和曲线运动。在同一静电场中，若初、末位置相同，静电力做功的情况是？",
        options:[
          {id:"101i1-o1",text:"曲线路径最长，所以曲线路径中静电力做功最多。",correct:false,reason:"静电力是保守力，做功不按路径长度计算；这里把“路程更长”误当成了“功更多”。"},
          {id:"101i1-o2",text:"三条路径中静电力做功相同，只由 A、B 两点的位置决定。",correct:true},
          {id:"101i1-o3",text:"直线路径最短，所以直线路径中静电力做功最多。",correct:false,reason:"路径短也不代表静电力做功多。给定始、末位置后，决定做功的是两点电势差。"},
          {id:"101i1-o4",text:"粒子沿某条路径运动得越快，静电力做功就越多。",correct:false,reason:"速度会影响完成过程的时间和功率，却不改变给定 A、B 两点间的静电力功。"}
        ],
        principle:{kind:"规律",title:"静电力做功与路径无关",formula:"W<sub>AB</sub>=qU<sub>AB</sub>=q(φ<sub>A</sub>−φ<sub>B</sub>)",meaning:"静电力是保守力，做功只由初、末位置决定；沿闭合路径一周，静电力总功为零。",conditions:"研究的是静电场中静电力所做的功，而不是所有力的总功。"},
        correctFeedback:"三条路径的始、末位置相同，所以 U<sub>AB</sub> 相同，W<sub>AB</sub>=qU<sub>AB</sub> 也相同。"
      },
      {
        id:"101i2",dimension:"能量模型",title:"动能增加，什么能量减少？",
        prompt:"粒子只受静电力，且静电力对粒子做正功。下列能量变化正确的是？",
        options:[
          {id:"101i2-o1",text:"动能增加，电势能也等量增加。",correct:false,reason:"静电力做功与电势能变化符号相反。正功对应电势能减少，不会使二者同时增加。"},
          {id:"101i2-o2",text:"动能增加，因此粒子经过的电势一定降低。",correct:false,reason:"这忽略了电荷正负。正电荷做正功时趋向低电势，负电荷做正功时却趋向高电势。"},
          {id:"101i2-o3",text:"动能增加，系统的机械能减少。",correct:false,reason:"只有静电力做功时，动能和电势能相互转化，E<sub>k</sub>+E<sub>p</sub> 保持不变。"},
          {id:"101i2-o4",text:"动能增加，电势能等量减少。",correct:true}
        ],
        principle:{kind:"功能关系",title:"静电力功与电势能变化",formula:"ΔE<sub>k</sub>=W<sub>电</sub>　；　ΔE<sub>p</sub>=−W<sub>电</sub>",meaning:"静电力做正功时，动能增加、电势能等量减少；只有静电力做功时，Δ(E<sub>k</sub>+E<sub>p</sub>)=0。",conditions:"题目明确粒子只受静电力，或其他力不做功。"},
        correctFeedback:"W<sub>电</sub>&gt;0，所以 ΔE<sub>k</sub>&gt;0、ΔE<sub>p</sub>&lt;0，并且两者变化量的绝对值相等。"
      },
      {
        id:"101i3",dimension:"符号规范",title:"为什么要除以电荷量？",
        prompt:"把 q、2q、−q 依次放在同一位置，试探电荷的电势能会改变。哪个比值能描述该位置本身的电势？",
        options:[
          {id:"101i3-o1",text:"E<sub>p</sub>/q，其中 q 必须保留正负号。",correct:true},
          {id:"101i3-o2",text:"E<sub>p</sub>/|q|，因为分母只能取正数。",correct:false,reason:"取绝对值会丢失负电荷电势能的符号，不能还原该点电势。定义式中的 q 必须带正负号。"},
          {id:"101i3-o3",text:"E<sub>p</sub>q，因为电荷越多，位置的能量属性越强。",correct:false,reason:"E<sub>p</sub>q 会随试探电荷量的平方变化，不可能是只由电场和位置决定的量。"},
          {id:"101i3-o4",text:"E<sub>p</sub>/q²，因为这样可以消去电荷的正负。",correct:false,reason:"这个比值仍随试探电荷大小变化，而且单位不是伏特；“消去正负”也破坏了电势的定义。"}
        ],
        principle:{kind:"定义",title:"电势",formula:"φ=E<sub>p</sub>/q　；　E<sub>p</sub>=qφ",meaning:"电势 φ 由电场和空间位置决定。试探电荷改变时 E<sub>p</sub> 随 q 改变，但 E<sub>p</sub>/q 不变。",conditions:"q 是放在该点且不显著扰动原电场的试探电荷，代入定义式时必须带正负号。"},
        correctFeedback:"只有 E<sub>p</sub>/q 能消除试探电荷自身的影响；q 带符号，所得 φ 才能正确反映位置的电势。"
      },
      {
        id:"101i4",dimension:"符号规范",title:"更换零点会改变结论吗？",
        prompt:"把零电势参考点换到另一位置，下列说法正确的是？",
        options:[
          {id:"101i4-o1",text:"各点电势能改变，所以 A 到 B 的静电力功也改变。",correct:false,reason:"静电力功取决于电势能之差。统一改变参考值会改变单点数值，却不会改变两点差值。"},
          {id:"101i4-o2",text:"各点的电势和电势能都不会改变。",correct:false,reason:"单点电势 φ 和电势能 E<sub>p</sub> 的具体数值都依赖零参考点。"},
          {id:"101i4-o3",text:"各点电势和电势能可能改变，但电势差与静电力功不变。",correct:true},
          {id:"101i4-o4",text:"电势差不变，但静电力功会随参考点改变。",correct:false,reason:"由 W<sub>AB</sub>=qU<sub>AB</sub> 可知，电势差不变时，同一电荷的静电力功也不变。"}
        ],
        principle:{kind:"规律",title:"零参考的相对性",formula:"φ′=φ+C　；　E′<sub>p</sub>=E<sub>p</sub>+qC<br>U′<sub>AB</sub>=U<sub>AB</sub>　；　W′<sub>AB</sub>=W<sub>AB</sub>",meaning:"换零点相当于给所有电势增加同一常量。单点数值会平移，差值和实际做功不变。",conditions:"比较的是同一物理过程、同一电荷和同一对 A、B 点。"},
        correctFeedback:"换零点只改变 φ、E<sub>p</sub> 的参考数值，不改变 U<sub>AB</sub>、W<sub>AB</sub> 和真实运动。"
      }
    ],
    "102":[
      {
        id:"102i1",dimension:"符号规范",title:"交换角标会发生什么？",
        prompt:"已知 φ<sub>A</sub>=80 V、φ<sub>B</sub>=−20 V，U<sub>AB</sub> 和 U<sub>BA</sub> 分别为？",
        options:[
          {id:"102i1-o1",text:"−100 V、100 V",correct:false,reason:"把 U<sub>AB</sub> 的减法顺序颠倒了；AB 表示前面的 A 减后面的 B。"},
          {id:"102i1-o2",text:"100 V、100 V",correct:false,reason:"交换角标后必须变号，即 U<sub>BA</sub>=−U<sub>AB</sub>。"},
          {id:"102i1-o3",text:"100 V、−100 V",correct:true},
          {id:"102i1-o4",text:"60 V、−60 V",correct:false,reason:"80−(−20)=80+20=100，不能漏掉括号中的负号。"}
        ],
        principle:{kind:"定义",title:"电势差的角标顺序",formula:"U<sub>AB</sub>=φ<sub>A</sub>−φ<sub>B</sub>　；　U<sub>BA</sub>=−U<sub>AB</sub>",meaning:"角标 AB 表示 A 点电势减 B 点电势。电势差是标量，但有正负。",conditions:"代入 φ 时保留每个电势自身的正负号。"},
        correctFeedback:"U<sub>AB</sub>=80−(−20)=100 V，U<sub>BA</sub>=−20−80=−100 V。"
      },
      {
        id:"102i2",dimension:"符号规范",title:"零电势点改变，U 会变吗？",
        prompt:"若所有点的电势都同时增加 50 V，原来的 U<sub>AB</sub> 将怎样变化？",
        options:[
          {id:"102i2-o1",text:"保持不变。",correct:true},
          {id:"102i2-o2",text:"增加 50 V。",correct:false,reason:"A、B 两点同时增加同一数值，作差时 +50 V 会相互抵消。"},
          {id:"102i2-o3",text:"减少 50 V。",correct:false,reason:"改变的是单点电势的参考值，不是两点的电势差。"},
          {id:"102i2-o4",text:"变为零。",correct:false,reason:"只有 A、B 两点电势相等时 U<sub>AB</sub> 才为零，整体平移不会让原差值消失。"}
        ],
        principle:{kind:"推论",title:"电势差与零参考无关",formula:"U′<sub>AB</sub>=(φ<sub>A</sub>+50)−(φ<sub>B</sub>+50)=U<sub>AB</sub>",meaning:"所有点电势同时增加或减少同一常量，两点差值不变。",conditions:"“与零参考无关”不等于“没有正负”，U<sub>AB</sub> 仍由角标顺序决定。"},
        correctFeedback:"两个 +50 V 在作差时抵消，因此 U<sub>AB</sub> 保持不变。"
      },
      {
        id:"102i3",dimension:"能量模型",title:"怎样由能量推出 W=qU？",
        prompt:"从 E<sub>p</sub>=qφ 出发，下列哪一组推导正确？",
        options:[
          {id:"102i3-o1",text:"W<sub>AB</sub>=E<sub>pA</sub>+E<sub>pB</sub>=q(φ<sub>A</sub>+φ<sub>B</sub>)",correct:false,reason:"静电力功对应电势能的减少量，不是初末两点电势能之和。"},
          {id:"102i3-o2",text:"W<sub>AB</sub>=q(φ<sub>B</sub>−φ<sub>A</sub>)=qU<sub>AB</sub>",correct:false,reason:"括号中实际是 U<sub>BA</sub>，把 A、B 的顺序写反了。"},
          {id:"102i3-o3",text:"W<sub>AB</sub>=E<sub>pB</sub>−E<sub>pA</sub>=qU<sub>AB</sub>",correct:false,reason:"W<sub>AB</sub>=−ΔE<sub>p</sub>=E<sub>pA</sub>−E<sub>pB</sub>，不是末态减初态。"},
          {id:"102i3-o4",text:"W<sub>AB</sub>=E<sub>pA</sub>−E<sub>pB</sub>=qφ<sub>A</sub>−qφ<sub>B</sub>=qU<sub>AB</sub>",correct:true}
        ],
        principle:{kind:"推导",title:"静电力功与电势差",formula:"W<sub>AB</sub>=−ΔE<sub>p</sub>=E<sub>pA</sub>−E<sub>pB</sub>=q(φ<sub>A</sub>−φ<sub>B</sub>)=qU<sub>AB</sub>",meaning:"功能关系和电势差定义可以接成一条等式。",conditions:"q、U<sub>AB</sub> 都要保留正负号，不能凭运动方向猜 W 的符号。"},
        correctFeedback:"先写“初态电势能减末态电势能”，再代入 E<sub>p</sub>=qφ，最后识别 U<sub>AB</sub>=φ<sub>A</sub>−φ<sub>B</sub>。"
      },
      {
        id:"102i4",dimension:"空间关系",title:"为什么电场线垂直等势面？",
        prompt:"关于电场线与等势面的关系，下列解释正确的是？",
        options:[
          {id:"102i4-o1",text:"因为等势面上的电场强度处处为零。",correct:false,reason:"等势面上各点电势相等，但法向场强完全可以不为零；例如匀强电场的每个等势面上 E 都不为零。"},
          {id:"102i4-o2",text:"沿等势面移动时 U=0、静电力不做功；若电场有切向分量就会产生非零功，所以电场只能垂直等势面。",correct:true},
          {id:"102i4-o3",text:"因为静电力始终沿等势面的切线方向。",correct:false,reason:"若静电力沿切向，电荷沿面移动时就会做功，这与同一等势面上 U=0 矛盾。"},
          {id:"102i4-o4",text:"因为电荷不能沿等势面移动。",correct:false,reason:"电荷可以沿等势面移动，只是静电力沿该位移不做功。"}
        ],
        principle:{kind:"规律",title:"电场线与等势面正交",formula:"同一等势面：U=0　⇒　W=qU=0",meaning:"若 E 有切向分量，沿面位移时 qE<sub>切</sub>s 会产生非零功，因此静电场中的 E 必须沿等势面的法线方向，并指向电势降低方向。",conditions:"讨论 E≠0 的位置；场强为零处没有唯一的场强方向。"},
        correctFeedback:"沿等势面移动的电荷，静电力功必须为零，所以 E 不可能有沿面的分量，只能垂直等势面。"
      }
    ],
    "103":[
      {
        id:"103i1",dimension:"空间关系",title:"两条公式怎样汇合？",
        prompt:"在匀强电场中，位移 L 与场强方向夹角为 θ。由 W=qELcosθ 和 W=qU 可得？",
        options:[
          {id:"103i1-o1",text:"U=EL",correct:false,reason:"只有 θ=0°、位移与 E 同向时，cosθ=1，才能直接写成 EL。"},
          {id:"103i1-o2",text:"U=ELcosθ=Ed，其中 d=Lcosθ。",correct:true},
          {id:"103i1-o3",text:"U=E/(Lcosθ)",correct:false,reason:"运算和单位都不正确；E/L 不是电压单位。"},
          {id:"103i1-o4",text:"U=ELsinθ",correct:false,reason:"电势差取决于位移沿电场方向的投影，应使用 cosθ，不是垂直方向投影。"}
        ],
        principle:{kind:"推导",title:"匀强电场中的 U=Ed",formula:"qELcosθ=qU　⇒　U=ELcosθ=Ed",meaning:"d=Lcosθ，是 A 到 B 沿电场方向的有符号投影距离。",conditions:"电场必须是匀强电场；q 为非零试探电荷。"},
        correctFeedback:"把两种做功表达式相等并消去 q，得到 U=ELcosθ；令 d=Lcosθ，即 U=Ed。"
      },
      {
        id:"103i2",dimension:"空间关系",title:"d 到底是哪段长度？",
        prompt:"在 U=Ed 中，A、B 的直线距离为 L，AB 与电场方向夹角为 θ。下列说法正确的是？",
        options:[
          {id:"103i2-o1",text:"d=L，AB 垂直电场时仍有 U=EL。",correct:false,reason:"这把实际距离误作沿电场方向的投影。垂直 E 移动时，两点在同一等势面上。"},
          {id:"103i2-o2",text:"d 是粒子的实际路径长度，绕得越远电势差越大。",correct:false,reason:"静电场中电势差与路径无关，d 不是路程。"},
          {id:"103i2-o3",text:"d=Lsinθ，AB 垂直电场时电势差最大。",correct:false,reason:"Lsinθ 是垂直 E 的投影；AB⊥E 时两点电势差为零。"},
          {id:"103i2-o4",text:"d=Lcosθ，AB 垂直电场时 d=0、U<sub>AB</sub>=0。",correct:true}
        ],
        principle:{kind:"模型条件",title:"d 是沿场方向的投影",formula:"d=Lcosθ　；　U<sub>AB</sub>=Ed",meaning:"d 带方向，是从 A 到 B 的位移在 E 方向上的投影，不是两点距离或实际路程。",conditions:"仅适用于匀强电场；若只求大小，可使用 |U|=E|d|。"},
        correctFeedback:"当 AB⊥E 时 θ=90°，d=Lcos90°=0，所以 U<sub>AB</sub>=0。"
      },
      {
        id:"103i3",dimension:"空间关系",title:"怎样由两个等势点画出 E？",
        prompt:"在匀强电场中，已知 P、Q 两点电势相等。正确作图顺序是？",
        options:[
          {id:"103i3-o1",text:"连接 PQ 得到等势线；画出与 PQ 垂直的场强方向，再借助另一已知点的电势确定由高势指向低势的箭头。",correct:true},
          {id:"103i3-o2",text:"连接 PQ，并把电场方向直接画在 PQ 方向上。",correct:false,reason:"沿 PQ 电势不变，电场不能有沿 PQ 的分量；E 应与等势线垂直。"},
          {id:"103i3-o3",text:"先画垂直 PQ 的方向，再规定箭头必定由低电势指向高电势。",correct:false,reason:"电场方向应由高电势指向低电势。"},
          {id:"103i3-o4",text:"只凭 P、Q 等势，就能确定垂线两个方向中哪一个是 E 的箭头方向。",correct:false,reason:"P、Q 只能确定 E 所在直线，不能单独确定箭头朝向；还需另一点的电势高低等信息。"}
        ],
        principle:{kind:"作图规律",title:"先等势线，后场强方向",formula:"φ<sub>P</sub>=φ<sub>Q</sub>　⇒　PQ 为等势方向　⇒　E⊥PQ",meaning:"匀强电场中等势线互相平行，E 垂直等势线并指向电势降低最快的方向。",conditions:"仅凭两个等势点只能确定 E 的轴线，箭头方向还需高、低电势信息。"},
        correctFeedback:"先连等势点 P、Q，再作 PQ 的垂线；最后根据另一已知点的电势判断箭头由高势指向低势。"
      },
      {
        id:"103i4",dimension:"图像理解",title:"场强大等于电势高吗？",
        prompt:"观察 φ-x 图像：图线向下倾斜且斜率绝对值逐渐增大。下列判断正确的是？",
        options:[
          {id:"103i4-o1",text:"图线越高，场强一定越大。",correct:false,reason:"图线高度表示电势 φ，场强由电势随位置的变化率决定，二者不能按数值直接比较。"},
          {id:"103i4-o2",text:"斜率绝对值越大，场强越小。",correct:false,reason:"场强分量的大小对应斜率绝对值；曲线越陡，|E<sub>x</sub>| 越大。"},
          {id:"103i4-o3",text:"E<sub>x</sub> 为正，图线越陡说明 |E<sub>x</sub>| 越大；电势高低不能直接代表场强大小。",correct:true},
          {id:"103i4-o4",text:"图线斜率为零时，该点电势一定为零。",correct:false,reason:"斜率为零只表示该方向的场强分量为零，电势可以是任意常量。"}
        ],
        principle:{kind:"图像规律",title:"电势图像的负斜率对应场强",formula:"E<sub>x</sub>=−dφ/dx　；　基础近似 E<sub>x</sub>≈−Δφ/Δx",meaning:"图线向下倾斜时 dφ/dx&lt;0，因此 E<sub>x</sub>&gt;0；斜率绝对值越大，场强分量越大。",conditions:"这是沿 x 方向的一维关系；图线高度表示 φ，不表示 E。"},
        correctFeedback:"负号决定方向，斜率绝对值决定 |E<sub>x</sub>|；“电势高”和“场强大”不是同一个判断。"
      }
    ],
    "104":[
      {
        id:"104i1",dimension:"电容动态分析",title:"充电时什么在移动？",
        prompt:"理想电容器经电阻接到直流电源后，关于充电过程的描述正确的是？",
        options:[
          {id:"104i1-o1",text:"电子从一个极板直接穿过绝缘介质到达另一极板。",correct:false,reason:"理想介质不导电，电子不会穿过板间介质，而是经外电路重新分布。"},
          {id:"104i1-o2",text:"金属板中的质子经过导线移动到另一极板。",correct:false,reason:"金属中的自由载流子主要是电子，原子核不会在导线中迁移。"},
          {id:"104i1-o3",text:"电子经外电路重新分布，两板逐渐带等量异种电荷，U 和 E 逐渐建立；稳定后电流近似为零。",correct:true},
          {id:"104i1-o4",text:"只要保持接在直流电源上，充电电流就始终保持不变。",correct:false,reason:"随着板间电压接近电源电压，充电电流逐渐减小；理想稳态时近似为零。"}
        ],
        principle:{kind:"实验规律",title:"电容器的充电过程",formula:"Q=CU　；　理想平行板中 E=U/d",meaning:"电子经外电路转移，使两板逐渐带等量异种电荷；Q、U、E 随之建立。",conditions:"理想电容器、初始中性、接直流电源；电子不穿过绝缘介质。"},
        correctFeedback:"外电路出现短暂电流，电子重新分布；达到稳定后两板带等量异种电荷，板间电压等于电源电压，电流近似为零。"
      },
      {
        id:"104i2",dimension:"图像理解",title:"I-t 图的面积表示什么？",
        prompt:"充电电流随时间变化，I-t 图像与时间轴之间的有向面积表示？",
        options:[
          {id:"104i2-o1",text:"电源提供的电能。",correct:false,reason:"电能应由 ∫u(t)i(t)dt 计算，其中 u、i 对应同一元件或电源；只有电流对时间积分不能得到能量。"},
          {id:"104i2-o2",text:"这段时间内，按约定正方向净通过导线截面的电荷量。",correct:true},
          {id:"104i2-o3",text:"电容器两端电压的变化量。",correct:false,reason:"电流积分得到 ΔQ；电压变化还要结合电容 C，由 ΔU=ΔQ/C 得到。"},
          {id:"104i2-o4",text:"电容器的电容。",correct:false,reason:"I-t 面积的量纲是 A·s=C（库仑），不是 F（法拉）。"}
        ],
        principle:{kind:"定义与图像",title:"电流是电荷量的变化率",formula:"I=dQ/dt　；　在约定正方向下，ΔQ=∫I dt",meaning:"I-t 图像的有向面积给出按所取正方向净通过截面的电荷量；若只问转移电荷量的大小，则取面积绝对值。",conditions:"若把电流正方向约定为流入所研究极板，该面积才直接等于该极板的 ΔQ；坐标轴单位必须一致。"},
        correctFeedback:"电流乘时间的量纲为库仑，因此 I-t 有向面积表示在所取正方向下净通过截面的电荷量。"
      },
      {
        id:"104i3",dimension:"电容动态分析",title:"Q 增加，C 会跟着增加吗？",
        prompt:"同一个理想线性电容器接到更高电压后，Q 增大。关于电容 C 的判断正确的是？",
        options:[
          {id:"104i3-o1",text:"Q 增大，所以 C 一定增大。",correct:false,reason:"这把 C=Q/U 的定义式误解成因果决定式；同一线性电容器的 C 不随 Q 单独改变。"},
          {id:"104i3-o2",text:"U 增大，所以 C 一定减小。",correct:false,reason:"同一线性电容器中 Q 与 U 同比例增大，Q/U 保持不变。"},
          {id:"104i3-o3",text:"此时 C=Q，电压只起辅助作用。",correct:false,reason:"电容定义为 Q/U，而且 C 与 Q 的量纲不同，不能直接相等。"},
          {id:"104i3-o4",text:"Q/U 保持不变，C 由电容器的结构和介质决定。",correct:true}
        ],
        principle:{kind:"定义与决定式",title:"电容不由 Q、U 单独决定",formula:"C=Q/U　；　平行板模型 C=ε<sub>0</sub>ε<sub>r</sub>S/d",meaning:"C 描述电容器容纳电荷的本领。对给定线性电容器，Q 随 U 成比例变化，C 保持不变。",conditions:"平行板决定式需忽略边缘效应；实际器件还要在正常工作范围内。"},
        correctFeedback:"同一电容器接更高电压时 Q 同比例增加，Q/U 不变；改变结构 S、d 或介质才会改变 C。"
      },
      {
        id:"104i4",dimension:"电容动态分析",title:"移动极板前先问哪句话？",
        prompt:"分析平行板电容器极板间距变化时，首先应判断什么？",
        options:[
          {id:"104i4-o1",text:"先判断是否仍连接理想电源：连接时 U 不变，断开且无泄漏时 Q 不变。",correct:true},
          {id:"104i4-o2",text:"无论是否连接电源，Q 和 U 都同时不变。",correct:false,reason:"结构变化会改变 C。由 Q=CU 可知，Q、U 一般不可能在两种连接状态下都同时保持不变。"},
          {id:"104i4-o3",text:"连接电源时 Q 不变，断开电源时 U 不变。",correct:false,reason:"把两种约束完全颠倒了：电源钳住 U；断开且无泄漏时电荷无处转移，所以 Q 不变。"},
          {id:"104i4-o4",text:"只需判断介电常数，连接状态不影响结论。",correct:false,reason:"连接状态决定电荷能否继续由电源补充，是动态分析的第一道分支。"}
        ],
        principle:{kind:"判断链",title:"先定恒 U 或恒 Q",formula:"C=ε<sub>0</sub>ε<sub>r</sub>S/d　→　Q=CU　→　E=U/d",meaning:"连接理想电源时 U 不变；断开且无泄漏时 Q 不变，再依次判断 C、Q/U、E。",conditions:"理想电源、忽略漏电和边缘效应。恒 Q 时还可用 E=Q/(ε<sub>0</sub>ε<sub>r</sub>S)。"},
        correctFeedback:"先看连接状态，再沿 C→Q/U→E 的因果链判断，不能一看到 d 改变就直接猜 Q、U 或 E。"
      }
    ],
    "105":[
      {
        id:"105i1",dimension:"运动建模",title:"同一道加速题有几条路？",
        prompt:"粒子从静止跨越一段加速电势差，只计静电力。关于动力学法和能量法，下列说法正确的是？",
        options:[
          {id:"105i1-o1",text:"动力学法不需要场强或板距，任何电场都可直接用 a=qU/m。",correct:false,reason:"电压不是场强，qU/m 的量纲也不是加速度；动力学法必须先获得 E。"},
          {id:"105i1-o2",text:"匀强场动力学法用 E=U/d、F=qE 和运动学公式；能量法用 qU<sub>AB</sub>=ΔE<sub>k</sub>，通常不需板距和具体路径。",correct:true},
          {id:"105i1-o3",text:"能量法必须知道板距，动力学法只需电势差。",correct:false,reason:"两种方法所需条件说反了；只求始末速度时，能量法通常更少依赖过程几何。"},
          {id:"105i1-o4",text:"两种方法都可忽略电荷正负，直接写 v=√(2qU/m)。",correct:false,reason:"有符号式必须满足 qU<sub>AB</sub>=ΔE<sub>k</sub>&gt;0；负电荷不能机械放进无符号根式。"}
        ],
        principle:{kind:"方法选择",title:"动力学法与能量法",formula:"qU<sub>AB</sub>=ΔE<sub>k</sub><br>匀强场：E=U/d，F=qE，a=qE/m",meaning:"能量法连接始末状态；动力学法还能给出加速度、时间等过程量。",conditions:"由静止经“加速电压大小 U”加速时，可写 v=√(2|q|U/m)。"},
        correctFeedback:"只求末速度优先用能量法；需要时间或加速度且电场匀强时，再用 E=U/d、F=qE 和运动学公式。"
      },
      {
        id:"105i2",dimension:"运动建模",title:"为什么固定多级极板会失败？",
        prompt:"带正电粒子依次穿过多个漂移管缝隙。怎样保证它每次过缝隙都被加速？",
        options:[
          {id:"105i2-o1",text:"使用方向固定的直流电压，让相邻缝隙电场方向始终交替。",correct:false,reason:"粒子会在一个缝隙加速、下一个缝隙减速，不能连续增加动能。"},
          {id:"105i2-o2",text:"所有漂移管做成相同长度，粒子就会自动保持同步。",correct:false,reason:"粒子速度逐级增加，相同管长对应的飞行时间会逐渐减小，无法一直保持半周期同步。"},
          {id:"105i2-o3",text:"让漂移管内部也保持强电场，使粒子在管内持续加速。",correct:false,reason:"漂移管内部近似静电屏蔽，粒子主要在缝隙中受到加速电场。"},
          {id:"105i2-o4",text:"施加交变电压并调整管长，使管内飞行时间约为半个周期；到下一缝隙时电场已反向，仍对粒子做正功。",correct:true}
        ],
        principle:{kind:"同步条件",title:"漂移管的半周期同步",formula:"t<sub>n</sub>≈T/2　；　L<sub>n</sub>≈v<sub>n</sub>T/2",meaning:"粒子在管内近似匀速，电源完成一次反相；它到达下一缝隙时，电场方向再次适合加速。",conditions:"忽略缝隙通过时间，粒子速度逐级增加，因此后续漂移管通常更长。"},
        correctFeedback:"关键不是固定电场，而是“交变电压 + 半周期同步”；管长要随粒子速度增加而增大。"
      },
      {
        id:"105i3",dimension:"运动建模",title:"曲线运动怎样拆？",
        prompt:"忽略重力，粒子以水平速度 v<sub>0</sub> 射入竖直匀强电场。正确的运动分解是？",
        options:[
          {id:"105i3-o1",text:"水平方向匀加速，竖直方向匀速。",correct:false,reason:"电场力在竖直方向，水平方向没有电场力，水平速度保持不变。"},
          {id:"105i3-o2",text:"水平、竖直两个方向都做匀加速运动。",correct:false,reason:"水平方向合力为零，因此不是匀加速运动。"},
          {id:"105i3-o3",text:"水平方向匀速，先由 t=L/v<sub>0</sub> 求板内时间；竖直方向以 a<sub>y</sub>=qE<sub>y</sub>/m 做匀变速运动。",correct:true},
          {id:"105i3-o4",text:"应先由未知的竖直位移求时间，再判断水平速度是否变化。",correct:false,reason:"竖直位移通常未知，而水平板长 L 与初速度 v<sub>0</sub> 可直接确定两个方向共用的时间。"}
        ],
        principle:{kind:"运动模型",title:"类平抛分解",formula:"t=L/v<sub>0</sub>　；　E<sub>y</sub>=−Δφ/Δy　；　a<sub>y</sub>=qE<sub>y</sub>/m<br>v<sub>y</sub>=a<sub>y</sub>t　；　y=a<sub>y</sub>t²/2",meaning:"水平方向匀速决定共同时间，竖直方向在恒定电场力下做匀变速运动。若 U 表示板间电压大小，则 |E|=U/d、|a<sub>y</sub>|=|q|U/(md)。",conditions:"忽略重力，入射速度水平，板间电场近似匀强；先规定 +y，再用 E<sub>y</sub> 和 a<sub>y</sub> 的正负表示方向，偏转方向由 qE 决定。"},
        correctFeedback:"先用水平匀速运动求 t=L/v<sub>0</sub>，再把同一个 t 代入竖直匀变速运动。"
      },
      {
        id:"105i4",dimension:"运动建模",title:"公式算出偏移就一定能出板吗？",
        prompt:"粒子从两极板中线水平射入，极板间距为 d。算得板末端竖直偏移 y 后，还应怎样判断？",
        options:[
          {id:"105i4-o1",text:"比较 |y| 与 d/2；若 |y|&gt;d/2，粒子已撞板，不能继续套用正常出板后的打屏公式。",correct:true},
          {id:"105i4-o2",text:"比较 |y| 与极板长度 L。",correct:false,reason:"撞板边界由竖直方向的板间距决定，水平板长 L 不能替代 d/2。"},
          {id:"105i4-o3",text:"无论 |y| 多大，粒子都会从极板右端飞出。",correct:false,reason:"轨迹可能在到达板末端前就与上、下极板相交。"},
          {id:"105i4-o4",text:"只需比较末速度与初速度，不必检查几何边界。",correct:false,reason:"速度变化不能代替位置判断；“公式有数值”并不保证该段模型真的完整发生。"}
        ],
        principle:{kind:"边界条件",title:"先检查能否出板",formula:"|y<sub>出板</sub>|≤d/2　；　|y<sub>出板</sub>|=|q|UL²/(2mdv<sub>0</sub>²)",meaning:"对中线入射且 U 表示偏转电压大小的标准模型，粒子末端偏移不能超过半个板间距；否则应先求撞板位置。",conditions:"等号是到达极板边缘的临界情形；若初始位置或初始竖直速度不同，应检查整段轨迹与实际边界。"},
        correctFeedback:"只有 |y|≤d/2 时，粒子才可能正常飞出极板；超出边界后，后续打屏公式的前提已经被破坏。"
      },
      {
        id:"105i5",dimension:"图像理解",title:"示波管怎样把电压变成图像？",
        prompt:"示波管中，Y 偏转板接待测信号，X 偏转板接线性锯齿扫描电压。光点运动的正确解释是？",
        options:[
          {id:"105i5-o1",text:"X 板控制竖直位置，Y 板控制水平扫描。",correct:false,reason:"把 X、Y 两组偏转板的作用方向颠倒了。"},
          {id:"105i5-o2",text:"只接 Y 信号，就一定能稳定显示完整的时间波形。",correct:false,reason:"缺少水平扫描时，光点不能把不同时刻的信号沿水平方向展开。"},
          {id:"105i5-o3",text:"锯齿电压用于周期性改变电子沿管轴方向的飞行速度。",correct:false,reason:"锯齿扫描电压主要控制水平偏转位置，不是改变电子束的轴向加速速度。"},
          {id:"105i5-o4",text:"Y 信号控制竖直偏转，X 锯齿电压使光点近似匀速水平扫描；同步叠加后显示信号随时间的变化。",correct:true}
        ],
        principle:{kind:"装置规律",title:"Y 信号 + X 扫描",formula:"装置参数固定时：y∝U<sub>Y</sub>　；　x∝U<sub>X</sub><br>线性扫描段 U<sub>X</sub>∝t　⇒　x∝t",meaning:"Y 板把待测电压变成竖直位置，X 板把时间近似均匀展开到水平方向。",conditions:"要稳定显示周期波形，还需扫描周期与信号保持适当同步。"},
        correctFeedback:"竖直坐标记录信号幅度，水平坐标代表时间；二者同步叠加后，屏幕才显示 U<sub>Y</sub>(t) 波形。"
      }
    ]
  };

  D.sections.forEach(section=>{
    const set=inquirySets[section.id];
    if(set)section.inquiries=set;
  });
  D.inquiryVersion=2;
})();
