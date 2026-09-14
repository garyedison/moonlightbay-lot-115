const usd = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const GROUPS = [
  { id: "landed", title: "Landed shell", blurb: "The house, ocean freight, and Belize inland." },
  { id: "civil", title: "Civil and MEP", blurb: "Slab, excavation, electrical, plumbing, ties, crane, contingency." },
  { id: "site", title: "On the lot", blurb: "Deck, roof, rail, fence — take any of these off." },
  { id: "labor", title: "Assembly", blurb: "Belize crew to set and finish the shell." },
  { id: "ffe", title: "FF&E", blurb: "Furniture by room, plus a 20 ft container DDP to the Moonlight Bay gate." },
];

const PRESETS = [
  { id: "landed", label: "Shell, landed", hint: "Factory + freight + inland", keep: ["landed"] },
  { id: "civil", label: "Shell + civil / MEP", hint: "Landed, plus slab, MEP, ties, crane, contingency", keep: ["landed", "civil"] },
  { id: "unfurnished", label: "Unfurnished on the lot", hint: "Ready to live in empty — no furniture container", keep: ["landed", "civil", "site", "labor"] },
  { id: "furnished", label: "Fully furnished", hint: "All-in, furniture plus 20 ft container DDP to the gate", keep: null },
];

const kitL = [
  { id: "living", g: "ffe", label: "Living furniture", amount: 3315 },
  { id: "kitchen", g: "ffe", label: "Kitchen loose", amount: 840 },
  { id: "bed1", g: "ffe", label: "Primary bedroom", amount: 3030 },
  { id: "bed2", g: "ffe", label: "Bedroom 2", amount: 2345 },
];

function baths(two) {
  return two
    ? [
        { id: "bath1", g: "ffe", label: "Bath 1", amount: 320 },
        { id: "bath2", g: "ffe", label: "Bath 2", amount: 320 },
      ]
    : [{ id: "bath1", g: "ffe", label: "Bath 1", amount: 320 }];
}

function ffeTail(extra) {
  return [
    { id: "install", g: "ffe", label: "Factory fit and island install", amount: 30000, hint: "Pack, set, and dress the house" },
    {
      id: "ffefreight",
      g: "ffe",
      label: "20 ft FF&E container, DDP to the gate",
      amount: 12000,
      hint: "China port to the Moonlight Bay entrance. Furniture only — not the house.",
    },
    ...extra,
  ];
}

const STYLES = {
  spiral: {
    name: "Spiral-deck container",
    lines: [
      { id: "shell", g: "landed", label: "Unfurnished shell", amount: 48000, hint: "Factory module, on site" },
      { id: "freight", g: "landed", label: "Ocean freight", amount: 15000 },
      { id: "inland", g: "landed", label: "Inland haul and duties", amount: 5000 },
      { id: "civil", g: "civil", label: "Civil — slab, excavation, site prep", amount: 22000 },
      { id: "mep", g: "civil", label: "MEP — electrical, plumbing, septic tie", amount: 13000 },
      { id: "tie", g: "civil", label: "Hurricane tie-downs", amount: 2500 },
      { id: "crane", g: "civil", label: "Crane", amount: 3500 },
      { id: "contingency", g: "civil", label: "Contingency", amount: 20000 },
      { id: "deck", g: "site", label: "400 sf open teak deck", amount: 14000 },
      { id: "roof", g: "site", label: "Roof-deck structure", amount: 8500 },
      { id: "rail", g: "site", label: "Cable rail", amount: 4800 },
      { id: "fence", g: "site", label: "Wood fence", amount: 7200 },
      { id: "labor", g: "labor", label: "Assembly labor · 13 days", amount: 5460 },
      ...kitL,
      ...baths(true),
      { id: "deckffe", g: "ffe", label: "Open 400 sf deck furniture", amount: 3215 },
      { id: "roofffe", g: "ffe", label: "Roof-deck Adirondacks", amount: 750 },
      ...ffeTail([]),
    ],
  },
  hip: {
    name: "Hip-roof bungalow",
    lines: [
      { id: "shell", g: "landed", label: "Unfurnished shell", amount: 34500, hint: "Factory module, on site" },
      { id: "freight", g: "landed", label: "Ocean freight", amount: 9500 },
      { id: "inland", g: "landed", label: "Inland haul and duties", amount: 5000 },
      { id: "civil", g: "civil", label: "Civil — slab, excavation, site prep", amount: 20000 },
      { id: "mep", g: "civil", label: "MEP — electrical, plumbing, septic tie", amount: 15000 },
      { id: "tie", g: "civil", label: "Hurricane tie-downs", amount: 2000 },
      { id: "crane", g: "civil", label: "Crane", amount: 2500 },
      { id: "contingency", g: "civil", label: "Contingency", amount: 20000 },
      { id: "deck", g: "site", label: "400 sf teak deck", amount: 14000 },
      { id: "screen", g: "site", label: "Mosquito screen walls and roof", amount: 9500 },
      { id: "rail", g: "site", label: "Deck rail", amount: 3200 },
      { id: "fence", g: "site", label: "Wood fence", amount: 7200 },
      { id: "labor", g: "labor", label: "Assembly labor · 8 days", amount: 3360 },
      ...kitL,
      ...baths(true),
      { id: "deckffe", g: "ffe", label: "Screened 400 sf deck furniture", amount: 3215 },
      ...ffeTail([]),
    ],
  },
  gable: {
    name: "Two-story gable",
    lines: [
      { id: "shell", g: "landed", label: "Unfurnished shell", amount: 26250, hint: "Factory module, on site" },
      { id: "freight", g: "landed", label: "Ocean freight", amount: 19000 },
      { id: "inland", g: "landed", label: "Inland haul and duties", amount: 5000 },
      { id: "civil", g: "civil", label: "Civil — slab, excavation, site prep", amount: 22000 },
      { id: "mep", g: "civil", label: "MEP — electrical, plumbing, septic tie", amount: 13000 },
      { id: "tie", g: "civil", label: "Hurricane tie-downs", amount: 2500 },
      { id: "crane", g: "civil", label: "Crane", amount: 3500 },
      { id: "contingency", g: "civil", label: "Contingency", amount: 20000 },
      { id: "deck", g: "site", label: "400 sf teak deck", amount: 14000 },
      { id: "screen", g: "site", label: "Mosquito screen walls and roof", amount: 9500 },
      { id: "rail", g: "site", label: "Deck rail", amount: 3200 },
      { id: "fence", g: "site", label: "Wood fence", amount: 7200 },
      { id: "labor", g: "labor", label: "Assembly labor · 12 days", amount: 5040 },
      ...kitL,
      ...baths(true),
      { id: "deckffe", g: "ffe", label: "Screened 400 sf deck furniture", amount: 3215 },
      ...ffeTail([]),
    ],
  },
  terrace: {
    name: "Long terrace",
    lines: [
      { id: "shell", g: "landed", label: "Unfurnished shell", amount: 27375, hint: "Factory module, on site" },
      { id: "freight", g: "landed", label: "Ocean freight", amount: 9500 },
      { id: "inland", g: "landed", label: "Inland haul and duties", amount: 5000 },
      { id: "civil", g: "civil", label: "Civil — slab, excavation, site prep", amount: 20000 },
      { id: "mep", g: "civil", label: "MEP — electrical, plumbing, septic tie", amount: 15000 },
      { id: "tie", g: "civil", label: "Hurricane tie-downs", amount: 2000 },
      { id: "crane", g: "civil", label: "Crane", amount: 2500 },
      { id: "contingency", g: "civil", label: "Contingency", amount: 20000 },
      { id: "deck", g: "site", label: "400 sf teak deck", amount: 14000 },
      { id: "screen", g: "site", label: "Mosquito screen walls and roof", amount: 9500 },
      { id: "rail", g: "site", label: "Deck rail", amount: 3200 },
      { id: "fence", g: "site", label: "Wood fence", amount: 7200 },
      { id: "labor", g: "labor", label: "Assembly labor · 9 days", amount: 3780 },
      ...kitL,
      ...baths(false),
      { id: "deckffe", g: "ffe", label: "Screened 400 sf deck furniture", amount: 3215 },
      ...ffeTail([]),
    ],
  },
};

const ORDER = ["spiral", "hip", "gable", "terrace"];

let styleId = "spiral";
let preset = "furnished";
let on = new Set();

function lines() {
  return STYLES[styleId].lines;
}

function applyPreset(id) {
  preset = id;
  const p = PRESETS.find((x) => x.id === id);
  if (!p.keep) on = new Set(lines().map((l) => l.id));
  else on = new Set(lines().filter((l) => p.keep.includes(l.g)).map((l) => l.id));
  render();
}

function applyStyle(id) {
  styleId = id;
  applyPreset("furnished");
}

function toggle(id) {
  preset = "custom";
  if (on.has(id)) on.delete(id);
  else on.add(id);
  render();
}

function toggleGroup(g) {
  preset = "custom";
  const rows = lines().filter((l) => l.g === g);
  const allOn = rows.every((l) => on.has(l.id));
  for (const l of rows) {
    if (allOn) on.delete(l.id);
    else on.add(l.id);
  }
  render();
}

function sum(section) {
  return lines()
    .filter((l) => (!section || l.g === section) && on.has(l.id))
    .reduce((s, l) => s + l.amount, 0);
}

function presetTotal(id) {
  const p = PRESETS.find((x) => x.id === id);
  const ids = p.keep ? new Set(lines().filter((l) => p.keep.includes(l.g)).map((l) => l.id)) : new Set(lines().map((l) => l.id));
  return lines().filter((l) => ids.has(l.id)).reduce((s, l) => s + l.amount, 0);
}

function render() {
  document.getElementById("style-chips").innerHTML = ORDER.map(
    (id) =>
      `<button type="button" class="${id === styleId ? "on" : ""}" data-style="${id}">${STYLES[id].name}</button>`,
  ).join("");

  document.getElementById("preset-chips").innerHTML = PRESETS.map(
    (p) =>
      `<button type="button" class="${preset === p.id ? "on" : ""}" data-preset="${p.id}"><span>${p.label}</span><strong>${usd(presetTotal(p.id))}</strong></button>`,
  ).join("");

  document.getElementById("preset-hint").textContent =
    preset === "custom" ? "Custom mix — numbers update as you check lines." : PRESETS.find((p) => p.id === preset).hint;

  document.getElementById("boq-groups").innerHTML = GROUPS.map((g) => {
    const rows = lines().filter((l) => l.g === g.id);
    const sub = sum(g.id);
    return `<article class="group">
      <div class="group-head">
        <div>
          <h3>${g.title}</h3>
          <p class="muted">${g.blurb}</p>
        </div>
        <div class="group-actions">
          <span class="tabular">${usd(sub)}</span>
          <button type="button" class="ghost" data-group="${g.id}">${sub > 0 ? "Remove group" : "Add group"}</button>
        </div>
      </div>
      <ul>${rows
        .map(
          (l) => `<li>
            <button type="button" role="checkbox" aria-checked="${on.has(l.id)}" data-line="${l.id}" class="row">
              <span class="box ${on.has(l.id) ? "checked" : ""}"></span>
              <span class="grow">
                <span class="${on.has(l.id) ? "" : "off"}">${l.label}</span>
                ${l.hint ? `<small class="muted">${l.hint}</small>` : ""}
              </span>
              <span class="tabular ${on.has(l.id) ? "" : "off"}">${usd(on.has(l.id) ? l.amount : 0)}</span>
            </button>
          </li>`,
        )
        .join("")}</ul>
    </article>`;
  }).join("");

  document.getElementById("total-kicker").textContent = STYLES[styleId].name;
  document.getElementById("total-num").textContent = usd(sum());
  document.getElementById("total-dl").innerHTML = GROUPS.map(
    (g) => `<div><dt>${g.title}</dt><dd>${usd(sum(g.id))}</dd></div>`,
  ).join("");
}

document.getElementById("style-chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-style]");
  if (b) applyStyle(b.dataset.style);
});
document.getElementById("preset-chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-preset]");
  if (b) applyPreset(b.dataset.preset);
});
document.getElementById("boq-groups").addEventListener("click", (e) => {
  const g = e.target.closest("[data-group]");
  if (g) return toggleGroup(g.dataset.group);
  const l = e.target.closest("[data-line]");
  if (l) toggle(l.dataset.line);
});

applyPreset("furnished");
