export function AvatarCircle({ label }: { label?: string }) {
  return (
    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-300 flex items-center justify-center text-white text-4xl font-bold">
      {label?.[0] || "?"}
    </div>
  )
}
