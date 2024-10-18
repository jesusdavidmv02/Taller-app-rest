import Express from "express";
import middleware404 from "./infraestuture/middleware/middleware";
import { routes } from "./infraestuture/routes/routes.index";

const createServer = () => {
  const app = Express(); 
  app.use(Express.json());

  app.get("/api", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });

  app.use("/api/v1", routes());
  app.use(middleware404);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
  });
};

createServer();
