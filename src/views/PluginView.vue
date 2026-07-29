<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowDown, Check, CircleCheckBig, Database, Download, ShieldAlert, TriangleAlert } from '@lucide/vue';
import { getPlugin } from '../plugins/registry.js';
import SiteFooter from '../components/SiteFooter.vue';
import YamlCodeBlock from '../components/YamlCodeBlock.vue';

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
  window.setTimeout(() => { toast.value = ''; }, 4000);
}
</script>

<template>
  <template v-if="plugin">
    <article>
      <section class="plugin-detail-hero doc-section" id="overview">
        <div class="plugin-breadcrumb"><RouterLink :to="{ name: 'home' }">云插件系列</RouterLink><span>›</span><span>{{ plugin.name }}</span></div>
        <div class="plugin-title-row"><span class="detail-icon" :class="plugin.tone"><component :is="plugin.icon" /></span><div><div class="eyebrow">{{ plugin.category }}</div><h1>{{ plugin.name }}</h1><p>{{ plugin.title }}</p></div></div>
        <p class="plugin-intro">{{ plugin.intro }}</p>
        <div class="hero-actions"><a class="primary-button" href="#installation">开始安装 <ArrowDown /></a><a class="secondary-button" :href="plugin.repository" target="_blank" rel="noreferrer"><Download />获取 v{{ plugin.version }}</a></div>
        <div class="plugin-meta-strip"><div><span>当前版本</span><strong>v{{ plugin.version }}</strong></div><div><span>支持服务端</span><strong>{{ plugin.server }}</strong></div><div><span>Minecraft</span><strong>{{ plugin.minecraft }}</strong></div><div><span>作者</span><strong>MoutainSeaL</strong></div></div>
      </section>

      <section class="doc-section prose-section" id="features"><div class="section-kicker">01 / Features</div><h2>核心功能</h2><p class="lead">从玩家获取到数据保存，功能由一套系统完整管理。</p><div class="detail-feature-grid"><article v-for="([title, text], index) in plugin.features" :key="title"><span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ title }}</h3><p>{{ text }}</p></article></div></section>

      <section v-if="plugin.acquisition" class="doc-subsection">
        <h3 class="config-subheading">{{ plugin.acquisition.title }}</h3>
        <div class="table-wrap"><table><thead><tr><th v-for="header in plugin.acquisition.headers" :key="header">{{ header }}</th></tr></thead><tbody><tr v-for="row in plugin.acquisition.rows" :key="row[0]"><td v-for="(cell, index) in row" :key="index"><code v-if="index === 0">{{ cell }}</code><template v-else>{{ cell }}</template></td></tr></tbody></table></div>
      </section>

      <section class="doc-section prose-section" id="installation"><div class="section-kicker">02 / Installation</div><h2>安装方法</h2><p class="lead">{{ plugin.installation.lead }}</p><div class="steps"><article v-for="([title, text], index) in plugin.installation.steps" :key="title" class="step"><span class="step-number">{{ index + 1 }}</span><div><h3>{{ title }}</h3><p>{{ text }}</p></div></article></div><div v-if="plugin.installation.dependencies" class="doc-subsection"><h3 class="config-subheading">依赖矩阵</h3><div class="table-wrap"><table><thead><tr><th>依赖</th><th>类型</th><th>缺失时行为</th></tr></thead><tbody><tr v-for="row in plugin.installation.dependencies" :key="row[0]"><td v-for="cell in row" :key="cell">{{ cell }}</td></tr></tbody></table></div></div><div class="callout success"><CircleCheckBig /><div><strong>按功能安装软依赖</strong><p>{{ plugin.installation.note }}</p></div></div></section>

      <section class="doc-section prose-section" id="commands"><div class="section-kicker">03 / Commands</div><h2>命令与权限</h2><p class="lead">主命令别名为 <code>{{ plugin.aliases }}</code>。</p><div class="table-wrap"><table><thead><tr><th v-for="header in (plugin.commandHeaders || ['命令', '功能', '权限'])" :key="header">{{ header }}</th></tr></thead><tbody><tr v-for="command in plugin.commands" :key="command[0]"><td v-for="(cell, index) in command" :key="index"><code v-if="index === 0 || index === 2">{{ cell }}</code><template v-else>{{ cell }}</template></td></tr></tbody></table></div><div v-if="plugin.permissions" class="doc-subsection"><h3 class="config-subheading">plugin.yml 权限</h3><div class="table-wrap"><table><thead><tr><th>权限</th><th>默认</th><th>用途</th></tr></thead><tbody><tr v-for="row in plugin.permissions" :key="row[0]"><td><code>{{ row[0] }}</code></td><td>{{ row[1] }}</td><td>{{ row[2] }}</td></tr></tbody></table></div></div></section>

      <section v-if="plugin.placeholders" class="doc-section prose-section" id="placeholders">
        <div class="section-kicker">04 / Placeholders</div><h2>变量与 GUI 动作</h2><p class="lead">{{ plugin.placeholders.intro }}</p>
        <div v-for="table in plugin.placeholders.tables" :key="table.title" class="doc-subsection"><h3 class="config-subheading">{{ table.title }}</h3><div class="table-wrap"><table><thead><tr><th v-for="header in table.headers" :key="header">{{ header }}</th></tr></thead><tbody><tr v-for="row in table.rows" :key="row[0]"><td v-for="(cell, index) in row" :key="index"><code v-if="index === 0">{{ cell }}</code><template v-else>{{ cell }}</template></td></tr></tbody></table></div></div>
        <div class="callout warning"><TriangleAlert /><div><strong>{{ plugin.placeholders.noteTitle }}</strong><p>{{ plugin.placeholders.note }}</p></div></div>
      </section>

      <section class="doc-section prose-section" id="configuration">
        <div class="section-kicker">05 / Configuration</div>
        <h2>全部配置</h2>
        <p class="lead">{{ plugin.configuration.intro }}</p>
        <div v-if="plugin.configuration.warning" class="callout warning"><ShieldAlert /><div><strong>敏感信息</strong><p>{{ plugin.configuration.warning }}</p></div></div>
        <div v-if="plugin.configuration.inventory" class="doc-subsection"><h3 class="config-subheading">配置文件清单</h3><div class="table-wrap"><table><thead><tr><th>文件</th><th>用途</th><th>生效方式</th><th>敏感项</th></tr></thead><tbody><tr v-for="row in plugin.configuration.inventory" :key="row[0]"><td><code>{{ row[0] }}</code></td><td>{{ row[1] }}</td><td>{{ row[2] }}</td><td>{{ row[3] }}</td></tr></tbody></table></div></div>
        <div v-if="plugin.configuration.references" class="configuration-references"><h3 class="config-subheading">配置项完整参考</h3><div v-for="group in plugin.configuration.references" :key="group.title" class="reference-group"><h4>{{ group.title }}</h4><div class="table-wrap config-reference-table"><table><thead><tr><th v-for="header in plugin.configuration.referenceHeaders" :key="header">{{ header }}</th></tr></thead><tbody><tr v-for="(row, rowIndex) in group.rows" :key="rowIndex"><td v-for="(cell, index) in row" :key="index"><code v-if="index === 0">{{ cell }}</code><template v-else>{{ cell }}</template></td></tr></tbody></table></div></div></div>
        <h3 class="config-subheading">完整默认文件</h3>
        <div v-for="file in plugin.configuration.files" :key="file.name" class="config-file">
          <h3 class="config-subheading">{{ file.name }}</h3>
          <YamlCodeBlock :file="file" @copy="copyConfig" />
        </div>
        <div class="callout success"><Database /><div><strong>跨服部署</strong><p>{{ plugin.configuration.note }}</p></div></div>
      </section>

      <section v-if="plugin.operations" class="doc-section prose-section" id="operations">
        <div class="section-kicker">06 / Operations</div><h2>数据库、重载与升级</h2><p class="lead">{{ plugin.operations.intro }}</p>
        <div v-for="table in plugin.operations.tables" :key="table.title" class="doc-subsection"><h3 class="config-subheading">{{ table.title }}</h3><div class="table-wrap"><table><thead><tr><th v-for="header in table.headers" :key="header">{{ header }}</th></tr></thead><tbody><tr v-for="row in table.rows" :key="row[0]"><td v-for="(cell, index) in row" :key="index"><code v-if="index === 0">{{ cell }}</code><template v-else>{{ cell }}</template></td></tr></tbody></table></div></div>
        <div v-for="group in plugin.operations.notes" :key="group.title" class="operation-notes"><h3 class="config-subheading">{{ group.title }}</h3><ul><li v-for="item in group.items" :key="item">{{ item }}</li></ul></div>
      </section>
    </article>
    <SiteFooter />
    <div class="toast" :class="{ show: toast }" role="status"><Check /><span>{{ toast }}</span></div>
  </template>
</template>
