<template>
  <div class="page">
    <slot/>
  </div>
</template>
<script setup>
  import { watchEffect } from 'vue'

  const params = defineProps({
    title: {
      type: String,
      required: true
    }
  })

  watchEffect(() => {
    document.title = params.title
  })
</script>
