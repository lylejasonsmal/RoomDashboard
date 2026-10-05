<template>
  <div class="container">
    <div class="widget">
      <iframe
        title="Strava activity summary"
        height="160"
        width="300"
        frameborder="0"
        allowtransparency="true"
        scrolling="no"
        src="https://www.strava.com/athletes/171880326/activity-summary/ab4d5b46868abb9779adfd67515f7dda7c236415"
      ></iframe>
    </div>
  </div>
</template>
<style scoped>
.container {
  --widget-scale: 1.5;

  display: flex;
  justify-content: center;
  padding: 20px;
}

.widget {
  width: calc(300px * var(--widget-scale));
  height: calc(160px * var(--widget-scale));
}

iframe {
  transform: scale(var(--widget-scale));
  transform-origin: top left;
  filter: invert(0.92) hue-rotate(180deg);
}
</style>
