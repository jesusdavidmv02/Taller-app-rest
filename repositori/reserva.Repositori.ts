import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Reserva } from "../Model/reserva.Model";
import { getPoolConnection } from "../db/Source";
import { json } from "express";

export class reservaRepository {

    async validarUser (usuario_id : number){
        const connection: Pool = getPoolConnection();
        const querySql = `select  * from consecionario.usuarios  where  id = ?`;
        const values  = [usuario_id];
        const result : [any, FieldPacket[]]  = await connection.query(querySql, values);
        return result[0].length > 0 ? true : false ;
    }
  
    async validarVehiculo (vehiculo_id : number){
        const connection: Pool = getPoolConnection();
        const querySql = `select  * from consecionario.vehiculos where id = ?`;
        const values  = [vehiculo_id];
        const result : [any, FieldPacket[]] = await connection.query(querySql, values);
        return result[0].length > 0 ? true : false ;
    }
    
    async agregarReserva (reserva: Reserva ){
        const connection: Pool = getPoolConnection();
        const resulUser =  await this.validarUser(reserva.usuario_id);
        const resulVehiculo = await this.validarVehiculo(reserva.vehiculo_id);
        if (resulUser && resulVehiculo ) {
            const querySql = `INSERT INTO reservas (id,usuario_id, vehiculo_id, fecha_reserva) VALUES (?,?,?,?)`;
            const values  = [reserva.id, reserva.usuario_id, reserva.vehiculo_id , reserva.fecha_reserva ];
            const result : [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
            return {ok : true ,  result :  result[0] };
        } else {
            return {ok :false ,  messaje : "Los datos usuario_id  y vehiculo_id no corresponde a la base de datos " };
        }
    }
   
    async obtenerReservas(){
        const connection = getPoolConnection();
        const querySql = `select r.id, u.nombre as cliente , v.marca , v.modelo , v.anio , r.fecha_reserva from  consecionario.reservas r 
        inner join consecionario.usuarios u  on r.usuario_id  = u.id 
        inner join consecionario.vehiculos v on r.vehiculo_id = v.id `;
        const result = await connection.query(querySql);        
        return result[0];
    }

    async obtenerReservaUno(idReserva: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `select r.id, u.nombre , v.marca , v.modelo , v.anio , r.fecha_reserva  from  consecionario.reservas r 
            inner join consecionario.usuarios u  on r.usuario_id  = u.id 
            inner join consecionario.vehiculos v on r.vehiculo_id = v.id 
            where r.id  = ?`;
        const values = [idReserva];
        const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
        return queryResult[0];
    }
    
    async modificarReserva(reserva: Reserva) {
        const connection = getPoolConnection();

        const resulUser =  await this.validarUser(reserva.usuario_id);
        const resulVehiculo = await this.validarVehiculo(reserva.vehiculo_id);

        console.log(reserva);

        if (resulUser && resulVehiculo) {
            const querySql = `UPDATE reservas SET usuario_id = ?, vehiculo_id = ?, fecha_reserva = ? WHERE id = ?`;
            const values = [ reserva.usuario_id,
                reserva.vehiculo_id,
                reserva.fecha_reserva,
                reserva.id,
            ];
            const result = await connection.query<ResultSetHeader>(querySql, values);
            return {ok : true ,  result :  result[0] };
        } else {
            return {ok :false ,  messaje : "No correspode a la base de datos " };
        }
    }

    async eliminarReserva(idReserva: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM reservas WHERE id = ?`;
        const values = [idReserva];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

}