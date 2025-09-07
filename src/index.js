import { app } from '@azure/functions';
import { SlashCreator, AzureFunctionV4Server, InteractionType, InteractionResponseType } from 'slash-create';
import path from 'path';
// import nacl from 'tweetnacl';

const creator = new SlashCreator({
    applicationID : process.env.APPLICATION_ID,
    publicKey : process.env.PUBLIC_KEY,
    token: process.env.BOT_TOKEN
});
creator.withServer(new AzureFunctionV4Server(app));
await creator.registerCommandsIn(path.join(__dirname, "commands"));
await creator.syncCommands();

// app.http("interactions", {
//     methods: ['GET', 'POST'],
//     authLevel: 'anonymous',
//     handler: async (request, context) => {
//         const req = await JSON.parse(request);

//         const sig = req["X-Signature-Ed25519"];
//         const tStamp = req["X-Signature-Timestamp"];
//         const bod = req["rawBody"];

//         const isVerified = nacl.sign.detached.verify(
//             Buffer.from(tStamp + bod),
//             Buffer.from(sig, "hex"),
//             Buffer.from(process.env.PUBLIC_KEY, "hex")
//         );

//         if(!isVerified){
//             context.error("Invalid request signature.");
//             return {
//                 status: 401,
//                 headers: {
//                     "User-Agent": "DiscordBot (https://stamp-discord.azurewebsites.net/api/, 1.0.0)",
//                     "Content-Type": 'application/json'
//                 },
//                 body: "invalid request signature"
//             };
//         }

//         if(req.status == InteractionType.PING){
//             context.log("Valid PING interaction. Returning PONG...");
//             return {
//                 status: 200,
//                 headers: {
//                     "User-Agent": "DiscordBot (https://stamp-discord.azurewebsites.net/api/, 1.0.0)",
//                     "Content-Type": 'application/json'
//                 },
//                 jsonBody: {
//                     type : InteractionResponseType.PONG
//                 }
//             };
//         }
//     }
// });

