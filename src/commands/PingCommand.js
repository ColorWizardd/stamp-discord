// DEBUG: RETURNS A SIMPLE PING FROM SERVER

import { SlashCommand, ApplicationCommandPermissionType } from "slash-create";
export class ping extends SlashCommand{
    constructor(creator){
        super(creator,  {
            name: 'ping',
            description: 'DEBUG UTILITY: PINGS SERVER',
            requiredPermissions: ['MANAGE_GUILD'],
            forcePermissions: true
        });
    }

    async run(ctx){
        return 'Pong!';
    }
}