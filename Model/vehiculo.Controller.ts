export class Vehiculo {

    id: number | undefined ; 
    marca : string | undefined;
    modelo :string | undefined;
    anio : number | undefined;

     constructor(infoVehiculo : { id: number, marca : string, modelo :string, anio : number}){

        this.id = infoVehiculo.id;
        this.marca = infoVehiculo.marca;
        this.modelo = infoVehiculo.modelo;
        this.anio = infoVehiculo.anio;

    }

}