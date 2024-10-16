export class Reserva {

    id: number | undefined ; 
    usuario_id : number | undefined;
    vehiculo_id :number | undefined;
    fecha_Reserva : Date | undefined;

     constructor(infoReserva : { id: number, usuario_id : number, vehiculo_id :number, fecha_Reserva : Date}){

        this.id = infoReserva.id;
        this.usuario_id = infoReserva.usuario_id;
        this.vehiculo_id = infoReserva.vehiculo_id;
        this.fecha_Reserva = infoReserva.fecha_Reserva;

    }

}