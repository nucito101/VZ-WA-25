import supabase from "../utils/supabase"

export async function addCart(productId: number) {
  // = wir überprüfen, ob Product schon im Warenkorb bereits liegt

  const { data: itemExists, error: ErrorItem } = await supabase
    .from("cart_items")
    .select("*")
    // diese cart_id, 1 ist hardgecoodet, weil wir kein user haben
    .eq("cart_id", productId)

  if (ErrorItem) {
    console.error("Fehler beim Prüfen des Warenkorb", ErrorItem)
  }
  console.log(itemExists)

  const existingItem = itemExists?.[0]

  if (existingItem) {
    const { error: UpdateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + 1 })
      .eq("id", existingItem.id)

    if (UpdateError) {
      console.error("Fehler beim Aktualisieren", UpdateError)
    } else {
      console.log("Menge erhöht")
    }
  } else {
    // falls nicht vorhanden ist, neues Item bzw Produkt hinzufügen

    const { error: InsertError } = await supabase.from("cart_items").insert({
      cart_id: 1,
      product_id: productId,
      quantity: 1,
    })
    if (InsertError) {
      console.error("Fehler beim Einfügen", InsertError)
    } else {
      console.log("Product wurde zum warenkorb hinzugefügt")
    }
  }
}
