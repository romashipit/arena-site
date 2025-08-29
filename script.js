const i18n = {
  en: {
    title: "ARENA — 24h memecoin + uncensored chat",
    subtitle: "New theme every day. Talk freely. No bots.",
    todayTheme: "Today’s theme",
    joinChat: "Join Chat",
    buyPass: "Buy Pass ($3) / VIP ($10)",
    swap: "Swap $ARENA",
    foot: "We ban only scammers, porn-bots and hard spam. Everything else is allowed."
  },
  ru: {
    title: "ARENA — мемкоин на 24 часа + чат без цензуры",
    subtitle: "Каждый день новая тема. Говори как хочешь. Без ботов.",
    todayTheme: "Тема дня",
    joinChat: "Войти в чат",
    buyPass: "Купить PASS (3$) / VIP (10$)",
    swap: "Купить $ARENA",
    foot: "Баним только скам-ботов, порно-ботов и жёсткий спам. Остальное — можно."
  }
};

const els = {
  fighters: document.getElementById("fighters"),
  themeText: document.getElementById("themeText"),
  countdown: document.getElementById("countdown"),
  chatLink: document.getElementById("chatLink"),
  ticketLink: document.getElementById("ticketLink"),
  dexLink: document.getElementById("dexLink"),
  btnEN: document.getElementById("btn-en"),
  btnRU: document.getElementById("btn-ru"),
  historyGrid: document.getElementById("historyGrid")
};

let lang = localStorage.getItem("arena_lang") || "en";
applyLang(lang);

// load data
fetch("arena.json?v=" + Date.now()).then(r=>r.json()).then(data=>{
  const L = data.left || {label:"Left", emoji:"⚔️"};
  const R = data.right || {label:"Right", emoji:"🛡️"};

  els.fighters.textContent = `${L.emoji} ${L.label}  vs  ${R.label} ${R.emoji}`;
  els.themeText.textContent = data.themeToday || "-";
  els.chatLink.href = data.chatLink;
  els.ticketLink.href = data.ticketLink;
  els.dexLink.href = data.dexLink;

  let end = new Date(data.arenaEndsAtISO);
if (isNaN(end) || end < new Date()) {
  // если дата битая или уже прошла — считаем до ближайшей местной полуночи
  end = new Date();
  end.setHours(24,0,0,0);
}
startCountdown(end);

  renderHistory(data.pastArenas || []);
}).catch(()=>{
  els.themeText.textContent = "—";
});

function startCountdown(end){
  function tick(){
    const now = new Date();
    let s = Math.max(0, Math.floor((end - now)/1000));
    const h = String(Math.floor(s/3600)).padStart(2,"0");
    s %= 3600;
    const m = String(Math.floor(s/60)).padStart(2,"0");
    s = String(s%60).padStart(2,"0");
    els.countdown.textContent = `${h}:${m}:${s}`;
  }
  tick(); setInterval(tick, 1000);
}

function renderHistory(items){
  els.historyGrid.innerHTML = "";
  items.forEach(it=>{
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div class="row"><strong>#${it.id}</strong> <span>${new Date(it.dateISO).toLocaleDateString()}</span></div>
      <div class="row">${it.left.emoji} ${it.left.label} vs ${it.right.label} ${it.right.emoji}</div>
      <div class="row"><span>Volume</span><strong>$${(it.volumeUSD||0).toLocaleString()}</strong></div>
      <div class="row"><span>Tx</span><span>${it.txCount||0}</span></div>
      <div class="row"><span>Chat</span><span>${it.chatHours||24}h • ${it.messages||0} msgs</span></div>
      <div class="row"><span>Winner</span><span class="win">${it.winner||"-"}</span></div>
    `;
    els.historyGrid.appendChild(div);
  });
}

function applyLang(l){
  lang = l; localStorage.setItem("arena_lang", l);
  const dict = i18n[l];
  document.querySelectorAll("[data-i18n]").forEach(node=>{
    const k = node.getAttribute("data-i18n");
    node.textContent = dict[k] || node.textContent;
  });
  document.title = dict.title;
  document.getElementById("btn-en").classList.toggle("active", l==="en");
  document.getElementById("btn-ru").classList.toggle("active", l==="ru");
}

els.btnEN.onclick = ()=>applyLang("en");
els.btnRU.onclick = ()=>applyLang("ru");
