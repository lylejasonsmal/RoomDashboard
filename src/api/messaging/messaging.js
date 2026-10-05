import { web_configuration } from '../../../web_configuration.js'
import Message from '@/domain/Message.js'

const controller = `${web_configuration.apiBaseUrl}/message`

function toMessage(payload) {
  if (!payload) return null

  return new Message(
    payload.id,
    payload.title,
    payload.message,
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

  return { ...result, object: toMessage(result.object) }
}

export async function getLatestMessage() {
  return await send(`${controller}/latest`, { method: 'GET' })
}

export async function publishMessage(title, message) {
  const parameters = new URLSearchParams({ title, message })

  return await send(`${controller}/publish?${parameters}`, { method: 'POST' })
}
