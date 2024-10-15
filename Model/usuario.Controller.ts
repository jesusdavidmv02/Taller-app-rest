export class Usuario {

    id: number | undefined ; 
    nombre : string | undefined;
    email :string | undefined;
    telefono : string | undefined;

     constructor(infoCliente : { id: number, nombre : string, email :string, telefono : string}){

        this.id = infoCliente.id;
        this.nombre = infoCliente.nombre;
        this.email = infoCliente.email;
        this.telefono = infoCliente.telefono;

    }

}