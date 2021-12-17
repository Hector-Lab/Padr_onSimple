import { forModalPresentationIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";
import { registerCustomIconType } from "react-native-elements";
import { APIServices } from '../controlers/api-control';
import { setDatosBasicos, storageValue } from '../controlers/storage-service';
//Errores del sistema
const networkError = new Error("Favor de verificar la conexion a internet de su dispositivo");
const service = new APIServices();
export async function Auth(user: string, pass: string){
    let cliente = {
        'usuario': user,
        'passwd': pass
    };
    let data = service.login(cliente);
    let result =  await (await data).json();
    //INDEV: Verificamos el rol del usuarios
    let usuario = {
        Usuario: result['idUsuario']+"",
        Cliente: result['cliente']
    };
    try{
        let credencialToken = service.VerificarCrendencial(usuario,result['token']);
        let valid = await (await credencialToken).json();
        if(valid['Status']){
            return valid['Mensaje'][0]['Estatus'] == "1";
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
        throw networkError;
    }
    //setDatosBasicos(result['token'],result['datosUsuario']['NombreCompleto'],result['idUsuario']);
}
