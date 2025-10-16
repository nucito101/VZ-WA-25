type Props = {
  value: number | string
  label: string
  active?: boolean
  onClick?: () => void
}

export function StatCard({ value, label, active, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-xl border p-6 text-center shadow-sm w-40 sm:w-48 transition hover:-translate-y-1 hover:shadow-md ${
        active ? "ring-2 ring-yellow-400" : ""
      }`}>
      <div className="text-yellow-500 text-2xl font-semibold mb-1">{value}</div>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  )
}
