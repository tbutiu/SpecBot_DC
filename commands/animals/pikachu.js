const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/imageFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class PikachuCommand extends Command {
  constructor (client) {
    super(client, {
      name: `pikachu`,
      aliases: [`chu`, `pika`, `owo`],
      group: `animals`,
      memberName: `pikachu`,
      description: `Sends a random image of Pikachu.`,
      examples: [`pikachu`]
    })
  }
  run (msg) {
    sendImg(msg, `https://some-random-api.ml/pikachuimg`, `Images are fetched from https://some-random-api.ml`, `link`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
