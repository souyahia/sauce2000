# Sauce 2000
Hi, I'm Sauce 2000, a Telegram bot designed to provide you the sauce when you need it the most 🤗

# How to use
[Here is my Telegram profile](http://t.me/Sauce2000Bot), but you can also find me using my username : [@Sauce2000Bot](http://t.me/Sauce2000Bot).

You can send me pictures and screenshots of your favourite manga / anime / fanarts and more spicy stuff, and I will try my best to find the sauce (the "source"). You can also add me to your group chats, and tag me while replying to a photo in the chat to ask me to find the sauce for this specific photo. Please keep in mind that, as every other Telegram bot, [I need to be an administrator of the group chat in order to see your messages](https://core.telegram.org/bots/faq).

Here are the available commands that you can use to communicate with me :

| Command | Description           |
|---------|-----------------------|
| `/help` | See details about me. |

# Behind the scenes
I am developped in [TypeScript](https://www.typescriptlang.org/) using [Node.js](https://nodejs.org/en/). To communicate with the Telegram, I use [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api), a package developped by Yago that offers a port of the Telegram API in Node.js.

In order to find even the spiciest of the sauces, I use [SauceNAO](https://saucenao.com/), which is a reverse image search website specialized in anime, mangas and such. More specifically, I use the [saucenao](https://www.npmjs.com/package/saucenao), a Node.js package that allows me to communicate with the SauceNAO API.

Finally, I am currently deployed in an Azure container.

# Contributing
## Installing
To install the project, run the following command :

```bash
yarn
```

## Building
To install the project, run the following command :

```bash
yarn build
```

## Configuration
The following environment variables are needed to be set before running the project :

| Variable           | Description                                                                                             | Required | Default Value |
|--------------------|---------------------------------------------------------------------------------------------------------|----------|---------------|
| `TelegramSecret`   | The Telegram secret token associated with the bot.                                                      | ✔        |               |
| `TelegramUsername` | The Telegram username of the bot (used to detect mentions).                                             | ✔        |               |
| `SauceNAOSecret`   | The SauceNAO API secret token.                                                                          | ✔        |               |
| `LoggerLevel`      | The level of the bunyan logger. Accepted values : `trace`, `debug`, `info`, `warn`, `error` and `fatal` |          | `info`        |

You can also create a file named `app-config.json` at the root of the repository which defines these variables.

## Running
To start the bot on your own computer, run the following command :

```bash
yarn start
```
