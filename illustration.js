'use strict';
function drawIllustration({index,b,m,x,max,y,fmt}) {
 const scene=document.getElementById('scene');
 const blue='#17365e',green='#6db580',wine='#832058',gold='#e7b976';
 const text=(x,y,t,size=16)=>`<text x="${x}" y="${y}" text-anchor="middle" style="font-size:${size}px" direction="ltr">${t}</text>`;
 let art='',title='',note='',label='';
 if(index===0){
  const scale=130/(b+m*max),len=y*scale,top=43,bottom=top+len,base=top+b*scale;
  let coil=`M 194 ${top}`;for(let i=0;i<=24;i++){coil+=` L ${i===0||i===24?194:i%2?209:179} ${top+len*i/24}`;}
  art=`<rect x="121" y="25" width="148" height="12" rx="4" fill="${blue}"/><path d="M194 37 V43" stroke="${blue}" stroke-width="3"/><path d="${coil}" fill="none" stroke="${blue}" stroke-width="3" stroke-linejoin="round"/><path d="M194 ${bottom} v18" fill="none" stroke="${blue}" stroke-width="2"/>`;
  for(let i=0;i<x;i++)art+=`<rect x="${174}" y="${bottom+18+i*6}" width="40" height="6" rx="2" fill="${gold}" stroke="${blue}" stroke-width="1"/>`;
  art+=`<path d="M135 ${top} H148 M141 ${top} V${bottom} M135 ${bottom} H148" fill="none" stroke="${wine}" stroke-width="2"/>${text(88,(top+bottom)/2+5,fmt(y)+' cm',20)}<path d="M225 ${base} H295" stroke="#a1acba" stroke-dasharray="4 4"/>${text(333,base+5,fmt(b)+' cm')}`;
  title=`${fmt(y)} ס״מ`;label=`קפיץ עם ${x} משקולות, באורך ${fmt(y)} סנטימטרים`;note=`${x===0?'ללא משקולות':x+' משקולות זהות'} · הקו המקווקו מסמן את האורך ההתחלתי. אורך הקפיץ באיור יחסי לערך שבטבלה.`;
 }else if(index===1){
  const mercury=130*Math.min(100,Math.max(0,y))/100;
  art=`<path d="M120 55 V201 Q120 215 134 215 H246 Q260 215 260 201 V55" fill="#f4f9fc" stroke="${blue}" stroke-width="3"/><path d="M122 122 Q156 116 191 122 T258 122 V201 Q258 213 246 213 H134 Q122 213 122 201Z" fill="#b9deeb"/><path d="M114 55 H267" stroke="${blue}" stroke-width="3"/><rect x="110" y="222" width="161" height="13" rx="5" fill="${blue}"/><path d="M134 222 H246" stroke="${gold}" stroke-width="5"/><rect x="325" y="49" width="18" height="153" rx="9" fill="#edf0f4" stroke="${blue}" stroke-width="2"/><rect x="331" y="${192-mercury}" width="6" height="${mercury+7}" rx="3" fill="${wine}"/><circle cx="334" cy="207" r="16" fill="${wine}" stroke="${blue}" stroke-width="2"/>`;
  for(const t of [0,25,50,75,100])art+=`<path d="M349 ${192-t*1.3} h8" stroke="${blue}"/>${text(379,197-t*1.3,String(t))}`;
  art+=text(334,28,'°C',18)+text(190,173,fmt(y)+'°C',26);
  title=`${fmt(y)} מעלות`;label=`כלי מים ומדחום המציג ${fmt(y)} מעלות צלזיוס`;note='הטמפרטורה עולה במדחום; כמות המים נשארת קבועה. מד החום נע בין 0 ל־100 מעלות.';
 }else if(index===2){
  // The full bar is the displayed observation range, never an invented storage limit.
  const total=b+m*max,initial=300*b/total,added=300*(y-b)/total;
  art=`<path d="M175 98 C137 98 136 49 169 45 C183 9 237 12 251 45 C292 36 311 97 269 98Z" fill="#edf3f9" stroke="${blue}" stroke-width="2.5"/>${text(222,73,'MB '+fmt(y),23)}`;
  for(let i=0;i<x;i++){const a=85+i*31;art+=`<g transform="translate(${a},122)"><rect width="25" height="31" rx="4" fill="#fff" stroke="${blue}" stroke-width="1.5"/><circle cx="17" cy="8" r="3" fill="${gold}"/><path d="M4 25 L11 15 L21 25Z" fill="${green}"/></g>`;}
  art+=`<rect x="85" y="180" width="300" height="18" rx="5" fill="#e8edf2"/><rect x="85" y="180" width="${initial}" height="18" fill="${blue}"/><rect x="${85+initial}" y="180" width="${added}" height="18" fill="${green}"/>${text(85,221,'0')}${text(365,221,fmt(total)+' MB')}`;
  title=`${fmt(y)} MB תפוסים`;label=`${x} תמונות נוספו. ${fmt(b)} מגהבייט קיימים ועוד ${fmt(y-b)} מגהבייט חדשים`;note=`${fmt(b)} MB קיימים בכחול + ${fmt(y-b)} MB שנוספו בירוק. קצה המד הוא סוף טווח החקר, ולא מגבלת האחסון בענן.`;
 }else{
  const pct=Math.min(100,Math.max(0,y)),height=94*pct/100;
  art=`<rect x="158" y="13" width="148" height="232" rx="23" fill="${blue}"/><rect x="165" y="20" width="134" height="218" rx="18" fill="#f2f6fa"/><rect x="208" y="26" width="48" height="6" rx="3" fill="${blue}"/><rect x="218" y="54" width="28" height="7" rx="2" fill="${blue}"/><rect x="195" y="63" width="74" height="106" rx="9" fill="#e0e7ee" stroke="${blue}" stroke-width="2"/><rect x="201" y="${163-height}" width="62" height="${height}" rx="4" fill="${pct<=20?gold:green}"/>${text(232,204,fmt(pct)+'%',28)}<path d="M210 227 H254" stroke="${blue}" stroke-width="3" stroke-linecap="round"/>`;
  title=pct===0?'הסוללה התרוקנה':`${fmt(pct)}% סוללה`;label=`טלפון עם סוללה מלאה ב־${fmt(pct)} אחוזים`;note='גובה המילוי מייצג את אחוז הטעינה מתוך 100%. כשהטעינה מגיעה ל־0%, הסוללה ריקה והתהליך נעצר.';
 }
 scene.innerHTML=`<title id="scene-title">${label}</title><desc id="scene-description">${note}</desc>${art}`;
 document.getElementById('scene-value').textContent=title;
 document.getElementById('scene-note').textContent=note;
 scene.dataset.value=y;scene.dataset.scenario=index;
}
