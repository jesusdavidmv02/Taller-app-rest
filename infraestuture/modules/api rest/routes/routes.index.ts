import Express from "express";
import { usuarioController } from "../../../../application/usuario.Controller";
import { vehiculoController } from "../../../../application/vehiculo.Cotroller";

// import { ProductoController } from "";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta

export const routes = () => {

    const router = Express.Router();
    const usuarioCtrl = new usuarioController();
    const vehculoCtrol = new vehiculoController();

    router.post("/usuario", (req, res) => {


        res.send("Post usuario");
    });

    router.put("/usuario", (req, res) => {
        res.send("Put usuario");
    });

    router.get("/usuario", (req, res) => {
        usuarioCtrl.obtener().then((result) => {
            res.send(result);
        })
            .catch((error) => {
                res.send({
                    message: "Ha ocurrido un error al consultar los usuario",
                });
            });
    });


    router.get("/vehiculo", (req, res) => {
        vehculoCtrol.obtener().then((result) => {
            res.send(result);
        })
            .catch((error) => {
                res.send({
                    message: "Ha ocurrido un error al consultar los vehuclo",
                });
            });
    });

    // parametro dinamico /:id
    router.get("/usuario/:id", (req, res) => {
        const id = req.params.id;
        res.send(`Get one usuario ${id}`);
    });

    router.delete("/usuario/:id", (req, res) => {
        const id = req.params.id;
        res.send(`delete one usuario ${id}`);
    });

    return router;
    
};
