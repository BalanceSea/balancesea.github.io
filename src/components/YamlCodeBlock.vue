<script setup>
import { computed } from 'vue';
import { Copy, FileCode2 } from '@lucide/vue';
import hljs from 'highlight.js/lib/core';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('yaml', yaml);

const props = defineProps({
  file: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['copy']);
const language = computed(() => props.file.language || 'yaml');
const languageLabel = computed(() => language.value.toUpperCase());
const lineCount = computed(() => props.file.code.split('\n').length);
const highlightedCode = computed(() => hljs.highlight(props.file.code, { language: 'yaml' }).value);
</script>

<template>
  <div class="code-block">
    <div class="code-header">
      <div class="code-file">
        <FileCode2 />
        <span>
          <strong>{{ file.name }}</strong>
          <small>{{ file.description }}</small>
        </span>
      </div>
      <div class="code-tools">
        <span class="code-language">{{ languageLabel }}</span>
        <span class="code-lines">{{ lineCount }} 行</span>
        <button class="copy-button" type="button" :aria-label="`复制 ${file.name}`" @click="emit('copy', file.code)">
          <Copy />
          <span>复制</span>
        </button>
      </div>
    </div>
    <pre class="config-code" tabindex="0" :aria-label="`${file.name} YAML 配置`"><code class="language-yaml hljs" v-html="highlightedCode"></code></pre>
  </div>
</template>
