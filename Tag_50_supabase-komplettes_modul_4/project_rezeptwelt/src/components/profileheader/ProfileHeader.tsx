import { useRef, useState, useEffect } from "react"
import supabase from "../../utils/supabase"
import { Alert } from "../alert/Alert"
import { AvatarCircle } from "../avatarCircle/AvatarCircle"
import { getSignedAvatarUrl, uploadProfileImage } from "../../function/uploadPhoto"

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
  error?: string | null
  message?: string | null
  onClearAlert?: () => void
  avatarPathFromDb?: string | null
  onAvatarUpdated?: (newPath: string) => void
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
  avatarPathFromDb = null,
  onAvatarUpdated,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [localAvatarUrl, setLocalAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const url = await getSignedAvatarUrl(avatarPathFromDb)
      if (isMounted) setLocalAvatarUrl(url)
    })()
    return () => {
      isMounted = false
    }
  }, [avatarPathFromDb])

  const handlePickFile = () => fileInputRef.current?.click()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)

      const path = await uploadProfileImage(file)

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: path })
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
      if (updateError) throw updateError

      const url = await getSignedAvatarUrl(path)
      setLocalAvatarUrl(url)

      onAvatarUpdated?.(path)
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)

      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="bg-white rounded-2xl border p-6 md:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
        {/* Avatar mit optionalem Upload-Overlay im Edit-Modus */}
        <div className="relative">
          <AvatarCircle label={firstName?.[0] || "?"} src={localAvatarUrl} />

          {isEditing && (
            <button
              type="button"
              onClick={handlePickFile}
              className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 rounded-full bg-black/80 px-3 py-1 text-xs text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#FFDB63]"
              disabled={uploading}>
              {uploading ? "Lädt..." : "Bild ändern"}
            </button>
          )}

          {/* Hidden File Input */}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
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
              disabled={saving || uploading}>
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
