import { CustomError } from "../errors/customErrors.js";

export const handleError = (error, req, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res
        .status(500)
        .json({ message: "Algo salio mal, intenta de nuevo!" });
};
