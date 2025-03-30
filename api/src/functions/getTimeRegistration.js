const { app, input } = require('@azure/functions');

const tableInput = input.table({
    tableName: 'TimeRegistration',
    partitionKey: 'EmployeeName',
    connection: 'TableConnectionString',
});

app.http('getTimeRegistration', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraInputs: [tableInput],
    
    handler: async (request, context) => {
        const { partitionKey } = await request.json();
        console.log('partitionKey: ', partitionKey);

        if (!partitionKey) {
            console.error('Error: partitionKey is required');
            return { status: 400, body: 'partitionKey parameter is required' };
        }

        const rows = await context.extraInputs.get(tableInput, partitionKey);
        console.log('Fetched time registrations:', rows);

        return { body: JSON.stringify(rows) };
    },
    // Note: The above code assumes that the table input is set up to fetch all rows for the given partition key.
});
