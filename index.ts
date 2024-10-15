import express, { Express } from "express";  

const crearServer = () => {
    const app = express();  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("Servidor corriendo en el puerto: " + PORT);
    });

    app.get('/index', (req, res) => {
        res.send('00000 bien ');
    });
};

crearServer();
