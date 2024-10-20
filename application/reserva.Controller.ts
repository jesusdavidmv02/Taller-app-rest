import { ResultSetHeader } from "mysql2";
import { reservaRepository as ReservaRepository } from "../repositori/reserva.Repositori";
import { Reserva } from "../Model/reserva.Model";
import { UsuarioRepository } from "../repositori/usuario.Repositori";
import { VehiculoRepository } from "../repositori/vehiculo.Repositori";

export class reservaController {

  private repository: ReservaRepository;
  private reposUsuario : UsuarioRepository;
  private reposVehiculo : VehiculoRepository;

  constructor() {
    this.repository = new ReservaRepository();
    this.reposUsuario = new UsuarioRepository();
    this.reposVehiculo = new VehiculoRepository();
  }

  async agregar(payload: { id: number; usuario_id : number;  vehiculo_id :number ; fecha_reserva : Date }) {
    try {

      const resulUser =  await this.reposUsuario.obtenerUsarioUno(payload.usuario_id);
      const resulVehiculo = await  this.reposVehiculo.obtenerVehiculoUno(payload.vehiculo_id);

      if (resulUser.length !== 1) {
        return { ok: false, message: "El usuario no  se encuentra en la base de datos" };
      }

      if (resulVehiculo.length !== 1) {
        return { ok: false, message: "El Vehiculo no  se encuentra en la base de datos" };
      }

      const reserva = new Reserva({
        id: payload.id,
        usuario_id: payload.usuario_id, 
        vehiculo_id : payload.vehiculo_id ,
        fecha_reserva : payload.fecha_reserva
       });

      const result = await this.repository.agregarReserva(reserva);

      if (result.affectedRows == 1) {
        return { ok: true, id: result.insertId };
      } else {
        return { ok: false, id: result.insertId };
      }
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

      const resulUser =  await this.reposUsuario.obtenerUsarioUno(payload.usuario_id);
      const resulVehiculo = await  this.reposVehiculo.obtenerVehiculoUno(payload.vehiculo_id);

      if (resulUser.length !== 1) {
        return { ok: false, message: "El usuario no  se encuentra en la base de datos" };
      }

      if (resulVehiculo.length !== 1) {
        return { ok: false, message: "El Vehiculo no  se encuentra en la base de datos" };
      }

      const reserva = new Reserva({ 
        id: payload.id,
        usuario_id: payload.usuario_id, 
        vehiculo_id : payload.vehiculo_id ,
        fecha_reserva : payload.fecha_reserva
      });

      const result = await this.repository.modificarReserva(reserva);

      if (result.affectedRows === 1) {
        return {ok: true , message : "Reserva actualizada con exito"}        
      } else {
        return {ok: false , message : "Error en la Actualizacion de la reserva"}        
      }
      
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




 



