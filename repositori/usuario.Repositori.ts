import { Pool, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "../db/db";
import { Usuario } from "../Model/usuario.Controller";


export class UsuarioRepository {
    
    async agregarUsuario (usuario: Usuario ){

        const connection: Pool = getPoolConnection();
        const querySql = `INSERT INTO usuario (id, nombre , email , telefono) VALUES (?,?,?,?)`;
        const values = [usuario.id, usuario.nombre, usuario.email , usuario.telefono ];
    
        const result = await connection.query(querySql, values);
        return result;
    }

    async obtenerUsusarios(){
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM reservas`;
        const result = await connection.query(querySql);
        return result;
    }

  

}