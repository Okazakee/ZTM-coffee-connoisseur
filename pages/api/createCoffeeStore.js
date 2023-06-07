const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
  process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {

    //find a record
    const findCoffeeStoreRecords = await table
      .select({
        filterByFormula: `id="0"`,
      })
      .firstPage();

    console.log({ findCoffeeStoreRecords });

    if (findCoffeeStoreRecords.length !== 0) {
      res.json(findCoffeeStoreRecords);
    } else {
      //create a record
      res.json({ message: "create a record" });
    }
  } else {
    return res.json({message: "change method dumbass"})
  }
};

export default createCoffeeStore;