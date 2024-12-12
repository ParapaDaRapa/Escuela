import express from "express";
import dotenv from "dotenv";
import contactosRuta from "./src/recursos/contactos/rutas.js";
import  cors from "cors";

dotenv.config();
function setCorsHeaders(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}
const app = express();
const port = 3000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(setCorsHeaders);

// api routes
app.use("/contactos", contactosRuta);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
