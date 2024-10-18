import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Vehiculo } from "../Model/vehiculo.Controller";
import { getPoolConnection } from "../db/Source";

export class VehiculoRepository {
    
    async agregarVehiculo (vehiculo: Vehiculo ){
        const connection: Pool = getPoolConnection();
        const querySql = `INSERT INTO vehiculos (id, marca , modelo , anio) VALUES (?,?,?,?)`;
        const values = [vehiculo.id, vehiculo.marca, vehiculo.modelo ,vehiculo.anio];
        const result :  [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtenervehiculo(){
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM vehiculos`;
        const result = await connection.query(querySql);
        return result[0];
    }
    
    async obtenerVehiculoUno(idVehiculo: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM vehiculos WHERE id = ?`;
        const values = [idVehiculo];
        const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
        return queryResult[0];
    }
    
    async modificarVehiculo(vehiculo: Vehiculo) {
        const connection = getPoolConnection();
        const querySql = `UPDATE vehiculos SET marca = ?, modelo = ?, anio = ? WHERE id = ?`;
        const values = [ vehiculo.marca ,  vehiculo.modelo, vehiculo.anio , vehiculo.id ];
        console.log(values);
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async eliminarVehiculo(idVehiculo: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM vehiculos WHERE id = ?`;
        const values = [idVehiculo];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
    
}