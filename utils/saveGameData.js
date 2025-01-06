const fs = require('fs');
const path = require('path');

const gameDataPath = path.join(__dirname, '../data/gameData.json');

module.exports = function saveGameData(gameData) {
	fs.writeFileSync(gameDataPath, JSON.stringify(gameData, null, 2), 'utf8');
};
