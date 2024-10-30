import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";

const configurePassport = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          // Gantilah findById dengan findOne dan cari berdasarkan us_id
          const user = await User.findOne({ us_id: jwtPayload.id }); // Pastikan jwtPayload.id sesuai dengan us_id
          if (!user) return done(null, false); // Jika pengguna tidak ditemukan
          return done(null, user); // Jika pengguna ditemukan
        } catch (err) {
          return done(err); // Tangani error
        }
      }
    )
  );
};

export default configurePassport;