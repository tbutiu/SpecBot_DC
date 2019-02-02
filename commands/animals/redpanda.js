const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
const https = require(`https`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class RedPandaCommand extends Command {
  constructor(client) {
    super(client, {
      name: `redpanda`,
      /*  aliases: [],*/
      group: `animals`,
      memberName: `redpanda`,
      description: `Sends a random image of a red panda.`,
      examples: [`redpanda`]
    });
  }
  run(msg) {
    let requestURL = `https://some-random-api.ml/redpandaimg`;
    https
      .get(requestURL, function onDone(response) {
        let data = ``;
        response.on(`data`, chunk => {
          data += chunk;
        });
        response.on(`end`, () => {
          let embed = new RichEmbed()
            .setImage(JSON.parse(data).link)
            .setFooter(`Images are fetched from https://some-random-api.ml`)
            .setColor(randomHexColor());
          msg.say(embed);
        });
      })
      .on(`error`, err => {
        msg.say(`An error has occured. (${err.message})`);
      });

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};