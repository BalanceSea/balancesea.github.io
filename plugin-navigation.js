(function renderPluginNavigation() {
  const container = document.querySelector('#pluginSideNav');
  const plugins = window.CLOUD_CATALOG || [];
  if (!container) return;

  const base = container.dataset.base || 'plugins';
  const current = document.body.dataset.plugin || '';
  container.innerHTML = plugins.map((plugin) => {
    const active = plugin.slug === current ? ' active' : '';
    const currentAttribute = plugin.slug === current ? ' aria-current="page"' : '';
    return `<a class="nav-link${active}" href="${base}/${plugin.slug}/"${currentAttribute}>
      <i data-lucide="${plugin.icon}"></i>
      <span>${plugin.name}<small>${plugin.title}</small></span>
    </a>`;
  }).join('');
})();
