import express     from "express";
import cors        from "cors";
import routesToUse from "./app/routes/index.js";
import morgan      from "morgan";
import path        from "node:path";
import fs          from "node:fs"
import https       from "node:https"
import cookieParser from "cookie-parser";
//creando servidor
const app = express();

const PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.use(`/${process.env.ROUTE_VERSION}/`, routesToUse);

// Evitar la filtración de información del servidor
app.disable("x-powered-by");

//creando un servidor https para crear una encriptacion de punto a punto
const options = 
{
    key: fs.readFileSync('./certification/key.pem'),
    cert: fs.readFileSync('./certification/csr.pem'),
}

//servidor encriptado con la biblioteca https
const sslServer = https.createServer(options,app)


// Iniciar el servidor
sslServer.listen(PORT, function() {
    console.log(`Escuchando en el puerto ${this.address().port}`);
});