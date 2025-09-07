import { app } from '@azure/functions';
import { SlashCreator, AzureFunctionV4Server, InteractionType, InteractionResponseType } from 'slash-create';
import path from 'path';

app.http("interactions", {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const req = JSON.parse(request);
        if(req.status == InteractionType.PING){
            return {
                type: InteractionResponseType.PONG
            };
        }
        const creator = new SlashCreator({
            applicationID : process.env.APPLICATION_ID,
            publicKey : process.env.PUBLIC_KEY,
            token: process.env.BOT_TOKEN
        });
        creator.withServer(new AzureFunctionV4Server(app));
        await creator.registerCommandsIn(path.join(__dirname, "commands"));
        await creator.syncCommands();
    }
});

