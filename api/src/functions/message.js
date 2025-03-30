const { app } = require('@azure/functions');

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        console.log('message api function called');
        return { body: JSON.stringify({ text: 'Hello, from the API!' }) };
    }
});
