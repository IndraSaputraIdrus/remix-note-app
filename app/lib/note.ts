import invariant from "tiny-invariant"
import { editMessage, sendMessage } from "./discord"

export function createNote(title: string, content: string) {
  return `${title} ==== ${content}`
}

export async function insertNote(title: string, content: string) {
  const channelId = process.env.DISCORD_CHANNEL_ID
  invariant(channelId, "Missing channel id")
  const note = createNote(title, content)
  await sendMessage(channelId, note)
}

export async function editNote(id: string, title: string, content: string) {
  const channelId = process.env.DISCORD_CHANNEL_ID
  invariant(channelId, "Missing channel id")

  const note = createNote(title, content)
  await editMessage(id, channelId, note)
}
