import { app } from '@azure/functions';

app.timer('pulse', {
    schedule: '0,30 6-22 * * *',
    handler: (myTimer, context) => {
        context.log('Sending pulse to server...');
        async () => {
            await fetch("https://stamp-discord.azurewebsites.net/api/ping");
        }
    }
});
