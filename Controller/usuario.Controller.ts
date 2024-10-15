import { Usuario } from "../Model/usuario.Controller";
import { UsuarioRepository } from "../repositori/usuario.Repositori";


export class usuarioController {
  private repository: UsuarioRepository;

  constructor() {
    // Clase repository que tiene acceso a la base de datos
    this.repository = new UsuarioRepository();
  }

  async agregar(payload: { id : number; nombre: string;  email: string;  telefono : string }) {
    const usuario = new Usuario({ id:payload.id, nombre: payload.nombre, email: payload.email, telefono:payload.telefono });
    const result = await this.repository.agregarUsuario(usuario);
    console.log("Usuario agregado");
    return result;
  }

  async obtener() {
    const result = await this.repository.obtenerUsusarios();
    console.log("Categoria Obtenidas");
    console.log(result[0]);
    return result;
  }

//   async obtenerPorId(id: number) {
//     const result = await this.repository.obtenerCategoria(id);
//     console.log("Categoria obtenido");
//     console.log(result);
//     return result;
//   }

}
