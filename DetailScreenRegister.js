import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useUser } from './controllers/userProvider';

export default function App({ navigation }) {

  const { user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignInPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 2500);
  };
  const cerrarSesion = () => {
    setUser(null);
    
    navigation.navigate('Inicio');

  };

  const handleAccountPress = (account) => {
    setModalVisible(false);
    if (account === 'account1') {
      setUser({ uid: 'eUdFhNEeSXNCJV1P8EXTmN6w14n2' });
      navigation.navigate('JuegosCliente');
    } else if (account === 'account2') {
      setUser({ uid: '6VpMBMtF4OZuwpsVsquZUErovRI3' });
      navigation.navigate('JuegosCliente');
    }
  };

  useEffect(() => {
    if (user) {
      navigation.navigate('JuegosCliente');
    }
  }, [user]);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>
      {user ?(
        <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      ):null}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        style={styles.modal}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.accounTitle}>Choose an account</Text>
            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => handleAccountPress('account1')}
            >
              <View style={styles.accountContent}>
                <Image source={require('./assets/user1.png')} style={styles.accountImage} />
                <View>
                  <Text style={styles.accountName}>Anthony Cochea</Text>
                  <Text style={styles.accountEmail}>dsadsadasdanthonyjosueth@gmail.com</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => handleAccountPress('account2')}
            >
              <View style={styles.accountContent}>
                <Image source={require('./assets/user2.png')} style={styles.accountImage} />
                <View>
                  <Text style={styles.accountName}>Thony Developer</Text>
                  <Text style={styles.accountEmail}>thonydevelopersoftware@gmail.com</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.accountContent}>
              <AntDesign name="adduser" size={24}  color="white" />
              <Text style={styles.addAccount}>Add account to device</Text>
            </View>

          </View>
        </View>
      </Modal>
    </View>

  );

}




const styles = StyleSheet.create({
  container: {

    backgroundColor: '#202935', // Fondo oscuro
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#814BC6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202935', // Fondo oscuro
  },
  modalContent: {
    backgroundColor: '#333436',
    padding: 10,
    borderRadius: 15,
    width: '90%',
  },



  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  accountButton: {
    backgroundColor: '#333436',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  accountContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  accountName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountEmail: {
    color: '#fff',
    fontSize: 14,
  },
  addAccount: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  accounTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});