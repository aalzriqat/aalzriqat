#!/usr/bin/env node
/**
 * Generates assets/stats-dark.svg and assets/stats-light.svg from the GitHub API.
 *
 * Self-contained on purpose: the popular third-party stats-card services go down
 * (github-readme-stats was returning 503 DEPLOYMENT_PAUSED when this was written),
 * and a broken image on a profile README is worse than no image at all.
 *
 * Usage: GITHUB_TOKEN=<token> node scripts/build-stats.mjs
 */

const USER = process.env.GH_USER || "aalzriqat";
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error("GITHUB_TOKEN is required.");
  process.exit(1);
}

/** Build artifacts and vendored template files — not work this profile should claim. */
const EXCLUDED_LANGS = new Set([
  "Shell", "Perl", "Makefile", "Batchfile", "CMake", "Starlark",
  "Objective-C", "Objective-C++", "Ruby", "C++", "C", "Dockerfile",
]);

const LANG_COLORS = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#663399",
  HTML: "#e34c26",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Python: "#3572A5",
  Java: "#b07219",
  SCSS: "#c6538c",
  Vue: "#41b883",
};
const OTHER_COLOR = "#7d8590";

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar { totalContributions }
      totalCommitContributions
      restrictedContributionsCount
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      totalCount
      nodes {
        name
        languages(first: 12, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name } }
        }
      }
    }
  }
}`;

async function fetchStats() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": `${USER}-profile-stats`,
    },
    body: JSON.stringify({ query: QUERY, variables: { login: USER } }),
  });

  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);

  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);
  return json.data.user;
}

function summarize(user) {
  const c = user.contributionsCollection;
  const byLang = new Map();

  for (const repo of user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      if (EXCLUDED_LANGS.has(name)) continue;
      byLang.set(name, (byLang.get(name) ?? 0) + edge.size);
    }
  }

  const total = [...byLang.values()].reduce((a, b) => a + b, 0) || 1;
  const ranked = [...byLang.entries()].sort((a, b) => b[1] - a[1]);
  const top = ranked
    .slice(0, 5)
    .map(([name, size]) => ({
      name,
      pct: (size / total) * 100,
      color: LANG_COLORS[name] ?? OTHER_COLOR,
    }))
    // A language that rounds to 0.0% reads as a rendering bug, not a fact.
    .filter((l) => l.pct >= 0.1);

  const accounted = top.reduce((a, l) => a + l.pct, 0);
  if (100 - accounted >= 0.1) {
    top.push({ name: "Other", pct: 100 - accounted, color: OTHER_COLOR });
  }

  return {
    contributions: c.contributionCalendar.totalContributions,
    commits: c.totalCommitContributions,
    repos: user.repositories.totalCount,
    languages: top,
  };
}

const fmt = (n) => n.toLocaleString("en-US");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function render(stats, theme) {
  const t = theme === "dark"
    ? { bg: "#0d1117", value: "#e6edf3", label: "#7d8590", rule: "#30363d",
        track: "#21262d", a1: "#6366f1", a2: "#22d3ee" }
    : { bg: "#ffffff", value: "#1f2328", label: "#59636e", rule: "#d1d9e0",
        track: "#eaeef2", a1: "#4f46e5", a2: "#0891b2" };

  const SANS = "ui-sans-serif, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const MONO = "ui-monospace, 'SFMono-Regular', 'Cascadia Mono', Menlo, Consolas, monospace";

  const X = 72;
  const BAR_W = 1056;

  const cells = [
    { value: fmt(stats.contributions), label: "CONTRIBUTIONS · LAST YEAR" },
    { value: fmt(stats.commits), label: "COMMITS · LAST YEAR" },
    { value: fmt(stats.repos), label: "PUBLIC REPOSITORIES" },
  ];

  const statsSvg = cells.map((cell, i) => {
    const x = X + i * 352;
    return `
  <text x="${x}" y="86" font-family="${SANS}" font-size="42" font-weight="700" letter-spacing="-1" fill="${t.value}">${esc(cell.value)}</text>
  <text x="${x}" y="112" font-family="${MONO}" font-size="11.5" letter-spacing="2.2" fill="${t.label}">${esc(cell.label)}</text>`;
  }).join("");

  // Stacked language bar. Segments are butted together with a rounded clip so the
  // whole bar reads as one pill rather than six separate chips.
  let cursor = X;
  const segments = stats.languages.map((l) => {
    const w = (l.pct / 100) * BAR_W;
    const seg = `<rect x="${cursor.toFixed(2)}" y="182" width="${w.toFixed(2)}" height="10" fill="${l.color}"/>`;
    cursor += w;
    return seg;
  }).join("\n    ");

  const legend = stats.languages.map((l, i) => {
    const x = X + i * 186;
    return `
  <circle cx="${x + 4}" cy="228" r="4.5" fill="${l.color}"/>
  <text x="${x + 17}" y="232" font-family="${MONO}" font-size="12" fill="${t.label}">${esc(l.name)} ${l.pct.toFixed(1)}%</text>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="270" viewBox="0 0 1200 270" role="img" aria-label="GitHub statistics for ${esc(USER)}">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.a1}"/>
      <stop offset="100%" stop-color="${t.a2}"/>
    </linearGradient>
    <clipPath id="barclip">
      <rect x="${X}" y="182" width="${BAR_W}" height="10" rx="5"/>
    </clipPath>
  </defs>

  <rect width="1200" height="270" fill="${t.bg}"/>
  <rect x="${X}" y="30" width="44" height="3" rx="1.5" fill="url(#accent)"/>
${statsSvg}

  <line x1="${X}" y1="140" x2="${X + BAR_W}" y2="140" stroke="${t.rule}" stroke-width="1"/>
  <text x="${X}" y="168" font-family="${MONO}" font-size="11.5" letter-spacing="2.2" fill="${t.label}">LANGUAGE DISTRIBUTION · BY VOLUME, PUBLIC REPOSITORIES</text>

  <rect x="${X}" y="182" width="${BAR_W}" height="10" rx="5" fill="${t.track}"/>
  <g clip-path="url(#barclip)">
    ${segments}
  </g>
${legend}
</svg>
`;
}

const { writeFile, mkdir } = await import("node:fs/promises");

const user = await fetchStats();
const stats = summarize(user);

await mkdir("assets", { recursive: true });
await writeFile("assets/stats-dark.svg", render(stats, "dark"), "utf8");
await writeFile("assets/stats-light.svg", render(stats, "light"), "utf8");

console.log("Generated stats cards:");
console.log(`  contributions : ${fmt(stats.contributions)}`);
console.log(`  commits       : ${fmt(stats.commits)}`);
console.log(`  repositories  : ${fmt(stats.repos)}`);
console.log(`  languages     : ${stats.languages.map((l) => `${l.name} ${l.pct.toFixed(1)}%`).join(", ")}`);
