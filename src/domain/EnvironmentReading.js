class EnvironmentReading {
  constructor(id, temperature, humidity, heatIndex, timestamp) {
    this.id = id;
    this.temperature = temperature;
    this.humidity = humidity;
    this.heatIndex = heatIndex;
    this.timestamp = timestamp;
  }
}

export default EnvironmentReading;