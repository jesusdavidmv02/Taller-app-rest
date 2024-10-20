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
        return { ok: true, id: result.insertId };
      } else {
        return { ok: false, id: result.insertId };
      }
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar.", error?.message);
      throw error;
    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenerUsusarios();
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
          return {ok: true , message : "usuaio actualizado corretamente "}        
      } else {
        return {ok: false , message : "Error  "}        
      }
    } catch (error) {
      console.log("Ha ocurrido un error actualizando");
      throw error;
    }
  }

  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerUsarioUno(id);
      if (resultado.length == 1) {
        console.log("Usuarios consultada");
        console.log(resultado[0]);
      } else {
        console.log("No se encontro la Usuario");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }

  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminarUsuario(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "Usuario eliminado" };
    } else {
      return { ok: false, message: "No se pudo eliminar el Usuario" };
    }
  }

}




 



