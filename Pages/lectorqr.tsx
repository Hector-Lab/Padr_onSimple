import React, { useEffect, useState } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { View , Text,Vibration, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
export default function Lector(props: any){
    const [permisos,setPermisos] = useState(Boolean);
    const [locationPermission,setLocationPermission] = useState(Boolean);
    const [scanned, setScaned] = useState(Boolean);
    const [torch,setTorch] = useState(Boolean);
    const [activeScanner, setActiveScanner] = useState(Boolean);
    const ComprobarPermisos = async() =>{
        let { status } = await BarCodeScanner.requestPermissionsAsync();
        setPermisos(status === 'granted');
    }
    const ComprobarPermisosGPS = async() =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status === 'granted');
    }
    useEffect(() => {
        ComprobarPermisos();
        //ComprobarPermisosGPS();
      }, []);
    const AcitvarCamara = () =>{
        setActiveScanner(!activeScanner);
    }
    const procesarScaneo = ({ type,data,bounds,cornerPoints}: BarCodeScannerResult) =>{
        //setActiveScanner(false);
        Vibration.vibrate(100);  
        setActiveScanner(false);
        props.navigation.navigate('Agregar A Tombola',{datos: data});            
    }

      return (
        <View style = {styles.container}>
            <View style = {styles.headerFooterView}>
                <View style = {styles.headerFooterContent}>
                <Text>Ingrese el codigo QR en la parte inferior</Text>
                </View>
            </View>
            <View style = {activeScanner ? styles.lectorView : styles.msjScanner}>
                {
                    activeScanner ? (<BarCodeScanner onBarCodeScanned={scanned ? undefined : procesarScaneo} 
                                                     style = {styles.lector}
                                                     barCodeTypes = {[BarCodeScanner.Constants.BarCodeType.qr]}>

                    </BarCodeScanner>) 
                    : 
                    (<View style = {{alignContent: 'center', flex: 1}}>
                            <Icon  name ={'qr-code-scanner'}  type = "material" size = {150} color = {'#000000'}></Icon>
                            <Text style = {styles.msjText}>Presione el boton para activar el scanner</Text>
                        </View>)
                }
            </View>
            <View style = {{flex: .5,flexDirection: 'column',alignItems: 'center'}}>
                <TouchableOpacity style = {styles.btnTorch} onPress = {AcitvarCamara}>
                    <Icon name ={'qr-code'}  type = "material" size = {30}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
    },
    headerFooterView :{
        flex: .2,
        alignItems: 'center'
    },
    lectorView: {
        flex: 4,
    },
    lector: {
        height: '100%',
        width: '100%',
    },
    headerFooterContent : {
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
    },
    btnTorch: {
        backgroundColor: '#B20115',
        borderRadius: 15,
        marginTop: 10,
        padding: 10
    },
    msjScanner : {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    msjText: {
        marginTop: 50,
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold',
    },
})