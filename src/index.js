import { app } from '@azure/functions';
import { SlashCreator, AzureFunctionV4Server } from 'slash-create';
import path from 'path';

app.http("index", {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const req = JSON.parse(request);
        if(req.status == "1"){
            return JSON.stringify({
                status: "200",
                type: "1"
            });
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

