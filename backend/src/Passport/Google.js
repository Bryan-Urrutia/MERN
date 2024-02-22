import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../Models/userModel.js'
import { config } from 'dotenv';
config();

passport.use("google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACKURL,
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({
                $or: [
                    { google_id: profile.id },
                    { email: profile.emails[0].value }
                ]
            });
            if (user) {
                if (!user.google_id) {
                    user.google_id = profile.id
                    await user.save()
                }
                done(null, user);
            }
            else {
                const newUser = new User({
                    google_id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                })
                await newUser.save()
                done(null, newUser);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
