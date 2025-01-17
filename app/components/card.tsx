type Props = {
  children?: React.ReactNode
}

export function Card({children}: Props) {
  return <div className="border border-border rounded-lg p-4">{children}</div>;
}
