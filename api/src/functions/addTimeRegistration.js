const { app, output } = require('@azure/functions');

const tableOutput = output.table({
    tableName: 'TimeRegistration',
    connection: 'AzureWebJobsTableStorage',
});

app.http('addTimeRegistration', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [tableOutput],

    handler: async (request, context) => {
        const row = {
            PartitionKey: 'EmployeeName',
            RowKey: uuidv4(),
            Date: new Date().toISOString(),
            RegistrationType: 'DayStart',
        };

        console.log('Adding time registration:', row);

        context.extraOutputs.set(tableOutput, row);

        return { status: 201 };
    },
});
