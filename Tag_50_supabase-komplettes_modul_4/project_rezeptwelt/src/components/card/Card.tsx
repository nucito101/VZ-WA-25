import { Link } from "react-router"

type RecipeCardProps = {
  to: string
  image?: string
  title: string
  description?: string
  cta?: string
}

export default function Card({ to, image, title, description, cta = "Zum Rezept" }: RecipeCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md hover:ring-black/10">
      {image ? (
        <div className="relative">
          <img src={image} alt={title} className="h-48 w-full object-cover rounded-t-2xl" />
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-t-2xl bg-gradient-to-r from-[#FFDB63]/80 to-[#FFD23F]/60">
          <h3 className="px-3 text-lg font-semibold text-neutral-900 text-center">{title}</h3>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {image && <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>}
        {description && <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">{description}</p>}

        <div className="m-auto">
          <Link
            to={to}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-[#FFDB63] text-neutral-900 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDB63]"
            aria-label={`${title} öffnen`}>
            {cta}
          </Link>
        </div>
      </div>
    </article>
  )
}
