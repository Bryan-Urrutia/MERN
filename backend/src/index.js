import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from 'mongoose'
import passport from "passport";
import "./Passport/JWT.js";
import "./Passport/Google.js";
import "./Passport/Microsoft.js";
import routes from './routes.js';
import { config } from 'dotenv';
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize())
app.use(routes)

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;

app.listen(port, () => {
    console.log("Servidor iniciado en el puerto", port);
    mongoose
        .connect(uri)
        .then(() => console.log("MongoDB connectado"))
        .catch((error) => console.log("MongoDB conexión fallidad", error.message))
})