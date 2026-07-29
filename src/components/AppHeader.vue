<script setup>
import { Menu, MessageCircle, Moon, Search, Sun } from '@lucide/vue';
import BrandMark from './BrandMark.vue';

defineProps({ theme: { type: String, required: true } });
defineEmits(['toggleTheme', 'toggleSidebar', 'openSearch']);
</script>

<template>
  <header class="topbar">
    <RouterLink class="brand" :to="{ name: 'home' }" aria-label="云插件系列首页">
      <BrandMark />
      <span class="brand-copy"><strong>Cloud</strong><small>云插件系列</small></span>
    </RouterLink>
    <button class="search-trigger" type="button" aria-label="搜索文档" @click="$emit('openSearch')">
      <Search /><span>搜索插件与文档...</span><kbd>Ctrl K</kbd>
    </button>
    <div class="topbar-actions">
      <a class="icon-button" href="https://qm.qq.com/" target="_blank" rel="noreferrer" aria-label="联系作者 QQ 3643203568" data-tooltip="联系作者"><MessageCircle /></a>
      <button class="icon-button" type="button" aria-label="切换主题" data-tooltip="切换主题" @click="$emit('toggleTheme')">
        <Moon v-if="theme === 'dark'" /><Sun v-else />
      </button>
      <button class="icon-button mobile-only" type="button" aria-label="打开插件目录" data-tooltip="插件目录" @click="$emit('toggleSidebar')"><Menu /></button>
    </div>
  </header>
</template>
