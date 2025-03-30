const { app, output } = require('@azure/functions');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4

const tableOutput = output.table({
    tableName: 'TimeRegistration',
    connection: 'AzureWebJobsTableStorage',
});

app.http('addTimeRegistration', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [tableOutput],

    handler: async (request, context) => {
        const { registrationType } = await request.json();
        console.log('registrationType: ', registrationType);

        if (!registrationType) {
            console.error('Error: registrationType is required');
            return { status: 400, body: 'registrationType parameter is required' };
        }

        const row = {
            PartitionKey: 'EmployeeName',
            RowKey: uuidv4(),
            Date: new Date().toISOString(),
            RegistrationType: registrationType,
        };

        console.log('Adding time registration:', row);

        context.extraOutputs.set(tableOutput, row);

        return { status: 201 };
    },
});
