import express, { Express } from "express";  
import { routes } from "./infraestuture/modules/api rest/routes/routes.index";

const crearServer = () => {
    
    const app = express();  
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("Servidor corriendo en el puerto: " + PORT);
    });

    app.get('/index', (req, res) => {
        res.send('00000 bien ');
    });

    app.use('/api/v1', routes());

};

crearServer();
