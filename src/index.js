import { app } from '@azure/functions';
import { SlashCreator, AzureFunctionV4Server } from 'slash-create';
import path from 'path';

const creator = new SlashCreator({
    applicationID : process.env.APPLICATION_ID,
    publicKey : process.env.PUBLIC_KEY,
    token: process.env.BOT_TOKEN
});
creator.withServer(new AzureFunctionV4Server(app));
await creator.registerCommandsIn(path.join(__dirname, "commands"));
await creator.syncCommands();
