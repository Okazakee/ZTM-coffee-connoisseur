const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
  process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {

    try {
        //find a record
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="0"`,
          })
          .firstPage();
    
        if (findCoffeeStoreRecords.length !== 0) {
    
            const records = findCoffeeStoreRecords.map((record) => {
                return {
                    ...record.fields
                }
            });
    
            res.json(records);
        } else {
          //create a record
          res.json({ message: "create a record" });
        }
      }
      catch (error) {
        console.error('error finding store: ', error);
        res.json({message: 'error finding store: ', error});
        res.status(500);
      }
    }
};

export default createCoffeeStore;