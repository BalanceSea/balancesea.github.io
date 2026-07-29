import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pluginsRoot = join(root, 'plugins');
const directories = (await readdir(pluginsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

const required = ['slug', 'name', 'title', 'category', 'version', 'icon', 'tone', 'summary', 'keywords'];
const plugins = [];

for (const directory of directories) {
  const metadataPath = join(pluginsRoot, directory.name, 'plugin.json');
  let metadata;
  try {
    metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
  } catch (error) {
    throw new Error(`Cannot read ${metadataPath}: ${error.message}`);
  }

  const missing = required.filter((field) => metadata[field] === undefined || metadata[field] === '');
  if (missing.length) throw new Error(`${metadataPath} is missing: ${missing.join(', ')}`);
  if (metadata.slug !== directory.name) throw new Error(`${metadataPath}: slug must match directory name`);

  plugins.push(Object.fromEntries(required.map((field) => [field, metadata[field]])));
}

const output = `// Generated from plugins/*/plugin.json. Do not edit manually.\nwindow.CLOUD_CATALOG = ${JSON.stringify(plugins, null, 2)};\n`;
await writeFile(join(root, 'catalog-data.js'), output, 'utf8');
console.log(`Generated catalog-data.js with ${plugins.length} plugin(s).`);
