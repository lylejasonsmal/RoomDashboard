<template>
  <div class="container">
    <p>
      Currently feels like <strong>~{{ currentEnvironmentReading.heatIndex }}°C</strong>
    </p>
    <p class="status">Peak: <strong>{{ peakEnvironmentReading.temperature }}°C</strong> with {{peakEnvironmentReading.humidity}}% humidity | Lowest: <strong>{{ lowestEnvironmentReading.temperature }}°C</strong> with {{lowestEnvironmentReading.humidity}}% humidity</p>
    <div class="inner-container">
      <div>
        <h6 class="status">Temperature (°C)</h6>
        <h1 class="hero-text">{{ currentEnvironmentReading.temperature }}°C</h1>
      </div>

      <div>
        <h6 class="status">Humidity (%)</h6>
        <h1 class="hero-text">{{ currentEnvironmentReading.humidity }}%</h1>
      </div>
    </div>

    <div class="status">
      <strong v-if="statusMessage">{{ statusMessage }}</strong>
      <strong v-else>Last captured: {{ lastCaptured }}</strong>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import EnvironmentReading from '@/domain/EnvironmentReading.js'
import {
  getLatestEnvironmentalReading,
  getLowestEnvironmentalReading,
  getPeakEnvironmentalReading,
} from '@/api/environment/environment-reading.js'

const currentEnvironmentReading = ref(new EnvironmentReading(0, 0, 0, null))
const lowestEnvironmentReading = ref(new EnvironmentReading(0, 0, 0, null))
const peakEnvironmentReading = ref(new EnvironmentReading(0, 0, 0, null))
const statusMessage = ref('')

const lastCaptured = computed(() => {
  if (!currentEnvironmentReading.value.timestamp) return 'Never'

  return new Date(currentEnvironmentReading.value.timestamp).toLocaleString()
})

async function loadLatestReading() {
  const result = await getLatestEnvironmentalReading()

  if (!result.success) {
    console.log('Error loading latest reading:', result.message)
    return (statusMessage.value = result.message)
  }

  if (!result.object) {
    console.log('No readings have been published yet.')
    return (statusMessage.value = 'No readings have been published yet.')
  }

  statusMessage.value = ''
  currentEnvironmentReading.value = result.object

  await loadLowestReading()
  await loadPeakReading()
}

async function loadLowestReading() {
  const result = await getLowestEnvironmentalReading()

  if (!result.success) {
    console.log('Error loading lowest reading:', result.message)
    return (statusMessage.value = result.message)
  }

  if (!result.object) {
    console.log('No readings have been published yet.')
    return (statusMessage.value = 'No readings have been published yet.')
  }

  statusMessage.value = ''
  lowestEnvironmentReading.value = result.object
}

async function loadPeakReading() {
  const result = await getPeakEnvironmentalReading()

  if (!result.success) {
    console.log('Error loading peak reading:', result.message)
    return (statusMessage.value = result.message)
  }

  if (!result.object) {
    console.log('No readings have been published yet.')
    return (statusMessage.value = 'No readings have been published yet.')
  }

  statusMessage.value = ''
  peakEnvironmentReading.value = result.object
}

let statusInterval = null

onMounted(() => {
  loadLatestReading()

  statusInterval = setInterval(loadLatestReading, 30000)
})

onUnmounted(() => {
  clearInterval(statusInterval)
})
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.inner-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 35px;
}

.status {
  font-size: 75%;
  color: var(--grey-mid);
}
</style>
