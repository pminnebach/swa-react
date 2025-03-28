const { app } = require('@azure/functions');

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        console.log('Hello, from the API!');
        return { body: JSON.stringify('Hello, from the API!') };
    }
});
