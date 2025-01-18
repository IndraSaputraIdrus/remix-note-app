import { Button } from "~/components/button";
import { Card } from "~/components/card";
import { Input } from "~/components/input";
import { Textarea } from "~/components/textarea";

import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import { editNote, insertNote } from "~/lib/note";
import invariant from "tiny-invariant";
import { getMessageById } from "~/lib/discord";
import { Note } from "~/lib/types";
import { parseContent } from "~/lib/utils";

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.noteId, "Missing note id");
  const channelId = process.env.DISCORD_CHANNEL_ID;
  invariant(channelId, "Missing channel id");
  const note = await getMessageById(params.noteId, channelId);
  invariant(note, "Note not found");

  const { title, content } = parseContent(note.content);
  console.log(content);

  return Response.json({ ...note, contents: { title, content } });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = await request.formData();
  const title = data.get("title");
  const content = data.get("content");

  invariant(params.noteId, "Missing note id");
  invariant(title, "Missing title field");
  invariant(content, "Missing content filed");

  try {
    await editNote(params.noteId, String(title), String(content));
    return redirect(`/detail/${params.noteId}`);
  } catch (error) {
    console.log(error);
    return Response.json({ error: true, message: "Failed to create note" });
  }
}

export default function AddPage() {
  const data = useLoaderData<
    Note & { contents: { title: string; content: string } }
  >();
  const actionData = useActionData<{ error: boolean; message: string }>();

  useEffect(() => {
    if (actionData && actionData.error) {
      alert(actionData.message);
    }
  }, [actionData]);

  return (
    <div className="min-h-dvh flex items-start justify-center">
      <main className="px-5 py-8 max-w-xl w-full h-full">
        <div className="flex items-center gap-5 mb-5">
          <h1 className="text-2xl font-semibold">Edit note</h1>
        </div>

        <Card>
          <Form method="post" className="space-y-5">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Title</span>
              <Input
                value={data.contents.title}
                name="title"
                placeholder="Enter title"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Content</span>
              <Textarea
                style={{
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  wordBreak: "keep-all",
                }}
                value={data.contents.content}
                className="min-h-36 max-h-72 overflow-y-auto"
                name="content"
                placeholder="Enter content"
              />
            </label>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Card>
      </main>
    </div>
  );
}
