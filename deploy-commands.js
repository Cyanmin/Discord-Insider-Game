const { REST, Routes } = require('discord.js');
require('dotenv').config({ path: './config/.env' });

const commands = [
    {
        name: 'join',
        description: 'ゲームに参加',
    },
    {
        name: 'exit',
        description: 'ゲームから退出',
    },
    {
        name: 'role',
        description: '役職の設定',
    },
    {
        name: 'sendtheme',
        description: 'テーマを送信',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('コマンドを登録中...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, '909989164622176297'),
            { body: commands },
        );
        console.log('コマンド登録完了!');
    } catch (error) {
        console.error(error);
    }
})();
