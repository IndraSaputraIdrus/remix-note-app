import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  size?: "default" | "icon" | "sm";
  variant?: "default" | "ghost";
} & React.HTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  size = "default",
  variant = "default",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded",
        "transition",
        variant === "default" && "bg-primary text-neutral",
        variant === "default" && "hover:opacity-80",
        variant === "ghost" && "bg-neutral border border-border",
        variant === "ghost" && "hover:bg-border",
        size === "default" && "px-3 py-1",
        size === "icon" && "p-2",
        size === "sm" && "text-sm px-2 py-1"
      )}
    >
      {children}
    </button>
  );
}
