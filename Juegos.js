import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
//import { useUser } from "./controllers/userProvider";
import { getjuego, getjuegoNombre } from "./controllers/juegos"
import { postfavorito } from "./controllers/favoritos"
import { Linking } from 'react-native';
import { useUser } from "./controllers/userProvider";
import Favoritos from "./Favoritos";

export default function Juegos(props) {
    const { user, setUser } = useUser();
    const [selectedStore, setSelectedStore] = useState(1);
    const [selectedOption, setSelectedOption] = useState(1);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState({ nombre: "" });
    const [busqueda, setBusqueda] = useState(false);

    const handleBusqueda = () => {
        console.log(fields.nombre);
        setBusqueda(!busqueda);
    };


    const handlePostFavorite = async (item) => {
        if (props.favorites === 0) {
            alert("Debes iniciar sesión para agregar a favoritos");
        } else {
            try {
                await postfavorito(user.uid, item).then((res) => {
                    if (res.msg != undefined) {
                        alert("Ya tienes este juego en favoritos");
                    } else {
                        alert("Juego agregado a favoritos con éxito");
                    }
                });
            } catch (error) {
                alert("error");
            }
        }
    };

    useEffect(() => {
        console.log(user?.uid);
        if (fields.nombre === "") {
            setLoading(true);
            getjuego()
                .then((res) => {
                    const dataRenderTables = res.map((item) => {
                        return {
                            id: item.id,
                            nombre: item.nombre,
                            precio: item.precio,
                            image: item.image,
                            link: item.link,
                            page: item.page,
                        };
                    });
                    setData(dataRenderTables);
                })
                .then(() => {
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setLoading(true);
            getjuegoNombre(fields.nombre)
                .then((res) => {
                    const dataRenderTables = res.map((item) => {
                        return {
                            id: item.id,
                            nombre: item.nombre,
                            precio: item.precio,
                            image: item.image,
                            link: item.link,
                            page: item.page,
                        };
                    });
                    dataRenderTables.sort((a, b) => a.precio - b.precio);
                    setData(dataRenderTables);
                })
                .then(() => {
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [busqueda]);


    return (
        <View style={styles.containerBox} >
            {props.favorites === 1 ? (
                <View style={styles.storeOptions}>
                    <TouchableOpacity onPress={() => setSelectedOption(1)}>
                        <Text style={selectedOption === 1 ? styles.storeButtonSelected : styles.storeButton}>Juegos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedOption(2)}>
                        <Text style={selectedOption === 2 ? styles.storeButtonSelected : styles.storeButton}>Favoritos</Text>
                    </TouchableOpacity>
                </View>
            ) : null}


            {selectedOption === 1 ? (
                <View style={styles.container}>


                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.input}
                            placeholder="Buscar un Juego"
                            onChangeText={(text) => setFields({ ...fields, nombre: text })}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => handleBusqueda()}>
                            <Text>Buscar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.storeOptions}>
                        <TouchableOpacity onPress={() => setSelectedStore(1)}>
                            <Text style={selectedStore === 1 ? styles.storeButtonSelected : styles.storeButton}>Eneba</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedStore(2)}>
                            <Text style={selectedStore === 2 ? styles.storeButtonSelected : styles.storeButton}>GamersGate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedStore(3)}>
                            <Text style={selectedStore === 3 ? styles.storeButtonSelected : styles.storeButton}>Steam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedStore(4)}>
                            <Text style={selectedStore === 4 ? styles.storeButtonSelected : styles.storeButton}>2Game</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        {selectedStore === 1 ? (
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
                                        <TouchableOpacity style={styles.button} onPress={() => handlePostFavorite(item.id)}>
                                            <Text style={styles.favoriteButtonText}>Favorito</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        ) : null}
                        {selectedStore === 2 ? (
                            <FlatList
                                style={styles.flatList}
                                data={data.filter((item) => item.page === "gamersgate")}
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
                                        <TouchableOpacity style={styles.button} onPress={() => handlePostFavorite(item.id)}>
                                            <Text style={styles.favoriteButtonText}>Favorito</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />

                        ) : null}
                        {selectedStore === 3 ? (
                            <FlatList
                                style={styles.flatList}
                                data={data.filter((item) => item.page === "Steam")}
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
                                        <TouchableOpacity style={styles.button} onPress={() => handlePostFavorite(item.id)}>
                                            <Text style={styles.favoriteButtonText}>Favorito</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        ) : null}
                        {selectedStore === 4 ? (
                            <FlatList
                                style={styles.flatList}
                                data={data.filter((item) => item.page === "2Game")}
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
                                        <TouchableOpacity style={styles.button} onPress={() => handlePostFavorite(item.id)}>
                                            <Text style={styles.favoriteButtonText}>Favorito</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        ) : null}

                    </View >
                </View>
            ) : null}
            {selectedOption === 2 ? (
                <Favoritos />
            ): null}

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
