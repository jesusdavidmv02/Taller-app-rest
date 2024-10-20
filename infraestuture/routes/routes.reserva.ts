import Express from "express";
import { reservaController } from "../../application/reserva.Controller";

export const RoutesReserva = () => {

  const router = Express.Router();
  const reservaCtrol = new reservaController();

  router.get("/reserva", (req, res) => {
    reservaCtrol.obtener().then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.send({
          message: "Ha ocurrido un error la reserva",
        });
      });
  });

  router.post("/reserva", (req, res) => {
    const payload = req.body;
    reservaCtrol.agregar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.put("/reserva", (req, res) => {
    const payload = req.body;
    console.log(payload);
    reservaCtrol.actualizar(payload).then((result) => {
      const status = result === true ? 200 : 400;
      res.status(status).send(result);
    })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.get("/reserva/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el ID enviado. Debe ser un número válido." });
        return
      }
      const result = await reservaCtrol.obtenerPorId(id);
      if (result) {
        res.send({ ok: true, info: result });
      } else {
        res.status(404).send({ ok: false,  info: result });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).send(error);
    }
  });


  router.delete("/reserva/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result = await reservaCtrol.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
}