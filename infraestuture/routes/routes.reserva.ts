
import Express from "express";
import { reservaController } from "../../application/reserva.Controller";


export const RoutesReserva = () => {

    const router = Express.Router();
    const reservaCtrol = new reservaController();


    router.post("/reserva", (req, res) => {
        
        const payload = req.body;

        reservaCtrol.agregar(payload).then((result) => {
          res.send(result);
        })
          .catch((error) => {
            res.status(500).send(error);
          });
    });

 return router;
}