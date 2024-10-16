import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "../db/Source";
import { Usuario } from "../Model/usuario.Controller";

export class UsuarioRepository {
    
    async agregarUsuario (usuario: Usuario ){

        const connection: Pool = getPoolConnection();
        const querySql = `INSERT INTO usuarios (id, nombre , email , telefono) VALUES (?,?,?,?)`;

        const values : Array<string | number | undefined> = [usuario.id, usuario.nombre, usuario.email , usuario.telefono ]; 
        
           
        const result : [ResultSetHeader, FieldPacket[]]  = await connection.query(querySql, values);
        return result[0];

    }

    async obtenerUsusarios(){
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM usuarios`;
        const result = await connection.query(querySql);
        return result[0];
    }
    
    async obtenerUsarioUno(idUsuario: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM usuarios WHERE id = ?`;
        const values = [idUsuario];
        const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
        return queryResult[0];
    }
    
    async modificarUsuario(usuario: Usuario) {
        const connection = getPoolConnection();
        const querySql = `UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?`;
        const values = [ usuario.id,
            usuario.nombre,
            usuario.email,
            usuario.telefono           
        ];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async eliminarUsuario(idUsuario: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM usuarios WHERE id = ?`;
        const values = [idUsuario];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

}