const { pjSchema, userSchema, pityAt, exchangeRate } = require('../config');

const getBanner = async (minStars, maxStars, notInAnimes) => {
    try {
        const waifus = await pjSchema.find({
            'stars': { $gte: minStars, $lte: maxStars },
            'anime': { $nin: notInAnimes }
        }, { projection: { '__v': 0 } }).sort({ 'stars': 1, 'anime': 1 });
        return waifus;
    } catch (error) {
        throw new Error(`Failed to get banner: ${error.message}`);
    }
};

const calculateWeights = (array, pity, weightConfig) => {
    try {
        return array.map(item => (Number(pity ?? 0) >= pityAt) ? weightConfig[`star${item.stars}`].high : weightConfig[`star${item.stars}`].low);
    } catch (error) {
        throw new Error(`Failed to calculate weights: ${error.message}`);
    }
};

const generateDistribution = (array, weights, size) => {
    try {
        const sum = weights.reduce((a, b) => a + b);
        const quant = size / sum;
        const distribution = [];
        array.forEach((_, i) => {
            const limit = quant * weights[i];
            Array.from({ length: limit }, () => distribution.push(i));
        });
        return distribution;
    } catch (error) {
        throw new Error(`Failed to generate distribution: ${error.message}`);
    }
};

const getRandomIndex = distribution => {
    try {
        return distribution[Math.floor(distribution.length * Math.random())];
    } catch (error) {
        throw new Error(`Failed to get random index: ${error.message}`);
    }
};

const getUser = async (email, nRoll) => {
    try {
        const user = await userSchema.findOneAndUpdate({ email: email }, { $inc: { roll: -nRoll } });
        return user;
    } catch (error) {
        throw new Error(`Failed to get user: ${error.message}`);
    }
};

const pityHandler = async (email, nRolls, rollsAfterShiny, isShiny) => {
    try {
        const updateData = isShiny ? { $set: { pityCounter: rollsAfterShiny } } : { $inc: { pityCounter: nRolls } };
        await userSchema.findOneAndUpdate({ email: email }, updateData);
    } catch (error) {
        throw new Error(`Failed to handle pity: ${error.message}`);
    }
};

const rollBanner = async (email, weightConfig, bannerConfig, nRolls) => {
    try {
        nRolls = nRolls ?? 1;
        const rolls = [];
        const user = await getUser(email, nRolls);
        const pityCounter = user.pityCounter;
        const waifuList = await getBanner(bannerConfig.minStars, bannerConfig.maxStars, bannerConfig.notInAnimes);

        let weights = calculateWeights(waifuList, pityCounter, weightConfig);
        let distribution = generateDistribution(waifuList, weights, waifuList.length);

        const rollsForPity = pityAt - pityCounter;

        let isShiny = false;
        let rollsAfterShiny = 0;

        for (let i = 0; i < nRolls; i++) {
            let index = 0;
            if (rollsForPity === i) {
                const pityWeights = calculateWeights(waifuList, pityAt, weightConfig);
                const pityDistribution = generateDistribution(waifuList, pityWeights, waifuList.length);
                index = getRandomIndex(pityDistribution);
            } else {
                index = getRandomIndex(distribution);
            }

            if (waifuList[index].stars >= 5) {
                isShiny = true;
                rollsAfterShiny = 0;
            } else if (isShiny) {
                rollsAfterShiny++;
            }
            rolls.push(waifuList[index]);
        }

        await pityHandler(email, nRolls, rollsAfterShiny, isShiny);

        return rolls;
    } catch (error) {
        console.error(`Failed to roll banner: ${error.message}`);
    }
};

const getCharacterById = async (id) => {
    try {
        const character = await pjSchema.findById(id, { projection: { '__v': 0 } });
        return character;
    } catch (error) {
        throw new Error(`Failed to get character by id: ${error.message}`);
    }
};

const saveCharacter = async (email, id) => {
    const character = await getCharacterById(id);
    try {
        await userSchema.findOneAndUpdate({ email: email }, { $push: { characters: character } });
    }
    catch (error) {
        throw new Error(`Failed to save character: ${error.message}`);
    }
}

const getUserCharacters = async (email) => {
    try {
        const user = await userSchema.findOne({ email: email });
        return user.characters;
    }
    catch (error) {
        throw new Error(`Failed to get user characters: ${error.message}`);
    }
}

const characterExchange = async (stars) => {
    try {
        const exchange = exchangeRate[`star${stars}`];
        return exchange;
    } catch (error) {
        throw new Error(`Failed to exchange character: ${error.message}`);
    }
}

const sellCharacter = async (email, id) => {
    try {
        const user = await userSchema.findOne({ email: email });
        const character = user.characters.find(c => c._id == id);
        if (!character) {
            throw new Error('Character not found');
        }
        const exchange = await characterExchange(character.stars);
        await userSchema.findOneAndUpdate({ email: email }, { $pull: { characters: { _id: id } }, $inc: { roll: exchange } });
    }
    catch (error) {
        throw new Error(`Failed to sell character: ${error.message}`);
    }
}

const setFavoriteCharacter = async (email, id) => {
    try {
        const character = await getCharacterById(id);
        if (!character) {
            throw new Error('Character not found');
        }
        await userSchema.findOneAndUpdate({ email: email }, { $set: { favoriteCharacter: character } })
    }
    catch (error) {
        throw new Error(`Failed to set favorite character: ${error.message}`);
    }
}
        

module.exports = {
    getBanner,
    rollBanner,
    saveCharacter,
    getUserCharacters,
    sellCharacter
};
