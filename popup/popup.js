/* ---------- 工具 ---------- */
(function () {
const cats = ['img','gif','css','js','font','video','audio','other'];
function catOf(url){
  const ext = url.split(/[#?]/)[0].split('.').pop().toLowerCase();
  if(/jpe?g|png|svg|webp|bmp|ico/.test(ext)) return 'img';
  if(/gif/.test(ext))                return 'gif';
  if(/css|less|scss/.test(ext))      return 'css';
  if(/m?js|ts/.test(ext))            return 'js';
  if(/woff2?|ttf|otf|eot/.test(ext)) return 'font';
  if(/mp4|webm|mov|avi|mkv/.test(ext)) return 'video';
  if(/mp3|wav|flac|m4a|aac|ogg/.test(ext)) return 'audio';
  return 'other';
}
function fmtSize(b){
  if(b===0) return t('size_unknown');
  if(b<1024) return b+' B';
  if(b<1048576) return (b/1024).toFixed(1)+' KB';
  return (b/1048576).toFixed(1)+' MB';
}
function uniqueName(set, name){
  if(!set.has(name)) return name;
  const ext=name.lastIndexOf('.');
  const base=ext===-1?name:name.slice(0,ext);
  const suf=ext===-1?'':name.slice(ext);
  let idx=1;
  while(set.has(`${base}(${idx})${suf}`)) idx++;
  return `${base}(${idx})${suf}`;
}

/* ---------- 状态 ---------- */
let allRes=[], filtRes=[], selected=new Set(), curCat='';
let cfg={};
chrome.storage.sync.get({
  dark:true, folder:true, head:true, skipError:true,
  includeHtml:true, replacePath:true, keepQuery:false,
  keepOriginalPath:false   // ⬅️ 新增
}, items=> cfg=items );

/* ---------- 初始化 ---------- */
window.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  document.getElementById('search').oninput = filterAndRender;
  document.getElementById('selAll').onclick = () => { allRes.forEach(r => selected.add(r.url)); renderList(); };
  document.getElementById('inv').onclick  = () => { allRes.forEach(r => selected.has(r.url) ? selected.delete(r.url) : selected.add(r.url)); renderList(); };
  document.getElementById('copy').onclick = copyLinks;
  document.getElementById('down').onclick = packAndDown;
  document.getElementById('openSet').onclick = () => document.getElementById('setFrame').classList.add('show');
  document.getElementById('cats').addEventListener('click', (e) => {
    if (!e.target.classList.contains('cat')) return;
    const c = e.target.dataset.cat;
    curCat = curCat === c ? '' : c;
    renderCats();
    filterAndRender();
  });
  window.addEventListener('message', e => {
    if (e.data === 'closeSet') document.getElementById('setFrame').classList.remove('show');
    if (e.data === 'languageChanged') applyTranslations();
  });
  load();
});

/* ---------- 抓取 ---------- */
async function load(){
  try{
    const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
    const res = await chrome.scripting.executeScript({
      target:{tabId:tab.id}, func:()=> performance.getEntriesByType('resource').map(e=>({url:e.name,size:e.transferSize||e.encodedBodySize||e.decodedBodySize||0}))
    });
    allRes = res[0].result.map(r=>({...r, cat:catOf(r.url)}));
    await Promise.all(allRes.filter(r=>r.size===0).map(async r=>{
      try{ const head=await fetch(r.url,{method:'HEAD',mode:'no-cors'});
        const len=head.headers.get('Content-Length'); if(len) r.size=parseInt(len,10); }catch{}
    }));
    filterAndRender(); renderCats();
  }catch(e){
    console.error('[POPUP] 抓取失败',e);
    document.getElementById('list').innerHTML='<span data-i18n="fetch_failed"></span>'+e.message;
    applyTranslations();
  }
}

/* ---------- 分类 ---------- */
function renderCats() {
  const box = document.getElementById('cats');
  box.innerHTML = '';
  cats.forEach(c => {
    const n = allRes.filter(r => r.cat === c).length;
    if (!n) return;
    const btn = document.createElement('div');
    btn.className = 'cat';
    btn.dataset.cat = c;
    btn.textContent = `${c} (${n})`;
    if (c === curCat) btn.classList.add('on');
    box.append(btn);
  });
}

function filterAndRender(){
  const kw=document.getElementById('search').value.trim().toLowerCase();
  filtRes=allRes.filter(r=>(!curCat||r.cat===curCat)&&(!kw||r.url.toLowerCase().includes(kw)));
  renderList();
}
function renderList(){
  const box=document.getElementById('list'); box.innerHTML='';
  const cntEl=document.getElementById('resCount');
  if(cntEl) cntEl.textContent=filtRes.length;
  if(!filtRes.length){ box.innerHTML='<span data-i18n="no_content"></span>'; applyTranslations(); return; }
  filtRes.forEach(r=>{
    const div=document.createElement('div'); div.className='item';
    const chk=document.createElement('input'); chk.type='checkbox';
    chk.checked=selected.has(r.url);
    chk.onchange=e=>{e.target.checked?selected.add(r.url):selected.delete(r.url);};
    const name=document.createElement('span'); name.className='name'; name.textContent=r.url;
    const size=document.createElement('span'); size.className='size';
    size.textContent=fmtSize(r.size); size.style.color=r.size===0?'#f50':'#888';
    div.append(chk,name,size); box.append(div);
  });
  applyTranslations();
}

/* ---------- 复制 ---------- */
function copyLinks(){
  if(!selected.size) return alert(t('select_resources_first'));
  const text=[...selected].join('\n');
  navigator.clipboard.writeText(text).then(()=>
    alert(t('copy_success')+' '+selected.size+' '+t('links_copied'))
  );
}

/* ---------- 打包 ---------- */
async function packAndDown(){
  if(!selected.size) return alert(t('select_resources_first'));
  const prog=document.getElementById('prog');
  prog.textContent='0 / '+selected.size; prog.classList.remove('hide');
  const zip=new JSZip(); const arr=[...selected]; let done=0;
  const urlToPath={}; const fileNamePool={}; cats.forEach(c=>fileNamePool[c]=new Set());

  /* ⬇️ 新 genPath：支持 keepOriginalPath */
  function genPath(url){
    if(cfg.keepOriginalPath){
      const u=new URL(url);
      let p=u.pathname.slice(1);           // 去掉首 /
      if(!p||p.endsWith('/')) p+='index.html';
      return p;
    }
    const cat=catOf(url);
    const u=new URL(url);
    let name=(u.pathname.split('/').pop()||'file');
    if(cfg.keepQuery&&u.search) name+=u.search.replace(/[?&]/g,'_');
    return `${cat}/${uniqueName(fileNamePool[cat],name)}`;
  }

  if(cfg.replacePath) allRes.forEach(r=>{ urlToPath[r.url]=genPath(r.url); });
  if(cfg.includeHtml){
    try{
      const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
      const htmlRes=await chrome.scripting.executeScript({
        target:{tabId:tab.id}, func:()=>document.documentElement.outerHTML
      });
      let html=htmlRes[0].result;
      if(cfg.replacePath){
        Object.entries(urlToPath).forEach(([raw,loc])=>{
          const esc=raw.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
          html=html.replace(new RegExp(esc,'g'),loc);
        });
      }
      zip.file('index.html',html);
    }catch(e){ console.warn('获取 HTML 失败',e); }
  }
  for(const url of arr){
    try{ const res=await fetch(url); const blob=await res.blob();
      const path=cfg.replacePath ? urlToPath[url] : genPath(url);
      const parts=path.split('/'), file=parts.pop();
      const folder=parts.join('/');
      if(folder) zip.folder(folder).file(file,blob); else zip.file(file,blob);
    }catch(e){ console.warn('下载失败:',url,e); if(!cfg.skipError) throw e; }
    done++; prog.textContent=`${done} / ${arr.length}`;
  }
  try{
    const content=await zip.generateAsync({type:'blob'});
    saveAs(content,'resources.zip');
  }catch(e){
    console.error('打包失败:',e); alert(t('download_failed')+e.message);
  }finally{ prog.classList.add('hide'); }
}
})();