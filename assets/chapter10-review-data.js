(function(){
  "use strict";
  const D=window.FUMI_CH10;
  if(!D)return;
  const ids=[
    "101q1","101q2","101q3","101q4","101q5","101q6",
    "102q1","102q2","102q3","102q4","102q5","102q6",
    "103q1","103q2","103q3","103q4","103q5","103q6",
    "104q1","104q2","104q3","104q4","104q5","104q6",
    "105q1","105q2","105q3","105q4","105q5","105q6"
  ];
  window.CH10_REVIEW_QUESTIONS=ids.map((id,index)=>{
    const q=D.questions[id];
    if(!q)throw new Error(`第10章题库缺少 ${id}`);
    return {...q,number:index+1,reviewId:`ch10-review-${id}`};
  });
})();
