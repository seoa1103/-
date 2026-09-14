import { seriesCatalog } from "./series-data.js";

const seriesById = new Map(seriesCatalog.map((series) => [series.id, series]));
const sessionBySeries = new Map(seriesCatalog.map((series) => [series.id, restoreSession(series)]));

const elements = {
  tabs: document.querySelector("#series-tabs"),
  seriesNumber: document.querySelector("#series-number"),
  seriesTitle: document.querySelector("#series-title"),
  seriesDescription: document.querySelector("#series-description"),
  currentCount: document.querySelector("#current-count"),
  visitedCount: document.querySelector("#visited-count"),
  previousButton: document.querySelector("#previous-button"),
  resetButton: document.querySelector("#reset-button"),
  fragmentKicker: document.querySelector("#fragment-kicker"),
  fragmentTitle: document.querySelector("#fragment-title"),
  fragmentBody: document.querySelector("#fragment-body"),
  fragmentLinks: document.querySelector("#fragment-links"),
  copyLinkButton: document.querySelector("#copy-link-button")
};

let activeSeriesId = resolveRoute().seriesId;

function storageKey(seriesId) {
  return `hyperlink-archive:${seriesId}`;
}

function restoreSession(series) {
  const fallback = { currentNode: series.start, history: [], visited: [series.start] };

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey(series.id)));
    if (!stored || !series.nodes[stored.currentNode]) return fallback;

    return {
      currentNode: stored.currentNode,
      history: Array.isArray(stored.history)
        ? stored.history.filter((nodeId) => Boolean(series.nodes[nodeId]))
        : [],
      visited: Array.isArray(stored.visited)
        ? [...new Set(stored.visited.filter((nodeId) => Boolean(series.nodes[nodeId])))]
        : [stored.currentNode]
    };
  } catch {
    return fallback;
  }
}

function saveSession(seriesId) {
  localStorage.setItem(storageKey(seriesId), JSON.stringify(sessionBySeries.get(seriesId)));
}

function resolveRoute() {
  const [, rawSeriesId, rawNodeId] = location.hash.match(/^#\/([^/]+)\/([^/]+)$/) ?? [];
  const series = seriesById.get(rawSeriesId) ?? seriesCatalog[0];
  const session = sessionBySeries.get(series.id);
  const nodeId = series.nodes[rawNodeId] ? rawNodeId : session.currentNode;
  return { seriesId: series.id, nodeId };
}

function routeTo(seriesId, nodeId, { replace = false } = {}) {
  const nextHash = `#/${seriesId}/${nodeId}`;
  const method = replace ? "replaceState" : "pushState";
  history[method](null, "", nextHash);
}

function buildTabs() {
  const fragment = document.createDocumentFragment();

  seriesCatalog.forEach((series) => {
    const button = document.createElement("button");
    button.className = "series-tab";
    button.type = "button";
    button.role = "tab";
    button.id = `tab-${series.id}`;
    button.setAttribute("aria-controls", "reader");
    button.textContent = `${series.label} / ${series.title}`;
    button.addEventListener("click", () => switchSeries(series.id));
    fragment.append(button);
  });

  elements.tabs.replaceChildren(fragment);
}

function switchSeries(seriesId) {
  const session = sessionBySeries.get(seriesId);
  activeSeriesId = seriesId;
  routeTo(seriesId, session.currentNode);
  render();
}

function navigateWithinSeries(nodeId) {
  const series = seriesById.get(activeSeriesId);
  const session = sessionBySeries.get(activeSeriesId);
  if (!series.nodes[nodeId] || nodeId === session.currentNode) return;

  session.history.push(session.currentNode);
  session.currentNode = nodeId;
  if (!session.visited.includes(nodeId)) session.visited.push(nodeId);
  saveSession(activeSeriesId);
  routeTo(activeSeriesId, nodeId);
  render();
  elements.fragmentTitle.focus?.();
}

function goBackWithinSeries() {
  const session = sessionBySeries.get(activeSeriesId);
  const previousNode = session.history.pop();
  if (!previousNode) return;

  session.currentNode = previousNode;
  saveSession(activeSeriesId);
  routeTo(activeSeriesId, previousNode);
  render();
}

function resetActiveSeries() {
  const series = seriesById.get(activeSeriesId);
  sessionBySeries.set(activeSeriesId, {
    currentNode: series.start,
    history: [],
    visited: [series.start]
  });
  saveSession(activeSeriesId);
  routeTo(activeSeriesId, series.start);
  render();
}

function render() {
  const series = seriesById.get(activeSeriesId);
  const session = sessionBySeries.get(activeSeriesId);
  const node = series.nodes[session.currentNode];
  const nodeIds = Object.keys(series.nodes);

  document.querySelectorAll(".series-tab").forEach((tab) => {
    const selected = tab.id === `tab-${series.id}`;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  elements.seriesNumber.textContent = series.label;
  elements.seriesTitle.textContent = series.title;
  elements.seriesDescription.textContent = series.description;
  elements.currentCount.textContent = `${String(nodeIds.indexOf(session.currentNode) + 1).padStart(2, "0")} / ${String(nodeIds.length).padStart(2, "0")}`;
  elements.visitedCount.textContent = `${String(session.visited.length).padStart(2, "0")} / ${String(nodeIds.length).padStart(2, "0")}`;
  elements.previousButton.disabled = session.history.length === 0;

  elements.fragmentKicker.textContent = node.kicker;
  elements.fragmentTitle.textContent = node.title;
  elements.fragmentBody.replaceChildren(
    ...node.body.map((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      return element;
    })
  );

  elements.fragmentLinks.replaceChildren(
    ...node.links.map((link, index) => {
      const anchor = document.createElement("a");
      anchor.className = "fragment-link";
      anchor.href = `#/${series.id}/${link.to}`;
      anchor.innerHTML = `
        <span class="fragment-link__number">${String(index + 1).padStart(2, "0")}</span>
        <span class="fragment-link__label"></span>
        <span class="fragment-link__arrow" aria-hidden="true">→</span>
      `;
      anchor.querySelector(".fragment-link__label").textContent = link.label;
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        navigateWithinSeries(link.to);
      });
      return anchor;
    })
  );

  document.title = `${node.title} — ${series.title}`;
}

async function copyCurrentLink() {
  try {
    await navigator.clipboard.writeText(location.href);
    elements.copyLinkButton.textContent = "복사됨";
    window.setTimeout(() => {
      elements.copyLinkButton.textContent = "링크 복사";
    }, 1400);
  } catch {
    elements.copyLinkButton.textContent = "복사 실패";
  }
}

function syncFromUrl() {
  const route = resolveRoute();
  const session = sessionBySeries.get(route.seriesId);
  activeSeriesId = route.seriesId;

  if (route.nodeId !== session.currentNode) {
    session.currentNode = route.nodeId;
    if (!session.visited.includes(route.nodeId)) session.visited.push(route.nodeId);
    saveSession(route.seriesId);
  }

  routeTo(activeSeriesId, session.currentNode, { replace: true });
  render();
}

elements.previousButton.addEventListener("click", goBackWithinSeries);
elements.resetButton.addEventListener("click", resetActiveSeries);
elements.copyLinkButton.addEventListener("click", copyCurrentLink);
window.addEventListener("hashchange", syncFromUrl);

elements.tabs.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  const currentIndex = seriesCatalog.findIndex((series) => series.id === activeSeriesId);
  const delta = event.key === "ArrowRight" ? 1 : -1;
  const nextIndex = (currentIndex + delta + seriesCatalog.length) % seriesCatalog.length;
  const nextSeries = seriesCatalog[nextIndex];
  switchSeries(nextSeries.id);
  document.querySelector(`#tab-${nextSeries.id}`).focus();
});

buildTabs();
syncFromUrl();
