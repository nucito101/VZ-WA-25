import { useEffect } from "react"

type AlertProps = {
  tone?: "success" | "error" | "info"
  children: React.ReactNode
  className?: string
  duration?: number
  onClose?: () => void
}

export function Alert({ tone = "info", children, className = "", duration = 3000, onClose }: AlertProps) {
  const styles = {
    success: "border-green-300 text-green-700 bg-green-50",
    error: "border-red-300 text-red-700 bg-red-50",
    info: "border-yellow-200 text-yellow-800 bg-yellow-50",
  } as const

  useEffect(() => {
    if (!onClose) return
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className={`mb-4 rounded-xl border p-4 text-sm transition-opacity ${styles[tone]} ${className}`}>
      {children}
    </div>
  )
}
