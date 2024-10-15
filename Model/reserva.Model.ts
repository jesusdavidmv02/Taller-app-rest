export class Reserva {

    id: number | undefined ; 
    usuario_id : number | undefined;
    vehiculo_id :number | undefined;
    fechaReserva : Date | undefined;

     constructor(infoReserva : { id: number, usuario_id : number, vehiculo_id :number, fechaReserva : Date}){

        this.id = infoReserva.id;
        this.usuario_id = infoReserva.usuario_id;
        this.vehiculo_id = infoReserva.vehiculo_id;
        this.fechaReserva = infoReserva.fechaReserva;

    }

}