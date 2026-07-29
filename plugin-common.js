const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function initIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
}

const themeToggle = $('#themeToggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('cloud-theme', theme);
  themeToggle.innerHTML = `<i data-lucide="${theme === 'dark' ? 'moon' : 'sun'}"></i>`;
  initIcons();
}
setTheme(localStorage.getItem('cloud-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

const sidebar = $('#sidebar');
const backdrop = $('#sidebarBackdrop');
const menuToggle = $('#menuToggle');
function closeMenu() {
  sidebar.classList.remove('open');
  backdrop.classList.remove('show');
  menuToggle.setAttribute('aria-label', '打开插件目录');
}
menuToggle.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  backdrop.classList.toggle('show', open);
  menuToggle.setAttribute('aria-label', open ? '关闭插件目录' : '打开插件目录');
});
backdrop.addEventListener('click', closeMenu);

const sections = $$('.doc-section[id]');
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  $$('.toc-link').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .15, .4] });
sections.forEach((section) => observer.observe(section));

let toastTimer;
const copyButton = $('#copyConfig');
if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const config = $('#configCode').innerText;
    let copied = false;
    try {
      await Promise.race([
        navigator.clipboard.writeText(config),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Clipboard timeout')), 800))
      ]);
      copied = true;
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = config;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      copied = document.execCommand('copy');
      textArea.remove();
    }
    $('#toast span').textContent = copied ? '配置已复制到剪贴板' : '复制失败，请手动选择内容';
    $('#toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 1800);
  });
}

window.addEventListener('resize', () => { if (innerWidth > 900) closeMenu(); });
initIcons();
