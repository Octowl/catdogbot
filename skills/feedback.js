const buildQuickReplies = n => ({
  content_type: "text",
  title: n + 1,
  payload: n + 1
});

module.exports = function(controller) {
  controller.hears(
    ["feedback"],
    "message_received, facebook_postback",
    function(bot, message) {
      bot.startConversation(message, function(err, convo) {
        convo.addQuestion(
          { text: "What can we do to improve?" },
          function(response, convo) {
            convo.next();
          },
          { key: "comment" },
          "negative"
        );

        convo.addQuestion(
          { text: "What did you like about catdog bot?" },
          function(response, convo) {
            convo.next();
          },
          { key: "comment" },
          "positive"
        );

        convo.addQuestion(
          {
            text: "How would you rate catdog bot on a scale of 1-5?",
            quick_replies: [...Array(5).keys()].map(buildQuickReplies)
          },
          function(response, convo) {
            if (response.text > 2) convo.gotoThread("positive");
            else convo.gotoThread("negative");
          },
          { key: "rating" },
          "default"
        );

        convo.on("end", function(convo) {
          if (convo.successful()) {
            const { rating, comment } = convo.extractResponses();

            let reply = `Thank you for your feedback!\nYou gave catdog a rating of ${rating} stars.\n`;

            if (comment) reply += `With the following comment:\n\n"${comment}"`;

            bot.replyWithTyping(message, reply);
          }
        });
      });
    }
  );
};
