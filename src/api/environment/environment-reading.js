import { web_configuration } from '../../../web_configuration.js'
import EnvironmentReading from '@/domain/EnvironmentReading.js'

const controller = `${web_configuration.apiBaseUrl}/environmental-reading`

function toEnvironmentReading(payload) {
  if (!payload) return null

  return new EnvironmentReading(
    payload.id,
    payload.data?.temperature,
    payload.data?.humidity,
    payload.data?.heatIndex,
    payload.createdAtTimestamp
  )
}

function failure(message) {
  return { object: null, listOfObjects: [], message, success: false }
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

  return {
    ...result,
    object: toEnvironmentReading(result.object),
    listOfObjects: (result.listOfObjects ?? []).map(toEnvironmentReading)
  }
}

export async function getLatestEnvironmentalReading() {
  return await send(`${controller}/latest`, { method: 'GET' })
}

export async function getLowestEnvironmentalReading() {
  return await send(`${controller}/lowest`, { method: 'GET' })
}

export async function getPeakEnvironmentalReading() {
  return await send(`${controller}/peak`, { method: 'GET' })
}

export async function getTodaysEnvironmentalReadings() {
  return await send(`${controller}/today`, { method: 'GET' })
}

export async function publishEnvironmentalReading(temperature, humidity) {
  const parameters = new URLSearchParams({ temperature, humidity })

  return await send(`${controller}/publish?${parameters}`, { method: 'POST' })
}
