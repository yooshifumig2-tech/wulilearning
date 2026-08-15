(function(){
  "use strict";
  const D=window.FUMI_CH10,S=window.FUMI_STORE,SVG=window.FUMI_CH10_DIAGRAMS;
  if(!D||!S||!SVG)return;
  const KEY="fumi-ch10-learn-v1";
  const fresh=()=>({current:0,tasks:{},notes:{},answers:{},submitted:{},steps:{},done:{},labs:{},challengeOpen:{},inquiryOrders:{},inquiryAttempts:{}});
  let state=fresh();
  try{state={...fresh(),...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{}
  state.inquiryOrders ||= {};
  state.inquiryAttempts ||= {};
  const stages=[{id:"tasks",code:"START",title:"领取第十章学习任务",minutes:5,type:"tasks"},...D.sections];
  const esc=S.esc;
  const save=()=>{localStorage.setItem(KEY,JSON.stringify(state));renderRail();progress()};
  const section=()=>stages[state.current];
  const getQuestion=id=>D.questions[id];
  const clean=s=>String(s??"").replace(/<img\b[^>]*\balt=(["'])(.*?)\1[^>]*>/gi," $2 ").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  const same=(q,a)=>q.type==="multiple"?JSON.stringify([...(a||[])].sort())===JSON.stringify([...(q.answer||[])].sort()):Number(a)===Number(q.answer);
  const answerLabel=q=>q.type==="multiple"?q.answer.map(i=>String.fromCharCode(65+i)).join("、"):String.fromCharCode(65+q.answer);
  function studentResponse(q,a){const indices=q.type==="multiple"?(Array.isArray(a)?a:[]):Number.isInteger(a)?[a]:[];return indices.length?{labels:indices.map(i=>String.fromCharCode(65+i)),texts:indices.map(i=>clean(q.options[i]))}:null}
  function aiQuestionContext(q,x,submitted){return{subject:"physics",page:"第十章任务学习",chapter:x.code,chapterId:x.code,questionId:q.id,question:clean(q.prompt),figure:{description:q.imageAlt||"",...(submitted?{solutionLabels:q.diagramData?.labels||[]}:{})},options:q.options.map((o,i)=>`${String.fromCharCode(65+i)}. ${clean(o)}`),studentAnswer:studentResponse(q,state.answers[q.id]),knowledgePoint:q.point,dimension:q.dimension,source:q.source||"专题训练",submitted,canReveal:submitted,purpose:"tutor",...(submitted?{correctAnswer:q.answerText||answerLabel(q),solutionSteps:q.steps.map(s=>({title:s.title,text:clean(s.text),formula:clean(s.formula||""),important:!!s.important})),commonMistake:q.mistake}:{})}}

  const inquiryKey=(x,q)=>`${x.id}-${q.id}`;
  function inquiryAttempt(x,q){
    const key=inquiryKey(x,q);
    state.inquiryAttempts[key] ||= {wrongIds:[],selectedId:null,completed:false,attempts:0};
    return state.inquiryAttempts[key];
  }
  function inquiryOrder(x,q){
    const key=inquiryKey(x,q),ids=q.options.map(o=>o.id);
    let order=state.inquiryOrders[key];
    const valid=Array.isArray(order)&&order.length===ids.length&&new Set(order).size===ids.length&&order.every(id=>ids.includes(id));
    if(!valid){
      order=[...ids];
      for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}
      if(order.length>1&&order.every((id,i)=>id===ids[i]))[order[0],order[1]]=[order[1],order[0]];
      state.inquiryOrders[key]=order;
      localStorage.setItem(KEY,JSON.stringify(state));
    }
    return order;
  }
  const inquiryOption=(q,id)=>q.options.find(o=>o.id===id);
  function inquiryAIContext(q,x){
    const key=inquiryKey(x,q),attempt=inquiryAttempt(x,q),order=inquiryOrder(x,q),submitted=!!attempt.completed;
    const displayed=order.map((id,i)=>`${String.fromCharCode(65+i)}. ${clean(inquiryOption(q,id)?.text||"")}`);
    const selected=attempt.selectedId?inquiryOption(q,attempt.selectedId):null;
    const wrongTexts=(attempt.wrongIds||[]).map(id=>clean(inquiryOption(q,id)?.text||"")).filter(Boolean);
    return{subject:"physics",page:"第十章任务学习",chapter:x.code,chapterId:x.code,questionId:q.id,question:clean(q.prompt),options:displayed,studentAnswer:selected?clean(selected.text):"",attemptedWrongOptions:wrongTexts,knowledgePoint:q.title,dimension:q.dimension,source:"导学案观察任务",submitted,canReveal:submitted,purpose:"tutor",...(submitted?{correctAnswer:clean(q.options.find(o=>o.correct)?.text||""),explanation:clean(q.correctFeedback||""),principle:{kind:q.principle?.kind||"规律",title:q.principle?.title||"",formula:clean(q.principle?.formula||""),meaning:clean(q.principle?.meaning||""),conditions:clean(q.principle?.conditions||"")}}:{})}
  }

  function progress(){
    const n=stages.filter(x=>state.done[x.id]).length;
    document.querySelector("[data-progress-text]").textContent=`${n} / ${stages.length}`;
    document.querySelector("[data-progress]").style.width=`${Math.round(n/stages.length*100)}%`;
  }
  function renderRail(){
    document.querySelector("[data-rail]").innerHTML=stages.map((x,i)=>`<button class="rail-btn ${i===state.current?"active":""} ${state.done[x.id]?"done":""}" data-go="${i}"><span class="rail-index">${state.done[x.id]?"✓":i+1}</span><span><b>${x.code} ${x.title}</b><small>${x.minutes}分钟 · ${x.type==="tasks"?"任务准备":"导学 + 解读 + 基础练习"}</small></span></button>`).join("");
    document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{state.current=Number(b.dataset.go);save();renderStage();window.scrollTo({top:0,behavior:"smooth"})});
  }
  function taskStage(){
    return`<article class="stage-card"><div class="lesson-kicker"><span class="tag orange">STEP 0</span><span class="tag">先把问题变成任务</span></div><h1>先领取第十章学习任务</h1><p class="task-intro">先不看结论。勾选今天准备解决的问题，并写下一个自己的疑问；随后分五次完成，每节约30—40分钟。</p><section class="mission-board"><span class="eyebrow" style="color:#cfe8f4">MISSION BOARD</span><h2>静电场中的能量</h2><p>从“静电力做了多少功”出发，逐步走到“怎样控制带电粒子的轨迹”。五节不是孤立公式，而是一条能量—空间—运动链。</p><div class="mission-list">${D.tasks.map(t=>`<label class="mission-item"><input type="checkbox" data-task="${t.id}" ${state.tasks[t.id]?"checked":""}><span><b>${t.code} · ${t.title}</b><small>${t.question}</small></span></label>`).join("")}</div></section><div class="thinking-box"><b>我的第十章问题</b><textarea data-task-note placeholder="例如：为什么电子经过相同加速电压后，板距不影响末速度？">${esc(state.notes.tasks||"")}</textarea></div><div class="stage-actions"><a class="btn" href="physics-learn.html">← 查看第9章</a><button class="btn primary" data-start>带着任务进入10.1 →</button></div></article>`;
  }
  function labControls(x){
    const values=state.labs[x.id]||{};
    return x.lab.controls.map(c=>{const val=values[c.id]??c.value;if(c.kind==="select")return`<div class="lab-control"><label><span>${c.label}</span></label><select data-lab-control="${c.id}">${c.options.map(o=>`<option value="${o[0]}" ${String(val)===String(o[0])?"selected":""}>${o[1]}</option>`).join("")}</select></div>`;return`<div class="lab-control"><label><span>${c.label}</span><b data-lab-value="${c.id}">${val}</b></label><input type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${val}" data-lab-control="${c.id}"></div>`}).join("");
  }
  function lab(x){const values={};x.lab.controls.forEach(c=>values[c.id]=(state.labs[x.id]||{})[c.id]??c.value);return`<section class="lab-card"><div class="lab-head"><div><span class="eyebrow" style="color:#cfe8f4">INTERACTIVE MODEL</span><h2>把结论拖出来</h2><p>调节条件，观察图中物理量怎样同步变化；动画使用经过校正的符号和方向。</p></div><span class="tag orange">${x.code}</span></div><div class="lab-grid"><div class="lab-canvas" data-lab-canvas>${SVG.lesson(x.id,values)}</div><div class="lab-controls">${labControls(x)}<div class="lab-readout" data-lab-readout>改变参数后，先说出不变量或研究对象，再读取数值变化。</div></div></div></section>`}
  function deepens(x){return`<section class="deepen-panel"><header><span class="tag orange">知识点解读</span><h2>深化点拨</h2><p>对应导学问题补全条件、适用范围和常见错误。</p></header><div class="deepen-grid">${x.deepens.map((d,i)=>`<details class="deep-card" ${i===0?"open":""}><summary><i>${String(i+1).padStart(2,"0")}</i><b>${d.title}</b><span>展开</span></summary><div class="deep-content"><p>${d.body}</p>${d.key?`<p class="key-rule">关键：${d.key}</p>`:""}</div></details>`).join("")}</div></section>`}
  function inquiryPrinciple(q){
    const p=q.principle||{};
    return`<aside class="inquiry-principle"><div class="principle-head"><span>${p.kind||"判断依据"}</span><b>${p.title||q.title}</b></div>${p.formula?`<div class="principle-formula">${p.formula}</div>`:""}${p.meaning?`<p><strong>含义：</strong>${p.meaning}</p>`:""}${p.conditions?`<p><strong>适用条件：</strong>${p.conditions}</p>`:""}</aside>`;
  }
  function inquiryCard(x,q,i){
    const key=inquiryKey(x,q),attempt=inquiryAttempt(x,q),wrongIds=attempt.wrongIds||[],order=inquiryOrder(x,q),legacy=state.notes[`${x.id}-${i}`]||"";
    const lastWrong=wrongIds.length?inquiryOption(q,attempt.selectedId):null;
    const status=attempt.completed?`✓ 判断正确；共尝试 ${attempt.attempts} 次，已记录到学习档案。`:lastWrong?`已排除 ${wrongIds.length} 项。本次原因：${lastWrong.reason} 读完后可继续选择，页面不会锁住。`:"选择后立即反馈；答错可以继续尝试。";
    return`<article class="inquiry-card ${attempt.completed?"is-complete":""}" data-inquiry-card="${key}" role="group" aria-labelledby="inquiry-title-${q.id}"><span class="inquiry-no" aria-hidden="true">${i+1}</span><div class="inquiry-main"><div class="inquiry-meta"><span>单选题 · 选项已乱序</span><span>第 ${i+1} / ${x.inquiries.length} 题</span></div><h3 id="inquiry-title-${q.id}">${q.title}</h3><p>${q.prompt}</p><div class="inquiry-status ${attempt.completed?"is-success":""}" data-inquiry-status role="status" aria-live="polite" tabindex="-1">${status}</div><div class="inquiry-options">${order.map((id,displayIndex)=>{const o=inquiryOption(q,id),wrong=wrongIds.includes(id),right=attempt.completed&&o.correct,blocked=wrong||attempt.completed;return`<button type="button" class="inquiry-option ${wrong?"is-wrong":""} ${right?"is-correct":""}" data-inquiry-choice="${q.id}" data-option-id="${id}" aria-disabled="${blocked}" tabindex="${blocked?-1:0}" ${wrong?`aria-describedby="reason-${q.id}-${id}"`:""}><span class="inquiry-option-label">${String.fromCharCode(65+displayIndex)}</span><span class="inquiry-option-body"><span class="inquiry-option-text">${o.text}</span>${wrong?`<span class="inquiry-wrong-reason" id="reason-${q.id}-${id}"><b>× 已排除 · 为什么不对：</b>${o.reason}</span>`:""}${right?`<span class="inquiry-right-mark">✓ 判断正确</span>`:""}</span></button>`}).join("")}</div>${wrongIds.length||attempt.completed?inquiryPrinciple(q):""}${attempt.completed?`<div class="inquiry-correct-feedback"><b>把判断说完整：</b>${q.correctFeedback}</div>`:""}${legacy?`<details class="legacy-inquiry-note"><summary>查看升级前保存的文字判断</summary><p>${esc(legacy)}</p></details>`:""}<div class="inquiry-actions"><small>需要帮助时，FUMI AI只读取当前题目与已选内容；答对前不会收到答案或错因。</small><button class="ask-ai-btn" type="button" data-ai-inquiry="${q.id}" aria-label="就“${esc(q.title)}”询问 FUMI AI">✦ 问 FUMI AI</button></div></div></article>`;
  }
  function inquiry(x){const completed=x.inquiries.filter(q=>inquiryAttempt(x,q).completed).length;return`<section class="inquiry-section"><div class="inquiry-heading"><div><span class="tag orange">导学案任务</span><h2>先带着问题观察</h2><p>选项首次进入时随机排列，刷新后保持不变。错选会被划掉并显示具体原因；涉及公式或规律时同步展开判断依据。</p></div><span class="tag green" data-inquiry-progress>${completed}/${x.inquiries.length} 已完成</span></div><div class="inquiry-flow">${x.inquiries.map((q,i)=>inquiryCard(x,q,i)).join("")}</div></section>`}
  function concepts(x){return`<div class="concept-bridge"><article class="bridge-side guide"><h3>导学案怎样提出问题</h3><p>${x.bridge.guide}</p></article><div class="bridge-arrow">→</div><article class="bridge-side explain"><h3>知识解读怎样补全</h3><p>${x.bridge.explain}</p></article></div><h2>把观察整理成规律</h2><div class="concept-grid">${x.concepts.map(c=>`<article class="concept-card"><b>${c.title}</b><p>${c.text}</p></article>`).join("")}</div><div class="formula-card">${x.formula}</div>`}
  function stepAnalysis(q){
    const n=Math.min(state.steps[q.id]||0,q.steps.length-1),st=q.steps[n];
    return`<section class="step-analysis"><div class="analysis-answer"><span>正确答案：${q.answerText||answerLabel(q)}</span><span>${q.source||"资料题"}</span></div><div class="step-visual">${SVG.solution(q,n)}</div><article class="step-card ${st.important?"important":""}"><div class="step-label"><span>STEP ${n+1}/${q.steps.length}</span><span>${st.important?"关键步骤":"逐步解析"}</span></div><h4>${st.title}</h4><p>${st.text}</p>${st.formula?`<div class="step-formula">${st.formula}</div>`:""}</article><div class="step-controls"><button class="btn small" data-step-prev="${q.id}" ${n===0?"disabled":""}>← 上一步</button><div class="step-indicators">${q.steps.map((_,i)=>`<i class="${i<=n?"on":""}"></i>`).join("")}</div><button class="btn small primary" data-step-next="${q.id}" ${n===q.steps.length-1?"disabled":""}>下一步 →</button></div><div class="mistake-note"><b>易错提醒：</b>${q.mistake}</div></section>`;
  }
  function qCard(q,optional=false){
    if(!q)return`<article class="lesson-question ${optional?"optional":""}"><p class="muted">题目正在校对中。</p></article>`;
    const a=state.answers[q.id],submitted=!!state.submitted[q.id],correct=submitted&&same(q,a);
    return`<article class="lesson-question ${optional?"optional":""}" data-question-id="${q.id}"><div class="question-source"><b>${optional?"培优挑战 · 不计必做进度":q.point}</b><span>${q.source||"专题训练"} · ${q.difficulty}</span></div><div class="question-ai-row"><div class="question-stem">${q.prompt}</div><button class="ask-ai-btn" data-ai-question="${q.id}">✦ 问 FUMI AI</button></div>${q.type==="multiple"?`<p class="multi-hint">多选题 · 可选择多个答案</p>`:""}${q.image?`<div class="question-figure"><img src="${q.image}" alt="${esc(q.imageAlt||q.point+"原题图")}"></div>`:""}<div class="question-options">${q.options.map((o,i)=>{const picked=q.type==="multiple"?Array.isArray(a)&&a.includes(i):Number(a)===i;const isRight=q.type==="multiple"?q.answer.includes(i):q.answer===i;return`<button data-answer="${q.id}" data-index="${i}" ${submitted?"disabled":""} class="${picked?"selected":""} ${submitted&&isRight?"correct":""} ${submitted&&picked&&!isRight?"wrong":""}"><b>${String.fromCharCode(65+i)}.</b> ${o}</button>`}).join("")}</div><div class="question-actions-inline"><span class="question-status">${submitted?(correct?"✓ 已答对并同步":"已提交 · 请定位第一处差异"):"提交前不显示答案"}</span>${submitted?"":`<button class="btn primary" data-submit-question="${q.id}">提交后查看完整解析</button>`}</div>${submitted?stepAnalysis(q):""}</article>`;
  }
  function practice(x){
    const req=x.requiredIds.map(getQuestion),opt=x.challengeIds.map(getQuestion),submitted=req.filter(q=>q&&state.submitted[q.id]),correct=submitted.filter(q=>same(q,state.answers[q.id])).length;
    return`<section class="lesson-practice"><div class="lesson-practice-head"><div><span class="tag green">基础练习 · 必做</span><h2>用题目确认刚才的理解</h2><p>均选自对应《专题训练》，以基础和低中档为主；提交后显示原解析逻辑与重绘分析图。</p></div><span class="tag">${submitted.length}/${req.length} 已提交</span></div><div class="lesson-question-list">${req.map(q=>qCard(q)).join("")}</div><div class="lesson-practice-head" style="margin-top:28px"><div><span class="tag orange">OPTIONAL</span><h2>培优挑战</h2><p>不计入必做进度，难度不超过中等。</p></div></div><div class="lesson-question-list">${opt.map(q=>qCard(q,true)).join("")}</div><div class="lesson-summary"><article><b>${submitted.length}/${req.length}</b><span>必做题已提交</span></article><article><b>${submitted.length?Math.round(correct/submitted.length*100):"—"}${submitted.length?"%":""}</b><span>当前正确率</span></article><article><b>${opt.filter(q=>q&&state.submitted[q.id]).length}</b><span>培优挑战已完成</span></article></div>${submitted.length&&correct/submitted.length<.7?`<div class="support-message">📌 当前样本中的正确率低于70%。建议先回看本节“深化点拨”和错题的第一处判断差异；页面不会锁住下一节。</div>`:""}</section>`;
  }
  function lessonStage(x){return`<article class="stage-card"><div class="lesson-kicker"><span class="tag">${x.code}</span><span class="tag orange">${x.minutes} MIN</span><span class="tag green">导学案 × 教学设计 × 知识解读</span></div><h1>${x.title}</h1><p class="task-intro"><b>本节任务：</b>${x.mission}</p><div class="lesson-goal"><div class="goal-card"><b>完成后我能做到</b>${x.goal}</div><div class="prereq-card"><b>开始前补给</b>${x.prerequisite}</div></div>${inquiry(x)}${concepts(x)}${lab(x)}${deepens(x)}${practice(x)}<div class="stage-actions"><button class="btn" data-prev-stage>← 上一步</button><button class="btn primary" data-complete-section="${x.id}">${state.done[x.id]?"已记录 · 进入下一节":"记录本节并继续 →"}</button></div></article>`}
  function bindCommon(x){
    x.inquiries.forEach((q,i)=>bindInquiryCard(x,q,i));
    const values=()=>{const out={};x.lab.controls.forEach(c=>out[c.id]=(state.labs[x.id]||{})[c.id]??c.value);return out};
    document.querySelectorAll("[data-lab-control]").forEach(c=>c.oninput=()=>{state.labs[x.id] ||= {};state.labs[x.id][c.dataset.labControl]=c.type==="range"?Number(c.value):c.value;localStorage.setItem(KEY,JSON.stringify(state));document.querySelector("[data-lab-canvas]").innerHTML=SVG.lesson(x.id,values());document.querySelector(`[data-lab-value="${c.dataset.labControl}"]`)?.replaceChildren(document.createTextNode(c.value))});
    document.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{const q=getQuestion(b.dataset.answer),i=Number(b.dataset.index);if(q.type==="multiple"){const a=Array.isArray(state.answers[q.id])?[...state.answers[q.id]]:[];state.answers[q.id]=a.includes(i)?a.filter(v=>v!==i):[...a,i]}else state.answers[q.id]=i;save();renderStage()});
    document.querySelectorAll("[data-submit-question]").forEach(b=>b.onclick=()=>{const q=getQuestion(b.dataset.submitQuestion),a=state.answers[q.id];if(a===undefined||(Array.isArray(a)&&!a.length)){S.toast("请先选择答案");return}state.submitted[q.id]=true;state.steps[q.id]=0;const ok=same(q,a),optional=x.challengeIds.includes(q.id);S.upsert({id:`ch10-${optional?"challenge":"question"}-${q.id}`,questionId:q.id,subject:"physics",chapter:x.code,point:q.point,dimension:q.dimension,type:"question",source:optional?"chapter10-challenge":"chapter10-learning",submitted:true,correct:ok,answer:a,confidence:false,overconfident:false,errorTag:ok?"":q.mistake,difficulty:q.difficulty,optional});save();renderStage();S.toast(ok?"回答正确，完整解析已展开":"已提交；从第一步开始定位差异")});
    document.querySelectorAll("[data-ai-question]").forEach(b=>b.onclick=()=>{const q=getQuestion(b.dataset.aiQuestion),submitted=!!state.submitted[q.id];window.FUMI_AI_OPEN(aiQuestionContext(q,x,submitted),submitted?"我已经提交这道题，请根据完整题目和图示帮我核对第一处关键判断。":"我正在看这道题，请先帮我确定研究对象和第一步，不要公布选项答案或最终数值。")});
    document.querySelectorAll("[data-step-prev]").forEach(b=>b.onclick=()=>{state.steps[b.dataset.stepPrev]=Math.max(0,(state.steps[b.dataset.stepPrev]||0)-1);save();renderStage()});
    document.querySelectorAll("[data-step-next]").forEach(b=>b.onclick=()=>{const q=getQuestion(b.dataset.stepNext);state.steps[q.id]=Math.min(q.steps.length-1,(state.steps[q.id]||0)+1);save();renderStage()});
    document.querySelector("[data-prev-stage]")?.addEventListener("click",()=>{state.current=Math.max(0,state.current-1);save();renderStage();window.scrollTo({top:0,behavior:"smooth"})});
    document.querySelector("[data-complete-section]")?.addEventListener("click",()=>{const req=x.requiredIds.map(getQuestion).filter(Boolean),submitted=req.filter(q=>state.submitted[q.id]),correct=submitted.filter(q=>same(q,state.answers[q.id])).length,rate=submitted.length?Math.round(correct/submitted.length*100):null,needsReview=submitted.length<req.length||(rate!==null&&rate<70),inquiryCompleted=x.inquiries.filter(q=>inquiryAttempt(x,q).completed).length;state.done[x.id]=true;S.upsert({id:`ch10-section-${x.id}`,subject:"physics",chapter:x.code,point:x.title,type:"lesson",source:"chapter10-learning",completed:true,submittedCount:submitted.length,requiredCount:req.length,inquiryCompletedCount:inquiryCompleted,inquiryCount:x.inquiries.length,score:rate,needsReview});state.current=Math.min(stages.length-1,state.current+1);save();renderStage();window.scrollTo({top:0,behavior:"smooth"});S.toast(submitted.length<req.length?`已记录；本节还有${req.length-submitted.length}道基础题可回来补做`:rate!==null&&rate<70?"已记录；建议稍后补做本节薄弱题":"本节学习已同步")});
  }
  function bindInquiryCard(x,q,i){
    const key=inquiryKey(x,q),card=document.querySelector(`[data-inquiry-card="${key}"]`);
    if(!card)return;
    card.querySelectorAll("[data-inquiry-choice]").forEach(button=>button.onclick=()=>{
      const attempt=inquiryAttempt(x,q),id=button.dataset.optionId,option=inquiryOption(q,id);
      if(!option||attempt.completed||(attempt.wrongIds||[]).includes(id))return;
      attempt.attempts=(attempt.attempts||0)+1;
      attempt.selectedId=id;
      if(option.correct)attempt.completed=true;
      else attempt.wrongIds=[...new Set([...(attempt.wrongIds||[]),id])];
      S.upsert({id:`ch10-inquiry-${q.id}`,questionId:q.id,subject:"physics",chapter:x.code,point:q.title,dimension:q.dimension,type:"inquiry",source:"chapter10-learning",submitted:!!attempt.completed,completed:!!attempt.completed,correct:!!option.correct,firstTry:!!option.correct&&attempt.attempts===1,attempts:attempt.attempts,selectedOptionId:id,wrongChoices:[...(attempt.wrongIds||[])],errorTag:attempt.wrongIds.length?"导学判断中出现过可修正的概念偏差":""});
      save();
      const oldCard=card,newMarkup=inquiryCard(x,q,i);
      oldCard.outerHTML=newMarkup;
      bindInquiryCard(x,q,i);
      const completed=x.inquiries.filter(item=>inquiryAttempt(x,item).completed).length;
      const progressEl=document.querySelector("[data-inquiry-progress]");if(progressEl)progressEl.textContent=`${completed}/${x.inquiries.length} 已完成`;
      const newCard=document.querySelector(`[data-inquiry-card="${key}"]`);
      requestAnimationFrame(()=>newCard?.querySelector("[data-inquiry-status]")?.focus());
      S.toast(option.correct?"判断正确，规律卡已展开":"已划掉这个选项；读完错因后继续判断");
    });
    card.querySelector("[data-ai-inquiry]")?.addEventListener("click",()=>{const attempt=inquiryAttempt(x,q);window.FUMI_AI_OPEN(inquiryAIContext(q,x),attempt.completed?"我已经完成这道观察题，请帮我把判断依据用自己的话讲清楚。":attempt.wrongIds.length?"我刚排除了一个选项。请只提示下一步观察或判断，不要公布正确选项。":"我正在完成这道观察题。请只提示第一个观察或判断步骤，不要直接给出正确选项。")});
  }
  function renderStage(){
    const x=section();document.querySelector("[data-stage]").innerHTML=x.type==="tasks"?taskStage():lessonStage(x);
    if(x.type==="tasks"){
      document.querySelectorAll("[data-task]").forEach(c=>c.onchange=()=>{state.tasks[c.dataset.task]=c.checked;save()});
      document.querySelector("[data-task-note]").oninput=e=>{state.notes.tasks=e.target.value;localStorage.setItem(KEY,JSON.stringify(state))};
      document.querySelector("[data-start]").onclick=()=>{state.done.tasks=true;S.upsert({id:"ch10-learning-tasks",subject:"physics",chapter:"第十章",point:"学习任务",type:"lesson",completed:true,note:state.notes.tasks||""});state.current=1;save();renderStage();window.scrollTo({top:0,behavior:"smooth"})};
    }else bindCommon(x);
  }
  window.FUMI_AI_CONTEXT=()=>{const x=section();return x.type==="tasks"?{subject:"physics",page:"第十章任务学习",chapter:"第十章",question:"第十章学习任务",studentAnswer:state.notes.tasks||"",submitted:!!state.done.tasks,canReveal:false,purpose:"tutor"}:{subject:"physics",page:"第十章任务学习",chapter:x.code,chapterId:x.code,question:x.mission,studentAnswer:x.inquiries.map(q=>{const a=inquiryAttempt(x,q),o=a.selectedId?inquiryOption(q,a.selectedId):null;return{questionId:q.id,selectedOption:o?clean(o.text):"",completed:!!a.completed}}),submitted:false,canReveal:false,purpose:"tutor"}};
  renderRail();renderStage();progress();
})();
