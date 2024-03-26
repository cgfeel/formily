function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    
    // 包含最小值和最大值
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

module.exports = getRandomInt;