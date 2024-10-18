import Express from "express";
import { vehiculoController } from "../../application/vehiculo.Cotroller";

export const RoutesVehiculo = () => {

    const router = Express.Router();
    const vehiculoCtrl = new vehiculoController();


    router.get("/vehiculo", (req, res) => {
        vehiculoCtrl.obtener().then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send({
                message: "Error consutado vehiculo",
            });
        });

    });

    router.post("/vehiculo", (req, res) => {
        const payload = req.body;
        vehiculoCtrl.agregar(payload).then((result) => {
          res.send(result);
        })
          .catch((error) => {
            res.status(500).send(error);
          });
    });

    router.put("/vehiculo", (req, res) => {
        const payload = req.body;
        vehiculoCtrl.actualizar(payload).then((result) => {
          const status = result.ok === true ? 200 : 400;
          res.status(status).send(result);
        })
          .catch((error) => {
            res.status(500).send(error);
          });
      });


      router.get("/vehiculo/:id", async (req, res) => {
        try {
          const idStr = req.params.id;
          const id = parseInt(idStr);
          if (Number.isNaN(id)) {
            res.status(400).send({ ok: false, message: "Error en el id enviado" });
            return;
          }
          const result = await vehiculoCtrl.obtenerPorId(id);
          if (result !== null) {
            res.send({ ok: true, info: result });
          } else {
            res.status(404).send({ ok: false, message: "No se encontro el Vehiculo" });
          }
        } catch (error) {
          res.status(500).send(error);
        }
      });


      router.delete("/vehiculo/:id", async (req, res) => {
        try {
          const idStr = req.params.id;
          const id = parseInt(idStr);
          if (Number.isNaN(id)) {
            res.status(400).send({ ok: false, message: "Error en el id enviado" });
            return;
          }
          const result = await vehiculoCtrl.eliminar(id);
          const status = result.ok === true ? 200 : 400;
          res.status(status).send(result);
        } catch (error) {
          res.status(500).send(error);
        }
      });


    return router;



};
