import { ResultSetHeader } from "mysql2";
import { Vehiculo } from "../Model/vehiculo.Controller";
import { VehiculoRepository } from "../repositori/vehiculo.Repositori";


export class vehiculoController {

  private repository: VehiculoRepository;

  constructor() {
    this.repository = new VehiculoRepository();
  }

  async agregar(payload: { id: number; marca : string;  modelo :string ; anio : number }) {
    try {

      const vehiculo = new Vehiculo({
         id: payload.id, 
          marca: payload.marca,
          modelo: payload.modelo ,
         anio : payload.anio}
        );
      const result = await this.repository.agregarVehiculo(vehiculo);

      if (result.affectedRows == 1) {
        console.log(` Vehiculo agregada con el id: ${result.insertId}`);
      } else {
        console.log("La  Vehiculo no se agrego");
      }
      return result;
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar.", error?.message);
      return error;

    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenervehiculo();
      console.log("Reservas");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }

  async actualizar(payload: { id: number; marca: string ; modelo: string; anio: number }) {
    try {

      const vehiculo = new Vehiculo({
         id: payload.id,
         marca: payload.marca, 
         modelo: payload.modelo,
         anio: payload.anio 
        });

      const resultado = await this.repository.modificarVehiculo(vehiculo);
      if (resultado.affectedRows === 1) {
        console.log("Vehiculo actualizado");
      } else {
        console.log("No se pudo actualizar el Vehiculo");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error actualizando");
      return error;
    }
  }

  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerVehiculoUno(id);
      if (resultado.length == 1) {
        console.log("Vehiculo consultada");
        console.log(resultado[0]);
      } else {
        console.log("No se encontro la Vehiculo");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }

  
  eliminar(id: number) {
    this.repository.eliminarVehiculo(id).then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          console.log(`la Vehiculo eliminado correctamente`);
        } else {
          console.log("No se pudo eliminar el Vehiculo");
        }
      }).catch((error) => {
        console.log("Ha ocurrido un error eliminando.");
        console.log(error);
      });
  }



}




 



