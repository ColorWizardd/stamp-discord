import { app } from '@azure/functions';

// HOUR RANGE IS IN UTC - AM PORTION

app.timer('pulse', {
    schedule: '0,30 11-24 * * *',
    handler: (myTimer, context) => {
        context.log('Sending pulse to server...');
        async () => {
            await fetch("https://stamp-discord.azurewebsites.net/api/ping");
        }
    }
});
