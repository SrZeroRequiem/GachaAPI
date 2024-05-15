var express = require('express');
var router = express.Router();
const {userSchema, bannerConfig, weightConfig} = require('../config')
const {jwtGenerator, verifyToken} = require('../utils/jwt')
const {getBanner, rollBanner, saveCharacter, sellCharacter, getUserCharacters} = require('../utils/gachaUtils')


/* GET users listing. */
router.get('/get-all-characters',verifyToken, function(req, res, next) {
    getBanner(bannerConfig.minStars, bannerConfig.maxStars,bannerConfig.notInAnimes).then((waifus) => {
        res.json(waifus);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
});

router.get('/roll', verifyToken ,function(req, res, next) {
    const email = req.user;
    if (!email) {
        return res.status(400).json({message: 'User not found'});
    }
    rollBanner(email,weightConfig, bannerConfig).then((waifu) => {
        res.json(waifu);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
}
);

router.post('/save-character', verifyToken, function(req, res, next) {
    const email = req.user;
    const id = req.body.id;
    if (!email) {
        return res.status(400).json({message: 'User not found'});
    }
    saveCharacter(email, id).then(() => {
        res.json({message: 'Character saved'});
    }).catch((err) => {
        res.status(400).json({message: err});
    });
}
);

router.delete('/sell-character', verifyToken, function(req, res, next) {
    const email = req.user;
    const id = req.body.id;
    if (!email) {
        return res.status(400).json({message: 'User not found'});
    }
    sellCharacter(email, id).then(() => {
        res.json({message: 'Character sold'});
    }).catch((err) => {
        res.status(400).json({message: err});
    });
}
);

router.get('/get-user-characters', verifyToken, function(req, res, next) {
    const email = req.user;
    if (!email) {
        return res.status(400).json({message: 'User not found'});
    }
    getUserCharacters(email).then((characters) => {
        res.json(characters);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
}
);




module.exports = router;
