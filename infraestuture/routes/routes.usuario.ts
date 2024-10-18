import Express from "express";
import { usuarioController } from "../../application/usuario.Controller";

// import { ProductoController } from "";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta

export const RoutesUsuario = () => {

  const router = Express.Router();
  const usuarioCtrl = new usuarioController();

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


  router.post("/usuario", (req, res) => {
    const payload = req.body;
    usuarioCtrl.agregar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(505).send(error);
      });

  });

  router.put("/usuario", (req, res) => {
    const payload = req.body;
    usuarioCtrl.actualizar(payload).then((result) => {
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    })
      .catch((error) => {
        res.status(500).send(error);
      });
  });


  router.get("/usuario/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result = await usuarioCtrl.obtenerPorId(id);
      if (result !== null) {
        res.send({ ok: true, info: result });
      } else {
        res.status(404).send({ ok: false, message: "No se encontro el usuario" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete("/usuario/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result = await usuarioCtrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;

};