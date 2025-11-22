type AvatarCircleProps = {
  label: string
  src?: string | null
  size?: number
  className?: string
  spanClass?: string
}

export function AvatarCircle({ label, src, size = 96, className = "", spanClass }: AvatarCircleProps) {
  const dimension = `${size}px`
  return (
    <div
      className={`relative rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center text-neutral-700 select-none bg-gradient-to-br from-yellow-400 to-yellow-300 ${className}`}
      style={{ width: dimension, height: dimension }}
      aria-label="Profilbild">
      {src ? (
        <img src={src} alt="Profilbild" className="w-full h-full object-cover" draggable={false} />
      ) : (
        <span className={`text-2xl font-semibold ${spanClass}`}>{label?.toUpperCase()}</span>
      )}
    </div>
  )
}
