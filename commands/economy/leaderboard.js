const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../configs/options`)
const SQLite = require(`better-sqlite3`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class LeaderboardCommand extends Command {
  constructor (client) {
    super(client, {
      name: `leaderboard`,
      aliases: [`lb`, `leaders`, `top10`, `top`],
      group: `economy`,
      memberName: `leaderboard`,
      description: `Shows the top 10 users (points-wise).`,
      guildOnly: true,
      examples: [`leaderboard`]
    })
  }
  run (msg) {
    try {
      const sql = new SQLite(`${__dirname}/../../DBs/scores.sqlite3`)
      const top10 = sql.prepare('SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;').all(msg.guild.id)

      const embed = new RichEmbed()
        .setTitle('Leaderboard')
        .setAuthor(this.client.user.username, this.client.user.avatarURL)
        .setDescription(`Our top 10 points leaders!`)
        .setColor(randomHexColor())

      for (const data of top10) {
        embed.addField(this.client.users.get(data.user).tag, `${data.points} points (level ${data.level})`)
      }
      msg.say({ embed })
    } catch (e) {
      msg.reply(
        `An error has occured (The database is most likely not ready yet). Try waiting for a moment before retrying. Error: (${
          e
        })`
      )
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
