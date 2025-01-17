import invariant from "tiny-invariant";
import { Link, MetaFunction } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Card } from "~/components/card";
import { getMessageById } from "~/lib/discord";
import { Note } from "~/lib/types";
import { formatDate, parseContent } from "~/lib/utils";
import { Button } from "~/components/button";
import { ArrowLeft } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Note app" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.noteId, "Missing id param");

  const channelId = process.env.DISCORD_CHANNEL_ID!;
  invariant(channelId, "Missing channelId");

  const note = await getMessageById(params.noteId, channelId);
  return Response.json(note);
}

export default function DetailPage() {
  const data = useLoaderData<Note>();
  const { title, content } = parseContent(data.content);

  return (
    <div className="min-h-dvh flex items-start justify-center">
      <main className="max-w-xl w-full h-full px-5 py-8">
        <div className="mb-5 flex items-center gap-5">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Detail</h1>
        </div>

        <div>
          <Card>
            <div className="mb-2">
              <h2 className="text-lg font-semibold capitalize">{title}</h2>
              <p className="text-sm text-secondary">
                {formatDate(data.createdTimestamp)}
              </p>
            </div>
            <div className="mb-3 text-lg text-secondary">{content}</div>
            <div>
              <Button>Edit</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
