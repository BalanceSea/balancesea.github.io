<script setup>
import { BadgeCheck, CircleHelp, Cloud, MessagesSquare } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { plugins } from '../plugins/registry.js';

defineProps({ open: Boolean });
const emit = defineEmits(['close']);
const route = useRoute();
</script>

<template>
  <aside class="sidebar plugin-sidebar" :class="{ open }" id="sidebar">
    <nav aria-label="文档与插件目录">
      <div class="nav-group">
        <p>文档</p>
        <RouterLink class="nav-link" :class="{ active: route.name === 'home' && (!route.hash || route.hash === '#overview') }" :to="{ name: 'home', hash: '#overview' }" @click="emit('close')"><Cloud />系列概览</RouterLink>
      </div>
      <div class="nav-group">
        <p>插件列表</p>
        <RouterLink
          v-for="plugin in plugins"
          :key="plugin.slug"
          class="nav-link"
          :class="{ active: route.name === 'plugin' && route.params.slug === plugin.slug }"
          :to="{ name: 'plugin', params: { slug: plugin.slug } }"
          @click="emit('close')"
        >
          <component :is="plugin.icon" />
          <span>{{ plugin.name }}<small>{{ plugin.title }}</small></span>
        </RouterLink>
      </div>
      <div class="nav-group">
        <p>帮助</p>
        <RouterLink class="nav-link" :to="{ name: 'home', hash: '#requirements' }" @click="emit('close')"><BadgeCheck />兼容环境</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'home', hash: '#faq' }" @click="emit('close')"><CircleHelp />常见问题</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'home', hash: '#support' }" @click="emit('close')"><MessagesSquare />获取支持</RouterLink>
      </div>
    </nav>
    <div class="sidebar-meta"><div><span>作者</span><strong>MoutainSeaL</strong></div><div><span>QQ</span><strong>3643203568</strong></div></div>
  </aside>
</template>
