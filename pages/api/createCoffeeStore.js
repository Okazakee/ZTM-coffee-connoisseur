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
            filterByFormula: `id="10"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {

            const records = findCoffeeStoreRecords.map((record) => {
                return {
                    ...record.fields
                }
            });

            res.json({message: "Finded record", records});
        } else {
            //create a record

            const createCoffeeStoreRecords = await table.create([
                {
                    "fields": {
                    "id": "10",
                    "imgUrl": "http://asd.com/img.png",
                    "name": "admaidinn",
                    "address": "via caput",
                    "voting": 0
                    }
                }
            ]);

            const records = createCoffeeStoreRecords.map((record) => {
                return {
                    ...record.fields
                }
            });

            res.json({message: "Created new record", records});
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