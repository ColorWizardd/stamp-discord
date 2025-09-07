import { app } from '@azure/functions';
import { InteractionType, InteractionResponseType } from 'slash-create';
import nacl from 'tweetnacl';

app.http("interactions", {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const sig = request.headers.get("X-Signature-Ed25519");
        const tStamp = request.headers.get("X-Signature-Timestamp");
        const bod = await request.text();

        const isVerified = nacl.sign.detached.verify(
            Buffer.from(tStamp + bod),
            Buffer.from(sig, "hex"),
            Buffer.from(process.env.PUBLIC_KEY, "hex")
        );

        if(!isVerified){
            context.error("Invalid request signature.");
            return {
                status: 401,
                headers: {
                    "User-Agent": "DiscordBot (https://stamp-discord.azurewebsites.net/api/, 1.0.0)",
                    "Content-Type": 'application/json'
                },
                body: "invalid request signature"
            };
        }

        const bodJson = JSON.parse(bod);

        if(bodJson.type == InteractionType.PING){
            context.log("Valid PING interaction. Returning PONG...");
            return {
                status: 200,
                headers: {
                    "User-Agent": "DiscordBot (https://stamp-discord.azurewebsites.net/api/, 1.0.0)",
                    "Content-Type": 'application/json'
                },
                jsonBody: {
                    type : InteractionResponseType.PONG
                }
            };
        }
    }
});
