const i18n = {
  en: {
    title: "ARENA — 24h memecoin + uncensored chat",
    subtitle: "New theme every day. Talk freely. No bots.",
    todayTheme: "Today’s theme",
    timeLeft: "Time left",
    joinChat: "Join Chat",
    buyPass: "Buy Pass ($3) / VIP ($10)",
    swap: "Swap $ARENA",
    foot: "We ban only scammers, porn-bots and hard spam. Everything else is allowed."
  },
  ru: {
    title: "ARENA — мемкоин на 24 часа + чат без цензуры",
    subtitle: "Каждый день новая тема. Говори как хочешь. Без ботов.",
    todayTheme: "Тема дня",
    timeLeft: "Осталось",
    joinChat: "Войти в чат",
    buyPass: "Купить PASS (3$) / VIP (10$)",
    swap: "Купить $ARENA",
    foot: "Баним только скам-ботов, порно-ботов и жёсткий спам. Остальное — можно."
  }
};

const els = {
  themeText: document.getElementById("themeText"),
  countdown: document.getElementById("countdown"),
  chatLink: document.getElementById("chatLink"),
  ticketLink: document.getElementById("ticketLink"),
  dexLink: document.getElementById("dexLink"),
  btnEN: document.getElementById("btn-en"),
  btnRU: document.getElementById("btn-ru")
};

let lang = localStorage.getItem("arena_lang") || "en";
applyLang(lang);

fetch("arena.json?v=" + Date.now()).then(r=>r.json()).then(data=>{
  els.themeText.textContent = data.themeToday || "-";
  els.chatLink.href = data.chatLink;
  els.ticketLink.href = data.ticketLink;
  els.dexLink.href = data.dexLink;
  startCountdown(new Date(data.arenaEndsAtISO));
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
