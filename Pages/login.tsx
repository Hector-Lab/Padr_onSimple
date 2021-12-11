import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Avatar,Button,Input} from 'react-native-elements';
import { StyleSheet, Text, View, TouchableOpacity, Alert, RefreshControlComponent } from 'react-native';
import { Auth } from './controlers/services';
import Loading from './components/modal-loading';
import { useAsyncStorage } from '@react-native-async-storage/async-storage/jest/async-storage-mock';

export default function Log(props: any) {
  const [password,setPassword] = useState(String);
  const [user,setUser] = useState(String);
  const [loading, setLoading] =  useState(false);
  //Manrjadores de los inputs
  const LogIn = async () =>{
    setLoading(true);
    if(password == "" || user == ""){
      showAlert("Campos vacios","Favor de ingresar sus credenciales");
      setLoading(false);
    }else{
      // se llama a la la api para la autenticacion
      await Auth(user,password)
      .then((result)=>{
        setLoading(false);
        if(result){
          props.navigation.navigate('Lector QR');
        }
      }).catch((error)=>{
        
      });
      
    }
  }
function showAlert(header: string, message: string){
  Alert.alert(header,message,
    [
      {
        text: "Aceptar",
        style: "cancel"
      }
    ],
      {
        cancelable:true
      }
    )
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
            onChangeText = {text => setUser(text)}
            leftIcon = {{type:'font-awesome', name: 'user'}}
            />
            <Input 
            placeholder = "Contraseña"
            onChangeText = {pass =>setPassword(pass)}
            leftIcon = {{type:'font-awesome', name: 'lock'}}/>
            <TouchableOpacity style={styles.btnButton} onPress={LogIn}>
              <Text style = {styles.btnTexto} >Acceder</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footPage}>
          <Text style={styles.footText}>SUINPAC</Text>
        </View>
        <Loading 
          transparent = {true}
          loading = {loading}
          loadinColor = {"#0000ff"}
          onCancelLoad = {()=>{}}
         />
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
  },
  inputButtons : {
    flex: 3,
    flexDirection: 'column',
    margin:30,
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
    backgroundColor: 'white',
    borderWidth : 2,
    borderColor: "#B20115",
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
    color: '#B20115' ,
    fontWeight: 'bold'
  },
});
