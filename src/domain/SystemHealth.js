class SystemHealth {
  constructor(status, cpuLoad, memoryUsage, availableProcessorCount, operatingSystem, timestamp) {
    this.status = status;
    this.cpuLoad = cpuLoad;
    this.memoryUsage = memoryUsage;
    this.availableProcessorCount = availableProcessorCount
    this.operatingSystem = operatingSystem
    this.timestamp = timestamp
  }
}

export default SystemHealth;