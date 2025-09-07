import { app } from '@azure/functions';

app.http('ping-test', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const name = request.query.get('name') || await request.text() || 'world';
        const type = request.json['type'];
        if(type == 1){
            return JSON.stringify({
                status : 200,
                type : 1
            });
        }

        return { body: `Hello, ${name}!` };
    }
});
