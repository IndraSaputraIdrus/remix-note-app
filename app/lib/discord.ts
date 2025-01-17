import { Client, Guild, GatewayIntentBits, ChannelType } from "discord.js";
import { Note } from "./types";

let client: Client | null = null;
let clientReady = false;

const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!;

async function getClient() {
  if (!client) {
    client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    client.once("ready", () => {
      console.log("Bot ready", client!.user?.tag);
      clientReady = true;
    });

    await client.login(DISCORD_TOKEN);
  }

  if (!clientReady) {
    await new Promise<void>((resolve) => {
      client!.once("ready", () => {
        resolve();
      });
    });
  }

  return client;
}

async function getGuild(client: Client) {
  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) throw new Error("Guild not found");
  return guild;
}

export async function getMessages(channelId: string): Promise<Note[] | null> {
  const client = await getClient();
  const guild = await getGuild(client);
  const channel = guild.channels.cache.get(channelId);
  if (!channel || channel.type !== ChannelType.GuildText) return null;

  const messages = await channel.messages.fetch({ limit: 10 });
  if (!messages) return null;

  return messages.map((message) => ({
    id: message.id,
    content: message.content,
    author: {
      id: message.author.id,
      username: message.author.username,
    },
    createdTimestamp: message.createdTimestamp,
  }));
}

export async function sendMessage(channelId: string, content: string) {
  const client = await getClient();
  const guild = await getGuild(client);
  const channel = guild.channels.cache.get(channelId);
  if (!channel || channel.type !== ChannelType.GuildText) {
    return null;
  }

  try {
    return await channel.send(content);
  } catch (error) {
    console.error("Error sending message", error);
    return null;
  }
}
