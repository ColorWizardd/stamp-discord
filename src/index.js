import * as appInsights from 'applicationinsights';
import { app } from '@azure/functions';
import { SlashCreator, AzureFunctionV4Server } from 'slash-create';
import { join } from 'node:path';

app.setup({
    enableHttpStream: true
});

process.loadEnvFile("./.env")
appInsights.setup(process.env.APPINSIGHTS_CONNECTION_STRING);


const creator = new SlashCreator({
    applicationID : process.env.APPLICATION_ID,
    publicKey : process.env.PUBLIC_KEY,
    token: process.env.BOT_TOKEN
});
creator.withServer(new AzureFunctionV4Server(app));
await creator.registerCommandsIn(join(import.meta.dirname, "commands"));
await creator.syncCommands();