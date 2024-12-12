import { pool } from "../../db/dbConnection.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

async function contactoPorId(id) {
    let sql = "SELECT * FROM DirectorioTelefonico.Contactos WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
}

export const ObtenerContactos = tryCatchWrapper(async function (req, res, next) {
    let sql = "SELECT * from DirectorioTelefonico.Contactos";
    const [rows] = await pool.query(sql);
    if (!rows.length) return res.status(204).json({ message: "empty list" });

    return res.status(200).json(rows);
});

export const CrearContacto = tryCatchWrapper(async function (req, res, next) {
    const { nombre, telefono, correo } = req.body;

    let sql = "INSERT INTO DirectorioTelefonico.Contactos (nombre, telefono, correo) VALUES (?, ?, ?)";
    await pool.query(sql, [nombre, telefono, correo]);

    return res.status(201).json({ message: "Contacto creado" });
});

export const ActualizarContacto = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;
    const { nombre, telefono, correo } = req.body;

    const contacto = await contactoPorId(id);
    if (!contacto) return next(createCustomError("contacto no encontrado", 404));

    let sql = "UPDATE DirectorioTelefonico.Contactos SET nombre = ? , telefono = ? , correo = ? WHERE id = ?";
    await pool.query(sql, [nombre, telefono, correo, id]);

    return res.status(201).json({ message: "Contacto actualizado" });
});

export const EliminarContacto = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;

    const contacto = await contactoPorId(id);
    if (!contacto) return next(createCustomError("contacto no encontrado", 404));

    let sql = "DELETE FROM DirectorioTelefonico.Contactos WHERE id = ?";
    await pool.query(sql, [id]);

    return res.status(200).json({ message: "Contacto eliminado" });
});
