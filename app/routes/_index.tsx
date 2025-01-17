import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { Card } from "~/components/card";
import { getMessages, sendMessage } from "~/lib/discord";
import { Note } from "~/lib/types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const channelId = process.env.DISCORD_CHANNEL_ID!;
  const notes = await getMessages(channelId);

  return Response.json(notes);
};

export default function Index() {
  const data = useLoaderData<Note[]>();

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <main className="max-w-xl w-full mx-auto h-full px-5 py-8">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">My note</h1>
        </div>

        <div className="flex flex-col gap-5">
          {data.map((note) => {
            const [title, content] = note.content.split("====")
            return (
              <Card key={note.id}>
                <div className="mb-2">
                  <h2 className="text-lg font-semibold capitalize">
                    {title.trim()}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {note.createdTimestamp}
                  </p>
                </div>
                <div className="text-gray-400 break-words">
                  <p>{content.trim()}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
