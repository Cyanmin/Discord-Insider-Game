module.exports = {
	name: 'join',
	description: 'ゲームに参加',
	execute(interaction, gameData) {
		const userId = interaction.user.id;

		if (gameData.players.includes(userId)) {
			return interaction.reply('既に参加しています！');
		}

		gameData.players.push(userId);
		interaction.reply(`${interaction.user.username} がゲームに参加しました！`);

		// 更新されたデータを保存
		const saveGameData = require('../utils/saveGameData');
		saveGameData(gameData);
	},
};
