import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
//import { useUser } from "./controllers/userProvider";
import { getjuego, getjuegoNombre } from "./controllers/juegos"
import { getfavoritoUsuario,deletefavorito} from "./controllers/favoritos"
import { Linking } from 'react-native';
import { useUser } from "./controllers/userProvider";

export default function Favoritos() {
    
    const [data, setData] = useState([]);
    const { user} = useUser();

    const [update, setUpdate] = useState(false);
    const handleDeleteFavorite = async (id) => {
        deletefavorito(id).then((res) => {
            alert("Eliminado de favoritos");
            setUpdate(!update);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getfavoritoUsuario(user?.uid).then((res) => {
            console.log(res)
            const dataRenderTables = res.favoritos.map((item) => {

                return {
                    idFuera: item.id,
                    id: item.Juego.id,
                    nombre: item.Juego.nombre,
                    precio: item.Juego.precio,
                    image: item.Juego.image,
                    link: item.Juego.link,
                    page: item.Juego.page,
                };
            });
            setData(dataRenderTables);
            console.log(dataRenderTables)
        }).catch((err) => {
            console.log(err)
        }
        )
    }, [update]);


    return (
        <View style={styles.containerBox} >

            <View style={styles.container}>




                <View >
                    
                    <FlatList
                        style={styles.flatList}
                        data={data.filter((item) => item.page === "eneba")}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View style={styles.flatListItemContainer}>
                                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                                    <Image source={{ uri: item.image }} style={styles.gameImage} />
                                    <View style={styles.gameDetails}>
                                        <Text style={styles.gameTitle}>{item.nombre}</Text>
                                        <Text style={styles.gamePrice}>Desde ${item.precio}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => handleDeleteFavorite(item.idFuera)}>
                                    <Text style={styles.favoriteButtonText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                       
                </View >
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    containerBox: {
        backgroundColor: 'black', // Fondo oscuro
    },
    container: {
        backgroundColor: '#202935', // Fondo oscuro
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#9B4FF8', // Color morado
        padding: 8,
        margin: 10,
        width: 200,
        backgroundColor: '#1f1f29', // Fondo oscuro para la entrada de texto
        color: '#fff', // Texto blanco
    },
    button: {
        backgroundColor: "#9B4FF8", // Fondo morado
        color: "#fff", // Texto blanco
        padding: 10,
        textAlign: "center",
        margin: 4,
    },
    storeOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    storeButton: {
        padding: 10,
        color: '#fff', // Texto blanco
    },
    storeButtonSelected: {
        padding: 10,
        color: '#9B4FF8', // Texto morado
    },
    flatListContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    flatListItemContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: '#1f1f29', // Fondo oscuro
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(221, 221, 221, 0.2)', // Borde blanco con opacidad reducida
        shadowColor: '#D631FF', // Sombra morada
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.142,
        shadowRadius: 1,
        elevation: 2, // para Android
    },
    gameImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    gameDetails: {
        alignItems: 'center',
        marginTop: 10,
    },
    gameTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff', // Texto blanco
    },
    gamePrice: {
        fontSize: 14,
        color: '#9B4FF8', // Precio morado
        marginTop: 5,
    },
    button: {
        backgroundColor: '#814BC6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    favoriteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
