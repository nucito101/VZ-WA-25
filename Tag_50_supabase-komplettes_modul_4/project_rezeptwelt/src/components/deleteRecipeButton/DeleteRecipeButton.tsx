import { useState } from "react"
import supabase from "../../utils/supabase"

export default function DeleteRecipeButton({ recipeId, onDeleted }: { recipeId: string; onDeleted?: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.from("recipes").delete().eq("id", recipeId)
      if (error) throw error
      setOpen(false)
      onDeleted?.()
    } catch (e: any) {
      setError(e?.message ?? "Löschen fehlgeschlagen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
        Löschen
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="rounded-2xl bg-white p-6 shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-2">Rezept löschen?</h3>
            <p className="text-sm text-neutral-600 mb-5">Diese Aktion kann nicht rückgängig gemacht werden.</p>

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100">
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="rounded-xl bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 disabled:opacity-50">
                {loading ? "Lösche..." : "Ja, löschen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
