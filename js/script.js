console.log("script.js loaded");

// No AI usage — local-only fallbacks
const TAROT_NAMES = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
];

const TAROT_MEANINGS = [
  "New beginnings and spontaneity.",
  "Skill, resourcefulness.",
  "Intuition, secrets.",
  "Fertility, creativity.",
  "Authority, structure.",
  "Tradition, guidance.",
  "Choice, relationships.",
  "Determination, victory.",
  "Courage, inner strength.",
  "Solitude, introspection.",
  "Change, cycles.",
  "Fairness, truth.",
  "Surrender, new perspective.",
  "Transformation, endings.",
  "Balance, moderation.",
  "Material bondage, temptation.",
  "Sudden change, upheaval.",
  "Hope, inspiration.",
  "Illusion, subconscious.",
  "Vitality, success.",
  "Reckoning, awakening.",
  "Completion, integration.",
];

function getMoonPhaseName(date) {
  let yy = date.getUTCFullYear();
  let mm = date.getUTCMonth() + 1;
  const dd = date.getUTCDate();
  if (mm < 3) {
    yy--;
    mm += 12;
  }
  ++mm;
  let c = 365.25 * yy;
  let e = 30.6 * mm;
  let jd = c + e + dd - 694039.09; // jd is total days elapsed
  jd /= 29.5305882; // divide by the moon cycle
  const b = parseInt(jd); // int part of jd
  jd -= b; // fractional part of jd
  let age = Math.round(jd * 29.5305882);
  if (age < 0) age = 0;
  if (age === 0) return "New Moon 🌑";
  if (age < 7) return "Waxing Crescent 🌒";
  if (age === 7) return "First Quarter 🌓";
  if (age < 15) return "Waxing Gibbous 🌔";
  if (age === 15) return "Full Moon 🌕";
  if (age < 22) return "Waning Gibbous 🌖";
  if (age === 22) return "Last Quarter 🌗";
  return "Waning Crescent 🌘";
}

async function HoroscopeQuery() {
  const horoscopes = [
    "Today, meticulous  attention to detail  pays off; double-check all documents before submission.",
    "Your organizational skills are your biggest asset.  Clear out clutter  to clear your mind and workspace.",
    "A complex work project requires your focused,  methodical approach . Don't rush the foundational steps.",
    " Small, steady progress  is the theme for the day. Trust the routine and the slow, consistent effort.",
    "Focus on  efficiency and optimization . Streamline one daily task to free up future time.",
    "The universe rewards your diligence. Tackle the most  challenging, detailed item  on your to-do list first.",
    " Review and refine  a long-term goal. Your analytical eye spots a critical step missed previously.",
    "Collaborative work flows smoothly if you take the lead in  structuring the workflow and delegating precisely .",
    "Harness your inner editor; today is perfect for  proofing, revising, and perfecting  written work.",
    "An unexpected problem is solved simply by applying your characteristic  logical step-by-step analysis .",
    "Prioritize tasks that bring a sense of  order and completion . The satisfaction is worth the effort.",
    "Avoid getting stuck in  perfectionist paralysis . Good enough is sometimes better than late.",

    "Pay close attention to your body's needs.  Prioritize rest  over pushing through fatigue.",
    "Focus on  simple, healthy meals  today. Fuel your body with nutritious efficiency.",
    "A new  fitness routine or healthy habit  started now has lasting potential. Be consistent and patient.",
    " Mindfulness through detailed tasks  (like gardening or deep cleaning) brings inner calm.",
    "Be critical of your own self-talk; practice  self-compassion  instead of harsh self-critique.",
    " Declutter your digital space  (inboxes, files). A tidy screen means a tidy mind and improved focus.",
    "Spend time in nature and  reconnect with earthy energy . It grounds your practical nature.",
    "Today is ideal for a  health check or research into a wellness plan .",
    "Look for  practical ways to reduce stress , perhaps through a systematic evening wind-down routine.",
    "Hydration and good posture are key today; small physical details matter to your overall energy.",

    "A minor frustration tests your legendary  patience . Take a deep breath before reacting and analyze the cause.",
    "Be  helpful and of service  to someone in need, but remember to set healthy boundaries and not overcommit.",
    " Small gestures of practical care  show love more than grand declarations today.",
    "Avoid the urge to  micromanage  others. Let small imperfections slide for peace of mind in relationships.",
    "A conversation requires your  pragmatic and logical input . Offer constructive advice, not judgment.",
    "Practice  active listening . You may learn a detail that significantly alters your perspective on a friend.",
    " Communicate your needs  clearly and with precise language to avoid misunderstandings.",
    "A relationship benefits from your  analytical review  of past patterns. Correct them gently and collaboratively.",
    "Resist the impulse to fix every flaw you see in others. Acceptance is your keyword today.",
    "Your grounded perspective is sought after. Offer practical support without becoming emotionally entangled.",

    "Patience in a tricky situation yields surprising clarity and a better long-term outcome.",
    "Trust your  analytical instincts  concerning a financial matter; run the numbers one more time.",
    " Organization  is your superpower today; use it to conquer a brewing wave of minor chaos.",
    " Rest and reflection  recharge your inner battery for the week ahead—don't neglect self-care.",
    "A  small victory at work  brings significant emotional satisfaction and validation of your effort.",
    " Service to others  is a strong theme; your help and efficiency are deeply appreciated and recognized.",
    "The energy favors making  responsible long-term decisions  regarding home and property.",
    "An inquiry or research project started today will lead to useful, concrete knowledge.",
  ];

  const randomIndex = Math.floor(Math.random() * horoscopes.length);

  return horoscopes[randomIndex];
}

async function MoonPhaseQuery() {
  return `Moon phase: ${getMoonPhaseName(new Date())}`;
}

// Accept numeric index or filename or name
function toTarotIndex(v) {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const m = v.match(/(\d{1,2})(?=\.png|$)/);
    if (m) return Number(m[1]);
    const i = TAROT_NAMES.indexOf(v);
    if (i >= 0) return i;
  }
  return null;
}

async function TarotCardQuery(cardA, cardB, cardC) {
  const iA = toTarotIndex(cardA),
    iB = toTarotIndex(cardB),
    iC = toTarotIndex(cardC);
  const names = [iA, iB, iC].map((i) =>
    i === null ? "Unknown card" : TAROT_NAMES[i] || `Card ${i}`
  );
  const meanings = [iA, iB, iC].map((i) =>
    i === null ? "Unknown" : TAROT_MEANINGS[i] || "No meaning"
  );
  return { names, meanings };
}

function drawThreeUnique() {
  const indices = new Set();
  while (indices.size < 3) indices.add(Math.floor(Math.random() * 22));
  return Array.from(indices);
}

// small utility delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");

  const moonStatus = document.getElementById("moon-status");
  const horoscopeText = document.getElementById("horoscope-text");
  const img = document.getElementById("daily-tarot-img");
  const tarotNamesEl = document.getElementById("tarot-names");
  const tarotTranslationEl = document.getElementById("tarot-translation");
  const drawBtn = document.getElementById("draw-btn");


  const tarotImg1 = document.getElementById("tarot-reading-img-1");
  const tarotImg2 = document.getElementById("tarot-reading-img-2");
  const tarotImg3 = document.getElementById("tarot-reading-img-3");
  const tarotCap1 = document.getElementById("tarot-reading-caption-1");
  const tarotCap2 = document.getElementById("tarot-reading-caption-2");
  const tarotCap3 = document.getElementById("tarot-reading-caption-3");
  const startReadingBtn = document.getElementById("start-reading-btn");

  if (tarotImg1) tarotImg1.src = "images/tarot/cardBack.png";
  if (tarotImg2) tarotImg2.src = "images/tarot/cardBack.png";
  if (tarotImg3) tarotImg3.src = "images/tarot/cardBack.png";

  async function loadHoroscope() {
    if (!horoscopeText) return;
    horoscopeText.textContent = "Loading horoscope...";
    try {
      const text = await HoroscopeQuery();
      horoscopeText.textContent = text;
      const detailed = document.getElementById("detailed-horoscope-text");
      if (detailed) detailed.textContent = text;
    } catch (err) {
      console.error(err);
      horoscopeText.textContent = "Error loading horoscope";
    }
  }

  async function loadMoon() {
    if (!moonStatus) return;
    moonStatus.textContent = "Loading moon phase...";
    try {
      const m = await MoonPhaseQuery();
      moonStatus.textContent = m;
    } catch (err) {
      console.error(err);
      moonStatus.textContent = "Error loading moon phase";
    }
  }

  async function drawAndShowTarot() {
    const [a, b, c] = drawThreeUnique();
    if (img) img.src = `images/tarot/${a}.png`;
    try {
      const result = await TarotCardQuery(a, b, c);
      if (tarotNamesEl)
        tarotNamesEl.textContent = `Cards: ${result.names.join(" — ")}`;
      if (tarotTranslationEl)
        tarotTranslationEl.textContent = result.meanings.join(" | ");
    } catch (err) {
      console.error(err);
      if (tarotTranslationEl)
        tarotTranslationEl.textContent = "Error getting tarot translation";
    }
  }


  async function startReading() {
    if (!tarotImg1 || !tarotImg2 || !tarotImg3) return;

    if (startReadingBtn) startReadingBtn.disabled = true;

    tarotImg1.src = "images/tarot/cardBack.png";
    tarotImg2.src = "images/tarot/cardBack.png";
    tarotImg3.src = "images/tarot/cardBack.png";
    if (tarotCap1) tarotCap1.textContent = "...";
    if (tarotCap2) tarotCap2.textContent = "...";
    if (tarotCap3) tarotCap3.textContent = "...";

    const [i1, i2, i3] = drawThreeUnique();

 
    await delay(350);
    tarotImg1.src = `images/tarot/${i1}.png`;
    if (tarotCap1)
      tarotCap1.textContent = `${TAROT_NAMES[i1]} — ${TAROT_MEANINGS[i1]}`;


    await delay(400);
    tarotImg2.src = `images/tarot/${i2}.png`;
    if (tarotCap2)
      tarotCap2.textContent = `${TAROT_NAMES[i2]} — ${TAROT_MEANINGS[i2]}`;

    await delay(450);
    tarotImg3.src = `images/tarot/${i3}.png`;
    if (tarotCap3)
      tarotCap3.textContent = `${TAROT_NAMES[i3]} — ${TAROT_MEANINGS[i3]}`;

    if (img) img.src = `images/tarot/${i1}.png`;
    if (tarotNamesEl)
      tarotNamesEl.textContent = `Cards: ${TAROT_NAMES[i1]}, ${TAROT_NAMES[i2]}, ${TAROT_NAMES[i3]}`;
    if (tarotTranslationEl)
      tarotTranslationEl.textContent = `${TAROT_MEANINGS[i1]} | ${TAROT_MEANINGS[i2]} | ${TAROT_MEANINGS[i3]}`;

    if (startReadingBtn) startReadingBtn.disabled = false;
  }


  loadHoroscope();
  loadMoon();
  drawAndShowTarot();

  if (drawBtn) drawBtn.addEventListener("click", drawAndShowTarot);
  if (startReadingBtn) startReadingBtn.addEventListener("click", startReading);
});
