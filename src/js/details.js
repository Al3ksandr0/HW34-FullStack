export function getDetailsHTML(item, currentCategory) {
    if (currentCategory === "people") {
        return `
            <p>Name: ${item.name}</p>
            <p>Height: ${item.height} cm</p>
            <p>Mass: ${item.mass} kg</p>
            <p>Hair Color: ${item.hair_color}</p>
            <p>Eye Color: ${item.eye_color}</p>
            <p>Birth Year: ${item.birth_year}</p>
            <p>Gender: ${item.gender}</p>
        `;
    } else if (currentCategory === "planets") {
        return `
            <p>Name: ${item.name}</p>
            <p>Climate: ${item.climate}</p>
            <p>Gravity: ${item.gravity}</p>
            <p>Terrain: ${item.terrain}</p>
            <p>Population: ${item.population}</p>
        `;
    } else if (currentCategory === "vehicles") {
        return `
            <p>Name: ${item.name}</p>
            <p>Model: ${item.model}</p>
            <p>Manufacturer: ${item.manufacturer}</p>
            <p>Cost: ${item.cost_in_credits} credits</p>
            <p>Length: ${item.length} meters</p>
            <p>Crew: ${item.crew}</p>
            <p>Passengers: ${item.passengers}</p>
        `;
    }
}
