<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { BookOpen, Search, SearchX } from 'lucide-vue-next';
import { plugins } from '../plugins/registry.js';

const props = defineProps({ open: Boolean });
const emit = defineEmits(['close']);
const query = ref('');
const input = ref(null);

const homeItems = [
  { title: '系列概览', text: '云插件系列官方文档', to: { name: 'home', hash: '#overview' } },
  { title: '兼容环境', text: 'Paper Java Minecraft 版本', to: { name: 'home', hash: '#requirements' } },
  { title: '常见问题', text: '插件列表 配置文档', to: { name: 'home', hash: '#faq' } }
];
const items = computed(() => [
  ...homeItems,
  ...plugins.map((plugin) => ({ title: `${plugin.name} · ${plugin.title}`, text: `${plugin.summary} ${plugin.keywords}`, to: { name: 'plugin', params: { slug: plugin.slug } } }))
]);
const results = computed(() => {
  const term = query.value.trim().toLowerCase();
  if (!term) return [];
  return items.value.filter((item) => `${item.title} ${item.text}`.toLowerCase().includes(term));
});

watch(() => props.open, async (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) { await nextTick(); input.value?.focus(); }
  else query.value = '';
});
</script>

<template>
  <div v-if="open" class="search-modal" role="dialog" aria-modal="true" aria-label="搜索文档" @click.self="emit('close')">
    <div class="search-panel">
      <div class="search-input-wrap"><Search /><input ref="input" v-model="query" type="search" placeholder="搜索插件或文档..." autocomplete="off"><kbd>Esc</kbd></div>
      <div v-if="query && results.length" class="search-results">
        <RouterLink v-for="result in results" :key="result.title" class="search-result" :to="result.to" @click="emit('close')"><strong>{{ result.title }}</strong><p>{{ result.text }}</p></RouterLink>
      </div>
      <div v-else class="search-empty">
        <SearchX v-if="query" /><BookOpen v-else />
        <p>{{ query ? '没有找到相关内容' : '输入关键词开始搜索' }}</p>
        <span>{{ query ? '试试插件名、命令或功能关键词' : '可搜索插件、功能与文档章节' }}</span>
      </div>
    </div>
  </div>
</template>
