<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import AppToc from './components/AppToc.vue';
import SearchModal from './components/SearchModal.vue';

const route = useRoute();
const sidebarOpen = ref(false);
const searchOpen = ref(false);
const theme = ref(localStorage.getItem('cloud-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

const tocItems = computed(() => route.name === 'plugin'
  ? [
      ['overview', '插件概览'],
      ['features', '核心功能'],
      ['installation', '安装方法'],
      ['commands', '命令与权限'],
      ['configuration', '配置说明']
    ]
  : [
      ['overview', '系列概览'],
      ['requirements', '兼容环境'],
      ['faq', '常见问题'],
      ['support', '获取支持']
    ]);

function applyTheme(value) {
  document.documentElement.dataset.theme = value;
  localStorage.setItem('cloud-theme', value);
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

function onKeydown(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchOpen.value = true;
  }
  if (event.key === 'Escape') searchOpen.value = false;
}

watch(theme, applyTheme, { immediate: true });
watch(() => route.fullPath, () => { sidebarOpen.value = false; searchOpen.value = false; });
onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div class="page-grid" aria-hidden="true"></div>
  <AppHeader
    :theme="theme"
    @toggle-theme="toggleTheme"
    @toggle-sidebar="sidebarOpen = !sidebarOpen"
    @open-search="searchOpen = true"
  />
  <div class="layout">
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />
    <div class="sidebar-backdrop" :class="{ show: sidebarOpen }" @click="sidebarOpen = false"></div>
    <main class="content"><RouterView /></main>
    <AppToc :items="tocItems" />
  </div>
  <SearchModal :open="searchOpen" @close="searchOpen = false" />
</template>
