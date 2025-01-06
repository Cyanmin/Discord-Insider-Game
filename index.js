require('dotenv').config({ path: './config/.env' });
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// コマンドの読み込み
const fs = require('fs');
const path = require('path');

const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

// ゲームデータの読み込み
const gameDataPath = path.join(__dirname, 'data/gameData.json');
let gameData = JSON.parse(fs.readFileSync(gameDataPath, 'utf8'));

// Discord botのログイン
client.login(process.env.DISCORD_TOKEN);

// ログイン時の処理
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// インタラクションの処理
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = commands.get(interaction.commandName);
	if (!command) return;

	try {
		command.execute(interaction, gameData); // gameDataはゲーム状態を保存するオブジェクト
	} catch (error) {
		console.error(error);
		interaction.reply({ content: 'コマンド実行中にエラーが発生しました。', ephemeral: true });
	}
});
