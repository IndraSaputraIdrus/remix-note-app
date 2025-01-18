import invariant from "tiny-invariant"
import { sendMessage } from "./discord"

export async function createNote(title: string, content: string) {
  const channelId = process.env.DISCORD_CHANNEL_ID
  invariant(channelId, "Missing channel id")
  const message = `${title} ==== ${content}`
  await sendMessage(channelId, message)
}
