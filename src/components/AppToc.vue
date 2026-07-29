<script setup>
import { GitFork } from '@lucide/vue';
defineProps({ items: { type: Array, required: true } });
</script>

<template>
  <aside class="toc" aria-label="本页目录">
    <p>本页内容</p>
    <a v-for="([id, label], index) in items" :key="id" class="toc-link" :class="{ active: index === 0 }" :href="`#${id}`">{{ label }}</a>
    <div class="toc-help"><GitFork /><a href="https://github.com/yourname/cloud-plugins" target="_blank" rel="noreferrer">查看仓库</a></div>
  </aside>
</template>
