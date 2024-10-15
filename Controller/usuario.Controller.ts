import { ResultSetHeader } from "mysql2";
import { Usuario } from "../Model/usuario.Controller";
import { UsuarioRepository } from "../repositori/usuario.Repositori";

export class usuarioController {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async agregar(payload: { id: number; nombre: string; email: string; telefono: string }) {
    try {
      const usuario = new Usuario({ id: payload.id, nombre: payload.nombre, email: payload.email, telefono: payload.telefono });
      const result = await this.repository.agregarUsuario(usuario);

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
      const resultado = await this.repository.obtenerUsusarios();
      console.log("Usuarios");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }



  async actualizar(payload: { id: number; nombre: string; email: string; telefono: string }) {
    try {
      const usuario = new Usuario({ id: payload.id, nombre: payload.nombre, email: payload.email, telefono: payload.telefono });
      const resultado = await this.repository.modificarUsuario(usuario);
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
      const resultado = await this.repository.obtenerUsarioUno(id);
      if (resultado.length == 1) {
        console.log("Categoría consultada");
        console.log(resultado[0]);
      } else {
        console.log("No se encontro la categoría");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }

  
  eliminar(id: number) {
    this.repository.eliminarUsuario(id).then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          console.log(`Usuario eliminado correctamente`);
        } else {
          console.log("No se pudo eliminar el usuario");
        }
      }).catch((error) => {
        console.log("Ha ocurrido un error eliminando.");
        console.log(error);
      });
  }



}




 



