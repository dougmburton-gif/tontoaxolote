/**
 * Tonto Axolote — noticias de fútbol (RSS simple, nivel niños)
 * Usa un proxy CORS para leer titulares de fuentes abiertas.
 */
(function () {
  var FEEDS = [
    { url: "https://feeds.bbci.co.uk/mundo/deportes/rss.xml", tag: "🌎 Mundo" },
    { url: "https://feeds.bbci.co.uk/sport/football/rss.xml", tag: "⚽ Fútbol" },
  ];

  var PROXY = "https://api.allorigins.win/raw?url=";

  function $(id) {
    return document.getElementById(id);
  }

  function parseRss(xmlText) {
    var doc = new DOMParser().parseFromString(xmlText, "text/xml");
    if (doc.querySelector("parsererror")) return [];
    var items = doc.querySelectorAll("item");
    var out = [];
    for (var i = 0; i < items.length && out.length < 8; i++) {
      var item = items[i];
      var title = item.querySelector("title");
      var link = item.querySelector("link");
      var pub = item.querySelector("pubDate");
      if (!title || !link) continue;
      out.push({
        title: title.textContent.trim(),
        link: link.textContent.trim(),
        date: pub ? pub.textContent.trim() : "",
      });
    }
    return out;
  }

  function fetchOne(feed) {
    return fetch(PROXY + encodeURIComponent(feed.url))
      .then(function (r) {
        if (!r.ok) throw new Error("feed");
        return r.text();
      })
      .then(function (xml) {
        return parseRss(xml).map(function (item) {
          item.tag = feed.tag;
          return item;
        });
      })
      .catch(function () {
        return [];
      });
  }

  function formatDate(raw) {
    if (!raw) return "";
    var d = new Date(raw);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("es", { day: "numeric", month: "short" });
  }

  function renderNews(listEl, items) {
    if (!items.length) {
      listEl.innerHTML =
        '<p class="feed-empty">No pudimos cargar noticias ahora. Vuelve en un rato. El internet a veces se cansa.</p>';
      return;
    }
    items.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    var html = "";
    items.slice(0, 12).forEach(function (item) {
      html +=
        '<article class="news-item">' +
        '<span class="news-tag">' +
        item.tag +
        "</span>" +
        '<a href="' +
        item.link +
        '" target="_blank" rel="noopener noreferrer">' +
        item.title +
        "</a>" +
        (item.date ? '<time class="news-date">' + formatDate(item.date) + "</time>" : "") +
        "</article>";
    });
    listEl.innerHTML = html;
  }

  function loadNews() {
    var listEl = $("news-list");
    var statusEl = $("news-status");
    if (!listEl) return;
    if (statusEl) statusEl.textContent = "Buscando titulares…";

    Promise.all(FEEDS.map(fetchOne))
      .then(function (groups) {
        var all = [];
        groups.forEach(function (g) {
          all = all.concat(g);
        });
        renderNews(listEl, all);
        if (statusEl) {
          statusEl.textContent = all.length
            ? "Titulares de hoy — toca el enlace para leer más en la fuente."
            : "";
        }
      })
      .catch(function () {
        renderNews(listEl, []);
        if (statusEl) statusEl.textContent = "";
      });
  }

  function initTabs() {
    var tabs = document.querySelectorAll("[data-tab]");
    var panels = document.querySelectorAll("[data-panel]");
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          t.classList.toggle("active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        panels.forEach(function (p) {
          var show = p.getAttribute("data-panel") === name;
          p.hidden = !show;
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    loadNews();
  });
})();
