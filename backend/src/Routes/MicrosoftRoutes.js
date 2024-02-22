import passport from "passport";
import createtoken from '../utils/createToken.js';
import { Router } from 'express';
import { config } from 'dotenv';
config();

const router = Router();

router.get("/callback",
    passport.authenticate("microsoft",
        { session: false }),
    (req, res) => {
        if (req.user) {
            res.cookie('token', createtoken(req.user.email, req.user._id))
            return res.redirect(process.env.CLIENT_URL);
        }
    }
);

export default router;