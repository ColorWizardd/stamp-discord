import * as appInsights from 'applicationinsights';
import { app } from '@azure/functions';
import { SlashCreator, AzureFunctionV4Server } from 'slash-create';
// export default app.http('index', {
//     methods: ['POST'],
//     authLevel: "anonymous",
//     handler: async () => {
//         process.loadEnvFile("./.env")
//         appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();
//         const creator = new SlashCreator({
//             applicationID : process.env.APPLICATION_ID,
//             publicKey : process.env.PUBLIC_KEY,
//             token: process.env.BOT_TOKEN
//         });
//         creator.withServer(new AzureFunctionV4Server(app));
//         await creator.registerCommandsIn(require('path').join(__dirname, 'commands'));
//         await creator.syncCommands();
//         return;
//     }
// } )

export default async function () {
    process.loadEnvFile("./.env")
        appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();
        const creator = new SlashCreator({
            applicationID : process.env.APPLICATION_ID,
            publicKey : process.env.PUBLIC_KEY,
            token: process.env.BOT_TOKEN
        });
        creator.withServer(new AzureFunctionV4Server(app));
        await creator.registerCommandsIn(require('path').join(__dirname, 'commands'));
        await creator.syncCommands();
}