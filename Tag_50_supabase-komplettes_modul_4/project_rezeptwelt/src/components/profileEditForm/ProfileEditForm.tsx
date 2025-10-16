import InputField from "../inputField/InputField"

type Props = {
  defaultValues: { first_name: string; last_name: string; username?: string | null }
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  saving: boolean
}

export function ProfileEditForm({ defaultValues, onSubmit, saving }: Props) {
  return (
    <form id="profile-edit-form" onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <InputField label="Vorname" name="first_name" required defaultValue={defaultValues.first_name} />
      <InputField label="Nachname" name="last_name" required defaultValue={defaultValues.last_name} />
      <InputField
        label="Benutzername"
        name="username"
        required
        placeholder="mind. 3 Zeichen"
        defaultValue={defaultValues.username ?? ""}
      />

      <div className="md:col-span-3 flex gap-3 justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:brightness-95 transition disabled:opacity-60"
          disabled={saving}>
          {saving ? "Speichere…" : "Speichern"}
        </button>
      </div>
    </form>
  )
}
