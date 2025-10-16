import { Alert } from "../alert/Alert"

type ProfileHeaderProps = {
  firstName: string
  lastName: string
  email: string
  username?: string | null
  joinedText?: string | false
  isEditing: boolean
  saving: boolean
  onStartEdit: () => void
  onCancelEdit: () => void
  // 👉 neue Props für Alerts:
  error?: string | null
  message?: string | null
  onClearAlert?: () => void
}

export function ProfileHeader({
  firstName,
  lastName,
  email,
  username,
  joinedText,
  isEditing,
  saving,
  onStartEdit,
  onCancelEdit,
  error,
  message,
  onClearAlert,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border p-6 md:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
        {/* Avatar */}
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-300 flex items-center justify-center text-white text-4xl font-bold">
          {firstName?.[0] || "?"}
        </div>

        {/* Infos */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm text-gray-500 mb-1">
            Willkommen <span className="font-medium">{username || "—"}</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            {firstName} {lastName}
          </h1>
          <div className="mt-2 flex flex-col gap-1 text-gray-600">
            <p>{email}</p>
            {joinedText && <p className="text-xs text-gray-400 tracking-wide">Beigetreten {joinedText}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:brightness-95 transition"
              onClick={onStartEdit}>
              Profil bearbeiten
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 transition"
              onClick={onCancelEdit}
              disabled={saving}>
              Abbrechen
            </button>
          )}
        </div>
      </div>
      {(error || message) && (
        <Alert tone={error ? "error" : "success"} duration={3000} onClose={onClearAlert}>
          {error ?? message}
        </Alert>
      )}
    </div>
  )
}
