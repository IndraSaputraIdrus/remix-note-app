import { Button } from "~/components/button";
import { Card } from "~/components/card";
import { Input } from "~/components/input";
import { Textarea } from "~/components/textarea";

import { Form, redirect, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import { createNote } from "~/lib/note";
import invariant from "tiny-invariant";

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const title = data.get("title");
  const content = data.get("content");

  invariant(title, "Missing title field");
  invariant(content, "Missing content filed");

  try {
    await createNote(String(title), String(content));
    return redirect("/");
  } catch (error) {
    console.log(error);
    return Response.json({ error: true, message: "Failed to create note" });
  }
}

export default function AddPage() {
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
          <h1 className="text-2xl font-semibold">Add note</h1>
        </div>

        <Card>
          <Form method="post" className="space-y-5">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Title</span>
              <Input name="title" placeholder="Enter title" />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Content</span>
              <Textarea
                style={{
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  wordBreak: "keep-all",
                }}
                className="min-h-36 max-h-72 overflow-y-auto"
                name="content"
                placeholder="Enter conntent"
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
