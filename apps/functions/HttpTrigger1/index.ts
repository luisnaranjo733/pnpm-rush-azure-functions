import { AzureFunction, Context, HttpRequest } from "@azure/functions"
const { ServiceBusClient } = require("@azure/service-bus");
// require('dotenv').config()

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING
if (!connectionString) {
    throw 'missing SERVICE_BUS_CONNECTION_STRING env var'
}

const serviceBusClient = new ServiceBusClient(connectionString);

const messages = [
    { body: "Albert Einstein" },
    { body: "Werner Heisenberg" },
    { body: "Marie Curie" },
    { body: "Steven Hawking" },
    { body: "Isaac Newton" },
    { body: "Niels Bohr" },
    { body: "Michael Faraday" },
    { body: "Galileo Galilei" },
    { body: "Johannes Kepler" },
    { body: "Nikolaus Kopernikus" }
  ];
  
const sender = serviceBusClient.createSender('pnpm-rush-azure');

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";


    await sender.sendMessages(messages[0]);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;