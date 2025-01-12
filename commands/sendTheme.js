require('dotenv').config();
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../config/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const saveGameData = require('../utils/saveGameData');


module.exports = {
	name: 'sendtheme',
	description: 'テーマを送信',
	execute(interaction, gameData) {

		const theme = config.topics[Math.floor(Math.random() * config.topics.length)];
		gameData.theme = theme;

		Object.entries(gameData.roles).forEach(([userId, role]) => {
			if (role === '庶民') {
				return;
			}
			const user = interaction.guild.members.cache.get(userId);
			if (user) {
				user.send(`今回のテーマは「${theme}」です！`);
			}
		});

		interaction.reply('テーマを送信しました！');

		saveGameData(gameData);
	},
};
