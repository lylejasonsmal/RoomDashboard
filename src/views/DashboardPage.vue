<template>
  <BasePageTemplate title="Dashboard">
    <div class="split-row">
      <ClockComponent/>
      <LatestMessageComponent/>
      <SystemHealthComponent/>
    </div>

    <div class="split-row">
      <TodaysEnvironmentalReadingsChartComponent/>
      <LatestTemperatureReadingComponent/>
    </div>
  </BasePageTemplate>
</template>
<script setup>
  import BasePageTemplate from '@/views/Base/BasePageTemplate.vue'
  import ClockComponent from '@/components/ClockComponent.vue'
  import LatestTemperatureReadingComponent from '@/components/enviroment/LatestTemperatureReadingComponent.vue'
  import LatestMessageComponent from '@/components/messaging/LatestMessageComponent.vue'
  import SystemHealthComponent from '@/components/system/SystemHealthComponent.vue'
  import StravaActivitySummaryComponent from '@/components/strava/StravaActivitySummaryComponent.vue'
  import TodaysEnvironmentalReadingsChartComponent from '@/components/enviroment/TodaysEnvironmentalReadingsChartComponent.vue'
</script>
<style scoped>
  .split-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 50px;
    padding: 20px;
    width: 90%;
    box-sizing: border-box;
  }

  .current-reading h4{
    margin: 0;
    padding: 0 20px;
  }

  @media (max-width: 1000px) {
    .split-row{
      flex-direction: column;
    }
  }
</style>
