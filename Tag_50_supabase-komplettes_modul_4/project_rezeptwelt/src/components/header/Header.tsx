import Navbar from "../navbar/Navbar"

export default function Header() {
  return (
    <>
      <div className="bg-yellow h-[15px] sm:h-[18px] md:h-[30px]" />

      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 lg:p-6 lg:px-20">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <img src="/Ico.svg" alt="Logo" className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
          <h2 className="text-base sm:text-xl md:text-2xl font-semibold">Die Rezeptwelt</h2>
        </div>

        <div className="w-full sm:w-auto hidden md:block">
          <Navbar />
        </div>
      </div>
    </>
  )
}
