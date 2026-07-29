<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowDown, Check, CircleCheckBig, Copy, Database, Download, FileCode2 } from 'lucide-vue-next';
import { getPlugin } from '../plugins/registry.js';
import SiteFooter from '../components/SiteFooter.vue';

const route = useRoute();
const router = useRouter();
const plugin = computed(() => getPlugin(route.params.slug));
const toast = ref('');

watchEffect(() => {
  if (!plugin.value) router.replace({ name: 'home' });
  else document.title = `${plugin.value.name} · ${plugin.value.title} | 云插件系列 Cloud`;
});

async function copyConfig(code) {
  let copied = false;
  try { await navigator.clipboard.writeText(code); copied = true; }
  catch {
    const area = document.createElement('textarea');
    area.value = code; area.style.position = 'fixed'; area.style.opacity = '0';
    document.body.appendChild(area); area.select(); copied = document.execCommand('copy'); area.remove();
  }
  toast.value = copied ? '配置已复制到剪贴板' : '复制失败，请手动选择内容';
  window.setTimeout(() => { toast.value = ''; }, 1800);
}
</script>

<template>
  <template v-if="plugin">
    <article>
      <section class="plugin-detail-hero doc-section" id="overview">
        <div class="plugin-breadcrumb"><RouterLink :to="{ name: 'home' }">云插件系列</RouterLink><span>›</span><span>{{ plugin.name }}</span></div>
        <div class="plugin-title-row"><span class="detail-icon" :class="plugin.tone"><component :is="plugin.icon" /></span><div><div class="eyebrow">{{ plugin.category }}</div><h1>{{ plugin.name }}</h1><p>{{ plugin.title }}</p></div></div>
        <p class="plugin-intro">{{ plugin.intro }}</p>
        <div class="hero-actions"><a class="primary-button" href="#installation">开始安装 <ArrowDown /></a><a class="secondary-button" href="#installation"><Download />获取 v{{ plugin.version }}</a></div>
        <div class="plugin-meta-strip"><div><span>当前版本</span><strong>v{{ plugin.version }}</strong></div><div><span>支持服务端</span><strong>{{ plugin.server }}</strong></div><div><span>Minecraft</span><strong>{{ plugin.minecraft }}</strong></div><div><span>作者</span><strong>MoutainSeaL</strong></div></div>
      </section>

      <section class="doc-section prose-section" id="features"><div class="section-kicker">01 / Features</div><h2>核心功能</h2><p class="lead">从玩家获取到数据保存，功能由一套系统完整管理。</p><div class="detail-feature-grid"><article v-for="([title, text], index) in plugin.features" :key="title"><span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ title }}</h3><p>{{ text }}</p></article></div></section>

      <section class="doc-section prose-section" id="installation"><div class="section-kicker">02 / Installation</div><h2>安装方法</h2><p class="lead">{{ plugin.installation.lead }}</p><div class="steps"><article v-for="([title, text], index) in plugin.installation.steps" :key="title" class="step"><span class="step-number">{{ index + 1 }}</span><div><h3>{{ title }}</h3><p>{{ text }}</p></div></article></div><div class="callout success"><CircleCheckBig /><div><strong>按功能安装软依赖</strong><p>{{ plugin.installation.note }}</p></div></div></section>

      <section class="doc-section prose-section" id="commands"><div class="section-kicker">03 / Commands</div><h2>命令与权限</h2><p class="lead">主命令别名为 <code>{{ plugin.aliases }}</code>。</p><div class="table-wrap"><table><thead><tr><th>命令</th><th>功能</th><th>权限</th></tr></thead><tbody><tr v-for="command in plugin.commands" :key="command[0]"><td><code>{{ command[0] }}</code></td><td>{{ command[1] }}</td><td><code>{{ command[2] }}</code></td></tr></tbody></table></div></section>

      <section class="doc-section prose-section" id="configuration"><div class="section-kicker">04 / Configuration</div><h2>配置说明</h2><p class="lead">{{ plugin.configuration.intro }}</p><div v-for="file in plugin.configuration.files" :key="file.name" class="config-file"><h3 class="config-subheading">{{ file.name }}</h3><div class="code-block"><div class="code-header"><span><FileCode2 />{{ file.name }} · {{ file.description }}</span><button class="copy-button" type="button" :aria-label="`复制 ${file.name}`" @click="copyConfig(file.code)"><Copy /><span>复制</span></button></div><pre><code>{{ file.code }}</code></pre></div></div><div class="callout success"><Database /><div><strong>跨服部署</strong><p>{{ plugin.configuration.note }}</p></div></div></section>
    </article>
    <SiteFooter />
    <div class="toast" :class="{ show: toast }" role="status"><Check /><span>{{ toast }}</span></div>
  </template>
</template>
