const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  userSchema,
} = require("../config");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/discord/auth/redirect",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userSchema.findOne({ email: profile.email });

        if (!user) {
          avatarURL = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;

          const newUser = new userSchema({
            email: profile.email,
            discordId: profile.id,
            username: profile.username,
            avatar: avatarURL,
          });

          await newUser.save()
          .then(() => {
            console.log("User saved");
          });
            return done(null, newUser);

        }else if(!user.discordId){
            const updatedUser = await userSchema.findOneAndUpdate({email: profile.email}, {
                discordId: profile.id,
                username: profile.username,
                avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            });
            return done(null, updatedUser);
        } else return done(null, profile);

      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);
