import { ResultSetHeader } from "mysql2";
import { Vehiculo } from "../Model/vehiculo.Controller";
import { VehiculoRepository } from "../repositori/vehiculo.Repositori";


export class vehiculoController {

  private repository: VehiculoRepository;

  constructor() {
    this.repository = new VehiculoRepository();
  }

  async agregar(payload: { id: number; marca: string; modelo: string; anio: number }) {
    try {
      const vehiculo = new Vehiculo({
        id: payload.id,
        marca: payload.marca,
        modelo: payload.modelo,
        anio: payload.anio
      });

      const result = await this.repository.agregarVehiculo(vehiculo);
      if (result.affectedRows == 1) {
        return { ok: true, id: result.insertId };
      } else {
        return { ok: false, id: result.insertId  , messaje: "Error de envio" };
      }

    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar.", error?.message);
      throw error;
    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenervehiculo();
      return resultado;
    } catch (error) {
      return error;
    }
  }

  async actualizar(payload: { id: number; marca: string; modelo: string; anio: number }) {
    try {
      const vehiculo = new Vehiculo({
        id: payload.id,
        marca: payload.marca,
        modelo: payload.modelo,
        anio: payload.anio
      });
      const resultado = await this.repository.modificarVehiculo(vehiculo);
      if (resultado.affectedRows === 1) {
        return { ok: true, message: "Vehiculo actualizado corretamente" }
      } else {
        return { ok: false, message: "Error" }
      }
    } catch (error) {
      console.log("Ha ocurrido un error actualizando");
      throw error;
    }
  }

  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerVehiculoUno(id);
      if (resultado.length == 1) {
        return resultado[0];
      } else {
        return "El ID Vehiculo : no se encuentra en la base de datos" ;
      }
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      throw error;
    }
  }

  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminarVehiculo(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "Vehiculo eliminado Corretamente" };
    } else {
      return { ok: false, message: "No se pudo eliminar el Vehiculo // No se encuentra en la base de datos" };
    }
  }

}








