import { Link } from "react-router"

interface LinkItemProps {
  to: string
  label: string
  onClick?: () => void
}

export default function LinkItem({ to, label, onClick }: LinkItemProps) {
  return (
    <>
      <Link
        to={`${to}`}
        onClick={onClick}
        className="flex items-center justify-between rounded-xl px-4 py-3 text-neutral-900 hover:bg-neutral-100">
        {label}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </>
  )
}
