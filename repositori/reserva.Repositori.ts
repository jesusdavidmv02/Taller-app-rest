import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Reserva } from "../Model/reserva.Model";
import { getPoolConnection } from "../db/Source";

export class reservaRepository {
    
    async agregarReserva (reserva: Reserva ){

        const connection: Pool = getPoolConnection();
        const querySql = `INSERT INTO reservas (id,usuario_id, vehiculo_id, fecha_reserva) VALUES (?,?,?,?)`;
        const values  = [reserva.id, reserva.usuario_id, reserva.vehiculo_id , reserva.fecha_Reserva ];
    
        const result : [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerReservas(){
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM reservas`;
        const result = await connection.query(querySql);
        return result;
    }

    async obtenerReservaUno(idReserva: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM reservas WHERE id = ?`;
        const values = [idReserva];
        const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
        return queryResult[0];
    }
    
    async modificarReserva(reserva: Reserva) {
        const connection = getPoolConnection();
        const querySql = `UPDATE Reserva SET usuario_id = ?, vehiculo_id = ?, fecha_reserva = ? WHERE id = ?`;
        const values = [ reserva.id,
            reserva.usuario_id,
            reserva.vehiculo_id,
            reserva.fecha_Reserva
        ];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async eliminarReserva(idReserva: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM reservas WHERE id = ?`;
        const values = [idReserva];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

}