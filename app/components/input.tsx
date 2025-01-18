import clsx from "clsx";
import { useState } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...props }: Props) {
  const [value, setValue] = useState(props.value ? props.value : "");

  return (
    <input
      {...props}
      className={clsx(
        "w-full px-3 py-2",
        "rounded-md",
        "bg-neutral placeholder:text-secondary",
        "border border-border",
        "focus:outline-none focus:ring focus:ring-secondary"
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
