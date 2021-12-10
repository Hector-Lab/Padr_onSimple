import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Avatar,Button,Input} from 'react-native-elements';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { requestMicrophonePermissionsAsync } from 'expo-camera';
export default function Log(props: any) {
  function LogIn(){
    props.navigation.navigate('Lector QR');
  }
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.avatarView}>
          <View style={styles.avatarElement}>
            <Avatar 
            rounded
              size = "xlarge"
              containerStyle = {{height:100,width:200}}
              source = {require("../resources/suinpac.png")}
            />
          </View>
        </View>
        <View style={styles.inputButtons}>
            <Input 
            placeholder = "Nombre de usuario"
            leftIcon = {{type:'font-awesome', name: 'user'}}
            />
            <Input 
            placeholder = "Contraseña"
            leftIcon = {{type:'font-awesome', name: 'lock'}}/>
            <TouchableOpacity style={styles.btnButton} onPress={LogIn}>
              <Text style = {styles.btnTexto} >Acceder</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footPage}>
          <Text style={styles.footText}>Suinpac</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    flexDirection: 'column',

  },
  avatarView: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'red'
  },
  inputButtons : {
    flex: 3,
    flexDirection: 'column',
    margin:30,
    //backgroundColor: 'green'
  },
  avatarElement : {
    flex: 1,
    alignItems: 'center'
  },
  btnButton: {
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#B20115',
    //backgroundColor: 'red'
  },
  footPage: {
    flex: .4,
    alignItems: 'center',
  },
  footText: {
    color: '#B20115',
    fontSize: 20,
  },
  btnTexto: {
    color: '#ffff',
    fontWeight: 'bold'
  },
});
