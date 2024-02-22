import { Router } from 'express';
import passport from "passport";
import createtoken from '../utils/createToken.js';
import { config } from 'dotenv';

const router = Router();
config();

router.get("/callback",
    passport.authenticate("google",
        { scope: ['profile', 'email'], session: false }),
    ((req, res) => {
        if (req.user) {
            res.cookie('token', createtoken(req.user.email, req.user._id))
            return res.redirect(process.env.CLIENT_URL);
        }
    })
);

export default router;