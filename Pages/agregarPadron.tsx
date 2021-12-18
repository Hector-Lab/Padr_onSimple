import React,{ useEffect, useState} from 'react';
import { View, Text,Vibration, StyleSheet,TouchableOpacity, Modal, ActivityIndicator,Picker } from 'react-native'
import { Card ,Icon,Button, Input } from 'react-native-elements';
import { APIServices } from './controlers/api-control'; 
export default function AgregarPadro(props:any ){
    const datetime = new Date();
    const warning='#e3e324';
    const success='#46eb3b';
    const error='#fa2525';
    const [colorDefault,setColorDefault]=useState(success);
    const [dataurl,setDataurl]=useState(String);
    const [estatusUrl,setEstatusUrl]=useState(String);
    const service = new APIServices();
    const [resultApi,setResultApi]=useState(Object);        
    useEffect(
        ()=>{
        let { datos} = props.route.params;
        setDataurl(datos);
        if(datos.includes('http://v.servicioenlinea.mx/')){
            //console.log('URL Valida');
            let urlData=datos.split('?');

            setEstatusUrl("");
            setColorDefault('white');


            try{
                let credencialToken = service.VerificarQRTombola( urlData[1],);
                credencialToken.then(result=>{
                    if(result.ok){
                        return result.json();
                    }else{
                        throw 'Error';
                    }
                }).then(data=>{
                    let {Code,Result,Status}=data;
                    if(Code==200){
                        setEstatusUrl("¡¡¡ AGREGADO A LA TOMBOLA !!!");
                        setColorDefault(success);
                        setResultApi(Result[0]);
                        //console.log('Actualizacion');
                        //console.log(Result[0]);
                        
                    }
                    else if (Code==423){

                        setEstatusUrl("¡¡¡ ESTO BOLETO YA ESTA DENTRO DE LA TOMBOLA !!!");
                        setColorDefault(error);
                        setResultApi(Result[0]);

                        //console.log(Result[0]);
                    }
                    else if (Code==404){
                    setEstatusUrl("¡¡¡ TICKET NO ENCONTRADO !!!");
                    setColorDefault(error);
                    setResultApi(null);
                    }
                    else if (Code==403){
                        setEstatusUrl("¡¡¡ TICKET NO VALIDO !!!");
                        setColorDefault(error);
                        setResultApi(null);
                    }
                    
                }).catch(erroreResult=>{
                    setEstatusUrl("ERROR AL VERFICIAR EL TICKET");
                    setColorDefault(error);
                    setResultApi(null);
                });

            }catch(errores){
                /*console.log('En el catch');
                console.log(errores);*/
                setEstatusUrl("ERROR AL VERFICIAR EL TICKET");
                setColorDefault(error);
                setResultApi(null);
            }  
            
            

        }else{
            setEstatusUrl("Formato del QR No Valido");
            setColorDefault(error);
        }
        
    },[]);
    return (
        <View style = {styles.container}>
            <View style = {[styles.detallesView]}>
                <Card>
                    <Card.Title>{"Agregar Al Sorteo"}</Card.Title>
                    <Card.Divider/>
                
                    <Text style={{color:"white",backgroundColor:colorDefault ,marginBottom:20,borderRadius:30,elevation:5,shadowColor:'grey',height:70,textAlign:'center',textAlignVertical:'center',fontWeight:'bold',fontSize:15}}>{estatusUrl}</Text>                
                <Input value= { resultApi!=null? resultApi.Nombre:'' } disabled={true} label='Municipio:' ></Input>
                <Input value= { resultApi!=null? resultApi.FechaTombola :''} disabled={true} label='Fecha De Registro:'></Input>
                <Input value= {resultApi!=null? resultApi.Ticket:''} disabled={true} label='Ticket:'></Input>
                </Card>
            </View>
            <View style = {styles.headerFooterView}>
                <View style = {styles.headerFooterContent}>
                    <Button icon = {<Icon name = "arrow-left-circle" type="feather" color =  "white" style = {{marginRight: 10}}/>} 
                            title = "Regresar" 
                            buttonStyle = {styles.btnRegresar}
                            onPress = {()=>{
                                Vibration.vibrate(100);
                                props.navigation.pop();
                                
                            }}
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
        backgroundColor: '#B20115',
    },
    modal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        opacity: 1
    }
})