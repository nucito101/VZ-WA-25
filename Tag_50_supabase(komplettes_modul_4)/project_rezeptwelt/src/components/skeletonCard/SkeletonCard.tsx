export default function SkeletonCard() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="h-48 w-full rounded-t-2xl bg-gray-200 animate-pulse" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-2/3 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
        <div className="mt-auto">
          <div className="h-9 w-28 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </article>
  )
}
