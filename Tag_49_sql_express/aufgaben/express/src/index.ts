// @ts-nocheck
import express from "express"
import { IPerson } from "./models/IPerson"
import { IStarship } from "./models/IStarship"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())

const people: IPerson[] = [
  {
    id: 1,
    name: "Luke Skywalker",
    age: 19,
    gender: "male",
    homeworld: "Tatooine",
  },
  {
    id: 2,
    name: "Darth Vader",
    age: 45,
    gender: "male",
    homeworld: "Tatooine",
  },
  {
    id: 3,
    name: "Leia Organa",
    age: 19,
    gender: "female",
    homeworld: "Alderaan",
  },
]

const starships: IStarship[] = [
  {
    id: 1,
    name: "Millennium Falcon",
    model: "YT-1300f light freighter",
    manufacturer: "Corellian Engineering Corporation",
    crew: 4,
  },
  {
    id: 2,
    name: "X-Wing",
    model: "T-65 X-wing starfighter",
    manufacturer: "Incom Corporation",
    crew: 1,
  },
  {
    id: 3,
    name: "TIE Fighter",
    model: "Twin Ion Engine/Ln Starfighter",
    manufacturer: "Sienar Fleet Systems",
    crew: 1,
  },
]

app.get("/people", (req, res) => {
  res.json(people)
})

app.get("/starships", (req, res) => {
  res.json(starships)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
