import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Button } from "~/components/button";
import { Card } from "~/components/card";
import { getMessages } from "~/lib/discord";
import { Note } from "~/lib/types";
import { formatDate, parseContent } from "~/lib/utils";
import { Plus } from "lucide-react";
import invariant from "tiny-invariant";

export const meta: MetaFunction = () => {
  return [
    { title: "Note app" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const channelId = process.env.DISCORD_CHANNEL_ID;
  invariant(channelId, "Missing channel id");

  const notes = await getMessages(channelId);

  return Response.json(notes);
};

export default function Index() {
  const data = useLoaderData<Note[]>();

  return (
    <div className="min-h-dvh flex items-start justify-center">
      <main className="max-w-xl w-full mx-auto h-full px-5 py-8">
        <div className="mb-5 flex items-center gap-5">
          <h1 className="text-2xl font-bold">My note</h1>
          <Link to="/add">
            <Button variant="ghost" size="icon">
              <Plus className="size-4" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          {data.map((note) => {
            const { title, content } = parseContent(note.content);

            const date = formatDate(note.createdTimestamp);

            return (
              <Card key={note.id}>
                <div className="mb-2">
                  <h2 className="text-lg font-semibold capitalize">{title}</h2>
                  <p className="text-sm text-secondary">{date}</p>
                </div>
                <div className="text-secondary break-words text-lg mb-3">
                  <p>{content}</p>
                </div>
                <div>
                  <Link to={`/detail/${note.id}`}>
                    <Button size="sm">Detail</Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
