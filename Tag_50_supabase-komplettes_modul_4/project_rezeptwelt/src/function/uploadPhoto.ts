import supabase from "../utils/supabase"

export async function uploadProfileImage(file: File) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) throw new Error("Kein User eingeloggt.")

  const ext = file.name.split(".").pop() || "jpg"
  const filePath = `${user.id}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("profiles-img")
    .upload(filePath, file, { upsert: true, contentType: file.type })

  if (uploadError) throw uploadError
  return filePath
}

export async function getSignedAvatarUrl(path?: string | null) {
  if (!path) return null
  const { data, error } = await supabase.storage.from("profiles-img").createSignedUrl(path, 60 * 60 * 24 * 365)
  if (error) return null
  return data.signedUrl
}
