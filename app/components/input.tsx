import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ ...props }: Props) {
  return (
    <input
      className={clsx(
        "w-full px-3 py-2",
        "rounded-md",
        "bg-neutral placeholder:text-secondary",
        "border border-border",
        "focus:outline-none focus:ring focus:ring-secondary"
      )}
      {...props}
    />
  );
}
