export class APIServices {
    
    login (data: any){

        let jsonData = JSON.stringify(data);
        return fetch("https://api.servicioenlinea.mx/api-movil/login-luminarias",
        {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:jsonData
        }
        );

    }
    VerificarCrendencial(data:any, token:string){
        let jsonData = JSON.stringify(data);
        console.log(jsonData);
        return fetch("https://api.servicioenlinea.mx/api-movil/VerificalRolPadron",
            {
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':"Bearer " + token
                },
                body: jsonData
            }
        );
    }
    VerificarQRTombola(data:any){
        let jsonData=JSON.stringify({cadena:data});
        console.log(jsonData);
        return fetch("https://api.servicioenlinea.mx/api-movil/RomperVoleto",
            {
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    
                },
                body: jsonData
            }
        );
    }

}