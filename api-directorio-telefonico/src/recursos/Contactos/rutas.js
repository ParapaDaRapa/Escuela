import express from "express";
import {
    CrearContacto,
    EliminarContacto,
    ObtenerContactos,
    ActualizarContacto,
} from "./controlador.js";

const router = express.Router();

router.route("/").get(ObtenerContactos).post(CrearContacto);
router.route("/:id").put(ActualizarContacto).delete(EliminarContacto);

export default router;
