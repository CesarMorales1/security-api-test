import express from "express";
import cors from "cors"
import routesToUse from "./app/routes/index.js";

const app = express();

const {PORT = 0} = process.env;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(`/${process.env.ROUTE_VERSION}/`,routesToUse);

//evitando la filtracion de informacion del servidor
app.disable("x-powered-by");


app.listen(PORT, function() 
{
    //Buscando un puerto libre
    console.log(`Escuchando en el puerto ${this.address().port}`);
})