const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_TOKEN}).base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffee-stores");

const createCoffeeStore = (req, res) => {
    if (req.method === "POST") {
        res.json({table: table.name})
    } else {
        res.json({message: "Method not allowed! Use POST."})
    }
};

export default createCoffeeStore;