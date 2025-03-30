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
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        const day = String(new Date().getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;
        const hour = String(new Date().getHours()).padStart(2, '0');
        const minute = String(new Date().getMinutes()).padStart(2, '0');
        const second = String(new Date().getSeconds()).padStart(2, '0');
        const time = `${hour}:${minute}:${second}`;
        const { registrationType } = await request.json();
        console.log('registrationType: ', registrationType);

        if (!registrationType) {
            console.error('Error: registrationType is required');
            return { status: 400, body: 'registrationType parameter is required' };
        }

        const row = {
            PartitionKey: 'EmployeeName',
            RowKey: uuidv4(),
            Date: date,
            Time: time,
            DateTime: "${date}T${time}",
            ISODateTime: new Date().toISOString(),
            RegistrationType: registrationType,
        };

        console.log('Adding time registration:', row);

        context.extraOutputs.set(tableOutput, row);

        return { status: 201 };
    },
});
