import Hero from "../../components/hero/Hero"

export default function AboutUs() {
  return (
    <>
      <div className="w-full h-full">
        <Hero />
        <section className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black">Über uns</h2>
          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5 text-dark/90 text-base sm:text-lg leading-relaxed sm:leading-8">
            <p>
              Hallo, wir sind Amanda und Pedro und freuen uns, unsere Arbeit auf Rezeptwelt vorstellen zu können. Bei
              der Erkundung dieser erstaunlichen Website haben wir ein gastronomisches Universum voller köstlicher
              Rezepte, nützlicher Tipps und kulinarischer Inspiration entdeckt. Rezeptwelt ist ein Ort, an dem sich
              erfahrene Köche und Kochanfänger in ihrer Leidenschaft für das Essen vereinen können.
            </p>
            <p>
              Was uns besonders begeistert hat, war die Vielfalt der Rezepte. Von traditionellen, gemütlichen Gerichten
              bis hin zu innovativeren Kreationen gibt es Optionen für jeden Geschmack und jede Gelegenheit. Jedes
              Rezept wird sorgfältig ausgewählt und getestet, um sicherzustellen, dass die Ergebnisse stets schmackhaft
              sind und es sich lohnt, sie zu teilen.
            </p>
            <p>
              Neben den Rezepten bietet Rezeptwelt auch nützliche Tipps zur Verbesserung der eigenen Kochkünste. Von
              Zubereitungstechniken bis hin zu Vorschlägen für Geschmackskombinationen - die Website lädt zum Entdecken
              und Experimentieren in der Küche ein. Es ist eine gemütliche und integrative Umgebung, in der jeder
              ermutigt wird, in die Kunst des Kochens einzutauchen und neue Möglichkeiten zu entdecken.
            </p>
            <p>
              Kurz gesagt, Rezeptwelt ist ein inspirierender gastronomischer Raum, der uns einlädt, unsere Leidenschaft
              für das Kochen zu entdecken, zu kreieren und zu teilen. Wir hoffen, dass unsere Präsentation Ihr Interesse
              geweckt hat, sich mit uns auf diese köstliche Reise in die Rezeptwelt zu begeben!
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
