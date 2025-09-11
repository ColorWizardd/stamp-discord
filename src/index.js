import * as appInsights from 'applicationinsights';
import { app } from '@azure/functions';
import { SlashCreator, AzureFunctionV4Server } from 'slash-create';
import { join } from 'node:path';
import { PingCommand } from './commands/PingCommand'

process.loadEnvFile("./.env")
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();

app.setup({
    enableHttpStream: true
});

app.http("index", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: async () => {
        
        const creator = new SlashCreator({
            applicationID : process.env.APPLICATION_ID,
            publicKey : process.env.PUBLIC_KEY,
            token: process.env.BOT_TOKEN
        });
        creator.withServer(new AzureFunctionV4Server(app));
        creator.registerCommands(
            [
                PingCommand
            ],
            false
        );
        await creator.syncCommands();
    }
} )