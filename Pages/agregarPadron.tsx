import React,{ useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Modal, ActivityIndicator,Picker } from 'react-native'
import { Card ,Icon,Button, Input } from 'react-native-elements';
import * as Location from 'expo-location'
import { Route } from '@react-navigation/native';
export default function AgregarPadro(props:any ){
    const datetime = new Date();
    //Lista de tipos del padron simple
    const [padronTipos,setPadronTipos] = useState(["1 metro cuadrado - 10 MXN","Metro y medio - 12.50 MXN","dos metros cuadrados - 17.50 MXN","Puesto Fijo - 25.00 MXN","Mercado Ambulante - 30 MXN"]);
    const [fechaActual,setFechaActual] = useState(String);
    const [selectedValue,setSelectedValue ] = useState(String);
    useEffect(()=>{
        setFechaActual(`Fecha Actual: ${datetime.getFullYear()}-${(datetime.getMonth() + 1) > 10 ? (datetime.getMonth() + 1) :'0' + (datetime.getMonth() + 1)}-${datetime.getDate() > 10 ? datetime.getDate() : '0' + datetime.getDate()}` );
    },[]);
    return (
        <View style = {styles.container}>
            <View style = {[styles.detallesView]}>
                <Card>
                    <Card.Title>{"Agregar al padrón"}</Card.Title>
                    <Card.Divider/>
                    <Text style = {styles.dataInfo}>{fechaActual}</Text>
                    <Input placeholder = "Nombre o descricpión del local"></Input>
                    <Picker style = {styles.dataInfo}
                    // Tipos del padron simple
                    selectedValue = {selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label = {"Seleccione una opción"} value = {-1}/>
                        {
                            padronTipos.map((item,index)=>{
                            return <Picker.Item key={index} label = {item} value = {index}/>
                            })
                        }
                    </Picker>
                    <TouchableOpacity style = {styles.btn} onPress = {()=>{}}>
                        <Text style = {styles.btnTexto}> Guardar </Text>
                    </TouchableOpacity>
                </Card>
            </View>
            <View style = {styles.headerFooterView}>
                <View style = {styles.headerFooterContent}>
                    <Button icon = {<Icon name = "arrow-left-circle" type="feather" color =  "white" style = {{marginRight: 10}}/>} 
                            title = "Regresar" 
                            buttonStyle = {styles.btnRegresar}
                            onPress = {()=>{}}
                            />
                </View>
            </View>
            <Modal
                animationType = {'fade'}
                transparent = {true}
                visible = {false}
                >
                    <View style = {{flex: 1, justifyContent: 'center', height: '100%', width: '100%',backgroundColor: 'gray',opacity: .5}}>
                        <View style = {styles.modal}>
                            <ActivityIndicator size="large" color="#0d47a1" />
                        </View>   
                    </View>
                </Modal>
        </View>
    )
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
        marginTop: 10,
        marginBottom: 20,
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