import passport from "passport";
import { Router } from 'express';
import { hashSync, compareSync } from 'bcrypt';
import validator from "validator";
import userModel from "../Models/userModel.js";
import createtoken from "../utils/createToken.js";

const router = Router();

router.post("/register",
    async (req, res) => {
        const { name, email, password } = req.body;

        let user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).json("Usuario con correo existente.")
        }

        if (!name || !email || !password)
            return res.status(400).json("Todos los campos son requeridos.")

        if (!validator.isEmail(email))
            return res.status(400).json("El correo no es valido.")

        if (!validator.isStrongPassword(password))
            return res.status(400).json("La contraseña es debil.")

        user = new userModel({ name, email, password })
        user.password = hashSync(user.password, 10);

        user.save().then((user) => {
            res.status(200).send({
                success: true,
                message: "Usuario creado",
                token: createtoken(user.email, user._id),
            })
        }).catch((error) => {
            res.status(400).send({
                success: false,
                message: "Algo a salido mal",
                error: error
            })
        })
    }
)

router.post("/login",
    async (req, res) => {
        if (!req.body.email || !req.body.password)
            return res.status(400).json("Todos los campos son requeridos.")

        if (!validator.isEmail(req.body.email))
            return res.status(400).json("El correo no es valido.")

        userModel.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: "No se encontro el usuario"
                })
            }

            if (!compareSync(req.body.password, user.password)) {
                return res.status(401).send({
                    success: false,
                    message: "Contraseña incorrecta"
                })
            }

            return res.status(200).send({
                success: true,
                message: "Ingreso exitoso",
                token: createtoken(user.email, user._id)
            })
        })
    })

router.get("/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        return res.status(200).send({
            success: true,
            message: "loggeado",
            user: req.user
        })
    })

export default router;