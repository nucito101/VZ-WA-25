import express from "express"

// Diese App variable ist wie ein virtueller server, natürlich nur local auf dem Rechner

const app = express()
const PORT = 3000

const users_DatenBank = [
  {
    id: 1,
    name: "John",
    city: "Hamburg",
    age: 20,
  },
  {
    id: 2,
    name: "Hannah",
    city: "Berlin",
    age: 20,
  },
  {
    id: 3,
    name: "Joe",
    city: "Berlin",
    age: 30,
  },
]

const cities = [
  {
    id: 1,
    name: "Hamburg",
  },

  {
    id: 2,
    name: "Berlin",
  },
  {
    id: 3,
    name: "Wien",
  },
]

// app.get ist eine GET METHODE und hat zwei Parameter der erste ist die Route und der Zweite ist eine Callback function die Selebst wieder zwei Parameter hat (reg, res)

app.get("/users", (req, res) => {
  // Der Brwoser kann nur mit JSON Daten umgehen
  // Deshlab müssen wir die Daten mit res in JSON umwandeln
  res.json(users_DatenBank)
})

app.get("/cities", (req, res) => {
  res.json(cities)
})

app.listen(PORT, () => {
  console.log("Server ist am laufen auf localhost" + PORT)
})
