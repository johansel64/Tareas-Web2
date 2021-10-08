import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import router from "./routes";
const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {

    // create express app
    const app = express();

    //middleware

    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //rutas
    app.use('/', router)


    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

}).catch(error => console.log(error));
