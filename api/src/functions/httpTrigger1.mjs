import app from '@azure/functions';
import { v4 as uuidv4 } from 'uuid';

async function httpTrigger1(request, context) {
    return { body: uuidv4() };
};

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    handler: httpTrigger1
});
