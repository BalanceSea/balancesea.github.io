<script setup>
import { BadgeCheck, BookCheck, Cloud, Coffee, GitFork, ListChecks, Palette, PanelLeft, PlugZap, RefreshCw, Server, Sparkles, Tag, UserRound, UsersRound } from '@lucide/vue';
import { plugins } from '../plugins/registry.js';
import SiteFooter from '../components/SiteFooter.vue';

const firstPlugin = plugins[0];
</script>

<template>
  <section class="hero doc-section cloud-hero" id="overview">
    <div class="hero-copy">
      <div class="eyebrow"><span></span> Minecraft Server Wiki</div>
      <h1>云插件系列<br><em>Cloud.</em></h1>
      <p>云插件系列的官方文档站。通过左侧插件列表进入各插件页面，查看功能、命令、权限和配置。</p>
      <div class="hero-actions">
        <RouterLink v-if="firstPlugin" class="primary-button" :to="{ name: 'plugin', params: { slug: firstPlugin.slug } }"><BookCheck />{{ firstPlugin.name }} 文档</RouterLink>
        <a class="secondary-button" href="#requirements"><BadgeCheck />兼容环境</a>
      </div>
      <div class="hero-stats"><div><strong>{{ plugins.length }}</strong><span>当前插件</span></div><div><strong>1.21</strong><span>支持版本</span></div><div><strong>21</strong><span>Java 版本</span></div></div>
    </div>
    <div class="block-scene cloud-scene" aria-label="CloudTitle 插件场景">
      <div class="scene-glow"></div>
      <div class="cloud-orbit orbit-a"><Tag /></div><div class="cloud-orbit orbit-b"><Palette /></div><div class="cloud-orbit orbit-c"><Sparkles /></div>
      <div class="cloud-visual"><Tag /><strong>CLOUDTITLE</strong><span>WIKI READY</span></div>
      <div class="connection-line line-a"></div><div class="connection-line line-b"></div><div class="connection-line line-c"></div>
      <div class="floating-chip chip-one"><BookCheck />完整功能与配置文档</div>
      <div class="scene-label"><span class="live-dot"></span> CLOUDTITLE <strong>文档就绪</strong></div>
    </div>
  </section>

  <section class="doc-section feature-band" aria-labelledby="feature-title">
    <div class="section-heading"><span>清晰、完整、可维护</span><h2 id="feature-title">从侧栏进入每一份插件文档</h2></div>
    <div class="feature-grid">
      <article class="feature-item"><span class="feature-icon lime"><PanelLeft /></span><h3>侧栏切换</h3><p>插件列表根据 Vue 插件目录自动生成，新增插件后无需逐页维护。</p></article>
      <article class="feature-item"><span class="feature-icon blue"><ListChecks /></span><h3>完整配置</h3><p>每份文档应列出该插件全部可配置项、默认值与说明。</p></article>
      <article class="feature-item"><span class="feature-icon amber"><RefreshCw /></span><h3>自动构建</h3><p>GitHub Pages 发布时构建 Vue 应用和全部无后缀插件路由。</p></article>
    </div>
  </section>

  <section class="doc-section prose-section" id="requirements">
    <div class="section-kicker">01 / 运行环境</div><h2>兼容环境</h2><p class="lead">具体版本和软依赖以对应插件页面为准。</p>
    <div class="compat-grid">
      <div><Server /><span>服务端</span><strong>Paper</strong></div>
      <div><Cloud /><span>游戏版本</span><strong>1.21.11</strong></div>
      <div><Coffee /><span>Java</span><strong>Java 21</strong></div>
      <div><PlugZap /><span>常见软依赖</span><strong>PlaceholderAPI / Vault</strong></div>
    </div>
  </section>

  <section class="doc-section prose-section" id="faq">
    <div class="section-kicker">02 / FAQ</div><h2>常见问题</h2>
    <div class="faq-list">
      <details open><summary>如何切换插件文档？<span>⌄</span></summary><p>使用页面左侧的插件列表即可切换，当前插件会保持高亮。</p></details>
      <details><summary>新增插件后侧栏如何更新？<span>⌄</span></summary><p>在 <code>src/plugins/</code> 下新增插件目录，Vite 会通过 <code>import.meta.glob</code> 自动发现。</p></details>
      <details><summary>配置文档需要写到什么程度？<span>⌄</span></summary><p>应包含全部配置文件、全部配置路径、类型、默认值、允许值、生效方式和详细说明。</p></details>
    </div>
  </section>

  <section class="doc-section support-band" id="support">
    <div><span class="section-kicker">需要帮助？</span><h2>联系云插件系列作者。</h2><p>反馈问题时请附上服务端版本、插件版本和完整报错日志。</p></div>
    <div class="support-actions">
      <a class="primary-button" href="https://github.com/BalanceSea/cloud-plugins/issues" target="_blank" rel="noreferrer"><GitFork />提交 Issue</a>
      <a class="primary-button" href="https://qm.qq.com/q/D72ki83eUg" target="_blank" rel="noreferrer"><UsersRound />加入 QQ 群</a>
      <a class="primary-button" href="https://qm.qq.com/" target="_blank" rel="noreferrer"><UserRound />作者 QQ：3643203568</a>
    </div>
  </section>
  <SiteFooter />
</template>
