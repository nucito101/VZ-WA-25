import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [people, setPeople] = useState<any>([])
  const [starships, setStarships] = useState<any>([])

  useEffect(() => {
    fetch("http://localhost:3000/people")
      .then((res) => res.json())
      .then((data) => setPeople(data))

    fetch("http://localhost:3000/starships")
      .then((res) => res.json())
      .then((data) => setStarships(data))
  }, [])

  return (
    <div>
      <h2>People</h2>
      <ul>
        {people.map((person: any) => (
          <li key={person.id}>
            <strong>{person.name}</strong>
            {person.age && <> – Age: {person.age}</>}
            {person.gender && <> – Gender: {person.gender}</>}
            {person.homeworld && <> – Homeworld: {person.homeworld}</>}
          </li>
        ))}
      </ul>

      <h2>Starships</h2>
      <ul>
        {starships.map((ship: any) => (
          <li key={ship.id}>
            <strong>{ship.name}</strong>
            {ship.model && <> – Model: {ship.model}</>}
            {ship.manufacturer && <> – Manufacturer: {ship.manufacturer}</>}
            {ship.crew && <> – Crew: {ship.crew}</>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
