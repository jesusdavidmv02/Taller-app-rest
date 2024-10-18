import Express from "express";
import { RoutesUsuario } from "./routes.usuario";
import { RoutesVehiculo } from "./routes.vehiculo";
import { RoutesReserva } from "./routes.reserva";

export const routes = () => {
  const router = Express.Router();

  router.get("/", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });

  router.use(RoutesUsuario());
  router.use(RoutesVehiculo());
  router.use(RoutesReserva());

  // TODO: OTRAS RUTAS
  //  router.use(());
  return router;
};
