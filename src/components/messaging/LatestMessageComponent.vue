<template>
  <div class="container">
    <div>
      <h4>{{ latestMessage.title }}</h4>
      <p>{{ latestMessage.message }}</p>
    </div>

    <div class="status">
      <strong v-if="statusMessage">{{ statusMessage }}</strong>
      <strong v-else>Last captured: {{ lastCaptured }}</strong>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import MaterialDesignIcon from '@/components/Commonly Used/MaterialDesignIcon.vue'
import Message from '@/domain/Message.js'
import { getLatestMessage } from '@/api/messaging/messaging.js'

const latestMessage = ref(new Message(0, '', '', null))
const statusMessage = ref('')

const lastCaptured = computed(() => {
  if (!latestMessage.value.timestamp) return 'Never'

  return new Date(latestMessage.value.timestamp).toLocaleString()
})

async function loadLatestMessage() {
  const result = await getLatestMessage()

  if (!result.success) {
    console.log('Error loading latest reading:', result.message)
    return (statusMessage.value = result.message)
  }

  if (!result.object) {
    console.log('No readings have been published yet.')
    return (statusMessage.value = 'No readings have been published yet.')
  }

  statusMessage.value = ''
  latestMessage.value = result.object
}

let statusInterval = null
onMounted(() => {
  loadLatestMessage()

  statusInterval = setInterval(loadLatestMessage, 500)
})

onUnmounted(() => {
  clearInterval(statusInterval)
})
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.status {
  font-size: 75%;
  color: var(--grey-mid);
}
</style>
