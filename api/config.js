require("dotenv").config();
const pjSchema = require("./schema/pj");
const userSchema = require("./schema/user")
const pityAt = 50;

const exchangeRate = {
    star0: 5,
    star1: 1,
    star2: 1,
    star3: 2,
    star4: 4,
    star5: 10,
    star6: 20,
    star7: 50,
    star8: 100
};

const weightConfig = {
    star0: { high: 10, low: 11 },
    star1: { high: 0, low: 20.5 },
    star2: { high: 0, low: 0 },
    star3: { high: 0, low: 40 },
    star4: { high: 0, low: 25 },
    star5: { high: 0, low: 2 },
    star6: { high: 50, low: 0.4 },
    star7: { high: 50, low: 0.2 },
    star8: { high: 50, low: 0.2 }
};
const bannerConfig = {
    maxStars: 8,
    minStars: 0,
    notInAnimes: []
    
    
}

module.exports = {
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    userSchema: userSchema,
    pjSchema: pjSchema,
    JWT_SECRET: process.env.JWT_SECRET,
    weightConfig: weightConfig,
    bannerConfig: bannerConfig,
    pityAt: pityAt,
    exchangeRate: exchangeRate
    };