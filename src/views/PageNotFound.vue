<template>
  <BasePageTemplate title="Page Not Found">
        <h1>404</h1>
        <p class="text-xl mb-4">Oops! The page you are looking for does not exist.</p>
  </BasePageTemplate>
</template>
<script setup>
 import BasePageTemplate from '@/views/Base/BasePageTemplate.vue'
</script>
<style scoped>
  .page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    width: 100%;
    color: var(--page-text);
  }

  h1{
    font-size: 10rem;
    font-weight: 1000 !important;
    margin: 20px;
  }
</style>