import { Button } from "~/components/button";
import { Card } from "~/components/card";
import { Input } from "~/components/input";
import { Textarea } from "~/components/textarea";

export default function AddPage() {
  return (
    <div className="min-h-dvh flex items-start justify-center">
      <main className="px-5 py-8 max-w-lg w-full h-full">
        <div className="flex items-center gap-5 mb-5">
          <h1 className="text-2xl font-semibold">Add note</h1>
        </div>

        <Card>
          <form className="space-y-5">
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
                name="title"
                placeholder="Enter conntent"
              />
            </label>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
