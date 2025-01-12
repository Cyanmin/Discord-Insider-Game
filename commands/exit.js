module.exports = {
	name: 'exit',
	description: 'ゲームから退出',
	execute(interaction, gameData) {
		const userId = interaction.user.id;

		if (!gameData.players.includes(userId)) {
			return interaction.reply('参加していません！');
		}

		const index = gameData.players.indexOf(userId);
		gameData.players.splice(index, 1);
		interaction.reply(`${interaction.user.username} がゲームから退出しました！`);

		// 更新されたデータを保存
		const saveGameData = require('../utils/saveGameData');
		saveGameData(gameData);
	}
}