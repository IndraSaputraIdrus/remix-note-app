export type Note = {
  id: string;
  author: {
    id: string;
    username: string;
  };
  content: string;
  attachments?: unknown[];
  createdTimestamp: number;
}
