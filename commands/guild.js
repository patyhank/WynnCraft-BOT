const Discord = require("discord.js")
var request = require('request');

module.exports.run = async (bot, message, args) => {

        const guildName = args.join(" ");
        const urlMain = "https://api.wynncraft.com/public_api.php?action=guildStats&command=" + (guildName);
            request(urlMain, function(err, response, guild) {
                if(err) {
                    console.log(err);
                    return message.channel.send('在查詢時出了點問題:P');
                }
                guild = JSON.parse(guild);
                if(guild.error){
                    message.channel.send("你輸入了錯誤的工會名稱,可能是大小寫錯誤了")
                }else{
                    let guildInfo = new Discord.RichEmbed()
                        .setColor(0x34AB00)
                        .setTitle(`${guild.name} 的資訊`)
                        .addField(":pager:  工會名稱",`\`\`\`css\n${guild.name}\`\`\``,true)
                        .addField(":mega: 公會前綴",`\`\`\`fix\n${guild.prefix}\`\`\``,true)
                        .addField(":evergreen_tree: 公會等級",`\`\`\`diff\n+    Level${guild.level}   +\`\`\``,true)
                        .addField(":earth_asia: 領地數量",`\`\`\`fix\n${guild.territories}\`\`\``,true)
                        .addField(":calendar_spiral: 創建日期",`\`\`\`xl\n${guild.createdFriendly}\`\`\``,true)
                        .addField(":seedling: 經驗值",`\`\`\`diff\n-    ${guild.xp}%    -\`\`\``,true)
                    message.channel.send(guildInfo)
                }
            })
        }
//moment.duration(guild.duration).format(" D [天], H [時], m [分], s [秒]")

module.exports.help = {
  name: 'guild',
};
