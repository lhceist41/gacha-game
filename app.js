// Mini Gacha - improved gameplay + UI glue
// Designed to work with both your original index.html and the magical skin.
// Storage
const STORAGE_KEY = "mini_gacha_state_v2";

// ----- Content (expand anytime) -----
/**
 * Character schema:
 * id, name, rarity, element, title, blurb
 */
const POOL = [
  { id: "c001", name: "Mina", rarity: "Common", element: "🌿", title: "Wayfinder", blurb: "Finds hidden paths in starlit woods." },
  { id: "c002", name: "Rook", rarity: "Common", element: "🗿", title: "Stone Guard", blurb: "Quiet strength with a protective heart." },
  { id: "r001", name: "Astra", rarity: "Rare", element: "✨", title: "Sky Scribe", blurb: "Writes constellations into being." },
  { id: "r002", name: "Jett", rarity: "Rare", element: "🌪️", title: "Storm Runner", blurb: "Leaves a ribbon of wind in every step." },
  { id: "e001", name: "Nyx", rarity: "Epic", element: "🌙", title: "Night Weaver", blurb: "Turns silence into sharp silver threads." },
  { id: "l001", name: "Sol", rarity: "Legendary", element: "☀️", title: "Dawn Crown", blurb: "A radiant oath that never breaks." },
  { id: "c003", name: "Pip", rarity: "Common", element: "🐾", title: "Lantern Prowler", blurb: "Steals warmth from campfires then returns it as luck." },
  { id: "c004", name: "Elowen", rarity: "Common", element: "🍃", title: "Leaf-Whisper", blurb: "Listens to trees argue about the wind." },
  { id: "c005", name: "Tamsin", rarity: "Common", element: "🕯️", title: "Candle Cantor", blurb: "Sings little flames into steady courage." },
  { id: "c006", name: "Bran", rarity: "Common", element: "🪓", title: "Kindling Smith", blurb: "Turns splinters into tiny charms." },
  { id: "c007", name: "Luma", rarity: "Common", element: "🫧", title: "Bubble Witch", blurb: "Brews giggles into protective shimmer." },
  { id: "c008", name: "Cato", rarity: "Common", element: "🧭", title: "Compass Kid", blurb: "Never lost just temporarily exploring." },
  { id: "c009", name: "Iris", rarity: "Common", element: "🦋", title: "Petal Courier", blurb: "Delivers secrets folded in flower wings." },
  { id: "c010", name: "Kerr", rarity: "Common", element: "🧱", title: "Moss Mason", blurb: "Builds soft walls that feel like hugs." },
  { id: "c011", name: "Sable", rarity: "Common", element: "🧵", title: "Threadfinder", blurb: "Pulls loose fate-strings ties neat bows." },
  { id: "c012", name: "Olli", rarity: "Common", element: "🍞", title: "Dough Alchemist", blurb: "Bakes bravery into crusty little loaves." },
  { id: "c013", name: "Yuna", rarity: "Common", element: "💧", title: "Rain Taster", blurb: "Knows storms by flavor before they arrive." },
  { id: "c014", name: "Wren", rarity: "Common", element: "🎐", title: "Chime Tinker", blurb: "Tunes doorbells to ward off bad days." },
  { id: "c015", name: "Milo", rarity: "Common", element: "🪙", title: "Coin Juggler", blurb: "Flips pennies until they land as wishes." },
  { id: "c016", name: "Nari", rarity: "Common", element: "🪶", title: "Feather Reader", blurb: "Reads moods in drifting down." },
  { id: "c017", name: "Kipp", rarity: "Common", element: "🧨", title: "Spark Runner", blurb: "Carries safe fireworks for sad hearts." },
  { id: "c018", name: "Rue", rarity: "Common", element: "🍄", title: "Mushroom Scout", blurb: "Maps fairy rings with muddy boots." },
  { id: "c019", name: "Galen", rarity: "Common", element: "🌫️", title: "Fog Friend", blurb: "Makes morning mist behave politely." },
  { id: "c020", name: "Peony", rarity: "Common", element: "🌸", title: "Blush Herbalist", blurb: "Heals with blush-tonics and tea-steam." },
  { id: "c021", name: "Jori", rarity: "Common", element: "🧲", title: "Lost-Thing Magnet", blurb: "Finds keys socks and missing confidence." },
  { id: "c022", name: "Tara", rarity: "Common", element: "🪞", title: "Mirror Mender", blurb: "Repairs cracked reflections gently." },
  { id: "c023", name: "Koa", rarity: "Common", element: "🪵", title: "Driftwood Carver", blurb: "Carves sea-stories into calm totems." },
  { id: "c024", name: "Vivi", rarity: "Common", element: "🎈", title: "Balloon Oracle", blurb: "Predicts tomorrow by which string snaps." },
  { id: "c025", name: "Nox", rarity: "Common", element: "🕶️", title: "Shade Collector", blurb: "Keeps spare shadows in a jar." },
  { id: "c026", name: "Elior", rarity: "Common", element: "📜", title: "Notekeeper", blurb: "Writes reminders that actually listen back." },
  { id: "c027", name: "Suri", rarity: "Common", element: "🍬", title: "Sugar Duelist", blurb: "Fights with sweet feints and sticky grit." },
  { id: "c028", name: "Brix", rarity: "Common", element: "🧩", title: "Puzzle Patcher", blurb: "Fixes broken plans with odd pieces." },
  { id: "c029", name: "Mara", rarity: "Common", element: "🧺", title: "Basket Bard", blurb: "Sings chores into quick victories." },
  { id: "c030", name: "Tobin", rarity: "Common", element: "🧯", title: "Ember Warden", blurb: "Stops small disasters before they start." },
  { id: "c031", name: "Lio", rarity: "Common", element: "🪁", title: "Kite Shepherd", blurb: "Herds wind into playful spirals." },
  { id: "c032", name: "Zadie", rarity: "Common", element: "🔔", title: "Bell Keeper", blurb: "Rings out worry one clear note." },
  { id: "c033", name: "Hollis", rarity: "Common", element: "🧴", title: "Potion Porter", blurb: "Carries healing for strangers no questions." },
  { id: "c034", name: "Fenn", rarity: "Common", element: "🐟", title: "Pond Listener", blurb: "Hears fish gossip through reeds." },
  { id: "c035", name: "Nell", rarity: "Common", element: "🧹", title: "Broom Racer", blurb: "Wins races with dust trails and laughter." },
  { id: "c036", name: "Quin", rarity: "Common", element: "🪄", title: "Charm Scribbler", blurb: "Draws luck glyphs on napkins." },
  { id: "c037", name: "Orla", rarity: "Common", element: "🧊", title: "Frost Pebble", blurb: "Makes ice smile instead of bite." },
  { id: "c038", name: "Basil", rarity: "Common", element: "🌱", title: "Sprout Tender", blurb: "Coaxes seedlings to grow overnight." },
  { id: "c039", name: "Cress", rarity: "Common", element: "🪤", title: "Trap Disarmer", blurb: "Disarms curses like they are knots." },
  { id: "c040", name: "Perrin", rarity: "Common", element: "🗺️", title: "Map Mumbler", blurb: "Argues with maps until they agree." },
  { id: "c041", name: "Kiri", rarity: "Common", element: "🧿", title: "Warding Eye", blurb: "Keeps envy from sticking to you." },
  { id: "c042", name: "Dax", rarity: "Common", element: "🪨", title: "Stone Skipper", blurb: "Skips rocks so well rivers applaud." },
  { id: "c043", name: "Syl", rarity: "Common", element: "🫖", title: "Teapot Mystic", blurb: "Reads futures in steam curls." },
  { id: "c044", name: "Juniper", rarity: "Common", element: "🧺", title: "Berry Forager", blurb: "Finds the one sweet berry in a sour patch." },
  { id: "c045", name: "Etta", rarity: "Common", element: "🪡", title: "Needle Fox", blurb: "Stitches torn capes and wounded pride." },
  { id: "c046", name: "Rowan", rarity: "Common", element: "🪶", title: "Quill Sentry", blurb: "Writes warnings before trouble shows." },
  { id: "c047", name: "Poppy", rarity: "Common", element: "🎠", title: "Carousel Keeper", blurb: "Spins nightmares into harmless loops." },
  { id: "c048", name: "Rafi", rarity: "Common", element: "🕳️", title: "Doorway Scout", blurb: "Finds shortcuts behind wallpaper." },
  { id: "c049", name: "Cleo", rarity: "Common", element: "🧼", title: "Soap Sorcerer", blurb: "Scrubs off curses with bubbles." },
  { id: "c050", name: "Arden", rarity: "Common", element: "🧯", title: "Smoke Splitter", blurb: "Parts smoke to reveal safe exits." },
  { id: "c051", name: "Miette", rarity: "Common", element: "🧁", title: "Cupcake Hexer", blurb: "Puts tiny blessings in frosting swirls." },
  { id: "c052", name: "Haru", rarity: "Common", element: "🪙", title: "Lucky Lender", blurb: "Loans luck collects smiles as interest." },
  { id: "c053", name: "Tala", rarity: "Common", element: "🧤", title: "Glove Enchanter", blurb: "Never drops what matters." },
  { id: "c054", name: "Voss", rarity: "Common", element: "🧊", title: "Ice Locksmith", blurb: "Opens frozen doors with a wink." },
  { id: "c055", name: "Lark", rarity: "Common", element: "🎻", title: "Fiddle Flicker", blurb: "Plucks notes that light the way." },
  { id: "c056", name: "Nima", rarity: "Common", element: "🌊", title: "Tide Knotter", blurb: "Ties waves into neat ribbons." },
  { id: "c057", name: "Pax", rarity: "Common", element: "🛡️", title: "Soft Shield", blurb: "Defends with kindness that does not bend." },
  { id: "c058", name: "Soren", rarity: "Common", element: "🔎", title: "Glimmer Seeker", blurb: "Finds sparkle in the plainest corners." },
  { id: "c059", name: "Yarrow", rarity: "Common", element: "🌾", title: "Field Whisper", blurb: "Talks wheat into standing tall." },
  { id: "c060", name: "Moxie", rarity: "Common", element: "⚙️", title: "Clockwork Page", blurb: "Winds up courage for the team." },
  { id: "r003", name: "Kael", rarity: "Rare", element: "⚡", title: "Thunder Archivist", blurb: "Keeps lightning in scrolls for emergencies." },
  { id: "r004", name: "Seraphine", rarity: "Rare", element: "🪽", title: "Halo Tailor", blurb: "Sews daylight into cloaks." },
  { id: "r005", name: "Drift", rarity: "Rare", element: "🌌", title: "Star Skater", blurb: "Glides on constellations when streets end." },
  { id: "r006", name: "Vesper", rarity: "Rare", element: "🕯️", title: "Gloam Liturgist", blurb: "Turns dusk into a protective hymn." },
  { id: "r007", name: "Cyril", rarity: "Rare", element: "🔮", title: "Crystal Mechanic", blurb: "Fixes broken futures with calibrated prisms." },
  { id: "r008", name: "Marrow", rarity: "Rare", element: "🦴", title: "Bone Rhymer", blurb: "Speaks old spells in clean sharp meter." },
  { id: "r009", name: "Isolde", rarity: "Rare", element: "❄️", title: "Snowline Ranger", blurb: "Tracks blizzards like footprints." },
  { id: "r010", name: "Saffron", rarity: "Rare", element: "🔥", title: "Cinder Chef", blurb: "Cooks flame into flavor without burns." },
  { id: "r011", name: "Noemi", rarity: "Rare", element: "🧿", title: "Omen Keeper", blurb: "Stores bad luck in sealed glass eyes." },
  { id: "r012", name: "Riven", rarity: "Rare", element: "🗡️", title: "Moonsteel Scout", blurb: "Cuts through doubt not people." },
  { id: "r013", name: "Eris", rarity: "Rare", element: "🪐", title: "Orbit Trickster", blurb: "Swaps places with her own shadow." },
  { id: "r014", name: "Calder", rarity: "Rare", element: "🪨", title: "Basalt Caller", blurb: "Wakes sleeping stone to stand guard." },
  { id: "r015", name: "Lyra", rarity: "Rare", element: "🎼", title: "Chord Astronomer", blurb: "Measures stars by how they sing." },
  { id: "r016", name: "Mistral", rarity: "Rare", element: "🌪️", title: "Gale Duelist", blurb: "Fights with air-blades and perfect timing." },
  { id: "r017", name: "Kaito", rarity: "Rare", element: "💠", title: "Prism Runner", blurb: "Leaves afterimages that mislead curses." },
  { id: "r018", name: "Anouk", rarity: "Rare", element: "🦊", title: "Foxfire Vagrant", blurb: "Sells warm lantern light for stories." },
  { id: "r019", name: "Eden", rarity: "Rare", element: "🌿", title: "Verdant Hexwright", blurb: "Engraves living sigils into bark." },
  { id: "r020", name: "Syr", rarity: "Rare", element: "💧", title: "River Diplomat", blurb: "Negotiates peace between currents." },
  { id: "r021", name: "Thalia", rarity: "Rare", element: "🌸", title: "Bloom Exorcist", blurb: "Banishes spirits with perfume and petals." },
  { id: "r022", name: "Oberon", rarity: "Rare", element: "🪶", title: "Rookery King", blurb: "Commands birds with gentle authority." },
  { id: "r023", name: "Kestrel", rarity: "Rare", element: "🏹", title: "Windstring Archer", blurb: "Shoots arrows that arrive as breezes." },
  { id: "r024", name: "Ariadne", rarity: "Rare", element: "🧵", title: "Labyrinth Nurse", blurb: "Guides the lost home with red thread." },
  { id: "r025", name: "Juno", rarity: "Rare", element: "🧊", title: "Glacier Singer", blurb: "Freezes fear thaws it into resolve." },
  { id: "r026", name: "Vail", rarity: "Rare", element: "🌫️", title: "Mist Cartographer", blurb: "Maps places that refuse to exist." },
  { id: "r027", name: "Cassian", rarity: "Rare", element: "🕰️", title: "Minute Thief", blurb: "Steals seconds to save lives." },
  { id: "r028", name: "Selene", rarity: "Rare", element: "🌙", title: "Lunar Apothecary", blurb: "Brews moonmilk tonics for broken nights." },
  { id: "e002", name: "Azura", rarity: "Epic", element: "🌊", title: "Abyssal Cantatrice", blurb: "Sings tides into towering walls." },
  { id: "e003", name: "Orion", rarity: "Epic", element: "🌌", title: "Nebula Corsair", blurb: "Raids sky-ships for cursed starlight." },
  { id: "e004", name: "Eidra", rarity: "Epic", element: "❄️", title: "Winter Vow", blurb: "Swears oaths that become snowfall armor." },
  { id: "e005", name: "Khalia", rarity: "Epic", element: "🔥", title: "Sun-Scar Emissary", blurb: "Carries a living ember as a crown." },
  { id: "e006", name: "Morrow", rarity: "Epic", element: "🕯️", title: "Candle Cathedral", blurb: "Builds sanctuaries from floating wax." },
  { id: "e007", name: "Zel", rarity: "Epic", element: "⚗️", title: "Transmutation Prince", blurb: "Turns regrets into usable gold." },
  { id: "e008", name: "Nerissa", rarity: "Epic", element: "🫧", title: "Pearl Siren", blurb: "Traps lies inside perfect spheres." },
  { id: "e009", name: "Rhaziel", rarity: "Epic", element: "⚡", title: "Storm Seraph", blurb: "Calls thunder without breaking the sky." },
  { id: "e010", name: "Eclipse", rarity: "Epic", element: "🪐", title: "Shadow Planet", blurb: "Pulls enemies into gentle orbit." },
  { id: "l002", name: "Auroria", rarity: "Legendary", element: "🌈", title: "Aurora Empress", blurb: "Unfurls northern lights and rewrites fate in color." }
];

// Base rarity rates (must sum to 1)
const BASE_RATES = [
  { rarity: "Legendary", p: 0.02 },
  { rarity: "Epic", p: 0.10 },
  { rarity: "Rare", p: 0.28 },
  { rarity: "Common", p: 0.60 },
];

// Costs
const COST_SINGLE = 10;
const COST_TEN = 100; // keep simple for now

const BANNERS = [
  {
    id: "standard",
    name: "Standard Wish",
    description: "Balanced rates across all characters.",
    featuredIds: [],
    featuredWeight: 1,
  },
  {
    id: "featured-dawn",
    name: "Dawn Chorus",
    description: "Featured: Sol, Auroria, Nyx (boosted within their rarities).",
    featuredIds: ["l001", "l002", "e001"],
    featuredWeight: 4,
  },
];

const SHARD_VALUES = {
  Common: 1,
  Rare: 5,
  Epic: 20,
  Legendary: 100,
};

// Pity rules (simple, readable, adjustable)
const PITY = {
  epicAt: 10,         // guarantees Epic+ on pull 10 if none since last Epic+
  legendaryAt: 90,    // guarantees Legendary on pull 90 if none since last Legendary
  softLegendaryFrom: 75, // after this, Legendary chance ramps up
  softLegendaryStep: 0.02, // +2% each pull after soft start
};

// ----- State -----
const DEFAULT_STATE = {
  version: 2,
  gems: 50,
  shards: 0,
  selectedBannerId: "standard",
  level: 1,
  xp: 0,
  loginStreak: 0,
  lastLoginDate: "",
  owned: {},

  // pity counters
  sinceEpicPlus: 0,
  sinceLegendary: 0,

  // stats
  totalPulls: 0,
  lastPulls: [],
};

function safeClone(obj) {
  return typeof structuredClone === "function" ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return safeClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);

    // Minimal validation
    if (!parsed || typeof parsed !== "object") return safeClone(DEFAULT_STATE);
    if (typeof parsed.gems !== "number") return safeClone(DEFAULT_STATE);
    if (typeof parsed.shards !== "number") parsed.shards = 0;
    if (!parsed.owned || typeof parsed.owned !== "object") return safeClone(DEFAULT_STATE);
    if (typeof parsed.selectedBannerId !== "string") parsed.selectedBannerId = "standard";
    if (typeof parsed.level !== "number") parsed.level = 1;
    if (typeof parsed.xp !== "number") parsed.xp = 0;
    if (typeof parsed.loginStreak !== "number") parsed.loginStreak = 0;
    if (typeof parsed.lastLoginDate !== "string") parsed.lastLoginDate = "";

    // Migrate from older state key if needed
    // If user has the old key, merge owned + gems once.
    const oldRaw = localStorage.getItem("mini_gacha_state");
    if (oldRaw && !parsed.__migratedFromV1) {
      try {
        const oldParsed = JSON.parse(oldRaw);
        if (oldParsed && typeof oldParsed === "object") {
          if (typeof oldParsed.gems === "number") parsed.gems = Math.max(parsed.gems, oldParsed.gems);
          if (oldParsed.owned && typeof oldParsed.owned === "object") {
            for (const [id, count] of Object.entries(oldParsed.owned)) {
              if (typeof count === "number") parsed.owned[id] = (parsed.owned[id] ?? 0) + count;
            }
          }
          parsed.__migratedFromV1 = true;
        }
      } catch {
        // ignore migration failures
      }
    }

    // Fill missing fields
    return { ...safeClone(DEFAULT_STATE), ...parsed };
  } catch {
    return safeClone(DEFAULT_STATE);
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // If storage fails, gameplay still runs for this session
  }
}

// ----- Helpers -----
const RARITY_ORDER = { Legendary: 0, Epic: 1, Rare: 2, Common: 3 };

function rarityClass(r) {
  if (r === "Common") return "common";
  if (r === "Rare") return "rare";
  if (r === "Epic") return "epic";
  return "legendary";
}

function normalizeRates(rates) {
  const sum = rates.reduce((a, b) => a + b.p, 0);
  if (sum <= 0) return rates;
  return rates.map(r => ({ ...r, p: r.p / sum }));
}

function computeRatesWithPity() {
  // Start with base
  const base = BASE_RATES.map(r => ({ ...r }));

  // Hard pity
  if (state.sinceLegendary >= PITY.legendaryAt - 1) {
    return normalizeRates([
      { rarity: "Legendary", p: 1 },
      { rarity: "Epic", p: 0 },
      { rarity: "Rare", p: 0 },
      { rarity: "Common", p: 0 },
    ]);
  }
  if (state.sinceEpicPlus >= PITY.epicAt - 1) {
    // Guarantee Epic or Legendary. Keep relative split between them from base.
    const l = base.find(r => r.rarity === "Legendary")?.p ?? 0.02;
    const e = base.find(r => r.rarity === "Epic")?.p ?? 0.10;
    return normalizeRates([
      { rarity: "Legendary", p: l },
      { rarity: "Epic", p: e },
      { rarity: "Rare", p: 0 },
      { rarity: "Common", p: 0 },
    ]);
  }

  // Soft pity ramp for Legendary
  const pullsPast = Math.max(0, state.sinceLegendary + 1 - PITY.softLegendaryFrom);
  if (pullsPast > 0) {
    const lBase = base.find(r => r.rarity === "Legendary")?.p ?? 0.02;
    const lBoost = Math.min(0.98, lBase + pullsPast * PITY.softLegendaryStep);

    // Reduce Common share first, then Rare, then Epic if needed
    const target = base.map(r => ({ ...r }));
    const idxL = target.findIndex(r => r.rarity === "Legendary");
    const idxC = target.findIndex(r => r.rarity === "Common");
    const idxR = target.findIndex(r => r.rarity === "Rare");
    const idxE = target.findIndex(r => r.rarity === "Epic");

    const delta = lBoost - target[idxL].p;
    if (delta > 0) {
      const take = (i, amount) => {
        const got = Math.min(target[i].p, amount);
        target[i].p -= got;
        return amount - got;
      };

      let remaining = delta;
      remaining = take(idxC, remaining);
      remaining = take(idxR, remaining);
      remaining = take(idxE, remaining);

      target[idxL].p += (delta - remaining);
    }
    return normalizeRates(target);
  }

  return normalizeRates(base);
}

function rollRarity() {
  const rates = computeRatesWithPity();
  const x = Math.random();
  let acc = 0;
  for (const r of rates) {
    acc += r.p;
    if (x <= acc) return r.rarity;
  }
  return "Common";
}

function getActiveBanner() {
  const found = BANNERS.find(b => b.id === state.selectedBannerId);
  if (found) return found;
  state.selectedBannerId = BANNERS[0].id;
  return BANNERS[0];
}

function pickWeightedCandidate(candidates, featuredSet, featuredWeight) {
  if (candidates.length === 0) return POOL[0];
  if (!featuredSet || featuredSet.size === 0 || featuredWeight <= 1) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  const weighted = candidates.map(char => ({
    char,
    weight: featuredSet.has(char.id) ? featuredWeight : 1,
  }));
  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of weighted) {
    roll -= item.weight;
    if (roll <= 0) return item.char;
  }
  return weighted[weighted.length - 1].char;
}

function pickFromPool(rarity, banner) {
  const candidates = POOL.filter(c => c.rarity === rarity);
  const featuredSet = banner?.featuredIds?.length ? new Set(banner.featuredIds) : null;
  const featuredWeight = banner?.featuredWeight ?? 1;
  return pickWeightedCandidate(candidates, featuredSet, featuredWeight);
}

function addOwned(id) {
  state.owned[id] = (state.owned[id] ?? 0) + 1;
}

function awardShards(rarity) {
  const gain = SHARD_VALUES[rarity] ?? 0;
  state.shards += gain;
  return gain;
}

function xpForNextLevel(level) {
  return 100 + (level - 1) * 40;
}

function awardXp(amount) {
  state.xp += amount;
  while (state.xp >= xpForNextLevel(state.level)) {
    state.xp -= xpForNextLevel(state.level);
    state.level += 1;
    state.gems += 25;
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const start = Date.parse(a);
  const end = Date.parse(b);
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  return Math.floor((end - start) / 86400000);
}

function loginRewardForStreak(streak) {
  return 20 + Math.min(80, (streak - 1) * 10);
}

function bumpPity(rarity) {
  state.sinceLegendary += 1;
  state.sinceEpicPlus += 1;

  if (rarity === "Legendary") {
    state.sinceLegendary = 0;
    state.sinceEpicPlus = 0;
  } else if (rarity === "Epic") {
    state.sinceEpicPlus = 0;
  }
}

function formatRevealCard(pull, index) {
  const { char, isDuplicate, shardsGained } = pull;
  const cls = rarityClass(char.rarity);
  const shardTag = isDuplicate
    ? `<div class="shard-tag">+${shardsGained} shards</div>`
    : "";
  return `
    <div class="result-item" style="animation-delay:${index * 70}ms">
      <div class="rarity ${cls}">${char.rarity}</div>
      ${shardTag}
      <div style="margin-top:8px; font-weight:800">${char.element} ${char.name}</div>
      <small style="opacity:.9">${char.title}</small>
    </div>
  `;
}

// ----- UI wiring (works even if some elements are missing) -----
function $(id) { return document.getElementById(id); }

const gemsEl = $("gems");
const shardsEl = $("shards");
const addGemsBtn = $("addGems");
const summonBtn1 = $("summon1");
const bannerSelect = $("bannerSelect");
const bannerDesc = $("bannerDesc");
const loginStatus = $("loginStatus");
const loginActionBtn = $("loginAction");
const streakEl = $("loginStreak");
const levelEl = $("playerLevel");
const xpEl = $("playerXp");
const xpFillEl = $("xpFill");
const resultEl = $("result");
const collectionEl = $("collection");

function ensureExtraUI() {
  // Create Summon x10 if missing
  if (summonBtn1 && !$("summon10")) {
    const btn = document.createElement("button");
    btn.id = "summon10";
    btn.type = "button";
    btn.textContent = "Summon x10 (Cost: 100)";
    btn.setAttribute("aria-label", "Summon ten characters for 100 gems");
    btn.style.marginLeft = "8px";
    summonBtn1.parentElement?.appendChild(btn);
  }

  // Add pity badge if header exists
  const bar = document.querySelector(".bar");
  if (bar && !$("pity")) {
    const pity = document.createElement("div");
    pity.id = "pity";
    pity.className = "rarity epic";
    pity.setAttribute("aria-label", "Pity counters");
    pity.innerHTML = `🌟 Pity <span id="pityText">0</span>`;
    bar.appendChild(pity);
  }

  // Add reset button if debug button exists
  if (addGemsBtn && !$("reset")) {
    const btn = document.createElement("button");
    btn.id = "reset";
    btn.type = "button";
    btn.textContent = "Reset";
    btn.setAttribute("aria-label", "Reset progress");
    btn.style.opacity = "0.9";
    btn.style.marginLeft = "8px";
    addGemsBtn.parentElement?.appendChild(btn);
  }

  // Add a dialog for character details
  if (!document.getElementById("charDialog")) {
    const dlg = document.createElement("dialog");
    dlg.id = "charDialog";
    dlg.style.border = "1px solid rgba(170,190,255,.18)";
    dlg.style.borderRadius = "18px";
    dlg.style.background = "rgba(10,12,28,.92)";
    dlg.style.color = "inherit";
    dlg.style.maxWidth = "520px";
    dlg.style.width = "92vw";
    dlg.style.padding = "14px";
    dlg.innerHTML = `
      <div id="charDialogContent"></div>
      <div style="display:flex; justify-content:flex-end; margin-top:12px">
        <button id="charDialogClose" type="button">Close</button>
      </div>
    `;
    document.body.appendChild(dlg);
    dlg.querySelector("#charDialogClose")?.addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => {
      const rect = dlg.getBoundingClientRect();
      const inDialog = rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right;
      if (!inDialog) dlg.close();
    });
  }
}

function render() {
  if (gemsEl) gemsEl.textContent = String(state.gems);
  if (shardsEl) shardsEl.textContent = String(state.shards);
  if (bannerSelect) {
    bannerSelect.innerHTML = BANNERS.map(
      banner => `<option value="${banner.id}">${banner.name}</option>`
    ).join("");
    bannerSelect.value = getActiveBanner().id;
  }
  if (bannerDesc) {
    bannerDesc.textContent = getActiveBanner().description;
  }
  if (streakEl) streakEl.textContent = String(state.loginStreak);
  if (levelEl) levelEl.textContent = String(state.level);
  if (xpEl) xpEl.textContent = `${state.xp}/${xpForNextLevel(state.level)}`;
  if (xpFillEl) {
    const pct = Math.min(100, Math.round((state.xp / xpForNextLevel(state.level)) * 100));
    xpFillEl.style.width = `${pct}%`;
  }
  if (loginStatus) {
    const key = todayKey();
    loginStatus.textContent = state.lastLoginDate === key ? "Claimed today" : "Ready to claim";
  }
  if (loginActionBtn) {
    const key = todayKey();
    loginActionBtn.disabled = state.lastLoginDate === key;
  }

  const pityText = document.getElementById("pityText");
  if (pityText) {
    const toEpic = Math.max(0, PITY.epicAt - state.sinceEpicPlus);
    const toLeg = Math.max(0, PITY.legendaryAt - state.sinceLegendary);
    pityText.textContent = `${toEpic}E ${toLeg}L`;
  }

  if (!collectionEl) return;

  collectionEl.innerHTML = "";
  const entries = Object.entries(state.owned);
  if (entries.length === 0) {
    collectionEl.innerHTML = `<div class="card"><div class="rarity">Empty</div><small>Summon to get your first character.</small></div>`;
    return;
  }

  const byId = new Map(POOL.map(c => [c.id, c]));
  const sorted = entries
    .map(([id, count]) => ({ c: byId.get(id), count }))
    .filter(x => x.c)
    .sort((a, b) => {
      const d = RARITY_ORDER[a.c.rarity] - RARITY_ORDER[b.c.rarity];
      return d !== 0 ? d : a.c.name.localeCompare(b.c.name);
    });

  for (const { c, count } of sorted) {
    const card = document.createElement("article");
    card.className = `card ${rarityClass(c.rarity)}`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${c.name} details`);
    card.innerHTML = `
      <div class="rarity ${rarityClass(c.rarity)}">${c.rarity}</div>
      <div style="margin-top:10px; font-weight:800; font-size:16px">${c.element} ${c.name}</div>
      <small style="opacity:.92">${c.title}</small>
      <small style="display:block; margin-top:6px">Owned: ${count}</small>
    `;
    card.addEventListener("click", () => openCharacterDialog(c, count));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCharacterDialog(c, count);
      }
    });
    collectionEl.appendChild(card);
  }
}

function openCharacterDialog(char, count) {
  const dlg = document.getElementById("charDialog");
  const content = document.getElementById("charDialogContent");
  if (!dlg || !content) return;

  content.innerHTML = `
    <div class="rarity ${rarityClass(char.rarity)}">${char.rarity}</div>
    <h2 style="margin:10px 0 6px">${char.element} ${char.name}</h2>
    <small style="display:block; opacity:.95">${char.title}</small>
    <div style="margin-top:10px; line-height:1.45">${char.blurb}</div>
    <div style="margin-top:12px"><small>ID: ${char.id} · Owned: ${count}</small></div>
  `;
  dlg.showModal();
}

function showResultPulls(pulls) {
  if (!resultEl) return;

  const totalShards = pulls.reduce((sum, pull) => sum + (pull.shardsGained ?? 0), 0);
  const summary = pulls.length === 1 ? "You got" : "You pulled";
  const last = pulls[pulls.length - 1]?.char;
  const glow = `box-shadow: 0 0 0 1px rgba(170,190,255,.12), 0 18px 40px rgba(0,0,0,.35);`;
  resultEl.style.cssText = glow;
  const cards = pulls.map((pull, index) => formatRevealCard(pull, index)).join("");
  resultEl.innerHTML = `
    <div style="opacity:.95; margin-bottom:8px">${summary}:</div>
    <div class="result-list">${cards}</div>
    <div style="margin-top:10px; opacity:.88">
      <small>Total pulls: ${state.totalPulls} · Next Epic+ in ≤ ${Math.max(0, PITY.epicAt - state.sinceEpicPlus)} · Next Legendary in ≤ ${Math.max(0, PITY.legendaryAt - state.sinceLegendary)}</small>
      <small style="display:block; margin-top:4px">Shards gained: ${totalShards}</small>
    </div>
  `;
  resultEl.classList.remove("reveal");
  void resultEl.offsetHeight;
  resultEl.classList.add("reveal");

  // Tiny excitement ping for higher rarity
  if (last && (last.rarity === "Epic" || last.rarity === "Legendary")) {
    resultEl.animate(
      [{ transform: "translateY(0px) scale(1)" }, { transform: "translateY(-2px) scale(1.01)" }, { transform: "translateY(0px) scale(1)" }],
      { duration: 280, easing: "ease-out" }
    );
  }
}

function setResultText(txt) {
  if (!resultEl) return;
  resultEl.textContent = txt;
}

// ----- Actions -----
function doPull(n) {
  const pulls = [];
  const banner = getActiveBanner();
  for (let i = 0; i < n; i += 1) {
    const rarity = rollRarity();
    const char = pickFromPool(rarity, banner);
    const alreadyOwned = (state.owned[char.id] ?? 0) > 0;

    const shardsGained = alreadyOwned ? awardShards(char.rarity) : 0;
    addOwned(char.id);
    bumpPity(char.rarity);
    awardXp(6);

    state.totalPulls += 1;
    pulls.push({ char, isDuplicate: alreadyOwned, shardsGained });
  }

  state.lastPulls = pulls.map(p => p.char.id).slice(-20);
  return pulls;
}

function canAfford(cost) {
  return state.gems >= cost;
}

function spend(cost) {
  state.gems -= cost;
}

function bindEvents() {
  if (loginActionBtn) {
    loginActionBtn.addEventListener("click", () => {
      const key = todayKey();
      if (state.lastLoginDate === key) return;
      const deltaDays = state.lastLoginDate ? daysBetween(state.lastLoginDate, key) : 1;
      state.loginStreak = deltaDays === 1 ? state.loginStreak + 1 : 1;
      state.lastLoginDate = key;
      const reward = loginRewardForStreak(state.loginStreak);
      state.gems += reward;
      awardXp(15);
      saveState();
      render();
      setResultText(`Daily login claimed! +${reward} gems.`);
    });
  }

  if (bannerSelect) {
    bannerSelect.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      state.selectedBannerId = target.value;
      saveState();
      render();
    });
  }

  if (addGemsBtn) {
    addGemsBtn.addEventListener("click", () => {
      state.gems += 100;
      saveState();
      render();
    });
  }

  const resetBtn = document.getElementById("reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const ok = confirm("Reset all progress?");
      if (!ok) return;
      state = safeClone(DEFAULT_STATE);
      saveState();
      render();
      setResultText("");
    });
  }

  if (summonBtn1) {
    summonBtn1.addEventListener("click", () => {
      const cost = COST_SINGLE;
      if (!canAfford(cost)) {
        setResultText("Not enough gems.");
        return;
      }
      spend(cost);
      const pulls = doPull(1);
      saveState();
      showResultPulls(pulls);
      render();
    });
  }

  const summonBtn10 = document.getElementById("summon10");
  if (summonBtn10) {
    summonBtn10.addEventListener("click", () => {
      const cost = COST_TEN;
      if (!canAfford(cost)) {
        setResultText("Not enough gems.");
        return;
      }
      spend(cost);
      const pulls = doPull(10);
      saveState();
      showResultPulls(pulls);
      render();
    });
  }
}

// ----- Boot -----
ensureExtraUI();
bindEvents();
render();

// Optional service worker registration if you have sw.js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
