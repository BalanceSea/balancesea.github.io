import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const sourceIndex = join(dist, 'index.html');
const pluginRoot = join(root, 'src', 'plugins');
const pluginDirectories = (await readdir(pluginRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const slug of pluginDirectories) {
  const routeDirectory = join(dist, 'plugins', slug);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(sourceIndex, join(routeDirectory, 'index.html'));
}

await copyFile(sourceIndex, join(dist, '404.html'));
console.log(`Generated ${pluginDirectories.length} plugin route(s) and 404 fallback.`);
