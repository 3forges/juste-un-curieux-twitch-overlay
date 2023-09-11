# Basic Configutaror & template selection for OBS overlay
Astro Fork for https://github.com/BenDMyers/showmy.chat

* removed eleventy for astro
* same bevahiors & functionalities
* URL for overlay
  * [your server]/?template=default
* URL for configuration 
  * [your server]/config

## Install
```bash
git clone ...
npm i
```

## Config 

* /src/pages/index.astro & /src/pages/config.Astro
  * const twitchChannel = "your channel"

* /public/config.js
  * "clearMessageAfter":"",
  * "DEMO":false,
  * "disableAnimatedEmotes":false,
  * "hideMessagesFrom":"",
  * "showCommands":false,
  * "showLatestMessages":30,
  * "theme":"cards"
  
* /public/themes
  * drop your css here

  
