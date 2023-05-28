
import { Favorito} from "../models/juegos";


export async function getfavoritoUsuario(idUsuario: string) {
    if (idUsuario != undefined) {
            const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/favoritos/${idUsuario}`);
            const data = await response.json();
            return data;
      
    }else
    {
        console.log("Id Invalido");
        return null;
    }
}

export async function getfavoritoJuego(idJuego: string) {
    if (idJuego != undefined) {
            const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/favoritos/juego/${idJuego}`);
            const data = await response.json();
            return data;
      
    }else
    {
        console.log("Id Invalido");
        return null;
    }
}

export async function postfavorito(idUsuario: string, idJuego: string) {

        const favorito: Favorito = {
            idUsuario : idUsuario,
            idJuego: idJuego,
        }
        const response = await fetch('https://apiscrapperpricepilot.hop.sh/api/favoritos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favorito)

        })
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        };
    }



export async function putfavorito(idUsuario: string, idJuego: string, id: number) {

        const instituion: Favorito = {
            idUsuario : idUsuario,
            idJuego: idJuego,

        }
        const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/favoritos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(instituion)
        })
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        };
    }


export async function deletefavorito(id: number) {
        const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/favoritos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        };;

    }


