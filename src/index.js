const { app } = require('@azure/functions');
const { SlashCreator, AzureFunctionV4Server } = require('slash-create');
const env = process.env;

const creator = new SlashCreator({
    applicationID : env.APPLICATION_ID,
    publicKey : env.PUBLIC_KEY,
    token: env.BOT_TOKEN
});
creator.withServer(new AzureFunctionV4Server(app));
await creator.registerCommandsIn(__dirname, "commands");
await creator.syncCommands();
