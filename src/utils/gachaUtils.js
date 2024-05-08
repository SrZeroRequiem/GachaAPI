var {pjSchema} = require('../config');

const getBanner = async (minStars,maxStars, animes) => {
    const waifus = await pjSchema.find({
        'stars' : {$gte: minStars, $lte: maxStars},
        'anime' : {$nin: animes}
    },{sort: {'stars':1, 'anime':1}},{projection: {'_id':1, '__v':0}} );
    return waifus;
}
// Módulo para calcular los pesos
const calculateWeights = (array, piti, weightConfig) =>
    array.map(item => (Number(piti || 0) >= 50) ? weightConfig[item.stars].high : weightConfig[item.stars].low);

// Módulo para generar la distribución
const generateDistribution = (array, weights, size) => {
    const sum = weights.reduce((a, b) => a + b);
    const quant = size / sum;
    const distribution = [];
    array.forEach((_, i) => {
        const limit = quant * weights[i];
        Array.from({ length: limit }, () => distribution.push(i));
    });
    return distribution;
}

// Módulo para seleccionar un índice aleatorio
const getRandomIndex = distribution => distribution[Math.floor(distribution.length * Math.random())];

// Función principal
const getIndex = async (user, weightConfig, bannerConfig) => {
    // const piti = await require("../../Utility/getPiti").getPiti(user);
    const waifuList = await getBanner(bannerConfig.minStars, bannerConfig.maxStars, bannerConfig.anime);
    const weights = calculateWeights(waifuList, piti, weightConfig);
    const distribution = generateDistribution(waifuList, weights, 1000000);
    return getRandomIndex(distribution);
}

module.exports = {
    getBanner: getBanner,
    getIndex: getIndex
}