const Discord = require("discord.js")
const moment = require('moment');

/*Configuration files*/
const botconfig = require("../../botconfig.json");

/*Data files*/
const colors = require("../../data/colors.json");
const roles = require("../../data/roles.json");

module.exports.run = async (bot, message, args) => 
{

    // If the member who ran the command is not a moderator the code gets canceled
    if(!message.member.roles.find(r => r.id === roles.moderator))
    { 
        return;
    }

    var user;
    var embed = new Discord.RichEmbed()
        .setColor(colors.green)
        .setTitle(`User info`)
        .setFooter(`Mr. Meeseeks will now stop existing... **POOF**`);

    
    if (!args[0])
    {
        // If no user is given information will be given about the user who ran the command
        user = bot.users.get(message.member.id);
    }
    else {
        // If a user is given it will use that
        user = bot.users.find('username', args[0]);
        if (!user)
        {
            user = message.mentions.users.first();
        }
    }

    if (!user)
    {
        embed.setColor(colors.red)
            .setDescription(`User named "${args[0]}" was not found.`)
        message.channel.send(embed);
    }
    else
    {
        var guser = message.guild.members.get(user.id);

        embed.setDescription(`Here is some information I found about ${guser}:`)
            .addField("User id", `${user.id}`)
            .addField('Joined server at:', `${moment.utc(guser.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
            .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
            .addField('Status:', user.presence.status)
            .addField('Roles:', guser.roles ? guser.roles.map(r => `${r}`).join(' | ') : "")
        message.channel.send(embed);
    }

}

module.exports.config = 
{
    name: "userinfo",
    aliases: [],
    usage: "-usage",
    description: "Get information about a specific user",
    accessableby: "Members"
}
