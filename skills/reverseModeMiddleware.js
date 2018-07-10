module.exports = function(controller) {
  controller.middleware.receive.use(function(bot, message, next) {
    controller.storage.users.get(message.user, function(err, user) {
      if (!user) {
        return next();
      }

      if (user.reverseMode && message.text) {
        bot.replyWithTyping(
          message,
          message.text
            .split("")
            .reverse()
            .join("")
        );
      }
    });

    next();
  });
};
