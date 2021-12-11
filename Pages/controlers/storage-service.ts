import AsyncStorage from '@react-native-async-storage/async-storage';
const rootKey = "@storage_"
export const storageValue = async(key:string, value:string)=>{
    try{
        await AsyncStorage.setItem(rootKey+key,value);
        return true;
    }catch(e){
        console.log(e);
        return null;
    }
}
export const getValue = async(key:string)=>{
    try{
        return await AsyncStorage.getItem(key);
    }catch(e){
        return null;
    }
}
export const setDatosBasicos = async(token:string,nombre:string,idUser:string)=>{
    try{
        await AsyncStorage.setItem(rootKey+"Token",token);
        await AsyncStorage.setItem(rootKey+"Nombre",nombre);
        await AsyncStorage.setItem(rootKey+"idUser",idUser);
        return true;
    }catch(error){
        return null;
    }
}