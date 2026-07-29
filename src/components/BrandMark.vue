<script setup>
import { Cloud } from 'lucide-vue-next';
defineProps({ small: Boolean });
</script>

<template>
  <span class="brand-mark cloud-mark" :class="{ small }"><Cloud /></span>
</template>
