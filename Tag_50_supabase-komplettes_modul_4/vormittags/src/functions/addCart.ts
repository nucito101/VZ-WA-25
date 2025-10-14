import supabase from "../utils/supabase"

export async function addCart(productId: number, userId: string | undefined) {
  // wir prüfen ob den Warenkorb für den Wert da ist
  const { data: cart, error: cartError } = await supabase.from("carts").select("*").eq("customer_id", userId)

  if (cartError) {
    console.error("Fehler beim Anrufen des Warenkorbs", cartError)
  }

  console.log(cart)

  const cartId = cart?.[0].id

  // = wir überprüfen, ob Product schon im Warenkorb bereits liegt

  const { data: itemExists, error: ErrorItem } = await supabase
    .from("cart_items")
    .select("*")
    // diese cart_id, 1 ist hardgecoodet, weil wir kein user haben
    .eq("cart_id", cartId)
    .eq("product_id", productId)

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
      cart_id: cartId,
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
