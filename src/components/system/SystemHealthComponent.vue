<template>
  <div class="container">
    <material-design-icon icon="memory" size="50px"/>

    <div class="inner-container">
      <div>
        <p class="status">Operating System</p>
        <h3>{{ latestSystemHealth.operatingSystem }}</h3>
      </div>

      <div>
        <p class="status">CPU Load (%)</p>
        <h3>{{ latestSystemHealth.cpuLoad }}%</h3>
      </div>

      <div>
        <p class="status">Memory Usage (%)</p>
        <h3>{{ latestSystemHealth.memoryUsage }}%</h3>
      </div>

      <div>
        <p class="status">Available Processors</p>
        <h3>{{ latestSystemHealth.availableProcessorCount }}</h3>
      </div>
    </div>

    <div class="status">
      <strong v-if="statusMessage">{{ statusMessage }}</strong>
      <strong v-else>Last updated: {{ lastTimestamp }}</strong>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getLatestServerStatus } from '@/api/system/system.js'
import SystemHealth from '@/domain/SystemHealth.js'
import MaterialDesignIcon from '@/components/Commonly Used/MaterialDesignIcon.vue'

const latestSystemHealth = ref(new SystemHealth(null, 0, 0, 0, "N/A", null))
const statusMessage = ref('')

const lastTimestamp = computed(() => {
  if (!latestSystemHealth.value.timestamp) return 'Never'

  return new Date(latestSystemHealth.value.timestamp).toLocaleString()
})

async function loadLatestServerStatus() {
  const result = await getLatestServerStatus()

  if (!result.success) {
    console.log('Error loading latest reading:', result.message)
    return (statusMessage.value = result.message)
  }

  if (!result.object) {
    console.log('No readings have been published yet.')
    return (statusMessage.value = 'No readings have been published yet.')
  }

  statusMessage.value = ''
  latestSystemHealth.value = result.object
}

let statusInterval = null

onMounted(() => {
  loadLatestServerStatus()

  statusInterval = setInterval(loadLatestServerStatus, 5000)
})

onUnmounted(() => {
  clearInterval(statusInterval)
})
</script>
<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    color: var(--primary-black);
    padding: 20px;
    border: 1px solid var(--grey-mid);
    border-radius: 25px;
    background: var(--grey-mid);
  }

  .inner-container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 50px;
    width: 100%;
    height: 100%;
    text-wrap: nowrap;
  }

  .status{
    font-size: 75%;
  }


  @media (max-width: 1000px) {
    .inner-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
