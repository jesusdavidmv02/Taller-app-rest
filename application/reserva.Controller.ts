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

      const reserva = new Reserva({ id: payload.id, usuario_id: payload.usuario_id,  vehiculo_id : payload.vehiculo_id , fecha_Reserva : payload.fecha_reserva});
      const result = await this.repository.agregarReserva(reserva);

      if (result.affectedRows == 1) {
        console.log(`Categoría agregada con el id: ${result.insertId}`);
      } else {
        console.log("La categoría no se agrego");
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

  async actualizar(payload: { id: number; usuario_id: number ; vehiculo_id: number; fecha_Reserva: Date }) {
    try {

      const reserva = new Reserva({
         id: payload.id,
         usuario_id: payload.usuario_id, 
         vehiculo_id: payload.vehiculo_id,
         fecha_Reserva: payload.fecha_Reserva 
        });

      const resultado = await this.repository.modificarReserva(reserva);
      if (resultado.affectedRows === 1) {
        console.log("Usuario actualizado");
      } else {
        console.log("No se pudo actualizar el usuario");
      }
      return resultado;
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
        console.log(resultado[0]);
      } else {
        console.log("No se encontro la Reserva");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }

  
  eliminar(id: number) {
    this.repository.eliminarReserva(id).then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          console.log(`la Reserva eliminado correctamente`);
        } else {
          console.log("No se pudo eliminar el Reserva");
        }
      }).catch((error) => {
        console.log("Ha ocurrido un error eliminando.");
        console.log(error);
      });
  }



}




 



