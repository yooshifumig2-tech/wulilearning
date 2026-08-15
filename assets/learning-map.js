(function(){
  "use strict";

  const S=window.FUMI_STORE;
  const D9=window.FUMI_PHYSICS;
  const D10=window.FUMI_CH10;
  const requestedChapter=new URLSearchParams(location.search).get("chapter");
  const isChapter10=requestedChapter==="10";
  const scope=isChapter10?"physics10":"physics";
  const chapterNumber=isChapter10?"10":"9";
  const chapterName=isChapter10?"静电场中的能量":"静电场及其应用";
  const chapterLabel=isChapter10?"第十章":"第九章";
  const dimensions=isChapter10
    ?[...(D10?.dimensions||["符号规范","能量模型","空间关系","图像理解","电容动态分析","运动建模"])]
    :["概念识别","模型建构","数学运算","图像理解","实验探究","迁移应用"];
  const sectionData=isChapter10?(D10?.sections||[]):(D9?.chapters||[]);
  const inquiryTotal=isChapter10?(D10?.inquiryTotal||sectionData.reduce((sum,section)=>sum+(section.inquiries?.length||0),0)):0;
  const chapterBranches=sectionData.map(section=>({
    id:isChapter10?section.code:section.id,
    title:section.title||"",
    subtitle:section.subtitle||"",
    points:[...(section.points||[])]
  }));
  const chapterIds=new Set(chapterBranches.map(ch=>ch.id));
  const steps={
    O:{title:"O · 客观事实",hint:"我实际完成了什么？发生了什么？"},
    R:{title:"R · 感受反应",hint:"哪里顺利、犹豫或意外？"},
    I:{title:"I · 解释意义",hint:"这些证据说明了什么？"},
    D:{title:"D · 行动决定",hint:"下一步具体做什么？"}
  };
  let internalStoreWrite=false;

  function belongsToChapter(event){
    if(event.subject!=="physics")return false;
    const id=String(event.id||"");
    const chapter=String(event.chapter||"");
    if(isChapter10){
      return id.startsWith("ch10-")||chapterIds.has(chapter)||chapter==="第十章";
    }
    return !id.startsWith("ch10-")&&chapterIds.has(chapter);
  }

  function evs(){
    return Object.values(S.load().events||{}).filter(belongsToChapter);
  }

  function branches(){
    return chapterBranches;
  }

  function coreQuestion(event){
    return event.type==="question"&&event.submitted&&(!isChapter10||event.optional!==true);
  }

  function pointStatus(chapterId,knowledgePoint){
    const all=evs();
    const samePoint=all.filter(event=>event.chapter===chapterId&&event.point===knowledgePoint);
    const submitted=samePoint.filter(coreQuestion);
    const graded=submitted.filter(event=>typeof event.correct==="boolean");
    const learned=samePoint.some(event=>event.type==="lesson"&&event.completed)
      ||all.some(event=>event.chapter===chapterId&&event.type==="lesson"&&event.completed);
    if(graded.length){
      const rate=graded.filter(event=>event.correct).length/graded.length;
      return{cls:rate>=.75?"mastered":"weak",label:`${Math.round(rate*100)}% · ${graded.length}题`};
    }
    if(submitted.length)return{cls:"learning",label:`已完成${submitted.length}道过程题`};
    return{cls:learned?"learning":"",label:learned?"本节已学习":"待形成证据"};
  }

  function noteKey(chapterId,point){
    return`${scope}:${chapterId}:${point}`;
  }

  function configurePage(){
    document.title=`${chapterLabel}思维导图与ORID｜FUMI 学习轨迹`;
    document.querySelector("[data-page-title]").textContent=`${chapterLabel}思维导图与 ORID`;
    document.querySelector("[data-page-lead]").textContent=isChapter10
      ?"五次任务学习、每节练习、章末30题与培优挑战共享本地证据。第十章的思维导图、六项专属指标和ORID与第九章分开保存，切换章节不会覆盖原记录。"
      :"物理学习页与刷题页共享本地证据。第九章原有思维导图、节点备注和ORID保持不变；自动内容不会覆盖你的文字。";
    document.querySelector("[data-report-note]").textContent=isChapter10
      ?"只依据已提交且可客观判分的第十章必做题计算；培优挑战单独保留证据，不计入核心掌握度。未达标只提示补弱点，不锁定后续学习。"
      :"只依据已经提交且能够客观判分的第九章题目计算；实验与计算过程题显示为“已完成”，不自动判错。";
    document.querySelectorAll("[data-chapter-tab]").forEach(tab=>tab.classList.toggle("active",tab.dataset.chapterTab===chapterNumber));
    const learn=document.querySelector("[data-learn-link]");
    const practice=document.querySelector("[data-practice-link]");
    const archive=document.querySelector("[data-archive-link]");
    learn.href=isChapter10?"chapter10-learn.html":"physics-learn.html";
    learn.textContent=isChapter10?"第10章学习":"第9章学习";
    practice.href=isChapter10?"chapter10-practice.html":"physics-practice.html";
    practice.textContent=isChapter10?"第10章刷题":"第9章刷题";
    archive.href=`learning-map.html?chapter=${chapterNumber}`;
  }

  function parents(){
    document.querySelector("[data-dialog-parent]").innerHTML=branches().map(ch=>`<option value="${S.esc(ch.id)}">${S.esc(ch.id)} ${S.esc(ch.title)}</option>`).join("");
  }

  function renderMap(){
    const store=S.load();
    const custom=(store.customBranches||[]).filter(branch=>branch.subject===scope);
    const bs=branches();
    document.querySelector("[data-map-note]").textContent=isChapter10
      ?"一级分支按教材第十章五节；二级分支对应任务学习中的核心知识点。第9章与第10章的自定义内容分别保存。"
      :"一级分支严格按教材第九章四节；二级分支对应核心知识点。";
    document.querySelector("[data-mindmap]").innerHTML=`
      <div class="mind-root">
        <div class="root-node">${chapterLabel}<br>${chapterName}</div>
        <div class="branches">
          ${bs.map(ch=>`
            <div class="branch">
              <button class="branch-head" data-edit-note="${S.esc(ch.id)}|__branch">
                <b>${S.esc(ch.id)} ${S.esc(ch.title)}</b>
                <small>${S.esc(ch.subtitle)}</small>
              </button>
              <div class="branch-children">
                ${ch.points.map(p=>{
                  const status=pointStatus(ch.id,p);
                  const note=(store.nodeNotes||{})[noteKey(ch.id,p)];
                  return`<button class="mind-node ${status.cls}" data-edit-note="${S.esc(ch.id)}|${S.esc(p)}"><strong>${S.esc(p)}</strong><small>${S.esc(status.label)}</small>${note?`<small>✎ ${S.esc(note)}</small>`:""}</button>`;
                }).join("")}
                ${custom.filter(branch=>branch.parent===ch.id).map(branch=>`<button class="mind-node custom-node" data-edit-custom="${S.esc(branch.id)}"><strong>${S.esc(branch.name)}</strong><small>自定义分支 · 点击编辑</small>${branch.note?`<small>${S.esc(branch.note)}</small>`:""}</button>`).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>`;
    document.querySelectorAll("[data-edit-custom]").forEach(button=>button.onclick=()=>openCustom(button.dataset.editCustom));
    document.querySelectorAll("[data-edit-note]").forEach(button=>button.onclick=()=>openNote(...button.dataset.editNote.split("|")));
    parents();
  }

  const dialog=document.querySelector("[data-dialog]");
  const nameEl=document.querySelector("[data-dialog-name]");
  const noteEl=document.querySelector("[data-dialog-note]");
  const idEl=document.querySelector("[data-dialog-id]");
  const parentEl=document.querySelector("[data-dialog-parent]");
  const deleteButton=document.querySelector("[data-dialog-delete]");

  function add(){
    idEl.value="";
    nameEl.value="";
    noteEl.value="";
    nameEl.disabled=false;
    parentEl.disabled=false;
    deleteButton.classList.add("hidden");
    document.querySelector("[data-dialog-title]").textContent=`添加${chapterLabel}子分支`;
    dialog.showModal();
  }

  function openCustom(id){
    const branch=(S.load().customBranches||[]).find(item=>item.id===id&&item.subject===scope);
    if(!branch)return;
    idEl.value=id;
    nameEl.value=branch.name;
    noteEl.value=branch.note||"";
    parentEl.value=branch.parent;
    nameEl.disabled=false;
    parentEl.disabled=false;
    deleteButton.classList.remove("hidden");
    document.querySelector("[data-dialog-title]").textContent="编辑自定义分支";
    dialog.showModal();
  }

  function openNote(chapterId,point){
    idEl.value=`note:${scope}:${chapterId}:${point}`;
    nameEl.value=point==="__branch"?chapterId:point;
    nameEl.disabled=true;
    noteEl.value=(S.load().nodeNotes||{})[noteKey(chapterId,point)]||"";
    parentEl.value=chapterId;
    parentEl.disabled=true;
    deleteButton.classList.add("hidden");
    document.querySelector("[data-dialog-title]").textContent=point==="__branch"?"编辑一级分支备注":"编辑知识点备注";
    dialog.showModal();
  }

  function saveStore(store){
    internalStoreWrite=true;
    S.save(store);
    internalStoreWrite=false;
  }

  document.querySelector("[data-dialog-save]").onclick=event=>{
    event.preventDefault();
    const store=S.load();
    const id=idEl.value;
    store.customBranches=store.customBranches||[];
    store.nodeNotes=store.nodeNotes||{};
    if(id.startsWith("note:")){
      const parts=id.split(":");
      const noteScope=parts[1],chapterId=parts[2],point=parts.slice(3).join(":");
      store.nodeNotes[`${noteScope}:${chapterId}:${point}`]=noteEl.value.trim();
    }else if(id){
      const branch=store.customBranches.find(item=>item.id===id&&item.subject===scope);
      if(branch){
        branch.name=nameEl.value.trim()||branch.name;
        branch.note=noteEl.value.trim();
        branch.parent=parentEl.value;
      }
    }else{
      store.customBranches.push({
        id:`branch-${scope}-${Date.now()}`,
        subject:scope,
        parent:parentEl.value,
        name:nameEl.value.trim()||"新分支",
        note:noteEl.value.trim()
      });
    }
    saveStore(store);
    dialog.close();
    render();
    S.toast("思维导图已更新");
  };

  deleteButton.onclick=event=>{
    event.preventDefault();
    const store=S.load();
    store.customBranches=(store.customBranches||[]).filter(item=>!(item.id===idEl.value&&item.subject===scope));
    saveStore(store);
    dialog.close();
    render();
    S.toast("自定义分支已删除");
  };
  document.querySelector("[data-add-branch]").onclick=add;

  function summary(){
    const all=evs();
    const allSubmitted=all.filter(event=>event.type==="question"&&event.submitted);
    const optional=allSubmitted.filter(event=>event.optional===true);
    const qs=isChapter10?allSubmitted.filter(event=>event.optional!==true):allSubmitted;
    const graded=qs.filter(event=>typeof event.correct==="boolean");
    const learn=all.filter(event=>event.type==="lesson"&&event.completed&&chapterIds.has(String(event.chapter||"")));
    const completedSections=branches().filter(ch=>learn.some(event=>event.chapter===ch.id)).length;
    const correct=graded.filter(event=>event.correct).length;
    const wrong=graded.filter(event=>!event.correct);
    const over=graded.filter(event=>event.overconfident);
    const inquiries=all.filter(event=>event.type==="inquiry");
    const inquiryCompleted=inquiries.filter(event=>event.completed);
    const inquiryCorrected=inquiryCompleted.filter(event=>event.firstTry===false);
    const strength=[...new Set(graded.filter(event=>event.correct).map(event=>event.point).filter(Boolean))].slice(0,3);
    const weak=[...new Set(wrong.map(event=>event.point).filter(Boolean))].slice(0,3);
    return{
      all,qs,graded,learn,optional,inquiries,inquiryCompleted,inquiryCorrected,completedSections,correct,wrong,over,strength,weak,
      rate:graded.length?Math.round(correct/graded.length*100):0
    };
  }

  function draft(step){
    const x=summary();
    if(step==="O"){
      return`${chapterLabel}目前完成${x.completedSections}/${branches().length}节学习，${isChapter10?`完成${x.inquiryCompleted.length}/${inquiryTotal}道导学观察判断，`:""}记录${x.qs.length}道核心题作答；其中可客观判分${x.graded.length}题，答对${x.correct}题，当前正确率为${x.rate}%。${isChapter10&&x.inquiryCorrected.length?`有${x.inquiryCorrected.length}道导学判断经过排除错项后完成自我修正。`:""}${x.optional.length?`另外完成${x.optional.length}道不计入必做进度的培优挑战。`:""}${x.over.length?`其中${x.over.length}题属于“有把握但做错”。`:""}`;
    }
    if(step==="R"){
      return x.qs.length
        ?`我在${x.strength.length?x.strength.join("、"):"已经答对的部分"}上相对顺利；在${x.weak.length?x.weak.join("、"):"证据仍较少的知识点"}需要更慢地读题、画图并核对符号。`
        :"我还没有提交足够题目，暂时不能只凭感觉判断掌握情况。";
    }
    if(step==="I"){
      return x.qs.length
        ?`现有证据表明，${x.strength.length?`${x.strength.join("、")}相对稳定`:"稳定知识点仍需更多证据"}；${x.weak.length?`${x.weak.join("、")}应优先回看`:"暂未发现明确薄弱点"}。这一判断只基于当前已提交题，未测内容不作推断。`
        :"当前样本不足，应先完成每节代表题，再解释自己的掌握结构。";
    }
    if(x.weak.length){
      return`下一步先回到${x.weak[0]}：①重看对应任务问题和知识解读；②重画物理过程图并核对符号；③重做错题；④再完成1道同类变式题。系统只提示补弱点，不会锁定后续章节。`;
    }
    const unfinished=branches().find(ch=>!x.learn.some(event=>event.chapter===ch.id));
    return unfinished
      ?`下一步完成${unfinished.id} ${unfinished.title}的任务学习和代表题，再用新的作答证据更新本页。当前进度不会被强制锁定。`
      :"下一步补足尚未作答的能力维度，并选一道错因最典型的题进行15分钟图解复盘。";
  }

  function writeOrid(step,text){
    internalStoreWrite=true;
    S.setOrid(step,text,scope);
    internalStoreWrite=false;
  }

  function renderOrid(){
    const saved=S.load().orid?.[scope]||{};
    document.querySelector("[data-orid]").innerHTML=Object.entries(steps).map(([key,value])=>`
      <article class="orid-step" data-orid-step="${key}">
        <header><h3>${value.title}</h3><span class="tag">${chapterLabel} · 可编辑</span></header>
        <p class="muted">${value.hint}</p>
        <textarea placeholder="写下你的${value.title}…">${S.esc(saved[key]||"")}</textarea>
        <div class="orid-actions"><button class="btn small" data-sync-step="${key}">同步做题情况</button><button class="btn small" data-draft-step="${key}">自动编辑本步</button></div>
      </article>`).join("");
    document.querySelectorAll("[data-orid-step] textarea").forEach(area=>{
      area.oninput=()=>writeOrid(area.closest("[data-orid-step]").dataset.oridStep,area.value);
    });
    document.querySelectorAll("[data-sync-step]").forEach(button=>{
      button.onclick=()=>{
        const area=document.querySelector(`[data-orid-step="${button.dataset.syncStep}"] textarea`);
        const text=draft(button.dataset.syncStep);
        area.value=area.value.trim()?`${area.value.trim()}\n\n【${chapterLabel}证据同步】\n${text}`:text;
        writeOrid(button.dataset.syncStep,area.value);
        S.toast(`${button.dataset.syncStep}步骤已同步`);
      };
    });
    document.querySelectorAll("[data-draft-step]").forEach(button=>{
      button.onclick=()=>{
        const area=document.querySelector(`[data-orid-step="${button.dataset.draftStep}"] textarea`);
        area.value=draft(button.dataset.draftStep);
        writeOrid(button.dataset.draftStep,area.value);
        S.toast(`${button.dataset.draftStep}步骤已自动编辑`);
      };
    });
  }

  function evidenceLabel(event){
    if(event.type==="question"){
      if(!event.submitted)return"题目尚未提交";
      if(typeof event.correct==="boolean")return`${event.correct?"答对":"答错"}${event.confidence?" · 有把握":""}${event.optional?" · 培优挑战":""}`;
      return`过程作答已完成${event.optional?" · 培优挑战":""}`;
    }
    if(event.type==="inquiry"){
      if(event.completed)return event.firstTry?"导学观察判断 · 一次答对":`导学观察判断已修正 · 共尝试${event.attempts||1}次`;
      return`导学观察判断中 · 已排除${event.wrongChoices?.length||0}项`;
    }
    if(event.type==="lesson")return event.completed?"完成学习":"学习中";
    return"AI识别的可能误区";
  }

  function renderEvidence(){
    const all=evs().sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    document.querySelector("[data-evidence]").innerHTML=all.length
      ?all.slice(0,60).map(event=>`<div class="evidence-item"><b>${S.esc(event.chapter||chapterLabel)} · ${S.esc(event.point||event.type)}</b><br>${S.esc(evidenceLabel(event))} <span class="muted">· ${new Date(event.updatedAt).toLocaleString("zh-CN")}</span></div>`).join("")
      :`<div class="evidence-item">还没有${chapterLabel}同步证据。请先进入${chapterLabel}学习或刷题页面；本页不会因此锁定其他内容。</div>`;
  }

  function dimensionStats(){
    const graded=evs().filter(event=>coreQuestion(event)&&typeof event.correct==="boolean");
    return dimensions.map(name=>{
      const qs=graded.filter(event=>event.dimension===name);
      return{name,count:qs.length,score:qs.length?Math.round(qs.filter(event=>event.correct).length/qs.length*100):null};
    });
  }

  function chapterStats(){
    const all=evs();
    return branches().map(ch=>{
      const events=all.filter(event=>event.chapter===ch.id);
      const questions=events.filter(coreQuestion);
      const graded=questions.filter(event=>typeof event.correct==="boolean");
      const lessons=events.filter(event=>event.type==="lesson"&&event.completed);
      const correct=graded.filter(event=>event.correct).length;
      const score=graded.length?Math.round(correct/graded.length*80+(lessons.length?20:0)):(lessons.length?20:0);
      return{...ch,events,questions,graded,lessons,correct,score};
    });
  }

  function report(){
    const dims=dimensionStats();
    const x=summary();
    const rated=dims.filter(dimension=>dimension.count);
    const best=[...rated].sort((a,b)=>b.score-a.score)[0];
    const weak=[...rated].filter(dimension=>dimension.count>=2).sort((a,b)=>a.score-b.score)[0];
    const process=x.qs.length-x.graded.length;
    document.querySelector("[data-report]").innerHTML=`
      <div class="metric-grid">
        ${dims.map(dimension=>`<article class="metric"><b>${dimension.score===null?"待测":`${dimension.score}%`}</b><span>${S.esc(dimension.name)} · ${dimension.count}题证据</span></article>`).join("")}
      </div>
      <div class="report-note">
        <b>${x.graded.length?`已客观判分${x.graded.length}题，当前正确率${x.rate}%`:`还没有可判分的${chapterLabel}作答证据`}</b>${process?`；另有${process}道过程题已完成，不自动判错。`:"。"}${isChapter10?` 导学观察已完成${x.inquiryCompleted.length}/${inquiryTotal}道，不计入30题正确率。`:""}<br>
        ${best?`目前${S.esc(best.name)}已有相对稳定的证据👏`:`先完成几道代表题，让报告建立在真实作答上🌱`}
        ${weak&&weak.score<70?`${S.esc(weak.name)}是下一步优先回看的方向📌；系统只提醒补弱点，不会锁定进度。`:rated.length&&rated.every(item=>item.count<2)?"每项证据暂少，继续补充后再判断薄弱点，避免用单题下结论✨。":"继续补足未测维度，结论会更可靠✨。"}
      </div>`;
  }

  function render(){
    renderMap();
    report();
    renderOrid();
    renderEvidence();
  }

  document.querySelector("[data-refresh]").onclick=()=>{
    render();
    S.toast(`已重新读取${chapterLabel}最新证据`);
  };
  document.querySelector("[data-auto-all]").onclick=()=>{
    Object.keys(steps).forEach(key=>{
      const area=document.querySelector(`[data-orid-step="${key}"] textarea`);
      const next=draft(key);
      area.value=area.value.trim()?`${area.value.trim()}\n\n—— ${chapterLabel}自动整理的新版本 ——\n${next}`:next;
      writeOrid(key,area.value);
    });
    S.toast(`${chapterLabel}ORID四步已生成可编辑初稿`);
  };
  document.addEventListener("fumi:store",()=>{if(!internalStoreWrite)render()});
  window.FUMI_AI_CONTEXT=()=>{
    const x=summary();
    return{
      subject:"physics",
      page:`${chapterLabel}思维导图与ORID`,
      chapterId:chapterNumber,
      chapter:`${chapterLabel} ${chapterName}`,
      purpose:"analysis",
      canReveal:true,
      summary:{
        completedSections:x.completedSections,
        totalSections:branches().length,
        submitted:x.qs.length,
        correct:x.correct,
        rate:x.rate,
        overconfident:x.over.length,
        optionalChallenges:x.optional.length,
        strengths:x.strength,
        weakPoints:x.weak,
        chapters:chapterStats().map(ch=>({chapter:`${ch.id} ${ch.title}`,score:ch.score,evidence:ch.questions.length})),
        dimensions:dimensionStats()
      }
    };
  };

  configurePage();
  render();
})();
