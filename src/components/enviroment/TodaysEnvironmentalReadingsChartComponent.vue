<template>
  <div class="container">
    <div class="header">
      <material-design-icon icon="show_chart" size="30px" />
      <h6>{{ metric.title }} ({{ metric.unit }})</h6>
      <button class="switch" @click="switchMetric">{{ nextMetric.name }}</button>
    </div>

    <div class="chart-container">
      <Line v-if="chartPoints.length" :data="chartData" :options="chartOptions" />
      <p v-else class="placeholder">{{ placeholderMessage }}</p>
    </div>

    <div class="status">
      <strong v-if="statusMessage">{{ statusMessage }}</strong>
      <strong v-else>
        Last captured: {{ lastCaptured }} | Total readings captured today: {{ readings.length }}
      </strong>
    </div>
  </div>

</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js'
import { getTodaysEnvironmentalReadings } from '@/api/environment/environment-reading.js'
import MaterialDesignIcon from '@/components/Commonly Used/MaterialDesignIcon.vue'

ChartJS.register(LineElement, PointElement, LinearScale, Filler, Tooltip)

function readCssVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

const metrics = [
  {
    field: 'temperature',
    name: 'Temperature',
    title: "Today's Temperature",
    unit: '°C',
    colour: readCssVariable('--accent-light')
  },
  {
    field: 'humidity',
    name: 'Humidity',
    title: "Today's Humidity",
    unit: '%',
    colour: readCssVariable('--accent-teal')
  }
]

const metricIndex = ref(0)
const metric = computed(() => metrics[metricIndex.value])
const nextMetric = computed(() => metrics[(metricIndex.value + 1) % metrics.length])

function showNextMetric() {
  metricIndex.value = (metricIndex.value + 1) % metrics.length
}

const readings = ref([])
const isLoading = ref(false)
const statusMessage = ref('')

const chartPoints = computed(() => {
  const field = metric.value.field

  return readings.value
    .filter((reading) => reading.timestamp && reading[field] != null)
    .map((reading) => ({ x: new Date(reading.timestamp).getTime(), y: reading[field] }))
    .sort((first, second) => first.x - second.x)
})

const lastCaptured = computed(() => {
  const latestPoint = chartPoints.value.at(-1)
  if (!latestPoint) return 'Never'

  return new Date(latestPoint.x).toLocaleString()
})

const placeholderMessage = computed(() => {
  if (isLoading.value) return 'Loading readings...'
  if (statusMessage.value) return 'Readings could not be loaded.'

  return 'No readings have been published today.'
})

const textColour = readCssVariable('--grey-mid')
const gridColour = readCssVariable('--border-colour')

function formatTime(milliseconds) {
  return new Date(milliseconds).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const chartData = computed(() => ({
  datasets: [
    {
      label: `${metric.value.title} (${metric.value.unit})`,
      data: chartPoints.value,
      borderColor: metric.value.colour,
      backgroundColor: `${metric.value.colour}33`,
      borderWidth: 2,
      fill: 'origin',
      tension: 0.3,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: metric.value.colour
    }
  ]
}))

const oneHour = 60 * 60 * 1000

function floorToHour(milliseconds) {
  const date = new Date(milliseconds)
  date.setMinutes(0, 0, 0)
  return date.getTime()
}

function ceilToHour(milliseconds) {
  const floored = floorToHour(milliseconds)
  return floored === milliseconds ? floored : floored + oneHour
}

const axisStart = computed(() => floorToHour(chartPoints.value[0]?.x ?? Date.now()))
const axisEnd = computed(() => {
  const end = ceilToHour(chartPoints.value.at(-1)?.x ?? Date.now())
  return end === axisStart.value ? end + oneHour : end
})

function buildHourTicks(scale) {
  const ticks = []
  for (let hour = axisStart.value; hour <= axisEnd.value; hour += oneHour) {
    ticks.push({ value: hour })
  }
  scale.ticks = ticks
}

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  parsing: false,
  normalized: true,
  animation: false,
  interaction: { mode: 'nearest', axis: 'x', intersect: false },
  scales: {
    x: {
      type: 'linear',
      min: axisStart.value,
      max: axisEnd.value,
      afterBuildTicks: buildHourTicks,
      ticks: { color: textColour, callback: (value) => formatTime(value) },
      grid: { color: gridColour }
    },
    y: {
      ticks: { color: textColour, callback: (value) => `${value}${metric.value.unit}` },
      grid: { color: gridColour }
    }
  },
  plugins: {
    tooltip: {
      displayColors: false,
      callbacks: {
        title: (items) => new Date(items[0].parsed.x).toLocaleTimeString(),
        label: (item) => `${item.parsed.y} ${metric.value.unit}`
      }
    }
  }
}))

async function loadTodaysReadings() {
  isLoading.value = true
  const result = await getTodaysEnvironmentalReadings()
  isLoading.value = false

  if (!result.success) {
    console.log("Error loading today's readings:", result.message)
    return (statusMessage.value = result.message)
  }

  statusMessage.value = ''
  readings.value = result.listOfObjects
}

let metricInterval = null

function refreshAndShowNextMetric() {
  loadTodaysReadings()
  showNextMetric()
}

function startMetricInterval() {
  clearInterval(metricInterval)
  metricInterval = setInterval(refreshAndShowNextMetric, 30000)
}

function switchMetric() {
  showNextMetric()
  startMetricInterval()
}

onMounted(() => {
  loadTodaysReadings()

  startMetricInterval()
})

onUnmounted(() => {
  clearInterval(metricInterval)
})
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  gap: 10px;
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.switch {
  margin-left: auto;
  cursor: pointer;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 350px;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  color: var(--grey-mid);
}

.status {
  font-size: 75%;
  color: var(--grey-mid);
}

@media (max-width: 1000px) {
  .chart-container {
    height: 250px;
  }
}
</style>
