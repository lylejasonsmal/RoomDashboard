<template>
  <div class="container">
    <h1 class="hero-text time">{{ time }}</h1>
    <h6 class="date">{{ date }}</h6>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const now = ref(new Date())

const time = computed(() =>
  now.value.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
)

const date = computed(() =>
  now.value.toLocaleDateString([], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
)

let clockInterval = null

onMounted(() => {
  clockInterval = setInterval(() => (now.value = new Date()), 1000)
})

onUnmounted(() => {
  clearInterval(clockInterval)
})
</script>
<style scoped>
@media(min-width: 600px) {
  .hero-text{
    font-size: 7.5em !important;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.time {
  margin: 0;
  font-variant-numeric: tabular-nums;
}

.date {
  margin: 0;
  color: var(--grey-mid);
}
</style>
