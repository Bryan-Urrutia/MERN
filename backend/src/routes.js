import { Router } from 'express';
const router = Router();

import JwtRoutes from './Routes/JwtRoutes.js'
router.use("/local", JwtRoutes)

import GoogleRoutes from './Routes/GoogleRoutes.js'
router.use("/google", GoogleRoutes)

import MicrosoftRoutes from './Routes/MicrosoftRoutes.js'
router.use("/microsoft", MicrosoftRoutes)

router.use("/", (req,res) =>{
    res.send({
        status : "Servidor iniciado"
    })
})

export default router;