const axios = require("axios");

const names = {
  cats: [
    "Molly",
    "Charlie",
    "Tigger",
    "Poppy",
    "Oscar",
    "Smudge",
    "Millie",
    "Daisy",
    "Max",
    "Jasper"
  ],
  dogs: [
    "Max",
    "Charlie",
    "Cooper",
    "Buddy",
    "Jack",
    "Rocky",
    "Oliver",
    "Bear",
    "Duke",
    "Tucker"
  ]
};

function extractGifs(response) {
  return response.data.results.map(result => result.media[0].tinygif.url);
}

function makeAttachments(gifs, match) {
  return gifs.map(gif => ({
    title: names[match].getRandom(),
    image_url: gif,
    buttons: [
      {
        type: "postback",
        title: match === "dogs" ? "BARK!" : "MEOW!",
        payload: "noise"
      }
    ]
  }));
}

module.exports = function(controller) {
  controller.hears(
    ["cats", "dogs"],
    "message_received, facebook_postback",
    async function(bot, message) {
      const match = message.match[0];

      const gifs = await axios
        .get(
          `https://api.tenor.com/v1/search?key=QTRNHTFMZDIM&q=${match}&safesearch=strict&limit=5&media_filter=minimal`
        )
        .then(extractGifs);

      const attachment = {
        type: "template",
        payload: {
          template_type: "generic",
          elements: makeAttachments(gifs, match)
        }
      };

      bot.replyWithTyping(message, {
        attachment: attachment
      });
    }
  );

  controller.hears("noise", "facebook_postback", function(bot, message) {
    bot.replyWithTyping(message, "ok");
  });
};

Array.prototype.getRandom = function() {
  return this.splice(Math.floor(Math.random() * this.length), 1)[0];
};
