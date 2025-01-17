type Props = {
  children?: React.ReactNode
}

export function Card({children}: Props) {
  return <div className="border border-gray-800 rounded p-4">{children}</div>;
}
