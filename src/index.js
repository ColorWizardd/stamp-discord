import { app } from ('@azure/functions');
import { SlashCreator, AzureFunctionV4Server } from ('slash-create');
const env = process.env;

const creator = new SlashCreator({
    applicationID : env.APPLICATION_ID,
    publicKey : env.PUBLIC_KEY,
    token: env.BOT_TOKEN
});
creator.withServer(new AzureFunctionV4Server(app));
await creator.registerCommandsIn(__dirname, "commands");
await creator.syncCommands();
