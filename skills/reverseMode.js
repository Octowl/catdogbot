module.exports = function(controller) {
  controller.hears("^reverse mode$", "message_received", function(
    bot,
    message
  ) {
    controller.storage.users.get(message.user, function(err, user) {
      if (!user) {
        user = {};
        user.id = message.user;
      }

      user.reverseMode = true;

      controller.storage.users.save(user, function(err, saved) {
        if (err) {
          bot.reply(
            message,
            "I experienced an error switching to reverse mode: " + err
          );
        } else {
          bot.reply(message, "!!!DETAVITCA EDOM ESREVER");
        }
      });
    });
  });

  controller.hears("^exit reverse mode$", "message_received", function(
    bot,
    message
  ) {
    controller.storage.users.get(message.user, function(err, user) {
      if (!user) {
        user = {};
        user.id = message.user;
      }

      user.reverseMode = false;

      controller.storage.users.save(user, function(err, saved) {
        if (err) {
          bot.reply(
            message,
            "I experienced an error switching out of reverse mode: " + err
          );
        } else {
          bot.reply(message, "Back to normal mode");
        }
      });
    });
  });
};
