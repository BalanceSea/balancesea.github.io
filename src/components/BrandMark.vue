<script setup>
import { Cloud } from '@lucide/vue';
defineProps({ small: Boolean });
</script>

<template>
  <span class="brand-mark cloud-mark" :class="{ small }"><Cloud /></span>
</template>
