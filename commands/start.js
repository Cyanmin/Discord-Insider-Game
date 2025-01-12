module.exports = {
	name: 'start',
	description: 'ゲームを開始',
	execute(interaction, gameData) {
		if (gameData.players.length < 4) {
			return interaction.reply('プレイヤーが4人以上いないとゲームを開始できません！');
		}
	},
}