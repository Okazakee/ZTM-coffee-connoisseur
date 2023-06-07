import {table, getMinifiedRecords} from '../../libs/airtable'

const createCoffeeStore = async (req, res) => {
    if (req.method === "POST") {
    const {id, name, address, imgUrl, voting} = req.body;

        try {
            //find a record
            if (id) {
                const findCoffeeStoreRecords = await table
                .select({
                    filterByFormula: `id=${id}`,
                })
                .firstPage();

                if (findCoffeeStoreRecords.length !== 0) {

                    const records = getMinifiedRecords(findCoffeeStoreRecords);

                    res.json({message: "Finded record", records});
                } else {

                //create a record
                if (name) {

                    const createCoffeeStoreRecords = await table.create([
                        {
                            fields: {
                            id,
                            imgUrl,
                            name,
                            address,
                            voting
                            }
                        }
                    ]);

                    const records = getMinifiedRecords(createCoffeeStoreRecords);

                    res.json({message: "Created new record", records});
                } else {
                    res.status(400);
                    res.json({message: "Name is missing!"});
                }
            }
        } else {
            res.status(400);
            res.json({message: "ID is missing!"});
        }
    } catch (error) {
        res.status(500);
        res.json({message: 'Error finding/creating store:', error});
      }
    }
};

export default createCoffeeStore;