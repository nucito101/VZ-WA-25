type HeroProps = {
  title?: string
  imageUrl?: string | null
  className?: string
}
const DEFAULT_HERO = "/hero.jpg"

export default function Hero({
  title = "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch.",
  imageUrl,
  className = "",
}: HeroProps) {
  const src = imageUrl || DEFAULT_HERO
  return (
    <>
      <section
        className={[
          "relative isolate overflow-hidden w-full min-h-[30svh] sm:min-h-[35svh] lg:min-h-[40svh] grid place-items-center text-center px-4 sm:px-6 lg:px-8",
          className,
        ].join(" ")}>
        <img src={src} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="text-white">
          <h1 className="font-extrabold leading-tight text-[clamp(20px,4.5vw,56px)]">{title}</h1>
        </div>
      </section>
    </>
  )
}
