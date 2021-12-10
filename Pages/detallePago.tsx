import React,{ useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Modal, ActivityIndicator,Animated } from 'react-native'
import { Card ,Icon,Button } from 'react-native-elements';
import * as Location from 'expo-location'
export default function DetallePago(props: any){
    const [ data, setData ] = useState();
    const [ coords,setCoords ] = useState(Object);
    const [permissionLocation,setPermissonLocation] = useState(Boolean);
    const [type,setType] = useState(); 
    const [fechaActual,setFechaActual] = useState(String);
    const [loading, setLoading ] = useState(Boolean);
    const datetime = new Date();
    const [ nombre, setNombre ] = useState(`Paleteria - Felipe Hernadez Torres`);
    useEffect(()=>{
        let { datos, tipo } = props.route.params;
        setData(datos);
        setType(tipo);
        VerificarPermisos();
        setFechaActual(`Fecha Actual: ${datetime.getFullYear()}-${(datetime.getMonth() + 1) > 10 ? (datetime.getMonth() + 1) :'0' + (datetime.getMonth() + 1)}-${datetime.getDate() > 10 ? datetime.getDate() : '0' + datetime.getDate()}` );
    },[]);
    useEffect(()=>{
    
    },[permissionLocation])
    const VerificarPermisos = async () =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        setPermissonLocation(status === 'granted');
    }
    const regresaPantalla = () =>{
        props.navigation.navigate('Lector QR');
    }
    const obtenerCoordenadas = async () => {
        setLoading(true);
       let coords = await Location.getCurrentPositionAsync();
       alert(coords.coords.latitude + "\n" + coords.coords.longitude);
       setCoords(coords);
       setLoading(false);
    }
    return(
        <View style = {styles.container}>
            <View style = {[styles.detallesView]}>
                <Card>
                    <Card.Title>{nombre}</Card.Title>
                    <Card.Divider/>
                        <Text style = {styles.dataInfo}>Fecha de alta: 2021-07-26</Text>
                        <Text style = {styles.dataInfo}>{`Datos: ${data} - ${type}`}</Text>
                        <Text style = {styles.dataInfo}>Precio: 17.50 MX</Text>
                        <Text style = {[styles.dataInfo,{marginBottom: 40}]}>{fechaActual}</Text>
                    <Card.Divider/>
                    <TouchableOpacity style = {styles.btn} onPress = {obtenerCoordenadas}>
                        <Text style = {styles.btnTexto} >Confirmar Pago</Text>
                    </TouchableOpacity>
                </Card>
            </View>
            <View style = {styles.headerFooterView}>
                <View style = {styles.headerFooterContent}>
                    <Button icon = {<Icon name = "arrow-left-circle" type="feather" color =  "white" style = {{marginRight: 10}}/>} 
                            title = "Regresar" 
                            buttonStyle = {styles.btnRegresar}
                            onPress = {regresaPantalla}
                            />
                </View>
            </View>
            <Modal
                animationType = {'fade'}
                transparent = {true}
                visible = {loading}
                >
                    <View style = {{flex: 1, justifyContent: 'center', height: '100%', width: '100%',backgroundColor: 'gray',opacity: .5}}>
                        <View style = {styles.modal}>
                            <ActivityIndicator size="large" color="#0d47a1" />
                        </View>   
                    </View>
                </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
      },
    headerFooterView :{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerFooterContent : {
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
    },
    detallesView: {
        flex: 4,
        flexDirection:'column',
        marginTop: 30
    },
    cardDetalle: {
        flex: 1,
        flexDirection:'row',
    },
    dataInfo: {
        textAlign: 'center',
        marginTop: 20
    },
    btn : {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#B20115',
    },
    btnTexto: {
        color: '#ffff',
        fontWeight: 'bold'
    },
    btnRegresar: {
        borderRadius: 15,
        width: '100%',
        backgroundColor: '#0d47a1',
    },
    modal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        opacity: 1
    }
})