import React from "react"

type FormCardProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  size?: "sm" | "l" | "xl"
}

export default function FormCard({ title, subtitle, children, size = "sm" }: FormCardProps) {
  let widthClass = "max-w-md"

  if (size === "l") widthClass = "max-w-3xl"
  if (size === "xl") widthClass = "max-w-7xl"

  return (
    <article
      className={`group mx-auto flex w-full ${widthClass} flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md hover:ring-black/10`}>
      {/* Kopfbereich */}
      <div className="flex py-5 w-full items-center justify-center rounded-t-2xl bg-gradient-to-r from-[#FFDB63]/80 to-[#FFD23F]/60">
        <h1 className="px-4 text-2xl font-bold tracking-tight text-neutral-900 text-center">{title}</h1>
      </div>

      {/* Inhalt */}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        {subtitle && <p className="text-sm text-neutral-600 text-center leading-relaxed">{subtitle}</p>}
        {children}
      </div>
    </article>
  )
}
