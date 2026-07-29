const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const plugins = window.CLOUD_CATALOG || [];

function initIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
}

const themeToggle = $('#themeToggle');
const menuToggle = $('#menuToggle');
const sidebar = $('#sidebar');
const sidebarBackdrop = $('#sidebarBackdrop');
const searchModal = $('#searchModal');
const searchInput = $('#searchInput');
const searchResults = $('#searchResults');
const searchEmpty = $('#searchEmpty');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('cloud-theme', theme);
  themeToggle.innerHTML = `<i data-lucide="${theme === 'dark' ? 'moon' : 'sun'}"></i>`;
  initIcons();
}

setTheme(localStorage.getItem('cloud-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

function closeMenu() {
  sidebar.classList.remove('open');
  sidebarBackdrop.classList.remove('show');
  menuToggle.setAttribute('aria-label', '打开目录');
}
menuToggle.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  sidebarBackdrop.classList.toggle('show', open);
  menuToggle.setAttribute('aria-label', open ? '关闭目录' : '打开目录');
});
sidebarBackdrop.addEventListener('click', closeMenu);
$$('.nav-link').forEach((link) => link.addEventListener('click', closeMenu));

const sections = $$('.doc-section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  $$('.nav-link, .toc-link').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .15, .4] });
sections.forEach((section) => sectionObserver.observe(section));

const searchIndex = [
  ...sections.map((section) => ({ title: section.dataset.title, href: `#${section.id}`, text: section.textContent.replace(/\s+/g, ' ').trim() })),
  ...plugins.map((plugin) => ({ title: `${plugin.name} · ${plugin.title}`, href: `plugins/${plugin.slug}/`, text: `${plugin.category} ${plugin.summary} ${plugin.keywords}` }))
];

function openSearch() { searchModal.hidden = false; document.body.style.overflow = 'hidden'; requestAnimationFrame(() => searchInput.focus()); }
function closeSearch() { searchModal.hidden = true; document.body.style.overflow = ''; searchInput.value = ''; renderSearch(''); }
function renderSearch(query) {
  const term = query.trim().toLowerCase();
  searchResults.innerHTML = '';
  searchEmpty.hidden = Boolean(term);
  searchResults.hidden = !term;
  if (!term) return;
  const matches = searchIndex.filter((item) => item.text.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
  if (!matches.length) {
    searchResults.hidden = true; searchEmpty.hidden = false;
    searchEmpty.innerHTML = '<i data-lucide="search-x"></i><p>没有找到相关内容</p><span>试试插件名或功能关键词</span>'; initIcons(); return;
  }
  matches.forEach((item) => {
    const result = document.createElement('a'); result.className = 'search-result'; result.href = item.href;
    result.innerHTML = `<strong>${item.title}</strong><p>${item.text.slice(0, 96)}...</p>`;
    result.addEventListener('click', closeSearch); searchResults.appendChild(result);
  });
}
$('#searchTrigger').addEventListener('click', openSearch);
searchInput.addEventListener('input', (event) => renderSearch(event.target.value));
searchModal.addEventListener('click', (event) => { if (event.target === searchModal) closeSearch(); });
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
  if (event.key === 'Escape' && !searchModal.hidden) closeSearch();
});
window.addEventListener('resize', () => { if (innerWidth > 900) closeMenu(); });
initIcons();
