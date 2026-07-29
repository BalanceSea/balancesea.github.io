<script setup>
import { MessageCircle } from '@lucide/vue';
defineProps({ items: { type: Array, required: true } });
</script>

<template>
  <aside class="toc" aria-label="本页目录">
    <p>本页内容</p>
    <a v-for="([id, label], index) in items" :key="id" class="toc-link" :class="{ active: index === 0 }" :href="`#${id}`">{{ label }}</a>
    <div class="toc-help"><MessageCircle /><a href="https://qm.qq.com/" target="_blank" rel="noreferrer">联系作者 · 3643203568</a></div>
  </aside>
</template>
