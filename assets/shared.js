(function(){
  "use strict";
  const KEY="fumi-learning-hub-v2";
  const AI_HISTORY="fumi-ai-history-v2";
  const blank=()=>({version:2,events:{},orid:{physics:{O:"",R:"",I:"",D:""},math:{O:"",R:"",I:"",D:""}},customBranches:[],nodeNotes:{},updatedAt:Date.now()});
  function load(){try{return Object.assign(blank(),JSON.parse(localStorage.getItem(KEY)||"{}"))}catch{return blank()}}
  function save(s){s.updatedAt=Date.now();localStorage.setItem(KEY,JSON.stringify(s));document.dispatchEvent(new CustomEvent("fumi:store",{detail:s}));setSaveState()}
  function upsert(event){const s=load();s.events[event.id]=Object.assign({},s.events[event.id]||{},event,{updatedAt:Date.now()});save(s);return s.events[event.id]}
  function setOrid(step,text,scope="physics"){const s=load();if(!s.orid||typeof s.orid!=="object")s.orid={};if(!s.orid[scope]||typeof s.orid[scope]!=="object")s.orid[scope]={O:"",R:"",I:"",D:""};s.orid[scope][step]=text;save(s)}
  function setSaveState(){const el=document.querySelector("[data-save-state]");if(el){el.textContent="已保存 · "+new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"});setTimeout(()=>{if(el)el.textContent="仅保存在本设备"},1800)}}
  function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
  function toast(msg){let el=document.querySelector(".toast");if(!el){el=document.createElement("div");el.className="toast";document.body.appendChild(el)}el.textContent=msg;el.classList.add("show");clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove("show"),1800)}
  function chapterStats(){
    const s=load(),chs=(window.FUMI_PHYSICS?.chapters||[]);return chs.map(ch=>{const ev=Object.values(s.events).filter(e=>e.subject==="physics"&&e.chapter===ch.id);const qs=ev.filter(e=>e.type==="question"&&e.submitted);const lessons=ev.filter(e=>e.type==="lesson"&&e.completed);const correct=qs.filter(e=>e.correct).length;const pointMap={};ev.forEach(e=>{if(!e.point)return;pointMap[e.point] ||= {seen:0,correct:0,total:0};pointMap[e.point].seen++;if(e.type==="question"&&e.submitted){pointMap[e.point].total++;if(e.correct)pointMap[e.point].correct++}});const score=qs.length?Math.round(correct/qs.length*80+Math.min(20,lessons.length*20)):lessons.length?20:0;return{...ch,events:ev,questions:qs,lessons,correct,score,pointMap}})
  }
  function dimensionStats(){
    const s=load(),dims=["概念识别","模型建构","数学运算","图像理解","实验探究","迁移应用"];
    return dims.map(name=>{const qs=Object.values(s.events).filter(e=>e.subject==="physics"&&e.type==="question"&&e.submitted&&e.dimension===name);return{name,count:qs.length,score:qs.length?Math.round(qs.filter(e=>e.correct).length/qs.length*100):null}})
  }
  function currentContext(){
    if(typeof window.FUMI_AI_CONTEXT==="function") return window.FUMI_AI_CONTEXT();
    if(window.FUMI_DATA?.questions){let st={};try{st=JSON.parse(localStorage.getItem("fumi-math-map")||"{}")}catch{}const q=window.FUMI_DATA.questions[Number(st.current)||0];return{subject:"math",page:"初中数学40分钟水平测验",chapter:q?.domain,chapterId:q?.chapter,question:q?.stem,options:q?.options,studentAnswer:q?st.answers?.[q.id]:undefined,knowledgePoint:q?.point,canReveal:st.submitted===true,submitted:st.submitted===true}}
    return{subject:document.body.dataset.subject||"general",page:document.title,canReveal:true,summary:{chapters:chapterStats().map(x=>({chapter:x.id+" "+x.title,score:x.score,evidence:x.questions.length}))}};
  }
  async function aiHealth(){try{const r=await fetch("/.netlify/functions/ai-tutor",{cache:"no-store"});const d=await r.json();return d.configured===true}catch{return false}}
  function aiMount(){
    if(document.body.dataset.ai==="off"||document.querySelector(".ai-fab"))return;
    document.body.insertAdjacentHTML("beforeend",`<button class="ai-fab" type="button">✦ 问 FUMI AI</button><aside class="ai-panel" aria-label="FUMI AI助教"><div class="ai-head"><div><b>FUMI AI 助教</b><small data-ai-status>正在检查连接…</small></div><button class="ai-close" aria-label="关闭">×</button></div><div class="ai-context" data-ai-context>会根据当前学习内容与真实作答记录回答。</div><div class="ai-messages" data-ai-messages><div class="ai-msg assistant">我会先帮你找研究对象、物理过程和适用规律。题目提交前只引导步骤，不直接公布答案。</div></div><div class="ai-quick"><button>只提示第一步</button><button>检查我的思路</button><button>我卡在哪个知识点？</button><button>给我一道相似题</button></div><div class="ai-compose"><textarea maxlength="600" placeholder="写下你的问题或思路…"></textarea><button type="button">发送</button></div></aside>`);
    const panel=document.querySelector(".ai-panel"),fab=document.querySelector(".ai-fab"),messages=panel.querySelector("[data-ai-messages]"),input=panel.querySelector("textarea"),send=panel.querySelector(".ai-compose button"),status=panel.querySelector("[data-ai-status]"),ctxEl=panel.querySelector("[data-ai-context]");
    function refresh(){const c=currentContext();ctxEl.innerHTML=`当前：<b>${esc(c.chapter||c.page||"学习档案")}</b>${c.question?" · "+esc(c.question):""}${c.canReveal===false?" · 提交前保护模式":""}`}
    fab.onclick=()=>{panel.classList.add("open");refresh();aiHealth().then(ok=>status.textContent=ok?"AI 已连接":"后台未连接或缺少密钥")};panel.querySelector(".ai-close").onclick=()=>panel.classList.remove("open");
    panel.querySelectorAll(".ai-quick button").forEach(b=>b.onclick=()=>{input.value=b.textContent;send.click()});
    async function ask(){const text=input.value.trim();if(!text)return;const c=currentContext();messages.insertAdjacentHTML("beforeend",`<div class="ai-msg user">${esc(text)}</div>`);input.value="";send.disabled=true;messages.insertAdjacentHTML("beforeend",`<div class="ai-msg assistant" data-thinking>正在组织一个思考台阶…</div>`);messages.scrollTop=messages.scrollHeight;
      let history=[];try{history=JSON.parse(localStorage.getItem(AI_HISTORY)||"[]").slice(-8)}catch{}
      try{const r=await fetch("/.netlify/functions/ai-tutor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,context:c,history,purpose:c.purpose||"tutor"})});const d=await r.json();if(!r.ok)throw new Error(d.error||"AI暂时无法连接");messages.querySelector("[data-thinking]")?.remove();messages.insertAdjacentHTML("beforeend",`<div class="ai-msg assistant">${esc(d.reply)}${d.nextAction?"\n\n下一步："+esc(d.nextAction):""}</div>`);history.push({role:"user",content:text},{role:"assistant",content:d.reply});localStorage.setItem(AI_HISTORY,JSON.stringify(history.slice(-8)));if(d.misconception)upsert({id:"ai-"+Date.now(),subject:c.subject||"physics",chapter:c.chapterId||c.chapter,point:d.misconception,type:"ai-evidence",note:d.misconception})}catch(err){messages.querySelector("[data-thinking]")?.remove();messages.insertAdjacentHTML("beforeend",`<div class="ai-msg assistant">${esc(err.message)}</div>`)}finally{send.disabled=false;messages.scrollTop=messages.scrollHeight}}
    send.onclick=ask;input.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ask()}}
  }
  function syncLegacyMath(){
    if(!window.FUMI_DATA?.questions)return;let legacy;try{legacy=JSON.parse(localStorage.getItem("fumi-math-map")||"null")}catch{}if(!legacy?.answers)return;
    Object.entries(legacy.answers).forEach(([id,answer])=>{const q=window.FUMI_DATA.questions.find(x=>x.id===id);if(!q)return;const norm=v=>Array.isArray(v)?v.map(String).join("|"):String(v??"").replace(/[\s°]/g,"");const correct=norm(answer)===norm(q.answer);upsert({id:"math-"+id,subject:"math",chapter:q.domain,point:q.chapter+" · "+q.point,dimension:q.domain,type:"question",submitted:!!legacy.submitted,correct,answer,source:"math-diagnostic"})});
  }
  function mountLegacyTools(){if(!window.FUMI_DATA?.questions)return;document.body.insertAdjacentHTML("beforeend",`<div class="legacy-tools"><a href="index.html">⌂ 导航页</a><a href="learning-map.html?subject=math">思维导图与 ORID</a></div>`);syncLegacyMath();document.addEventListener("click",()=>setTimeout(syncLegacyMath,80));document.addEventListener("input",()=>setTimeout(syncLegacyMath,80))}
  window.FUMI_STORE={load,save,upsert,setOrid,chapterStats,dimensionStats,syncLegacyMath,toast,esc};
  document.addEventListener("DOMContentLoaded",()=>{setSaveState();mountLegacyTools();aiMount()});
})();
