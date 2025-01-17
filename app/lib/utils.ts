export function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseContent(value: string) {
  const [title, content] = value.split("====");

  return {
    title: title.trim(),
    content: content.trim(),
  };
}
