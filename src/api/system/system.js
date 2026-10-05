import { web_configuration } from '../../../web_configuration.js'
import SystemHealth from '@/domain/SystemHealth.js'

const controller = `${web_configuration.apiBaseUrl}/api`

function toSystemHealth(payload) {
  if (!payload) return null

  return new SystemHealth(
    payload.status,
    payload.cpuLoad,
    payload.memoryUsage,
    payload.availableProcessorCount,
    payload.operatingSystem,
    payload.timestamp
  )
}

function failure(systemHealth) {
  return { object: null, listOfObjects: [], message: systemHealth, success: false }
}

async function send(url, options) {
  let response

  try {
    response = await fetch(url, options)
  } catch {
    return failure(`Could not reach the API.`)
  }

  let result

  try {
    result = await response.json()
  } catch {
    return failure(`The API returned ${response.status} with no readable body.`)
  }

  if (!response.ok) return failure(result.message ?? `The API responded with ${response.status}.`)

  return { ...result, object: toSystemHealth(result.object) }
}

export async function getLatestServerStatus() {
  return await send(`${controller}/health`, { method: 'GET' })
}