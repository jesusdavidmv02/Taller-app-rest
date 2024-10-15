import { Pool, RowDataPacket } from "mysql2/promise";
import { Reserva } from "../Model/reserva.Model";
import { getPoolConnection } from "../db/db";

export class reservaRepository {
    
    async agregarReserva (reserva: Reserva ){

        const connection: Pool = getPoolConnection();
        const querySql = `INSERT INTO reservas (id,usuario_id, vehiculo.id, fecha_reserva) VALUES (?,?,?,?)`;
        const values = [reserva.id, reserva.usuario_id, reserva.vehiculo_id , reserva.fechaReserva ];
    
        const result = await connection.query(querySql, values);
        return result;
    }

    async obtenerReservas(){
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM reservas`;
        const result = await connection.query(querySql);
        return result;
    }

    async obtenerReserva(idCategoria: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM reservas WHERE id = ?`;
        const values = [idCategoria];
        const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
        return queryResult[0];
    }

}