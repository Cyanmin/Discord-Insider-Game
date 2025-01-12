module.exports = {
	name: 'role',
	description: '役職の設定',
	execute(interaction, gameData) {
		const saveGameData = require('../utils/saveGameData');

		playerCount = gameData.players.length;
		if (playerCount < 4) {
			return interaction.reply('プレイヤーが4人以上いないとゲームを開始できません！');
		}

		const roles = ['マスター', 'インサイダー', '庶民']
		const roleCount = [1, 1, playerCount - 2]
		const roleList = [];
		for (let i = 0; i < roles.length; i++) {
			for (let j = 0; j < roleCount[i]; j++) {
				roleList.push(roles[i]);
			}
		}
		roleList.sort(() => Math.random() - 0.5)

		const roleMap = new Map();
		for (let i = 0; i < playerCount; i++) {
			roleMap.set(gameData.players[i], roleList[i])
		}

		gameData.roles = Object.fromEntries(roleMap);
		
		Object.entries(gameData.roles).forEach(([userId, role]) => {
			const user = interaction.guild.members.cache.get(userId);
			if (user) {
				user.send(`あなたは「${role}」です！`);
			}
		});

		interaction.reply('役職を設定しました！');

		saveGameData(gameData);
	}
}