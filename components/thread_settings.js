var debug = require("debug")("botkit:thread_settings");

module.exports = function(controller) {
  debug("Configuring Facebook thread settings...");
  controller.api.thread_settings.greeting("Hello! I'm CatDog Bot!");
  controller.api.thread_settings.get_started("sample_get_started_payload");
  controller.api.thread_settings.menu([
    {
      locale: "default",
      composer_input_disabled: false,
      call_to_actions: [
        {
          type: "postback",
          title: "cats",
          payload: "cats"
        },
        {
          type: "postback",
          title: "dogs",
          payload: "dogs"
        },
        {
          type: "postback",
          title: "feedback",
          payload: "feedback"
        }
      ]
    }
  ]);
};
