
const Discord = require('discord.js');
const fs = require("fs");
const request = require('request');

const token = process.env.token
const prefix = process.env.prefix

const bot = new Discord.Client();
const map = new Map();
bot.commands = new Discord.Collection();

let index = 0;

bot.on('ready', function() {
  bot.setInterval(() => {
      const statuslist = [
        `wc/help | 任何問題請WeiKu#3402 ♪`,
        `機器人製作 | 微苦 ♪`,
        `歡迎使用WynnCraft中文資訊站 ♪`
      ]
      bot.user.setActivity(statuslist[index], { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"});
      index++
      if (index === statuslist.length) index = 0;
  }, 3000)

}); 
 
fs.readdir("./commands/", (err,files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("找不到任何指令");
    return;
  }   

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} 載入成功!`)
    bot.commands.set(props.help.name, props);
  })
})

bot.on("message", async message => {

  //command handler
	if (message.author.bot || message.channel.type === 'dm') return;
	if (message.content.toLowerCase().indexOf(prefix) !== 0) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	try{
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args);
	}catch(err){
		message.reply(`未知指令! 請輸入 **${prefix}help** 查看指令列表`)
  }
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

})


bot.on("guildCreate", guild => {
  console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
});

bot.on("guildDelete", guild => {
  console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
});

bot.on("ready", () => {
  console.log(`${bot.user.username}成功啟動了!^w^, [ ${bot.guilds.size} | ${bot.channels.size} | ${bot.users.size} ]`);
  bot.user.setActivity(`我正在 ${bot.guilds.size} 個群組潛水`,'https://www.twitch.tv/weikuouo');
});


bot.login(token);
