import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

function githubPagesBase() {
  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
  if (!repository || repository.endsWith('.github.io')) return '/';
  return `/${repository}/`;
}

export default defineConfig({
  base: githubPagesBase(),
  plugins: [vue()]
});
