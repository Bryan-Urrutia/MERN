import passport from "passport";
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import User from '../Models/userModel.js';
import { config } from 'dotenv';
config();

passport.use("microsoft",
    new MicrosoftStrategy({
        // Standard OAuth2 options
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL: "/microsoft/callback",
        scope: ['user.read', 'mail.read',],

        authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    },
        async function (accessToken, refreshToken, profile, done) {
            const user = await User.findOne({
                $or: [
                    { microsoft_id: profile.id },
                    { email: profile.emails[0].value }
                ]
            });
            if (user) {
                if (!user.microsoft_id) {
                    user.microsoft_id = profile.id
                    await user.save()
                }
                done(null, user);
            } else {
                const newUser = new User({
                    microsoft_id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                })
                await newUser.save()
                done(null, newUser);
            }
        }
    ));