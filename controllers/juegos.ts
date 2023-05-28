import { Juego } from "../models/juegos";

export async function getjuego() {
        const response = await fetch('https://apiscrapperpricepilot.hop.sh/api/juegos');
        const data = await response.json();
        console.log("", data.Juegos);
        return data.Juegos;
}


export async function getjuegoNombre(Nombre: string) {
    if (Nombre != undefined) {
            const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/juegos/${Nombre}`);
            const data = await response.json();
            return data;
      
    }else
    {
        console.log("Id Invalido");
        return null;
    }
}
