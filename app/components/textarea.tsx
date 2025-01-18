import clsx from "clsx";
import { useEffect, useState, useRef } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ ...props }: Props) {
  const [value, setValue] = useState("");
  const elementRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.height = "auto";
      elementRef.current.style.height = `${elementRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      {...props}
      ref={elementRef}
      className={clsx(
        "w-full px-3 py-2",
        "rounded-md",
        "bg-neutral placeholder:text-secondary",
        "border border-border",
        "focus:outline-none focus:ring focus:ring-secondary",
        "resize-none",
        props.className
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
