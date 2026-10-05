<template>
  <span class="material-symbols-outlined" :style="`font-size: ${params.size}`">{{params.icon}}</span>
</template>
<script setup>
const params = defineProps({
  icon: String,
  size: {
    type: String,
    default: '30px'
  }
})
</script>