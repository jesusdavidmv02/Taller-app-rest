import { ResultSetHeader } from "mysql2";
import { reservaRepository } from "../repositori/reserva.Repositori";
import { Reserva } from "../Model/reserva.Model";

export class reservaController {

  private repository: reservaRepository;

  constructor() {
    this.repository = new reservaRepository();
  }

  async agregar(payload: { id: number; usuario_id : number;  vehiculo_id :number ; fecha_reserva : Date }) {
    try {

      const reserva = new Reserva({ id: payload.id,
         usuario_id: payload.usuario_id, 
          vehiculo_id : payload.vehiculo_id ,
           fecha_reserva : payload.fecha_reserva});
      const result = await this.repository.agregarReserva(reserva);

      if (result.ok == true) {
        console.log(`reserva echa`);
      } else {
        console.log("error");
      }
      return result;
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar.", error?.message);
      return error;

    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenerReservas();
      console.log("Reservas");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }
  
  async actualizar(payload: { id: number; usuario_id : number;  vehiculo_id :number ; fecha_reserva : Date }) {
    try {

      const reserva = new Reserva({ 
        id: payload.id,
        usuario_id: payload.usuario_id, 
        vehiculo_id : payload.vehiculo_id ,
        fecha_reserva : payload.fecha_reserva
      });

      const result = await this.repository.modificarReserva(reserva);

      if (result.ok === true) {
        console.log("Reserva actualizada con exito");
      } else {
        console.log("No se pudo actualizar la reserva");
      }
      return result;
    } catch (error) {
      console.log("Ha ocurrido un error actualizando");
      return error;
    }
  }

  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerReservaUno(id);
      if (resultado.length == 1) {
        console.log("Reserva consultada");
        return resultado        
      } else {
        console.log("No se encontro la reserva");
      }
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }

  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminarReserva(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "Reserva eliminada" };
    } else {
      return { ok: false, message: "No se pudo eliminar la reserva o no esta en la base de datos" };
    }
  }




}




 



