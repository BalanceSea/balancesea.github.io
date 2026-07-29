const modules = import.meta.glob('./*/index.js', { eager: true, import: 'default' });

export const plugins = Object.values(modules).sort((a, b) => {
  return (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name);
});

export function getPlugin(slug) {
  return plugins.find((plugin) => plugin.slug === slug);
}
